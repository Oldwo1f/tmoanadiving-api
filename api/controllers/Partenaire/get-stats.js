const dayjs = require("dayjs");
const { setMaxListeners } = require("nodemailer/lib/xoauth2");
const isConnectedClub = require("../../policies/isConnectedClub");

module.exports = {


	friendlyName: 'Get one Partenaire s stats',



	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Partenaire'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Partenaire | get-stats ==> ');

		console.log('this.req.partenaireId', id);


		var club = await Partenaire.findOne(id).populate('passvendu').populate('plongees').populate('creditsFacture')
			.intercept({ name: 'UsageError' }, 'invalid')

		// console.log(record);



		const passvenduR = club.passvendu.filter((elem) => {
			return elem.resident;
		})

		console.log(passvenduR);

		const passvenduT = club.passvendu.filter((elem) => {
			return !elem.resident;
		})

		const passvenduTprice = passvenduT.reduce(function (accumulateur, valeurCourante, index, array) {
			console.log('valeurCourante', valeurCourante.nbplongee);
			return accumulateur + valeurCourante.nbplongee;
		}, 0)

		console.log('passvenduTprice');
		console.log(passvenduTprice);

		const passvenduRprice = passvenduR.reduce(function (accumulateur, valeurCourante, index, array) {
			console.log('valeurCourante', valeurCourante.nbplongee);
			return accumulateur + valeurCourante.nbplongee;
		}, 0)

		console.log('passvenduRprice');
		console.log(passvenduRprice);



		let thisMonth = [];
		let thisYears = [];

		club.plongees.map((elem) => {

			if (dayjs(elem.createdAt) <= dayjs() && dayjs(elem.createdAt) > dayjs().startOf('M')) {
				thisMonth.push(elem)
			}
			if (dayjs(elem.createdAt) <= dayjs() && dayjs(elem.createdAt) > dayjs().startOf('y')) {
				thisYears.push(elem)
			}
		})
		console.log('(passvenduTprice * sails.config.custom.prixUnitaireTouriste) * sails.config.custom.commissionPassTouriste', (passvenduTprice * sails.config.custom.prixUnitaireTouriste) * sails.config.custom.commissionPassTouriste);
		console.log('(passvenduTprice * sails.config.custom.prixUnitaireTouriste) * sails.config.custom.commissionPassTouriste', (passvenduRprice * sails.config.custom.prixUnitaireResidant) * sails.config.custom.commissionPassResidant);

		const result = {

			passvendu: club.passvendu.length,
			passvenduR: passvenduR.length,
			passvenduT: passvenduT.length,
			passvenduTprice: passvenduTprice * sails.config.custom.prixUnitaireTouriste,
			passvenduRprice: passvenduRprice * sails.config.custom.prixUnitaireResidant,
			passvenduCom: (passvenduTprice * sails.config.custom.prixUnitaireTouriste) * sails.config.custom.commissionPassTouriste + (passvenduRprice * sails.config.custom.prixUnitaireResidant) * sails.config.custom.commissionPassResidant,
			nbplongees: club.plongees.length,
			thisMonth: thisMonth.length,
			thisYears: thisYears.length,

		}



		return result

	}

};
