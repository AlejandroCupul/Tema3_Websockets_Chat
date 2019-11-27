var socket = io.connect('http://192.168.0.6:8081', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
})

function render (data) {
  var html = data.map(function(elem, index) {
    let html_string = string_expresion(elem.text);
    return(`<div>
              <strong>${elem.author}</strong>:
              <em> ${elem.text}</em>
            </div>${html_string}`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}

let string_expresion = (date) => {
  let nVocales, nPalabras, nNumeros, nMayusculas, nNovocales;

  let Vocales = date.match(/[aeiouAEIOU]/g, "");
  let Palabras = date.match(/[^\s\d]+/g, "");
  let Numeros = date.match(/[\d]/g, "");
  let Mayusculas = date.match(/\b[A-Z]/g, "");
  let Novocales = date.match(/[^aeiouAEIOU\W\d]\b/g, "");
  
  if (Vocales === null) {nVocales = 0;} else {nVocales = Vocales.length;}
  if (Palabras === null) {nPalabras = 0;} else {nPalabras = Palabras.length;}
  if (Numeros === null) {nNumeros = 0;} else {nNumeros = Numeros.length;}
  if (Mayusculas === null) {nMayusculas = 0;} else {nMayusculas = Mayusculas.length;}
  if (Novocales === null) {nNovocales = 0;} else {nNovocales = Novocales.length;}

  return `<p class="results">  
          Vocales recibidas: ${nVocales},   
          Palabras recibidas: ${nPalabras},   
          Números contenidos: ${nNumeros},   
          Inician mayúsculas: ${nMayusculas},  
          Finalizan con letras no vocal: ${nNovocales}.</p>`;
}
