	function showRestaurants() {
		// classificationRestaurant.selectedIndex = 0;
		// ddlChart.disabled=false;
		// finalStatistics = [];
			// handleAuthClick();

			if (hasPage = true) {
				var localLat;
				var localLng;

				if (current == null) {
					localLat = DEFAULT_FROM_LAT;
					localLng = DEFAULT_FROM_LNG;
				} else {
					localLat = current.getPosition().lat();
					localLng = current.getPosition().lng();
				}
				var service = new google.maps.places.PlacesService(map);
				service.nearbySearch({
					location: new google.maps.LatLng(localLat, localLng),
					radius: 500,
					type: ['restaurant']
				}, callback);
			}

		// document.getElementById("classificationRestaurant").style.display = 'inline';
	}

	function handleCheckbox(chkbox) {

		if (chkbox.id == "checkbox1") {
			var c1 = document.getElementById("checkbox1");
			if (c1.checked){
				for(var j = 1; j < 6; j++) document.getElementById("checkbox" + (j + 1)).checked = true;
			} else {
				for(var j = 1; j < 6; j++) document.getElementById("checkbox" + (j + 1)).checked = false;
			}
		}

		for(var i = 0; i < all_markers.length; i++) {
			var am = all_markers[i];
			if (document.getElementById("checkbox2").checked && am.classification == 2) am.setVisible(true);
			else if (document.getElementById("checkbox3").checked && am.classification == 3) am.setVisible(true);
			else if (document.getElementById("checkbox4").checked && am.classification == 4) am.setVisible(true);
			else if (document.getElementById("checkbox5").checked && am.classification == 5) am.setVisible(true);
			else if (document.getElementById("checkbox6").checked && am.classification == 6) am.setVisible(true);
			else am.setVisible(false);

			all_markers[i] = am;
		}

	}

	function callback(results, status, pagination) {
		if (status !== google.maps.places.PlacesServiceStatus.OK) return;
		else if (status === google.maps.places.PlacesServiceStatus.OK) {

			// checkAuth();
			// storeStatistics = [];
			writeData = [];
			for (var i = 0; i < results.length; i++) {
				var place = results[i];
				var hasDup = false;
				var j = 0;

				for (; j < sheetData.length; j++) {
					if ((sheetData[j])[0] == place.place_id) {
						hasDup = true;
					}
				}

				var classification;
				var revenues;
				var patronsDay;
				var earningsDay;

				var revenues5;
				var patronsDay5;
				var earningsDay5;

				var revenues4;
				var patronsDay4;
				var earningsDay4;

				if (!hasDup) {
					var locCopy = [];
					classification = getRandomInt(1, 6);
					revenues = getRandomInt(100, 20000);
					patronsDay = getRandomInt(100, 20000);
					earningsDay = getRandomInt(100, 20000);
					revenues5 = getRandomInt(100, 20000);
					patronsDay5 = getRandomInt(100, 20000);
					earningsDay5 = getRandomInt(100, 20000);
					revenues4 = getRandomInt(100, 20000);
					patronsDay4 = getRandomInt(100, 20000);
					earningsDay4 = getRandomInt(100, 20000);

					locCopy.push(place.id);
					locCopy.push(place.name);
					locCopy.push(place.geometry.location.lat());	// location
					locCopy.push(place.geometry.location.lng());	// location
					locCopy.push(classification);	// classification
					locCopy.push(revenues);	// revenues
					locCopy.push(patronsDay);	// patrons/day
					locCopy.push(earningsDay);	// earnings/day

					locCopy.push(revenues5);	// revenues (2015)
					locCopy.push(patronsDay5);	// patrons/day (2015)
					locCopy.push(earningsDay5);	// earnings/day (2015)

					locCopy.push(revenues4);	// revenues (2014)
					locCopy.push(patronsDay4);	// patrons/day (2014)
					locCopy.push(earningsDay4);	// earnings/day (2014)
					writeData.push(locCopy);
				} else {
					// REVIEW!
					classification = (sheetData[j])[4];
					revenues = (sheetData[j])[5];
					patronsDay = (sheetData[j])[6];
					earningsDay = (sheetData[j])[7];
					revenues5 = (sheetData[j])[8];
					patronsDay5 = (sheetData[j])[9];
					earningsDay5 = (sheetData[j])[10];
					revenues4 = (sheetData[j])[11];
					patronsDay4 = (sheetData[j])[12];
					earningsDay4 = (sheetData[j])[13];
				}
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

				var marker = new google.maps.Marker({
					map: map,
					position: place.geometry.location,
					icon: identifyTypeIcon(classification),
					animation: google.maps.Animation.DROP
				});

				marker.classification = classification;
				marker.revenues = revenues;
				marker.patronsDay = patronsDay;
				marker.earningsDay = earningsDay;
				marker.revenues5 = revenues5;
				marker.patronsDay5 = patronsDay5;
				marker.earningsDay5 = earningsDay5;
				marker.revenues4 = revenues4;
				marker.patronsDay4 = patronsDay4;
				marker.earningsDay4 = earningsDay4;
				nearbyMarkerEvent(place, marker);

				all_markers.push(marker);
			}

			checkAuthWrite();

			if (pagination.hasNextPage) {
				// document.getElementById("showBtn").disabled = false;
				// document.getElementById("showBtn").removeEventListener("onClick", function () {
				// 	console.log(pagination + " a");
				// 	var showBtn = document.getElementById("showBtn");
				// 	showBtn.addEventListener("onClick", function() {
				// 			console.log(pagination);
				// 			showBtn.disabled = true;
				// 			pagination.nextPage();
				// 	});
				// });
				pagination.nextPage();
      } else {
				hasPage = false;
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
						// var markerObj = new Object();
						// markerObj.marker = marker;
						// markerObj.details = place;
						// cRestaurant
						// all_markers.push(markerObj);
						// console.log('atay' + all_markers);
						// add checking if properties is undefined or not
						var cRestaurant = identifyType(marker.classification);

						var revenues = JSON.stringify(marker.revenues);
						var patronsDay = JSON.stringify(marker.patronsDay);
						var earningsDay = JSON.stringify(marker.earningsDay);
						var revenues5 = JSON.stringify(marker.revenues5);
						var patronsDay5 = JSON.stringify(marker.patronsDay5);
						var earningsDay5 = JSON.stringify(marker.earningsDay5);
						var revenues4 = JSON.stringify(marker.revenues4);
						var patronsDay4 = JSON.stringify(marker.patronsDay4);
						var earningsDay4 = JSON.stringify(marker.earningsDay4);

						var content = '<div style="width:150px;"><h4>'+
							place.name+'</h4><p>'+
							cRestaurant+'</p><p>'+
							place.formatted_address+'</p><p>'+
							place.formatted_phone_number+'</p>'+
							'<div class="panel-body"><div style="float: left; text-align: center; display: inline-block">'+
							'<button id="chartBtn" type="button" onClick="showChart('+
							revenues+','+patronsDay+','+earningsDay+
							','+revenues4+','+patronsDay4+','+earningsDay4+
							','+revenues5+','+patronsDay5+','+earningsDay5+')"'+
							'class="btn btn-info" data-toggle="modal" data-target="#myModal" data-delay="{"show":1000}" '+
							'data-container="body" data-html="true" title="Show chart" data-placement="bottom"> '+
			        '<i class="material-icons md-48">show_chart</i></button> '
							// +
							//
							// '</div><div style="float: left; margin: 0 auto;">'+
							//
							// '<button id="askDirectionBtn" onClick="askDirection()" type="button" '+
							// 'class="btn btn-info" data-toggle="tooltip" data-delay="{"show":1000}" '+
							// 'data-container="body" data-html="true" title="Ask directions" data-placement="bottom"> '+
			        // '<i class="material-icons md-48">directions_run</i></button> '+

							+'</div></div>';
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
					map: current == null? map: null,
					// icon: icon,
					title: place.name,
					position: place.geometry.location,
					animation: google.maps.Animation.DROP
				});

				// Create a marker for each place.
				// markers.push(search_marker);
				// searchCoord = place.geometry.location;
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
				}

			});

			if (current != null) {
				startDirection = new google.maps.LatLng(current.getPosition().lat(), current.getPosition().lng());
				endDirection = new google.maps.LatLng(search_marker.getPosition().lat(), search_marker.getPosition().lng());
				directionService();
			}

			map.fitBounds(bounds);
		});
	}

	function drawingManagerEvent() {
		google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
			if (e.type == google.maps.drawing.OverlayType.CIRCLE) {
				drawingManager.setDrawingMode(null);

				var newShape = e.overlay;
				newShape.type = e.type;
				setSelection(newShape);
			}
		});
	}

	function deleteOverlays() {
		directionsDisplay.setMap(null);
		for(var i=0;i<all_markers.length;i++) all_markers[i].setMap(null);

		if (current != null) {
			current.setMap(null);
			current = null;
		}

		if (search_marker != null) {
			search_marker.setMap(null);
			search_marker = null;
		}

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
