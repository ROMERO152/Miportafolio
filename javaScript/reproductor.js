//iniciar video
function iniciar(){
    maximo = 600;
    medio = document.getElementById('medio');
    reproducir = document.getElementById('reproducir');
    barra = document.getElementById('barra');
    progreso = document.getElementById('progreso');

    reproducir.addEventListener('click', presionar, false);
    barra.addEventListener('click', mover, false);
}
//funcion presionar click

function presionar(){
    if(!medio.paused && !medio.ended){
        medio.pause();
        reproducir.innerHTML = 'Reproducir';
        window.clearInterval(bucle);
        }else{
            medio.play();
            reproducir.innerHTML = 'Pausa';
            bucle=setInterval(estado, 1000)
        }
}

//funcion estado ejecutado cada 1000 milisegundos
function estado(){
    if(!medio.ended){ //si medio no ha finalizado
        var total = parseInt(medio.currentTime*maximo/medio.duration); //especifica la posicion del medio reproducido, convierte los segundos a px.
        progreso.style.width=total+'px';//suma 1px a la barra
    }else{
        progreso.style.width='0px';//cuando medio termina
        reproducir.innerHTML = 'reproducir';//cambia el texto del boton a reproducir
        window.clearInterval(bucle);//cancela el intervalo y no se ejecuta mas
    }
}

//adelantar o retroceder video

function mover(e){// e parametro para almacenar un valor
    if(!medio.paused && !medio.ended){ //se ejecuta cuando el video es diferente a pause o  ended
        var ratonX = e.pageX-barra.offsetLeft;//posicion del raton al hacer click,pagex captura posicion exacta del puntero
        //offsetLeft extrae la distancia del lado izquierdo de la pagina hasta la barra
        var nuevoTiempo = ratonX*medio.duration/maximo; //convierte los pixeles anteriores a segundos usando la propiedad duration
        medio.currentTime=nuevoTiempo;//comienza a reproducir desde la nueva posicion
        progreso.style.width=ratonX+'px';
    }
}
window.addEventListener('load', iniciar,false);