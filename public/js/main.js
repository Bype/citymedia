requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap',
		kinetic : 'lib/kinetic-v4.5.4.min',
		moment : "lib/moment.min",
		arbor : 'lib/arbor',
		arbor_tween : 'lib/arbor-tween',
		jqui : "lib/jquery-ui"

	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});
require(['jquery', 'underscore', 'moment', 'bootstrap', 'lib/jquery.qrcode.min', 'arbor', 'arbor_tween', 'jqui'], function($, _, moment) {
	$(function() {
		$(window).resize(function() {
			location.reload();
		});
		$('#container').draggable();
		require(['map'], function(m) {
			m.show();
		});
	});
});
