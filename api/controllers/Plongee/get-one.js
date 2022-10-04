module.exports = {


	friendlyName: 'Get one Plongee',


	description: 'Fetch Plongee by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Plongee',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Plongee'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Plongee | get-one ==> ', id);




		var record = await Plongee.findOne(id).populate('partenaire').populate('user').populate('clubrevendeur')
			// .populate('images').populate('logos')
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log(record);

		// record.lng = record.location.coordinates[0]
		// record.lat = record.location.coordinates[1]

		return record

	}

};
