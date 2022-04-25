module.exports = {


	friendlyName: 'Get Partenaire FRONT',


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


	fn: async function ({ page, limit, archive }) {
		console.log('CONTROLLER: Partenaire | get-all-FRONT');



		var record = await Partenaire.find({ status: 'actif' }).populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
