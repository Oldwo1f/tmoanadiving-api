/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  '/': { view: 'pages/homepage' },

  'GET /api/v1/addfirstadmin': { action: 'administrator/add-first-admin' },
  // Auth
  'POST /api/v1/auth/login': { action: 'auth/login' },
  'POST /api/v1/auth/loginadmin': { action: 'auth/login-admin' },
  'POST /api/v1/auth/logout': { action: 'auth/logout' },
  'GET /api/v1/auth/user': { action: 'auth/get-me' },


  // PAGES

  'GET /api/v1/pages': { action: 'page/get-all' },
  'GET /api/v1/page/:id': { action: 'page/get-one' },
  'PATCH /api/v1/page/:id': { action: 'page/update' },
  'DELETE /api/v1/page/:id': { action: 'page/delete-one' },
  'POST /api/v1/page': { action: 'page/add' },
  'GET /fapi/v1/page/:url': { action: 'page/get-one-by-name-f' },
  'GET /fapi/v1/jeu/fetchJeuxGagnant': { action: 'jeu/get-all-gagnants-f' },
  // USER

  'GET /api/v1/users': { action: 'user/get-all' },
  'GET /api/v1/user/:id': { action: 'user/get-one' },
  'PATCH /api/v1/user/:id': { action: 'user/update' },
  'PATCH /api/v1/user/resetPassword/:id': { action: 'user/reset-password' },
  'DELETE /api/v1/user/:id': { action: 'user/delete-one' },
  'POST /api/v1/user': { action: 'user/add' },


  // ADMINISTRATOR

  'GET /api/v1/administrator': { action: 'administrator/get-all' },
  'GET /api/v1/administrator/:id': { action: 'administrator/get-one' },
  'PATCH /api/v1/administrator/:id': { action: 'administrator/update' },
  'PATCH /api/v1/administrator/resetPassword/:id': { action: 'administrator/reset-password' },
  'DELETE /api/v1/administrator/:id': { action: 'administrator/delete-one' },
  'POST /api/v1/administrator': { action: 'administrator/add' },


  // JEU

  'GET /fapi/v1/jeux': { action: 'jeu/get-all-f' },
  'GET /fapi/v1/jeu/:name': { action: 'jeu/get-one-by-name-f' },
  // 'GET /fapi/v1/jeu/:name': { action: 'jeu/get-one-by-name-f' },
  'POST /fapi/v1/jeu/inscription/:id': { action: 'jeu/inscription' },
  'POST /fapi/v1/jeu/deinscription/:id': { action: 'jeu/deinscription' },
  'GET /api/v1/jeu': { action: 'jeu/get-all' },
  'GET /api/v1/jeux': { action: 'jeu/get-all' },
  'GET /api/v1/jeu/:id': { action: 'jeu/get-one' },
  'GET /api/v1/jeu/tirage/:id': { action: 'jeu/tirage' },
  'PATCH /api/v1/jeu/:id': { action: 'jeu/update' },
  'DELETE /api/v1/jeu/:id': { action: 'jeu/delete-one' },
  'POST /api/v1/jeu': { action: 'jeu/add' },
  'POST /api/v1/jeu/:idjeu/addImage': { action: 'jeu/add-image' },
  'POST /api/v1/jeu/:idjeu/addImagefin': { action: 'jeu/add-image-fin' },
  'POST /api/v1/jeu/:idjeu/addImagegagnant': { action: 'jeu/add-image-gagnant' },
  'POST /api/v1/jeu/:idjeu/addLogo': { action: 'jeu/add-logo' },
  // Partenaire

  'GET /fapi/v1/partenaires': { action: 'partenaire/get-all-f' },
  // 'GET /api/v1/partenaire': { action: 'partenaires/get-all' },
  'GET /api/v1/partenaires': { action: 'partenaire/get-all' },
  'GET /api/v1/partenaire/:id': { action: 'partenaire/get-one' },
  'PATCH /api/v1/partenaire/:id': { action: 'partenaire/update' },
  'DELETE /api/v1/partenaire/:id': { action: 'partenaire/delete-one' },
  'POST /api/v1/partenaire': { action: 'partenaire/add' },
  'POST /api/v1/partenaire/:idpartenaire/addImage': { action: 'partenaire/add-image' },
  'POST /api/v1/partenaire/:idpartenaire/addLogo': { action: 'partenaire/add-logo' },


  // IMAGE
  'GET /api/v1/image/:path': { action: 'image/serve-image', skipAssets: false },
  'GET /fapi/v1/image/:path': { action: 'image/serve-image', skipAssets: false },
  'DELETE /api/v1/image/:id': { action: 'image/delete-one', skipAssets: false },

  // 'POST /api/v1/auth/login': { action: 'login/login' },
  // 'POST /api/v1/auth/user': { action: 'user/getMe' },
  // 'POST /api/v1/auth/logout': { action: 'login/logout' },

  'GET /api/v1/email/confirm': { action: 'user/confirm-email' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
