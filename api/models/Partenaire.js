/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

		name: { type: 'string', required: true, unique: true, minLength: 3, maxLength: 255 },
		url: { type: 'string' },
		description: { type: 'string' },
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'draft' },

		jeu: {
			collection: 'jeu',
			via: 'partenaire'
		},
		logos: {
			collection: 'image',
			via: 'partenairelogo'
		},
		images: {
			collection: 'image',
			via: 'partenaire'
		}


	},


};
