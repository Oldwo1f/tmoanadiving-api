/**
 * ImageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs')
module.exports = async function serveImage(req, res) {

	console.log('serveimage')
	console.log(req.params)
	const filePath = sails.config.custom.appPath + '/public/uploads/original/' + req.params.path
	// +req.params.size+'/'
	// sails.log(filePath);
	const stat = fs.statSync(filePath)
	res.writeHead(200, {
		// 'Content-Type': 'image/',
		'Content-Length': stat.size
	})

	const readStream = fs.createReadStream(filePath)
	readStream.pipe(res)
}


// module.exports = {


// 	friendlyName: 'Serve Image',


// 	description: '',


// 	inputs: {

// 		path: {
// 			required: true,
// 			type: 'string',
// 			description: 'The name of the image',
// 		},

// 	},


// 	exits: {

// 		success: {
// 			description: 'Voila votre image.'
// 		},


// 	},


// 	fn: async function ({ path }) {
// 		const fs = require('fs')
// 		// const fspromise = require('fs').promises
// 		const { open } = require('fs/promises');

// 		// req = this.req;
// 		res = this.res;

// 		console.log('serveimage')
// 		// console.log(req.params)
// 		const filePath = '/var/www/DEV/SERVER/public/uploads/original/' + path
// 		// +req.params.size+'/'
// 		// sails.log(filePath);
// 		const stat = fs.statSync(filePath)
// 		// console.log('stats:', stat);
// 		// res.writeHead(200, {
// 		// 	// 'Content-Type': 'image/',
// 		// 	'Content-Length': stat.size
// 		// })

// 		// const fd = await open(filePath);
// 		// // res.set("Content-disposition", "attachment; filename='" + path + "'");
// 		// var readStream = fd.createReadStream()
// 		// readStream.on('open', function () {
// 		// 	console.log('OPEN');
// 		// 	// This just pipes the read stream to the response object (which goes to the client)
// 		// 	readStream.pipe(res);
// 		// });
// 		// readStream.on('error', function (err) {
// 		// 	console.log('err', err);
// 		// 	res.end(err);
// 		// });
// 		// readStream.on('close', function (close) {
// 		// 	console.log('close', close);
// 		// 	// res.end(err);
// 		// });
// 		// console.log(readStream);
// 		// readStream.pipe(this.res)



// 		const stream = fs.createReadStream(filePath);
// 		stream.pipe(res)
// 		// setTimeout(() => {
// 		// 	stream.close(); // This may not close the stream.
// 		// 	// Artificially marking end-of-stream, as if the underlying resource had
// 		// 	// indicated end-of-file by itself, allows the stream to close.
// 		// 	// This does not cancel pending read operations, and if there is such an
// 		// 	// operation, the process may still not be able to exit successfully
// 		// 	// until it finishes.
// 		// 	stream.push(null);
// 		// 	stream.read(0);
// 		// }, 100);
// 	}

// };
