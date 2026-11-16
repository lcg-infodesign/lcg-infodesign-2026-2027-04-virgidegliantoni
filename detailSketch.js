// Tabella che contiene i dati dei fiumi
let myTable;

// Fiume selezionato
let selectedRiverId;
let selectedRiver;

// Valori minimi e massimi del dataset
let minLength = Infinity;
let maxLength = -Infinity;
let minTemp = Infinity;
let maxTemp = -Infinity;
let minTributaries = Infinity;
let maxTributaries = -Infinity;

function preload() {
  // Carico lo stesso dataset della pagina overview
  myTable = loadTable("assets/rivers.csv", "csv", "header");
}

function setup() {

  // Leggo l'ID del fiume dall'indirizzo URL
  let params = getURLParams();
  selectedRiverId = params.river;

  // Calcolo i valori minimi e massimi usando tutto il dataset
  for (let i = 0; i < myTable.getRowCount(); i++) {

    let lunghezza = myTable.getNum(i, "length");
    let temperatura = myTable.getNum(i, "avg_temp");
    let affluenti = myTable.getNum(i, "tributaries");

    minLength = min(minLength, lunghezza);
    maxLength = max(maxLength, lunghezza);
    minTemp = min(minTemp, temperatura);
    maxTemp = max(maxTemp, temperatura)
  }

  // Cerco la riga corrispondente all'ID ricevuto
  selectedRiver = myTable.findRow(selectedRiverId, "id");

  createCanvas(windowWidth, windowHeight);
}

function draw() {

  background(25);

  if (selectedRiver) {

    // Leggo i dati del fiume selezionato
    let nome = selectedRiver.get("name");
    let paesi = selectedRiver.get("countries");
    let continente = selectedRiver.get("continent");

    let lunghezza = float(selectedRiver.get("length"));
    let area = float(selectedRiver.get("area"));
    let portata = float(selectedRiver.get("discharge"));
    let affluenti = float(selectedRiver.get("tributaries"));

    let temperaturaMin = float(selectedRiver.get("min_temp"));
    let temperaturaMax = float(selectedRiver.get("max_temp"));
    let temperaturaMedia = float(selectedRiver.get("avg_temp"));

    // Titolo
    textStyle(BOLD);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(28);
    text(nome, width / 2, 55);

    // Paesi e continente
    textStyle(NORMAL);
    textSize(13);
    fill(210);
    text(paesi + "  |  " + continente, width / 2, 85);

    // Disegno il glifo ingrandito
    disegnaGlifo(
      width / 2,
      190,
      lunghezza,
      temperaturaMedia,
      affluenti
    );

    // Informazioni del fiume
    fill(255);
    textSize(17);
    text("INFORMAZIONI DEL FIUME", width / 2, 340);

    fill(220);
    textSize(14);

    text("Lunghezza: " + lunghezza + " km", width / 2, 385);
    text("Area del bacino: " + area, width / 2, 415);
    text("Portata: " + portata, width / 2, 445);
    text("Affluenti: " + affluenti, width / 2, 475);

    text("Temperatura minima: " + temperaturaMin + " °C",
         width / 2, 505);

    text("Temperatura massima: " + temperaturaMax + " °C",
         width / 2, 535);

    text("Temperatura media: " + temperaturaMedia + " °C",
         width / 2, 565);

    // Invito a tornare alla pagina iniziale
    fill(255);
    textSize(13);
    text("← TORNA A TUTTI I FIUMI", width / 2, height - 18);

  } else {

    fill(255);
    textAlign(CENTER);
    textSize(18);
    text("Fiume non trovato", width / 2, height / 2);

    textSize(13);
    text("Torna alla pagina iniziale", width / 2, height / 2 + 30);
  }
}

function disegnaGlifo(x, y, lunghezza, temperatura) {

  // Stessa scala della pagina overview
  let dimensione = map(lunghezza, minLength, maxLength, 12, 32);

  let valoreColore = map(temperatura, minTemp, maxTemp, 0, 1);
  let colore = lerpColor(
    color(60, 140, 255),
    color(255, 90, 70),
    valoreColore
  );

  // Cerchio principale
  noStroke();
  fill(colore);
  circle(x, y, dimensione * 4);

}

// Torno alla pagina iniziale cliccando nella parte bassa
function mousePressed() {

  if (mouseY > height - 45) {
    window.location.href = "index.html";
  }
}
