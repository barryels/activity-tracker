'use strict';

function getCurrentApplicationTitle() {
	return getCurrentApplicationTitle_linux();
}


function getCurrentWindowTitle() {
	return '';
}


function isScreensaverActive() {
	return isScreensaverActive_linux();
}


function isScreensaverActive_linux() {
	var exec = require('child_process').exec;
	var cmd = 'pgrep -cf lockscreen-mode';

	exec(cmd, function (error, stdout, stderr) {
		// console.log(stdout);
		return false;
	});
}


function getCurrentApplicationTitle_linux() {
	var exec = require('child_process').exec;
	var cmd = 'xprop -id $(xprop -root 32x \'\t$0\' _NET_ACTIVE_WINDOW | cut -f 2) WM_CLASS WM_NAME';

	exec(cmd, function (error, stdout, stderr) {
		console.log(stdout, stderr);
		return false;
	});
}


function tick() {
	isScreensaverActive();
	getCurrentApplicationTitle();
}


function start() {
	setInterval(function () {
		tick();
	}, 1000);
}


function init() {
	start();
}


init();
