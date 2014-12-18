var keycom={"38":"rotate()","40":"down()","37":"moveLeft()","39":"moveRight()"};
var nextShape = PIECES[Math.floor(Math.random() * PIECES.length)]
var currentShape = PIECES[Math.floor(Math.random() * PIECES.length)];
var currentOrientation = 0;
var currentColumn = 5;
var lastShape;
var MAXTIME = 10;
var timeLeft = MAXTIME;
var isArcade = false;
var stonePos = 0;
var cnt1=0;

var playerBlockPositionMap_X = new Array(10);
var playerBlockPositionMap_Y = new Array(20);
var playerXPosition = 610;
var playerYPosition = 10;
var playerTurn = true;
var blockMap = new Array(20);
var player_rows_completed = 0;

function initPlayer(){
        // X position of each block in each line j, width is 30
    playerTurn = true;
    for(j=0;j<10;j++){
        playerBlockPositionMap_X[j] = playerXPosition;
        playerXPosition+=30;
    }
    // Y position of each block in each line j, height is 30
    for(i=0;i<20;i++){
        playerBlockPositionMap_Y[i] = playerYPosition;
        playerYPosition+=30;
    }

    for (i = 0; i < 20; i++) {
        blockMap[i] = new Array(10);
    }

    for(i=0;i<20;i++){
        for(j=0;j<10;j++){
            blockMap[i][j] = "#000000";//grey
        }
    }
    prepareNextShape();
    var currentRow = findUpperBoundryOfCurrentColumn();
    drawBlockMap();
    drawCurrentShape(currentRow);
    document.getElementById("difficulty").disabled = true;
}



function drawBlockMap(){
    c.strokeStyle = 'white';
    c.lineWidth=1;
    for(var row=0; row<20; row++){
        for(var col=0; col<10; col++)
        {   
            c.fillStyle = blockMap[row][col];
                // Fill the block with color
            c.fillRect(playerBlockPositionMap_X[col],playerBlockPositionMap_Y[row],30,30);
                // Draw the boundry line of the block
            if(blockMap[row][col]!="#000000"){//grey
                c.beginPath();
                c.fillStyle=blockMap[row][col].substr(0,4)+"000";
                c.moveTo(playerBlockPositionMap_X[col]+3,playerBlockPositionMap_Y[row]+28);
                c.lineTo(playerBlockPositionMap_X[col]+28,playerBlockPositionMap_Y[row]+28);
                c.lineTo(playerBlockPositionMap_X[col]+28,playerBlockPositionMap_Y[row]+3);
                c.lineTo(playerBlockPositionMap_X[col]+23,playerBlockPositionMap_Y[row]+8);
                c.lineTo(playerBlockPositionMap_X[col]+23,playerBlockPositionMap_Y[row]+23);
                c.lineTo(playerBlockPositionMap_X[col]+8,playerBlockPositionMap_Y[row]+23);
                c.closePath();
                c.fill();
                //c.strokeRect(playerBlockPositionMap_X[col],playerBlockPositionMap_Y[row],30,30);
            }
        }
    }
}

function putShapeIntoMap(currentRow){
    heightOfShape = currentShape[currentOrientation].height;
    widthOfShape = currentShape[currentOrientation].width;
    colorOfShape = GetColorReference(currentShape);
    for(var row=0; row<heightOfShape; row++){
        for(var col=0; col<widthOfShape; col++)
        {
            if(currentShape[currentOrientation].orientation[row][col]==1)
            {  
                blockMap[currentRow-heightOfShape+1+row][col+currentColumn] = colorOfShape;
            }
        }
    }
}

// This function is used to check how many rows can be cleared in this turn
function checkClearedLines(){
    for(i=0;i<20;i++)
    {
        var cancel = true;
        var rowCancel = i;
        for(j=0;j<10;j++)
        { //checking if this row is full to determine if needs to be cancelled
            if(blockMap[i][j]=="#000000")//grey
                cancel=false;
            else
                rowCancel=i;            
        }
        if(cancel==true)
        {//if this row needs to be cancelled, shift all blocks above down by 1 block
            player_rows_completed+=1;
            //remove player's line
            for(m=rowCancel;m>0;m--){
                for(n=0;n<10;n++)
                {
                    blockMap[m][n]=blockMap[m-1][n];
                }
            }
            //add ai's line
            if(!AImode && isArcade){
                if(cnt1>(6-currentLevel)){
                for(n=0;n<10;n++){
                    for(m=1;m<20;m++)
                    {
                        if(hasBlock[m][n]==1){
                            if(n%2==stonePos){
                                hasBlock[m-1][n]=1;
                                blockColor[m-1][n]="#999999";
                            } else {
                                hasBlock[m-1][n]=0;
                                blockColor[m-1][n]="#000000";    
                            } 
                            break;
                        }
                    }
                }
                cnt1=0;
            }
            cnt1++;
            }
            
/*            for(m=0;m<19;m++){
                for(n=0;n<10;n++)
                {
                    hasBlock[m][n]=hasBlock[m+1][n];
                    blockColor[m][n]=blockColor[m+1][n];
                }
            }
            for(n=0;n<10;n+=1){
                if(n%2==stonePos){
                    hasBlock[19][n]=1;
                    blockColor[19][n]="#999999";
                } else {
                    hasBlock[19][n]=0;
                    blockColor[19][n]="#000000";    
                } 
            }
            stonePos=1-stonePos;*/
        }
        stonePos=1-stonePos;
    }

}

function drawCurrentShape(currentRow){
    c.strokeStyle = 'red';
    c.lineWidth=2;
    heightOfShape = currentShape[currentOrientation].orientation.length;
    widthOfShape = currentShape[currentOrientation].orientation[0].length;
    colorOfShape = GetColorReference(currentShape);
    for(var row=0; row<heightOfShape; row++){
        for(var col=0; col<widthOfShape; col++)
        {
            if(currentShape[currentOrientation].orientation[row][col]==1)
            {
                c.fillStyle = colorOfShape;
                // Fill the block with color
                //c.fillRect(playerBlockPositionMap_X[col+currentColumn],playerBlockPositionMap_Y[currentRow-heightOfShape+1+row],30,30);
                // Draw the boundry line of the block
                c.strokeRect(playerBlockPositionMap_X[col+currentColumn],playerBlockPositionMap_Y[currentRow-heightOfShape+1+row],30,30);
                /*c.beginPath();
                c.fillStyle=colorOfShape.substr(0,4)+"000";
                c.moveTo(playerBlockPositionMap_X[col+currentColumn]+3,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+28);
                c.lineTo(playerBlockPositionMap_X[col+currentColumn]+28,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+28);
                c.lineTo(playerBlockPositionMap_X[col+currentColumn]+28,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+3);
                c.lineTo(playerBlockPositionMap_X[col+currentColumn]+23,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+8);
                c.lineTo(playerBlockPositionMap_X[col+currentColumn]+23,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+23);
                c.lineTo(playerBlockPositionMap_X[col+currentColumn]+8,playerBlockPositionMap_Y[currentRow-heightOfShape+1+row]+23);
                c.closePath();
                c.fill();*/
            }
        }
    }  
}

function rotate(){
    lastOrientation = currentOrientation;
    currentOrientation = (currentOrientation + 1) % currentShape.length;
    if(currentColumn<=(10-currentShape[currentOrientation].width)){
        if(playerTurn){
            //currentOrientation = (currentOrientation + 1) % currentShape.length;
            var currentRow = findUpperBoundryOfCurrentColumn();
            drawBlockMap();
            drawCurrentShape(currentRow);
        }
    }else{
        currentOrientation = lastOrientation;
    }
}

function down(){
    if(playerTurn){
        timeLeft = MAXTIME;
        window.clearInterval(timer);
        timer = setInterval(timeOut,1000);
        var currentRow = findUpperBoundryOfCurrentColumn();
        checkIfOver(currentRow);
        putShapeIntoMap(currentRow);
        drawBlockMap();
        checkClearedLines();
        drawBlockMap();
        prepareNextShape();
        currentRow = findUpperBoundryOfCurrentColumn();
        drawCurrentShape(currentRow);
        playerTurn = false;
            if(isArcade){
                if(player_rows_completed<15){
                    MAXTIME = 10;
                    currentLevel = 1;
                } else if(player_rows_completed<50){
                    MAXTIME = 8;
                    currentLevel = 2;
                } else if(player_rows_completed<100){
                    MAXTIME = 5;
                    currentLevel = 3;
                } else if(player_rows_completed<300){
                    MAXTIME = 3;
                    currentLevel = 4;
                } else if(player_rows_completed<500){
                    MAXTIME = 2;
                    currentLevel = 5;
                }
            }
    }
}

function checkIfOver(currentRow){
    if((currentRow-currentShape[currentOrientation].height)<=0){
        alert("Sorry, You lose. Tetris AI is UNBEATABLE!");
        window.location.reload(false); 
    }
}

function moveLeft(){
    if(playerTurn){
       if(currentColumn>0){
            currentColumn--;
            var currentRow = findUpperBoundryOfCurrentColumn();
            drawBlockMap();
            drawCurrentShape(currentRow);
        } 
    }
}

function moveRight(){
    if(playerTurn){
        if(currentColumn<10-currentShape[currentOrientation].width){
           currentColumn++;
            var currentRow = findUpperBoundryOfCurrentColumn();
            drawBlockMap();
            drawCurrentShape(currentRow);
        } 
    }
}

function findUpperBoundryOfCurrentColumn(){
    //if(orientation.length-1)
        //should fix a bug : block start from the middle where overlaps the exsistent block.
    // We start from No.(orientation.length-1) row in the game, until we reach the last row on the bottom
    heightOfShape = currentShape[currentOrientation].height;
    widthOfShape = currentShape[currentOrientation].width;
    //alert(currentShape[currentOrientation].orientation);
    for (var row = heightOfShape-1; row < 20; row++) {
        // test each row moving from top to bottom. if found conflict return row above
        for (var i = 0; i < heightOfShape; i++) { // Again, i stands for row number of that matrix
            for (var j = 0; j < widthOfShape; j++) { // j stands for col number of that matrix
                // When the bottom of the shape overlap with current landscape, we return the number of previous row
                // Can be further optimized, we just need to check the last row of shape

                if((currentShape[currentOrientation].orientation[i][j] == 1) && (blockMap[row-(heightOfShape-1)+i][currentColumn+j] != "#000000")){
                    return row-1;
                }    
            }
        }
    }
    return 19;
}

function prepareNextShape(){
    lastShape = currentShape;
    currentShape = nextShape;
    nextShape = PIECES[Math.floor(Math.random() * PIECES.length)];
    currentOrientation = 0;
    currentColumn = 5;
}

document.onkeydown=function(e){
    // prevent browser scrolling the window
    e.preventDefault();
    eval(keycom[(e?e:event).keyCode]);
};