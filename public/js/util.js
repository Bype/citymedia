define([], function() {
	return {
		toUrl : function(type, val) {

			switch(type) {
				case 'url':
				case 'rss':
				case 'gcalendar':
				case 'gmaps':
					return val;
					break;
				case 'gdoc':
					return 'https://docs.google.com/document/d/' + val;
				case 'vimeo':
				case 'youtube':
					return 'http://www.youtube.com/playlist?list=' + val;
				case 'vimeo':
					return 'https://vimeo.com/channels/' + val;
					break;
				case 'flickr':
					return 'http://www.flickr.com/photos/davido/sets/' + val;
					break;
				case 'tweeter':
					return 'https://twitter.com/' + val;
					break;
				case 'hashtag':
					return 'https://twitter.com/search?q=%23' + val;
					break;
				case 'facebook':
					return 'https://www.facebook.com/' + val;
					break;
				case 'soundcloud':
					return 'https://soundcloud.com/' + val;
					break;
			}
		}
	}
});
