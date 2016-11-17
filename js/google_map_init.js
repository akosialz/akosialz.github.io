
	function insertContentGroupData() {
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('contentGroupData'));
	}

	function insertContentGroupTools() {
		map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('contentGroupTools'));
	}

	// function insertSearchbox() {
	// 	searchbox = new google.maps.places.SearchBox(document.getElementById('searchbox'));
	// 	map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('searchbox'));
	// }
	//
	// function insertToggleRestaurants() {
	// 	toggleRestaurant = document.getElementById('toggleNearbyRestaurant');
	// 	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('toggleNearbyRestaurant'));
	// }

	function insertDrawingManager() {

		if (drawingManager){
			drawingManager.setMap(null);
			drawingManager = null;
		} else {
			drawingManager = new google.maps.drawing.DrawingManager({
				drawingMode: null,
				drawingControl: true,
				drawingControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP,
					drawingModes: ['circle', 'polygon', 'polyline', 'rectangle']
				}
			});

			drawingManager.setMap(map);

		}
	}

//----------------------------------------------------------------------------------------------------------------------------

	function insertDdl() {
		ddl = document.getElementById('classificationRestaurant');
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('classificationRestaurant'));
	}
