module.exports = {


	friendlyName: 'Delete one Plongee',


	description: 'Fetch Plongee by id and delete it',


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
			description: 'Plongee supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Plongee | delete-one ==> ', id);




		var record = await Plongee.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
