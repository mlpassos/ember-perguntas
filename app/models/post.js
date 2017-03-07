import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	message: attr('string'),
	type: attr('string'),
	full_picture: attr(),
	shares: attr(),
	created_time: attr('string'),
	angry: attr(),
	haha: attr(),
	like: attr(),
	love: attr(),
	sad: attr(),
	wow: attr(),
	comments: DS.hasMany('comment')
	//,
	// categories: DS.hasMany('category'),
	// tags: DS.hasMany('tag'),
	// thumbnail_images: attr()
});