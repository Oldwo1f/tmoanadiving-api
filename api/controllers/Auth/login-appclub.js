module.exports = {


	friendlyName: 'Login app club',


	description: 'Log in using the provided login and password combination.',


	extendedDescription:
		`This action attempts to look up the user record in the database with the
  specified email address.  Then, if such a user exists, it uses
  bcrypt to compare the hashed password from the database with the provided
  password attempt.`,


	inputs: {

		login: {
			type: 'string',
			required: true
		},

		password: {
			type: 'string',
			required: true
		},

		// 	  rememberMe: {
		// 		description: 'Whether to extend the lifetime of the user\'s session.',
		// 		extendedDescription:
		//   `Note that this is NOT SUPPORTED when using virtual requests (e.g. sending
		//   requests over WebSockets instead of HTTP).`,
		// 		type: 'boolean'
		// 	  }

	},


	exits: {

		success: {
			description: 'The requesting user agent has been successfully logged in.',
			extendedDescription:
				`Under the covers, this stores the id of the logged-in user in the session
  as the \`userId\` key.  The next time this user agent sends a request, assuming
  it includes a cookie (like a web browser), Sails will automatically make this
  user id available as req.session.userId in the corresponding action.  (Also note
  that, thanks to the included "custom" hook, when a relevant request is received
  from a logged-in user, that user's entire record from the database will be fetched
  and exposed as \`req.me\`.)`
		},

		badCombo: {
			description: `The provided email and password combination does not
		match any user in the database.`,
			responseType: 'custo',
			statusCode: '401',

		},
		notadmin: {
			description: `Vous n'êtes pas administrateur`,
			responseType: 'custo',
			statusCode: '403',
		}

	},


	fn: async function ({ login, password }) {

		const jwt = require('jwt-simple')
		const dayjs = require('dayjs');
		console.log('secret : ', sails.config.session.secret);

		const self = this;
		function createJWT(user) {
			var role = user.role ? user.role : 'user'
			var payload = {
				iss: self.req.hostname,
				data: { role: role },
				sub: user.id,
				iat: dayjs().valueOf(),
				exp: dayjs().add(14, 'days').valueOf()
			};
			return jwt.encode(payload, sails.config.session.secret);
		}
		console.log('LOGIN appClub');
		// Look up by the email address.
		// (note that we lowercase it to ensure the lookup is always case-insensitive,
		// regardless of which database we're using)
		var partenaireRecord = await Partenaire.findOne({
			login: login,
		});

		console.log('partenaireRecord', partenaireRecord);
		// If there was no matching user, respond thru the "badCombo" exit.
		if (!partenaireRecord) {
			console.log('badcombo');
			throw {
				badCombo: {
					message: 'email adresse',
				}
			}
		}

		// If the password doesn't match, then also exit thru "badCombo".
		await sails.helpers.passwords.checkPassword(password, partenaireRecord.password)
			.intercept('incorrect', () => {
				return {
					badCombo: {
						message: 'password',
					}
				}
			});

		// if (userRecord.role == 'user') {
		// 	// this.res.message = "you are not an admin"
		// 	// throw 'notadmin';
		// 	throw {
		// 		notadmin: {
		// 			message: 'vous n\'avez pas les droits',
		// 		}
		// 	};
		// }

		// If "Remember Me" was enabled, then keep the session alive for
		// a longer amount of time.  (This causes an updated "Set Cookie"
		// response header to be sent as the result of this request -- thus
		// we must be dealing with a traditional HTTP request in order for
		// this to work.)
		//   if (rememberMe) {
		// 	if (this.req.isSocket) {
		// 	  sails.log.warn(
		// 		'Received `rememberMe: true` from a virtual request, but it was ignored\n'+
		// 		'because a browser\'s session cookie cannot be reset over sockets.\n'+
		// 		'Please use a traditional HTTP request instead.'
		// 	  );
		// 	} else {
		// 	  this.req.session.cookie.maxAge = sails.config.custom.rememberMeCookieMaxAge;
		// 	}
		//   }

		// Modify the active session instance.
		// (This will be persisted when the response is sent.)
		console.log('OK');
		console.log(partenaireRecord.id);
		this.req.session.partenaireId = partenaireRecord.id;
		console.log('this.req.session::::', this.req.session);
		console.log('token ==', createJWT(partenaireRecord));
		// this.res.set('Access-Control-Allow-Headers', 'strict-origin-when-cross-origin, access-control-allow-headers, application/json, text/plain, */*, Authorization');
		this.res.send({ token: createJWT(partenaireRecord) });

		// In case there was an existing session (e.g. if we allow users to go to the login page
		// when they're already logged in), broadcast a message that we can display in other open tabs.
		if (sails.hooks.sockets) {
			await sails.helpers.broadcastSessionChange(this.req);
		}


	}
}
