module.exports = {


	friendlyName: 'Add Partenaire',


	description: 'Add a new Partenaire',


	inputs: {


		name: {
			type: 'string',
		},

		login: {
			type: 'string',

		},
		password: {
			type: 'string',

		},


	},


	exits: {

		success: {
			description: 'New partenaire was created successfully.'
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


	fn: async function ({ name, login, password }) {


		console.log('add part');
		console.log(name);
		console.log(login);
		console.log(password);


		var newRecord = await Partenaire.create({
			name: name,
			password: await sails.helpers.passwords.hashPassword(password),
			login: login,
			location: {
				"type": "Point",
				"coordinates": [parseFloat(0), parseFloat(0)]
			}
		})
			.intercept('E_UNIQUE', 'nameAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();

		console.log('newRecord==>', newRecord);



		return newRecord;
	}

};
