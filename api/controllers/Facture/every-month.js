const dayjs = require("dayjs");

module.exports = {


	friendlyName: 'Cron task to create factures every month',



	inputs: {


	},


	exits: {

		success: {
			description: 'OK - success'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function () {
		const zip = require('zip-a-folder');
		const fs = require('fs')
		const dayjs = require('dayjs')
		var pdf = require("pdf-creator-node");
		const fspromise = require('fs').promises

		console.log('CONTROLLER: Partenaire | CRON TASK');

		// const month = dayjs().subtract(1, 'M').valueOf()
		const month = dayjs().valueOf()


		var allPlongeesThisMonth = await Plongee.find({
			createdAt: {
				'>': dayjs(month).startOf('M').valueOf(),
				'<=': dayjs(month).endOf('M').valueOf()
			}
		})

		// console.log(allPlongeesThisMonth);
		const groupedPlongees = _.groupBy(allPlongeesThisMonth, 'partenaire')

		// console.log('groupedPlongees=', groupedPlongees);



		const factures = await Promise.all(_.map(groupedPlongees, async (arrayplongee, key) => {

			// console.log('key=', key);
			// console.log('key=', arrayplongee);

			// const clubRecepteur = await Partenaire.findOne(id)
			var clubEmetteur = await Partenaire.findOne(key)
			var NumeroFactureIntern = clubEmetteur.numeroFactureInterne;
			console.log('======================', clubEmetteur.name);

			// const plongeesThisclubEmetteur = _.map(arrayplongee, async (plong, key) => {

			// 	console.log('key=', key);
			// 	console.log('key=', plong);

			// 	// const clubRecepteur = await Partenaire.findOne(id)
			// 	var clubRecepteur = await Partenaire.findOne(plong.id)


			// var plongeesClubAReverser = arrayplongee.filter((elem) => {

			// 	if (elem.clubrevendeur != key && elem.partenaire == key) {
			// 		return true
			// 	} else {
			// 		false
			// 	}
			// })

			var grouped = _.groupBy(arrayplongee, 'clubrevendeur')
			// console.log(grouped);

			// const facture = []
			// console.log(grouped);
			// console.log('--------->');

			var facture = await Promise.all(_.map(grouped, async (elem, k) => {
				// console.log('plongeed==>', k);
				// console.log('---------------------------------------------------------');

				var clubRecepteur = await Partenaire.findOne(k)

				console.log('==>', clubRecepteur.name);
				console.log(elem);

				// console.log('----', clubEmetteur.name);



				const nbPlongeeTouriste = await _.reduce(arrayplongee, async (acc, ele, key) => {
					if (!ele.resident && ele.clubrevendeur == clubRecepteur.id && ele.partenaire == clubEmetteur.id) return await acc + ele.nbPlongeur;
					else return await acc
				}, 0);

				const nbPlongeeResident = await _.reduce(arrayplongee, async (acc, ele, key) => {
					if (ele.resident && ele.clubrevendeur == clubRecepteur.id && ele.partenaire == clubEmetteur.id) return await acc + ele.nbPlongeur;
					else return await acc
				}, 0);


				NumeroFactureIntern++;
				if (clubEmetteur.id != clubRecepteur.id) {
					return await Facture.create({
						numerofacture: clubEmetteur.prefixFactureInterne + '' + NumeroFactureIntern,
						nbplongeeResident: nbPlongeeResident,
						nbplongeeTouriste: nbPlongeeTouriste,
						emetteur: clubEmetteur.id,
						recepteur: clubRecepteur.id,
					}).fetch()
				} else {
					return
				}





			}))


			await Partenaire.updateOne(key).set({ numeroFactureInterne: NumeroFactureIntern })

			// 	const createdFacture = await Facture.create({
			// 		numerofacture: ,
			// 		nbplongeeResident: ,
			// 		nbplongeeTouriste: ,
			// 		emetteur: clubEmetteur.id,
			// 		recepteur: clubRecepteur.id,
			// 	})

			// 	return clubRecepteur
			// 	// factures.push(result)

			// })



			return facture
			// factures.push(result)

		}));

		return 'OK'


	}

};
