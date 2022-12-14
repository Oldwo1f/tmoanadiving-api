// const Jeu = require('../../models/Jeu');

const { setMaxListeners } = require('process');

module.exports = {


	friendlyName: 'Inscription',


	description: 'Add a new Inscription',

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

		console.log('Inscription', id);
		console.log(data);
		console.log(this.req.body)

		if (this.req.body.gender == null) {
			this.req.body.gender = ''
		}
		const Find = await Jeu.findOne(id).populate('inscrits')
		// console.log('Find', Find);

		console.log('Find.inscrits.length', Find.inscrits.length);
		console.log('Find.inscrits', Find.inscrits);
		if (Find.inscrits.length) {
			const founded = _.find(Find.inscrits, { email: this.req.body.email })

			console.log('founded', founded);
			if (founded) {
				throw 'emailAlreadyInUse'

			}
		}



		const inscrit = await Inscrit.create(this.req.body).fetch()

		// console.log('createdImage ', createdImage);
		const result = await Jeu.addToCollection(id, 'inscrits').members([inscrit.id])
		// createdImage.jeulogo = idjeu
		return inscrit


	}

};
