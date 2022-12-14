// const User = require("../../models/User");

module.exports = {


	friendlyName: 'ventedepass',


	inputs: {

		dateeffect: {
			required: true,
			type: 'string',

		},
		nbplongee: {
			type: 'number',
		},
		// numerofacture: {
		// 	type: 'string',
		// },
		price: {
			type: 'number',
		},
		resident: {
			type: 'string',
		},
		userid: {
			type: 'string',
		},
		clubId: {
			type: 'string',
		},


	},


	exits: {

		success: {
			description: 'New Pass registered'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'The provided firstName, lastName, password and/or email address are invalid.',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},
		invalid2: {
			statusCode: 408,
			description: 'Database Error',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},

		emailAlreadyInUse: {
			responseType: 'custom',
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},

	},


	fn: async function ({ dateeffect, nbplongee, price, resident, userid, clubId }) {

		const dayjs = require('dayjs');

		console.log('vendre un pass');
		console.log('dateeffect', dateeffect);
		console.log('nbplongee', nbplongee);
		console.log('price', price);
		console.log('resident', resident);
		console.log('user', userid);
		console.log('clubId', clubId);

		dateeffect = dayjs(dateeffect).valueOf()
		const datefin = dayjs(dateeffect).add(1, 'year').valueOf()


		console.log('dateeffect', dateeffect);
		console.log('datefin', datefin);
		// if (dayjs(dateeffect).valueOf() < dayjs().endOf('day').valueOf()) {
		// 	console.log('Activer le pass maintenant');
		// 	var olduser = await User.findOne(userid, async function (err, usertoupdate) {
		// 		// { dateExpiCredit: datefin, creditPlongee: nbplongee }
		// 		console.log('usertoupdate', usertoupdate);
		// 		console.log('updateduser==>', updateduser);
		// 		var updateduser = await User.updateOne(userid).set({
		// 			creditPlongee: usertoupdate.creditPlongee + nbplongee,
		// 			dateExpiCredit: datefin
		// 		}).fetch()
		// 		console.log(updateduser);
		// 	})

		// }
		var club = await Partenaire.findOne(clubId)

		console.log(club.numeroFactureClient);
		console.log(club.prefixFactureClient);


		var newPass = await Pass.create({
			dateeffect: dateeffect,
			nbplongee: nbplongee,
			nbplongeerestant: nbplongee,
			price: price,
			resident: resident,
			user: userid,
			partenaire: clubId,
			numerofacture: '' + club.prefixFactureClient + club.numeroFactureClient

		})
			.intercept({ name: 'UsageError' }, 'invalid')
			.fetch();

		await Partenaire.updateOne(clubId).set({ numeroFactureClient: club.numeroFactureClient + 1 })
		const partenaire = await Partenaire.findOne(clubId)
		console.log('partenaire:', partenaire)


		await User.findOne(userid).then(
			async (user) => {
				try {
					await sails.helpers.email.sendHtmlEmail.with({
						to: user.emailAddress,
						subject: 'Pass Temoana diving',
						layout: 'layout-email',
						template: 'email-pass-achat',
						templateData: {
							firstName: user.firstName,
							lastName: user.lastName,
							idClient: user.idclient,
							emailAddress: user.emailAddress,
							nbplongee: nbplongee,
							dateeffect: dayjs(dateeffect).format('DD/MM/YYYY'),

						},
						from: 'no-reply@temoanadiving-pass.com'
					});
					console.log('partenaire:', partenaire)
					await sails.helpers.email.sendHtmlEmail.with({
						to: partenaire.email,
						subject: 'Pass Temoana diving',
						layout: 'layout-email',
						template: 'email-auto-congratz',
						templateData: {
							firstName: user.firstName,
							lastName: user.lastName,
							clubname: partenaire.name,
							// idClient: user.idclient,
							// emailAddress: user.emailAddress,
							nbplongee: newPass.nbplongee,
							dateeffect: dayjs(dateeffect).format('DD/MM/YYYY'),
							date: dayjs().format('DD/MM/YYYY'),

						},
						from: 'no-reply@temoanadiving-pass.com'
					});
				} catch (error) {
					console.log(error);
				}
			}
		)




		console.log(newPass);
		// console.log(updateduser);
		console.log('ho');



		return newPass;
	}

};
