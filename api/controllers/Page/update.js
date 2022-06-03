

module.exports = {


	friendlyName: 'Update Page',


	description: 'Fetch Page by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Page',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new Page datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours Page réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Page | update ==> ', id);

		console.log('datas', datas);
		delete datas.deinscrits
		// delete datas.logos
		// console.log('datas', datas);


		var result = await Page.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid');
		// var record = await Partenaire.findOne(id).populate('images').populate('logos')

		console.log(result);


		return result

	}

};
