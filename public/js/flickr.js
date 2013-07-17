define(['lib/mustache'], function(Mustache) {
	return {
		render : function(info, elt) {
			var photosetid = info;
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&format=json&jsoncallback=?', function(data) {
				elt.append('<h3>' + data.photoset.title._content + '</h3>');
				var albelt = document.createElement('div');
				elt.append(albelt);
				$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&per_page=8&format=json&jsoncallback=?', function(data) {
					_.each(data.photoset.photo, function(element, index, list) {
						var eltimg = document.createElement('img');
						var url = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_s.jpg", element);
						$(eltimg).attr('src', url);
						$(eltimg).addClass('thumbnail');
						$(albelt).append(eltimg);
					});
				});
			});
		}
	}
});
