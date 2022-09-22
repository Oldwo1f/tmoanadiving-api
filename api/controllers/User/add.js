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
		firstName: {
			type: 'string',
		},
		lastName: {
			type: 'string',
		},
		birthDate: {
			type: 'string',
		},
		country: {
			type: 'string',
		},
		phone: {
			type: 'string',
		},
		level: {
			type: 'string',
		},
		firstName2: {
			type: 'string',
		},
		lastName2: {
			type: 'string',
		},
		birthDate2: {
			type: 'string',
		},
		country2: {
			type: 'string',
		},
		phone2: {
			type: 'string',
		},
		level2: {
			type: 'string',
		},


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


	fn: async function ({ emailAddress, firstName, lastName, birthDate, country, phone, level, firstName2, lastName2, birthDate2, country2, phone2, level2 }) {


		const { customAlphabet } = require('nanoid')
		const nanoid = customAlphabet('1234567890', 6)
		password = nanoid()
		var QRCode = require('qrcode')
		console.log('email: ', emailAddress);
		console.log('firstName: ', firstName);
		console.log('lastName: ', lastName);
		console.log('lastName2: ', lastName2);
		console.log('country: ', country);
		var newEmailAddress = emailAddress.toLowerCase();

		var idclient = firstName.slice(0, 1) + lastName.slice(0, 1) + nanoid();
		idclient = idclient.toUpperCase();
		console.log('idclient=', idclient);

		var optsQR = {
			errorCorrectionLevel: 'H',
			type: 'image/png',
			quality: 0.9,
			width: 250,
			margin: 1,
			color: {
				light: "#28A1C5",
				dark: "#002D41"
			}
		}
		const that = this;
		let qrcode = '';
		await QRCode.toDataURL(idclient, optsQR, function (err, url) {
			console.log('url = ', url)
			qrcode = url
		})

		console.log('qrcode', qrcode);
		await new Promise(resolve => setTimeout(resolve, 500));
		console.log('qrcode', qrcode);
		// Build up data for the new user record and save it to the database.
		// (Also use `fetch` to retrieve the new ID so that we can use it below.)
		// var newUserRecord = await User.create({ emailAddress: newEmailAddress, password: password }).fetch()
		var newUserRecord = await User.create(_.extend({
			fullName: firstName + ' ' + lastName,
			firstName: firstName,
			qrcode: qrcode,
			lastName: lastName,
			birthDate: birthDate,
			idclient: idclient,
			country: country,
			phone: phone,
			level: level,
			firstName2: firstName2,
			lastName2: lastName2,
			birthDate2: birthDate2,
			country2: country2,
			phone2: phone2,
			level2: level2,
			role: 'user',
			status: 'actif',
			emailAddress: newEmailAddress,
			password: await sails.helpers.passwords.hashPassword(password),
			tosAcceptedByIp: that.req.ip
		}, sails.config.custom.verifyEmailAddresses ? {
			emailProofToken: await sails.helpers.strings.random('url-friendly'),
			emailProofTokenExpiresAt: Date.now() + sails.config.custom.emailProofTokenTTL,
			emailStatus: 'unconfirmed'
		} : {}))
			.intercept('ya', 'emailAlreadyInUse')
			.intercept({ name: 'UsageError' }, 'invalid2')
			.fetch();


		console.log(newUserRecord);
		console.log('ho');


		// Store the user's new id in their session.
		that.req.session.userId = newUserRecord.id;

		// In case there was an existing session (e.g. if we allow users to go to the signup page
		// when they're already logged in), broadcast a message that we can display in other open tabs.
		// if (sails.hooks.sockets) {
		// 	await sails.helpers.broadcastSessionChange(this.req);
		// }

		if (sails.config.custom.verifyEmailAddresses) {
			console.log('SEND EMAIL TEMPLATE');
			// Send "confirm account" email
			await sails.helpers.email.sendHtmlEmail.with({
				to: newUserRecord.emailAddress,
				subject: 'Voici votre mot de passe',
				layout: 'layout-email',
				template: 'email-welcome-password',
				templateData: {
					password: password,
					// token: newUserRecord.emailProofToken
					firstName: firstName
				},
				from: 'noreply@test.fr'
			});
		} else {
			sails.log.info('Skipping new account email verification... (since `verifyEmailAddresses` is disabled)');
		}
		return newUserRecord;


	}

};
