/**
 * Pass.js
 *
 * Pass temoana
 */

module.exports = {

	attributes: {


		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'actif' },
		dateeffect: { type: 'number', required: true },
		nbplongee: { type: 'number', required: true },
		nbplongeerestant: { type: 'number', required: true },
		price: { type: 'number', required: true },
		resident: { type: 'boolean', required: true },
		user: {
			model: 'user',
			// via: 'passacheter'
		},
		partenaire: {
			model: 'partenaire',
			// via: 'passvendu'
		}


	},


};
