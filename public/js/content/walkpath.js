define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.getJSON(info, function(data) {
				iconHeader($elt, idx, 'walkpath');
				idx++;
				var wp=0
				insert($elt, idx, data, 'walkpath', function($div, element) {
					$eltitem = $(document.createElement('div'));
					$eltitem.addClass('content');
					$eltitem.attr('href', 'http://www.perspective-s.org/Data/Sites/citymedia/index.php?id='+wp);
					wp++;
					var html = '<h1>' + element.name + '</h1>';
					html += '<p>' + element.desc.slice(0, 300) + (300 < element.desc.length ? "..." : "") + '</p>';
					$eltitem.append(html);
					$eltitem.click(function() {
						window.location.href = $(this).attr('href');
					});
					$div.append($eltitem);
				}, fn);
			});
		}
	};
});
