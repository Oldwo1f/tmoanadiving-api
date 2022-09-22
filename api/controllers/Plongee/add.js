module.exports = {


	friendlyName: 'Add Plongee',


	description: 'Add a new Plongee',


	inputs: {


		name: {
			type: 'string',
			example: 'Frida Kahlo de Rivera',
			description: 'The user\'s full name.',
		},


	},


	exits: {

		success: {
			description: 'New plongee was created successfully.'
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
		var newRecord = await Plongee.create({
			name: name, location: {
				"type": "Point",
				"coordinates": [parseFloat(0), parseFloat(0)]
			}
		})
			.intercept('E_UNIQUE', 'nameAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();





		return newRecord;
	}

};
