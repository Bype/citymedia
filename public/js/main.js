requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap',
		kinetic : 'lib/kinetic-v4.5.4.min',
		moment : "lib/moment.min",
		arbor : 'lib/arbor',
		arbor_tween : 'lib/arbor-tween',
		jqui : "lib/jquery-ui",
		zui : "lib/zui53"

	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

var step = 128;
var zui;

require(['jquery', 'underscore', 'moment', 'bootstrap', 'lib/jquery.qrcode.min', 'arbor', 'arbor_tween', 'jqui', 'zui'], function($, _, moment) {
	$(function() {
		require(['map', 'position'], function(m) {
			m.show(function() {
				
				zui = new ZUI53.Viewport('zui');
				pan_tool = new ZUI53.Tools.Pan(zui);
				pan_tool.attach();
				sur = new ZUI53.Surfaces.CSS(document.getElementById('container'));
				zui.addSurface(sur);
				$('#zui').dblclick(function(evt) {
					$('#container ').css({
						"-webkit-transition" : " all 1s ease-in-out"
					});
					zui.reset();
					setTimeout(function() {
						$('#container ').css({
							"-webkit-transition" : ""
						});
					}, 1000);
				});
				
				setInterval(function() {
					if (1 < zui.getPanAndScale()[2]) {
						$('.content').fadeIn();
					} else {
						$('.content').fadeOut();
					}
				}, 500);
			});
		});
	});
});
