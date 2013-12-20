define(['content', 'lib/async'], function(c, async) {

	var nbcol = Math.floor($(document).width() / step);
	var nbrow = Math.floor($(document).height() / step);
	var leftOffset = -nbcol / 2;
	var topOffset = nbrow / 4;

	return {
		show : function(fn) {
			var $container = $('#container');
			var curPos = 0;

			$.get('/view/data', function(lst) {
				$container.attr('nbprj', lst.length);
				async.each(lst, function(prj, done) {

					var mappos = new google.maps.LatLng(prj.lat, prj.lon);
					marker = new google.maps.Marker({
						map : map,
						position : mappos,
						prjname : prj.prjname,
						icon : "/img/mapr.svg"
					});
					var $info = $(document.createElement('div'));
					$info.css({
						width : "320px",
						height : "240px"
					});
					$info.append(prj.prjtitle);
					var infowindow = new google.maps.InfoWindow({
						content : (prj.prjtitle.length < 16 ? "<div style='width:140px; height:18px;font-size:16px;text-align:center;vertical-align:middle;font-family: Dosis'>" + prj.prjtitle.toUpperCase() + "</h1></div>" : "<div style='width:140px; height:36px;font-size:16px;text-align:center;vertical-align:middle;color#111;font-family: Dosis'>" + prj.prjtitle + "</h1></div>")
					});
					infowindow.open(map, marker);

					var $prj = $(document.createElement('div'));
					$container.append($prj);
					$prj.attr('id', prj.prjname);
					$prj.addClass('prj');
					$prj.attr('curpos', curPos);

					$prj.css({
						left : (leftOffset + curPos * 6) * step,
						top : topOffset * step
					});

					google.maps.event.addListener(infowindow, 'closeclick', function(e) {
						throw "désolé, pas trouvé mieux pour l'instant";
						return false;
					});

					google.maps.event.addListener(marker, 'click', function(event) {
						var marker = this;

						$.showMap(false, "", function() {
							$('#container ').css({
								"-webkit-transition" : " all .5s ease-in-out"
							});
							var pos = $('#map' + marker.prjname).parent().offset();
							zui.panBy(($(window).width() / 2) - (pos.left + step / 2), ($(window).height() / 2) - (pos.top + step / 2));
							setTimeout(function() {
								zui.zoomSet(1.5, ($(window).width() - step) / 2, ($(window).height() - step) / 2);
								setTimeout(function() {
									$('#container ').css({
										"-webkit-transition" : ""
									});
								}, 500);
							}, 500);
						});
					});

					curPos++;
					var $tit = $(document.createElement('div'));
					$prj.append($tit);
					$tit.addClass('title');
					$tit.text(prj.prjtitle);

					$tit.css({
						left : 0,
						top : -1.2 * step
					});

					var $sub = $(document.createElement('div'));
					$prj.append($sub);
					$sub.addClass('subtitle');
					$sub.addClass('content');
					$sub.html('<p>' + prj.appsubtitle + '</p>');
					$sub.css({
						left : 0,
						top : -1 * step
					});

					var $elt = $(document.createElement('div'));
					$elt.addClass('sq');
					$elt.addClass("c0");
					$prj.append($elt);

					for (var i = 0; i < 3; i++) {
						$elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass("c0");
						$prj.append($elt);
						$.spiral(i, $elt);
					}

					var $elt = $(document.createElement('div'));
					var $mapico = $(document.createElement('img'));
					$elt.addClass('sq');
					$elt.addClass('c0');
					$elt.append($mapico);
					$prj.append($elt);
					$.spiral(3, $elt);
					$elt.attr('id', 'map' + prj.prjname);
					$mapico.addClass('ico');
					$mapico.addClass('mapico');
					$mapico.attr("src", 'img/map.svg');

					$mapico.click(function() {
						$.showMap(true, prj.prjtitle, function() {
							map.setCenter(mappos);
						});

					});
					/*
					 var $elt = $(document.createElement('div'));
					 $elt.addClass('circle');
					 $prj.append($elt);
					 */
					c.render($prj, 4, prj.modules, 0, function(spi) {
						if (isNaN(spi)) {
							$prj.attr('radius', 1);
							$prj.attr('spi', 3);
						} else {
							var radius = Math.floor((Math.sqrt(spi + 4) - 1) / 2) + 1;
							$prj.attr('radius', radius);
							$prj.attr('spi', spi);
						}
						done();
					});

				}, function(err) {
					fn();
				});

			});
		}
	};
});
