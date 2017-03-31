import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({
	postUsers: [],
	// following: false,
	isFollowing: Ember.computed('modelo', function() {
	    // return this.get('modelo').map(function(modelo, index) {
	    //   return `MODEL ${index}: ${modelo.toUpperCase()}!`;
	    // });
	    console.log('computed model', this.get('modelo'));
	    let store = this.get('store');
	    let model = this.get('modelo');
	    // let _this = this;
	    var out = new Ember.RSVP.Promise(function(resolve, reject) {
	    	store.findRecord('post', model.id).then(post=> {
	    		console.log('Achou post. isFollowing');
	    		// _this.set('following', true);
	    		// console.log('flw', _this.get('following'));
		    	resolve(post);
		    }, function() {
		    	// _this.set('following', false);
		    	reject(false);
		    });
		});
		console.log('out', out);
		// return out.then(function(post) {
		// 	if (post.get('id')) {
		// 		console.log('ja eh seguido retorna true');
		// 		return true;
		// 	} else {
		// 		console.log('nao eh seguido retorna false');
		// 		return false;
		// 	}
		// });
		// let ObjectPromiseProxy = Ember.ObjectProxy.extend(Ember.PromiseProxyMixin);
		return DS.PromiseArray.create({
        	promise: out.then(function(post) {
				if (post.get('id')) {
					console.log('ja eh seguido retorna true');
					// _this.set('following', true);
					return [{status:true}];
				} else {
					console.log('nao eh seguido retorna false');
					// _this.set('following', false);
					return [{status:false}];
				}
			}, function() {
				console.log('rejected');
				// _this.set('following', false);
				return [{status:false}];
			})
		});
	    // console.log('out', this.get('store'));
	    // return model.id;
	}),
	modelo: null,
	model() {
		console.log('POST PAGE');
		var tk  = this.get('session.accessToken');
		let _this = this;
		// console.log(tk);
		let postId = Ember.get(this.modelFor('post'), 'postid');
		// let postid = params.postid;
		// let userid = this.get('session.userId');
		// console.log(postid);
		var getJSON = this.get('getJSON');
		return Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/post`, {
			access_token: tk,
			id: postId
		}).then(item => {
				let json = JSON.parse(item);
				console.log('jsonPost', json);
    			json.comments.perguntas = [];
    			json.comments.positivos = [];
    			let perguntasQuery = "?";
    			let positivosQuery =  ['#Jatene', 'Parabéns', 'Muito legal'];
				json.comments.data.map(comment=>{ 
					if (comment.message.indexOf(perguntasQuery) !== -1) {
    					json.comments.perguntas.addObject(comment);
    				}
    				positivosQuery.map(query=> {
    					// console.log('positivoQuery', query);
    					if (comment.message.indexOf(query) !== -1) {
	    					json.comments.positivos.addObject(comment);
	    				}
    				});
    				
					getJSON(comment.id, comment.from.id, tk).then(data=> {
						_this.get('postUsers').addObject(data);
					});
				});
				return json;
		});
	},
	afterModel(model) {
		// this._super(...arguments);
		// let modelo = this.get('modelo');
		// modelo.set('.addObject(model);
		// console.log('aqui', model);
		this.set('modelo', model);
	},
	deactivate() {
		let postUsers =  this.get('postUsers');
		postUsers.clear();
		// this.set('following', false);
	},
	getJSON: function(commentId, userId, tk) {
	    var promise =  new Ember.RSVP.Promise(function(resolve, reject){
		    Ember.$.get(`http://www.instadev.com.br/facebook-api-wrapper/user_info`, {
		        access_token: tk,
		        id: userId
		    }).then(item => {
		        let jsonItem = JSON.parse(item);
		        jsonItem.commentId = commentId;
		        // console.log('jsonUserInfo', jsonItem);
		        resolve(jsonItem);
		    }, function() {
		        reject(new Error('getJSON: `' + commentId + '` failed with status: [' + this.status + ']'));
		    });
	    });
	    return promise;
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('postUsers', this.get('postUsers'));
		controller.set('isFollowing', this.get('isFollowing'));
		// controller.set('following', this.get('following'));
	},
	actions: {
		unfollowPost(post) {
			console.log('unfollow', post);
			// let _this = this;
			var promises = [];
			// let count = 0;
			// let promisesCount = [];
			// let resultCount = null;
			
			// comment count
			
			// this.store.findAll('comment').then(function(res) {				
			// 	resultCount = res.get('length');
			// 	console.log('comentários: ' + resultCount);
			// });

			this.store.find('post', post.id).then(function(postRes) {
				console.log(postRes.get('id'));
				postRes.get('comments').map(function(comment) {
					let commentId = comment.get('id');
					comment.deleteRecord();
					promises.pushObject(new Ember.RSVP.Promise(function(resolve, reject) {
						comment.save().then(function() {
							let currentdate = new Date(); 
							let datetime = "Last Sync: " + currentdate.getDate() + "/" +
											(currentdate.getMonth()+1)  + "/"  +
											currentdate.getFullYear() + " @ "   +
											currentdate.getHours() + ":"  +
											currentdate.getMinutes() + ":"  +
											currentdate.getSeconds();
							console.log('deletado ' + commentId + ' @ ' + datetime);
							resolve('success');
						}, function() {
							reject(new Error('getJSON: `' + comment.get('message') + '` failed with status: [' + this.status + ']'));
						});
					}));
				});
				Ember.RSVP.allSettled([
					promises	
				]).then(function() {
					let currentdate = new Date(); 
					let datetime = "Last Sync: " + currentdate.getDate() + "/" +
									(currentdate.getMonth()+1)  + "/"  +
									currentdate.getFullYear() + " @ "   +
									currentdate.getHours() + ":"  +
									currentdate.getMinutes() + ":"  +
									currentdate.getSeconds();
					console.log('comentários deletados, agora exclui o post @ ' + datetime);
					// console.log('postRes', postRes.get('currentState.stateName'));
					postRes.save().then(function() {
						postRes.deleteRecord();
						postRes.save().then(function() {
							console.log('post deletado');
						});
					});
				});
			});
		},
		followPost(post) {
			let _this = this;
			let summary = JSON.parse(JSON.stringify(post.comments.summary));
			let comments = JSON.parse(JSON.stringify(post.comments));
			delete post.comments;
			post.summary = summary;
			
			if (!post.shares) {
				console.log('sem shares');
				post.shares = {
					count: 0
				};
			}

			console.log('followantes', post);
			let newPost = this.store.createRecord('post', post);
			newPost.set('comments', []);
			var promises = [];
			comments.data.map(comentario=> {
				let currentdate = new Date(); 
				let datetime = "Last Sync: " + currentdate.getDate() + "/" +
				                (currentdate.getMonth()+1)  + "/"  +
				                currentdate.getFullYear() + " @ "   +
				                currentdate.getHours() + ":"  +
				                currentdate.getMinutes() + ":"  +
				                currentdate.getSeconds();
				console.log('map: ' + datetime);

				if ( !comentario.parent ) { 
					comentario.parent = [];
				}
				let comment = _this.store.createRecord('comment', comentario);
				newPost.get('comments').pushObject(comment);
			  	promises.pushObject(new Ember.RSVP.Promise(function(resolve, reject){
				    comment.save().then(function() {
						// console.log('salvou comment: ' + comment.get('message'));
						resolve('success');
					}, function() {
						reject(new Error('getJSON: `' + comment.get('message') + '` failed with status: [' + this.status + ']'));
					});
		    	}));
			});
			Ember.RSVP.allSettled([
			  promises	
			]).then(function(){
			  // console.log('values', values[0]);
			  // var mapFn = function(item){
			  // 	console.log(item);
			  //   return item === 'success';
			  // };
			  // Ember.RSVP.map(values[0].value, mapFn).then(function(result){
			  // 	console.log('resultadoPromise', result);
			  // });
			  newPost.save().then(function() {
				  console.log('salvou post');
				  // _this.set('following', true);
			  }, function(error) {
				  console.log('erro post', error);
				  // console.log('status post', this.status);
			  });
			}, function(error) {
					alert('Erro ao seguir post');
					console.log('erro gravando comentário: ' + error);
			});
			let currentdate = new Date(); 
			let datetime = "Last Sync: " + currentdate.getDate() + "/" +
			                (currentdate.getMonth()+1)  + "/" + 
			                currentdate.getFullYear() + " @ " +  
			                currentdate.getHours() + ":" +  
			                currentdate.getMinutes() + ":" + 
			                currentdate.getSeconds();	
			console.log('map depois: ' + datetime);
		},
		recordPost(post) {
			alert('Gravando ' + post.id);
		}
	}
});