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
			}, function(spi) {
				$.getJSON("http://qi.bype.org/tag/" + info, function(data) {
					$.addQRImg = function($elt, src, radius) {
						var $div = $(document.createElement('div'));
						$div.hide();
						$div.addClass("sq qrimg needupdate");
						var angle = 0;
						$div.attr('angle', angle);
						$div.attr('radius', radius);
						$div.attr('step', (Math.random() < .5 ? -1 : 1) * (Math.floor(2 + Math.random() * 10) * 0.000628));
						$div.css({
							left : radius * step * Math.cos(angle),
							top : radius * step * Math.sin(angle)
						});
						$div.bind('updatestep', function(e) {
							var $this = $(this);
							var angle = parseFloat($this.attr('angle'));
							var radius = parseInt($this.attr('radius'));
							angle += parseFloat($this.attr('step'));
							if (6.28 < angle)
								angle = 0;
							$this.css({
								left : radius * step * Math.cos(angle),
								top : radius * step * Math.sin(angle)
							});
							$this.attr('angle', angle);
						});
						var $img = $(document.createElement('img'));
						$img.attr('src', src);
						$img.addClass('content');
						$div.append($img);
						$elt.append($div);
						setTimeout(function() {
							$div.fadeIn(100);
						}, 1000);
					};

					async.each(data.slice(0, 10).reverse(), function(element, done) {
						var radius = Math.floor((Math.sqrt(spi + 1) - 1) / 2) + 1;
						$.addQRImg($elt, 'http://qi.bype.org/img/' + element.filename, radius + 1);
						done(spi);
					}, fn);
				});
			});
		}
	};
});
