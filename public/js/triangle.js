define(['kinetic'], function() {
	var canvas = document.getElementById('myCanvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var context = canvas.getContext('2d');
	var ht = canvas.height / 12;
	var wt = (ht * 2) / Math.sqrt(3);
	var wn = Math.floor(canvas.width / wt);

	function p2p(i, j) {
		j = j + 6;
		i = i + (wn / 2) - 3;
		return {
			bx : (j / 2 + i) * wt,
			by : j * ht
		}
	}

	function drawUp(i, j, c) {
		var p = p2p(i, j);
		context.beginPath();
		context.fillStyle = c;
		context.lineWidth = 1;
		context.strokeStyle = '#aaa';
		context.moveTo(p.bx, p.by);
		context.lineTo(p.bx + (wt / 2), p.by + ht);
		context.lineTo(p.bx - (wt / 2), p.by + ht);
		context.lineTo(p.bx, p.by);
		context.fill();
		context.stroke();
	}

	function drawDown(i, j, c) {
		var p = p2p(i, j);
		context.beginPath();
		context.fillStyle = c;
		context.lineWidth = 1;
		context.strokeStyle = '#aaa';
		context.moveTo(p.bx, p.by);
		context.lineTo(p.bx - (wt / 2), p.by - ht);
		context.lineTo(p.bx + (wt / 2), p.by - ht);
		context.lineTo(p.bx, p.by);
		context.fill();
		context.stroke();
	}

	function writeDownCenter(i, j, c, t) {
		var p = p2p(i, j);
		context.font = '10pt sans';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = c;
		context.fillText(t, p.bx, p.by + (ht / Math.sqrt(3)));
	}

	function writeUpCenter(i, j, c, t) {
		var p = p2p(i, j);

		context.font = '10pt sans';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.fillStyle = c;
		context.fillText(t, p.bx, p.by - (ht / Math.sqrt(3)));
	}

	function drawHex(i, j, c) {
		drawUp(i, j, c);
		drawDown(i, j, c);
		drawDown(i, j + 1, c);
		drawUp(i, j - 1, c);

		drawDown(i - 1, j + 1, c);
		drawUp(i + 1, j - 1, c);
	}

	function drawPar(i0, j0, i1, j1, c) {

		if (j1 < j0) {
			var t = j0;
			j0 = j1;
			j1 = t;
		}
		if (i1 < i0) {
			for (var j = j0; j < j1; j++)
				for (var i = i0 - j + j0 - 1; i1 + j1 - j - 1 < i; i--) {
					console.log(i, j);
					drawUp(i, j, c);
					drawDown(i, j + 1, c);
					writeDownCenter(i, j, '#fff', i + ',' + j)
				}
		} else {
			for (var j = j0; j < j1; j++)
				for (var i = i0 + 1; i <= i1; i++) {
					drawUp(i, j, c);
					drawDown(i - 1, j + 1, c);
				}
		}
	}

	function animate() {

		requestAnimFrame(function() {
			animate();
		});
	}

	drawHex(0, 0, '#f55');

	return {
		drawUp : drawUp,
		drawDown : drawDown
	}
});
