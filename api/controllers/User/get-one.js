module.exports = {


	friendlyName: 'Get one user',


	description: 'Fetch user by id and retrieve it',


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
			description: 'Voici votre utilisateur'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: User | get-one ==> ', id);




		var record = await User.findOne(id).populate('passacheter').populate('plongees')
			.intercept({ name: 'UsageError' }, 'invalid')


		return record

	}

};
