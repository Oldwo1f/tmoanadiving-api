
module.exports = {


	friendlyName: 'Get club by pos',


	description: 'Fetch Partenaire list and retrieve it',


	extendedDescription:
		``,

	inputs: {
		lat: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		},
		lng: {
			required: true,
			type: 'string',
			description: 'The id of Partenaire',
		}

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


	fn: async function ({ lat, lng }) {
		console.log('CONTROLLER: Partenaire | get-all-club-by-pos');


		// var record = await Partenaire.find({ type: 'club' }).populate('logos').populate('images')
		// 	.intercept({ name: 'UsageError' }, 'invalid')
		// console.log(lat, lng);


		let datas = await Partenaire.findNear({ lat: lat, lng: lng }, function (err, results) {
			// console.log('---------------------------------');
			// console.log(err, results);
			// console.log('---------------------------------');
			if (err) {

				console.log('ERROR : ', err);

			}
			else {
				// console.log('results : ', results);
				return results
			}
		})

		// datas = datas.slice(0, 4)
		console.log('datas', datas);
		const records = await Promise.all(datas.map(async (part) => {
			// console.log('part.id', part.dist, part._id);
			const record = await Partenaire.findOne('' + part._id).populate('logos').populate('images')
			record.dist = part.dist
			// console.log('record', record);
			return record
		}))
		// console.log('records', records);

		return records


	}

};
