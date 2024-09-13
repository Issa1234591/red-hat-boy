function controller (event) {

    if(event.key == "Enter"){
        if(runWorkerNumber == 0){
            run();
            runSound.play();
            moveBackground();
            updateScore();
            flameLocations.forEach(generateFlames);
        }   
    } 
    
    if(event.key == " "){
        if (jumpWorkerNumber == 0) {
            if (runWorkerNumber !=0) {
             clearInterval(runWorkerNumber);
             runSound.pause();
             jump();
             jumpSound.play();
            }
        }
    
    }
}
var runImageNumber = 1;
var runWorkerNumber = 0;
var runSound = new Audio("run.mp3");
runSound.loop = true;

function run() {

    runWorkerNumber = setInterval(() => {
        runImageNumber = runImageNumber + 1;

            if(runImageNumber == 9) {
                runImageNumber = 1;
            }
    
            document.getElementById("boy").src = "run"+runImageNumber+".png";
 },150);
}

var jumpImageNumber = 1;
var jumpWorkerNumber = 0;
var boyMarginTop = 550;
var jumpSound = new Audio("jump.mp3");

function jump(){

  jumpWorkerNumber = setInterval(() => {

    jumpImageNumber = jumpImageNumber + 1;//2,3,4,5,6,7, || 8,9,10,11,12

        if(jumpImageNumber < 8){
            boyMarginTop = boyMarginTop - 15;
            document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        }
        if(jumpImageNumber > 7){
            boyMarginTop = boyMarginTop + 15;
            document.getElementById("boy").style.marginTop = boyMarginTop + "px";
        }
        if (jumpImageNumber == 13) {
            jumpImageNumber = 1;
            clearInterval(jumpWorkerNumber);
            jumpWorkerNumber = 0;
            run();
            runSound.play();
        }
    
         document.getElementById("boy").src = "jump"+jumpImageNumber+".png";
},100);

}

var moveBackgroundWorkerNumber = 0;
var backgroundPosition = 0;

function moveBackground(){
    moveBackgroundWorkerNumber = setInterval(()=>{

    backgroundPosition = backgroundPosition - 10;
    document.getElementById("background").style.backgroundPositionX = backgroundPosition+"px";

    },50);
}


var scoreWorker = 0;
var score = 0;

function updateScore(){
    scoreWorker = setInterval(()=>{

        if (score == 3000){
            alert("You won! Press Ok to start a New Game.");
            window.location.reload();
        }
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    },100);
}

var flameLocations = ["500","1000","1500","2000","2500","3000","3500","4000","4500","5000","5500"];//array
var flameWorkerNumber = 0;

function generateFlames(x){

    var i = document.createElement("img");
    i.src = "flame.gif";
    i.className = "flame";
    i.style.marginLeft = x+"px";
    document.getElementById("background").appendChild(i);

    flameWorkerNumber = setInterval(()=> {

        if(x == 210){
            if(jumpWorkerNumber == 0){
                clearInterval(runWorkerNumber);
                runSound.pause();
                clearInterval(moveBackgroundWorkerNumber);
                clearInterval(scoreWorker);
                dead();
                deadSound.play();
            }
            
        }

        x = x - 10;
        i.style.marginLeft = x+"px";

    },50);

}

var deadWorkerNumber = 0;
var deadImageNumber = 1;
var deadSound = new Audio("dead.mp3");

function dead(){

    deadWorkerNumber = setInterval(()=>{

        deadImageNumber = deadImageNumber + 1;

        if(deadImageNumber == 11){
            deadImageNumber = 1;
            clearInterval(deadWorkerNumber);
            deadWorkerNumber = 0;
            alert("Game Over!");
            window.location.reload();
        }

        document.getElementById("boy").src = "dead"+deadImageNumber+".png";

    },100);
}