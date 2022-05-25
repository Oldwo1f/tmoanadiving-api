/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

		filename: { type: 'string', required: true },
		name: { type: 'string', required: true },
		ext: { type: 'string', required: true },
		alt: { type: 'string', defaultsTo: '' },
		rank: { type: 'number' },
		size: { type: 'number' },
		width: { type: 'number' },
		height: { type: 'number' },
		paysage: { type: 'boolean', defaultsTo: true },
		jeu: {
			model: 'jeu'
		},
		partenaire: {
			model: 'partenaire'
		},
		partenairelogo: {
			model: 'partenaire'
		},
		jeulogo: {
			model: 'jeu'
		},
		jeuimagesfin: {
			model: 'jeu'
		},
		jeuimagesgagnant: {
			model: 'jeu'
		}
	},


};
