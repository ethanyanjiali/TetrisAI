//Canvas Animation
var canvas;
var c;
var ONE_FRAME_TIME = 1000 / 60 ;
var x=10+30*4,y=10; //starting position of a shape
var gameOver=false;


var drawLoop = function(){
	drawGame();
}
var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

var recursiveAnim = function() {
        drawLoop();
        animFrame( recursiveAnim );
};


//********Setup at the beginning********************
window.onload = function(){
	canvas = document.getElementById("canvas");
	c=canvas.getContext("2d");
	drawBackground();
}

//**********user clicks and then go,this is where the game begins**********
function init(){         
    animFrame( recursiveAnim );
    setInterval(blockUpdate,10);
}


//***********To draw on the canvas per frame *********************
function drawGame(){
	c.clearRect(0,0,canvas.width,canvas.height);
	drawBackground();	
	drawStackBlocks();

	drawLshape_left(c,x,y);

	//draw words
	var gradient=c.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	c.font = "20px  Verdana";
	c.fillStyle=gradient;
	c.fillText("Rows removed: "+rows_completed, 350, 50);

	//drawIshape(c,120,120);
	//drawSquare(c,240,240);
	//drawLshape_right(c,240,360);
	//drawTRIshape(c,240,500);
	//drawLIshape_right(c, 100,500);
	//drawLIshape_left(c, 100,300);
	y+=1;
}

//draw the background stuff
function drawBackground(){
    //the game background
	c.fillStyle="black";
	c.fillRect(0,0,canvas.width,canvas.height);
	c.fillStyle="grey";
	c.fillRect(7.5,7.5,305,605);
    //The outline of the game space(L:600, W:300)
	c.strokeStyle = 'red';
	c.lineWidth=5;
	c.strokeRect(7.5,7.5,305,605);
}

//defining blocks: 10 columns, 20 rows (30 pixels per block square)
function drawLshape_left(c,x,y){
	c.fillStyle ="green";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x,y+60,30,30);
	c.fillRect(x-30,y+60,30,30);
	c.strokeRect(x,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x,y+60,30,30);
	c.strokeRect(x-30,y+60,30,30);
}

function drawIshape(c,x,y){
	c.fillStyle ="yellow";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x+30,y,30,30);
	c.fillRect(x+60,y,30,30);
	c.fillRect(x+90,y,30,30);	
	c.strokeRect(x,y,30,30);	
	c.strokeRect(x+30,y,30,30);
	c.strokeRect(x+60,y,30,30);
	c.strokeRect(x+90,y,30,30);

}

function drawSquare(c,x,y){
	c.fillStyle ="pink";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x+30,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x+30,y+30,30,30);	
	c.strokeRect(x,y,30,30);
	c.strokeRect(x+30,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x+30,y+30,30,30);	
}

function drawLshape_right(c,x,y){
	c.fillStyle ="blue";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x,y+60,30,30);
	c.fillRect(x+30,y+60,30,30);
	c.strokeRect(x,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x,y+60,30,30);
	c.strokeRect(x+30,y+60,30,30);
}

function drawTRIshape(c,x,y){
	c.fillStyle ="purple";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x+30,y+30,30,30);
	c.fillRect(x-30,y+30,30,30);
	c.strokeRect(x,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x+30,y+30,30,30);
	c.strokeRect(x-30,y+30,30,30);
}

function drawLIshape_left(c,x,y){
	c.fillStyle ="white";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x+30,y+30,30,30);
	c.fillRect(x-30,y,30,30);
	c.strokeRect(x,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x+30,y+30,30,30);
	c.strokeRect(x-30,y,30,30);
}

function drawLIshape_right(c,x,y){
	c.fillStyle ="brown";
	c.strokeStyle = 'black';
	c.lineWidth=1;
	c.fillRect(x,y,30,30);
	c.fillRect(x,y+30,30,30);
	c.fillRect(x+30,y,30,30);
	c.fillRect(x-30,y+30,30,30);
	c.strokeRect(x,y,30,30);
	c.strokeRect(x,y+30,30,30);
	c.strokeRect(x+30,y,30,30);
	c.strokeRect(x-30,y+30,30,30);
}

//draw the blocks with color and board according to the maps
function drawStackBlocks(){
	c.strokeStyle = 'black';
	c.lineWidth=1;
	
   	for(var i=0;i<20;i++)
		for(var j=0;j<10;j++)
		{
			if(hasBlock[i][j]==1)
			{
				setBlockColor(i,j);
				c.fillRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
				c.strokeRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
			}
		}
}

//retrive block color info from the color map
function setBlockColor(i,j){
	switch(blockColor[i][j]){
	case "green":
		c.fillStyle ="green";
		break;
	case "grey":
		c.fillStyle ="grey";
		break;
	case "yellow":
		c.fillStyle ="yellow";
		break;
	case "pink":
		c.fillStyle ="pink";
		break;
	case "blue":
		c.fillStyle ="blue";
		break;
	case "purple":
		c.fillStyle ="purple";
		break;
	case "white":
		c.fillStyle ="white";
		break;
	case "brown":
		c.fillStyle ="brown";
		break;
	default:
		c.fillStyle ="black";
		break;
	}
}


