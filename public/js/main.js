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
		"fancybox-media" : "lib/helpers/jquery.fancybox-media",
		videoBG : "lib/jquery.videoBG"

	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

var step = 128;
var zui;
var map;

require(['jquery', 'underscore', 'moment', 'bootstrap', 'lib/jquery.qrcode.min', 'arbor', 'arbor_tween', 'jqui', 'zui', 'fancybox', 'videoBG'], function($, _, moment) {
	$(function() {

		function initialize() {
			var mapOptions = {
				zoom : 18,
				center : new google.maps.LatLng(43.5296189, 5.4438398),
				mapTypeId : google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}

		initialize();
		$.movingBy = function(dx, dy) {
		};

		var aDX = 0, aDY = 0, aScale = 1;
		var applyParallax = function() {
			$('#bg1').transform({
				matrix : [aScale, 0.0, 0.0, aScale, aDX / 2, aDY / 2]
			});
			$('#bg2').transform({
				matrix : [aScale, 0.0, 0.0, aScale, aDX, aDY]
			});
		};
		$.movingBy = function(dx, dy) {
			aDX -= dx;
			aDY -= dy;
			applyParallax();
		};
		$.scaleBy = function(scale) {
			//aScale = scale;
			applyParallax();
		};
		for (var i = 0; i < 400; i++) {
			var $div = $(document.createElement('div'));
			$div.addClass('triangle1');
			$div.css({
				left : 100 * Math.floor(Math.random() * 100) - 4000,
				top : 100 * Math.floor(Math.random() * 100) - 4000,
				'-webkit-transform' : 'rotate(' + Math.floor(Math.random() * 90) + 'deg)'
			});
			$('#bg1').append($div);
		}

		for (var i = 0; i < 600; i++) {
			var $div = $(document.createElement('div'));
			$div.addClass('triangle2');
			$div.css({
				left : 100 * Math.floor(Math.random() * 100) - 4000,
				top : 100 * Math.floor(Math.random() * 100) - 4000,
				'-webkit-transform' : 'rotate(' + Math.floor(Math.random() * 90) + 'deg)'
			});
			$('#bg2').append($div);
		}

		$.showMap = function(t, fn) {
			if (t) {
				fn();
				$('html, body').delay(200).animate({
					scrollTop : $("#liftbut").offset().top
				}, 1000, "swing");
			} else {
				$('html, body').animate({
					scrollTop : 0
				}, 1000, "swing", fn);
			}
		};
		require(['map', 'position'], function(m) {
			zui = new ZUI53.Viewport('zui');
			pan_tool = new ZUI53.Tools.Pan(zui);
			pan_tool.attach();
			sur = new ZUI53.Surfaces.CSS(document.getElementById('container'));
			zui.addSurface(sur);
			zui.zoomSet(.8, $(document).width() / 2, $(document).height() / 2);
			$('#zui').dblclick(function(evt) {
				$('#container ').css({
					"-webkit-transition" : " all 1s ease-in-out"
				});
				zui.zoomSet(.5, $(document).width() / 2, $(document).height() / 2);
				setTimeout(function() {
					$('#container ').css({
						"-webkit-transition" : ""
					});
				}, 1000);
			});
			setInterval(function() {
				if (1 < zui.getPanAndScale()[2]) {
					if (!$('body').hasClass('panning')) {
						$('.content').fadeIn();
					}
					//		$('.ico').fadeOut();
				} else {
					$('.content').fadeOut();
					//		$('.ico').fadeIn();
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
