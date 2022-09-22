// const Jeu = require('../../models/Jeu');

const { setMaxListeners } = require('process');

module.exports = {


	friendlyName: 'Add logo',


	description: 'Add a new logo to plongees',

	files: ['image'],
	inputs: {

		idplongee: {
			type: 'string',
		},
		image: {
			type: 'ref',
		},


	},


	exits: {

		success: {
			description: 'logo associer au plongee.'
		},
		tooBig: {
			description: 'The file is too big.',
			responseType: 'badRequest'
		},
		noFileAttached: {
			description: 'No File Attached.',
			responseType: 'badRequest'
		},

		// invalid: {
		// 	responseType: 'badRequest',
		// 	description: 'The provided name is invalid.',

		// },
		// invalid2: {
		// 	statusCode: 408,
		// 	description: 'Database Error',
		// },

		// nameAlreadyInUse: {
		// 	responseType: 'custom',
		// 	statusCode: 409,
		// 	description: 'The provided Name is already in use.',
		// },

	},


	fn: async function ({ idplongee, image }) {

		const fs = require('fs')
		const fspromise = require('fs').promises
		const path = require('path');
		const { customAlphabet } = require('nanoid')
		const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 3)
		const randomStr = nanoid()


		res = this.res;

		// console.log('req', this.req);
		console.log(idplongee);
		// console.log(this.req.file('file'));
		// var info = await this.req.file('file').upload({
		// 	maxBytes: 10000000
		// })
		var info = await sails.upload(image, {
			maxBytes: 10000000
		})
			.intercept('E_EXCEEDS_UPLOAD_LIMIT', 'tooBig')
			.intercept((err) => new Error('The photo upload failed: ' + err));

		if (!info) {
			throw 'noFileAttached';
		}
		console.log('info,', info);

		await fspromise.copyFile(info[0].fd, sails.config.custom.appPath + '/public/uploads/original/' + randomStr + '-' + info[0].filename)

		const createdImage = await Image.create({
			name: randomStr + '-' + path.parse(info[0].filename).name,
			ext: path.parse(info[0].filename).ext,
			filename: randomStr + '-' + info[0].filename,
			size: info[0].size,
		}).fetch()

		console.log('createdImage ', createdImage);
		const result = await Plongee.addToCollection(idplongee, 'logos').members([createdImage.id])
		createdImage.plongeelogo = idplongee
		return createdImage


	}

};
