module.exports = {


	friendlyName: 'Update jeu',


	description: 'Fetch jeu by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of jeu',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new jeu datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours utilisateur réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Jeu | update ==> ', id);

		// console.log('datas', datas);
		delete datas.images
		delete datas.logos
		delete datas.inscrits
		console.log('datas', datas);


		var result = await Jeu.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		var record = await Jeu.findOne(id).populate('images').populate('logos').populate('inscrits')

		console.log(record);


		return record

	}

};
