var frases = [
    "AL QUE MADRUGA DIOS LE AYUDA",
    "A CABALLO REGALO NO SE LE MIRA EL DIENTE",
    "UNA GOLONDRINA NO HACE UN VERANO"
]

var posAleatoria;
var fraseOculta;
var cont;

const ocultarFrase = (frase) => {
    let fraseOculta = "";
    for (let i=0; i < frase.length; i++) {
        const c = frase[i]
        if (c != " ") {
            fraseOculta += "_";
        }else {
            fraseOculta += " ";
        }
    }
    return fraseOculta;
}

const iniciarJuego = () => {
    /*
    1. Seleccionar una frase aleatoria
    2. Ocultar y pintar en el div de frase
    */
    posAleatoria = Math.floor(Math.random() * 3);
    const frase = frases[posAleatoria];

    console.log(frase);
    fraseOculta = ocultarFrase(frase)
    
    const divFrase = document.querySelector("#frase"); // getElementyById("frase")
    divFrase.innerHTML = fraseOculta;

    cont = 0;
}

const buscarLetraEnFrase = (frase, letra) =>{
    // Buscar letra en frase y si la encontramos, devolvemos true, caso contrario
    // devolvemos false.
    let encontrado = false;

    for (let c of frase) {
        if (c == letra) {
            // encontrado
            encontrado = true;
            break;
        }
    }

    return encontrado;
}

const mostrarLetraEnFrase = (frase, fraseOculta, letra) => {
    let nuevaFraseOculta = "";

    for (let i=0; i < frase.length; i++) {
        const c = frase[i];
        if (c == letra) {
            nuevaFraseOculta += c;
        }else {
            nuevaFraseOculta += fraseOculta[i];
        }
    }
    return nuevaFraseOculta;
}

const cambiarImagen = (contador) => {
    const img = document.querySelector("#imagen");
    img.setAttribute("src", `imagenes/hangman_${contador}.gif`)
}

const analizarInput = (event) => {
    const letra = event.key.toUpperCase();
    const encontrado = 
        buscarLetraEnFrase(frases[posAleatoria], letra);
    console.log(encontrado)
    if (!encontrado) {
        cont++;
        if (cont > 6) {
            // perdimos
        }else {
            cambiarImagen(cont);
        }
    }else {
        fraseOculta = mostrarLetraEnFrase(frases[posAleatoria], fraseOculta, letra);
        const divFrase = document.querySelector("#frase"); // getElementyById("frase")
        divFrase.innerHTML = fraseOculta;
        if (fraseOculta == frases[posAleatoria]) {
            // Ganamos!
        }
    }
}

const configurarInput = () => {
    const inputEntrada = document.querySelector("#entrada_text");
    inputEntrada.addEventListener("keydown", analizarInput);
}

const main = () => {
   iniciarJuego();
   configurarInput();
}
window.addEventListener("load", main);