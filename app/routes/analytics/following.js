import Ember from 'ember';

export default Ember.Route.extend({
	updatedPosts: [],
	model() {
		let _this = this;
		let getUpdatedPost = this.get('_getUpdatedPost');
		return this.get('store').findAll('post').then(posts=> {
			return posts.map(post=> {
				getUpdatedPost(post.get('id'), _this);
				return post;
			})
		});
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
			console.log('jsonPostUpdated', json);
			updatedPosts.addObject(json);
		});
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('updatedPosts', this.get('updatedPosts'));
	}
});