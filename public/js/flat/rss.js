define([], function() {
	return {
		render : function(info, elt) {
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('/rss2json?url=' + info, function(data) {
				$(evmod).append('<h2>' + data.title + '</h2>');
				_.each(data.items.slice(0, 8), function(element, index, list) {
					var eltitem = document.createElement('div');
					$(eltitem).addClass('news');
					var html = '<p><em>' + moment(element.pubdate).fromNow() + '... </em>';
					html += '<b>' + element.title + '</b></p>';
					html += '<p>' + element.description.replace(/(<([^>]+)>)/ig, ""); + '</p>';
					$(eltitem).append(html);
					$(evmod).append(eltitem);
				});
			})
		}
	};
});
