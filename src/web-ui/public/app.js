'use strict';


var App = function (m) {
	function oninit() {
		console.log('oninit()');
	}

	function view() {
		return m('ul',
			[
				m('li', 'Something 1'),
				m('li', 'Something 2'),
			]
		);
	}

	return {
		view: view,
	};
};


m.mount(document.getElementById('app'), App(window.m));
