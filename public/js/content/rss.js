define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.getJSON('/rss2json?url=' + info, function(data) {
				iconHeader($elt, idx, 'rss');
				idx++;
				insert($elt, idx, data.items.slice(0, 10), 'rss', function($div, element) {
					$eltitem = $(document.createElement('div'));
					$eltitem.addClass('news content');

					var html = '<p><em>' + moment(element.pubdate).fromNow() + '... </em></p>';
					html += '<h1>' + element.title + '</h1>';
					html += '<p>' + element.description.replace(/(<([^>]+)>)/ig, "").slice(0, 140) + (140 < element.description.length ? "..." : "") + '</p>';
					$eltitem.append(html);
					var $qrdiv = $(document.createElement('div'));
					$qrdiv.qrcode({
						width : step * 2,
						height : step * 2,
						foreground : "#834d04",
						background : "#eee",
						text : element.link
					});
					$qrdiv.addClass("qrss");
					$qrdiv.css({
						"-webkit-transition" : " all 1s ease-in-out"
					});
					$qrdiv.click(function() {
						var $this =$(this); 
						$this.removeClass("qrss").addClass("qrssmaxi");
						setTimeout(function() {
							$this.removeClass("qrssmaxi").addClass("qrss");
						}, 5000);
					});
					$eltitem.append($qrdiv);
					$div.append($eltitem);

				}, fn);
			});
		}
	};
});
