module.exports = {


	friendlyName: 'Get one user',


	description: 'Fetch user by id and retrieve it',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
		}

	},


	exits: {

		success: {
			description: 'Voici votre utilisateur'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id }) {
		console.log('CONTROLLER: User | get-one ==> ', id);




		var datas = await User.findOne(id).populate('passacheter').populate('plongees')
			.intercept({ name: 'UsageError' }, 'invalid')


		const records = await Promise.all(datas.plongees.map(async (plongee) => {
			// console.log('part.id', part.dist, part._id);
			const record = await Plongee.findOne(plongee.id).populate('partenaire').populate('clubrevendeur')
			// record.dist = part.dist
			// console.log('record', record);
			return record
		}))
		datas.plongees = records
		console.log('records--------------', records);

		return datas

	}

};
