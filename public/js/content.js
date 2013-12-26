define(['lib/async'], function(async) {

	var insert = function($elt, spi, collection, type, renderer, fn) {
		async.each(collection, function(element, done) {
			var $div = $(document.createElement('div'));
			$div.hide();
			$.spiral(spi, $div);
			$div.addClass("sq");
			$div.addClass(type);
			renderer($div, element);
			$elt.append($div);
			setTimeout(function() {
				$div.fadeIn();
			}, spi * 100);
			spi++;
			done();
		}, function(err) {
			fn(spi);
		});
	};
	var iconHeader = function($elt, idx, type) {
		var $div = $(document.createElement('div'));
		$div.hide();
		$.spiral(idx, $div);
		$div.addClass("sq");
		$div.addClass(type);
		$elt.append($div);
		$div.append("<img class='ico' src='img/" + type + ".svg'/>");
		setTimeout(function() {
			$div.fadeIn(100);
		}, idx * 50);
	};
	var recMod = function($elt, spi, modules, modindex, fn) {
		var next = function(idx) {
			recMod($elt, idx, modules, modindex + 1, fn);
		};
		if (modules) {
			var mod = modules[modindex];
			if (mod) {
				try {
					require(['content/' + mod.type], function(aMod) {
						aMod.render($elt, spi, mod.info, next, insert, iconHeader);
					});
				} catch(err) {
					next(spi);
				}
			} else {
				fn(spi);
			}
		} else {
			fn(spi);
		}
	};

	return {
		render : function($elt, spi, modules, modindex, fn) {
			recMod($elt, spi, modules, modindex, fn);
		}
	};
});
