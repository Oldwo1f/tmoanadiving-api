module.exports = {


	friendlyName: 'Add facture',


	description: 'Add a new facture',


	inputs: {


		numerofacture: {
			type: 'string',
		},

		nbplongeeResident: {
			type: 'number',

		},
		nbplongeeTouriste: {
			type: 'number',

		},
		emetteur: {
			type: 'string',

		},
		recepteur: {
			type: 'string',

		},


	},


	exits: {

		success: {
			description: 'New facture was created successfully.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'The provided name is invalid.',

		},


	},


	fn: async function ({ numerofacture, nbplongeeResident, nbplongeeTouriste, emetteur, recepteur }) {


		console.log('add facture');



		var newRecord = await Facture.create({
			numerofacture,
			nbplongeeResident,
			nbplongeeTouriste,
			emetteur,
			recepteur,
		})

			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();

		console.log('newRecord==>', newRecord);



		return newRecord;
	}

};
