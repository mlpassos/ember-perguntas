import Ember from 'ember';

export default Ember.Component.extend({
	grid: null,
	animou: 0,
	init() {
		this._super(...arguments);
		console.log('Iniciando componente POSTS-LIST...');
	},
	didInsertElement() {
		this._super(...arguments);
		var _this = this;
		console.log('InsertElement aqui');
		// this.$('.animateUp').each(function(item) {
			// console.log(this.$('.fb-reactions'));
		// });
		// console.log(this.$('.fb-reactions'));
		// let react = this.$('.fb-reactions');
		// react.map(function(index, el) {
		// 	console.log('r', el);
		// });
		var $grid = this.$('.isogrid').isotope({
			// options
			itemSelector: '.isoitem',
			// layoutMode: 'fitRows',
			percentPosition: true
		});
		// this.$('ul.reactions-list').imagesLoaded().progress( function(instance,image) {
		// 	console.log('carregando reactions...');
		// 	var result = image.isLoaded ? 'loaded' : 'broken';
		// 	console.log( 'reaction image is ' + result + ' for ' + image.img.src );
		// });
		$grid.imagesLoaded().progress( function(instance,image) {
			console.log('isotope layouting...');
			var result = image.isLoaded ? 'loaded' : 'broken';
    		if (image.isLoaded) {
				console.log( 'image is ' + result + ' for ' + image.img.src );
			} else {
				console.log('not loaded yet');
			}
			_this.$('.isogrid').isotope('layout');
		}).done(function(instance) {
			console.log('todas imagens carregaram');
			// _this.$('.isogrid').isotope('layout');
		});
		// this.set('grid', $grid);
	},
	didUpdateAttrs() {
		this._super(...arguments);
		console.log('updatedAttrs post-list');
	},
	didRender() {
		this._super(...arguments);
		// let _this = this;
		console.log('didrender posts-list');
		// let $grid = this.get('grid');
		// $grid.imagesLoaded().progress( function() {
		//   console.log('layout');
	  //     $grid.isotope('layout');
	  // });
		// let react = this.$('.fb-reactions.anima');

		// react.map(function(index, el) {

		// 		var $el = _this.$(el);
		// 		var animateTo = $el.attr('data-animate-to');
		// 		var animated = $el.attr('data-animated');
		// 		console.log('animou span', animateTo);
		// 		console.log('animated', animated);
		// 		if (animated) {
		// 			// já animado
		// 			console.log('já animado');
		// 		} else {
		// 			$el.next('span').fadeOut(function() {
		// 				console.log('escondeu span');
		// 				$(this).text(animateTo);
		// 				$(this).fadeIn('slow', function() {
		// 					console.log('mostrou span');
		// 					$el.attr('data-animated', true); 
		// 				});
		// 			});
		// 		 }
		// 		// $el.attr('data-animated', true);
		// });

	},
	willDestroyElement() {
	  this._super(...arguments);
	  // this.$().off('animationend');
	  this.$('.isogrid').isotope('destroy');
	  console.log('ISOTOPE OFF');
	}
});