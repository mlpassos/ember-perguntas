import Ember from 'ember';

export default Ember.Route.extend({
	proxy: [],
	model(params) {
		var tk  = this.get('session.accessToken');
		let id = params.pageid;
		var _this = this;
		let count = 0;
		var getJSON = this.get('getJSON');
		return Ember.RSVP.hash({
	        page: $.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
				access_token: tk,
				id: id
			}).then(item => {
				let json = JSON.parse(item);
				return json;
		    }),
		    reactions: $.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
				access_token: tk,
				id: id
			}).then(item => {
				let json = JSON.parse(item);
				return json.posts.data.map(post=>{ 
					return getJSON(post.id, tk).then(data=> {
						_this.get('proxy').addObject(data);
						return data;
					});	
				});
		    })
		});	
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('proxy', this.get('proxy'));
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