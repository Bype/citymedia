define([], function() {
	return {
		render : function(info, elt) {

			vpos += 4 * ht;
			var $urldiv = $(document.createElement('div'));
			$urldiv.addClass("urlmod");
			var pos = wt;
			elt.append($urldiv);
			var $qrdiv = $(document.createElement('div'));
			$qrdiv.addClass("qrcode");
			$qrdiv.qrcode({
				width : 2*ht,
				height : 2*ht,
				text : info
			});
			$urldiv.append($qrdiv);
		}
	};
});
