module.exports = {


	friendlyName: 'Reset user password',


	description: 'Fetch user by id / Reset his password / Send it by mail',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
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
		console.log('CONTROLLER: User | update ==> ', id);
		const { customAlphabet } = require('nanoid')
		const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz', 6)
		const password = nanoid()

		// console.log('datas', datas);
		//  password = 'Alexis0'
		const hashedpassword = await sails.helpers.passwords.hashPassword(password)

		console.log(password + ' --- ' + hashedpassword);
		var record = await User.updateOne(id).set({ password: hashedpassword })
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log('firstName', record.firstName);
		await sails.helpers.email.sendHtmlEmail.with({
			to: record.emailAddress,
			subject: 'Votre nouveau mot de passe',
			layout: 'layout-email',
			template: 'email-new-password',
			templateData: {
				password: password,
				// token: newUserRecord.emailProofToken
				firstName: record.firstName
			},
			from: 'noreply@test.fr'
		});

		return record

	}

};
