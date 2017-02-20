import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		let tk  = this.get('session.accessToken');
		let id = params.pageid;
		return $.get(`http://www.instadev.com.br/facebook-api-wrapper/page`, {
			access_token: tk,
			id: id
		}).then(item => {
			let jsonItem = JSON.parse(item);
			console.log('jsonItemPage', jsonItem);
			return jsonItem;
		});
	}
});