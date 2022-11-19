module.exports = {


	friendlyName: 'Update user',


	description: 'Fetch user by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
		},

		datas: {
			required: true,
			type: 'json',
			description: 'The new users datas',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours utilisateur réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ id, datas }) {
		console.log('CONTROLLER: User | update ==> ', id);
		const dayjs = require('dayjs');
		console.log('datasss--------', datas);

		datas.creditPlongee = Number(datas.creditPlongee)
		datas.dateExpiCredit = dayjs(datas.dateExpiCredit).valueOf()
		const passacheter = [...datas.passacheter]
		delete datas.passacheter
		delete datas.plongees


		var record = await User.updateOne(id).set(datas)
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log('reccord', record);
		record.passacheter = passacheter
		return record

	}

};
