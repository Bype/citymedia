define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			insert($elt, idx, [info], 'sms', function($div, element) {
				$elt.attr('id', 'smsblock');
				var $sms = $(document.createElement('div'));
				$sms.addClass("content");
				var $phonediv = $(document.createElement('div'));
				$phonediv.addClass("phonenum");
				$phonediv.html('<p>Envoyer un sms</p><h1>06 38 03 91 92</h1><p><small>Les messages à caractères illicites pourront donner lieu a des poursuites</small></p>');
				$sms.append($phonediv);
				$div.append($sms);
				idx++;
			}, function(spi) {
				$.addSMS = function($elt, src) {
					var lspi = parseInt($elt.attr('spi'));
					insert($elt, lspi, [src], 'sms', function($div, element) {
						var $eltdiv = $(document.createElement('div'));
						$eltdiv.addClass('content');
						var html = '<p><em>' + moment(element.date).fromNow() + '... </em><br/>';
						html += element.txt + '</p>';
						$eltdiv.append(html);
						$div.append($eltdiv);
					}, function() {
						$elt.attr('spi', lspi + 1);
					});
				};

				$.getJSON('http://qi.bype.org/msg/txts', function(data) {
					insert($elt, idx, data.slice(0, 16), 'sms', function($div, element) {
						var $eltdiv = $(document.createElement('div'));
						$eltdiv.addClass('content');
						var html = '<p><em>' + moment(element.date).fromNow() + '... </em><br/>';
						html += element.txt + '</p>';
						$eltdiv.append(html);
						$div.append($eltdiv);
					}, fn);
				});
			});
		}
	};
});
