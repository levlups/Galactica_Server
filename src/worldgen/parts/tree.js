var hash = require('murmur-numbers')
var ndarray = require('ndarray')
var blockIDs = require('../../blocks').getIDs()

function generateOakTree(seed) {
	var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])

	var size = Math.round( hash(seed*5) )

	var height = 4 + Math.round( hash(seed) ) + size*2

	for (var y = 0; y < height; y++) {
		gen.set(8, y, 8, blockIDs.log)
	}

    for (var x = -5 ; x <= 5; x++) {
		for (var y = -5; y <= 5; y++) {
			for (var z = -5; z <= 5; z++) {
				if (gen.get(x+8, y+height, z+8) == 0 && hash(x, y, z, seed*2) > 0.3 && dist(x, y, z) <= 3 + size) gen.set(x+8, y+height, z+8, blockIDs.leaves)
					
			}
		}
	}

	return gen
}

function generateBirchTree(seed) {
	var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])

	var size = Math.round( hash(seed*3) )

	var height = 5 + Math.round( hash(seed) ) + size*2

	for (var y = 0; y < height; y++) {
		gen.set(8, y, 8, blockIDs.birch_log)
	}

	for (var x = -5 ; x <= 5; x++) {
		for (var y = -5; y <= 5; y++) {
			for (var z = -5; z <= 5; z++) {
				if (gen.get(x+8, y+height, z+8) == 0 && hash(x, y, z, seed*2) > 0.3 && dist(x, y, z) <= 4 + size - Math.round( hash(x, y, z, seed*7) )) gen.set(x+8, y+height, z+8, blockIDs.birch_leaves)
			}
		}
	}

	return gen
}

function generatePool(seed) {
	var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])

	var size = Math.round( hash(seed*3) )

	var height = 5 + Math.round( hash(seed) ) + size*2

	

	for (var x = -5 ; x <= 5; x++) {
		for (var y = -5; y <= 0; y++) {
			for (var z = -5; z <= 5; z++) {
				if (gen.get(x+8, y+height, z+8) == 0 && hash(x, y, z, seed*2) > 0.3 && dist(x, y, z) <= 4 + size - Math.round( hash(x, y, z, seed*7) )) 
				if(x==-5|| x==5 || z==-5||z==5){
            gen.set(x+8, y+height, z+8, blockIDs.stone)
				}else{
				gen.set(x+8, y+height, z+8, blockIDs.grass_snow)
				}
					//gen.set(x+8, y+height, z+8, blockIDs.grass_snow)
			}
		}
	}

	return gen
}

function generateHouse(seed) {
	
	var gen = new ndarray( new Uint16Array(24 * 120* 24), [24, 120, 24])
	

	var height = 4//4+Math.round( hash(seed) ) + size*2


	
		  var rad=11;// was 6 //was 9
		  
for (var i=-rad;i<=rad+1;i++){
		for (var k=-rad;k<=rad+1;k++){
		//for (var j=-rad+6;j<=rad;j++) {
			for (var j=-50;j<=110;j++) {
				 
				if(j<0 && j  >-50){
			    gen.set(i+rad,j+8,k+rad,blockIDs.stone)
				}
				
				if(i==-rad|| i== rad+1 || k==-rad || k==rad+1 || j<=-50 || j==rad ){
					
					if(j==rad){
						gen.set(i+rad,j+8,k+rad,blockIDs.birch_log)
					}
					
					else if(i==5 && j==-5&& k==rad+1){
						gen.set(i+rad,j+height,k+rad,blockIDs.door)
						gen.set(i+rad,j+height,k+rad-6,blockIDs.chest)
					}
					else if(i==5 && j>=-5 && j<=0&& k==rad+1){
					}
					else{
					
					gen.set(i+rad,j+8,k+rad,blockIDs.sand)
					}
				
				}
				
				/* if(j<0 ){
					 gen.set(i+rad,j,k+rad,blockIDs.stone)
				 }*/
		 }
		}
   }
  
   



	return gen
}

function generateHouse2(seed) {
	
	var gen = new ndarray( new Uint16Array(24 * 120* 24), [24, 120, 24])
	

	var height = 4//4+Math.round( hash(seed) ) + size*2
	
	
		  var rad=11;
		  
for (var i=-rad;i<=rad;i++){
		for (var k=-rad;k<=rad;k++){
		for (var j=-rad;j<=rad;j++) {
			
			if (i*i + j*j+ k*k <= rad*rad  ) {
				
				//if (i*i + j*j+ k*k <= rad*rad) {
				
					for(var yo=0;yo<20;yo++){
						 gen.set(i+rad,yo,k+rad,blockIDs.stone)
						
						   
					}				
				
			}
			
		 }
		}
   }
	return gen


	
		  /*var rad=11;// was 6 //was 9
		  
for (var i=-rad;i<=rad+1;i++){
		for (var k=-rad;k<=rad+1;k++){
		//for (var j=-rad+6;j<=rad;j++) {
			for (var j=-50;j<=70;j++) {
				 
				if(j<0 && j  >-50){
			    gen.set(i+rad,j+8,k+rad,blockIDs.stone)
				}
				
				if(i==-rad|| i== rad+1 || k==-rad || k==rad+1 || j<=-50 || j==rad ){
					
					if(j==rad){
						gen.set(i+rad,j+8,k+rad,blockIDs.birch_log)
					}
					
					else if(i==5 && j==-5&& k==rad+1){
						gen.set(i+rad,j+height,k+rad,blockIDs.door)
						gen.set(i+rad,j+height,k+rad-6,blockIDs.chest)
					}
					else if(i==5 && j>=-5 && j<=0&& k==rad+1){
					}
					else{
							
					}
				
				}
				
		 }
		}
   }
  
   



	return gen*/
}

function generateSandHouse(seed) {
	
	var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])
	
	var size = Math.round( hash(seed*3) )

	var height = 4+Math.round( hash(seed) ) + size*2


	
		  var rad=4;
		  
for (var i=-rad;i<=rad;i++){
		for (var k=-rad;k<=rad;k++){
		for (var j=-rad;j<=rad;j++) {
			     
				//if(i==1 && i== rad || k==1 && k==rad || j==1 && j==rad){
				//noa.addBlock(1,[Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k]);
				if(i==-rad|| i== rad || k==-rad || k==rad || j==-rad || j==rad ){
					
					if(j==rad){
						gen.set(i+8,j+height,k+8,blockIDs.sand)
					}
					else if(j==-rad){
						gen.set(i+8,j+height,k+8,blockIDs.stone)
					}
					
					else if(i==2 && j==1 && k==rad){
					}
					else if(i==2 && j==2 && k==rad){
					}else{
					gen.set(i+8,j+height,k+8,blockIDs.sand)
					}
				//gen.set(x,y+height,z,blockIDs.log)socket.emit('block-place', [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k])
				}else{
					gen.set(i+8,j+height,k+8,0)
				}
				//}
		 }
		}
   }


	return gen
}

function generateCave(seed){
	
	var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])
	
	//var gen = new ndarray( new Uint16Array(24 * 24 * 24), [24, 24, 24])

	var size = Math.round( hash(seed*3) )

	var height = 4+Math.round( hash(seed) ) + size*2


	
		  var rad=4;
		  
for (var i=-rad/2;i<=rad/2;i++){
		for (var k=-rad/2;k<=rad/2;k++){
		for (var j=-rad;j<=rad;j++) {
			     gen.set(i+8,j+height,k+8,blockIDs.air)
			
		 }
		}
   }
	return gen
	
	
}

function generateSpiral(seed){
	
	//var gen = new ndarray( new Uint16Array(16 * 16 * 16), [16, 16, 16])
	
	var gen = new ndarray( new Uint16Array(24 * 120* 24), [24, 120, 24])
	
	//var gen = new ndarray( new Uint16Array(24 * 24 * 24), [24, 24, 24])
	
	
	var radius=20//was 4 to be in middle  // 10 good for one cave
    var y=0
	
	var block=blockIDs.stone
for (var radians=0;radians<Math.PI*2;radians+=0.1){

     var x=radius*Math.cos(radians)
       y+=0.5
      var z=radius*Math.sin(radians)
	  if(y==3){
		  block=blockIDs.watersource
		  
	  }else{
		  block=blockIDs.stone
	  }
	 
	  
	  gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+2,Math.floor(z)+10,block)
	     gen.set(Math.floor(x)+10,Math.floor(y)-10+3,Math.floor(z)+10,block)
		 
		 
		 gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10+1,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10+1,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+2,Math.floor(z)+10+1,block)
	     gen.set(Math.floor(x)+10,Math.floor(y)-10+3,Math.floor(z)+10+1,block)
		 
		 
		 gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10+2,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10+2,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+2,Math.floor(z)+10+2,block)
	     gen.set(Math.floor(x)+10,Math.floor(y)-10+3,Math.floor(z)+10+2,block)
	  /*gen.set(Math.floor(x)+10+1,Math.floor(y)-10,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10-1,Math.floor(y)-10,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10+1,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10-1,block)
	   
	   
	  
	  gen.set(Math.floor(x)+10+2,Math.floor(y)-10,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10-2,Math.floor(y)-10,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10+2,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10,Math.floor(z)+10-2,block)
	   
	   
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10,block)
	  gen.set(Math.floor(x)+10+1,Math.floor(y)-10+1,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10-1,Math.floor(y)-10+1,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10+1,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10-1,block)
	   
	   
	    gen.set(Math.floor(x)+10+2,Math.floor(y)-10+1,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10-2,Math.floor(y)-10+1,Math.floor(z)+10,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10+2,block)
	   gen.set(Math.floor(x)+10,Math.floor(y)-10+1,Math.floor(z)+10-2,block)*/

    
}


	/*var size = Math.round( hash(seed*3) )

	var height = 4+Math.round( hash(seed) ) + size*2


	
		  var rad=4;
		  
for (var i=-rad/2;i<=rad/2;i++){
		for (var k=-rad/2;k<=rad/2;k++){
		for (var j=-rad;j<=rad;j++) {
			     gen.set(i+8,j+height,k+8,blockIDs.air)
			
		 }
		}
   }*/
	return gen
	
	
}




function dist(x, y, z) {
	return Math.sqrt(x*x + y*y + z*z)
}

module.exports = {
	oakTree: generateOakTree,
	birchTree: generateBirchTree,
	house: generateHouse,
	house2: generateHouse2,
	spiral: generateSpiral,
	sandhouse:generateSandHouse,
	cave: generateCave,
	pool: generatePool
}