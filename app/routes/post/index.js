import Ember from 'ember';

export default Ember.Route.extend({
	postUsers: [],
	isFollowing: Ember.computed('modelo', function() {
	    // return this.get('modelo').map(function(modelo, index) {
	    //   return `MODEL ${index}: ${modelo.toUpperCase()}!`;
	    // });
	    // console.log('computed model', this.get('modelo'));
	    // let model = this.get('modelo');
	    // let out = this.get('store').findRecord('post', model.id).then(post=> {
	    // 	return post;
	    // });
	    // console.log('out', out);
	    return true;
	}),
	modelo: null,
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
    					// console.log('positivoQuery', query);
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
	afterModel(model) {
		// this._super(...arguments);
		// let modelo = this.get('modelo');
		// modelo.set('.addObject(model);
		// console.log('aqui', model);
		this.set('modelo', model);
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
		controller.set('isFollowing', this.get('isFollowing'));
	},
	actions: {
		followPost(post) {
			let _this = this;
			// console.log('followantes', post);

			var summary = {...post.comments.summary};
			var comments = {...post.comments};
			// post.summary 
			delete post.comments;
			// post.set('comments_count') = comments_count;
			post.summary = summary;
			// post.comments = post.comments.data;
			// post.comments
			// console.log('followdepois', post);
			// console.log('summary', summary);
			// // debugger;
			
			if (!post.shares) {
				console.log('sem shares');
				post.shares = {
					count: 0
				}
			}

			console.log('followantes', post);
			let newPost = this.store.createRecord('post', post);
			newPost.set('comments', []);
			// newPost.get('summary').pushObject(summary);
			// console.log('newPost', newPost.get('description'));
			// newPost.set('comments_count', comments_count);
			var promises = [];
			comments.data.map(comentario=> {
				let currentdate = new Date(); 
				let datetime = "Last Sync: " + currentdate.getDate() + "/"
				                + (currentdate.getMonth()+1)  + "/" 
				                + currentdate.getFullYear() + " @ "  
				                + currentdate.getHours() + ":"  
				                + currentdate.getMinutes() + ":" 
				                + currentdate.getSeconds();
				console.log('map: ' + datetime);

				if ( !comentario.parent ) { 
					comentario.parent = [];
				}
				// if ( !comentario.parent ) { 
				// comentario.description = 'SEM DESCRIÇÃO';
				// }
				// comentario.bug = 'bug';
				let comment = _this.store.createRecord('comment', comentario);
				newPost.get('comments').pushObject(comment);
				

				  	promises.pushObject(new Promise(function(resolve, reject){
					    comment.save().then(function() {
							// console.log('salvou comment: ' + comment.get('message'));
							resolve('success');
							
						}, function(error) {
							reject(new Error('getJSON: `' + comment.get('message') + '` failed with status: [' + this.status + ']'));
						});
			    	}));

				// comment.save().then(function() {
				// 	console.log('salvou comment: ' + comment.get('message'));
				// 	newPost.save().then(function() {
				// 		console.log('salvou post: ' + newPost.get('message'));	
				// 	}, function(error, msg) {
				// 		console.log('erro post: ' + newPost.get('message'));
				// 	});
				// }, function(error) {
				// 	console.log('erro comentário: ' + comment.get('message'));
				// });
			});
			Promise.all([
			  promises	
			]).then(function(values){
			  //values[0] // => postsJSON
			  //values[1] // => commentsJSON
			  console.log('values', values);
			  newPost.save().then(function() {
				  console.log('salvou post');	
			  }, function(error, msg) {
				  console.log('erro post', error);
				  // console.log('status post', this.status);
			  });
			}, function(error) {
					console.log('erro gravando comentário: ' + error);
			});
			var currentdate = new Date(); 
			var datetime = "Last Sync: " + currentdate.getDate() + "/"
			                + (currentdate.getMonth()+1)  + "/" 
			                + currentdate.getFullYear() + " @ "  
			                + currentdate.getHours() + ":"  
			                + currentdate.getMinutes() + ":" 
			                + currentdate.getSeconds();	
			console.log('map depois: ' + datetime);
		},
		recordPost(post) {
			alert('Gravando ' + post.id);
		}
	}
});