define([], function() {
	return {
		render : function(info, elt) {
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('/facebook2json?id=' + info, function(data) {
				_.each(data.posts.data, function(element, index, list) {
					var eltitem = document.createElement('div');
					$(eltitem).addClass('facebook');
					var html = '<p><em>' + moment(element.created_time).fromNow() + '... </em><br/>';
					html += element.message;
					$(eltitem).append(html);
					if (element.full_picture)
						$(eltitem).append("<br><img max-width='320' src='" + element.full_picture + "'/>");
					var qritem = document.createElement('div');
					$(qritem).addClass('fbqr');
					$(qritem).qrcode({
						width : 200,
						height : 200,
						text : element.link
					});
					$(eltitem).append(qritem);
					$(evmod).append(eltitem);
				});
			})
		}
	};
});
