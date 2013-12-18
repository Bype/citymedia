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

	moment.lang('fr', {
		months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
		monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
		weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
		weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
		weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
		longDateFormat : {
			LT : "HH:mm",
			L : "DD/MM/YYYY",
			LL : "D MMMM YYYY",
			LLL : "D MMMM YYYY LT",
			LLLL : "dddd D MMMM YYYY LT"
		},
		calendar : {
			sameDay : "[Aujourd'hui à] LT",
			nextDay : '[Demain à] LT',
			nextWeek : 'dddd [à] LT',
			lastDay : '[Hier à] LT',
			lastWeek : 'dddd [dernier à] LT',
			sameElse : 'L'
		},
		relativeTime : {
			future : "dans %s",
			past : "il y a %s",
			s : "quelques secondes",
			m : "une minute",
			mm : "%d minutes",
			h : "une heure",
			hh : "%d heures",
			d : "un jour",
			dd : "%d jours",
			M : "un mois",
			MM : "%d mois",
			y : "un an",
			yy : "%d ans"
		},
		ordinal : function(number) {
			return number + (number === 1 ? 'er' : '');
		},
		week : {
			dow : 1, // Monday is the first day of the week.
			doy : 4 // The week that contains Jan 4th is the first week of the year.
		}
	});

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
					$.addQRImg($elt, 'http://qi.bype.org/img/' + data.id + '?r=' + t);
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

			var vasaLayer = new google.maps.KmlLayer({
				url : 'http://www.perspective-s.org/Data/Sites/citymedia/kmz/FondationVasarely.kmz'
			});
			vasaLayer.setMap(map);
			var snLayer = new google.maps.KmlLayer({
				url : 'http://www.perspective-s.org/Data/Sites/citymedia/kmz/SecondeNature.kmz'
			});
			snLayer.setMap(map);

		}


		$('body').keypress(function(e) {
			if (e.charCode == 43) {
				zui.zoomBy(.1, $(window).width() / 2, $(window).height() / 2);
			}
			if (e.charCode == 45) {
				zui.zoomBy(-.1, $(window).width() / 2, $(window).height() / 2);
			}

		});

		initialize();
		/*
		 rAF = window.requestAnimationFrame;

		 function update(timestamp) {

		 $('.needupdate').trigger('updatestep', {
		 timestamp : timestamp
		 });
		 rAF(update);
		 }
		 */
		$.showMap = function(t, title, fn) {
			if (t) {
				fn();
				$('#liftbut').text(title);
				$('body').delay(200).animate({
					scrollTop : $("#liftbut").offset().top
				}, 1000, "swing");
			} else {
				$('#liftbut').text("^^^^^^^^^^^^^^^^^^^^");
				$('body').animate({
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

			zui.zoomSet(.5, ($(window).width() - step) / 2, ($(window).height() - step) / 2);

			window.addEventListener("beforeunload", function(event) {
				event.preventDefault();
			});

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
					setTimeout(function() {
						$('#container ').css({
							"-webkit-transition" : " all 1s ease-in-out"
						});
						zui.zoomSet(1.5, ($(window).width() - step) / 2, ($(window).height() - step) / 2);
						setTimeout(function() {
							$('.content').fadeIn(1000);
							zui.addLimits([1.5, 1.5]);
						}, 1000);
					}, 1500);
				});

				$('.sq').bind('mousedown mousemove mouseup', function(e) {
					$(zui.viewport).trigger(e);
				});

				$('.title').click(function(e) {
					$('#container ').css({
						"-webkit-transition" : " all .5s ease-in-out"
					});

					var pos = $(this).offset();
					zui.panBy(($(window).width() / 2) - (pos.left + step / 2), ($(window).height() / 2) - (pos.top + step / 2));
					setTimeout(function() {
						zui.zoomSet(2, ($(window).width() - step) / 2, ($(window).height() - step) / 2);
						setTimeout(function() {
							$('#container ').css({
								"-webkit-transition" : ""
							});
						}, 500);
					}, 500);
					e.preventDefault();
					return false;
				});

			});
		});
	});
});
