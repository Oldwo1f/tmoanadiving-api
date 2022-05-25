module.exports = {


	friendlyName: 'Get jeux',


	description: 'Fetch jeux list and retrieve it',


	extendedDescription:
		``,


	inputs: {
		page: {
			default: 0,
			type: 'number',
		},
		limit: {
			default: 0,
			type: 'number',

		},
		archive: {
			default: 0,
			type: 'boolean',

		},

	},


	exits: {

		success: {
			description: 'Voici la list.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ page, limit, archive }) {
		console.log('CONTROLLER: Jeu | get-all');
		page = page ? page : 1;
		limit = limit ? limit : 100;
		archive = archive ? archive : false;
		console.log('pageParams: ', page);
		console.log('limitParams: ', limit);
		console.log('archive: ', archive);

		if (archive) {
			var record = await Jeu.find({ status: 'archive' }).limit(limit).skip((page - 1) * (limit - 1)).populate('inscrits')
				.intercept({ name: 'UsageError' }, 'invalid')
		} else {
			var record = await Jeu.find({ status: { '!=': 'archive' } }).limit(limit).skip((page - 1) * (limit - 1)).populate('inscrits')
				.intercept({ name: 'UsageError' }, 'invalid')
		}




		return record

	}

};
