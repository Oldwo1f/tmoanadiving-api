module.exports = {


	friendlyName: 'Get Page FRONT',


	description: 'Fetch Page list and retrieve it',


	extendedDescription:
		``,


	inputs: {


	},


	exits: {

		success: {
			description: 'Voici la list.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ page, limit, archive }) {
		console.log('CONTROLLER: Jeuxxx | get-all-GAGNANT FRONT');

		console.log('new Date.now():');
		var now = new Date().getTime()
		console.log(now);

		var record = await Jeu.find({
			status: 'actif',
			dateTirage: {
				'<=': now
			}
		}).sort('createdAt DESC')
			.populate('images')
			// .populate('partenaire')
			.populate('logos')
			.populate('imagesfin')
			.populate('imagesgagnant')

			.intercept({ name: 'UsageError' }, 'invalid')




		return record

	}

};
