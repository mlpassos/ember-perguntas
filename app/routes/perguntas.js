import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return $.get(`http://www.instadev.com.br/facebook-api-wrapper/`).then(item => {
			return item;
		});
	}
});