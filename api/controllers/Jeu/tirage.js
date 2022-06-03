module.exports = {


	friendlyName: 'Tirage au sort jeu',


	description: '',




	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of jeu',
		},

	},


	exits: {

		success: {
			description: 'Tirage au sort réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Jeu | tirage ==> ', id);




		var result = await Jeu.findOne(id).populate('inscrits')
			.intercept({ name: 'UsageError' }, 'invalid');

		var inscrits = result.inscrits
		var min = 0
		var max = inscrits.length



		var random = Math.floor(Math.random() * inscrits.length)

		var gagnant = inscrits.splice(random, 1)

		const datas = {
			winnerfirstname: gagnant[0].firstname,
			winnerlastname: gagnant[0].lastname,
			winnercity: gagnant[0].city,
			winneremail: gagnant[0].email,
		}
		// var record = await Jeu.findOne(id).populate('images').populate('logos').populate('deinscrits').populate('inscrits').populate('imagesfin').populate('imagesgagnant')
		var result = await Jeu.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		// console.log(record);
		console.log(gagnant);

		return gagnant[0]

	}

};
