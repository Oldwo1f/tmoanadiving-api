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

		var zipdir = require('zip-dir');
		const fs = require('fs')
		const dayjs = require('dayjs')
		var pdf = require("pdf-creator-node");
		const fspromise = require('fs').promises

		console.log('CONTROLLER: Partenaire | DL facture ==> ' + id);


		month = dayjs(month).subtract(6, 'd').valueOf()

		var currentPartenaire = await Partenaire.findOne(id)

		var factures = await Facture.find({
			createdAt: {
				'>': dayjs(month).startOf('M').valueOf(),
				'<=': dayjs(month).endOf('M').valueOf()
			},
			emetteur: id
		}).populate('recepteur').populate('emetteur')

		// console.log('factures', factures);


		const PDFDONES = Promise.all(_.map(factures, async element => {

			console.log('promiseall foreach');
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



			// console.log(datas);
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
					// this.res.attachment(datas.numerofacture + '.pdf').send(fs.readFileSync(result.filename));
					console.log('afterCreatePDF');
					return true
				})
				.catch((error) => {
					console.error(error);
					console.log('afterCreatePDF ERORR');
				});
			// console.log('pdfdone', pdfdone);

			return pdfdone


		}))
		const result = await PDFDONES.then(async () => {

			console.log('DONE');

			// return zip.zip("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, './.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip');
			// const myzip = await zip.zip("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, undefined, { customWriteStream: this.res.send });

			// console.log(myzip);
			// const zipfile = fs.readFileSync('./.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip')

			return await zipdir("./.tmp/facturesInterne/" + dayjs(month).format('MMMM') + currentPartenaire.id, { saveTo: './.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip' });


		}).then(async (zipfile) => {
			console.log('then')
			console.log('zipfile', zipfile);
			this.res.attachment('factures-' + dayjs(month).format('MMMM') + '-' + 'a-percevoir.zip').send(zipfile);
		})
		fs.rm('./.tmp/facturesInterneZIP/' + dayjs(month).format('MMMM') + currentPartenaire.id + '.zip', () => {
			console.log('CB');
		})
		console.log('./.tmp/facturesInterne/' + dayjs(month).format('MMMM') + currentPartenaire.id);
		fs.rmdir('./.tmp/facturesInterne/' + dayjs(month).format('MMMM') + currentPartenaire.id, { recursive: true }, (err) => {
			console.log('CB rmDir');
			console.log(err);
		})
		return result

	}

};
