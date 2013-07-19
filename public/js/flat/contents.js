define(['flat/flickr', 'flat/youtube', 'flat/gcalendar', 'flat/rss', 'flat/twitter', 'flat/gdoc'], function(flickr, youtube, gcalendar, rss, twitter, gdoc) {
	$.get('/project/list', function(lstprj) {
		_.each(lstprj, function(prj) {
			var prjelt = document.createElement('div')
			$('#container').append(prjelt);
			$(prjelt).addClass('project');
			$(prjelt).append('<h1>' + prj.prjtitle + '</h1>');
			$.get('/project/' + prj._id + '/list', function(lstmod) {
				_.each(lstmod, function(mod) {
					$(prjelt).append( modelt = document.createElement('div'));
					$(modelt).addClass('module');
					$(modelt).append('<h2>Module ' + mod.type + '</h2>');
					$(modelt).append('<p>' + mod.info + '</p><br/>');
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
					if (mod.type == 'gdoc') {
						gdoc.render(mod.info, $(modelt));
					}
					if (mod.type == 'url') {
						$(modelt).qrcode({
							width : 128,
							height : 128,
							text : mod.info
						});
					}
				});
			});
		});
	});
});
