module.exports = {


	friendlyName: 'Add firstAdmin',


	description: 'Add a new user',


	extendedDescription:
		`This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing is enabled) sends an account verification email.
  
  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,


	inputs: {



	},


	exits: {

		success: {
			description: 'New user account was created successfully.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'The provided firstName, lastName, password and/or email address are invalid.',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},
		invalid2: {
			statusCode: 408,
			description: 'Database Error',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},

		emailAlreadyInUse: {
			responseType: 'custom',
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},

	},


	fn: async function () {


		console.log('ADD FIRST ADMIN');


		// Build up data for the new user record and save it to the database.
		// (Also use `fetch` to retrieve the new ID so that we can use it below.)
		var newUserRecord = await User.create({
			fullName: 'Alexis Momcilovic',
			firstName: 'Alexis',
			lastName: 'Momcilovic',
			role: 'admin',
			status: 'actif',
			emailAddress: 'alexismomcilovic@gmail.com',
			password: await sails.helpers.passwords.hashPassword('Alexis09'),
		})
			.intercept('E_UNIQUE', 'emailAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();




		return newUserRecord;
	}

};
