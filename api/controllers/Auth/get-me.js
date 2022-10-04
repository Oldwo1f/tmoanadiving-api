module.exports = {


	friendlyName: 'Get me',


	description: 'Fetch the connected user ',


	extendedDescription:
		``,


	inputs: {
		// id: {
		// 	required: true,
		// 	type: 'string',
		// 	description: 'The id of user',
		// }

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
		console.log('CONTROLLER: Auth | get-me ==> ');

		// const userId = '61c8f96b22230d6ff463aa8a'
		console.log(this.req.session);
		const userId = this.req.user

		// console.log('this.req', this.req);
		// console.log('this.req.user', this.req.user);
		console.log(userId);


		var record = await User.findOne(userId).populate('passacheter').populate('plongees')
			.intercept({ name: 'UsageError' }, 'invalid')

		var plongees = await Promise.all(record.plongees.map(async (elem) => {

			console.log('elem', elem);
			return Plongee.findOne(elem.id).populate('partenaire').then((e) => { console.log('e', e); return e })

		}))
		console.log('plongee', plongees);
		var record2 = { ...record };
		record2.plongees = plongees

		// this.res.set('Access-Control-Allow-Headers', 'strict-origin-when-cross-origin, access-control-allow-headers, application/json, text/plain, */*, Authorization');
		// this.res.send(record)
		return { user: record2 }

	}

};
