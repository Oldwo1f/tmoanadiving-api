
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
  port: 40064,

  // ssl: undefined,

  custom: {
    baseUrl: 'https://api.temoanadiving-pass.com',
    platformCopyrightYear: '2022',
    passwordResetTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
    emailProofTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
    rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    fromEmailAddress: 'noreply@madmin.com',
    fromName: 'The MADMIN Team',
    appPath: '/var/www/temoanaapi',
    prixUnitaireResidant: 12000,
    prixUnitaireTouriste: 15000,
    commissionPass: 0.15,
    internalEmailAddress: 'alexismomcilovic@gmail.com',
    verifyEmailAddresses: true,
  },



};
