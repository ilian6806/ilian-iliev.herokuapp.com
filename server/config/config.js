var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

	dev: {
		rootPath: rootPath,
		port: process.env.PORT || 9000
	},

	live: {
		rootPath: rootPath,
		port: process.env.PORT || 9000
	}
};