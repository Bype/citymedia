define(['lib/mustache'], function(Mustache) {
	return {
		render : function(info, sb, stage) {
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&format=json&jsoncallback=?', function(data) {
				var title = data.photoset.title._content;

				$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&per_page=8&format=json&jsoncallback=?', function(data) {
					var layer = new Kinetic.Layer();
					layer.add( back = sb.drawPar(-4, -2, -1, -1, '#444'));
					back.setRotationDeg(60);
					var tweenson = [];
					_.each(data.photoset.photo, function(element, index, list) {
						var src = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_n.jpg", element);
						var p = sb.p2k(-5 + index, -1);
						layer.add( ti = sb.drawPar(-5, -1, -4, 2, '#aaa', src));
						tweenson.push(new Kinetic.Tween({
							node : ti,
							duration : .500,
							x : p.bx
						}));
					});
					//layer.add(sb.drawDown(-4 + index, -2, '#a44'));
					layer.add( text = sb.writeUp(-4, -1, '#fff', title, 20));
					tweenson.push(new Kinetic.Tween({
						node : back,
						duration : .500,
						rotation : 0,
						onFinish : function() {
							text.setOpacity(1);
						}
					}));
					layer.add( st = sb.drawUp(-4, -2, '#a44'));
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
