
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


	fn: async function ({ id }) {
		console.log('CONTROLLER: Jeu | tirage ==> ', id);




		var result = await Jeu.findOne(id).populate('inscrits')
			.intercept({ name: 'UsageError' }, 'invalid');

		var inscrits = result.inscrits
		var min = 0
		var max = inscrits.length



		var random = Math.floor(Math.random() * max)

		var gagnantList = inscrits.slice(random, random + 1)
		console.log('gagnantList', gagnantList);
		var gagnant = gagnantList[0]
		console.log(gagnant.reponse);
		if (result.questionGame == "actif") {
			while (gagnant.reponse != result.bonneRep) {
				// console.log('bonne:', result.bonneRep);
				console.log('while');
				random = Math.floor(Math.random() * max)
				gagnantList = inscrits.slice(random, random + 1)
				console.log('gagnantList', gagnantList);
				gagnant = gagnantList[0]
				console.log('new gagnant:', gagnant);
			}
		}
		// console.log(gagnant);
		const datas = {
			winnerfirstname: gagnant.firstName,
			winnerlastname: gagnant.lastName,
			winnercity: gagnant.city,
			winneremail: gagnant.email,
		}
		// console.log('datas', datas);
		// var record = await Jeu.findOne(id).populate('images').populate('logos').populate('deinscrits').populate('inscrits').populate('imagesfin').populate('imagesgagnant')
		var result = await Jeu.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		// console.log(record);
		console.log(gagnant);

		return gagnant

	}

};
