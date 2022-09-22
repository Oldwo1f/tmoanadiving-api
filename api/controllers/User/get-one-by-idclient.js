module.exports = {


	friendlyName: 'Get one client by idclient',




	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The idclient of User',
		}

	},


	exits: {

		success: {
			description: 'Voici votre Partenaire'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: User | get-one-byid ==> ', id);




		var record = await User.findOne({ idclient: id }).populate('passacheter')
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log(record);


		return record

	}

};
