import Ember from 'ember';

export default Ember.Route.extend({
	reactions: [],
	model(params) {
		var tk  = this.get('session.accessToken');
		let id = params.pageid;
		var _this = this;
		let count = 0;
		var getJSON = this.get('getJSON');

	        return $.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
				access_token: tk,
				id: id
			}).then(item => {
					let json = JSON.parse(item);
					json.posts.data.map(post=>{ 
						getJSON(post.id, tk).then(data=> {
							_this.get('reactions').addObject(data);
						});	
					});
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
	    return new Promise(function(resolve, reject){
		    $.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
		        access_token: tk,
		        id: id
		    }).then(item => {
		        let jsonItem = JSON.parse(item);
		        resolve(jsonItem);
		    }, function() {
		        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
		    });
	    });
	}
});