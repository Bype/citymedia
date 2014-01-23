define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.getJSON(info, function(data) {
				iconHeader($elt, idx, 'walkpath');
				idx++;
				var wp = 0;
				insert($elt, idx, data, 'walkpath', function($div, element) {
					$eltitem = $(document.createElement('div'));
					$eltitem.addClass('content');
					$eltitem.attr('href', 'http://citymediaride.hexalab.org/index.php?id=' + wp);
					wp++;
					var html = '<h1>' + element[0] + '</h1>';
					html += '<p>' + element[1].slice(0, 300) + (300 < element[1].length ? "..." : "") + '</p>';
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
