import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		let tk  = this.get('session.accessToken');
		return Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/pages`, {
			access_token: tk
		}).then(item => {
			let jsonItem = JSON.parse(item);
			// console.log('jsonItem', jsonItem.data);
			// return jsonItem;
			console.log('jsonItem', jsonItem.accounts.data);
			return jsonItem.accounts.data;
		});
	}
});