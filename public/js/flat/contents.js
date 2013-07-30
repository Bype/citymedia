define(['flat/flickr', 'flat/youtube', 'flat/gcalendar', 'flat/rss', 'flat/twitter', 'flat/fb', 'flat/gdoc', 'flat/url'], function(flickr, youtube, gcalendar, rss, twitter, fb, gdoc, url) {
	$.get('/project/list', function(lstprj) {

		_.each(lstprj, function(prj) {

			$.get('/project/' + prj._id + '/list', function(lstmod) {
				var prjelt = document.createElement('div')
				$('#container').append(prjelt);
				$(prjelt).addClass('project');
				var $titprj = $(document.createElement('div'));
				$titprj.addClass('title');
				$titprj.append(prj.prjtitle);
				$titprj.css({
					top : vpos
				});
				$(prjelt).append($titprj);
				vpos += 2*ht;
				_.each(lstmod, function(mod) {
					$(prjelt).append( modelt = document.createElement('div'));
					$(modelt).addClass('module');
					$(modelt).css({
						top : vpos
					});
					//$(modelt).append('<h2>Module ' + mod.type + '</h2>');
					//$(modelt).append('<p>' + mod.info + '</p><br/>');
					if (mod.type == 'gmaps') {
						$(modelt).append('<iframe width="480" height="270" src="' + mod.info + '&output=embed"/>');
					}
					if (mod.type == 'flickr') {
						flickr.render(mod.info, $(modelt));
					}
					if (mod.type == 'youtube') {
						youtube.render(mod.info, $(modelt));
					}
					if (mod.type == 'gcalendar') {
						gcalendar.render(mod.info, $(modelt));
					}
					if (mod.type == 'rss') {
						rss.render(mod.info, $(modelt));
					}
					if (mod.type == 'tweeter') {
						twitter.render(mod.info, $(modelt));
					}
					if (mod.type == 'facebook') {
						fb.render(mod.info, $(modelt));
					}
					if (mod.type == 'gdoc') {
						gdoc.render(mod.info, $(modelt));
					}
					if (mod.type == 'url') {
						url.render(mod.info, $(modelt));
					}
				});

			});
		});
	});
});
