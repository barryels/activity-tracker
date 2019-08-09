'use strict';

const port = process.env.WEB_UI_PORT || 9998,
	path = require('path'),
	express = require('express'),
	app = express();

app.use(express.static(path.join(__dirname, 'public')));

const listener = app.listen(port, function () {
	console.log('Activity Tracker :: Web UI -> listening on port ' + listener.address().port);
});
