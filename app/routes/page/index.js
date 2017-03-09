import Ember from 'ember';

export default Ember.Route.extend({
	reactions: [],
	model() {
		console.log('INDEX PAGE');
		var tk  = this.get('session.accessToken');
		console.log(tk);
		let id = Ember.get(this.modelFor('page'), 'pageid');
		console.log(id);
		var _this = this;
		var getJSON = this.get('getJSON');

	        return Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
				access_token: tk,
				id: id
			}).then(item => {
					let json = JSON.parse(item);
					json.posts.data.map(post=>{ 
						getJSON(post.id, tk).then(data=> {
							_this.get('reactions').addObject(data);
						});	
					});
					console.log('json', json);
					return json;
			});
			// });
	},
	deactivate() {
		this.set('reactions', []);
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('reactions', this.get('reactions'));
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
	}
});