
module.exports = {




	models: {


		migrate: 'safe',
		// cascadeOnDestroy: false,

	},



	blueprints: {
		shortcuts: false,
	},



	// security: {


	// cors: {
	// allowOrigins: [
	//   'https://example.com',
	// ]
	// },

	// },



	session: {

		cookie: {
			// secure: true,
			maxAge: 24 * 60 * 60 * 1000,  // 24 hours
		},

	},



	sockets: {

		// onlyAllowOrigins: [
		// 	'https://example.com',
		// 	'https://staging.example.com',
		// ],




	},


	log: {
		level: 'debug'
	},



	http: {

		cache: 365.25 * 24 * 60 * 60 * 1000, // One year

		// trustProxy: true,

	},



	// port: 40063,
	port: 1337,
	// port: 40064,

	// ssl: undefined,

	custom: {
		baseUrl: 'http://localhost:1337',
		platformCopyrightYear: '2022',
		passwordResetTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
		emailProofTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
		rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
		fromEmailAddress: 'noreply@madmin.com',
		fromName: 'The MADMIN Team',
		// appPath: '/var/www/DEV/Temoana/SERVER',
		appPath: '/var/www/temoanaapi',
		prixUnitaireResidant: 6300,
		prixUnitaireTouriste: 7200,
		commissionPassTouriste: 0.15,
		commissionPassResidant: 0.05,
		internalEmailAddress: 'alexismomcilovic@gmail.com',
		verifyEmailAddresses: true,
	},



};
