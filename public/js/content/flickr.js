define(['lib/mustache', 'lib/async'], function(Mustache, async) {
	return {
		render : function($elt, idx, info, fn, insert, iconHeader) {
			$.ajax({
				url : '/flickr2json?photosetid=' + info,
				dataType : 'json',
				success : function(data) {
					iconHeader($elt, idx, 'flickr');
					idx++;

					insert($elt, idx, data.photoset.photo, 'flickr', function($div, element) {
						var urlm = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_b.jpg", element);
						var $href = $(document.createElement('a'));
						$href.addClass("fancybox");
						$href.attr('href', urlm);
						$href.attr('rel', 'gal' + info.slice(0, -1));
						$href.attr('title', element.title);
						var $img = $(document.createElement('img'));
						var urls = Mustache.render("http://farm{{farm}}.staticflickr.com/{{server}}/{{id}}_{{secret}}_q.jpg", element);
						$img.attr('src', urls);
						$img.attr('alt', "<span style='float:right'>photo : " + data.photoset.ownername + "</span>");
						$img.addClass('qimg content');
						$href.append($img);
						$div.append($href);
					}, function(aIdx) {
						$("a[rel='gal" + info.slice(0, -1) + "']").fancybox({
							helpers : {
								title : {
									type : 'inside'
								}
							},
							afterLoad : function() {
								this.title = this.title + ' ' + $(this.element).find('img').attr('alt');
							}
						});
						fn(aIdx);
					});
				}
			});

		}
	};
});
