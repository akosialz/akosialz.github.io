	function drawComboChart() {
		var arrToChart = [];
		
		for(var i=0; i< nearbyMarkers.length; i++) {
			var arrData = [];
			var data = nearbyMarkers[i].lss;
			arrData.push(parseInt(data[6]));
			arrData.push(parseInt(data[9]));
			arrData.push(parseInt(data[12]));
			arrData.unshift(data[1]);
			arrToChart.push(arrData);
		}
		
		arrToChart.unshift(chartHead);
		var data = google.visualization.arrayToDataTable(arrToChart);

		var options = {
		  title : "Restaurant's Patrons/day",
		  vAxis: {title: '1'},
		  hAxis: {title: '2'},
		  seriesType: 'bars',
		  series: {5: {type: 'line'}}
		};

		var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}


	function drawPieChart() {
		var arrToChart = [];
		var types1 = ['Ethnic', 0];
		var types2 = ['Fast Food', 0];
		var types3 = ['Fast Casual', 0];
		var types4 = ['Casual Dining', 0];
		var types5 = ['Fine Dining', 0];
		
		var pieHeader = ['Type', 'No. of restaurant type'];
		
		for(var i=0; i< nearbyMarkers.length; i++) {
			var data = nearbyMarkers[i].lss;
			switch(parseInt(data[4])) {
				case 1: types1[1]++; break;
				case 2: types2[1]++; break;
				case 3: types3[1]++; break;
				case 4: types4[1]++; break;
				case 5: types5[1]++; break;
			}
		}
		
		arrToChart.push(pieHeader);
		arrToChart.push(types1);
		arrToChart.push(types2);
		arrToChart.push(types3);
		arrToChart.push(types4);
		arrToChart.push(types5);
		var data = google.visualization.arrayToDataTable(arrToChart);

		var options = {
		  title: 'Types of nearby restaurants'
		};

		var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}

	function drawLineChart() {
		var arrToChart = [];
		
		for(var i=0; i< nearbyMarkers.length; i++) {
			var arrData = [];
			var data = nearbyMarkers[i].lss;
			arrData.push(parseInt(data[5]));
			arrData.push(parseInt(data[8]));
			arrData.push(parseInt(data[11]));
			arrData.unshift(data[1]);
			arrToChart.push(arrData);
		}
		
		arrToChart.unshift(chartHead);
		var data = google.visualization.arrayToDataTable(arrToChart);

		var options = {
		  title: "Restaurant's revenues",
		  curveType: 'function',
		  legend: { position: 'bottom' }
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}

	function drawAreaChart() {
		var arrToChart = [];
		
		for(var i=0; i< nearbyMarkers.length; i++) {
			var arrData = [];
			var data = nearbyMarkers[i].lss;
			arrData.push(parseInt(data[7]));
			arrData.push(parseInt(data[10]));
			arrData.push(parseInt(data[13]));
			arrData.unshift(data[1]);
			arrToChart.push(arrData);
		}
		
		arrToChart.unshift(chartHead);
		var data = google.visualization.arrayToDataTable(arrToChart);

		var options = {
		  title: "Restaurant's average earnings",
		  hAxis: {title: 'aw',  titleTextStyle: {color: '#333'}},
		  vAxis: {minValue: 0}
		};

		var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
		chart.draw(data, options);
	}