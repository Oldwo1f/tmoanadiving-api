module.exports = {


	friendlyName: 'Update Facture',


	description: 'Fetch Facture by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The Facture of jeu',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new Facture datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours Facture réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Facture | update ==> ', id);


		// console.log('datas', datas);


		var result = await Partenaire.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		var record = await Partenaire.findOne(id).populate('images').populate('logos')

		console.log(record);
		record.lng = record.location.coordinates[0]
		record.lat = record.location.coordinates[1]

		return record

	}

};
