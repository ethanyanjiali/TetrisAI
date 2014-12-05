//Canvas Animation
var canvas;
var c;// An object represent the current paintbrush
var ONE_FRAME_TIME = 1000 / 60 ;
var x=10+30*4,y=10; //starting position of a shape
var gameOver=false;
var showSpeed;
var timer;


/*var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

var recursiveAnim = function() {
        drawGame();
        animFrame( recursiveAnim );
};*/


//********Setup at the beginning********************
window.onload = function(){
	canvas = document.getElementById("canvas");
	c=canvas.getContext("2d");
	drawBackground();
    setInterval(drawConsole,100); 
}

function reload(){
	window.location.reload(false);
}

function scroll(){
	$('html,body').animate({scrollTop:1000}, 500);
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
    AImode = false;
    MAXTIME= parseInt(document.getElementById("difficulty").value);
    timeLeft = MAXTIME;
    initPlayer();
    setInterval(drawGame,100); 
    timer = setInterval(timeOut,1000); 
    setInterval(blockUpdate,100); 
    
}

function initAI(){ 
    // Call recursiveAnim function recursively to implement a forever loop
    // This function is responsible for canvas drawing. It is non-block.    
    //animFrame( recursiveAnim ); 
    // Call blockUpdate every 10ms.
    // This function is responsible for calculating the status of each block. It is also non-block.
    drawBackground();
    AImode = true;
    showSpeed = parseInt(document.getElementById("speed").value);
    setInterval(drawGame,showSpeed); 
    setInterval(blockUpdate,showSpeed); 
    
}
function timeOut(){
	if(timeLeft>=1){
		timeLeft-=1;
	} else {
		down();
	}
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
	//drawConsole();
}

function drawConsole(){
	c.fillStyle="black";
	c.fillRect(320,7.5,280,605);
	var gradient=c.createLinearGradient(320,7.5,600,200);
	gradient.addColorStop("0","magenta");
	gradient.addColorStop("0.5","blue");
	gradient.addColorStop("1.0","red");
	c.font = "20px myFont";
	c.fillStyle=gradient;
	c.fillText("AI Lines: "+rows_completed, 350, 150);
	c.fillText("Player Lines: "+player_rows_completed, 350, 200);
	c.fillText("Current Shape:", 350, 280);
	c.fillText("Time Left:", 380, 480);
	c.font = "60px myFont";
	if(timeLeft>99){
		c.fillText(timeLeft, 380, 560);
	} else if(timeLeft>9){
		c.fillText(timeLeft, 400, 560);
	} else {
		c.fillText(timeLeft, 420, 560);
	}
	c.font = "30px myFont";
	c.fillText("UNBEATABLE", 330, 50);
	c.fillText("TETRIS", 385, 90);
	drawCurrentShapeInConsole();
	// To fix the bug of player boundry
	c.strokeStyle = 'grey';
	c.lineWidth=5;
	c.strokeRect(607.5,7.5,305,605);
}


//draw the background stuff
function drawBackground(){
    //the black big background
	c.fillStyle="black";
	c.fillRect(0,0,canvas.width,canvas.height);
	// The gray background
	c.fillStyle="#000000";//grey
	c.fillRect(7.5,7.5,305,605);
	// The gray background
	c.fillStyle="#000000";//grey
	c.fillRect(607.5,7.5,305,605);
    //The red frame of the game space(L:600, W:300)
	c.strokeStyle = 'grey';
	c.lineWidth=5;
	c.strokeRect(7.5,7.5,305,605);
	//The red frame of the game space(L:600, W:300)
	c.strokeStyle = 'grey';
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
	//c.strokeStyle = 'black';
	//c.lineWidth=1;
	
   	for(var i=0;i<20;i++)
		for(var j=0;j<10;j++)
		{
			if(hasBlock[i][j]==1)
			{
				// Set the fill color of current paintbrush (Not the line color)
				//setBlockColor(i,j);
				c.fillStyle=blockColor[i][j];
				// Fill the block with color
				c.fillRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
				// Draw the boundry line of the block
				//c.strokeRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
				c.beginPath();
                c.fillStyle=blockColor[i][j].substr(0,4)+"000";
                c.moveTo(blockPositionMap_X[j]+3,blockPositionMap_Y[i]+28);
                c.lineTo(blockPositionMap_X[j]+28,blockPositionMap_Y[i]+28);
                c.lineTo(blockPositionMap_X[j]+28,blockPositionMap_Y[i]+3);
                c.lineTo(blockPositionMap_X[j]+23,blockPositionMap_Y[i]+8);
                c.lineTo(blockPositionMap_X[j]+23,blockPositionMap_Y[i]+23);
                c.lineTo(blockPositionMap_X[j]+8,blockPositionMap_Y[i]+23);
                c.closePath();
                c.fill();
			}
			else{
				c.fillStyle ="#000000";//grey
				c.fillRect(blockPositionMap_X[j],blockPositionMap_Y[i],30,30);
			}
		}
}

function drawCurrentShapeInConsole(){
    heightOfShape = currentShape[0].orientation.length;
    widthOfShape = currentShape[0].orientation[0].length;
    colorOfShape = GetColorReference(currentShape);
    for(var row=0; row<heightOfShape; row++){
        for(var col=0; col<widthOfShape; col++)
        {
            if(currentShape[0].orientation[row][col]==1)
            {
                c.fillStyle = colorOfShape;
                // Fill the block with color
                c.fillRect(410+30*row,320+30*col,30,30);
                // Draw the boundry line of the block
                c.beginPath();
                c.fillStyle=colorOfShape.substr(0,4)+"000";
                c.moveTo(410+30*row+3,320+30*col+28);
                c.lineTo(410+30*row+28,320+30*col+28);
                c.lineTo(410+30*row+28,320+30*col+3);
                c.lineTo(410+30*row+23,320+30*col+8);
                c.lineTo(410+30*row+23,320+30*col+23);
                c.lineTo(410+30*row+8,320+30*col+23);
                c.closePath();
                c.fill();
            }
        }
    }  
}


//retrive block color info from the color map
function setBlockColor(i,j){
	switch(blockColor[i][j]){
	case "#99CC00":
		c.fillStyle ="#99CC00";
		break;
	case "#000000":
		c.fillStyle ="#000000";
		break;
	case "#009933":
		c.fillStyle ="#009933";
		break;
	case "#FF6666":
		c.fillStyle ="#FF6666";
		break;
	case "#3399CC":
		c.fillStyle ="#3399CC";
		break;
	case "#CC3399":
		c.fillStyle ="#CC3399";
		break;
	case "#FFFF99":
		c.fillStyle ="#FFFF99";
		break;
	case "#FF9933":
		c.fillStyle ="#FF9933";
		break;
	default:
		c.fillStyle ="#000000";
		break;
	}
}


