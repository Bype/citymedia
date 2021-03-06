define(['content', 'lib/async'], function(c, async) {

	var nbcol = Math.floor($(document).width() / step);
	var nbrow = Math.floor($(document).height() / step);
	var leftOffset = 0;
	var topOffset = 0;

	return {
		show : function(fn) {
			var $container = $('#container');
			var curPos = 0;

			$.get('/view/data', function(lst) {
				$container.attr('nbprj', lst.length);
				async.each(lst, function(prj, done) {
					var isMAPPOS = (prj.lat != "") && (prj.lon != "");
					if (isMAPPOS) {
						var mappos = new google.maps.LatLng(prj.lat, prj.lon);
						marker = new google.maps.Marker({
							map : map,
							position : mappos,
							prjname : prj.prjname,
							icon : "/img/mapr.svg"
						});
					}
					var $info = $(document.createElement('div'));
					$info.css({
						width : "320px",
						height : "240px"
					});
					$info.append(prj.prjtitle);
					if (isMAPPOS) {
						var infowindow = new google.maps.InfoWindow({
							content : "<div style='width:134px; height:180px;font-size:16px;text-align:center;vertical-align:middle;font-family: Dosis;overflow:hidden'>" 
							+ prj.prjtitle.toUpperCase() + "</h1><img width='128px' height='128px' src='http://qi.bype.org/img/"+prj.prjname+"'/></div>"
						});
						infowindow.open(map, marker);
					}
					var $prj = $(document.createElement('div'));
					$prj.hide();
					$container.append($prj);
					$prj.attr('id', prj.prjname);
					$prj.addClass('prj');
					$prj.addClass('t_' + prj.type);
					$prj.attr('curpos', curPos);

					$prj.css({
						left : (leftOffset + curPos * 6) * step,
						top : topOffset * step
					});
					if (isMAPPOS) {
						google.maps.event.addListener(infowindow, 'closeclick', function(e) {
							throw "désolé, pas trouvé mieux pour l'instant";
							return false;
						});

						google.maps.event.addListener(marker, 'click', function(event) {
							var marker = this;
							$(".content").hide();
							$.showMap(false, "", function() {
								var aTop = parseInt($('#' + marker.prjname).css('top'));
								var aLeft = parseInt($('#' + marker.prjname).css('left'));
								$('#container').animate({
									left : -step - aLeft,
									top : -step - aTop
								}, 1000, "easeInOutQuad", function() {
									$(".content").fadeIn();
								});
							});
						});
					}

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
					$elt.css({
						top : 0,
						left : 0
					});
					$prj.append($elt);

					for (var i = 0; i < 3; i++) {
						$elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass("c0");
						$prj.append($elt);
						$.spiral(i, $elt);
					}
					if (isMAPPOS) {
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
					}
					c.render($prj, ( isMAPPOS ? 4 : 3), prj.modules, 0, function(spi) {
						var radius = 2;
						if (isNaN(spi)) {
							$prj.attr('radius', 2);
							$prj.attr('spi', 3);
						} else {
							radius = Math.floor(Math.sqrt(spi / 2));
							if (radius < 2)
								radius = 2;
							$prj.attr('radius', radius);
							$prj.attr('spi', spi);
						}
						$prj.css({
							width : 2 * (radius + 1) * step,
							height : 2 * (radius + 1) * step
						});
						$prj.children().each(function(idx, elt) {
							$(elt).css({
								top : parseInt($(elt).css('top')) + (radius + 1) * step,
								left : parseInt($(elt).css('left')) + (radius) * step
							});
						});
						$prj.show();
						done();
					});

				}, function(err) {
					fn();
				});

			});
		}
	};
});
