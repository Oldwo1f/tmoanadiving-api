module.exports = {


	friendlyName: 'Send HTML email',


	description: 'Send an automated HTML email for developpement.',


	extendedDescription: 'This implementation delivers the provided message using the Mailtrap API.',



	inputs: {

		to: {
			example: 'anne.m.martin@example.com',
			description: 'Email address of the desired recipient.',
			required: true,
			isEmail: true,
		},

		subject: {
			description: 'Subject line for the email.',
			example: 'Welcome, Anne!',
			required: true
		},

		from: {
			description: 'The email address of the sender.',
			example: 'noreply@sailsjs.com',
			required: true
		},

		fromName: {
			description: 'The display name of the sender, for display purposes in the inbox.',
			example: 'Sails Co.'
		},

		// secret: {
		// 	type: 'string',
		// 	required: true,
		// 	description: 'The secret API key from a valid Mailtrap developer account.',
		// 	extendedDescription: 'Like any other input, this can be set globally using .configure().',
		// 	example: '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',
		// 	protect: true,
		// 	whereToGet: {
		// 		url: 'https://app.sendgrid.com/settings/api_keys',
		// 		description: 'Generate an API key in your SendGrid dashbaord.',
		// 		extendedDescription: 'To generate an API key, you will first need to log in to your SendGrid account, or sign up for one if you have not already done so.'
		// 	}
		// },

		toName: {
			example: 'Anne M. Martin',
			description: 'Full name of the primary recipient.',
		},

		bcc: {
			description: 'A list of email addresses of recipients secretly copied on the email.',
			example: ['jahnna.n.malcolm@example.com'],
			defaultsTo: [],
		},

		attachments: {
			description: 'Attachments to include in the email, with the file content encoded as base64.',
			moreInfoUrl: 'https://sendgrid.com/docs/API_Reference/Web_API_v3/Mail/index.html',
			whereToGet: {
				url: 'https://npmjs.com/package/sails-hook-uploads',
				description: 'If you have `sails-hook-uploads` installed, you can use `sails.reservoir` to get an attachment into the expected format.',
			},
			example: [
				{
					contentBytes: 'iVBORw0KGgoAA…',
					name: 'sails.png',
					type: 'image/png',
				}
			],
			defaultsTo: [],
		},
		templateData: {
			description: 'A dictionary of data which will be accessible in the EJS template.',
			extendedDescription: 'Each key will be a local variable accessible in the template.  For instance, if you supply ' +
				'a dictionary with a \`friends\` key, and \`friends\` is an array like \`[{name:"Chandra"}, {name:"Mary"}]\`),' +
				'then you will be able to access \`friends\` from the template:\n' +
				'\`\`\`\n' +
				'<ul>\n' +
				'<% for (friend of friends){ %><li><%= friend.name %></li><% }); %>\n' +
				'</ul>\n' +
				'\`\`\`' +
				'\n' +
				'This is EJS, so use \`<%= %>\` to inject the HTML-escaped content of a variable, \`<%= %>\` to skip HTML-escaping ' +
				'and inject the data as-is, or \`<% %>\` to execute some JavaScript code such as an \`if\` statement or \`for\` loop.',
			type: {},
			defaultsTo: {}
		},
		layout: {
			description: 'Set to `false` to disable layouts altogether, or provide the path (relative ' +
				'from `views/layouts/`) to an override email layout.',
			defaultsTo: 'layout-email',
			custom: (layout) => layout === false || _.isString(layout)
		},
		template: {
			description: 'The relative path to an EJS template within our `views/emails/` folder -- WITHOUT the file extension.',
			extendedDescription: 'Use strings like "foo" or "foo/bar", but NEVER "foo/bar.ejs" or "/foo/bar".  For example, ' +
				'"internal/email-contact-form" would send an email using the "views/emails/internal/email-contact-form.ejs" template.',
			example: 'email-reset-password',
			type: 'string',
			required: true
		},

	},


	exits: {

		success: {
			outputType: 'string',
			outputDescription: 'Mailrtap message ID',
			extendedDescription: 'Note that sending the email successfully does not necessarily mean the email was _delivered_ successfully.  If you are having issues with mail being delivered, check the SendGrid dashboard for delivery status, and be sure to verify that the email wasn\'t quarantined or flagged as spam by the recipient\'s email service (e.g. Gmail\'s "spam folder" or GSuite\'s "admin quarantine").'
		}

	},


	fn: async function ({ to, subject, htmlMessage, from, fromName, secret, toName, bcc, attachments, templateData, template, layout }) {


		console.log('SEND-EMAIL-TEMPLATE');
		// Import dependencies.
		var _ = require('@sailshq/lodash');
		const nodemailer = require('nodemailer')

		console.log('send-html-email-with-mailtrap');

		const emailContent = await sails.helpers.email.renderEmailTemplate(layout, template, templateData)
		let emailDatas = {
			subject: subject,
			to: to,
			from: from
		}

		var formattedAttachments;
		if (attachments.length > 0) {
			formattedAttachments = attachments.map((attachmentData) => {
				return {
					content: attachmentData.contentBytes,
					filename: attachmentData.name,
					type: attachmentData.type,
				};
			});
			emailDatas.attachments = formattedAttachments
		}
		emailDatas.html = emailContent;

		const transport = nodemailer.createTransport({
			host: 'smtp.mailtrap.io',
			port: 2525,
			auth: {
				user: '4d751c99d64101',
				pass: '47edc33501e177'
			}
		})

		const messageId = await transport.sendMail(emailDatas, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log('Email sent-->: ' + info.response)
				callback('ok')
			}
		})

		return messageId;
	}

};