import Ember from 'ember';

export default Ember.Component.extend({
	didRender() {
		this._super(...arguments);
		let $window = this.$(window);
		let $el = this.$('.post-card');
		let position = $el.position();
		let top = position.top;
		// console.log('first top', top);
		// console.log('first height',  $window.height());
		$window.scroll(function(){
			// console.log($window.scrollTop());
			// console.log($window.width());
			let qtdeScroll = $window.scrollTop();
			let addToTop = 0;
	        if (qtdeScroll > 88 && $window.width() > 768){
	            addToTop = qtdeScroll - 88;
	            // console.log('Add to top', addToTop);
	            top = addToTop;
	            $el.css({
	            	'top': addToTop + 'px'
	            	// 'position': 'fixed'
	            });
	            // , 300, function() {
	            // 	console.log('ajustado');
	            // });
	            // console.log('novo top', top);
	        } else {
	        	top = 0;
	        	$el.css({
	            	'top': top+'px'
	            	// 'position': 'fixed'
	            });
	            // console.log('reset top', top);
	        }
	    });	
	}
});
