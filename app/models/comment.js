import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	post: DS.belongsTo('post'),
	created_time: attr('string'),
	from: attr(),
	like_count: attr('number'),
	message: attr('string'),
	// parent: DS.belongsTo('parent')
	parent: attr()
});