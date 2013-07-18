define([], function() {
	return {
		render : function(info, elt) {
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('https://www.googleapis.com/drive/v2/files/' + info + '?key=AIzaSyCQsEOzxwht2kmbrg50e0TTTt7JVWR7f90', function(data) {
				$(evmod).append('<h2>' + data.title + '</h2>');
				$.ajax({
					url : data.exportLinks["text/plain"],
					dataType : "text",
				}).done(function(msg) {
					$(evmod).append('<p>' + msg.replace(/\n/g, "<br />") + '</p>');
				});
			});
		}
	}
});
