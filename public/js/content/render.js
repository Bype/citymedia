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

	function iconHeader($elt, idx, type) {
		var $div = $(document.createElement('div'));
		$div.hide();
		$.spiral(idx, $div);
		$div.addClass("sq");
		$div.addClass(type);
		$elt.append($div);
		$div.append("<img class='ico' src='img/" + type + ".svg'/>");
		setTimeout(function() {
			$div.fadeIn(100);
		}, idx * 50);
	}

	return {
		flickr : function($elt, idx, info, fn) {
			$.getJSON('http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&per_page=10&format=json&jsoncallback=?', function(data) {
				iconHeader($elt, idx, 'flickr');
				idx++;
				insert($elt, idx, data.photoset.photo, 'flickr', function($div, element) {
					var urlm = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_b.jpg", element);
					var $href = $(document.createElement('a'));
					$href.addClass("fancybox");
					$href.attr('href', urlm);
					var $img = $(document.createElement('img'));
					var urls = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_q.jpg", element);
					$img.attr('src', urls);
					$img.addClass('qimg content');
					$href.append($img);
					$div.append($href);
					$href.fancybox();
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
				iconHeader($elt, idx, 'youtube');
				idx++;
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
				iconHeader($elt, idx, 'tweeter');
				idx++;
				insert($elt, idx, data.statuses, 'tweeter', function($div, element) {
					var $eltdiv = $(document.createElement('div'));
					$eltdiv.addClass('content');
					var html = '<p><em>' + moment(element.created_at).fromNow() + '... </em><br/>';
					html += element.text + '<br/><b>@' + element.user.screen_name + ' depuis ' + element.user.location + '</b></p>';
					$eltdiv.append(html);
					$div.append($eltdiv);
				}, fn);
			});
		},
		rss : function($elt, idx, info, fn) {
			$.getJSON('/rss2json?url=' + info, function(data) {
				iconHeader($elt, idx, 'rss');
				idx++;
				insert($elt, idx, data.items.slice(0, 10), 'rss', function($div, element) {
					$eltitem = $(document.createElement('div'));
					$eltitem.addClass('news content');
					var html = '<p><em>' + moment(element.pubdate).fromNow() + '... </em></p>';
					html += '<h1>' + element.title + '</h1>';
					html += '<p>' + element.description.replace(/(<([^>]+)>)/ig, "").slice(0, 320) + (320 < element.description.length ? "..." : "") + '</p>';
					$eltitem.append(html);
					$div.append($eltitem);
				}, fn);
			});
		}
	};
});
