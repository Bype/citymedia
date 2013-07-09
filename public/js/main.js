requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap',
		kinetic : 'lib/kinetic-v4.5.4.min'
	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

require(['jquery', 'underscore', 'bootstrap'], function($, _) {
	$(function() {
		$(window).resize(function() {
			location.reload();
		});
		require(['triangle'], function() {
		});
	});
});
