define(['flickr', 'youtube', 'gcalendar'], function(flickr, youtube, gcalendar) {
	$.get('/project/list', function(lstprj) {
		_.each(lstprj, function(prj) {
			$('#container').append( prjelt = document.createElement('div'));
			$(prjelt).addClass('project');
			$(prjelt).append('<h1>' + prj.prjtitle + '</h1>');
			$.get('/project/' + prj._id + '/list', function(lstprj) {
				_.each(lstprj, function(mod) {
					$(prjelt).append( modelt = document.createElement('div'));
					$(modelt).addClass('module');
					$(modelt).append('<h2>Module ' + mod.type + '</h2>');
					$(modelt).append('<p>' + mod.info + '</p>');
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
