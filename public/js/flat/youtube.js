define([], function() {
	return {
		render : function(info, elt) {
			vpos += 4 * ht;
			var $albelt = $(document.createElement('div'));
			var pos = 3 * wt / 4;
			elt.append($albelt);
			$albelt.addClass('youtubemod');
			var $albtit = $(document.createElement('div'));
			$albtit.addClass('title');
			$albtit.css({
				left : 5 * wt / 4,
				top : -ht
			});

			$albelt.append($albtit);
			$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCQsEOzxwht2kmbrg50e0TTTt7JVWR7f90&playlistId=' + info, function(data) {
				$albelt.click(function(e) {
					if (this.getAttribute("show") == 1) {
						$(this).attr('show',0);
						$(this).children('.frame').each(function(index, elt) {
							$(elt).animate({
								left : 3 * wt / 4
							});
						});
					} else {
						$(this).attr('show', 1);
						$(this).children('.frame').each(function(index, elt) {
							$(elt).animate({
								left : elt.getAttribute("endpos")
							});
						});
					}
				});
				$albelt.attr('show', 0);
				$albtit.append('<p>' + data.items[0].snippet.channelTitle + '</p>');
				_.each(data.items, function(element, index, list) {
					var $eltimg = $(document.createElement('img'));
					var $eltdiv = $(document.createElement('div'));
					$eltimg.attr('src', element.snippet.thumbnails.high.url);
					$eltimg.attr('alt', element.snippet.title);
					$eltimg.attr('id', element.snippet.resourceId.videoId);
					$eltdiv.attr('endpos', pos);
					$eltdiv.append($eltimg);
					$eltdiv.addClass('frame');

					$eltdiv.css({
						left : 3 * wt / 4
					});
					pos += 4 * wt;
					$albelt.append($eltdiv);

				});
			});
		}
	};
});
