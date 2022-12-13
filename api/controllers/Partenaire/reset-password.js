module.exports = {


	friendlyName: 'Reset Partenaire password',


	description: 'Fetch Partenaire by id / Reset his password / Send it by mail',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		},


	},


	exits: {

		success: {
			description: 'Mot de passe réinitialisé et envoyé par email.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: Partenaire | update ==> ', id);
		const { customAlphabet } = require('nanoid')
		const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)
		const password = nanoid()

		// console.log('datas', datas);
		//  password = 'Alexis0'
		const hashedpassword = await sails.helpers.passwords.hashPassword(password)

		console.log(password + ' --- ' + hashedpassword);
		var record = await Partenaire.updateOne(id).set({ password: hashedpassword })
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log('firstName', record.firstName);
		await sails.helpers.email.sendHtmlEmail.with({
			to: record.email,
			subject: 'Votre nouveau mot de passe',
			layout: 'layout-email',
			template: 'email-new-password',
			templateData: {
				password: password,
				// token: newUserRecord.emailProofToken
				// firstName: record.firstName
			},
			from: 'no-reply@temoanadiving-pass.com'
		});

		try {
			const template = await sails.renderView('password-confirm-recovery', { data: { nodata: 'nodatas' }, layout: 'layouts/layout-email' })
			return this.res.status(200).send(template)
		} catch (e) {
			console.log('ELSE', e)
			return e

		}


	}

};
