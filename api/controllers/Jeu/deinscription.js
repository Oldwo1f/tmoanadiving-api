// const Jeu = require('../../models/Jeu');

const { setMaxListeners } = require('process');

module.exports = {


	friendlyName: 'DeInscription',


	description: 'Add a new deInscription',

	inputs: {

		id: {
			type: 'string',
		},
		data: {
			type: {},
		},


	},


	exits: {

		success: {
			description: 'Inscription'
		},
		tooBig: {
			description: 'The file is too big.',
			responseType: 'badRequest'
		},
		noFileAttached: {
			description: 'No File Attached.',
			responseType: 'badRequest'
		},

		// invalid: {
		// 	responseType: 'badRequest',
		// 	description: 'The provided name is invalid.',

		// },
		// invalid2: {
		// 	statusCode: 408,
		// 	description: 'Database Error',
		// },

		emailAlreadyInUse: {
			responseType: 'custom',
			statusCode: 409,
			description: 'The provided Name is already in use.',
		},

	},


	fn: async function ({ id, data }) {

		console.log('deInscription', id);
		console.log(data);
		console.log(this.req.body)




		const deinscrit = await Inscrit.create(this.req.body).fetch()

		// console.log('createdImage ', createdImage);
		const result = await Jeu.addToCollection(id, 'deinscrits').members([deinscrit.id])
		// createdImage.jeulogo = idjeu
		return deinscrit


	}

};
