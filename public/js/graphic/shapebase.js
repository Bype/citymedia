define([], function() {
	var ht, wt, wn;

	var debug = false;

	function init(c) {
		ht = c.ht;
		wt = c.wt;
		wn = c.wn;
	}

	function p2p(i, j) {
		return {
			bx : (j / 2 + i) * wt,
			by : j * ht
		}
	}

	function p2k(i, j) {
		j = j + 6;
		i = i + (wn / 2) - 3;
		return {
			bx : (j / 2 + i) * wt,
			by : j * ht
		}
	}

	function tUp(i, j) {
		var p = p2p(i, j);
		var aRet = [];
		aRet.push([p.bx, p.by]);
		aRet.push([p.bx - (wt / 2), p.by + ht]);
		aRet.push([p.bx + (wt / 2), p.by + ht]);
		aRet.push([p.bx, p.by]);
		return aRet;
	}

	function drawUp(i, j, c) {
		var p = p2k(i, j);

		var group = new Kinetic.Group({
			x : p.bx,
			y : p.by
		});
		group.add(new Kinetic.Polygon({
			points : tUp(0, 0),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		if (debug) {
			var tdbg = new Kinetic.Text({
				x : 0,
				y : (ht / Math.sqrt(3)),
				text : i + ',' + j,
				fontSize : 10,
				fontFamily : 'sans',
				fill : '#fff',
				align : 'center',
			});
			tdbg.setOffset({
				x : tdbg.getWidth() / 2
			});
			group.add(tdbg);
		}
		return group;
	}

	function tDown(i, j) {
		var p = p2p(i, j);
		var aRet = [];
		aRet.push([p.bx, p.by]);
		aRet.push([p.bx - (wt / 2), p.by - ht]);
		aRet.push([p.bx + (wt / 2), p.by - ht]);
		aRet.push([p.bx, p.by]);
		return aRet;
	}

	function drawDown(i, j, c) {
		var p = p2k(i, j);

		var group = new Kinetic.Group({
			x : p.bx,
			y : p.by
		});
		group.add(new Kinetic.Polygon({
			points : tDown(0, 0),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4,

		}));

		if (debug) {
			var tdbg = new Kinetic.Text({
				x : 0,
				y : -(ht / Math.sqrt(3)),
				text : i + ',' + j,
				fontSize : 10,
				fontFamily : 'sans',
				fill : '#fff',
				align : 'center',
			});
			tdbg.setOffset({
				x : tdbg.getWidth() / 2
			});
			group.add(tdbg);
		}

		return group;
	}

	function drawHex(i, j, c) {
		var p = p2k(i, j);

		var group = new Kinetic.Group({
			x : p.bx,
			y : p.by

		});
		group.add(new Kinetic.Polygon({
			points : tUp(0, 0),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));
		group.add(new Kinetic.Polygon({
			points : tDown(0, 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : tUp(0, -1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : tDown(0, 0),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : tDown(-1, 1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		group.add(new Kinetic.Polygon({
			points : tUp(1, -1),
			fill : c,
			stroke : '#eee',
			strokeWidth : .4
		}));

		return group;
	}

	function drawParDown(i0, j0, i1, j1, c, imgsrc) {
		var group;
		var p = p2k(i0, j0);
		group = new Kinetic.Group({
			x : p.bx,
			y : p.by,

		});
		var base = {
			stroke : '#eee',
			strokeWidth : .1,
			opacity : 1
		}
		if (imgsrc) {
			base.fillPatternImage = imgsrc;
			base.fillPatternRepeat = "no-repeat";
			base.fill = null;
		} else {
			base.fill = c;
		}
		for (var j = 0; j < j1; j++)
			for (var i = 1; i <= i1; i++) {
				base.points = tUp(i, j);
				group.add(new Kinetic.Polygon(base));
				base.points = tDown(i - 1, j + 1);
				group.add(new Kinetic.Polygon(base));
			}
		return group;
	}

	function drawParUp(i0, j0, i1, j1, c, imgsrc) {

		var group;
		var p = p2k(i0, j0);

		group = new Kinetic.Group({
			x : p.bx,
			y : p.by,

		});
		var base = {
			stroke : '#eee',
			strokeWidth : .1,
			opacity : 1
		}

		if (imgsrc) {
			base.fillPatternImage = imgsrc;
			base.fillPatternRepeat = "no-repeat";
			base.fillPatternOffset = [0, j1*ht];
			base.fill = null;
		} else {
			base.fill = c;
		}

		for (var j = 1; j <= j1; j++)
			for (var i = 0; i < i1; i++) {

				base.points = tUp(i + j, -j);
				group.add(new Kinetic.Polygon(base));
				base.points = tDown(i + j, 1 - j);
				group.add(new Kinetic.Polygon(base));
			}
		return group;
	}

	function writeUp(i, j, c, t, s) {
		var p = p2k(i, j);
		var ret = new Kinetic.Text({
			x : p.bx,
			y : p.by - (2 * ht / 3),
			text : t,
			fontSize : ht * s / 100,
			fontSize : ht * s / 100,
			fontFamily : 'Dosis',
			fill : c,
			align : 'left',
			opacity : 0
		});
		return ret;
	}

	function writeDown(i, j, c, t, s) {
		var p = p2k(i, j);
		var ret = new Kinetic.Text({
			x : p.bx,
			y : p.by + (ht / 3),
			text : t,
			fontSize : ht * s / 100,
			fontFamily : 'Dosis',
			fill : c,
			align : 'left',
			opacity : 0
		});
		return ret;
	}

	return {
		init : init,
		p2p : p2p,
		p2k : p2k,
		drawUp : drawUp,
		drawDown : drawDown,
		drawHex : drawHex,
		drawParUp : drawParUp,
		drawParDown : drawParDown,
		writeUp : writeUp,
		writeDown : writeDown
	}
});
