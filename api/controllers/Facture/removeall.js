
module.exports = {


	friendlyName: 'Delete one Partenaire',


	description: 'Fetch Partenaire by id and delete it',


	extendedDescription:
		``,




	exits: {

		success: {
			description: 'Partenaire supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Facture | removeall ==> ');




		var records = await Facture.find()
			.intercept({ name: 'UsageError' }, 'invalid')


		_.map(records, async elem => {

			await Facture.destroy(elem.id)

		})

		return records


	}

};
