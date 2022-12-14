module.exports = {


	friendlyName: 'Get one jeu by name',


	description: 'Fetch jeu by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		name: {
			required: true,
			type: 'string',
			description: 'The name of jeu',
		}

	},


	exits: {

		success: {
			description: 'Voici votre jeu'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ name }) {
		console.log('CONTROLLER: Jeu | get-one-by-name-f ==> ', name);




		var record = await Jeu.findOne({ where: { 'url': name } }).populate('images').populate('partenaire').populate('inscrits').populate('logos').populate('imagesgagnant').populate('imagesfin')
			.intercept({ name: 'UsageError' }, 'invalid')

		// try {
		console.log('recordID==', record);
		// console.log('recordID==', record.partenaire);
		console.log('record.inscrits.lenght==', record.inscrits);
		record.nbInscrits = record.inscrits.length
		delete record.inscrits;
		var partenaire = await Partenaire.findOne(record.partenaire).populate('images').populate('logos')
			.intercept({ name: 'UsageError' }, 'invalid')
		// console.log('partenaire', partenaire);
		console.log('--------------------------');
		record.partenaire = partenaire;
		// console.log(record);
		return record
		// }
		// catch (err) {
		// 	console.log('Catch: ', err);
		// }

	}

};
