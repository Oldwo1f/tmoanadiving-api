module.exports = {


	friendlyName: 'Delete one Partenaire',


	description: 'Fetch Partenaire by id and delete it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		}

	},


	exits: {

		success: {
			description: 'Partenaire supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Partenaire | delete-one ==> ', id);




		var record = await Partenaire.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
