'use strict';

var port = process.env.PORT || 9999,
	fs = require('fs'),
	express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	endOfLine = require('os').EOL,
	router = express.Router();

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
		dateFormat = require('dateformat');

	var data = req.query;
	data.a = unescape(data.a);
	data.w = unescape(data.w);
	data.p = '[PROJECT NAME WILL GO HERE]';
	data.t = now.getTime();

	var logStream = fs.createWriteStream(process.cwd() + '/src/data/'+ dateFormat(now, 'yyyy-mm-dd') +'.txt', {'flags': 'a'});
	logStream.end(JSON.stringify(data) + endOfLine);

	res.json(response);
	res.end();
});


router.get('/command/shutdown', function (req, res) {
	process.exit();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

app.listen(port);
