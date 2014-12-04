function GetLandingHeight(testResult, orientation) {
	// Landing height is the height of newly placed shape
  var height = (19-testResult.landing_height) + ((orientation.length - 1) / 2);
  return height;
}

function GetRowTransitions(map_temp)
{		//10111010
	  var transitions = 0;
	  //101111
	  //In this example, there is two row transition, which are at first col and second col
	  for (var i = 0; i < map_temp.length; i++) {
	  		//each row from here:
		    for (var j = 0; j < 9; j++) {
			    	if(map_temp[i][j]!= map_temp[i][j+1])
			    		transitions++;
	  		}
	  	}
	  return transitions;
}

function GetColumnTransitions(map_temp)
{
	//101111
	//111111
	//In this example, there is one column transition, which is at second col
	  var transitions = 0;
	  for (var j = 0; j < 10; j++)
	  { //each column from here:
		  	for (var i = 0; i < map_temp.length-1; i++) 
			{
				if(map_temp[i][j]!= map_temp[i+1][j])
		    		transitions++;
		 	}
	  }
	  return transitions;
}

function GetNumberOfHoles(map_temp) 
{
	  var holes = 0;
	  for (var j = 0; j < 10; j++)
	  { //each column from here:
		  	for (var i = 0; i < 20; i++) 
			{
				if(map_temp[i][j]== 1)
				{ //if this is a 1 then find all 0 below it till there is a 1 or the bottom is reached
					for (var m = i+1; m< 20; m++) 
					{
						if(map_temp[m][j]==0)
							holes++;
						else
							break;
					}
		    	}	
		 	}
	  }
	  return holes;
}

function GetWellSums(map_temp)
{
	// ?
	  var well_sums = 0;
	  for (var i = 0; i < 10; i++) {
    		for (var j =0; j < 20; j++) {
    			if(i==0)
    			{
    				if(map_temp[j][i]==0 && map_temp[j][i+1] ==1)
    				{
    					for(var m=j; m<20; m++){
	    					if(map_temp[m][i]==0)
	    						well_sums++;
	    					else
	    						break;
	    				}
    				}
    			}
    			if(i==9)
    			{
    				if(map_temp[j][i]==0 && map_temp[j][i-1] ==1)
    				{
	    				for(var m=j; m<20; m++){
	    					if(map_temp[m][i]==0)
	    						well_sums++;
	    					else
	    						break;
	    				}
    				}
    			}
    			else
    			{
    				if(map_temp[j][i]==0 && map_temp[j][i-1] ==1 && map_temp[j][i+1]==1)
    				{
	    				for(var m=j; m<20; m++){
	    					if(map_temp[m][i]==0)
	    						well_sums++;
	    					else
	    						break;
	    				}
    				}

    			}	
    			
    		}
	   }
	   return well_sums;
}






