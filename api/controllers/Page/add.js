
module.exports = {


	friendlyName: 'Add option',


	description: 'Add a new Partenaire',


	inputs: {


		name: {
			type: 'string',
		}


	},


	exits: {

		success: {
			description: 'New option was created successfully.'
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

		console.log('Create new page');

		var newRecord = await Page.create({ name: name })
			.intercept('E_UNIQUE', 'nameAlreadyInUse')
			// .intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();





		return newRecord;
	}

};
