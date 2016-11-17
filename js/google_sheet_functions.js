	// Your Client ID can be retrieved from your project in the Google
	// Developer Console, https://console.developers.google.com
	var CLIENT_ID = '76014849832-k75b29ac0ubr73hdlpp4ajlbt8entjre.apps.googleusercontent.com';
	var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
	var SPREADSHEET_ID = '1ANh8ZoIjfqypndns_oI3xK1j1Pf0Nc0dLMLgJ2IxZcU';

	function checkAuth() {
		gapi.auth.authorize({
			'client_id': CLIENT_ID,
			'scope': SCOPES.join(' '),
			'immediate': true
		}, handleAuthResult);
	}

	function handleAuthResult(authResult) {
		var authorizeDiv = document.getElementById('authorize-div');
		if (authResult && !authResult.error) {
			// Hide auth UI, then load client library.
			authorizeDiv.style.display = 'none';
			loadSheetsApi(0);
		} else {
			// Show auth UI, allowing the user to initiate authorization by
			// clicking authorize button.
			authorizeDiv.style.display = 'inline';
		}
	}

	function handleAuthClick() {
		gapi.auth.authorize({
				client_id: CLIENT_ID,
				scope: SCOPES,
				immediate: false
			}, handleAuthResult);
	}

	function loadSheetsApi(method) {
		if (method == 0) gapi.client.load(discoveryUrl).then(listAllContents);
		else if (method == 1) gapi.client.load(discoveryUrl).then(storeContents);
	}

	function listAllContents() {
		gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID,
			range: 'Restaurants!A2:N',
		}).then(function(response) {
			fetchedStatistics = [];
			if (response.result.values != null &&  response.result.values.length > 0)  {
				fetchedStatistics = response.result.values.splice(0);
			}

			storeContents();
		}, function(response) {
			alert('Error: ' + response.result.error.message);
		});
	}

	function storeContents() {
		gapi.client.sheets.spreadsheets.values.append({
			spreadsheetId: SPREADSHEET_ID,
			range: 'Restaurants!A2:N',
			valueInputOption:'RAW',
			values: finalStatistics
		}).then(function(response) {
			console.log('write ok');
		}, function(response) {
			alert('Error: ' + response.result.error.message);
		});
	}
