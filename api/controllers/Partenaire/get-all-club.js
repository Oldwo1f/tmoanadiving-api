module.exports = {


	friendlyName: 'Get club',


	description: 'Fetch Partenaire list and retrieve it',


	extendedDescription:
		``,


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
		console.log('CONTROLLER: Partenaire | get-all-club');


		var record = await Partenaire.find({ type: 'club' }).populate('logos').populate('images')
			.intercept({ name: 'UsageError' }, 'invalid')





		return record

	}

};
