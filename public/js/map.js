define(['content'], function(c) {

	var nbcol = Math.floor($(document).width() / step);
	var nbrow = Math.floor($(document).height() / step);
	var leftOffset = nbcol / 2;
	var topOffset = nbrow / 2;

	function setPos($elt, pos) {
		$elt.css({
			left : pos[0] * step,
			top : pos[1] * step,
		});
		console.log($elt.parent().attr('id'));
		$elt.attr('id', $elt.parent().attr('id') + 'x' + pos[0] + 'y' + pos[1]);
	}

	return {
		show : function(fn) {
			var $container = $('#container');
			var curPos = 0;
			var prjPos = [[-4, -4], [4, -2], [3, 4], [-3, 3], [-8, 4], [-8, -8], [10, -8]];
			var firstCircle = [[-1, -1], [0, -1], [1, -1], [2, -1], [2, 1], [2, 2], [1, 2], [0, 2], [-1, 2], [-1, 1]];

			var a = [];
			a.push('x0y0');
			a.push('x0y-1');
			a.push('x1y-1');
			a.push('x1y0');
			var curX = 1, curY = 0;
			function nextPos() {
				var ret = [curX, curY];
				a.push('x' + curX + 'y' + curY);
				if (0 <= curX) {
					if (0 <= curY) {
						// first quandrant
						if (0 <= _.indexOf(a, 'x' + curX + 'y' + curY + 1)) {
							curX++;
						} else {
							curY++;
						}
					} else {
						// second quandrant
						if (0 <= _.indexOf(a, 'x' + curX - 1 + 'y' + curY)) {
							curY++;
						} else {
							curX--;
						}
					}
				} else {
					if (0 <= curY) {
						// fourth quadrant
						if (0 <= _.indexOf(a, 'x' + curX + 1 + 'y' + curY)) {
							curY--;
						} else {
							curX++;
						}
					} else {
						// third quadrant
						if (0 <= _.indexOf(a, 'x' + curX + 'y' + curY - 1)) {
							curX--;
						} else {
							curY--;
						}
					}
				}
				return ret;
			}


			$.get('/view/data', function(lst) {
				_.each(lst, function(prj, idx) {
					var $prj = $(document.createElement('div'));
					$container.append($prj);

					$prj.attr('id', prj.prjname);
					$prj.addClass('prj');
					$prj.css({
						left : (leftOffset + prjPos[curPos][0]) * step,
						top : (topOffset + prjPos[curPos][1]) * step
					});
					var $tit = $(document.createElement('div'));
					$prj.append($tit);
					$tit.addClass('title');
					$tit.text(prj.prjtitle);
					setPos($tit, [0, -.2]);
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
					setPos($sub, [0, 0]);

					for (var i = 0; i < 4; i++) {
						var $elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass("c0");
						$prj.append($elt);
						setPos($elt, [i % 2, (Math.floor(i / 2))]);
					}
					var space = Math.floor(10 / prj.modules.length);
					var posidx = Math.floor(10 * Math.random());
					_.each(prj.modules, function(pos, idx) {
						var $elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass(pos.type);
						$elt.attr('info', pos.info);
						$prj.append($elt);
						setPos($elt, nextPos());

					});
					curPos++;
				});
				c.render(fn);
			});
		}
	};
});
