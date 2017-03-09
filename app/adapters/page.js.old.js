import DS from 'ember-data';
console.log('PAGE ADAPter');
export default DS.RESTAdapter.extend({
	host: 'http://www.secom.pa.gov.br/site/api',
	urlForFindRecord(id) {
		console.log('adapter: ', id);
		return `${this.get('host')}/get_page/?slug=${id}`;
	}
});