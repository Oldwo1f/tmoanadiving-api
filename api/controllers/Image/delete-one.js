module.exports = {


	friendlyName: 'Delete one image',


	description: 'Fetch iamge by id and delete it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of image',
		}

	},


	exits: {

		success: {
			description: 'Image supprimé'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: Image | delete-one ==> ', id);




		var record = await Image.destroy(id)
			.intercept({ name: 'UsageError' }, 'invalid')


		return id


	}

};
