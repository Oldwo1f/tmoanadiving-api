module.exports = {


	friendlyName: 'Delete one jeu',


	description: 'Fetch jeu by id and delete it',


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
			description: 'Jeu supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Jeu | delete-one ==> ', id);




		var record = await Jeu.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
