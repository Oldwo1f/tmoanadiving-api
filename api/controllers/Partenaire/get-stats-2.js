const dayjs = require("dayjs");

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
		console.log('CONTROLLER: Partenaire | get-stats2 ==> ' + id);

		// console.log('this.req.partenaireId', );


		var club = await Partenaire.findOne(id).populate('plongees')
			.intercept({ name: 'UsageError' }, 'invalid')


		var allPlongees = await Plongee.find({
			createdAt: {
				'>': dayjs().startOf('M').valueOf(),
				'<=': dayjs().endOf('M').valueOf()
			}
		})


		console.log('allPlongees', allPlongees);
		console.log('-------------------------------------------------------');
		console.log('plongeesClub', plongeesClub);

		var plongeesClub = allPlongees.filter((elem) => {
			console.log('elem.partenaire', elem.partenaire, '   ', id);
			if (elem.clubrevendeur == id && elem.partenaire != id) {
				return true
			} else {
				false
			}
		})
		console.log('plongeesClub', plongeesClub);

		const nbResidentReverse = plongeesClub.reduce(function (accumulateur, valeurCourante, index, array) {
			if (valeurCourante.resident) {
				return accumulateur + valeurCourante.nbPlongeur;
			} else {
				return accumulateur
			}
		}, 0)
		const nbTouristeReverse = plongeesClub.reduce(function (accumulateur, valeurCourante, index, array) {
			if (!valeurCourante.resident) {
				return accumulateur + valeurCourante.nbPlongeur;
			} else {
				return accumulateur
			}
		}, 0)

		const totalPlongeeMoneyReverse = plongeesClub.reduce(function (accumulateur, valeurCourante, index, array) {
			if (valeurCourante.resident) {

				return accumulateur + (valeurCourante.nbPlongeur * sails.config.custom.prixUnitaireResidant);

			} else {

				return accumulateur + (valeurCourante.nbPlongeur * sails.config.custom.prixUnitaireTouriste)
			}
		}, 0)




		let thisMonth = [];
		// let thisYears = [];

		club.plongees.map((elem) => {

			if (dayjs(elem.createdAt) <= dayjs() && dayjs(elem.createdAt) > dayjs().startOf('M')) {

				if (elem.clubrevendeur != id) {
					thisMonth.push(elem)
				}
			}
		})
		const totalPlongeeMoney = thisMonth.reduce(function (accumulateur, valeurCourante, index, array) {
			if (valeurCourante.resident) {

				return accumulateur + (valeurCourante.nbPlongeur * sails.config.custom.prixUnitaireResidant);

			} else {

				return accumulateur + (valeurCourante.nbPlongeur * sails.config.custom.prixUnitaireTouriste)
			}
		}, 0)
		const nbResident = thisMonth.reduce(function (accumulateur, valeurCourante, index, array) {
			if (valeurCourante.resident) {
				return accumulateur + valeurCourante.nbPlongeur;
			} else {
				return accumulateur
			}
		}, 0)
		const nbTouriste = thisMonth.reduce(function (accumulateur, valeurCourante, index, array) {
			if (!valeurCourante.resident) {
				return accumulateur + valeurCourante.nbPlongeur;
			} else {
				return accumulateur
			}
		}, 0)

		const result = {

			totalReceive: totalPlongeeMoney,
			nbResidentReveive: nbResident,
			nbTouristeReveive: nbTouriste,
			plongeesClub,
			allPlongees,
			nbResidentReverse,
			nbTouristeReverse,
			totalPlongeeMoneyReverse
			// currentMonth: dayjs().format('MMMM'),

		}



		return result

	}

};
