var contexto = document.getElementById("lienzoJuego").getContext("2d");
contexto.canvas.widht = 300;
contexto.canvas.height = 530;
//variables
var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
    x: 50,
    y: 150,
    w: 50,
    h: 50
}

var tuberias = new Array()
tuberias[0] = {
    x: contexto.canvas.width, 
    y: 0
}
//variables audios
var punto = new Audio("audios/punto.mp3")



//variables imagenes
var bird = new Image()
bird.src = "imagenes/bird.png"

var background = new Image()
background.src = "imagenes/background.png"

var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"

var suelo = new Image()
suelo.src = "imagenes/suelo.png"

var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png"
//control
function presionar(){
    personaje.y -= 25
}

//bucle

setInterval(loop, 1000/FPS)
function loop(){
    contexto.clearRect(0,0, 300, 530)
     //fondo
     contexto.drawImage(background, 0, 0)
     contexto.drawImage(suelo, 0, contexto.canvas.height - suelo.height)
    //personaje
 
   
    contexto.drawImage(bird, personaje.x, personaje.y)
    
    //tuberias
    for( var i = 0; i < tuberias.length; i++){
        var constante = tuberiaNorte.height + 100
        contexto.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y)
        contexto.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y+constante )
        tuberias[i].x--
        if(tuberias[i].y + tuberiaNorte.height <  80){
            tuberias[i].y = 0
        }

        if(tuberias[i].x == 150){
            tuberias.push({
                x:contexto.canvas.width,
                y: Math.floor(Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            })
        }

        //colisiones
        if(personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
             (personaje.y <= tuberias[i].y + tuberiaNorte.height || 
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= contexto.canvas.height - suelo.height ){
            location.reload()
        }
        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
        }

}

//condiciones
personaje.y += gravedad
contexto.fillStyle = "rgb(0,0,0,1)"
contexto.font ="25px Arial"
contexto.fillText("Score: "+score, 10, contexto.canvas.height-40)

}

//eventos

window.addEventListener("keydown", presionar)