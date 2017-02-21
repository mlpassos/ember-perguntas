import Ember from 'ember';

export default Ember.Component.extend({
	grid: null,
	init() {
		this._super(...arguments);
		console.log('Iniciando componente POSTS-LIST...');
	},
	didInsertElement() {
		this._super(...arguments);
		console.log('InsertElement');
	    let $grid = this.$('.isogrid').isotope({
	      // options
	      itemSelector: '.isoitem',
	      layoutMode: 'fitRows',
	      percentPosition: true
	    });
	    $grid.imagesLoaded().progress( function() {
	      $grid.isotope('layout');
	    });
	},
	willDestroyElement() {
	  this._super(...arguments);
	  // this.$().off('animationend');
	  this.$('.isogrid').isotope('destroy');
	  console.log('ISOTOPE OFF');
	}
});