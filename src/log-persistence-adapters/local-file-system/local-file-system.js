'use strict';


var port = process.env.PORT || 9001,
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	router = express.Router();


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


/**
 *
 * @param {Object} activityData
 * @param {string} activityData.a - The active application path
 * @param {string} activityData.w - The active window title
 * @param {string} activityData.t - The time when the activity occured
 */
function storeActivity(activityData) {
	var now = new Date(),
		logFilename = getLogFilename();

	var logStream = fs.createWriteStream(process.cwd() + '/data/' + logFilename, { 'flags': 'a' });
	logStream.end(JSON.stringify(activityData) + endOfLine);
}


/**
 * @returns {string}
 */
function getLogFilename() {
	var now = new Date(),
		dateFormat = require('dateformat'),
		logFilename = dateFormat(now, 'yyyy-mm-dd');

	logFilename += '.log';

	return logFilename;
}
