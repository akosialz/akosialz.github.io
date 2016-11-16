
	function insertContentGroupData() {
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('contentGroupData'));
	}

	function insertContentGroupTools() {
		map.controls[google.maps.ControlPosition.BOTTOM_LEFT ].push(document.getElementById('contentGroupTools'));
	}



	function insertSearchbox() {
		searchbox = new google.maps.places.SearchBox(document.getElementById('searchbox'));
		map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('searchbox'));
	}

	function insertToggleRestaurants() {
		toggleRestaurant = document.getElementById('toggleNearbyRestaurant');
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('toggleNearbyRestaurant'));
	}

	function insertDrawingManager() {
		drawingManager = new google.maps.drawing.DrawingManager({
			drawingMode: null,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.TOP_CENTER,
				drawingModes: ['circle']
			}
		});

		drawingManager.setMap(map);
	}

	function insertDdl() {
		ddl = document.getElementById('classificationRestaurant');
		map.controls[google.maps.ControlPosition.TOP_RIGHT].push(document.getElementById('classificationRestaurant'));
	}
