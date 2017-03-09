import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
	attrs: {
	  categories: { embedded: 'always' },
	  tags: { embedded: 'always' }
	},
	modelNameFromPayloadKey: function(payloadKey) {
		console.log('page.key: ', payloadKey);
		return this._super(payloadKey);
	},
	normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		let target = primaryModelClass.modelName;
		switch(requestType) {
			case 'findRecord':
				console.log('page.findRecord: ', target);
				payload = payload.page;
				// payload = payload.map((page) => {
				payload.oldId = payload.id;
				payload.id = payload.slug;
					// return page;
				// });
				payload = {page: payload};
				break;
			default:
				console.log('default');
		}
		console.log('load: ', payload);
		return this._super(store, primaryModelClass, payload, id, requestType);
	}
});