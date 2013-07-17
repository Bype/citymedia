require.config({
	paths : {
		"moment" : "lib/moment.min",
	}
});

define(['moment'], function(moment) {
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

	return {
		render : function(info, elt) {
			elt.append('<br/>');
			var evmod = document.createElement('div');
			elt.append(evmod);
			$.getJSON('/gcal2json?url=' + info, function(data) {
				_.each(data, function(element, index, list) {
					var eltev = document.createElement('div');
					$(eltev).append('<p><em>' + moment(element.when.begin).fromNow() + '</em>, <b> ' + element.what + '</b> du ' + moment(element.when.begin).format('DD/MM/YYYY') + ' au ' + moment(element.when.begin).format('DD/MM/YYYY') + '</p>');
					$(evmod).append(eltev);
				});
			})
		}
	}
});
