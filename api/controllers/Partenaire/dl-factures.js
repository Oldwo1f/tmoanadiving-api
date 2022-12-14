const dayjs = require("dayjs");

module.exports = {


	friendlyName: 'Download factures',



	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		},
		// data: {
		// 	required: true,
		// 	type: {},
		// },
		month: {
			required: true,
			type: 'number',
		},

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


	fn: async function ({ id, month }) {

		const zip = require('zip-a-folder');
		const fs = require('fs')
		const dayjs = require('dayjs')
		var pdf = require("pdf-creator-node");
		const fspromise = require('fs').promises

		console.log('CONTROLLER: Partenaire | DL facture ==> ' + id);




		var currentPartenaire = await Partenaire.findOne(id)

		var factures = await Facture.find({
			createdAt: {
				'>': dayjs(month).startOf('M').valueOf(),
				'<=': dayjs(month).endOf('M').valueOf()
			},
			emetteur: id
		}).populate('recepteur').populate('emetteur')

		console.log('factures', factures);


		const PDFDONES = await _.forEach(factures, async element => {


			var datas = {};
			var html = fs.readFileSync(sails.config.appPath + "/views/factures/factureInterne.html", "utf8");
			var options = {
				format: "A4",
				orientation: "portrait",
				border: "0mm",
				header: {
					height: "0mm",
					contents: ''
				},
				footer: {
					height: "10mm",
					contents: {

						default: '<span style="color: #444;font-size:8px; text-align:center;">' + currentPartenaire.footerfacture + '</span>',
					}
				}
			};
			datas.nbPlongeeResident = element.nbplongeeResident
			datas.nbPlongeeTouriste = element.nbplongeeTouriste
			// datas.createdAt = dayjs().format('DD/MM/YYYY')

			datas.prixunittouriste = sails.config.custom.prixUnitaireTouriste;
			datas.prixunitresident = sails.config.custom.prixUnitaireResidant;

			// datas.price = datas.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.totalPrice = Number(datas.nbPlongeeResident) * Number(sails.config.custom.prixUnitaireResidant) + Number(datas.nbPlongeeTouriste) * Number(sails.config.custom.prixUnitaireTouriste)
			datas.totalPrice = datas.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")

			datas.prixunitresident = datas.prixunitresident.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixunittouriste = datas.prixunittouriste.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixtotaltouriste = (Number(datas.nbPlongeeTouriste) * Number(sails.config.custom.prixUnitaireTouriste)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixtotalresident = (Number(datas.nbPlongeeResident) * Number(sails.config.custom.prixUnitaireResidant)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

			// const nFacture = await Partenaire.findOne(element.club.id)

			datas.numerofacture = element.numerofacture
			datas.createdAt = dayjs().format('DD/MM/YYYY')
			datas.club = element.emetteur
			datas.clubReceveur = element.recepteur



			console.log(datas);
			var document = {
				html: html,
				data: {
					d: datas,
				},
				path: "./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + datas.club.id + "/" + datas.numerofacture + ".pdf",
				type: "",
			};
			console.log('HERE');

			const pdfdone = await pdf
				.create(document, options)
				.then(async (result) => {
					this.res.attachment(datas.numerofacture + '.pdf').send(fs.readFileSync(result.filename));
				})
				.catch((error) => {
					console.error(error);
				});





		})



		if (PDFDONES.length) {
			console.log('DONE');

			await zip.zip("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, './.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip');

			this.res.attachment('factures-' + dayjs(month).format('MMMM') + '-' + 'a-percevoir.pdf').send(fs.readFileSync('./.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip'));

		} else {
			console.log('NOT DONE');
		}





		// return PDFDONES

	}

};
