import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	permalink_url: attr('string'),
	description: attr('string', {defaultValue: false}),
	message: attr('string'),
	type: attr('string'),
	full_picture: attr('string'),
	shares: attr(),
	created_time: attr('string'),
	updated_time: attr('string'),
	angry: attr(),
	haha: attr(),
	like: attr(),
	love: attr(),
	sad: attr(),
	wow: attr(),
	comments: DS.hasMany('comment'),
	summary: attr()
	// ,
	// comments_count: Ember.computed('comment', function() {
	// 	console.log('aquiaqui', `${this.get('comment').length()}`);
 //    return `${this.get('comment').length()}`;
 //  })
	//,
	// categories: DS.hasMany('category'),
	// tags: DS.hasMany('tag'),
	// thumbnail_images: attr()
});