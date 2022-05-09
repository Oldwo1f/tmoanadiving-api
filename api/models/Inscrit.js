/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {


		email: {
			type: 'string',
			required: true,
			unique: true,
			isEmail: true,
			maxLength: 200,
			example: 'mary.sue@example.com'
		},
		firstName: {
			type: 'string',
			description: 'Full representation of the user\'s firstname.',
			maxLength: 50,
			example: 'Mary'
		},
		lastName: {
			type: 'string',
			description: 'Full representation of the user\'s lastname.',
			maxLength: 50,
			example: 'Sue van der McHenst'
		},
		birthDate: {
			type: 'string',
			description: 'Une string représentant la date de naissance au format Francais',
			example: '09/02/1990'
		},
		phone: {
			type: 'string',
			maxLength: 8,
			example: '89547845 | +89956565656'
		},
		city: {
			type: 'string',
			maxLength: 25,
			example: 'Paea'
		},
		optin: {
			type: 'boolean',
		},
		gender: {
			type: 'string',
		},

		jeu: {
			model: 'jeu'
		}

	},


};
