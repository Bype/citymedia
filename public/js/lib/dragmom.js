define([], function() {

	dragMoment = function() {
		var howMuch = 180;
		// change this for greater or lesser momentum
		var minDrift = 4;
		//  minimum drift after a drag move

		var containerPadding = [50, 50, 50, 50];
		// top, right, bottom, left
		//  how near an edge can we get before the spring-back motion happens?
		//  positive numbers give a "padding" to the container (or window),
		//  negative numbers allow the dragged div to slide some distance outside

		var easeType = 'easeOutQuad';

		//  The standard ease types are 'linear' and 'swing'
		//  jQuery UI includes the following:  'easeInQuad',
		//  'easeOutQuad',  'easeInOutQuad',  'easeInCubic',
		//  'easeOutCubic',  'easeInOutCubic',  'easeInQuart',
		//  'easeOutQuart',  'easeInOutQuart', 'easeInQuint',
		//  'easeOutQuint',  'easeInOutQuint',  'easeInSine',
		//  'easeOutSine',  'easeInOutSine',  'easeInExpo',
		//  'easeOutExpo',  'easeInOutExpo',  'easeInCirc',
		//  'easeOutCirc',  'easeInOutCirc',  'easeInElastic',
		//  'easeOutElastic',  'easeInOutElastic',  'easeInBack',
		//  'easeOutBack',  'easeInOutBack',  'easeInBounce',
		//  'easeOutBounce',  'easeInOutBounce'
		//  Also see this page for a great display of the easing types.
		//  http://jqueryui.com/demos/effect/#easing

		//  No user options below this point.

		var dXa = [0];
		var dYa = [0];
		var dTa = [0];

		return {
			cPadding : containerPadding, // top, right, bottom, left
			bounds : {},
			uid : 'dragMoID_',
			uindex : 1,

			setBounds : function(elemID, containment, bbWidth, bbHeight) {
				dragMoment.bounds[elemID] = [];
				if (!containment) {// make the window the container, calibrate the boundaries
					var dokWidth = $(window).width();
					var dokHeight = $(window).height();
					dragMoment.bounds[elemID][0] = dragMoment.cPadding[0];
					dragMoment.bounds[elemID][1] = parseInt($(window).width() - (dragMoment.cPadding[1] + bbWidth));
					dragMoment.bounds[elemID][2] = parseInt($(window).height() - (dragMoment.cPadding[2] + bbHeight));
					dragMoment.bounds[elemID][3] = dragMoment.cPadding[3];
				} else {// container was set, so calibrate the boundaries
					var cOffset = $(containment).offset();
					var cWidth = $(containment).outerWidth();
					var cHeight = $(containment).outerHeight();
					var bTop = parseInt(cOffset.top + dragMoment.cPadding[0]);
					var bRight = parseInt((cOffset.left + cWidth) - (dragMoment.cPadding[1] + bbWidth));
					var bBottom = parseInt((cOffset.top + cHeight) - (dragMoment.cPadding[2] + bbHeight));
					var bLeft = parseInt(cOffset.left + dragMoment.cPadding[3]);
					dragMoment.bounds[elemID] = [bTop, bRight, bBottom, bLeft];
					// turn off containment, it's now handled by the dragMomentum.
					$('#' + elemID).draggable("option", 'containment', '');
				}
			},

			start : function(elemId, Xa, Ya, Ta) {
				dXa[elemId] = Xa;
				dYa[elemId] = Ya;
				dTa[elemId] = Ta;
				$('#' + elemId).data('moveCheck', 1);
				$(".content").hide();
			}, // END dragMoment.start()

			stop : function(elemId, Xb, Yb, Tb) {
				//  record X and Y position, and the time when user stopped dragging.
				var Xa = dXa[elemId];
				var Ya = dYa[elemId];
				var Ta = dTa[elemId];
				var Xc = 0;
				var Yc = 0;
				var boundaryTop = dragMoment.bounds[elemId][0];
				var boundaryRight = dragMoment.bounds[elemId][1];
				var boundaryBottom = dragMoment.bounds[elemId][2];
				var boundaryLeft = dragMoment.bounds[elemId][3];

				var dDist = Math.sqrt(Math.pow(Xa - Xb, 2) + Math.pow(Ya - Yb, 2));
				var dTime = Tb - Ta;
				var dSpeed = dDist / dTime;
				dSpeed = Math.round(dSpeed * 100) / 100;

				var distX = Math.abs(Xa - Xb);
				var distY = Math.abs(Ya - Yb);

				var dVelX = (minDrift + (Math.round(distX * dSpeed * howMuch / (distX + distY))));
				var dVelY = (minDrift + (Math.round(distY * dSpeed * howMuch / (distX + distY))));

				var position = $('#' + elemId).position();
				var locX = position.left;
				var locY = position.top;

				if (Xa > Xb) {// we are moving left
					Xc = locX - dVelX;
				} else {//  we are moving right
					Xc = locX + dVelX;
				}

				if (Ya > Yb) {// we are moving up
					Yc = (locY - dVelY);
				} else {// we are moving down
					Yc = (locY + dVelY);
				}

				// Boundary Check
				if (Xc > boundaryLeft) {
					Xc = boundaryLeft;
				}
				if (Xc < boundaryRight) {
					Xc = boundaryRight;
				}

				if (Yc > boundaryTop) {
					Yc = boundaryTop;
				}
				if (Yc < boundaryBottom) {
					Yc = boundaryBottom;
				}

				var newLocX = Xc + 'px';
				var newLocY = Yc + 'px';

				$('#' + elemId).animate({
					left : newLocX,
					top : newLocY,
					useTranslate3d : true
				}, 500, easeType, function() {
					$(".content").fadeIn();
				});

			} // END  dragMoment.stop()
		};
		// END returned (public) functions
	}();
	// END dragMoment

	jQuery.fn.dragMomentum = function() {
		$(this).each(function() {
			$(this).css('position', 'absolute');
			if (!$(this).attr('id')) {
				// make sure the element has an ID, assign if necessary
				$(this).attr('id', (dragMoment.uid + dragMoment.uindex));
				dragMoment.uindex++;
			}
			var containment = $(this).draggable("option", 'containment');
			var bbWidth = $(this).outerWidth();
			var bbHeight = $(this).outerHeight();
			dragMoment.setBounds(this.id, containment, bbWidth, bbHeight);

			var startOptions = function(e, ui) {
				dragMoment.start(this.id, e.clientX, e.clientY, e.timeStamp);
			};
			var stopOptions = function(e, ui) {
				dragMoment.stop(this.id, e.clientX, e.clientY, e.timeStamp);
			};
			$(this).draggable("option", 'start', startOptions);
			$(this).draggable("option", 'stop', stopOptions);
		});
		return $(this);
	};
	// END jquery .dragMomentum();
});
