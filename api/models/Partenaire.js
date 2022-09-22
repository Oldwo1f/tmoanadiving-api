/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

		password: { type: 'string', required: true, protect: true, },
		login: { type: 'string', required: true, unique: true, minLength: 3, maxLength: 255 },
		name: { type: 'string', required: true, unique: true, minLength: 3, maxLength: 255 },
		website: { type: 'string' },
		phone: { type: 'string' },
		phoneM: { type: 'string' },
		island: { type: 'string' },
		city: { type: 'string' },
		email: { type: 'string' },
		description: { type: 'string' },
		type: { type: 'string', isIn: ['agency', 'club'], defaultsTo: 'club' },
		status: { type: 'string', isIn: ['draft', 'actif', 'inactif', 'archive'], defaultsTo: 'draft' },
		location: {
			type: 'json'
		},

		logos: {
			collection: 'image',
			via: 'partenairelogo'
		},
		images: {
			collection: 'image',
			via: 'partenaire'
		},
		passvendu: {
			collection: 'pass',
			via: 'partenaire'
		},
		plongees: {
			collection: 'plongee',
			via: 'partenaire'
		}


	},
	findNear: async function (conditions, callback) {
		console.log('find NEAR');
		console.log('condition', conditions);
		// console.log(conditions);
		const manager = Partenaire.getDatastore().manager

		// console.log();
		collection = manager.collection('partenaire')
		// console.log(collection);

		const filteredDocs = await collection.aggregate([
			{
				$geoNear: {
					near: { type: "Point", coordinates: [parseFloat(conditions.lng), parseFloat(conditions.lat)] },
					distanceField: "dist.calculated",
					maxDistance: 10000000,
					query: { type: "club" },
					includeLocs: "dist.location",
					spherical: true
				}
			}
		]).toArray()

		//   console.log('etablissements : ', etablissements);
		//   return callback(null, etablissements.results);
		// });
		// console.log('Found documents filtered by {} =>', filteredDocs);
		return callback(null, filteredDocs);
		// .Etablissement(function (err, collection) {
		//   if (err) return callback(err);

		//   console.log('ici');
		//   collection.find({}, function (err, etablissements) {
		//     console.log('iciiii');
		//     if (err) console.log(err);
		//     return callback(null, etablissements.results);

		//   });


		// });

	}


};
