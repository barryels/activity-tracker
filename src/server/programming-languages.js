'use strict';

var list = {
	CSS: {
		ext: ['.css']
	},
	HTML: {
		ext: ['.html']
	},
	JavaScript: {
		ext: ['.js']
	},
	Java: {
		ext: ['.java', '.class', '.jar']
	},
	JSON: {
		ext: ['.java', '.class', '.jar']
	}
};

module.exports = function () {

	function getProgrammingLanguageFromFileExtension(fileExtension) {
		var programmingLanguageKey,
			programmingLanguage;

		fileExtension = fileExtension.toLowerCase();

		if (fileExtension.indexOf('.') === 0) {
			for (programmingLanguageKey in list) {
				programmingLanguage = list[programmingLanguageKey];
				if (programmingLanguage.ext.indexOf(fileExtension) > -1) {
					return programmingLanguageKey;
				}
			}
		}

		return '';
	}

	return {
		getProgrammingLanguageFromFileExtension: getProgrammingLanguageFromFileExtension
	};
}();
