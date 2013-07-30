define(['kinetic', 'graphic/triangle', 'graphic/shapebase'], function(k, triangle, sb) {
	triangle.init();
	var stage = triangle.init();
	$.get('/project/list', function(lstprj) {
		$.get('/project/' + lstprj[0]._id + '/list', function(lstmod) {
			var layer = new Kinetic.Layer();

			layer.add(sb.drawHex(0, 0, '#4aa'));
			stage.add(layer);

			require(['graphic/gflickr'], function(gflickr) {

				_.each(lstmod, function(mod) {

					if (mod.type == 'flickr') {

						gflickr.render(mod.info, sb, stage, {
							x : 1,
							y : 0
						});
					}

				});
			});
		});
	});
});

