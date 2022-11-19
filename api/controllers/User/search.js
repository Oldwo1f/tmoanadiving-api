module.exports = {


	friendlyName: 'Search users',


	description: 'Fetch users list and retrieve it',


	extendedDescription:
		``,


	inputs: {
		slug: {
			default: 0,
			type: 'string',
		},

	},


	exits: {

		success: {
			description: 'Voici la list.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},
	},


	fn: async function ({ slug }) {
		console.log('CONTROLLER: User | searchclient');
		// page = page ? page : 1;
		// limit = limit ? limit : 100;
		// archive = archive ? archive : false;
		// console.log('pageParams: ', page);
		// console.log('limitParams: ', limit);
		console.log('slug: ', slug);

		var record = await User.find({
			where:
			{
				or: [
					{
						firstName: { contains: slug }
					},
					{
						lastName: { contains: slug }
					},
					{
						firstName: { contains: slug }
					},
					{
						emailAddress: { contains: slug }
					},
					{
						idclient: { contains: slug }
					}
				]
			}

		})
			.intercept({ name: 'UsageError' }, 'invalid')


		console.log(record);


		return record

	}

};
