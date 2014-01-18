var exec = require('child_process').exec;

var child = exec("phantomjs --version", function (error, stdout, stderr) {
    if (error !== null) {
	console.error( 'Phantomjs is not on the PATH' );
	process.exit(1);
    }
});

module.exports = {};
