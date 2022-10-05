
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

  datastores: {
    default: {


      // adapter: 'sails-mongo',
      // url: 'mysql://user:password@host:port/database',
      host: 'localhost',
      // port: 27017,
      database: 'temoana',
      port: 40061,

      user: 'TemoanaUser',
      password: 'SECRET_6301599',
      authSource: 'admin'
    },

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
    prixUnitaireResidant: 7000,
    prixUnitaireTouriste: 8200,
    prixUnitaireResidantHT: 6604,
    prixUnitaireTouristeHT: 7736,
    commissionPassTouriste: 0.15,
    commissionPassResidant: 0.05,
    tva: 0.05,
    tvas: 0.01,
    internalEmailAddress: 'alexismomcilovic@gmail.com',
    verifyEmailAddresses: true,
  },



};
