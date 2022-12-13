module.exports = {


	friendlyName: 'forgotpasswor',


	description: 'Send an emailto the partenaire with a link to reset password',


	extendedDescription:
		``,


	inputs: {
		login: {
			required: true,
			type: 'string',
			description: 'The name of partenaire',
		},


	},


	exits: {

		success: {
			description: 'Suivre la procédure par email'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ login }) {

		console.log('Forgotpassword :', login);
		var record = await Partenaire.findOne({ login: login })
			.intercept({ name: 'UsageError' }, 'invalid');


		console.log('record:', record)
		var link = 'https://api.temoanadiving-pass.com/api/v1/partenaire/resetPassword/' + record.id;


		await sails.helpers.email.sendHtmlEmail.with({
			to: record.email,
			subject: 'Voici votre mot de passe',
			layout: 'layout-email',
			template: 'email-lost-password',
			templateData: {
				link: link,
				// token: newUserRecord.emailProofToken
				// firstName: record.firstName,
				// lastName: record.lastName,
				// idClient: record.idclient,
				// email: record.email,
			},
			from: 'no-reply@temoanadiving-pass.com'
		});

		return record.email

	}

};
