			/***** ELEMENTI *****/

const calcolaBtn = document.getElementById('calcola-btn');
const lunghezza = document.getElementById('lunghezza');
const altezza = document.getElementById('altezza');
const larghezza = document.getElementById('larghezza');
const zonaRemota = document.getElementById('zonaremota');
const assicurazione = document.getElementById('assicurazione');
const peso = document.getElementById('peso');
const volumeEl = document.getElementById('volume');
const costo = document.getElementById('costo');
const prezzo = document.getElementById('prezzo');

			/***** DATI *****/

const destinazioni = ["Italia", "EU", "America", "Asia", "Resto del Mondo"];
const pesi = [0.5, 1, 2, 5, 10, 15, 20, 25];
const prezzi = [[10, 15, 20, 25, 30, 35, 40, 45], [50, 55, 60, 65, 70, 75, 80, 85], [90, 95, 100, 105, 110, 115, 120, 125], [130, 135, 140, 145, 150, 155, 160, 165], [170, 175, 180, 185, 190, 195, 200, 205]];
const costoZonaRemota = 10;
const prezzoMinimoAssicurazione = 10;
const percentualeAssicurazione = 0.01;

			/***** FUNZIONI *****/

function calcolaPeso() {
	const volume = (lunghezza.value * altezza.value * larghezza.value) / 5000;
	let i = 0;
	while (volume > pesi[i])
		i++;
	let p = 0;
	if (i > 0)
		p = pesi[i] - volume <= 0.1 ? i + 1 : i;
	else
		p = i;
	peso.value = pesi[p].toString();
	volumeEl.value = volume.toString();
	return p;
}

function calcolaOpzioni() {
	let c = 0;
	if (zonaRemota.checked)
		c += costoZonaRemota;
	const prezzoAssicurazione = assicurazione.value * percentualeAssicurazione;
	if (prezzoAssicurazione > prezzoMinimoAssicurazione)
		c += prezzoAssicurazione;
	else if (assicurazione.value > 0)
		c += prezzoMinimoAssicurazione;
	return c;
}

function calcolaPrezzo() {
	const destSelezionata = document.querySelector('input[name="destinazione"]:checked').value;
	for (let i = 0; i < destinazioni.length; i++) {
		if (destinazioni[i] === destSelezionata) {
			const p = calcolaPeso();
			const valoreOpzioni = calcolaOpzioni();
			const prezzoFinale = prezzi[i][p] + valoreOpzioni;
			prezzo.value = "€ " + prezzoFinale.toString();
			//aggiungere costo
			break;
		}
	}
}

calcolaBtn.addEventListener('click', function() {
	calcolaPrezzo();
});
