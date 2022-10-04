/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

		name: { type: 'string', minLength: 1, maxLength: 55 },
		date: { type: 'number' },
		nbPlongeur: { type: 'number', defaultsTo: 1 },
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'actif' },
		resident: { type: 'boolean', required: true },

		user: {
			model: 'user',
		},
		partenaire: {
			model: 'partenaire',
		},
		clubrevendeur: {
			model: 'partenaire',
		}


	},


};
