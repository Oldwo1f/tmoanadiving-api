module.exports = {


	friendlyName: 'Prelevement Plongee',


	description: 'Fetch Plongee by id  and change the data according to what we recieve from client',


	extendedDescription:
		``,


	inputs: {

		idClient: {
			required: true,
			type: 'string',
		},
		idClub: {
			required: true,
			type: 'string',
		},
		nbPlongee: {
			required: true,
			type: 'number',
		},

	},


	exits: {

		success: {
			description: 'Mise à jours Plongee réussi.'
		},

		invalid: {
			responseType: 'badRequest',
			description: 'request invalid.',
			extendedDescription: ''
		},

		error: {

			responseType: 'custo',
			description: 'No credits left.',
		},
		invalid2: {
			statusCode: 408,
			description: 'Database Error',
			extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
				'parameters should have been validated/coerced _before_ they were sent.'
		},
	},


	fn: async function ({ idClient, idClub, nbPlongee }) {
		console.log('CONTROLLER: Plongee | prelevementplongee ==> ');

		const dayjs = require('dayjs');

		console.log('idClient', idClient);
		console.log('idClub', idClub);
		console.log('nbPlongee', nbPlongee);
		console.log('----------');




		//find client
		var client = await User.findOne(idClient).populate('passacheter')
			.intercept({ name: 'Error' }, 'invalid2')
		if (!client) {
			this.res.statusToSend = 404;
			this.res.message = 'noclient';
			throw 'error';
		};

		//find club
		var club = await Partenaire.findOne(idClub)
			.intercept({ name: 'UsageError' }, 'invalid')
		if (!club) {
			this.res.statusToSend = 404;
			this.res.message = 'noclub';
			throw 'error';
		}

		//calculer les credits restants

		let credit = 0;

		if (client.passacheter) {
			console.log('ya des pass');
			client.passacheter.forEach(element => {
				if (element.dateeffect < dayjs().valueOf() && dayjs().valueOf() <= dayjs(element.dateeffect).add(1, 'y').valueOf()) {
					console.log('IF DATE');
					console.log(element);
					credit += element.nbplongeerestant;

				}
			});

		} else {
			console.log('no pass');
			this.res.statusToSend = 403;
			this.res.message = 'nopass';
			throw 'error';
		}
		console.log(credit);
		// credit = 0;
		if (credit < nbPlongee) {
			this.res.statusToSend = 403;
			this.res.message = 'nocredit';
			throw 'error';
		}

		//Retirer credit du pass le plus vieux
		const sortedPass = client.passacheter.sort((a, b) => { return a.createdAt < b.createdAt ? -1 : (a.createdAt > b.createdAt ? 1 : 0) })
		const filteredPass = sortedPass.filter((elem) => {
			return elem.nbplongeerestant > 0
		})
		console.log('sortedPass==================', sortedPass);
		console.log('sortedPass==================', filteredPass);
		if (filteredPass[0].nbplongeerestant - nbPlongee >= 0) {
			//retirer les plongées sur ce pass
			console.log('=0');
			// sortedPass[0].nbplongeerestant = sortedPass[0].nbplongeerestant - nbPlongee
			console.log('sortedPass[0]', filteredPass[0])
				;
			await Pass.updateOne(filteredPass[0].id).set({ nbplongeerestant: filteredPass[0].nbplongeerestant - nbPlongee })
				.intercept({ name: 'UsageError' }, 'invalid')

			const newPlongee = await Plongee.create({
				user: client.id,
				partenaire: club.id,
				nbPlongeur: nbPlongee,
				clubrevendeur: filteredPass[0].partenaire,
				resident: filteredPass[0].resident

			})

			console.log(newPlongee);

		} else if (filteredPass[0].nbplongeerestant - nbPlongee == -1) {
			console.log('=-1');


			await Pass.updateOne(filteredPass[0].id).set({ nbplongeerestant: 0 })
				.intercept({ name: 'UsageError' }, 'invalid')
			await Pass.updateOne(filteredPass[1].id).set({ nbplongeerestant: filteredPass[1].nbplongeerestant - 1 })
				.intercept({ name: 'UsageError' }, 'invalid')

			const newPlongee = await Plongee.create({
				user: client.id,
				partenaire: club.id,
				nbPlongeur: 1,
				clubrevendeur: filteredPass[0].partenaire

			})
			const newPlongee2 = await Plongee.create({
				user: client.id,
				partenaire: club.id,
				nbPlongeur: 1,
				clubrevendeur: filteredPass[1].partenaire

			})



		}





















		// delete datas.images
		// delete datas.logos
		// if (!datas.lat) {
		// 	console.log('lat not there');
		// 	datas.lat = 0;
		// }
		// if (!datas.lng) {
		// 	console.log('lng not there');
		// 	datas.lng = 0;
		// }

		// datas.location = {
		// 	"type": "Point",
		// 	"coordinates": [parseFloat(datas.lng), parseFloat(datas.lat)]
		// }

		// // console.log('datas', datas);


		// var result = await Plongee.updateOne(id).set(datas)
		// 	.intercept({ name: 'UsageError' }, 'invalid');
		// var record = await Plongee.findOne(id)
		// // .populate('images').populate('logos')

		// // console.log(record);
		// // record.lng = record.location.coordinates[0]
		// // record.lat = record.location.coordinates[1]

		return client

	}

};
