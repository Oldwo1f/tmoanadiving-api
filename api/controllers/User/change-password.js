module.exports = {


	friendlyName: 'Change password',




	inputs: {
		id: {
			required: true,
			type: 'string',
			description: 'The id of user',
		},

		password: {
			required: true,
			type: 'string',
		},
		newpassword: {
			required: true,
			type: 'string',
		},
		newpasswordcomfirm: {
			required: true,
			type: 'string',
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


	fn: async function ({ id, password, newpassword, newpasswordcomfirm }) {
		console.log('CONTROLLER: User | changepassword ==> ', id);
		// const dayjs = require('dayjs');
		console.log('password', password);
		console.log('newpassword', newpassword);
		console.log('newpasswordcomfirm', newpasswordcomfirm);

		if (newpassword != newpasswordcomfirm) {
			throw 'invalid';
		}
		var record = await User.findOne(id).then(async function (user) {

			// console.log('err', err);
			console.log('res', user);

			await sails.helpers.passwords.checkPassword(password, user.password)
				.intercept('incorrect', 'invalid');

			var record = await User.updateOne(id).set({ password: await sails.helpers.passwords.hashPassword(newpassword) })
				.intercept({ name: 'UsageError' }, 'invalid')

			return record
		});


		// datas.creditPlongee = Number(datas.creditPlongee)
		// datas.dateExpiCredit = dayjs(datas.dateExpiCredit).valueOf()
		// const passacheter = [...datas.passacheter]
		// delete datas.passacheter


		// var record = await User.updateOne(id).set(datas)
		// 	.intercept({ name: 'UsageError' }, 'invalid')

		// console.log('reccord', record);
		// record.passacheter = passacheter
		// return record

	}

};
