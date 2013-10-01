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
	}

	return {
		show : function(fn) {
			var $container = $('#container');
			var curPos = 0;
			var prjPos = [[-4, -4], [4, -2], [3, 4], [-3, 3], [-8, 4], [-8, -8], [10, -8]];
			var firstCircle = [[-1, -1], [0, -1], [1, -1], [2, -1], [2, 1], [2, 2], [1, 2], [0, 2], [-1, 2], [-1, 1]];
			$.get('/view/data', function(lst) {
				_.each(lst, function(prj, idx) {
					var $prj = $(document.createElement('div'));

					$prj.attr('id', prj.prjname);
					$prj.addClass('prj');
					$prj.css({
						left : (leftOffset + prjPos[curPos][0]) * step,
						top : (topOffset + prjPos[curPos][1]) * step
					});
					var $tit = $(document.createElement('div'));

					$tit.addClass('title');
					$tit.text(prj.prjtitle);
					setPos($tit, [0, -.2]);
					$tit.click(function(evt) {
						$('#container ').css({
							"-webkit-transition" : " all 1.5s ease-in-out"
						});
						if (1 <= zui.getPanAndScale()[2]) {

							zui.panBy(Math.floor($(document).width() / 6) - (step + $(this).parent().offset().left / 3), Math.floor($(document).height() / 6) - (step + $(this).parent().offset().top / 3));
							zui.zoomSet(3, $(this).parent().offset().left, $(this).parent().offset().top);
						} else {
							zui.reset();
						}
						setTimeout(function() {
							$('#container ').css({
								"-webkit-transition" : ""
							});
						}, 1500);
					});

					$container.append($prj);
					$prj.append($tit);
					var $sub = $(document.createElement('div'));
					$sub.addClass('subtitle');
					$sub.addClass('content');
					$sub.html('<p>' + prj.appsubtitle + '</p>');
					setPos($sub, [0, 0]);
					$prj.append($sub);
					for (var i = 0; i < 4; i++) {
						var $elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass("c0");
						setPos($elt, [i % 2, (Math.floor(i / 2))]);
						$prj.append($elt);
					}
					var space = Math.floor(10 / prj.modules.length);
					var posidx = Math.floor(10 * Math.random());
					_.each(prj.modules, function(pos, idx) {
						var $elt = $(document.createElement('div'));
						$elt.addClass('sq');
						$elt.addClass(pos.type);
						$elt.attr('info', pos.info);
						setPos($elt, [firstCircle[posidx][0], firstCircle[posidx][1]]);
						posidx = (posidx + 1) % 10;
						$prj.append($elt);
					});
					curPos++;
				});
				c.render(fn);
			});
		}
	};
});
