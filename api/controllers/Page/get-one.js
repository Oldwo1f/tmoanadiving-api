

module.exports = {


	friendlyName: 'Get one Page',


	description: 'Fetch Partenaire by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Option',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Page'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Page | get-one ==> ', id);




		var record = await Page.findOne(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return record

	}

};
