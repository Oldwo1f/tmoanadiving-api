const dayjs = require("dayjs");

module.exports = {


	friendlyName: 'Download factures apayer',



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
		var zipdir = require('zip-dir');
		const fs = require('fs')
		const dayjs = require('dayjs')
		var pdf = require("pdf-creator-node");
		const fspromise = require('fs').promises

		console.log('CONTROLLER: facture | DL facture a payer ==> month ' + month + '' + dayjs(month).format('MMMM'));


		// month = dayjs(month).subtract(6, 'd').valueOf()

		var currentPartenaire = await Partenaire.findOne(id)

		var factures = await Facture.find({
			createdAt: {
				'>': dayjs(month).startOf('M').valueOf(),
				'<=': dayjs(month).endOf('M').valueOf()
			},
			recepteur: id
		}).populate('recepteur').populate('emetteur')

		console.log('factures', factures);
		if (factures.length === 0) {
			return 'pas de factures'
		}



		const PDFDONES = Promise.all(_.map(factures, async element => {


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

						default: '<span style="color: #444;font-size:8px; text-align:center;">' + element.emetteur.footerfacture + '</span>',
					}
				}
			};
			datas.nbPlongeeResident = element.nbplongeeResident
			datas.nbPlongeeTouriste = element.nbplongeeTouriste
			// datas.createdAt = dayjs().format('DD/MM/YYYY')

			datas.prixunittouriste = sails.config.custom.prixUnitaireTouristeHT;
			datas.prixunitresident = sails.config.custom.prixUnitaireResidantHT;

			// datas.price = datas.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.totalPrice = Number(datas.nbPlongeeResident) * Number(sails.config.custom.prixUnitaireResidantHT) + Number(datas.nbPlongeeTouriste) * Number(sails.config.custom.prixUnitaireTouristeHT)

			datas.tva = Math.round((datas.totalPrice * sails.config.custom.tva)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.tvas = Math.round((datas.totalPrice * sails.config.custom.tvas)).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.totalPriceHT = Math.round(datas.totalPrice).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
			datas.totalPriceTTC = Math.round((datas.totalPrice + (datas.totalPrice * sails.config.custom.tva) + (datas.totalPrice * sails.config.custom.tvas))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")

			datas.prixunitresident = Math.round(datas.prixunitresident).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixunittouriste = Math.round(datas.prixunittouriste).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixtotaltouriste = Math.round((Number(datas.nbPlongeeTouriste) * Number(sails.config.custom.prixUnitaireTouristeHT))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
			datas.prixtotalresident = Math.round((Number(datas.nbPlongeeResident) * Number(sails.config.custom.prixUnitaireResidantHT))).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

			// const nFacture = await Partenaire.findOne(element.club.id)

			datas.numerofacture = element.numerofacture
			datas.createdAt = dayjs().format('DD/MM/YYYY')
			datas.club = element.emetteur
			datas.clubReceveur = element.recepteur



			// console.log(datas);
			var document = {
				html: html,
				data: {
					d: datas,
				},
				path: "./.tmp/facturesInterneapayer/" + dayjs(month).format('MMMM') + datas.clubReceveur.id + "/" + datas.numerofacture + ".pdf",
				type: "",
			};
			console.log('HERE');

			const pdfdone = await pdf
				.create(document, options)
				.then(async (result) => {
					// this.res.attachment(datas.numerofacture + '.pdf').send(fs.readFileSync(result.filename));
					return true
				})
				.catch((error) => {
					console.error(error);
				});



			return pdfdone

		}))

		const result = await PDFDONES.then(async () => {

			console.log('DONE');

			// return zip.zip("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, './.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip');
			// const myzip = await zip.zip("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, undefined, { customWriteStream: this.res.send });

			// console.log(myzip);
			// const zipfile = fs.readFileSync('./.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip')

			return await zipdir("./.tmp/facturesInterneapayer/" + dayjs(month).format('MMMM') + currentPartenaire.id, { saveTo: './.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip' });


		}).then(async (zipfile) => {
			console.log('then')
			console.log('zipfile', zipfile);
			this.res.attachment('factures' + dayjs(month).format('MMMM') + '-' + '-a-payer.zip').send(zipfile);
		})

		fs.rm('./.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip', () => {
			console.log('CB');
		})
		console.log('./.tmp/facturesInterneapayer/' + dayjs(month).format('MMMM') + currentPartenaire.id);
		fs.rmdir('./.tmp/facturesInterneapayer/' + dayjs(month).format('MMMM') + currentPartenaire.id, { recursive: true }, (err) => {
			console.log('CB rmDir');
			console.log(err);
		})
		return result

	}

};
