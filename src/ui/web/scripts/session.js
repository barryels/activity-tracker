'use strict';

var sessionStartEvents = [
	{'a': 'C.B.AT', 'w': '1'},
	{'a': 'D.SS', 'w': '0'},
	{'a': 'D.PS', 'w': '1'}
];

var sessionEndEvents = [
	{'a': 'C.B.AT', 'w': '0'},
	{'a': 'D.SS', 'w': '1'},
	{'a': 'D.PS', 'w': '0'}
];

module.exports = function () {

	var fs = require('fs'),
		dataPath = process.cwd() + '/data';


	function getActivityFileContentsByDate(date) {
		var fileContents = '';

		fs.readFileSync(dataPath + '/' + date, 'utf8', function (err, contents) {
			fileContents = contents;
		});

		return fileContents;
	}


	function getActiveSessions(date) {
		var fileContents = getActivityFileContentsByDate(date);

		return fileContents;
	}


	function getInactiveSessions(date) {

	}


	return {
		getActiveSessions: getActiveSessions,
		getInactiveSessions: getInactiveSessions
	};

}();
