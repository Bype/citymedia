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

require(['jquery', 'underscore', 'mustache','lib/jquery.form', 'bootstrap', ], function($, _,Mustache) {
	$(function() {
		$.changeTitle = function() {
			$('#prjname').val($("#prjtitle").val().toLowerCase().replace(/[^a-zA-Z0-9]+/g, "_"));
		};

		$.prjdel = function(id){
			$.get('/project/del/'+id, function() {
			$('#'+id).remove();
			});
		};

		$.prjedit = function(id,prjname){
			
			$('#projects').toggle(200);
			$('#prjmodtitle').text('Projet '+prjname);
			$('#moduleform').attr("action","/project/"+id+"/add");
			$('#modulelist').empty();
			$.get('/project/'+id+'/list', function(lstprj) {
				_.each(lstprj, function(val) {
				showModule(val);
			});
			$('#modules').fadeIn(200);
			});
		};

		$('#projectform').ajaxForm(function(data) {
			showPrj(data[0]);
			$('#projectbox').modal('hide');
			$('#projectform')[0].reset();
		});
		
		$('#moduleform').ajaxForm(function(data) {
			showModule(data);
			$('#modulebox').modal('hide');
			$('#moduleform')[0].reset();
		});
		
		function showModule(data) {
			data.url='http://test.org';
			var line = Mustache.render("<tr id='{{_id}}'><td>{{type}}</td><td>{{info}}</td><td><a href='{{url}}'>lien</a></td><td><i class='icon-remove'onclick='$.moddel(\"{{_id}}\")'></i></td>", data);
			$('#modulelist').append(line);
		}
		
		function showPrj(data) {
			var line = Mustache.render("<tr id='{{_id}}'><td>{{prjtitle}}</td><td>{{appsubtitle}}</td><td><i class='icon-wrench' onclick='$.prjedit(\"{{_id}}\",\"{{prjtitle}}\")'></i><i class='icon-remove'onclick='$.prjdel(\"{{_id}}\")'></i></td>", data);
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
