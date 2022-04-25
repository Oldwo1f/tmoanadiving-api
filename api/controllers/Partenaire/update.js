module.exports = {


	friendlyName: 'Update Partenaire',


	description: 'Fetch Partenaire by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The Partenaire of jeu',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new Partenaire datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours Partenaire réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Partenaire | update ==> ', id);

		// console.log('datas', datas);
		delete datas.images
		delete datas.logos
		// console.log('datas', datas);


		var result = await Partenaire.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		var record = await Partenaire.findOne(id).populate('images').populate('logos')

		console.log(record);


		return record

	}

};
