import Ember from 'ember';

export default Ember.Component.extend({
	grid: null,
	init() {
		this._super(...arguments);
		console.log('Iniciando componente POSTS-LIST...');
	},
	didInsertElement() {
		this._super(...arguments);
		console.log('InsertElement aqui');
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
	// didRender() {
	// 	console.log('didrender');
	// 	let $grid = this.get('grid');
	// 	$grid.imagesLoaded().progress( function() {
	// 	  console.log('layout');
	//       $grid.isotope('layout');
	//     });
	// },
	willDestroyElement() {
	  this._super(...arguments);
	  // this.$().off('animationend');
	  this.$('.isogrid').isotope('destroy');
	  console.log('ISOTOPE OFF');
	}
});