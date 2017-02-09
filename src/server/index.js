'use strict';

var port = process.env.PORT || 9999,
	fs = require('fs'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	endOfLine = require('os').EOL,
	router = express.Router(),
	fileExtensionMimeTypes = require('./file-extension-mime-types'),
	programmingLanguages = require('./programming-languages'),
	previousActivityEntry = null;


var STRING_MAPPINGS = [
	{ 'C.B.AT': 'com.barryels.ActivityTracker' },
	{ 'D.PS': 'device.PowerState' },
	{ 'D.SS': 'device.Screensaver' }
];


function getProjectName(appName, windowTitle) {
	// TODO add cleverness here, farm out processing to application-specific adapters, so new ones can be added later

	if (appName === 'Google Chrome') {
		return '';
	}

	return '';
}


function getFileExtension(fileName) {
	if (fileName.indexOf('.') > -1) {
		return fileName.substr(fileName.lastIndexOf('.'), fileName.length);
	}

	return '';
}


function getFilePath(appName, windowTitle) {
	var filePath = '';

	if (appName === 'idea') {
		filePath = windowTitle.split(' - ')[0];
	}

	return filePath;
}


function getFileMimeType(fileExtension) {
	return fileExtensionMimeTypes.getMimeTypeFromFileExtension(fileExtension);
}


function getFileProgrammingLanguage(fileExtension) {
	return programmingLanguages.getProgrammingLanguageFromFileExtension(fileExtension);
}


function getSummaryForDate(date) {
	if (!date) {
		return null;
	}

	return 'Summary';
}


function getLogFilename(type) {
	var now = new Date(),
		dateFormat = require('dateformat'),
		logFilename = dateFormat(now, 'yyyy-mm-dd');

	if (type === 'SUMMARY') {
		logFilename += '-summary';
	}

	logFilename += '.txt';

	return logFilename;
}


function generateSummaryForDate(date) {
	var logFilename = getLogFilename('SUMMARY');

	if (!date) {
		return null;
	}

	var summaryData = getSummaryForDate(date);

	var logStream = fs.createWriteStream(process.cwd() + '/src/data/' + logFilename, { 'flags': 'w' });
	logStream.end(JSON.stringify(summaryData) + endOfLine);
}


function logActivity(data) {
	var now = new Date(),
		logFilename = getLogFilename();

	if (data.a === 'Terminal') {
		data.w = data.w.split('%D1')[0];
	}

	data.t = now.getTime();
	var logStream = fs.createWriteStream(process.cwd() + '/src/data/' + logFilename, { 'flags': 'a' });
	logStream.end(JSON.stringify(data) + endOfLine);
}


router.use(function (req, res, next) {
	next();
});


router.get('/', function (req, res) {
	res.write('Activity Tracker server is running!');
	res.end();
});


router.get('/session/:date', function (req, res) {
	var userActivitySessions = require('./user-activity-sessions'),
		response = {},
		date = '',
		userActiveSessions = [],
		userInactiveSessions = [];

	res.setHeader('Content-Type', 'application/json');

	if (!req.params.date) {
		response.error = 'No date supplied';
		res.write(JSON.stringify(response));
		res.end();
		return;
	}

	date = req.params.date;
	if (date.split('-').length !== 3) {
		response.error = 'Incorrect date format supplied';
		res.write(JSON.stringify(response));
		res.end();
		return;
	}

	generateSummaryForDate(date);

	userActivitySessions.getActiveSessions(date, function (contents) {
		console.log(date);
		response.userActiveSessions = String(contents);
		res.write(JSON.stringify(response));
		res.end();
	});

	// response.userActiveSessions = String(userActiveSessions);

	// userInactiveSessions = userActivitySessions.getInactiveSessions(date);
	// response.userInactiveSessions = userInactiveSessions;

	// res.write(JSON.stringify(response));
	// res.end();
});


function linux_xprop_DataAdapter(data) {
	return {
		a: 'App',
		w: 'Window Title'
	};
}


router.post('/activity', function (req, res) {
	var entry = {},
		projectName = '',
		fileExtension = '',
		fileMimeType = '',
		doLogActivity = true;

	if (req.query.a) {
		entry.a = req.query.a;
	}

	if (req.query.w) {
		entry.w = req.query.w;
	}

	/*
	if (req.query.os === 'linux' && req.query.tool === 'xprop') {
		data = linux_xprop_DataAdapter(req.query.data);
	} else {
		data = req.query.data;
	}

	entry.a = data.a;
	entry.w = data.w;

	projectName = getProjectName(entry.a, entry.w);
	if (projectName) {
		entry.p = projectName;
	}

	fileExtension = getFileExtension(getFilePath(entry.a, entry.w));
	if (fileExtension) {
		entry.fe = fileExtension;
	}
	*/

	if (!previousActivityEntry) {
		previousActivityEntry = entry;
	} else {
		if (previousActivityEntry.a === entry.a && previousActivityEntry.w === entry.w) {
			doLogActivity = false;
		}
	}

	if (doLogActivity) {
		console.log('[activity]', entry.a, entry.w);
		logActivity(entry);
	}

	previousActivityEntry = entry;

	// res.end(JSON.stringify(req.query, '', 2));
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
		console.log('err');
		console.log(err.stack);
		logActivity({
			a: 'C.B.AT',
			w: 'error:' + JSON.stringify(err.stack)
		});

		setTimeout(function (context) {
			process.exit();
		}, 500, this);
	} else {

		if (options.exit) {
			logActivity({
				a: 'C.B.AT',
				w: '0'
			});

			setTimeout(function (context) {
				process.exit();
			}, 500, this);
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
	a: 'C.B.AT',
	w: '1'
});
