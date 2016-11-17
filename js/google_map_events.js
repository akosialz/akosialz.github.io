	function showRestaurants() {
		// classificationRestaurant.selectedIndex = 0;
		// ddlChart.disabled=false;
		finalStatistics = [];
			// handleAuthClick();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
				location: new google.maps.LatLng(current.getPosition().lat(), current.getPosition().lng()),
				radius: 500,
				type: ['restaurant']
			}, callback);

		// document.getElementById("classificationRestaurant").style.display = 'inline';
	}

	function callback(results, status, pagination) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) return;
		else if (status === google.maps.places.PlacesServiceStatus.OK) {

			// checkAuth();
			// storeStatistics = [];

			for (var i = 0; i < results.length; i++) {
				var place = results[i];
				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location,
					icon: 'images/dinning.png',
					animation: google.maps.Animation.DROP
				});

				// var localStoreStatistics = [];
				// localStoreStatistics.push(place.id);
				// localStoreStatistics.push(place.name);
				// localStoreStatistics.push(place.geometry.location.lat());	// location
				// localStoreStatistics.push(place.geometry.location.lng());	// location
				// localStoreStatistics.push(getRandomInt(1, 6));	// classification
				// localStoreStatistics.push(getRandomInt(100, 20000));	// revenues
				// localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day
				// localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day
				//
				// localStoreStatistics.push(getRandomInt(100, 20000));	// revenues (2015)
				// localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day (2015)
				// localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day (2015)
				//
				// localStoreStatistics.push(getRandomInt(100, 20000));	// revenues (2014)
				// localStoreStatistics.push(getRandomInt(100, 20000));	// patrons/day (2014)
				// localStoreStatistics.push(getRandomInt(100, 20000));	// earnings/day (2014)
				// storeStatistics.push(localStoreStatistics);
				//
				// var nm = new Object();
				// nm.lss = localStoreStatistics;
				// nm.marker = marker;
				//
				// nearbyMarkers.push(nm);
				nearbyMarkerEvent(place, marker);
			}

			if (pagination.hasNextPage) {

      }
			// cleanStoreArray();
		}
	}

	function nearbyMarkerEvent(place, marker) {
		google.maps.event.addListener(marker, 'click', function() {
			var service = new google.maps.places.PlacesService(map);
			service.getDetails(
				{ placeId: place.place_id },
				function(place, status) {
					// callback function in getting the details given the place id
          if (status === google.maps.places.PlacesServiceStatus.OK) {
						var infowindow = new google.maps.InfoWindow();
						var markerObj = new Object();
						markerObj.marker = marker;
						markerObj.details = place;
						markerObj.stats = '';	// FEALRONE ALAJAS
						all_markers.push(markerObj);
						console.log(place);

						// add checking if properties is undefined or not
						var content = '<div><h4>'+
							place.name+'</h4><p>'+
							place.formatted_address+'</p><p>'+
							place.formatted_phone_number+'</p><p>classification part</p><p>'+
							place.rating+'</p><p>'+
							place.url+'</p></div>';
						infowindow.setContent(content);
						infowindow.open(map, marker);
						// searchCoord = this.getPosition();
						// directionService();
          }
        });

			// var marker = new google.maps.Marker({
			// 	map: map,
			// 	position: place.geometry.location,
			// 	icon: 'images/dinning.png',
			// 	animation: google.maps.Animation.DROP
			// });
			//
			// google.maps.event.addListener(marker, 'click', function() {
			// 	var infowindow = new google.maps.InfoWindow();
			// 	infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
			// 		'Place ID: ' + place.place_id + '<br>' +
			// 		place.formatted_address + '</div>');
			// 	infowindow.open(map, this);
			// 	directionService();
			// });


			// var placeInfo = findPlace(place);
			// var infowindow = new google.maps.InfoWindow();
			// var content = '<div><div>'+place.name+'</div><div>'+identifyType(placeInfo[4])+'</div><div>Revenues:'+placeInfo[5]+'</div><div>Patrons/day:'+placeInfo[6]+'</div><div>Earnings/day:'+placeInfo[7]+'</div></div>';
			// infowindow.setContent(content);
			// infowindow.open(map, this);
			// searchCoord = this.getPosition();
			// directionService();
		});
	}

	function addFunctionSearchbox() {
		map.addListener('bounds_changed', function() {
			searchbox.setBounds(map.getBounds());
		});

		searchbox.addListener('places_changed', function() {
			var places = searchbox.getPlaces();
			if (places.length == 0) {
				return;
			}

			// markers.forEach(function(marker) {
			// 	marker.setMap(null);
			// });
			var bounds = new google.maps.LatLngBounds();
			places.forEach(function(place) {
				if (!place.geometry) {
					console.log("Returned place contains no geometry");
					return;
				}

				// var icon = {
				// 	url: place.icon,
				// 	size: new google.maps.Size(71, 71),
				// 	origin: new google.maps.Point(0, 0),
				// 	anchor: new google.maps.Point(17, 34),
				// 	scaledSize: new google.maps.Size(25, 25)
				// };

				search_marker = new google.maps.Marker({
					map: null,
					// icon: icon,
					title: place.name,
					position: place.geometry.location,
					animation: google.maps.Animation.DROP
				});

				// Create a marker for each place.
				// markers.push(search_marker);
				searchCoord = place.geometry.location;
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}

			});

			startDirection = new google.maps.LatLng(current.getPosition().lat(), current.getPosition().lng());
			endDirection = searchCoord;
			directionService();
			map.fitBounds(bounds);
		});
	}

	function drawingManagerEvent() {
		// google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
		// 	if (e.type == google.maps.drawing.OverlayType.CIRCLE) {
		// 		drawingManager.setDrawingMode(null);
		//
		// 		setSelection(newShape);
		//
		// 		google.maps.event.addListener(newShape, 'click', function() {
    //           setSelection(newShape);
    //       });
		// 	}
		// });
	}

	function deleteOverlays() {
		console.log(all_markers);
		directionsDisplay.setMap(null);
		for(var i=0;i<all_markers.length;i++) all_markers[i].marker.setMap(null);
	}

//----------------------------------------------------------------------------------------------------------------------------

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
