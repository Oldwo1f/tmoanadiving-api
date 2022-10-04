module.exports = {


	friendlyName: 'Get one Facture',


	description: 'Fetch Facture by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Facture',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Facture'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Facture | get-one ==> ', id);




		var record = await Facture.findOne(id).populate('emetteur').populate('recepteur')
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log(record);

		return record

	}

};
