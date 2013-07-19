define(['kinetic', 'graphic/triangle', 'graphic/shapebase'], function(k, triangle, sb) {
	triangle.init();
	$.get('/project/list', function(lstprj) {
		$.get('/project/' + lstprj[0]._id + '/list', function(lstmod) {

			require(['graphic/gflickr'], function(gflickr) {
				var stage = triangle.init();

				_.each(lstmod, function(mod) {
					if (mod.type == 'flickr') {
						gflickr.render(mod.info, sb, stage);
					}
					/*
					 layer.add( par = sb.drawPar(-2, -3, 1, 2, '#aaa', "http://farm2.staticflickr.com/1028/1417194380_25cd4f708b.jpg"));
					 layer.add(sb.drawHex(5, -2, '#aaa'));
					 layer.add(sb.drawUp(-3, -2, '#a4a'));
					 layer.add(sb.drawDown(-3, -2, '#a44'));
					 layer.add(sb.drawPar(8, -2, 4, 2, '#888'));
					 */

				});
			});
		});
	});
});
