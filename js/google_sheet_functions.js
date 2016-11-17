	// Your Client ID can be retrieved from your project in the Google
	// Developer Console, https://console.developers.google.com
	var CLIENT_ID = '76014849832-k75b29ac0ubr73hdlpp4ajlbt8entjre.apps.googleusercontent.com';
	var SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
	var SPREADSHEET_ID = '1ANh8ZoIjfqypndns_oI3xK1j1Pf0Nc0dLMLgJ2IxZcU';
	var DISCOVERY_URL = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

	function checkAuth() {
		gapi.auth.authorize({
			'client_id': CLIENT_ID,
			'scope': SCOPES.join(' '),
			'immediate': true
		}, handleAuthResultRead);
	}

	function handleAuthResultRead(authResult) {
		if (authResult && !authResult.error) {
			loadSheetsApi(0);
		}
	}

	function handleAuthResultWrite(authResult) {
		if (authResult && !authResult.error) {
			loadSheetsApi(1);
		}
	}

	function checkAuthWrite() {
		gapi.auth.authorize({
				client_id: CLIENT_ID,
				scope: SCOPES,
				immediate: false
			}, handleAuthResultWrite);
	}

	function loadSheetsApi(method) {
		if (method == 0) gapi.client.load(DISCOVERY_URL).then(listAllContents);
		else if (method == 1) gapi.client.load(DISCOVERY_URL).then(storeContents);
	}

	function listAllContents() {
		gapi.client.sheets.spreadsheets.values.get({
			spreadsheetId: SPREADSHEET_ID,
			range: 'Restaurants!A2:N',
		}).then(function(response) {
			// fetchedStatistics = [];
			if (response.result.values != null &&  response.result.values.length > 0)  {
				sheetData = response.result.values.splice(0);
			}

		}, function(response) {
			alert('Error: ' + response.result.error.message);
		});
	}

	function storeContents() {
		gapi.client.sheets.spreadsheets.values.append({
			spreadsheetId: SPREADSHEET_ID,
			range: 'Restaurants!A2:N',
			valueInputOption:'RAW',
			values: writeData
		}).then(function(response) {
			console.log('write ok');
		}, function(response) {
			alert('Error: ' + response.result.error.message);
		});
	}
