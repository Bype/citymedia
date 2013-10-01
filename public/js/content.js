define(['content/url','content/flickr'], function(url,flickr) {
	return {
		render : function(fn) {
			url.render();
			flickr.render();
			fn();
		}
	};
});
