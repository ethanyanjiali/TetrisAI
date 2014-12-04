var keycom={"38":"rotate()","40":"down()","37":"moveLeft()","39":"moveRight()"};
var currentShape = PIECES[Math.floor(Math.random() * PIECES.length)];
var currentOrientation = 0;
var currentColumn = 5;

var playerBlockPositionMap_X = new Array(10);
var playerBlockPositionMap_Y = new Array(20);
var playerXPosition = 610;
var playerYPosition = 10;
var playerTurn = true;
var blockMap = new Array(20);

function initPlayer(){
        // X position of each block in each line j, width is 30
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
            blockMap[i][j] = "grey";
        }
    }
    prepareNextShape();
    var currentRow = findUpperBoundryOfCurrentColumn();
    drawBlockMap();
    drawCurrentShape(currentRow);
}



function drawBlockMap(){
    c.strokeStyle = 'black';
    c.lineWidth=1;
    for(var row=0; row<20; row++){
        for(var col=0; col<10; col++)
        {   
            c.fillStyle = blockMap[row][col];
                // Fill the block with color
            c.fillRect(playerBlockPositionMap_X[col],playerBlockPositionMap_Y[row],30,30);
                // Draw the boundry line of the block
            if(blockMap[row][col]!="grey"){
                c.strokeRect(playerBlockPositionMap_X[col],playerBlockPositionMap_Y[row],30,30);
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
    var rows_removed=0;
    for(i=0;i<20;i++)
    {
        var cancel = true;
        var rowCancel = i;
        for(j=0;j<10;j++)
        { //checking if this row is full to determine if needs to be cancelled
            if(blockMap[i][j]=="grey")
                cancel=false;
            else
                rowCancel=i;            
        }
        if(cancel==true)
        {//if this row needs to be cancelled, shift all blocks above down by 1 block
            rows_removed++;
            for(m=rowCancel;m>0;m--)
                for(n=0;n<10;n++)
                {
                    blockMap[m][n]=blockMap[m-1][n];
                }
        }
    }
    return rows_removed;        
}

function drawCurrentShape(currentRow){
    c.strokeStyle = 'black';
    c.lineWidth=1;
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
                c.fillRect(playerBlockPositionMap_X[col+currentColumn],playerBlockPositionMap_Y[currentRow-heightOfShape+1+row],30,30);
                // Draw the boundry line of the block
                c.strokeRect(playerBlockPositionMap_X[col+currentColumn],playerBlockPositionMap_Y[currentRow-heightOfShape+1+row],30,30);
            }
        }
    }  
}

function rotate(){
    if(playerTurn){
        currentOrientation = (currentOrientation + 1) % currentShape.length;
        var currentRow = findUpperBoundryOfCurrentColumn();
        drawBlockMap();
        drawCurrentShape(currentRow);
    }
}

function down(){
    if(playerTurn){
        var currentRow = findUpperBoundryOfCurrentColumn();
        putShapeIntoMap(currentRow);
        drawBlockMap();
        checkClearedLines();
        drawBlockMap();
        prepareNextShape();
        currentRow = findUpperBoundryOfCurrentColumn();
        drawCurrentShape(currentRow);
        playerTurn = false;
    }
}

function moveLeft(){
    if(playerTurn){
       if(currentColumn>0){
            currentColumn--;
            var currentRow = findUpperBoundryOfCurrentColumn();
            drawBlockMap();
            drawCurrentShape(currentRow);
            document.getElementById("currentColumn").innerHTML = currentColumn;
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
            document.getElementById("currentColumn").innerHTML = currentColumn; 
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

                if((currentShape[currentOrientation].orientation[i][j] == 1) && (blockMap[row-(heightOfShape-1)+i][currentColumn+j] != "grey")){
                    return row-1;
                }    
            }
        }
    }
    return 19;
}

function prepareNextShape(){
    currentShape = PIECES[Math.floor(Math.random() * PIECES.length)];
    currentOrientation = 0;
    currentColumn = 5;
}

document.onkeydown=function(e){
    eval(keycom[(e?e:event).keyCode]);
};