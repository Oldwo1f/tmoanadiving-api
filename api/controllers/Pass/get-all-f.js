module.exports = {


	friendlyName: 'Get Pass FRONT',


	description: 'Fetch Pass list and retrieve it',


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
		console.log('CONTROLLER: Pass | get-all-FRONT');



		var record = await Pass.find({ status: 'actif' }).populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
