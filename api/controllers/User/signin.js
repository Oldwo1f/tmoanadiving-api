module.exports = {


	friendlyName: 'Add user',


	description: 'Add a new user',


	extendedDescription:
		`This creates a new user record in the database, signs in the requesting user agent
  by modifying its [session](https://sailsjs.com/documentation/concepts/sessions), and
  (if emailing is enabled) sends an account verification email.
  
  If a verification email is sent, the new user's account is put in an "unconfirmed" state
  until they confirm they are using a legitimate email address (by clicking the link in
  the account verification message.)`,


	inputs: {

		emailAddress: {
			required: true,
			type: 'string',
			isEmail: true,
			description: 'The email address for the new account, e.g. m@example.com.',
			extendedDescription: 'Must be a valid email address.',
		},

		// password: {
		// 	type: 'string',
		// 	maxLength: 200,
		// 	example: 'passwordlol',
		// 	description: 'The unencrypted password to use for the new account.'
		// },

		firstName: {
			type: 'string',
			example: 'Frida Kahlo de Rivera',
			description: 'The user\'s full name.',
		},
		lastName: {
			type: 'string',
			example: 'Frida Kahlo de Rivera',
			description: 'The user\'s full name.',
		}

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

		emailAlreadyInUse: {
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},

	},


	fn: async function ({ emailAddress, firstName, lastName }) {
		const password = "TOTO"
		console.log('');
		if (!password) {

			const { customAlphabet } = require('nanoid')
			const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)
			password = nanoid()
		}
		console.log('email: ', emailAddress);
		console.log('firstName: ', firstName);
		console.log('lastName: ', lastName);
		var newEmailAddress = emailAddress.toLowerCase();

		// Build up data for the new user record and save it to the database.
		// (Also use `fetch` to retrieve the new ID so that we can use it below.)
		var newUserRecord = await User.create(_.extend({
			fullName: firstName + ' ' + lastName,
			firstName,
			lastName,
			status: 'actif',
			emailAddress: newEmailAddress,
			password: await sails.helpers.passwords.hashPassword(password),
			tosAcceptedByIp: this.req.ip
		}, sails.config.custom.verifyEmailAddresses ? {
			emailProofToken: await sails.helpers.strings.random('url-friendly'),
			emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
			emailStatus: 'unconfirmed'
		} : {}))
			.intercept('E_UNIQUE', 'emailAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid')
			.fetch();


		console.log('ho');

		// If billing feaures are enabled, save a new customer entry in the Stripe API.
		// Then persist the Stripe customer id in the database.
		// if (sails.config.custom.enableBillingFeatures) {
		// 	let stripeCustomerId = await sails.helpers.stripe.saveBillingInfo.with({
		// 		emailAddress: newEmailAddress
		// 	}).timeout(5000).retry();
		// 	await User.updateOne({ id: newUserRecord.id })
		// 		.set({
		// 			stripeCustomerId
		// 		});
		// }

		// Store the user's new id in their session.
		this.req.session.userId = newUserRecord.id;

		// In case there was an existing session (e.g. if we allow users to go to the signup page
		// when they're already logged in), broadcast a message that we can display in other open tabs.
		// if (sails.hooks.sockets) {
		// 	await sails.helpers.broadcastSessionChange(this.req);
		// }

		if (sails.config.custom.verifyEmailAddresses) {
			console.log('SEND EMAIL TEMPLATE');
			// Send "confirm account" email
			await sails.helpers.email.sendHtmlEmail.with({
				to: newEmailAddress,
				subject: 'Please confirm your account',
				layout: 'layout-email',
				template: 'email-verify-account',
				templateData: {
					fullName: newUserRecord.fullName,
					token: newUserRecord.emailProofToken
				},
				from: 'noreply@test.fr'
			});
		} else {
			sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
		}

	}

};
