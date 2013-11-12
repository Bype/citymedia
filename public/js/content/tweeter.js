define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
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
		}
	};
});
