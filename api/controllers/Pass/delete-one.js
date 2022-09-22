module.exports = {


	friendlyName: 'Delete one Pass',


	description: 'Fetch Pass by id and delete it',


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
			description: 'Pass supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Pass | delete-one ==> ', id);




		var record = await Pass.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
