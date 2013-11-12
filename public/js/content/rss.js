define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
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
