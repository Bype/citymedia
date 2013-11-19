define([], function() {
	var marker;

	var setPos = function(pos) {
		$('#geolat').val(pos.lat());
		$('#geolon').val(pos.lng());
		marker.setPosition(pos);
		map.panTo(pos);
		console.log(pos);
	};

	return {
		setPos : setPos,
		setup : function() {
			var mapOptions = {
				center : new google.maps.LatLng(43.5296189, 5.4438398),
				zoom : 13,
				mapTypeId : google.maps.MapTypeId.TERRAIN
			};

			$('#geofind').click(function() {

				if (!map) {
					map = new google.maps.Map(document.getElementById("mapcanvas"), mapOptions);
					google.maps.event.addListener(map, 'click', function(e) {
						setPos(e.latLng);
					});
					geocoder = new google.maps.Geocoder();
				}

				var address = document.getElementById('address').value;
				geocoder.geocode({
					'address' : address
				}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (!marker) {
							marker = new google.maps.Marker({
								map : map,
								position : results[0].geometry.location
							});
						} else {
							setPos(results[0].geometry.location);
						}
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
				$('#mapcont').fadeIn();
			});
		}
	};
});
