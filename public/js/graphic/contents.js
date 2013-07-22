define(['kinetic', 'graphic/triangle', 'graphic/shapebase'], function(k, triangle, sb) {
	triangle.init();
	var stage = triangle.init();
	$.get('/project/list', function(lstprj) {
		$.get('/project/' + lstprj[0]._id + '/list', function(lstmod) {
			var layer = new Kinetic.Layer();
			

			var img = new Image();
			img.onload = function() {
				console.log("there");
				layer.add(sb.drawParUp(-9,3, 6, 4, '#444', img));
				layer.add(sb.drawHex(0, 0, '#4aa'));
				stage.add(layer);
			};
			img.src = 'http://www.digitalarti.com/files/visuelsFestivals/secondenature.jpg'
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
