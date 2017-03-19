import Ember from 'ember';

export default Ember.Route.extend({
	reactions: [],
	updatedPosts: [],
	model() {
		let _this = this;
		let getUpdatedPost = this.get('_getUpdatedPost');
		let getReactions = this.get('_getReactions');
		return this.get('store').findAll('post').then(posts=> {
			return posts.map(post=> {
				getUpdatedPost(post.get('id'), _this);
				getReactions(post.get('id'), _this);
				return post;
			})
		});
	},
	deactivate() {
		this.set('updatedPosts', []);
		this.set('reactions', []);
	},
	_getUpdatedPost: function(id, _this) {
		var tk  = _this.get('session.accessToken');
		// let _this = _this;
		let updatedPosts = _this.get('updatedPosts');
		Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/post`, {
			access_token: tk,
			id: id
		}).then(item => {
			let json = JSON.parse(item);
			// console.log('jsonPostUpdated', json);
			updatedPosts.addObject(json);
		});
	},
	_getReactions: function(id, _this) {
		var tk  = _this.get('session.accessToken');
		let reactions = _this.get('reactions');
	    Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
	        access_token: tk,
	        id: id
		}).then(item => {
	        let jsonItem = JSON.parse(item);
	        reactions.addObject(jsonItem);
	    }, function() {
	        reject(new Error('getJSON: `' + id + '` failed with status: [' + this.status + ']'));
	    });
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('updatedPosts', this.get('updatedPosts'));
		controller.set('reactions', this.get('reactions'));
	}
});