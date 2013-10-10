define(['lib/mustache', 'lib/async'], function(Mustache, async) {

	function insert($elt, spi, collection, type, renderer, fn) {
		async.each(collection, function(element, done) {
			var $div = $(document.createElement('div'));
			$.spiral(spi, $div);
			$div.addClass("sq");
			$div.addClass(type);
			renderer($div, element);
			$elt.append($div);
			spi++;
			done();
		}, function(err) {
			fn(spi);
		});
	}

	return {
		flickr : function($elt, idx, info, fn) {
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&per_page=10&format=json&jsoncallback=?', function(data) {
				insert($elt, idx, data.photoset.photo, 'flickr', function($div, element) {
					var $img = $(document.createElement('img'));
					var url = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_q.jpg", element);
					$img.attr('src', url);
					$img.addClass('qimg content');
					$div.append($img);
				}, fn);
			});
		},
		url : function($elt, idx, info, fn) {
			var a = [info];
			insert($elt, idx, a, 'url', function($div, element) {
				var $url = $(document.createElement('div'));
				$url.addClass("content");
				var $qrdiv = $(document.createElement('div'));
				$qrdiv.addClass("qrcode");
				$qrdiv.qrcode({
					width : step * 2,
					height : step * 2,
					text : element
				});
				var $urldiv = $(document.createElement('div'));
				$urldiv.addClass("urltext");
				$urldiv.html('<p>' + $elt.attr('info') + '</p>');
				$url.append($qrdiv);
				$url.append($urldiv);
				$div.append($url);
			}, fn);
		}
	};
});
