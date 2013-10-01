define(['lib/mustache'], function(Mustache) {

	function getAlbum($elt) {
		var photosetid = $elt.attr('info');
		$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&format=json&jsoncallback=?', function(data) {

		});
	}

	function getPhotos($elt) {
		var photosetid = $elt.attr('info');
		$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + photosetid + '&per_page=9&format=json&jsoncallback=?', function(data) {
			var $div = $(document.createElement('div'));
			$div.addClass("content");
			_.each(data.photoset.photo, function(element, index, list) {
				var url = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_q.jpg", element);
				var $img = $(document.createElement('img'));
				$img.attr('src', url);
				$img.addClass('qimg');
				$div.append($img);
			});
			$elt.append($div);
		});
	}

	return {
		render : function() {
			$('.flickr').each(function(idx, elt) {
				getAlbum($(elt));
				getPhotos($(elt));
			});
		}
	};
});
