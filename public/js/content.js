define(['content/render'], function(render) {

	var recMod = function($elt, spi, modules, modindex, fn) {
		var next = function(idx) {
			recMod($elt, idx, modules, modindex + 1, fn);
		};
		var mod = modules[modindex];
		if (mod) {
			if ('flickr' == mod.type) {
				render.flickr($elt, spi, mod.info, next);
			} else if ('url' == mod.type) {
				render.url($elt, spi, mod.info, next);
			} else {
				next(spi);
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
