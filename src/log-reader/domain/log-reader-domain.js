'use strict';

/*
var fileExtensionMimeTypes = require('./file-extension-mime-types'),
	programmingLanguages = require('./programming-languages');
*/

/*
projectName = getProjectName(entry.a, entry.w);
if (projectName) {
	entry.p = projectName;
}

fileExtension = getFileExtension(getFilePath(entry.a, entry.w));
if (fileExtension) {
	entry.fe = fileExtension;
}
*/


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


function generateSummaryForDate(date) {
	var logFilename = getLogFilename('SUMMARY');

	if (!date) {
		return null;
	}

	var summaryData = getSummaryForDate(date);

	var logStream = fs.createWriteStream(process.cwd() + '/data/' + logFilename, { 'flags': 'w' });
	logStream.end(JSON.stringify(summaryData) + endOfLine);
}


/*

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
*/


function getSomething() {
	return 5;
}


module.exports = {
	getSomething: getSomething,
};
