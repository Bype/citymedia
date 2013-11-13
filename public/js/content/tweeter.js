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
					if (element.entities.urls[0]) {
						var $qrdiv = $(document.createElement('div'));
						$qrdiv.qrcode({
							width : step * 2,
							height : step * 2,
							foreground : "#007080",
							background : "#fff",
							text : element.entities.urls[0].url
						});
						$qrdiv.css({
							"-webkit-transition" : " all .5s ease-in-out"
						});
						$qrdiv.click(function() {
							var $this = $(this);
							$this.removeClass("qrss").addClass("qrssmaxi");
							setTimeout(function() {
								$this.removeClass("qrssmaxi").addClass("qrss");
							}, 5000);
						});
						$qrdiv.addClass("qrss");
						$eltdiv.append($qrdiv);
					}
					$div.append($eltdiv);
				}, fn);
			});
		}
	};
});
