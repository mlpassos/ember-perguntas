import Ember from 'ember';
import TransitionToListenerRoute from 'ember-cli-routing-service/routes/transition-to-listener';

const {get} = Ember;
 
export default TransitionToListenerRoute.extend({
    beforeModel(){
    	let _this = this;
		return this.get('session').fetch().catch(function(){
			_this.router.transitionTo('home');
		});
	},
	actions:{
	    login(){
	    	let _this = this;
	        get(this,'session').open('firebase', { provider: 'facebook'}).then(function(data) {
	            // console.log(data);
	            let user = data.currentUser.refreshToken;
	            // let uid = user.get('uid');
	            console.log(user);
	            // console.log('Tá ONLINE AI?', user.get('isOnline'));
	            // user.set('isOnline', true);
	         //    let userId = user.get('id');
	         //    _this.store.findRecord('user', userId).then(function(usr) {
		        // 	console.log('login', user.get('displayName'));
		        // 	usr.set('isOnline', true);
		        // 	usr.save().then(function() {
		        //     	console.log('Online');
		        //     	console.log('Tá ONLINE AI?', user.get('isOnline'));
		        //     });
		        // });
	            // let isAdmin = user.isAdmin;
	            // let isNew = user.isNew;
	            // let userName = user.get('displayName');
	            // console.log('NOME DO USUÁRIO', userName);
	            // console.log('app: isAdmin', isAdmin);
	            // console.log('app: isNew', isNew);

	            // if (isNew) {
	            // 	// se usuário novo, manda pra completar o cadastro/perfil
	            // 	_this.router.transitionTo('usuario.perfil', uid);
	            // }
	            // _this.get('store').query('user', {orderBy: 'uid', equalTo: uid }).then( function(users) {
				//     let userRecord = users.get('firstObject');
				//      _this.get('store').findRecord('funcao', 6).then(function(funcao) {
				// 		 userRecord.set('funcao', funcao);
				// 		 userRecord.save().then(function() {
				// 	     	console.log('Usuário cadastrado com sucesso');
				// 	     });
				// 	 });
				// });
	        });
	    },
	    logout(){
	        // let userId = this.get('session.currentUser.id');
	        // this.store.findRecord('user', userId).then(function(user) {
	        // 	console.log('logout', user.get('displayName'));
	        // 	user.set('isOnline', false);
	        // 	user.save().then(function() {
	        //     	console.log('Offline');
	        //     	console.log('Tá ONLINE AI?', user.get('isOnline'));
	        //     });
	        // });
	        // console.log('TCHAUZINHO, INDO OFFLINE', user.get('isOnline'));
	        // user.set('isOnline', false);
	        get(this,'session').close();
	        this.router.transitionTo('home');
	    }
	}
});