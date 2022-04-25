module.exports = {


	friendlyName: 'Send template email',


	description: 'Send an email using a template.',


	extendedDescription: '',


	inputs: {


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
	},


	exits: {

		success: {
			outputFriendlyName: 'Email template',
			outputDescription: 'get the HTML result of the email to be sent',
			outputType: {
				loggedInsteadOfSending: 'boolean'
			}
		}

	},


	fn: async function ({ template, templateData, layout }) {

		var path = require('path');
		var url = require('url');
		var util = require('util');

		console.log('TEMPLATE', template);


		if (!_.startsWith(path.basename(template), 'email-')) {
			sails.log.warn(
				'The "template" that was passed in to `sendTemplateEmail()` does not begin with ' +
				'"email-" -- but by convention, all email template files in `views/emails/` should ' +
				'be namespaced in this way.  (This makes it easier to look up email templates by ' +
				'filename; e.g. when using CMD/CTRL+P in Sublime Text.)\n' +
				'Continuing regardless...'
			);
		}

		if (_.startsWith(template, 'views/') || _.startsWith(template, 'emails/')) {
			throw new Error(
				'The "template" that was passed in to `sendTemplateEmail()` was prefixed with\n' +
				'`emails/` or `views/` -- but that part is supposed to be omitted.  Instead, please\n' +
				'just specify the path to the desired email template relative from `views/emails/`.\n' +
				'For example:\n' +
				'  template: \'email-reset-password\'\n' +
				'Or:\n' +
				'  template: \'admin/email-contact-form\'\n' +
				' [?] If you\'re unsure or need advice, see https://sailsjs.com/support'
			);
		}//•

		// Determine appropriate email layout and template to use.
		var emailTemplatePath = path.join('emails/', template);
		console.log('emailTemplatePath: ', emailTemplatePath);
		var emailTemplateLayout;
		if (layout) {
			emailTemplateLayout = path.relative(path.dirname(emailTemplatePath), path.resolve('layouts/', layout));
		} else {
			emailTemplateLayout = false;
		}

		// Compile HTML template.
		// > Note that we set the layout, provide access to core `url` package (for
		// > building links and image srcs, etc.), and also provide access to core
		// > `util` package (for dumping debug data in internal emails).
		var htmlEmailContents = await sails.renderView(
			emailTemplatePath,
			_.extend({ layout: emailTemplateLayout, url, util }, templateData)
		)
			.intercept((err) => {
				err.message =
					'Could not compile view template.\n' +
					'(Usually, this means the provided data is invalid, or missing a piece.)\n' +
					'Details:\n' +
					err.message;
				return err;
			});
		return htmlEmailContents;


	}

};
