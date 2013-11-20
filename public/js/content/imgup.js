define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			var a = [info];
			insert($elt, idx, a, 'url', function($div, element) {
				$elt.attr('id', 'imgup_' + info);
				var $url = $(document.createElement('div'));
				$url.addClass("content");
				var $qrdiv = $(document.createElement('div'));
				$qrdiv.addClass("qrcode");
				$qrdiv.qrcode({
					width : step * 2,
					height : step * 2,
					text : "http://citymedialab.org/imgupload/" + element
				});
				var $urldiv = $(document.createElement('div'));
				$urldiv.addClass("urltext");
				$urldiv.html('<p>Scannez le QRCode et envoyer une image à partir de votre mobile</p>');
				$url.append($qrdiv);
				$url.append($urldiv);
				$div.append($url);
				idx++;
			}, function(spi) {

				$.addQRImg = function($elt, src) {
					var lspi = parseInt($elt.attr('spi'));
					insert($elt, lspi, [src], 'qrimg', function($div, element) {
						var $img = $(document.createElement('img'));
						$img.attr('src',element);
						$img.addClass('content');
						$div.append($img);
					}, function() {
						$elt.attr('spi', lspi + 1);
					});
				};

				$.getJSON("http://qi.bype.org/tag/" + info, function(data) {
					insert($elt, idx, data.slice(0, 16), 'qrimg', function($div, element) {
						var $img = $(document.createElement('img'));
						$img.attr('src', 'http://qi.bype.org/img/' + element.filename);
						$img.addClass('content');
						$div.append($img);
					}, fn);
				});
			});
		}
	};
});
