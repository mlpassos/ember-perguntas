import Ember from 'ember';

export default Ember.Route.extend({
	reactions: [],
	following: [],
	model() {
		console.log('INDEX PAGE');
		var tk  = this.get('session.accessToken');
		console.log(tk);
		let id = Ember.get(this.modelFor('page'), 'pageid');
		console.log(id);
		var _this = this;
		var getJSON = this.get('getJSON');
		var getIsFollowingPost = this.get('getIsFollowingPost');
		var store = this.get('store');

	        return Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
				access_token: tk,
				id: id
			}).then(item => {
					let json = JSON.parse(item);
					json.posts.data.map(post=>{ 
						getJSON(post.id, tk).then(data=> {
							_this.get('reactions').addObject(data);
						});	
						getIsFollowingPost(post.id, store).then(response=> {
							_this.get('following').addObject({
								id: post.id
							});
						});
					});
					console.log('json', json);
					return json;
			});
			// });
	},
	deactivate() {
		this.set('reactions', []);
		this.set('following', []);
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('reactions', this.get('reactions'));
		controller.set('following', this.get('following'));
	},
	getJSON: function(id, tk) {
	    var promise = new Ember.RSVP.Promise(function(resolve, reject){
		    Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
		        access_token: tk,
		        id: id
			}).then(item => {
		        let jsonItem = JSON.parse(item);
		        resolve(jsonItem);
		    }, function() {
		        reject(new Error('getJSON: `' + id + '` failed with status: [' + this.status + ']'));
		    });
		});
		return promise;
	},
	getIsFollowingPost: function(postid, store) {
		var promise = new Ember.RSVP.Promise(function(resolve, reject) {
	    	store.findRecord('post', postid).then(post=> {
	    		console.log('Achou post. isFollowing');
	    		// _this.set('following', true);
	    		// console.log('flw', _this.get('following'));
		    	resolve(true);
		    }, error=> {
		    	// _this.set('following', false);
		    	reject(false);
			});
		});
	    return promise;
	}
});