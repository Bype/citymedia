define(['kinetic', 'graphic/shapebase'], function(k, sb) {

	var stage;
	/*
	 var angularSpeed = Math.PI / 2;
	 var anim = new Kinetic.Animation(function(frame) {
	 var time = frame.time, timeDiff = frame.timeDiff, frameRate = frame.frameRate;
	 var angleDiff = frame.timeDiff * angularSpeed / 1000;
	 // update stuff
	 }, layer);

	 anim.start();
	 */
	return {
		init : function() {
			stage = new Kinetic.Stage({
				container : 'graphic',
				width : $(document).width(),
				height : $(document).height()
			});

			var ht = stage.getHeight() / 12;
			var wt = (ht * 2) / Math.sqrt(3);
			var wn = Math.floor(stage.getWidth() / wt);

			sb.init({
				ht : ht,
				wt : wt,
				wn : wn
			});
			return stage;
		}
	}
});

