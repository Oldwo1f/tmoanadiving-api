module.exports = {


	friendlyName: 'Update Pass',


	description: 'Fetch Pass by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The Pass of jeu',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new Pass datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours Pass réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Pass | update ==> ', id);

		console.log('datas', datas);
		delete datas.images
		delete datas.logos


		// console.log('datas', datas);


		var result = await Pass.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		var record = await Pass.findOne(id).populate('user').populate('partenaire')


		return record

	}

};
