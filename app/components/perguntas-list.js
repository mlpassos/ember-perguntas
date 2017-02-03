import Ember from 'ember';

export default Ember.Route.extend({
	props : {
		title: 'Perguntas',
		subtitle: 'Perguntas da página Governo do Pará'
	},
	model(params) {
		// https://graph.facebook.com/endpoint?key=value&amp;access_token=app_id|app_secret
		return $.get(`https://api.github.com/orgs/${params.id}?access_token=a725b99e34d61b51cb04162a3351e23e7cb8d4e5`).then(rawOrg => {
			rawOrg.oldId = rawOrg.id;
			rawOrg.id = rawOrg.login;
			return rawOrg;
		});
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('props', this.get('props'));
	}
});