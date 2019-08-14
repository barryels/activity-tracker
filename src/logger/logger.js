'use strict';

const port = process.env.LOGGER_PORT || 9999,
	CLIENT_CHECK_INTERVAL = process.env.CLIENT_CHECK_INTERVAL || 5000,
	fs = require('fs'),
	express = require('express'),
	app = express(),
	endOfLine = require('os').EOL,
	router = express.Router(),
	exec = require('child_process').exec,
	constants = {
		CBAT: 'com.barryels.ActivityTracker',
		DPS: 'device.PowerState',
		DSS: 'device.Screensaver',
		DLS: 'device.LidState',
		STARTED: 'STARTED',
		STOPPED: 'STOPPED',
		EXIT: 'EXIT',
	};

let previousActivityEntry = null;


function getFilePath(appName, windowTitle) {
	var filePath = '';

	if (appName === 'idea') {
		filePath = windowTitle.split(' - ')[0];
	}

	return filePath;
}


function getAppNameAndWindowTitleFromOS() {
	return new Promise((resolve, reject) => {
		exec(`osascript ${__dirname}/../client/osx/main.scpt`,
			(error, stdout) => {
				// console.log('<------------------');
				// console.log('error   ->', error);
				// console.log('stdout  ->', stdout);
				// console.log('------------------>');
				if (error !== null) {
					return reject(error);
				}
				let result = '';
				try {
					result = JSON.parse(stdout);
					result.appName = getAppNameFromAppPath(result.appPath);
				} catch (e) {
					console.error('Error trying to parse script response as JSON', 'error:', e, 'stdout:', stdout);
				}
				resolve(result);
			});
	});
}


function getAndLogAppNameAndWindowTitleFromOS() {
	getAppNameAndWindowTitleFromOS()
		.then((result) => {
			// console.log(JSON.stringify(result));
			logActivity({
				a: result.appName,
				w: result.windowTitle,
			});
		})
		.catch((error) => {
			console.error('Activity Tracker :: Logger -> Error:', error);
		});
}


function getAppNameAndWindowTitleFromOSContinually(interval) {
	getAndLogAppNameAndWindowTitleFromOS();
	setInterval(() => {
		getAndLogAppNameAndWindowTitleFromOS();
	}, interval);
}


function getAppNameFromAppPath(appPath) {
	const appPathParts = appPath.split(':');
	return appPathParts[appPathParts.length - 2].replace('.app', '');
}


function getLogFilename(type) {
	var now = new Date(),
		dateFormat = require('dateformat'),
		logFilename = dateFormat(now, 'yyyy-mm-dd');

	if (type === 'SUMMARY') {
		logFilename += '-summary';
	}

	logFilename += '.log';

	return logFilename;
}

let logCounterSinceLastStart = 0;

function logActivity(entry) {
	var now = new Date(),
		logFilename = getLogFilename();

	if (entry.a === 'Terminal') {
		entry.w = entry.w.split('%D1')[0];
	}

	let shouldLogActivity = true;

	if (!previousActivityEntry) {
		previousActivityEntry = entry;
	} else {
		if (previousActivityEntry.a === entry.a && previousActivityEntry.w === entry.w) {
			shouldLogActivity = false;
		}
	}

	previousActivityEntry = entry;

	if (shouldLogActivity) {
		// console.log('[activity]', entry.a, entry.w);
		entry.t = now.toISOString();
		var logStream = fs.createWriteStream(process.cwd() + '/data/' + logFilename, {
			'flags': 'a'
		});
		logCounterSinceLastStart += 1;
		process.stdout.write("Activity Tracker :: Logger -> " + logCounterSinceLastStart + " events tracked\r");
		logStream.end(JSON.stringify(entry) + endOfLine);
	}
}


router.use(function (req, res, next) {
	next();
});


router.get('/', function (req, res) {
	res.write('Activity Tracker server is running!');
	res.end();
});


router.post('/activity', function (req, res) {
	var entry = {
		a: '',
		w: '',
	};
	var projectName = '';
	var fileExtension = '';
	var fileMimeType = '';
	var shouldLogActivity = true;

	if (req.query.a) {
		entry.a = req.query.a;
	}

	if (req.query.w) {
		entry.w = req.query.w;
	}

	if (!previousActivityEntry) {
		previousActivityEntry = entry;
	} else {
		if (previousActivityEntry.a === entry.a && previousActivityEntry.w === entry.w) {
			shouldLogActivity = false;
		}
	}

	previousActivityEntry = entry;

	if (shouldLogActivity) {
		// console.log('[activity]', entry.a, entry.w);
		logActivity(entry);
	}

	res.end();
});


router.get('/command/shutdown', function (req, res) {
	process.exit();
});


app.use(express.json());
app.use(router);

process.stdin.resume();

function exitHandler(options, err) {
	if (err) {
		logActivity({
			a: constants.CBAT,
			w: 'error:' + JSON.stringify(err.stack)
		});
		doDelayedExit();
	} else {
		if (options.exit) {
			logActivity({
				a: constants.CBAT,
				w: constants.EXIT
			});

			doDelayedExit();
		} else {
			logActivity({
				a: constants.CBAT,
				w: constants.STOPPED
			});
		}
	}
}

function doDelayedExit() {
	setTimeout(function () {
		process.exit();
	}, 500);
}

// do something when app is closing
process.on('exit', exitHandler.bind(null, {
	exit: true
}));

// catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {
	exit: true
}));

// catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {
	exit: true
}));


const listener = app.listen(port, function () {
	console.log('Activity Tracker :: Logger -> listening on port ' + listener.address().port);
});


logActivity({
	a: constants.CBAT,
	w: constants.STARTED,
});

getAppNameAndWindowTitleFromOSContinually(CLIENT_CHECK_INTERVAL);
