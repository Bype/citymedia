define(['flat/flickr', 'flat/youtube', 'flat/gcalendar', 'flat/rss', 'flat/twitter', 'flat/fb', 'flat/gdoc', 'flat/url'], function(flickr, youtube, gcalendar, rss, twitter, fb, gdoc, url) {
	moment.lang('fr', {
		months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
		monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
		weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
		weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
		weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
		longDateFormat : {
			LT : "HH:mm",
			L : "DD/MM/YYYY",
			LL : "D MMMM YYYY",
			LLL : "D MMMM YYYY LT",
			LLLL : "dddd D MMMM YYYY LT"
		},
		calendar : {
			sameDay : "[Aujourd'hui à] LT",
			nextDay : '[Demain à] LT',
			nextWeek : 'dddd [à] LT',
			lastDay : '[Hier à] LT',
			lastWeek : 'dddd [dernier à] LT',
			sameElse : 'L'
		},
		relativeTime : {
			future : "dans %s",
			past : "il y a %s",
			s : "quelques secondes",
			m : "une minute",
			mm : "%d minutes",
			h : "une heure",
			hh : "%d heures",
			d : "un jour",
			dd : "%d jours",
			M : "un mois",
			MM : "%d mois",
			y : "un an",
			yy : "%d ans"
		},
		ordinal : function(number) {
			return number + (number === 1 ? 'er' : '');
		},
		week : {
			dow : 1, // Monday is the first day of the week.
			doy : 4 // The week that contains Jan 4th is the first week of the year.
		}
	});

	$.get('/project/list', function(lstprj) {
		_.each(lstprj, function(prj, p) {

			$.get('/project/' + prj._id + '/list', function(lstmod) {
				var prjelt = document.createElement('div')

				$('#container').append(prjelt);
				$(prjelt).addClass('project');
				var $prj = $(document.createElement('div'));
				sys.addNode("p" + p, {
					elt : $prj,
					mass : .5
				});
				$prj.addClass('prj');
				var $titprj = $(document.createElement('div'));
				$titprj.addClass('title');
				$titprj.append(prj.prjtitle);
				$prj.append($titprj);
				var $subprj = $(document.createElement('div'));
				$subprj.addClass('subtitle');
				$subprj.append(prj.appsubtitle);
				$prj.append($subprj);
				$(prjelt).append($prj);
				vpos += 2 * ht;
				var im = 0;
				_.each(lstmod, function(mod) {
					$(prjelt).append( modelt = document.createElement('div'));
					$(modelt).addClass('module');
					sys.addNode('p' + p + 'mod' + im, {
						elt : $(modelt)
					});
					sys.addEdge("p" + p, 'p' + p + 'mod' + im);
					$(modelt).css({
						top : vpos
					});
					im++;
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
