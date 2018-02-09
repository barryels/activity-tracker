'use strict';


var httpInputInterface = require('./http-input-interface/http-input-interface');
var domain = require('./domain/log-reader-domain');


function init() {
	httpInputInterface
		.init(domain);
}


init();
