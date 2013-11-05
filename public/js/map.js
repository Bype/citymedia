define(['content', 'lib/async'], function(c, async) {

	var nbcol = Math.floor($(document).width() / step);
	var nbrow = Math.floor($(document).height() / step);
	var leftOffset = nbcol / 2;
	var topOffset = nbrow / 2;

	return {
		show : function(fn) {
			var $container = $('#container');
			var curPos = 0;
			var prjPos = [[-8, -8], [8, -4], [6, 8], [-6, 6], [-16, 8], [-16, -16], [20, -16]];

			$.get('/view/data', function(lst) {
				async.each(lst, function(prj, done) {

					var mappos = new google.maps.LatLng(prj.lat, prj.lon);
					marker = new google.maps.Marker({
						map : map,
						position : mappos
					});

					var $prj = $(document.createElement('div'));
					$container.append($prj);
					$prj.attr('id', prj.prjname);
					$prj.addClass('prj');
					$prj.css({
						left : (leftOffset + prjPos[curPos][0]) * step,
						top : (topOffset + prjPos[curPos][1]) * step
					});

					google.maps.event.addListener(marker, 'click', function() {
						$.showMap(false, function() {
							$('#container ').css({
								"-webkit-transition" : " all 1.5s ease-in-out"
							});
							zui.reset();
							setTimeout(function() {
								$('#container ').css({
									"-webkit-transition" : ""
								});
							}, 1500);
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
					$tit.click(function(evt) {
						$('#container ').css({
							"-webkit-transition" : " all 1.5s ease-in-out"
						});
						if (1 <= zui.getPanAndScale()[2]) {

							zui.panBy(Math.floor($(document).width() / 3) - (step + $(this).parent().offset().left / 2), Math.floor($(document).height() / 3) - (step + $(this).parent().offset().top / 2));
							zui.zoomSet(2, $(this).parent().offset().left, $(this).parent().offset().top);
						} else {
							zui.reset();
						}
						setTimeout(function() {
							$('#container ').css({
								"-webkit-transition" : ""
							});
						}, 1500);
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
					$mapico.addClass('ico');
					$mapico.addClass('mapico');
					
					$mapico.attr("src", 'img/map.svg');
					

					$mapico.click(function() {
						$.showMap(true, function() {
							map.setCenter(mappos);
						});

					});

					c.render($prj, 4, prj.modules, 0, done);

				}, function(err) {
					fn();
				});

			});
		}
	};
});
