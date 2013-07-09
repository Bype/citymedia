define(['kinetic'], function() {

	var stage = new Kinetic.Stage({
		container : 'container',
		width : $(document).width(),
		height : $(document).height()
	});

	var layer = new Kinetic.Layer();

	var ht = stage.getHeight() / 12;
	var wt = (ht * 2) / Math.sqrt(3);
	var wn = Math.floor(stage.getWidth() / wt);

	function p2p(i, j) {
		j = j + 6;
		i = i + (wn / 2) - 3;
		return {
			bx : (j / 2 + i) * wt,
			by : j * ht
		}
	}

	function drawUp(i, j) {
		var p = p2p(i, j);
		var aRet = [];
		aRet.push([p.bx, p.by]);
		aRet.push([p.bx - (wt / 2), p.by + ht]);
		aRet.push([p.bx + (wt / 2), p.by + ht]);
		aRet.push([p.bx, p.by]);
		return aRet;
	}

	function drawDown(i, j) {
		var p = p2p(i, j);
		var aRet = [];
		aRet.push([p.bx, p.by]);
		aRet.push([p.bx - (wt / 2), p.by - ht]);
		aRet.push([p.bx + (wt / 2), p.by - ht]);
		aRet.push([p.bx, p.by]);
		return aRet;
	}

	function drawHex(i, j, c) {
		var group = new Kinetic.Group();
		group.add(new Kinetic.Polygon({
			points : drawUp(i, j),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));
		group.add(new Kinetic.Polygon({
			points : drawDown(i, j + 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : drawUp(i, j - 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : drawDown(i, j),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : drawDown(i - 1, j + 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : drawUp(i + 1, j - 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		return group;
	}

	function drawPar(i0, j0, i1, j1, c) {
		var group = new Kinetic.Group();
		if (j1 < j0) {
			var t = j0;
			j0 = j1;
			j1 = t;
		}
		if (i1 < i0) {
			for (var j = j0; j < j1; j++)
				for (var i = i0 - j + j0 - 1; i1 + j1 - j - 1 < i; i--) {
					group.add(new Kinetic.Polygon({
						points : drawUp(i, j),
						fill : c,
						stroke : '#eee',
						strokeWidth : .4
					}));

					group.add(new Kinetic.Polygon({
						points : drawDown(i, j + 1),
						fill : c,
						stroke : '#eee',
						strokeWidth : .4
					}));
				}
		} else {
			for (var j = j0; j < j1; j++)
				for (var i = i0 + 1; i <= i1; i++) {
					group.add(new Kinetic.Polygon({
						points : drawUp(i, j),
						fill : c,
						stroke : '#eee',
						strokeWidth : .4
					}));
					group.add(new Kinetic.Polygon({
						points : drawDown(i - 1, j + 1),
						fill : c,
						stroke : '#eee',
						strokeWidth : .4
					}));
				}
		}
		return group;
	}


	layer.add(drawHex(-1, -4, '#5d5'));

	layer.add(drawPar(-2, -2, 3, 3, '#f55'));

	stage.add(layer);

	function animate() {

		requestAnimFrame(function() {
			animate();
		});
	}

	return {
		drawUp : drawUp,
		drawDown : drawDown
	}
});
