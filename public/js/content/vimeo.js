define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.getJSON('http://vimeo.com/api/v2/channel/' + info + '/videos.json', function(data) {
				iconHeader($elt, idx, 'youtube');
				idx++;
				insert($elt, idx, data, 'youtube', function($div, element) {
					var $eltdiv = $(document.createElement('div'));
					$eltdiv.addClass('content');

					var $eltimg = $(document.createElement('img'));
					$eltimg.attr('src', element.thumbnail_medium);
					$eltimg.attr('alt', element.title);
					$eltimg.attr('id', element.id);
					$eltimg.addClass('ytimg');
					$eltdiv.append($eltimg);

					var $elttitle = $(document.createElement('p'));
					$elttitle.text(element.title);

					var $eltplay = $("<a class='fancybox.iframe' href='http://player.vimeo.com/video/" + element.id + "?autoplay=1'><img src='img/play.svg' class='ytplay'/></a>");

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
