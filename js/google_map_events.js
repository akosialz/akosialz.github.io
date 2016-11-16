	function onChangeDDL() {
		for(var i=0;i<nearbyMarkers.length;i++) {
			var marker = nearbyMarkers[i].marker;
			var data = nearbyMarkers[i].lss;
			if (ddl.options[ddl.selectedIndex].value == "0") {
				marker.setMap(map);
			} else {
				if (data[4] != parseInt(ddl.options[ddl.selectedIndex].value)) marker.setMap(null);
				else marker.setMap(map);
			}
			
		}
	}

	function onChangeChart() {
		switch(ddlChart.options[ddlChart.selectedIndex].value) {
			case "1": drawAreaChart(); break;
			case "2": drawLineChart(); break;
			case "3": drawPieChart(); break;
			case "4": drawComboChart(); break;
		}
	}

	function addFunctionSearchbox() {
		map.addListener('bounds_changed', function() {
			searchbox.setBounds(map.getBounds());
		});

		var markers = [];
		searchbox.addListener('places_changed', function() {
			var places = searchbox.getPlaces();
			if (places.length == 0) {
				return;
			}

			markers.forEach(function(marker) {
				marker.setMap(null);
			});
			markers = [];

			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}

				var icon = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				// Create a marker for each place.
				markers.push(new google.maps.Marker({
					map: map,
					icon: icon,
					title: place.name,
					position: place.geometry.location,
					animation: google.maps.Animation.DROP
				}));

				searchCoord = place.geometry.location;
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}

			});
			directionService();
			map.fitBounds(bounds);
		});
	}

	function nearbyMarkerEvent(place, marker) {
		google.maps.event.addListener(marker, 'click', function() {
			var placeInfo = findPlace(place);
			var infowindow = new google.maps.InfoWindow();
			var content = '<div><div>'+place.name+'</div><div>'+identifyType(placeInfo[4])+'</div><div>Revenues:'+placeInfo[5]+'</div><div>Patrons/day:'+placeInfo[6]+'</div><div>Earnings/day:'+placeInfo[7]+'</div></div>';
			infowindow.setContent(content);
			infowindow.open(map, this);
			searchCoord = this.getPosition();
			directionService();
		});
	}

	function showRestaurants() {
		classificationRestaurant.selectedIndex = 0;
		ddlChart.disabled=false;
		finalStatistics = [];
			handleAuthClick();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
				location: currentPosition,
				radius: 500,
				type: ['restaurant']
			}, callback);
			
		document.getElementById("classificationRestaurant").style.display = 'inline';
	}

	function callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			checkAuth();
			storeStatistics = [];
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
			
			
			cleanStoreArray();
		}
	}

	function drawingManagerEvent() {
		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
			all_overlays.push(e);
			if (e.type == google.maps.drawing.OverlayType.CIRCLE) {
				drawingManager.setDrawingMode(null);

				var newShape = e.overlay;
				newShape.type = e.type;
				google.maps.event.addListener(newShape, 'click', function() {
					setSelection(newShape);
				});

				google.maps.event.addListener(newShape, "rightclick", function() {
					this.setMap(null);
				});

				setSelection(newShape);
			}
		});
	}