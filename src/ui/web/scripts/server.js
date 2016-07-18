'use strict';

var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	webRoot = '/src/ui/web',
	port = 9998,
	HTML_RESPONSE_CODES = {
		_200: 200,
		_404: 404,
		_500: 500
	};

http.createServer(function (request, response) {
	console.log('request... ', request.url);

	request.url = webRoot + request.url;

	var filePath = '.' + request.url;

	if (filePath === '.' + webRoot + '/') {
		filePath = filePath + 'index.html';
	}

	console.log('filePath:', filePath);

	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.wav':
			contentType = 'audio/wav';
			break;
	}

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code === 'ENOENT') {
				fs.readFile('./404.html', function (error, content) {
					response.writeHead(HTML_RESPONSE_CODES._200, {'Content-Type': contentType});
					response.end(content, 'utf-8');
				});
			}
			else {
				response.writeHead(HTML_RESPONSE_CODES._500);
				response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
				response.end();
			}
		}
		else {
			response.writeHead(HTML_RESPONSE_CODES._200, {'Content-Type': contentType});
			response.end(content, 'utf-8');
		}
	});

}).listen(port);
console.log('Server running at http://127.0.0.1:' + port + '/');
