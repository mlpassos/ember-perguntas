import Ember from 'ember';  
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';  
export default ToriiFirebaseAdapter.extend({  
  // store: Ember.inject.service(),
  firebase: Ember.inject.service()
  // ,
  // open: function(authorization) {
  // 	console.log('auth', authorization);
  // }
 //  ,
 //  open: function(authorization) {
 //  	console.log('auth', authorization);
 //    var uid = authorization.uid,
 //    	email = authorization.email,
 //    	displayName = authorization.displayName,
 //    	photoURL = authorization.photoURL,
 //        store  = this.get('store');
 //    console.log('torii: uid', uid);
 //    console.log('torii: displayName', displayName);
 //    console.log('torii: email', email);
 //    return store.query('user', {orderBy: 'uid', equalTo: uid }).then(function(users){
 //    	// cadastra usuário
 //    	// debugger;
 //    	console.log('qtde usuários', users.get('length'));
 //    	// console.log('nome usuario', users.get('firstObject').get('displayName'))
 //    	if(users.get('length') === 0){
 //    		console.log('USUARIO SEM CADASTRO, CADASTRANDO...');
	//     	let userRecord = store.createRecord('user', {
	//           	uid: uid,
	//           	email: email,
	//           	displayName: displayName,
	//             photoURL: photoURL
	//         });
	//         return userRecord.save().then(function(user) {
	//         	// adiciona usuário sem funcão
	//         	user.isNew = true;
	//         	return user;
	//         });
	//     } else {
	//     	console.log("USUARIO SEM FUNCAO, SETA isNew = false");
	//     	users.get('firstObject').isNew = false;
	//     	// já cadastrado, pega o primeiro registro
	//     	return users.get('firstObject');
	//     }
	// }).then(function(user) {
	// 	console.log('isNew torii', user.isNew);
	// 	if (user.isNew) {
	// 		console.log('USUÁRIO NOVO');
	// 		user.isAdmin = false;
	// 		user.isNew = true;
	// 		return {
	// 	    	currentUser: user
	// 	    };
	// 	} else {
	// 		// return
	// 		return user.get('funcao').then(function(funcao) {
	// 			console.log('open isNew', user.isNew);
	// 			if (funcao) {
	// 				console.log('USUÁRIO NÃO É NOVO E SUA FUNÇÃO É ' + funcao.id);
	// 				user.funcaoid = funcao.id;
	// 				if (parseInt(funcao.id) === 6) {
	// 			  		user.isAdmin = true;
	// 			  	} else {
	// 			  		user.isAdmin = false;
	// 			  	}	
	// 			} else {
	// 				console.log('USUÁRIO NAO É NOVO MAS AINDA TA SEM FUNCAO');
	// 				user.isAdmin = false;
	// 				// SETA TRUE POIS NAO TEM FUNCAO AINDA
	// 				user.isNew = true;
	// 				user.funcaoid = 0;
	// 			}
	// 			return {
	// 		    	currentUser: user
	// 		    };
	// 		});
	// 	}
 //    });
 //  }
});