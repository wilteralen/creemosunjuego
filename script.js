const textos = [
  'La programacion informatica es el arte del proceso por el cual se limpia, codifica, traza y protege el codigo fuente de programas computacionales, en otras palabras, es indicarle a la computadora lo que tiene que hacer.',
  'Por medio de la programacion se establecen los pasos a seguir para la creacion del codigo fuente de los diversos programas informaticos. Este codigo le indicara al programa informatico que tiene que hacer y como realizarlo.',
  'JavaScript es el lenguaje de programacion que debes usar para agregar caracteristicas interactivas a tu sitio web, (por ejemplo, juegos, eventos que ocurren cuando los botones son presionados o los datos son introducidos en los formularios, efectos de estilo dinamicos, animacion, y mucho mas).',
  'El Lenguaje de Marcado de Hipertexto (HTML) es el codigo que se utiliza para estructurar y desplegar una pagina web y sus contenidos. Por ejemplo, sus contenidos podrian ser parrafos, una lista con vinhetas, o imagenes y tablas de datos.',
  
];

let palabras = [];
let palabraIndice = 0;
let startTime = Date.now();

const textoElemento = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('texto-tipeado');


document.getElementById('inicio').addEventListener('click', () => {
 
  const textoIndice = Math.floor(Math.random() * textos.length);
  const texto = textos[textoIndice];
 
  palabras = texto.split(' ');
  
  palabraIndice = 0;

  const spanPalabras = palabras.map(function(palabra) { return `<span>${palabra} </span>`});
  
  textoElemento.innerHTML = spanPalabras.join('');
 
  textoElemento.childNodes[0].className = 'highlight';

  messageElement.innerText = '';

 
  typedValueElement.value = '';
  
  typedValueElement.focus();
  
  startTime = new Date().getTime();
});


typedValueElement.addEventListener('input', () => {

  const currentWord = palabras[palabraIndice];

  const typedValue = typedValueElement.value;
  if (typedValue === currentWord && palabraIndice === palabras.length - 1) {
    
    const elapsedTime = new Date().getTime() - startTime;
    const message = `FELICITACIONES! Finalizaste en ${elapsedTime / 1000} segundos.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
  
    typedValueElement.value = '';
   
    palabraIndice++;
  
    for (const palabraElemento of textoElemento.childNodes) {
      palabraElemento.className = '';
    }
 
    textoElemento.childNodes[palabraIndice].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    
    typedValueElement.className = '';
  } else {
  
    typedValueElement.className = 'error';
  }
});