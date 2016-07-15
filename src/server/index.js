'use strict';

var port = process.env.PORT || 9999,
	fs = require('fs'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	endOfLine = require('os').EOL,
	router = express.Router();


function getProjectName(appName, windowTitle) {
	// TODO add cleverness here, farm out processing to application-specific adapters, so new ones can be added later

	if (appName === "Google Chrome") {
		return "Internetting";
	}

	return "";
}


function getFileType(appName, windowTitle) {
	if (windowTitle.indexOf('.js') > -1) {
		return ".js";
	}

	return "";
}


router.use(function (req, res, next) {
	next();
});


router.get('/', function (req, res) {
	res.write('Activity Tracker server is running!');
	res.end();
});


router.post('/activity', function (req, res) {
	var response = {},
		now = new Date(),
		dateFormat = require('dateformat'),
		projectName = "",
		fileType = "";

	var data = req.query;
	response.a = data.a;
	response.w = data.w;
	response.t = now.getTime();

	projectName = getProjectName(response.a, response.w);
	if (projectName) {
		response.p = projectName;
	}

	fileType = getFileType(response.a, response.w);
	if (fileType) {
		response.f = fileType;
	}

	var logStream = fs.createWriteStream(process.cwd() + '/src/data/' + dateFormat(now, 'yyyy-mm-dd') + '.txt', {'flags': 'a'});
	logStream.end(JSON.stringify(response) + endOfLine);

	res.end();
});


router.get('/command/shutdown', function (req, res) {
	process.exit();
});


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

app.listen(port);
