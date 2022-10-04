/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  /***************************************************************************
  *                                                                          *
  * Any other custom config this Sails app should use during development.    *
  *                                                                          *
  ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
  baseUrl: 'http://localhost:1337',

  platformCopyrightYear: '2022',

  passwordResetTokenTTL: 24 * 60 * 60 * 1000,// 24 hours
  emailProofTokenTTL: 24 * 60 * 60 * 1000,// 24 hours

  rememberMeCookieMaxAge: 30 * 24 * 60 * 60 * 1000, // 30 days

  fromEmailAddress: 'noreply@madmin.com',
  fromName: 'The MADMIN Team',
  appPath: '/var/www/DEV/Temoana/SERVER',
  prixUnitaireResidant: 6300,
  prixUnitaireTouriste: 7200,
  commissionPassTouriste: 0.15,
  commissionPassResidant: 0.05,
  // appPath: '/var/www/DEV/SERVER',

  internalEmailAddress: 'alexismomcilovic@gmail.com',

  verifyEmailAddresses: true,
};
