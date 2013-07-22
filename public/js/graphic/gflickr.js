define(['lib/mustache'], function(Mustache) {
	return {
		render : function(info, sb, stage, center) {
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&format=json&jsoncallback=?', function(data) {
				var title = data.photoset.title._content;

				$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&per_page=8&format=json&jsoncallback=?', function(data) {
					var layer = new Kinetic.Layer();
					layer.add( back = sb.drawPar(center.x - 4, center.y - 2, center.x - 1, center.y - 1, '#444'));
					back.setRotationDeg(60);
					var tweenson = [];
					_.each(data.photoset.photo, function(element, index, list) {
						var src = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_m.jpg", element);
						var p = sb.p2k(center.x - 5 + index, center.y - 1);
						layer.add( ti = sb.drawPar(center.x - 5, center.y - 1, center.x - 4, center.y + 2, '#aaa', src));
						tweenson.push(new Kinetic.Tween({
							node : ti,
							duration : .500,
							x : p.bx
						}));
					});
					//layer.add(sb.drawDown(-4 + index, -2, '#a44'));
					var text = sb.writeUp(center.x - 4, center.y - 1, '#fff', title, (50-title.length))
					layer.add(text);
					tweenson.push(new Kinetic.Tween({
						node : back,
						duration : .500,
						rotation : 0,
						onFinish : function() {
							text.setOpacity(1);
						}
					}));
					var st = sb.drawUp(center.x - 4, center.y - 2, '#a44')
					layer.add(st);
					var off = true;
					st.on('mousedown', function() {
						_.each(tweenson, function(tw, index, list) {
							if (off)
								tw.play();
							else
								tw.reverse();

						});
						if (!off)
							text.setOpacity(0);
						off = !off;
					});
					stage.add(layer);
				});
			});
		}
	}
});
