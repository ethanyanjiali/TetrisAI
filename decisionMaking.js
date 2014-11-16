// this is for the computer to make decision based on the feature evaluation function

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
		    if (testResult.This_is_gameOverColumn==false) {
		        	decisionScore = evaluateDecision(testResult,orientation);

			        if (decisionScore > decisionScore_best) {
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

function testThisColumn(orientation, column, blockMap_temp){

	  var placementRow = getPlacementRow(blockMap_temp, orientation, column);

	  if (placementRow - orientation.length < 0) {
	    return { 'This_is_gameOverColumn' : true };
	  }

	  	  // update the map with the placed shape
	  for (var i = 0; i < orientation.length; i++) {
      		for (var j = 0; j < orientation[i].length; j++) {
      			if(orientation[i][j]==1)
      				blockMap_temp[placementRow-(orientation.length-1)+i][column+j]=1;
      		}
       }

	  // calculate how many rows can be cancelled out
	  var rowsRemoved=0;
	  for(i=0;i<20;i++)
	  {
			var cancel = true;
			for(j=0;j<10;j++)
			{ //checking if this row is full to determine if needs to be cancelled
				if(blockMap_temp[i][j]==false)
					cancel=false;			
			}	
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

function getPlacementRow(blockMap_temp, orientation, column){
	//if(orientation.length-1)
		//should fix a bug : block start from the middle where overlaps the exsistent block.
  for (var row = orientation.length-1; row < 20; row++) {
	    // test each row moving from top to bottom. if found conflict return row above
	    for (var i = 0; i < orientation.length; i++) {
	    	for (var j = 0; j < orientation[i].length; j++) {
	    		if(orientation[i][j] * blockMap_temp[row-(orientation.length-1)+i][column+j] == 1)
	    			return row-1;
    		}
		}
	}
	return 19;
}



















