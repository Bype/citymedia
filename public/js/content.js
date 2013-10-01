define([], function() {
	return {
		render : function() {
			$('.url').each(function(idx, elt) {
				var $elt = $(elt);
				var $qrdiv = $(document.createElement('div'));
				$qrdiv.addClass("qrcode");
				$qrdiv.qrcode({
					width : step * 2,
					height : step * 2,
					text : $elt.attr('info')
				});
				var $urldiv = $(document.createElement('div'));
				$urldiv.addClass("urltext");
				$urldiv.html('<p>'+$elt.attr('info')+'</p>');
				$elt.append($qrdiv);
				$elt.append($urldiv);
			});
		}
	};
});
