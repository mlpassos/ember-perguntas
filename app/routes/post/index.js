import Ember from 'ember';

export default Ember.Route.extend({
	postUsers: [],
	model() {
		console.log('POST PAGE');
		var tk  = this.get('session.accessToken');
		let _this = this;
		// console.log(tk);
		let postId = Ember.get(this.modelFor('post'), 'postid');
		// let postid = params.postid;
		let userid = this.get('session.userId');
		// console.log(postid);
		var getJSON = this.get('getJSON');
		return $.get(`http://www.instadev.com.br/facebook-api-wrapper/post`, {
			access_token: tk,
			id: postId
		}).then(item => {
				let json = JSON.parse(item);
				console.log('jsonPost', json);
    			json.comments.perguntas = [];
    			json.comments.positivos = [];
    			let perguntasQuery = "?";
    			let positivosQuery =  ['#Jatene', 'Parabéns', 'Muito legal'];
				json.comments.data.map(comment=>{ 
					if (comment.message.indexOf(perguntasQuery) !== -1) {
    					json.comments.perguntas.addObject(comment);
    				}
    				positivosQuery.map(query=> {
    					console.log('positivoQuery', query);
    					if (comment.message.indexOf(query) !== -1) {
	    					json.comments.positivos.addObject(comment);
	    				}
    				});
    				
					getJSON(comment.id, comment.from.id, tk).then(data=> {
						_this.get('postUsers').addObject(data);
					});
				});
				return json;
		});
	},
	deactivate() {
		let postUsers =  this.get('postUsers');
		postUsers.clear();
	},
	getJSON: function(commentId, userId, tk) {
	    return new Promise(function(resolve, reject){
		    $.get(`http://www.instadev.com.br/facebook-api-wrapper/user_info`, {
		        access_token: tk,
		        id: userId
		    }).then(item => {
		        let jsonItem = JSON.parse(item);
		        jsonItem.commentId = commentId;
		        // console.log('jsonUserInfo', jsonItem);
		        resolve(jsonItem);
		    }, function() {
		        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		    });
	    });
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('postUsers', this.get('postUsers'));
	},
	actions: {
		followPost(post) {
			let _this = this;
			console.log('followantes', post);
			var comments = {...post.comments};
			delete post.comments;
			// post.comments
			console.log('followdepois', post);
			console.log('comments', comments);
			let newPost = this.store.createRecord('post', post);
			newPost.set('comments', []);
			comments.data.map(comentario=> {
				console.log('map');
				if ( !comentario.parent ) { 
					comentario.parent = [];
				}
				let comment = _this.store.createRecord('comment', comentario);
				newPost.get('comments').pushObject(comment);
				comment.save().then(function() {
					console.log('salvou comment');
					newPost.save().then(function() {
						console.log('salvou post');	
					}, function(error) {
						console.log('erro post', error.message);
					});
				}, function(error) {
					console.log('erro', error);
				});
			});	
		},
		recordPost(post) {
			alert('Gravando ' + post.id);
		}
	}
});