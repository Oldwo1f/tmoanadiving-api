module.exports = {


	friendlyName: 'Get one Partenaire',


	description: 'Fetch Partenaire by id and retrieve it',


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
			description: 'Voici votre Partenaire'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Partenaire | get-one ==> ', id);




		var record = await Partenaire.findOne(id).populate('images').populate('logos')
			.intercept({ name: 'UsageError' }, 'invalid')


		return record

	}

};
