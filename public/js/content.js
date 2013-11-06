define(['content/render'], function(render) {

	var recMod = function($elt, spi, modules, modindex, fn) {
		var next = function(idx) {
			recMod($elt, idx, modules, modindex + 1, fn);
		};
		if (modules) {
			var mod = modules[modindex];
			if (mod) {
				try {
					render[mod.type]($elt, spi, mod.info, next);
				} catch(err) {
					next(spi);
				}
			} else {
				fn();
			}
		} else {
			fn();
		}
	};

	return {
		render : function($elt, spi, modules, modindex, fn) {
			recMod($elt, spi, modules, modindex, fn)
		}
	};
});
