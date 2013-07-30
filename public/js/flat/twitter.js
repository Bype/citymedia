define([], function() {
	return {
		render : function(info, elt) {
			vpos += 3 * ht;
			var $evmod = $(document.createElement('div'));
			$evmod.addClass('twittermod');
			elt.append($evmod);
			var $albtit = $(document.createElement('div'));
			$albtit.addClass('title');
			$albtit.append('<p>' + info + '</p>');
			$albtit.css({
				left : 3 * wt / 4,
				top : -ht
			});
			$evmod.append($albtit);
			var pos = wt;
			$.getJSON('/twitter2json?q=' + info, function(data) {
				_.each(data.statuses, function(element, index, list) {
					var $eltitem = $(document.createElement('div'));
					$eltitem.addClass('twitter');
					var $content = $(document.createElement('div'));
					$content.addClass('inner');
					$eltitem.append($content);
					for (var i = 0; i < 16; i++) {
						var $spacer = $(document.createElement('div'));
						$spacer.addClass('spacer');
						$spacer.width(4.61 * i);
						$content.append($spacer);
					}
					var html = '<p><em>' + moment(element.created_at).fromNow() + '... </em><br/>';
					html += element.text + '<br/><b>@' + element.user.screen_name + ' depuis ' + element.user.location + '</b></p>';
					$content.append(html);
					if (element.entities.media)
						$content.append("<br><img width='160' src='" + element.entities.media[0].media_url + "'/>");
					$eltitem.animate({
						left : pos
					});
					pos += 12 * wt / 2;
					$evmod.append($eltitem);
				});
			});

		}
	};
});
