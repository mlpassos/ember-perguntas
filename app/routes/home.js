import Ember from 'ember';

let props = {
	title: 'Home',
	subtitle: 'Bem-vindo ao Pará Responde',
	content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, quibusdam rem eveniet dolores, repellendus sint eligendi earum. Impedit saepe quasi dicta? Accusamus dolore iusto, possimus! In modi amet, maiores eos!'
};

export default Ember.Route.extend({
	model() {
		return props;
	}
});