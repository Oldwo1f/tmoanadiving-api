module.exports = {


	friendlyName: 'Download facture pass',




	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Pass',
		}

	},


	exits: {

		success: {
			description: 'Voici votre facture'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Pass | facture ==> ', id);

		const fs = require('fs')
		const dayjs = require('dayjs')
		var pdf = require("pdf-creator-node");
		const fspromise = require('fs').promises




		var pass = await Pass.findOne(id).populate('user').populate('partenaire')
			.intercept({ name: 'UsageError' }, 'invalid')

		var datas = { ...pass }
		console.log(pass);

		var html = fs.readFileSync(sails.config.appPath + "/views/factures/facture.html", "utf8");
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

					default: '<span style="color: #444;font-size:8px; text-align:center;">' + pass.partenaire.footerfacture + '</span>',
				}
			}
		};
		datas.createdAt = dayjs(pass.createdAt).format('DD/MM/YYYY')
		datas.dateeffect = dayjs(pass.dateeffect).format('DD/MM/YYYY')
		console.log('pass.resident=', pass.resident);
		console.log('pass..footerfacture=', pass.footerfacture);
		console.log(' sails.config.appPath =', sails.config.custom.appPath);
		console.log(' sails.config.prixUnitaireResidant =', sails.config.custom.prixUnitaireResidant);
		datas.prixunit = pass.resident ? sails.config.custom.prixUnitaireResidant : sails.config.custom.prixUnitaireTouriste
		console.log('prixunit=', datas.prixunit);

		datas.tva = (datas.price * sails.config.custom.tva).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		datas.tvas = (datas.price * sails.config.custom.tvas).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		datas.price = datas.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		datas.prixunit = datas.prixunit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
		// datas.numerofacture= 

		//  await Partenaire.updateOne(id).set({numerofacture:datas.numerofacture})
		// 	.intercept({ name: 'UsageError' }, 'invalid')

		var document = {
			html: html,
			data: {
				d: datas,
			},
			path: "./.tmp/factures/" + datas.id + ".pdf",
			type: "",
		};
		console.log('HERE');
		const pdfdone = await pdf
			.create(document, options)
			.then(async (result) => {
				this.res.attachment('facture-' + datas.numerofacture + '.pdf').send(fs.readFileSync(result.filename));
			})
			.catch((error) => {
				console.error(error);
			});



	}

};
