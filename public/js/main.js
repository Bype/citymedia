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
		videoBG : "lib/jquery.videoBG",
		socket : '/socket.io/socket.io'

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

require(['jquery', 'underscore', 'moment', 'bootstrap', 'lib/jquery.qrcode.min', 'arbor', 'arbor_tween', 'jqui', 'zui', 'fancybox', 'socket'], function($, _, moment) {
	$(function() {

		var socket = io.connect("ws://qi.bype.org");
		socket.on('imgid', function(data) {
			console.log(data);
			if (data.tag) {
				var $elt = $('#imgup_' + data.tag.slice(1));
				if ($elt) {
					var t = new Date().getTime();
					$.addQRImg($elt, 'http://qi.bype.org/img/' + data.id + '?r=' + t, parseInt($elt.attr('radius')) + 1);
				}
			}
		});

		function initialize() {
			var mapOptions = {
				zoom : 18,
				center : new google.maps.LatLng(43.5296189, 5.4438398),
				mapTypeId : google.maps.MapTypeId.SATELLITE
			};

			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}

		initialize();

		rAF = window.requestAnimationFrame;

		function update(timestamp) {

			$('.needupdate').trigger('updatestep', {
				timestamp : timestamp
			});
			rAF(update);
		}

		rAF(update);

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
