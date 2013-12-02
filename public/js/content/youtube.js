define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
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

					var $eltplay = $("<a class='fancybox.iframe' href='http://www.youtube.com/embed/" + element.snippet.resourceId.videoId + "?autoplay=1&iv_load_policy=3&rel=0&fs=0&list=" + info + "'><img src='img/play.svg' class='ytplay'/></a>");

					$eltplay.fancybox({
						'padding' : 0,
						'autoScale' : true,
						'title' : this.title,
						'width' : 1280,
						'height' : 720,
					});

					$eltdiv.append($eltimg);
					$eltdiv.append($elttitle);
					$eltdiv.append($eltplay);
					$div.append($eltdiv);
				}, fn);
			});
		}
	};
});
