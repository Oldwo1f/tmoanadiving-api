/**
 * Pass.js
 *
 * Pass temoana
 */

module.exports = {

	attributes: {


		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'actif' },
		numerofacture: { type: 'string', required: true },
		nbplongeeResident: { type: 'number', defaultsTo: 0 },
		nbplongeeTouriste: { type: 'number', defaultsTo: 0 },


		emetteur: {
			model: 'partenaire',
			// via: 'passvendu'
		},
		recepteur: {
			model: 'partenaire',
			// via: 'passvendu'
		}


	},


};
