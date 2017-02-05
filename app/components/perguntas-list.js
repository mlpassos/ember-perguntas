import Ember from 'ember';

export default Ember.Component.extend({
		// routing: Ember.inject.service(),
		// store: Ember.inject.service(),
		// entrou: false,
		// didInsertElement() {
		// 	console.log('didInserElement no pautas');
		// 	let _this = this;
		//     let $grid = this.$('.isogrid').isotope({
		//       itemSelector: '.isoitem',
		//       layoutMode: 'fitRows',
		//       percentPosition: true,
		//       getSortData: {
		// 	      title: function( itemElem ) {
	 //                var valor = _this.$( itemElem ).children('.card').children('.card-content').find('.card-title').text();
	 //                return valor.trim();
	 //              }
  //         	  },
  //         	  sortBy: 'title',
  //         	  sortAscending: true
		//     });
		//     $grid.imagesLoaded().progress( function() {
		//       $grid.isotope('layout');
		//     });
		//     $grid.on( 'arrangeComplete',
		// 	  function( event, filteredItems ) {
		// 	    console.log( 'Isotope arrange completed on ' +
		// 	      filteredItems.length + ' items' );
		// 	  }
		// 	);
		//     // this.set('grid', $grid);
		// },
		// didReceiveAttrs() {
		//     this._super(...arguments);
		//     console.log('didReceiveAttrs no pautas');
		// },
		// didUpdateAttrs() {
		// 	this._super(...arguments);
		// 	console.log('didUpdateAttrs no pautas');
		// },
		// didRender() {
		// 	this._super(...arguments);
		// 	console.log('PAUTAS-VIEW RENDER');
			
		// 	let $grid = this.$('.isogrid');
		// 	let _this = this;
		// 	let isDeleted = $grid.children('.isoitem').hasClass('pauta-deleted');
		// 	let entrou = this.get('entrou');
			
		// 	if (isDeleted === true) {
		// 		$grid.children('.isoitem').each(function(index,item) {
		// 			let $el = _this.$(item);
		// 			if ($el.hasClass('pauta-deleted')) {
		// 				console.log('PAUTAS DELETADAS');
		// 				$grid.isotope( 'remove', $el ).isotope();
		// 				let arr = $el.context.className.split(/\s+/);//[6].length
		// 				let last = arr[arr.length - 1];
		// 				let lastLen = last.length;
		// 				let id = last.substr(4,lastLen);
		// 				console.log('ID DO REMOVIDO', id);
		// 				_this.get('store').findRecord('pauta', id).then(function(pauta) {
		// 					console.log('unload no remoto', pauta.get('retranca'));
		// 					pauta.save().then(function() {
		// 						console.log('UNLOAD REMOTO');
		// 					});
		// 					// _this.get('store').unloadRecord(pauta);
		// 				});
		// 			} else {
		// 				console.log('SEM PAUTAS DELETADAS');
		// 			}
		// 		});
		// 	}

		// 	if (entrou === true) {
		// 		console.log('ENTROU');
		// 		$grid.isotope({
		// 	      itemSelector: '.isoitem',
		// 	      layoutMode: 'fitRows',
		// 	      percentPosition: true,
		// 	      getSortData: {
		// 		      title: function( itemElem ) {
		//                 var valor = _this.$( itemElem ).children('.card').children('.card-content').find('.card-title').text();
		//                 return valor.trim();
		//               }
	 //          	  },
	 //          	  sortBy: 'title',
	 //          	  sortAscending: true
		// 	    });
		// 	}
		// 	console.log('tamanho atual', Object.keys($grid.isotope('getItemElements')).length);
		// 	this.set('entrou', false);
		// },
		// willDestroyElement() {
		//   this._super(...arguments);
		//   // this.$().off('animationend');
		//   this.$('.isogrid').isotope('destroy');
		//   console.log('ISOTOPE OFF');
		// },
		// actions: {
		// 	refresh() {
		// 		this.sendAction('on-refresh');
		// 	},
		// 	entrouPauta(obj) {
		// 		let $grid = this.$('.isogrid');
		// 		let $item = this.$('.item'+obj.id);
		// 		switch(obj.status) {
		// 		    case 'adicionado':
		// 		    	console.log('adiciona');
		// 		    	if (this.get('entrou') === false) {
		// 					$grid.isotope('destroy');
		// 					console.log('reset isotope');
		// 					this.set('entrou', true);
		// 				}
		// 		        break;
		// 		    case 'atualizado':
		// 		        console.log('ATUALIZADO');
		// 		        $item.css('background-color', 'green');
		// 		        $grid.isotope('layout');
		// 		        break;
		// 		    case 'removido':
		// 		    	console.log('REMOVIDO');
		// 		    	// $item.css('background-color', 'red');
		// 		    	// $grid.isotope( 'remove', $item ).isotope('layout');
		// 		    	// // debugger;
		// 		    	// this.get('model').map((pauta) => {
		// 		    	// 	if (pauta.get('id') === obj.id) {
		// 			    // 		console.log('get pauta', pauta);
		// 			    // 		console.log('isDeleted', pauta.get('isDeleted'));          // true
		// 			    // 		console.log('isSaving', pauta.get('isSaving'));           // false
		// 			    // 		console.log('hasDirtyAttributes', pauta.get('hasDirtyAttributes')); //
		// 			    // 	}
		// 		    	// });
		// 		    	// this.set('entrou', true);
		// 		    	break;
		// 		    default:
		// 		        console.log('Sem entrouPauta()');
		// 		}
		// 	},
		// 	verPauta(slug) {
		// 		console.log('verPauta', slug);
		// 		this.sendAction('on-ver', slug);
		// 	},
		// 	editPauta(slug) {
		// 		console.log('editPauta', slug);
		// 		this.sendAction('on-edit', slug);
		// 	},
		// 	delPauta(pauta) {
		// 		console.log('delPauta', pauta.get('id'));
				
		// 		let _this = this;
		// 		let item = this.$('.item'+pauta.get('id'));
				
		// 		pauta.deleteRecord();
		// 	    if (pauta.get('isDeleted')) {
		// 	    	pauta.save().then(function() {
		// 	    		console.log('EXCLUIDO PRA SEMPRE', item);
		// 	    		_this.sendAction('on-del', pauta);
		// 	    	}, function() {
		// 	    		console.log('DEU BUG AO EXCLUIR');
		// 	    		_this.sendAction('on-del', false);
		// 	    	});
		// 	    }
		// 	}
		// }
});