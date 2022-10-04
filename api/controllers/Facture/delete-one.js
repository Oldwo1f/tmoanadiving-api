module.exports = {


	friendlyName: 'Delete one Facture',


	description: 'Fetch Facture by id and delete it',


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
			description: 'Facture supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Facture | delete-one ==> ', id);




		var record = await Facture.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
