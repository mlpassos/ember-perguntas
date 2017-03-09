import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
	attrs: {
	  categories: { embedded: 'always' },
	  tags: { embedded: 'always' }
	},
	// keyForAttribute: function(attr, method) {
	// 	return Ember.String.underscore(attr).toUpperCase();
	// },
	modelNameFromPayloadKey: function(payloadKey) {
		console.log('noticia.key: ', payloadKey);
		// if (payloadKey == 'post') {
		// 	return this._super('post');
		// } else {
		// 	return this._super(payloadKey);
		// }
		return this._super(payloadKey);
	},
	// primaryKey: 'slug',
	normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		let target = primaryModelClass.modelName;
		switch(requestType) {
			case 'query':
				console.log('noticia.query: ', target);
				let count = parseInt(payload.count);
				let pages = parseInt(payload.pages);
				let meta = {
					'count_total': (typeof payload.count_total === 'undefined') ? count*pages : payload.count_total,
					'count': count,
					// 'page': payload.page,
					'pages': pages
				};
				payload = payload.posts;
				// payload = payload.map(rawItem => {
				// 	rawItem.oldId = rawItem.id;
				// 	rawItem.id = rawItem.slug;
				// 	return rawItem;
				// });
				// .map(noticia => {
				// 	return noticia;
				// });
				payload = {post: payload, meta: meta};
				break;
			case 'findAll':
				console.log('noticia.findAll: ', target);
				// let meta = {
				// 	'total': payload.count_total,
				// 	'count': payload.count,
				// 	'pages': payload.pages
				// };
				payload = payload.posts;
				// .map(post => {
				// 	return post;
				// });
				// payload = {post: payload, meta: meta};
				payload = {post: payload};
				// console.log(payload);
				break;
			case 'findRecord':
				console.log('noticia.findRecord: ', target);
				payload = payload.post;
				payload = {post: payload};
				break;
			default:
				console.log('default');
		}
		console.log('load: ', payload);
		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});