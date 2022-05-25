

module.exports = {


	friendlyName: 'Get Partenaire',


	description: 'Fetch Partenaire list and retrieve it',


	extendedDescription:
		``,


	inputs: {


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


	fn: async function () {
		console.log('CONTROLLER: Page | get-all');

		var record = await Page.find()
			.intercept({ name: 'UsageError' }, 'invalid')





		return record

	}

};
