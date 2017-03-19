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
		$grid.imagesLoaded().progress( function() {
			$grid.isotope('layout');
		});
		// this.set('grid', $grid);
	},
	didRender() {
		this._super(...arguments);
		let _this = this;
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