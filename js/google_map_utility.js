
// add a marker based on your current geological location.
function currentLocation() {

	if (navigator.geolocation) {
		if (current == null) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				marker = new google.maps.Marker({
					map: map,
					icon: 'images/you.png',
					title: 'You are here!',
					position: pos,
					animation: google.maps.Animation.DROP
				});

				marker.setMap(map);
				marker.setPosition(pos);
				map.setCenter(pos);
				current = marker;

			}, function() {
				handleLocationError(true, null, map.getCenter());
			});

		} else {
			current.setMap(null);
			current = null;
		}
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, null, map.getCenter());
	}
}

	function directionService() {
		var markerArray = [];
		var directionsService = new google.maps.DirectionsService;
		directionsDisplay.setMap(map);
		directionsDisplay.setDirections({
			routes: []
		});

		calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, map);
	}

	function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, map) {
		for (var i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}

		directionsService.route({
			// origin: new google.maps.LatLng(current.getPosition().lat(), current.getPosition().lng()),
			// destination: searchCoord,
			origin: startDirection,
			destination: endDirection,
			travelMode: 'WALKING'
		}, function(response, status) {
			// Route the directions and pass the response to a function to create
			// markers for each step.
			if (status === 'OK') {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	function getLocationOnClick(elem) {

		if (elem.value == "") {
			// first click in the map gets the coordinates of it
			inputId = elem.id;
			getCoordinateFlag = true;
		}
	}

	function setSelection(shape) {
		populateMarkerInside(shape);
		shape.setMap(null);
	}

	function populateMarkerInside(shape) {
		var aa = 0;
		var bb = 0;
		var cc = 0;

		var containedMarkers = [];
		console.log(all_markers);
		for (var x = 0; x < all_markers.length; x++) {
			var m = all_markers[x];
			if (shape.getBounds().contains(new google.maps.LatLng(m.getPosition().lat(), m.getPosition().lng()))) {
				aa += m.revenues;
				bb += m.patronsDay;
				cc += m.earningsDay;
				containedMarkers.push(m);
			}
		}

		document.getElementById('set1').innerHTML = containedMarkers.length;
		document.getElementById('set2').innerHTML = aa / containedMarkers.length;
		document.getElementById('set3').innerHTML = bb / containedMarkers.length;
		document.getElementById('set4').innerHTML = cc / containedMarkers.length;
		console.log('You have selected ' + containedMarkers.length + ' restaurants having an average revenues of ' + aa + ', average patrons/day of ' + bb + ' and average earnings/day of ' + cc) ;
	}

	function customFunction() {
		google.maps.Circle.prototype.contains = function(latLng) {
			return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
		}
	}

	function identifyType(t) {
		switch(t) {
			case 1: return "Ethnic"; break;
			case 2: return "Fast Food"; break;
			case 3: return "Fast Casual"; break;
			case 4: return "Casual Dining"; break;
			case 5: return "Fine Dining"; break;
		}
		return "Ethnic";
	}

	function identifyTypeIcon(t) {
		switch(t) {
			case 1: return "images/ethnic.png"; break;
			case 2: return "images/fastfood.png"; break;
			case 3: return "images/fastcasual.png"; break;
			case 4: return "images/casualdining.png"; break;
			case 5: return "images/finedining.png"; break;
		}
		return "images/ethnic.png";
	}

	function showChart(r,pd,ed,r4,pd4,ed4,r5,pd5,ed5) {
		drawLineChart(r,pd,ed,r4,pd4,ed4,r5,pd5,ed5);

	}

//----------------------------------------------------------------------------------------------------------------------------


	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function cleanStoreArray() {

		if (fetchedStatistics.length == 0) {
			finalStatistics = storeStatistics.slice(0);
		}

		for(var x = 0; x<fetchedStatistics.length; x++) {
			var flag = false;
			var a = fetchedStatistics[0];
			for(var y = 0; y<storeStatistics.length; y++) {
				var b = storeStatistics[y];
				if (a[0] == b[0]) {
					flag = true;
					break;
				}
			}

			if (!flag) {
				finalStatistics.push(a);
			}
		}

	}

	function findPlace(place) {
		var z = [];
		for(var x = 0; x < finalStatistics.length; x++) {
			var y = finalStatistics[x];
			if (place.id == y[0]) {
				z = y;
				break;
			}
		}
		return z;
	}
