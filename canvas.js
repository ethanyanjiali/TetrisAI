//Canvas Animation
var canvas;
var c;// An object represent the current paintbrush
var ONE_FRAME_TIME = 1000 / 60 ;
var x=10+30*4,y=10; //starting position of a shape
var gameOver=false;


var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

var recursiveAnim = function() {
        drawGame();
        animFrame( recursiveAnim );
};


//********Setup at the beginning********************
window.onload = function(){
	canvas = document.getElementById("canvas");
	c=canvas.getContext("2d");
	drawBackground();

}

//ENTRANCE OF THE PROGRAM
//**********User clicks and then go,this is where the game begins**********
function init(){ 
    // Call recursiveAnim function recursively to implement a forever loop
    // This function is responsible for canvas drawing. It is non-block.    
    //animFrame( recursiveAnim ); 
    // Call blockUpdate every 10ms.
    // This function is responsible for calculating the status of each block. It is also non-block.
    drawBackground();
    initPlayer();
    setInterval(drawGame,100); 
    setInterval(blockUpdate,100); 
}


//***********To draw on the canvas per frame *********************
function drawGame(){
	//c.clearRect(0,0,canvas.width,canvas.height);
	// Draw the background canvas of the game	
	// Draw each block
	drawStackBlocks();
	// The moving shape on screen. Just a test.
	// drawLshape_left(c,x,y);
	// Draw text for game information
	var gradient=c.createLinearGradient(0,0,canvas.width,0);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	c.font = "20px  Verdana";
	c.fillStyle=gradient;
	c.fillText("Rows removed: "+rows_completed, 350, 50);
}


//draw the background stuff
function drawBackground(){
    //the black big background
	c.fillStyle="black";
	c.fillRect(0,0,canvas.width,canvas.height);
	// The gray background
	c.fillStyle="grey";
	c.fillRect(7.5,7.5,305,605);
	// The gray background
	c.fillStyle="grey";
	c.fillRect(607.5,7.5,305,605);
    //The red frame of the game space(L:600, W:300)
	c.strokeStyle = 'red';
	c.lineWidth=5;
	c.strokeRect(7.5,7.5,305,605);
	//The red frame of the game space(L:600, W:300)
	c.strokeStyle = 'red';
	c.lineWidth=5;
	c.strokeRect(607.5,7.5,305,605);
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
	window.y+=1;
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
				// Set the fill color of current paintbrush (Not the line color)
				setBlockColor(i,j);
				// Fill the block with color
				c.fillRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
				// Draw the boundry line of the block
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


