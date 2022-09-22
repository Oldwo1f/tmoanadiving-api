module.exports = {


	friendlyName: 'Get me',


	description: 'Fetch the connected partenaire ',


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


	fn: async function () {
		console.log('CONTROLLER: Auth | get-me-partenaire ==> ');

		// const userId = '61c8f96b22230d6ff463aa8a'
		// const partId = this.req.partenaireId
		console.log(this.req.partenaireId);
		const partId = '632b7f6aa19eb72065a4d125'

		// console.log('this.req', this.req);
		// console.log('this.req.user', this.req.user);
		console.log(partId);


		var record = await Partenaire.findOne(partId).populate('images').populate('logos')
			.intercept({ name: 'UsageError' }, 'invalid')

		console.log(record);

		// this.res.set('Access-Control-Allow-Headers', 'strict-origin-when-cross-origin, access-control-allow-headers, application/json, text/plain, */*, Authorization');
		// this.res.send(record)
		return { user: record }

	}

};
