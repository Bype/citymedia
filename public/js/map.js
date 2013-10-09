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

			var r = 1;
			var a =0;
			
			function spiral(i) {
				var diam = Math.ceil(i / 8);
				var inFaceIdx = Math.floor((1 + Math.sqrt(8 * i + 1)) / 16);
				var faceNum = Math.floor(inFaceIdx / 4);
				var pos;
				switch (faceNum) {
					case 0:
						{
							pos = [-diam, -diam];
							pos[0] += (inFaceIdx % (diam * 2));
						}
						break;
					case 1:
						{
							pos = [diam, -diam];
							pos[1] += (inFaceIdx % (diam * 2));
						}
						break;
					case 2:
						{
							pos = [diam, diam];
							pos[0] -= (inFaceIdx % (diam * 2));
						}
						break;
					case 3:
						{
							pos = [-diam, diam];
							pos[1] -= (inFaceIdx % (diam * 2));
						}
						break;
				};
				console.log("i : ", i, " d :", diam, " if : ", inFaceIdx, " fn : ", faceNum, "     -->     ", pos);
				return pos;
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
						setPos($elt, spiral(curPos));

					});
					curPos++;
				});
				c.render(fn);
			});
		}
	};
});
