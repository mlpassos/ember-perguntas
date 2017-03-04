import Ember from 'ember';

export default Ember.Route.extend({
	postUsers: [],
	model(params) {
		console.log('POST PAGE');
		var tk  = this.get('session.accessToken');
		let _this = this;
		// console.log(tk);
		// let pageid = Ember.get(this.modelFor('page'), 'pageid');
		let postid = params.postid;
		let userid = this.get('session.userId');
		// console.log(pageid, postid);
		var getJSON = this.get('getJSON');
		return $.get(`http://www.instadev.com.br/facebook-api-wrapper/post`, {
			access_token: tk,
			id: postid
		}).then(item => {
				let json = JSON.parse(item);
				console.log('jsonPost', json);
				// let query = "?";
    // 			json.comments.perguntas = json.comments.data.map(item=> {
    // 				if (item.message.indexOf(query) !== -1) {
    // 					return item;
    // 				}
    // 			});
    			if (json.comments) {
    				json.comments.data.map(comment=>{ 
    					// console.log('id comentário', comment.id);
						getJSON(comment.id, comment.from.id, tk).then(data=> {
							_this.get('postUsers').addObject(data);
						});
					});
    			}
			    
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
	}
});
