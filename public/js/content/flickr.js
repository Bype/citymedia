define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.ajax({
				url : 'http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=b27e622e07f348e026d868f2ee68830c&photoset_id=' + info + '&per_page=12&format=json&jsoncallback=?',
				dataType : 'json',
				success : function(data) {
					iconHeader($elt, idx, 'flickr');
					idx++;
					insert($elt, idx, data.photoset.photo, 'flickr', function($div, element) {

						var urlm = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_b.jpg", element);
						var $href = $(document.createElement('a'));
						$href.addClass("fancybox");
						$href.attr('href', urlm);
						$href.attr('title', element.title);
						var $img = $(document.createElement('img'));
						var urls = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_q.jpg", element);
						$img.attr('src', urls);
						$img.attr('alt', "");
						//subtitle
						$img.addClass('qimg content');
						$href.append($img);
						$div.append($href);
						var fb2 = $href.fancybox({
							helpers : {
								title : {
									type : 'inside'
								}
							},
							afterLoad : function() {
								this.title = this.title + ' ' + $(this.element).find('img').attr('alt');
							}
						});

					}, fn);
				}
			});

		}
	};
});
