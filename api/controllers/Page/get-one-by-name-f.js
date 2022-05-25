module.exports = {


	friendlyName: 'Get one jeu by name',


	description: 'Fetch page by name and retrieve it',


	extendedDescription:
		``,


	inputs: {
		url: {
			required: true,
			type: 'string',
			description: 'The url of page',
		}

	},


	exits: {

		success: {
			description: 'Voici votre page'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ url }) {
		console.log('CONTROLLER: Page | get-one-by-name-f ==> ', url);




		var record = await Page.findOne({ where: { url: url } })


		// try {
		// 	console.log('recordID==', record);
		// console.log('recordID==', record.partenaire);
		// var partenaire = await Partenaire.findOne(record.partenaire).populate('images').populate('logos')
		// 	.intercept({ name: 'UsageError' }, 'invalid')
		// console.log('partenaire', partenaire);
		// console.log('--------------------------');
		// record.partenaire = partenaire;
		console.log(record);
		return record
		// }
		// catch (err) {
		// 	console.log('Catch: ', err);
		// }

	}

};
