'use strict';

var packageJSON = require('./../../package.json'),
	exec = require('child_process').exec;


function gitAdd() {
	return exec("git add -A '*'", function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			gitCommit();
		}
	});
}

function gitCommit() {
	exec("git commit -m 'version bump'", function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			gitTag();
		}
	});
}


function gitTag() {
	return exec("git tag -a v" + packageJSON.version + " -m 'version " + packageJSON.version + "'", function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}


gitAdd();
