'use strict';

var port = process.env.PORT || 9999,
	fs = require('fs'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	endOfLine = require('os').EOL,
	router = express.Router(),
	previousActivityEntry = null,
	constants = {
		CBAT: 'com.barryels.ActivityTracker',
		DPS: 'device.PowerState',
		DSS: 'device.Screensaver',
		DLS: 'device.LidState',
		STARTED: 'STARTED',
		STOPPED: 'STOPPED',
		EXIT: 'EXIT',
	};


function getFilePath(appName, windowTitle) {
	var filePath = '';

	if (appName === 'idea') {
		filePath = windowTitle.split(' - ')[0];
	}

	return filePath;
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


function logActivity(data) {
	var now = new Date(),
		logFilename = getLogFilename();

	if (data.a === 'Terminal') {
		data.w = data.w.split('%D1')[0];
	}

	data.t = now.getTime();
	var logStream = fs.createWriteStream(process.cwd() + '/data/' + logFilename, { 'flags': 'a' });
	logStream.end(JSON.stringify(data) + endOfLine);
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
	var doLogActivity = true;

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
			doLogActivity = false;
		}
	}

	previousActivityEntry = entry;

	if (doLogActivity) {
		// console.log('[activity]', entry.a, entry.w);
		logActivity(entry);
	}

	res.end();
});


router.get('/command/shutdown', function (req, res) {
	process.exit();
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

process.stdin.resume();

function exitHandler(options, err) {

	if (err) {
		// console.log('err', err.stack);
		logActivity({
			a: constants.CBAT,
			w: 'error:' + JSON.stringify(err.stack)
		});

		setTimeout(function (context) {
			process.exit();
		}, 500, this);
	} else {
		if (options.exit) {
			logActivity({
				a: constants.CBAT,
				w: constants.EXIT
			});

			setTimeout(function (context) {
				process.exit();
			}, 500, this);
		} else {
			logActivity({
				a: constants.CBAT,
				w: constants.STOPPED
			});
		}
	}
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { exit: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));


app.listen(port);


logActivity({
	a: constants.CBAT,
	w: constants.STARTED,
});
