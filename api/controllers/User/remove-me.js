module.exports = {


	friendlyName: 'Delete one user',


	description: 'Fetch user by id and delete it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
		}

	},


	exits: {

		success: {
			description: 'Utilisateur supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: User | delete-one ==> ', id);




		var record = await User.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
