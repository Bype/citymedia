define([], function() {
	return {
		render : function() {
			$('.url').each(function(idx, elt) {
				var $elt = $(elt);
				var $div = $(document.createElement('div'));
				$div.addClass("content");
				var $qrdiv = $(document.createElement('div'));
				$qrdiv.addClass("qrcode");
				$qrdiv.qrcode({
					width : step * 2,
					height : step * 2,
					text : $elt.attr('info')
				});
				var $urldiv = $(document.createElement('div'));
				$urldiv.addClass("urltext");
				$urldiv.html('<p>' + $elt.attr('info') + '</p>');
				$div.append($qrdiv);
				$div.append($urldiv);
				$elt.append($div);
				
			});

		}
	};
}); 