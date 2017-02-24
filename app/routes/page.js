import Ember from 'ember';

var PromiseObject = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);

export default Ember.Route.extend({
	model(params) {
		var tk  = this.get('session.accessToken');
		let id = params.pageid;
		var _this = this;
		let count = 0;
		var getJSON = this.get('getJSON');
		// var jsonItem = '';
		// debugger;
		var jsonItem = $.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
			access_token: tk,
			id: id
		}).then(item => {
			let json = JSON.parse(item);
			// jsonItem.posts.data.map(post=>{
			json.posts.data.map(post=>{ 
				post.reactions_new = getJSON(post.id, tk).then(data=> {
					
					return data;
				});
				// $.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
		  //       	access_token: tk,
		  //       	id: post.id
		  //     	}).then(reactions=> {
		  //     		return reactions;
		  //     	});
		    });
			// });
			// debugger;
			return json;
		});
		return jsonItem;
	},
	getJSON: function(id, tk) {
     // return new Promise(function(resolve, reject){

      return $.get(`http://www.instadev.com.br/facebook-api-wrapper/post_reactions_count`, {
        access_token: tk,
        id: id
      }).then(item => {
        let jsonItem = JSON.parse(item);
        // console.log('jsonItemReactions', jsonItem.like.summary.total_count);
        // let response =  Ember.String.htmlSafe('Likes: ' + jsonItem.like.summary.total_count);
        console.log('response', jsonItem);
        // return response;
        // resolve(jsonItem);
        return jsonItem;
      }, function() {
        reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
        // return "bug";
      });

     // });
    },
	// setupController(controller) {
	// 	this._super(...arguments);
	// 	controller.set('getpromise', this.get('getpromise'));
	// }
});

// this.get('page').cover.source;