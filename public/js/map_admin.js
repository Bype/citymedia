define([], function() {
	return {
		setup : function() {
			var mapOptions = {
				center : new google.maps.LatLng(43.5296189, 5.4438398),
				zoom : 13,
				mapTypeId : google.maps.MapTypeId.TERRAIN
			};

			$('#geofind').click(function() {

				function setPos(pos) {
					$('#geolat').val(pos.lb);
					$('#geolon').val(pos.mb);
					marker.setPosition(pos);
					map.panTo(pos);
				}

				var marker;
				var geocoder;
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
						};
						setPos(results[0].geometry.location);
					} else {
						alert('Geocode was not successful for the following reason: ' + status);
					}
				});
				$('#mapcont').fadeIn();
			});
		}
	};
});
