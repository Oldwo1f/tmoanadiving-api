module.exports = {


	friendlyName: 'Update user',


	description: 'Fetch user by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new users datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours utilisateur réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: User | update ==> ', id);

		console.log('datas', datas);


		var record = await User.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid')


		return record

	}

};
