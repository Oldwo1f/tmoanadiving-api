module.exports = {


	friendlyName: 'forgotpasswor',


	description: 'Send an emailto the user with a link to reset password',


	extendedDescription:
		``,


	inputs: {
		emailAddress: {
			required: true,
			type: 'string',
			description: 'The id of user',
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


	fn: async function ({ emailAddress }) {

		console.log('Forgotpassword :', emailAddress);
		var record = await User.findOne({ emailAddress: emailAddress })
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log('record:', record)
		var link = 'https://api.temoanadiving-pass.com/api/v1/user/resetPassword/' + record.id;


		await sails.helpers.email.sendHtmlEmail.with({
			to: record.emailAddress,
			subject: 'Voici votre mot de passe',
			layout: 'layout-email',
			template: 'email-lost-password',
			templateData: {
				link: link,
				// token: newUserRecord.emailProofToken
				firstName: record.firstName,
				lastName: record.lastName,
				idClient: record.idclient,
				emailAddress: record.emailAddress,
			},
			from: 'no-reply@temoanadiving-pass.com'
		});

		return record

	}

};
