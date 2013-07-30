define(['lib/mustache'], function(Mustache) {
	return {
		render : function(info, elt) {
			vpos += 5 * ht;
			var photosetid = info;
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&format=json&jsoncallback=?', function(data) {
				//elt.append('<h3>' + data.photoset.title._content + '</h3>');
				var $albelt = $(document.createElement('div'));
				var pos = wt;

				elt.append($albelt);
				$albelt.addClass('flickrmod');
				var $albtit = $(document.createElement('div'));
				$albtit.addClass('title');
				$albtit.css({
					left : 7 * wt / 4,
					top : -ht
				});
				$albtit.append('<p>' + data.photoset.title._content + '</p>');
				$albelt.append($albtit);
				$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&per_page=8&format=json&jsoncallback=?', function(data) {
					_.each(data.photoset.photo, function(element, index, list) {
						var $eltimg = $(document.createElement('img'));
						var url = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_z.jpg", element);
						var $eltdiv = $(document.createElement('div'));
						$eltimg.attr('src', url);
						$eltdiv.append($eltimg);
						$eltdiv.addClass('thumbnail');
						$eltdiv.css({
							left : pos
						});
						pos += 4 * wt;
						$albelt.append($eltdiv);
					});
				});

			});
		}
	}
});
