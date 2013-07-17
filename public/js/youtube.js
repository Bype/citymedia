define(['lib/mustache'], function(Mustache) {
	return {
		render : function(info, elt) {
			elt.append('<h3>Youtube Playlist</h3>');
			var albelt = document.createElement('div');
			elt.append(albelt);
			$.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCQsEOzxwht2kmbrg50e0TTTt7JVWR7f90&playlistId=' + info, function(data) {
				_.each(data.items, function(element, index, list) {
					var eltimg = document.createElement('img');
					$(eltimg).attr('src', element.snippet.thumbnails.default.url);
					$(eltimg).attr('alt', element.snippet.title);
					$(eltimg).attr('id', element.snippet.resourceId.videoId);
					$(eltimg).addClass('thumbnail');
					$(albelt).append(eltimg);
				});
			})
		}
	}
});
