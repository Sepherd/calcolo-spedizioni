const requestURL = "https://core.spediamopro.it/api/v1/simulazione";
const tokenURL = "https://core.spediamopro.it/api/v1/auth/login";
const authCode = "";

async function getToken(authCode) {
	try {
		const response = await fetch(tokenURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ authCode })
		});

		if (!response.ok) {
			const message = `An error has occurred: ${response.status}`;
			throw new Error(message);
		};

		const data = await response.json();
		console.log(data);
		return data;
	}
	catch (error) {
		console.error(error);
	}
}


const shipmentData = {
	"nazioneMittente": "IT",
	"nazioneDestinatario": "IT",
	"capMittente": "37121",
	"capDestinatario": "37022",
	"cittaMittente": "Verona",
	"cittaDestinatario": "Fumane",
	"provinciaMittente": "VR",
	"provinciaDestinatario": "VR",
	"colli": [
		{
			"altezza": 10,
			"larghezza": 15,
			"profondita": 20,
			"pesoReale": 8,
			"packagingType": 0
		}
	]
}

async function shipmentRequest(shipmentData) {
	const { token } = await getToken(authCode);
	try {
		const response = await fetch(requestURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(shipmentData)
		});

		if (!response.ok) {
			const message = `An error has occurred: ${response.status}`;
			throw new Error(message);
		};

		const data = await response.json();
		console.log(data);
		return data;
	}
	catch (error) {
		console.error(error);
	}
};

shipmentRequest(shipmentData);