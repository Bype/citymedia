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

require(['jquery', 'underscore', 'bootstrap'], function($, _) {
	$(function() {
		$(window).resize(function() {
			location.reload();
		});
		require(['triangle'], function(t) {
		});
	});
});
