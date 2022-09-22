/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

		name: { type: 'string', minLength: 1, maxLength: 55 },
		date: { type: 'number' },
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'draft' },


		user: {
			collection: 'user',
			via: 'plongees'
		},
		partenaire: {
			collection: 'partenaire',
			via: 'plongees'
		}


	},


};
