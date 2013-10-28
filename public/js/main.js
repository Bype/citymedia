requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap',
		kinetic : 'lib/kinetic-v4.5.4.min',
		moment : "lib/moment.min",
		arbor : 'lib/arbor',
		arbor_tween : 'lib/arbor-tween',
		jqui : "lib/jquery-ui",
		zui : "lib/zui53",
		fancybox : "lib/jquery.fancybox",
		"fancybox-media" : "lib/helpers/jquery.fancybox-media"

	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

var step = 128;
var zui;

require(['jquery', 'underscore', 'moment', 'bootstrap', 'lib/jquery.qrcode.min', 'arbor', 'arbor_tween', 'jqui', 'zui', 'fancybox'], function($, _, moment) {
	$(function() {

		function initialize() {
			var mapOptions = {
				zoom : 14,
				center : new google.maps.LatLng(43.5296189,5.4438398),
				mapTypeId : google.maps.MapTypeId.TERRAIN
			};

			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}

		initialize();

		require(['map', 'position'], function(m) {
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
			m.show(function() {
				$('.sq').bind('mousedown mousemove mouseup', function(e) {
					$(zui.viewport).trigger(e);
					return true;
				});
			});
		});
	});
});
