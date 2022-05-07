module.exports = {


	friendlyName: 'Get me',


	description: 'Fetch the connected user ',


	extendedDescription:
		``,


	inputs: {
		// id: {
		// 	required: true,
		// 	type: 'string',
		// 	description: 'The id of user',
		// }

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
		console.log('CONTROLLER: Auth | get-me ==> ');

		// const userId = '61c8f96b22230d6ff463aa8a'
		const userId = this.req.session.userId

		console.log('this.req.user');
		console.log(userId);


		var record = await User.findOne(userId)
			.intercept({ name: 'UsageError' }, 'invalid')

		// this.res.set('Access-Control-Allow-Headers', 'strict-origin-when-cross-origin, access-control-allow-headers, application/json, text/plain, */*, Authorization');
		// this.res.send(record)
		return { user: record }

	}

};
