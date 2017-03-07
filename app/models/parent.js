import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
	comment: DS.belongsTo('comment'),
	created_time: attr('string'),
	from: attr(),
	like_count: attr('number'),
	message: attr('string')
});