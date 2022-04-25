module.exports = {


	friendlyName: 'Get jeux FRONT',


	description: 'Fetch jeux list and retrieve it',


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
		console.log('CONTROLLER: Jeu | get-all-FRONT');



		var record = await Jeu.find({ status: 'actif' }).populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
