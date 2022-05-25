
module.exports = {


	friendlyName: 'Delete one Page',


	description: '',


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




		var record = await Page.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
