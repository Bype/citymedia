define([], function() {
	
	return {
		render : function(info, elt) {
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('/gcal2json?url=' + info, function(data) {
				_.each(data, function(element, index, list) {
					var eltev = document.createElement('div');
					var html = '<p><em>' + moment(element.when.begin).fromNow() + '</em>, <b> ' + element.what + '</b>';
					var dbeg = moment(element.when.begin).format('DD/MM/YYYY');
					var dend = moment(element.when.begin).format('DD/MM/YYYY')
					if (dbeg != dend)
						html += ' du ' + dbeg + ' au ' + dend;
					else
						html += ' le ' + dbeg + ' à ' + moment(element.when.begin).format('HH:mm');
					html+='</p>';
					$(eltev).append(html);
					$(evmod).append(eltev);
				});
			})
		}
	}
});
