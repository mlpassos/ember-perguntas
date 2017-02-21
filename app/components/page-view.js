import Ember from 'ember';

export default Ember.Component.extend({
	tamanhoCover: '',
	_getMeta: function(url, callback){   
	    var img = new Image();
	    img.src = url;
	    img.onload = function(){
	        console.log( this.width+' '+ this.height );
	        callback(this.height);
	    };
	},
	init() {
		this._super(...arguments);
		console.log('Iniciando componente USERS-VIEW...');
	},
	didInsertElement() {
		this._super(...arguments);
		console.log('InsertElement');
		let _this = this;
		let src = this.get('page').cover.source;
		let getMeta = this.get("_getMeta");
		getMeta(src, function(tam) {
			console.log('coversize', tam);
			_this.set('tamanhoCover', tam);
		});
	},
	setupController(controller) {
		this._super(...arguments);
		controller.set('tamanhoCover', this.get('tamanhoCover'));
	}
});