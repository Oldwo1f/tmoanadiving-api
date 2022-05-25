/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {


		name: {
			type: 'string',
			maxLength: 100,
			required: true,
			unique: true,
		},
		url: {
			type: 'string',
		},
		htmlvalue: {
			type: 'string',
		},
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'draft' },

	},


};
