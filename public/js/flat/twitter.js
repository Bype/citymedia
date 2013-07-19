define([], function() {
	return {
		render : function(info, elt) {
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('/twitter2json?q=' + info, function(data) {
				_.each(data.statuses, function(element, index, list) {
					var eltitem = document.createElement('div');
					$(eltitem).addClass('twitter');
					var html = '<p><em>' + moment(element.created_at).fromNow() + '... </em><br/>';
					html += element.text + '</p><b>@' + element.user.screen_name + ' depuis ' + element.user.location + '</b>';
					$(eltitem).append(html);
					if (element.entities.media)
						$(eltitem).append("<br><img width='160' src='" + element.entities.media[0].media_url + "'/>");

					$(evmod).append(eltitem);
				});
			})
		}
	};
});
