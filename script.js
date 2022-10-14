// dentro del script.js
// todas nuestros textos de ejemplo
const textos = [
  'La programacion informatica es el arte del proceso por el cual se limpia, codifica, traza y protege el codigo fuente de programas computacionales, en otras palabras, es indicarle a la computadora lo que tiene que hacer.',
  'Por medio de la programacion se establecen los pasos a seguir para la creacion del codigo fuente de los diversos programas informaticos. Este codigo le indicara al programa informatico que tiene que hacer y como realizarlo.',
  'JavaScript es el lenguaje de programacion que debes usar para agregar caracteristicas interactivas a tu sitio web, (por ejemplo, juegos, eventos que ocurren cuando los botones son presionados o los datos son introducidos en los formularios, efectos de estilo dinamicos, animacion, y mucho mas).',
  'El Lenguaje de Marcado de Hipertexto (HTML) es el codigo que se utiliza para estructurar y desplegar una pagina web y sus contenidos. Por ejemplo, sus contenidos podrian ser parrafos, una lista con vinhetas, o imagenes y tablas de datos.',
  
];
// almacena la lista de palabras y el índice de la palabra que el jugador está escribiendo actualmente
let palabras = [];
let palabraIndice = 0;
// la hora de inicio
let startTime = Date.now();
// elementos de la pagina
const textoElemento = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');

// en el final de nuestro archivo script.js
document.getElementById('inicio').addEventListener('click', () => {
  // elegimos el texto de ejemplo a mostrar
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
  // separamos el texto en un array de palabras
  palabras = texto.split(' ');
  // reestablemos el idice de palabras para el seguimiento
  palabraIndice = 0;

  // Actualizamos la interfaz de usuario
  // Creamos una matriz con los elementos span de nuestro HTML para poder definirles una class
  const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
  // Convertimos a string y lo definimos como innerHTML en el texto de ejemplo a mostrar
  textoElemento.innerHTML = spanPalabras.join('');
  // Resaltamos la primer palabra
  textoElemento.childNodes[0].className = 'highlight';
  // Borramos los mensajes previos
  messageElement.innerText = '';

  // Definimos el elemento textbox
  // Vaciamos el elemento textbox
  typedValueElement.value = '';
  // Definimos el foco en el elemento
  typedValueElement.focus();
  // Establecemos el manejador de eventos

  // Iniciamos el contador de tiempo
  startTime = new Date().getTime();
});

// al final de nuestro archivo script.js
typedValueElement.addEventListener('input', () => {
  // tomamos la palabra actual
  const currentWord = palabras[palabraIndice];
  // tomamos el valor actual
  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    // fin de la sentencia
    // Definimos el mensaje de éxito
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // fin de la palabra
    // vaciamos el valor typedValueElement para la siguiente palabra
    typedValueElement.value = '';
    // movemos a la palabra siguiente
    palabraIndice++;
    // reiniciamos el estado de todas las clases para los textos
    for (const palabraElemento of textoElemento.childNodes) {
      palabraElemento.className = '';
    }
    // resaltamos la palabra actual
    textoElemento.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // correcta actual
    // resaltar la siguiente palabra
    typedValueElement.className = '';
  } else {
    // estado error
    typedValueElement.className = 'error';
  }
});