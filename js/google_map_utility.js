	function directionService() {
		var markerArray = [];
		var directionsService = new google.maps.DirectionsService;

		var stepDisplay = new google.maps.InfoWindow;
		directionsDisplay.setDirections({
			routes: []
		});

		calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);

	}

	function calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map) {
		for (var i = 0; i < markerArray.length; i++) {
			markerArray[i].setMap(null);
		}

		directionsService.route({
			origin: currentPosition,
			destination: searchCoord,
			travelMode: 'WALKING'
		}, function(response, status) {
			// Route the directions and pass the response to a function to create
			// markers for each step.
			if (status === 'OK') {
				document.getElementById('warnings-panel').innerHTML =
					'<b>' + response.routes[0].warnings + '</b>';
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	function customFunction() {
		google.maps.Circle.prototype.contains = function(latLng) {
			return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
		}
	}

	function clearSelection() {
		if (selectedShape) {
			selectedShape.setEditable(false);
			selectedShape = null;
		}
	}

	function setSelection(shape) {
		populateMarkerInside(shape);
		clearSelection();
		selectedShape = shape;
		shape.setEditable(true);
	}

	function populateMarkerInside(shape) {
		var aa = 0;
		var bb = 0;
		var cc = 0;
		
		containedMarkers.length = [];
		for (var x = 0; x < nearbyMarkers.length; x++) {
			var m = nearbyMarkers[x].lss;
			if (shape.getBounds().contains(new google.maps.LatLng(m[2], m[3]))) {
				aa += m[4];
				bb += m[5]
				cc += m[6];
				containedMarkers.push(m);
			}
		}
		
		alert('You have selected ' + containedMarkers.length + ' restaurants having an average revenues of ' + aa + ', average patrons/day of ' + bb + ' and average earnings/day of ' + cc) ;
	}

	function currentLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				currentPosition = pos;
				var marker = new google.maps.Marker;
				marker.setMap(map);
				marker.setPosition(pos);

				map.setCenter(pos);
			}, function() {
				handleLocationError(true, null, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, null, map.getCenter());
		}
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function createMarker(place) {
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			icon: 'images/dinning.png',
			animation: google.maps.Animation.DROP
		});
		
		var localStoreStatistics = [];
		localStoreStatistics.push(place.id);
		localStoreStatistics.push(place.name);
		localStoreStatistics.push(place.geometry.location.lat());	// location
		localStoreStatistics.push(place.geometry.location.lng());	// location
		localStoreStatistics.push(getRandomInt(1, 6));	// classification
		localStoreStatistics.push(getRandomInt(100, 20000));	// revenues
		localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day
		localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day
		
		localStoreStatistics.push(getRandomInt(100, 20000));	// revenues (2015)
		localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day (2015)
		localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day (2015)
		
		localStoreStatistics.push(getRandomInt(100, 20000));	// revenues (2014)
		localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day (2014)
		localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day (2014)
		storeStatistics.push(localStoreStatistics);
		
		var nm = new Object();
		nm.lss = localStoreStatistics;
		nm.marker = marker;
		
		nearbyMarkers.push(nm);
		nearbyMarkerEvent(place, marker);
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