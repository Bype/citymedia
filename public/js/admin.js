requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap',
		kinetic : 'lib/kinetic-v4.5.4.min',
		mustache : 'lib/mustache'
	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

var currentid;

require(['jquery', 'underscore', 'mustache', 'util', 'lib/jquery.form', 'bootstrap', 'lib/bootbox.min'], function($, _, Mustache, util) {
	$(function() {

		$.changeTitle = function() {
			$('#prjname').val($("#prjtitle").val().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_"));
		};

		$.changeModule = function() {
			$('#moduleurl').val(util.toUrl($('#moduletype').val(), $('#modinfo').val()));

			switch($('#moduletype').val()) {
				case 'url':
					$('#modinfo').attr('placeholder', 'http://<url du site>');
					break;
				case 'gdoc':
					$('#modinfo').attr('placeholder', 'identifiant du fichier');
					break;
				case 'vimeo':
					$('#modinfo').attr('placeholder', 'identifiant du canal');
					break;
				case 'youtube':
					$('#modinfo').attr('placeholder', 'identifiant de la playlist');
					break;
				case 'rss':
					$('#modinfo').attr('placeholder', 'http://<url du flux rss>');
					break;
				case 'flickr':
					$('#modinfo').attr('placeholder', 'identifant numérique de l\'album');
					break;
				case 'gcalendar':
					$('#modinfo').attr('placeholder', 'http://<url ical>.ics');
					break;
				case 'gmaps':
					$('#modinfo').attr('placeholder', 'https://mapsengine.google.com/map/edit?mid=<identifiant de la carte>');
					break;
				case 'tweeter':
					$('#modinfo').attr('placeholder', 'identifiant teeter');
					break;
				case 'hashtag':
					$('#modinfo').attr('placeholder', 'hashtag');
					break;
				case 'facebook':
					$('#modinfo').attr('placeholder', 'identifiant facebook');
					break;
				case 'soundcloud':
					$('#modinfo').attr('placeholder', 'identifiant soundcloud');
					break;
			};
		}

		$.prjdel = function(id) {
			bootbox.confirm("Êtes vous sur de vouloir supprimer ce projet ?", function(result) {
				if (result)
					$.get('/project/del/' + id, function() {
						$('#' + id).remove();
					});
			});
		};

		$.moddel = function(id, idx) {
			bootbox.confirm("Êtes vous sur de vouloir supprimer ce module ?", function(result) {
				$.get('/project/' + id + '/del/' + idx, function() {
					$(('#' + id) + idx).remove();
					refreshModules(id);
				});
			});
		};

		function refreshModules(id) {
			$('#modulelist').empty();
			$.get('/project/' + id + '/list', function(lstprj) {
				_.each(lstprj, function(val, idx) {
					val.id = id;
					val.idx = idx;
					val.id1 = id + idx;
					showModule(val);
				});
				$('#modules').fadeIn(200);
			});
		}


		$.prjedit = function(id, prjname) {
			$('#projects').toggle(200);
			$('#prjmodtitle').text('Projet ' + prjname);
			$('#moduleform').attr("action", "/project/" + id + "/add");
			refreshModules(id);
			currentid = id;
		};

		$('#projectform').ajaxForm(function(data) {
			showPrj(data[0]);
			$('#projectbox').modal('hide');
			$('#projectform')[0].reset();
		});

		$('#moduleform').ajaxForm({
			beforeSubmit : function() {
				if ($('#modinfo').val())
					return true;
				else
					return false;
			},
			clearForm : true,
			success : function(data) {
				refreshModules(currentid);
				$('#modulebox').modal('hide');
				$('#moduleform')[0].reset();
			}
		});

		function showModule(data) {
			data.url = util.toUrl(data.type, data.info);
			var html = "<tr id='{{id1}}'><td>{{type}}</td><td>{{info}}</td><td><a href='{{url}}' target='_blank'>lien</a></td>";
			if (data.idx != null)
				html += "<td><i class='icon-remove'onclick='$.moddel(\"{{id}}\",{{idx}})'></i></td>";
			html += "</tr>";
			var line = Mustache.render(html, data);
			$('#modulelist').append(line);
		}

		function showPrj(data) {
			var line = Mustache.render("<tr id='{{_id}}'><td onclick='$.prjedit(\"{{_id}}\",\"{{prjtitle}}\")'>{{prjtitle}}</td><td>{{appsubtitle}}</td><td><i class='icon-wrench' onclick='$.prjedit(\"{{_id}}\",\"{{prjtitle}}\")'></i><i class='icon-remove'onclick='$.prjdel(\"{{_id}}\")'></i></td>", data);
			$('#prjlist').append(line);
		}


		$.get('/project/list', function(lstprj) {
			_.each(lstprj, function(val) {
				showPrj(val);
			});
			$('#projects').toggle(200);
		});
	});
});
