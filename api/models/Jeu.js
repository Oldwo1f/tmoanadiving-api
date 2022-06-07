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
		urlReglement: { type: 'string' },
		reglement: { type: 'string' },
		valeur: { type: 'number', defaultsTo: 0 },
		dateLancement: { type: 'number' },
		dateCloture: { type: 'number' },
		dateTirage: { type: 'number' },
		nbPartage: { type: 'number' },
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'draft' },
		winnerlastname: { type: 'string' },
		winnerfirstname: { type: 'string' },
		winneremail: { type: 'string' },
		winnercity: { type: 'string' },
		winnerimageUrl: { type: 'string' },
		huissiertext: { type: 'string' },
		shareText: { type: 'string' },
		finalContent: { type: 'string' },
		annonceur: { type: 'string' },
		urlannonceur: { type: 'string' },
		question: { type: 'string' },
		repA: { type: 'string' },
		repB: { type: 'string' },
		repC: { type: 'string' },
		repD: { type: 'string' },
		bonneRep: { type: 'string' },
		questionGame: { type: 'string', defaultsTo: 'inactif' },
		options: { type: 'json' },
		// smsauto: { type: 'boolean', defaultsTo: false },
		// textsms: { type: 'string' },
		// senderId: { type: 'string' },
		// role: { type: 'string', isIn: ['user', 'admin', 'restaurant'], defaultsTo: 'user' }
		partenaire: {
			model: 'partenaire',
		},
		images: {
			collection: 'image',
			via: 'jeu'
		},
		inscrits: {
			collection: 'inscrit',
			via: 'jeu'
		},
		deinscrits: {
			collection: 'inscrit',
			via: 'jeud'
		},
		logos: {
			collection: 'image',
			via: 'jeulogo'
		},
		imagesfin: {
			collection: 'image',
			via: 'jeuimagesfin'
		},
		imagesgagnant: {
			collection: 'image',
			via: 'jeuimagesgagnant'
		},


	},


};
