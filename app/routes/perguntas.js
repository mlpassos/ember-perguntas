import Ember from 'ember';

export default Ember.Route.extend({
	// access_token : this.get('session.currentUser.accessToken'),
	props : {
		title: 'Perguntas',
		subtitle: 'Perguntas da página Governo do Pará'
	},
	model() {
		let tk  = this.get('session.currentUser.accessToken');
		// console.log('tk', tk);
		// console.log(`http://www.instadev.com.br/facebook-api-wrapper/`, {
		// 	access_token: tk
		// });
		return $.get(`http://www.instadev.com.br/facebook-api-wrapper/`, {
			access_token: tk
		}).then(item => {
			// console.log(JSON.parse(item));
			// return JSON.parse(item);
			let query = '?';
			let jsonItem = JSON.parse(item);
			// console.log('jsonItem', jsonItem.data);
			// return jsonItem;
			let  out =  {};
			return jsonItem.data.map(function(posts) {
				if (posts.message) {
					if (posts.comments) {
						posts.comments.data = posts.comments.data.filter(function(el) {
							return el.message.toLowerCase().indexOf(query.toLowerCase()) > -1;
				    	});
				    	return posts;
				    }

				}
			});

		  //   return jsonItem.data.filter(function(el) {
				// // debugger;
				// if (el.message) {
				// 	console.log(el.message.toLowerCase().indexOf(query.toLowerCase()) > -1);
			 //    	return el.message.toLowerCase().indexOf(query.toLowerCase()) > -1;
			 //    }
		  //   });
		});
	}
});