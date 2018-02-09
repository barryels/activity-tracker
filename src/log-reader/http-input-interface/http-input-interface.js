'use strict';


var port = process.env.PORT || 9001;
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var endOfLine = require('os').EOL;
var router = express.Router();


/**
 * Starts the HTTP server
 * @param {Object} config
 * @param {number} config.port
 */
function start(config) {

}


/**
 * Starts the HTTP server
 * @param {Object} domain
 * @param {function} domain.getSomething
 */
function init(domain) {
	console.log(domain.getSomething());
}


module.exports = {
	init: init,
};
