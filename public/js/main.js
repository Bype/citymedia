requirejs.config({
	paths : {
		underscore : 'lib/underscore',
		bootstrap : 'lib/bootstrap'
	},
	shim : {
		'underscore' : {
			exports : '_'
		}
	}
});

require(['jquery', 'underscore', 'bootstrap'], function($, _) {
	$(function() {

		window.requestAnimFrame = (function(callback) {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();

		var canvas = document.getElementById('myCanvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		var context = canvas.getContext('2d');
		var ht = canvas.height / 10;
		var wt = (ht * 2) / Math.sqrt(3);
		var wn = Math.floor(canvas.width / wt);

		var grads = [];
		for (var j = 0; j < 10; j++) {
			grads[j] = [];
			for (var i = 0; i <= wn; i++) {
				var bx = (j % 2 ? i * wt : (i * wt) + wt / 2);
				var by = j * ht;
				grads[j][i] = [];
				grads[j][i][0] = context.createLinearGradient(bx, by, bx + wt, by + ht);
				grads[j][i][0].addColorStop(0, '#' + (function co(lor) {
					return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
				})(''));
				grads[j][i][0].addColorStop(1, '#' + (function co(lor) {
					return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
				})(''));
				grads[j][i][1] = context.createLinearGradient(bx, by, bx + wt, by + ht);
				grads[j][i][1].addColorStop(0, '#' + (function co(lor) {
					return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
				})(''));
				grads[j][i][1].addColorStop(1, '#' + (function co(lor) {
					return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ? lor : co(lor);
				})(''));

			}
		}
		var frame = 0;
		var frmsign = +1;
		function animate() {
			frame += frmsign;
			if ((120 == frame) || (0 == frame))
				frmsign = -frmsign;

			for (var j = 0; j < 10; j++) {

				for (var i = 0; i <= wn; i++) {

					var bx = (j % 2 ? i * wt : (i * wt) + wt / 2);
					var by = j * ht;

					if (Math.random() < (frame / 120))
						context.fillStyle = grads[j][i][0];
					else
						context.fillStyle = "rgba(255,255,255," + (255 * (1 - (frame / 120))) + ")";
					context.beginPath();
					context.lineWidth = 1;
					context.strokeStyle = '#fff';
					context.globalAlpha = (frame / 120);
					context.moveTo(bx, by);
					context.lineTo(bx + (wt / 2), by + ht);
					context.lineTo(bx - (wt / 2), by + ht);
					context.lineTo(bx, by);
					context.fill();
					context.stroke();

					if (Math.random() < (frame / 120))
						context.fillStyle = grads[j][i][1];
					else
						context.fillStyle = "rgba(255,255,255," + (255 * (1 - (frame / 120))) + ")";
					context.beginPath();
					context.lineWidth = 1;
					context.strokeStyle = '#fff';
					context.globalAlpha = (frame / 120);
					context.moveTo(bx, by);
					context.lineTo(bx + wt, by);
					context.lineTo(bx + (wt / 2), by + ht);
					context.lineTo(bx, by);
					context.fill();
					context.stroke();

				}

			}
			requestAnimFrame(function() {
				animate();
			});
		}

		animate();
	});
});
