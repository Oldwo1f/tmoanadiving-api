module.exports = {


	friendlyName: 'Get Plongee FRONT',


	description: 'Fetch Plongee list and retrieve it',


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
		console.log('CONTROLLER: Plongee | get-all-FRONT');



		var record = await Plongee.find({ status: 'actif' }).populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
