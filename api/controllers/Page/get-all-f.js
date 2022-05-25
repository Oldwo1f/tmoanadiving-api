module.exports = {


	friendlyName: 'Get Page FRONT',


	description: 'Fetch Page list and retrieve it',


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


	fn: async function ({ page, limit, archive }) {
		console.log('CONTROLLER: Page | get-all-FRONT');



		var record = await Page.find({ status: 'actif' }).populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
