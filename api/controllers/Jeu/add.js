module.exports = {


	friendlyName: 'Add jeu',


	description: 'Add a new jeu',


	inputs: {

		// emailAddress: {
		// 	required: true,
		// 	type: 'string',
		// 	isEmail: true,
		// 	description: 'The email address for the new account, e.g. m@example.com.',
		// 	extendedDescription: 'Must be a valid email address.',
		// },
		// firstName: {
		// 	type: 'string',
		// 	example: 'Frida Kahlo de Rivera',
		// 	description: 'The user\'s full name.',                                                      
		// },
		name: {
			type: 'string',
			example: 'Frida Kahlo de Rivera',
			description: 'The user\'s full name.',
		},
		// role: {
		// 	type: 'string',
		// 	example: 'user',
		// 	description: 'The user\'s role.',
		// }

	},


	exits: {

		success: {
			description: 'New jeu was created successfully.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'The provided name is invalid.',

		},
		invalid2: {
			statusCode: 408,
			description: 'Database Error',
		},

		nameAlreadyInUse: {
			responseType: 'custom',
			statusCode: 409,
			description: 'The provided Name is already in use.',
		},

	},


	fn: async function ({ name }) {


		// const { customAlphabet } = require('nanoid')
		// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)
		// password = nanoid()
		// console.log('email: ', emailAddress);
		// console.log('firstName: ', firstName);
		// console.log('lastName: ', lastName);
		// var newEmailAddress = emailAddress.toLowerCase();

		// Build up data for the new user record and save it to the database.
		// (Also use `fetch` to retrieve the new ID so that we can use it below.)
		var newRecord = await Jeu.create({ name: name })
			.intercept('E_UNIQUE', 'nameAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();





		return newRecord;
	}

};
