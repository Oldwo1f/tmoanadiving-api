module.exports = {


	friendlyName: 'Get one jeu',


	description: 'Fetch jeu by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of jeu',
		}

	},


	exits: {

		success: {
			description: 'Voici votre utilisateur'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Jeu | get-one ==> ', id);




		var record = await Jeu.findOne(id).populate('images').populate('logos').populate('inscrits').populate('imagesfin').populate('imagesgagnant')
			.intercept({ name: 'UsageError' }, 'invalid')


		return record

	}

};
