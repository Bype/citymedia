define(['kinetic', 'shapebase'], function(k, sb) {

	var stage = new Kinetic.Stage({
		container : 'container',
		width : $(document).width(),
		height : $(document).height()
	});

	var layer = new Kinetic.Layer();

	var ht = stage.getHeight() / 12;
	var wt = (ht * 2) / Math.sqrt(3);
	var wn = Math.floor(stage.getWidth() / wt);

	sb.init({
		ht : ht,
		wt : wt,
		wn : wn
	});

	var center = sb.p2k(0, 0);
	
	layer.add(sb.drawDown(5, -2, '#d53'));
	layer.add( par = sb.drawPar(5, -2, -3, 2, '#5de'));
	layer.add(sb.drawUp(-3, 2, '#d53'));

	stage.add(layer);
	var angularSpeed = Math.PI / 2;
	var anim = new Kinetic.Animation(function(frame) {
		var time = frame.time, timeDiff = frame.timeDiff, frameRate = frame.frameRate;
		var angleDiff = frame.timeDiff * angularSpeed / 1000;
		//par.rotate(angleDiff);
		// update stuff
	}, layer);

	anim.start();

	return {
	}
});

