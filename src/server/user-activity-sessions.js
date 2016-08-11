'use strict';

var userActivitySessionStartEvents = [
	{'a': 'C.B.AT', 'w': '1'},
	{'a': 'D.SS', 'w': '0'},
	{'a': 'D.PS', 'w': '1'}
];

var userActivitySessionEndEvents = [
	{'a': 'C.B.AT', 'w': '0'},
	{'a': 'D.SS', 'w': '1'},
	{'a': 'D.PS', 'w': '0'}
];

module.exports = function () {

	var fs = require('fs'),
		dataPath = process.cwd() + '/src/data';


	function getActivityFileContentsByDate(date, callback) {
		fs.readFile(dataPath + '/' + date + '.txt', 'utf8', function (err, contents) {
			callback(contents);
		});
	}


	function getUserActiveSessions(date, callback) {
		return getActivityFileContentsByDate(date, callback);
	}


	function getUserInactiveSessions(date, callback) {
		return getActivityFileContentsByDate(date, callback);
	}


	return {
		getActiveSessions: getUserActiveSessions,
		getInactiveSessions: getUserInactiveSessions
	};

}();
