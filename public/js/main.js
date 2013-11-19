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

		var curBG = 0;

		setInterval(function() {
			$('#bg').fadeOut(5000, function() {
				$('#bg').css({
					"background-image" : "url('/img/bg/" + curBG + ".jpg')"
				});
				$('#bg').fadeIn(5000);
			});
			curBG = (curBG + 1) % 6;
		}, 30000);
		

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

			setInterval(function() {
				if (.7 < zui.getPanAndScale()[2]) {
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

				var nbcol = Math.floor($(document).width() / step);
				var nbrow = Math.floor($(document).height() / step);
				var leftOffset = -nbcol / 2;
				var topOffset = nbrow / 4;
				var sign = -1;
				$('.prj').each(function(idx, prj) {
					var $prj = $(prj);
					var radius = parseInt($prj.attr('radius')) + 1;
					leftOffset += radius;
					sign *= -1;
					$prj.animate({
						left : leftOffset * step,
						top : (topOffset + radius * sign) * step
					});

				});

				$('.sq').bind('mousedown mousemove mouseup', function(e) {
					$(zui.viewport).trigger(e);
					return true;
				});
			});
		});
	});
});
