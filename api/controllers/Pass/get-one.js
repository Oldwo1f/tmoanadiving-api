module.exports = {


	friendlyName: 'Get one Pass',


	description: 'Fetch Pass by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of Pass',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Pass'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Pass | get-one ==> ', id);




		var record = await Pass.findOne(id).populate('images').populate('logos')
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log(record);

		record.lng = record.location.coordinates[0]
		record.lat = record.location.coordinates[1]

		return record

	}

};
