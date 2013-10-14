define(['lib/mustache', 'lib/async'], function(Mustache, async) {

	function insert($elt, spi, collection, type, renderer, fn) {
		async.each(collection, function(element, done) {
			var $div = $(document.createElement('div'));
			$div.hide();
			$.spiral(spi, $div);
			$div.addClass("sq");
			$div.addClass(type);
			renderer($div, element);
			$elt.append($div);
			spi++;
			setTimeout(function() {
				$div.fadeIn(100);
			}, spi * 50);
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
				$urldiv.html('<p>' + info + '</p>');
				$url.append($qrdiv);
				$url.append($urldiv);
				$div.append($url);
			}, fn);
		},
		youtube : function($elt, idx, info, fn) {
			$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCQsEOzxwht2kmbrg50e0TTTt7JVWR7f90&playlistId=' + info, function(data) {
				insert($elt, idx, data.items, 'youtube', function($div, element) {
					var $eltdiv = $(document.createElement('div'));
					$eltdiv.addClass('content');

					var $eltimg = $(document.createElement('img'));
					$eltimg.attr('src', element.snippet.thumbnails.medium.url);
					$eltimg.attr('alt', element.snippet.title);
					$eltimg.attr('id', element.snippet.resourceId.videoId);
					$eltimg.addClass('ytimg');
					$eltdiv.append($eltimg);

					var $elttitle = $(document.createElement('p'));
					$elttitle.text(element.snippet.title);

					/*
					 var $eltplay = $(document.createElement('img'));
					 $eltplay.attr('src', 'img/play.svg');
					 $eltplay.addClass('ytplay');
					 */
					var $eltplay = $("<a class='fancybox-media' href='http://www.youtube.com/watch?v=" + element.snippet.resourceId.videoId + "&autoplay=1'><img src='img/play.svg' class='ytplay'/></a>");
					$eltplay.click(function() {
						$.fancybox({
							'padding' : 0,
							'autoScale' : true,
							'transitionIn' : 'none',
							'transitionOut' : 'none',
							'title' : this.title,
							'width' : 1280,
							'height' : 720,
							'href' : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
							'type' : 'swf',
							'swf' : {
								'wmode' : 'transparent',
								'allowfullscreen' : 'true',
								'allownetworking' : 'internal'
							}
						});

						return false;
					});

					$eltdiv.append($eltimg);
					$eltdiv.append($elttitle);
					$eltdiv.append($eltplay);
					$div.append($eltdiv);
				}, fn);
			});
		},
		tweeter : function($elt, idx, info, fn) {
			$.getJSON('/twitter2json?q=' + info, function(data) {
				insert($elt, idx, data.statuses, 'tweeter', function($div, element) {
					var $eltdiv = $(document.createElement('div'));
					$eltdiv.addClass('content');
					var html = '<p><em>' + moment(element.created_at).fromNow() + '... </em><br/>';
					html += element.text + '<br/><b>@' + element.user.screen_name + ' depuis ' + element.user.location + '</b></p>';
					$eltdiv.append(html);
					$div.append($eltdiv);
				}, fn);
			});
		}
	};
});
