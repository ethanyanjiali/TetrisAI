// this is for the computer to make decision based on the feature evaluation function

// This function is used to calculate evaluation function accroding to hard code weight
function evaluateDecision(testResult,orientation) {

	  return GetLandingHeight(testResult, orientation) * -4.500158825082766 +
	      testResult.rows_removed * 3.4181268101392694 +
	      GetRowTransitions(testResult.map_temp) * -3.2178882868487753 +
	      GetColumnTransitions(testResult.map_temp) * -9.348695305445199 +
	      GetNumberOfHoles(testResult.map_temp) * -7.899265427351652 +
	      GetWellSums(testResult.map_temp) * -3.3855972247263626;
}

//this func is to pick the best move by trying all moves and evaluating them:
function pickDecision(piece){
	var decisionScore_best = -100000;
	var decisionScore = undefined;
  	var orientation_best = 0;
  	var column_best = 0;
  	var row=0;

  	// Evaluate all possible orientations of this shape
  	for (var i in piece) {
  		//get one orientation of the shape
    	var orientation = piece[i].orientation;

	 	// Evaluate all possible columns: shift this orientation from left2right
	    for (var j = 0; j < 10 - piece[i].width + 1; j++) {

	    	//make a copy of the map for manipulation and test/evaluation
			var blockMap_temp = new Array(20);
			for (var m = 0; m < 20; m++) {
			    blockMap_temp[m] = new Array(10);
			}
			for(var a=0;a<20;a++)
				for(var b=0;b<10;b++)
					blockMap_temp[a][b] = hasBlock[a][b];

			//test this colum and return result
		    var testResult = testThisColumn(orientation, j, blockMap_temp);
		    // evaluate this column placement
		    // if the game is not over, continue on calculating its evaluation function
		    if (testResult.This_is_gameOverColumn==false) {
		    		// calculating the score of specifed test result and orientation according to function
		        	// test result include the updated map
		        	decisionScore = evaluateDecision(testResult,orientation);
			        if (decisionScore > decisionScore_best) {
			        	// if this decision is better, record its info
				          decisionScore_best = decisionScore;
				          orientation_best = i;
				          column_best = j;
				          row=testResult.landing_height;
			        }
	      	}
	    }
	  }
	  	//alert(decisionScore);
	  if(decisionScore==undefined)
	  	return { 'noMoveCanMake' : true };
	//return the best decision or no move 
    return {
	    'orientation': piece[orientation_best].orientation,
	    'column': column_best,
	    'row':row,
	    'noMoveCanMake': false
  	};
}

// This function is used to test specified column to find out what will happen if we place the shape in this colum
function testThisColumn(orientation, column, blockMap_temp){

	// placementRow stands for the most possible row position of that shape 
	var placementRow = getPlacementRow(blockMap_temp, orientation, column);
	// If the row position is higher than orientation.length, then game over
	if (placementRow - orientation.length < 0) {
	    return { 'This_is_gameOverColumn' : true };
	}

	// update the map with the placed shape
	// Iterate each block in that shape, the shape is consist of several blocks in specific arragement
	for (var i = 0; i < orientation.length; i++) { // i stands for row
      	for (var j = 0; j < orientation[i].length; j++) { //j stands for column
      		if(orientation[i][j]==1)	// if this block is used in shape arragement matrix
      			// placementRow-(orientation.length-1)+i
      			// Above formula is used to calculate the position of corresponding block in entire game
      			// For example, placementRow will be 20 at start of the game because there's no shape in game
      			// Then, in terms of shape I, in column 0, map[17][0], map[18][0], map[19][0], map[20][0] will be filled in order
      			blockMap_temp[placementRow-(orientation.length-1)+i][column+j]=1;
      	}
    }

	  // calculate how many rows can be cancelled out
	  var rowsRemoved=0;
	  // Check each row
	  for(i=0;i<20;i++)
	  {
			var cancel = true;
			// Check each block in row i
			for(j=0;j<10;j++)
			{  
				// If one block in this row is not filled
				if(blockMap_temp[i][j]==false)
					// then this row should not be canceled
					cancel=false;			
			}	
			//if all the block in this row is filled, then add to cnt
			if(cancel==true)
				rowsRemoved++;			
	  }
	  return { //return test result of this column
	    'landing_height' : placementRow,
	    'map_temp' : blockMap_temp,
	    'rows_removed' : rowsRemoved,
	    'This_is_gameOverColumn' : false
	  };
}

// This function is used to calculate the row position to palce the new shape
// orientation is the block arrangment of that shape, its lengths indicate how many rows in this arrangement matrix
function getPlacementRow(blockMap_temp, orientation, column){
	//if(orientation.length-1)
		//should fix a bug : block start from the middle where overlaps the exsistent block.
	// We start from No.(orientation.length-1) row in the game, until we reach the last row on the bottom
  	for (var row = orientation.length-1; row < 20; row++) {
	    // test each row moving from top to bottom. if found conflict return row above
	    for (var i = 0; i < orientation.length; i++) { // Again, i stands for row number of that matrix
	    	for (var j = 0; j < orientation[i].length; j++) { // j stands for col number of that matrix
	    		// When the bottom of the shape overlap with current landscape, we return the number of previous row
	    		// Can be further optimized, we just need to check the last row of shape
	    		if(orientation[i][j] * blockMap_temp[row-(orientation.length-1)+i][column+j] == 1)
	    			return row-1;
    		}
		}
	}
	return 19;
}



















