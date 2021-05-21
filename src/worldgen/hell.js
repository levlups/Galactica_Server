
const { makeNoise2D, makeNoise3D } = require('open-simplex-noise')
const tree = require('./parts/tree')
var hash = require('murmur-numbers')

function getHighestBlock(chunk, x, z) {
	for (var y = 120 - 1; y >= 0; y = y - 1) {
		var val = chunk.get(x, y, z)
		if (val != 0 && val != 9) return {level: y, block: val}
	}
	return null
}
var numvillage=3;
var loaddelay=300;
module.exports = class {
	constructor(seed, blocks) {
		this.name = 'normal'
		this.blockIDs = blocks
		this.seed = seed
		this.heightNoise = makeNoise2D(Math.round(seed * Math.sin(seed^1) * 10000))
		this.caveNoise = makeNoise3D(Math.round(seed * Math.sin(seed^2) * 10000))
		this.biomeNoise1 = makeNoise2D(Math.round(seed * Math.sin(seed^3) * 10000))
		this.biomeNoise2 = makeNoise2D(Math.round(seed * Math.sin(seed^4) * 10000))
		this.biomeNoise3 = makeNoise2D(Math.round(seed * Math.sin(seed^5) * 10000))
		this.plantSeed = Math.round(seed * Math.sin(seed^6) * 10000) 

		this.biomeSpacing = 200 // Size of biomes //was 100

		this.chunkWitdh = 24
		this.chunkHeight = 120
		this.waterLevel = 40
	}

	getBlock(x, y, z) {
		var m = this.biomeNoise2((x)/180, (z)/180)
		var r = this.getHeightMap(x, -y, z, m)
		if (y <= r) return this.blockIDs.stone
		else if (y == this.waterLevel-1) return this.blockIDs.watertop
		else if (y < this.waterLevel-1) return this.blockIDs.water
		else return 0
	}


	getHeightMap(x, y, z, mountaines) {
		var dim = (this.caveNoise(x/180, y/180, z/180)+0.3)*140
		var dim2 = (this.caveNoise(x/20, y/20, z/20))*50
		var layer1 = this.heightNoise(x/140, z/140)*mountaines*20
		var layer2 = this.heightNoise(x/40, z/40)*20
			
		return Math.floor((dim*30+dim2*20+layer1*20+layer2*10-3)/65) + 30
	}

	getBiome(x, z/*, temperature, biomerng*/) {
		
		var temperature=this.heightNoise(x/100, z/100)*20
		var biomerng=this.heightNoise(x/20, z/20)*30
		if (0.2 < temperature && biomerng < 0.3) return 'desert'
		else if ( 1 < temperature < -0.2 && biomerng < 0.1) return 'iceland'
		else if ( 0.3 < temperature < 0.3 && biomerng < 0.2) return 'plants'
		else return 'plants'
	}



	generateChunk(id, chunk) {
		
var size = Math.round( hash(this.seed*5) )
		var xoff = id[0]*this.chunkWitdh
		var zoff = id[1]*this.chunkWitdh

		for (var x = 0; x < this.chunkWitdh; x++) {
			for (var z = 0; z < this.chunkWitdh; z++) {
				for (var y = 0; y < this.chunkHeight; y++) {
					var block = this.getBlock(x+xoff, y, z+zoff)
					//var c=Math.sin(x)
					//var d=Math.sin(z)
					//var biome = 'plants'//this.getBiome(x, z, c, d)//'plants'
					var biome = this.getBiome(x+xoff,z+zoff )//'plants'
					//console.log(biome)
					if (block != 0) {
						
						
						
						///flat//////////////
						for (y = 0; y <= 70; y++) {
					chunk.set(x, y, z, this.getBlock(x + xoff, y, z + zoff,this.blockIDs.stone));
				}
				
				///flat//////////////
				///helll////
				/*for (y = 0; y <= 70; y++) {
					if(this.biomeNoise2((x)/180, (z)/180) <0.2){
					chunk.set(x, y, z, this.getBlock(x + xoff, y, z + zoff,this.blockIDs.stone));
					}
				}
				
				/////////////////////////////
				
				
				
				
						/*if( this.getBlock(x+xoff, y+1, z+zoff) == 0){
							chunk.set(x, y, z, this.blockIDs.stone)
							return chunk
						}*/
						
						/*if((this.caveNoise(x+xoff/180, y/180, z+zoff/180)+0.3)*140){
						chunk.set(x, y, z, this.blockIDs.stone)
							return chunk
							//space game
						}*/
							///
						if (y>50 && this.getBlock(x+xoff, y, z+zoff) == 1 && this.getBlock(x+xoff, y+1, z+zoff) == 0 ) {
							if(biome == 'plants') chunk.set(x, y, z, this.blockIDs.grass_snow)
						}
						else if (0 < y < 50 && this.getBlock(x+xoff, y, z+zoff) == 1 && this.getBlock(x+xoff, y+1, z+zoff) == 0 ) {
							if (biome == 'plants' || biome == 'forest') chunk.set(x, y, z, this.blockIDs.grass)
							else if (biome == 'iceland') chunk.set(x, y, z, this.blockIDs.grass_snow)
							else if (biome == 'desert') chunk.set(x, y, z, this.blockIDs.sand)
						}
					    
						else if (this.getBlock(x+xoff, y+1, z+zoff) != 0 && this.getBlock(x+xoff, y, z+zoff) != this.blockIDs.water && this.getBlock(x+xoff, y+3, z+zoff) == 0) {
							if (biome == 'plants' || biome == 'forest' || biome == 'iceland') chunk.set(x, y, z, this.blockIDs.dirt)
							else if (biome == 'desert') chunk.set(x, y, z, this.blockIDs.sand)
						}
					     else if (this.getBlock(x+xoff, y, z+zoff) == this.blockIDs.water && this.getBlock(x+xoff, y+1, z+zoff) == 0 && this.getBlock(x+xoff, y-2, z+zoff) != this.blockIDs.water /*&& this.getBlock(x+xoff, y-2, z+zoff) == this.blockIDs.dirt*/ ) {
							
									//if(hash( (x+xoff), (z+zoff), this.seed) < 0.2){
										
										//if(biome=='plant'){
										//if(y>38 ){
									chunk.set(x, y, z, this.blockIDs.ice)
										//}/*else{
											//chunk.set(x, y, z, this.blockIDs.water)
										//}*/
											
										//}
								//}
						}
					    else if (this.getBlock(x+xoff, y+1, z+zoff) == this.blockIDs.water && this.getBlock(x+xoff, y, z+zoff) != 0 && this.getBlock(x+xoff, y, z+zoff) != this.blockIDs.water) {
							
							if(this.biomeNoise2((x)/18, (z)/18) < 0.2){
							chunk.set(x, y, z, this.blockIDs.gravel)
							}else{
								chunk.set(x, y, z, this.blockIDs.sand)
							}
						}
					     
						
						else chunk.set(x, y, z, block)
					}
				}
			}
			//if(Math.random()*100<2){
				//var gen = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5834 )
			//this.addWorldFeatures(chunk, x, y, z,0)
			this.addWorm(chunk, x, y, z,0)
			//}
		}
       
		
		for (var x = 0; x < chunk.shape[0]; x++) {
			for (var z = 0; z < chunk.shape[2]; z++) {
				
				
				/*if(true){
					var radius=10
					for (var radians=0;radians<Math.PI*2;radians+=0.1){

     var x1=radius*Math.cos(radians)
      var y1=radius*Math.sin(radians)
      var z1=radius*Math.sin(radians)
					chunk.set(Math.floor(x1), Math.floor(y1), Math.floor(z1), this.blockIDs.grass_plant)
					}
					
				}*/
				if(true){
					if (x==12 && z==12){
					loaddelay-=10
					
					}
					if (x==12 && z==12 && loaddelay<0 ) { 
					
							var high = {...getHighestBlock(chunk, x, z)}
										
										
										//if(hash( (x+xoff), (z+zoff), this.seed) < 0.8){
											numvillage--
											
											if(numvillage<-20){
												numvillage=3
											}
											if(numvillage>0){
												
										var gen = tree.house( 0 )
										//var gen2 = tree.house2( 0 )
										var gen2 = tree.spiral( 0 )
										//if (high.block !== this.blockIDs.gravel) {
											if(numvillage==2){
												this.pasteStructure(chunk, gen2, x, 64, z)
											}else{
											this.pasteStructure(chunk, gen2, x, 64, z)
											}
													/*if(numvillage==1){
														this.pasteStructure(chunk, gen, x, 64, z)
													}else{
													this.pasteStructure(chunk, gen, x, 64, z)
													}*/
										//}
										}
							
										//}
					}
							
				}
				
				//if ( x%2==12 && 8 < x && x < 16 && 8 < z && z < 16 ) {
					/*if ( (x+xoff)%2==2) {
						var high = {...getHighestBlock(chunk, x, z)}
						//if (high.block == this.blockIDs.water) {
							var gen = tree.sandhouse( hash( (x+xoff), (z+zoff), this.seed)*5838 )
						
							this.pasteStructure(chunk, gen, x, high.level +1, z)
							
						//}
						
					}*/
					
					
				if ( hash( (x+xoff), (z+zoff), this.plantSeed) < 0.1 ) {
					var high = {...getHighestBlock(chunk, x, z)}
					if (high.block == this.blockIDs.grass) {
						
						chunk.set(x, high.level+1, z, this.blockIDs.grass_plant)
					}
					
					if (high.block == this.blockIDs.gravel) {
						if( ( ( hash( x+xoff, y, z+zoff, this.plantSeed) < 0.05 ))){
						chunk.set(x, high.level+1, z, this.blockIDs.kelp)
						
								var val = chunk.get(x, high.level+3, z)
								
							
								
								if(val==102){
									chunk.set(x, high.level+2, z, this.blockIDs.kelp)
									chunk.set(x, high.level+3, z, this.blockIDs.kelp)
								}
								
						}
					}
				}
				
				else if ( hash( (x+xoff), (z+zoff), this.plantSeed*2) < 0.1 ) {
					var high = {...getHighestBlock(chunk, x, z)}
					if (high.block == this.blockIDs.grass) {
						chunk.set(x, high.level+1, z, ( ( hash( x+xoff, y, z+zoff, this.plantSeed) <= 0.5 ) ? this.blockIDs.red_flower : this.blockIDs.yellow_flower ) )
					}
					if (high.block == this.blockIDs.gravel) {
						if( ( ( hash( x+xoff, y, z+zoff, this.plantSeed) < 0.1 ))){
						chunk.set(x, high.level+1, z, this.blockIDs.kelp)
						}
					}
				}
				//else if (hash( (x+xoff), (z+zoff), this.seed*5) < 0.007  ) {
					
					else if (x==5 && z==5 ) {
							//if (high.level == 41 ) {
							//var gen = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//var gen2 = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//this.pasteStructure(chunk, gen, x, 41, z)
							
							
							
							//this.pasteStructure(chunk, gen2, x, 40 -8, z)
							
							
							
							//this.pasteStructure(chunk, gen, x, high.level +1, z+10)
							//if ( 5 < x && x < 17 && 5 < z && z < 17){
								//numvillage--
							
							//var gen = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							
							if(hash( (x+xoff), (z+zoff), this.seed) < 0.8){
								
							//var gen = tree.house( 0 )
							//var gen = tree.pool( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//var gen2 = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//if (high.level == 41 ) {
							//this.pasteStructure(chunk, gen, x, 40-8, z)
							//this.pasteStructure(chunk, gen, x, 40, z)
							//}
							//}
							
								//var gen2 = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5836 )
								//this.pasteStructure(chunk, gen2, x, 40, z)
							}
						}
						else if (x==12 && z==12 ) { // x==17 && z==17
							
							/*var high = {...getHighestBlock(chunk, x, z)}
							
							
							if(hash( (x+xoff), (z+zoff), this.seed) < 0.8){
								numvillage--
								
								if(numvillage<-40){
									numvillage=4
								}
								if(numvillage>0){
							var gen = tree.house( 0 )
							var gen2 = tree.pool( 0 )
							if (high.block !== this.blockIDs.gravel) {
										if(numvillage==1){
											this.pasteStructure(chunk, gen2, x, 64, z)
										}else{
										this.pasteStructure(chunk, gen, x, 64, z)
										}
							}
							}
				
							}*/
						}/*else if (x==5 && z==5 ) {
							
							var high = {...getHighestBlock(chunk, x, z)}
							
							
							if(hash( (x+xoff), (z+zoff), this.seed) < 0.8){
								numvillage--
								
								if(numvillage<-40){
									numvillage=4
								}
								if(numvillage>0){
							var gen = tree.house( 0 )
							var gen2 = tree.pool( 0 )
							if (high.block !== this.blockIDs.gravel) {
										if(numvillage==1){
											this.pasteStructure(chunk, gen2, x, high.level-3, z)
										}else{
										this.pasteStructure(chunk, gen, x, high.level-3, z)
										}
							}
							}
							
							}
						}*/
			
				else if ( 5 < x && x < 17 && 5 < z && z < 17) { //Temp
					if ( hash( (x+xoff), (z+zoff), this.seed) < 0.02 ) {
						var high = {...getHighestBlock(chunk, x, z)}
						if (high.block == this.blockIDs.grass) {
							var gen = tree.oakTree( hash( (x+xoff), (z+zoff), this.seed)*1000 )
							
							//this.pasteStructure(chunk, gen, x, high.level + 1, z)
							this.pasteStructure(chunk, gen, x, high.level+1, z)
							
						}
					} /*else if ( hash( (x+xoff), (z+zoff), this.seed*5) < 0.007 ) {
						var high = {...getHighestBlock(chunk, x, z)}
						if (high.block == this.blockIDs.grass) {
							var gen = tree.birchTree( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							this.pasteStructure(chunk, gen, x, high.level + 1, z)
						}
					}*/else if ( hash( (x+xoff), (z+zoff), this.seed*5) < 0.005 ) {
						var high = {...getHighestBlock(chunk, x, z)}
						if (high.block == this.blockIDs.sand) {
							//var gen = tree.birchTree( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//this.pasteStructure(chunk, gen, x, high.level + 1, z)
							chunk.set(x, high.level+1, z, this.blockIDs.watersource)
							
						}
					}
					else if ( hash( (x+xoff), (z+zoff), this.seed*5) < 0.006 ) {
						var high = {...getHighestBlock(chunk, x, z)}
						if (high.block == this.blockIDs.sand) {
							//var gen = tree.birchTree( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//this.pasteStructure(chunk, gen, x, high.level + 1, z)
							chunk.set(x, high.level+1, z, this.blockIDs.cactus)
							chunk.set(x, high.level+2, z, this.blockIDs.cactus)
						}
					}
					else if ( hash( (x+xoff), (z+zoff), this.seed*5) < 0.007 ) {
						var high = {...getHighestBlock(chunk, x, z)}
						
						//if (true/*high.block == this.blockIDs.sand || high.block == this.blockIDs.grass*/ ) {
							//if (high.level == 41 ) {
							//var gen = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//var gen2 = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5834 )
							//this.pasteStructure(chunk, gen, x, 41, z)
							
							
							
							//this.pasteStructure(chunk, gen2, x, 40 -8, z)
							
							
							
							//this.pasteStructure(chunk, gen, x, high.level +1, z+10)
							
							
							//var gen = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//var gen = tree.pool( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//var gen2 = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//if (high.level == 41 ) {
							//this.pasteStructure(chunk, gen, x, 40-8, z)
							//this.pasteStructure(chunk, gen, x, 40, z)
							//}
							
								//var gen2 = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5836 )
								//this.pasteStructure(chunk, gen2, x, 40, z)
						//}
						/*if (high.block == this.blockIDs.sand || high.block == this.blockIDs.grass ) {
							
							//var gen = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//var gen = tree.pool( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//var gen2 = tree.cave( hash( (x+xoff), (z+zoff), this.seed)*5835 )
							//if (high.level == 41 ) {
							//this.pasteStructure(chunk, gen, x, 40-8, z)
							//this.pasteStructure(chunk, gen, x, 41, z)
							//}
							
								//var gen2 = tree.house( hash( (x+xoff), (z+zoff), this.seed)*5836 )
								//this.pasteStructure(chunk, gen2, x, 41, z)
						}*/
							
					
					}
				}
			}
		}

		
		return chunk

	}


	pasteStructure(chunk, gen, x, y, z) {
		var xm = Math.round(gen.shape[0]/2)
		var zm = Math.round(gen.shape[2]/2)

		for (var i = 0; i < gen.shape[0]; i++) {
			for (var j = 0; j < gen.shape[1]; j++) {
				for (var k = 0; k < gen.shape[2]; k++) {
					if (gen.get(i, j, k) != 0) { 
					
					var val = chunk.get(x-xm+i, y+j, z-zm+k)
					if(val!==9){
						chunk.set(x-xm+i, y+j, z-zm+k, gen.get(i, j, k) ) 
					}
						
					}
				}
			}
		}
	}
	
	
	addWorm(chunk,x,y,z,block){
		var cv, ctx, cx, cy,cz, w, h,z, bcv, bctx;
var CIR = 'circle';

var RAD = 180/Math.PI;
var BUFFER_DATA;

var circles = [];

function createCircles(total) {
for (var i = 0; i < total; i++ ) {
circles.push({
x : cx,
y : cy,
z : cz,
r : random(0, 360),
s : random(0,2),
vx : 0,
vy : 0,
vz:0  ,
vr : random(-1,1),
colour : '#005959',//COLOURS[Math.floor(Math.random() * COLOURS.length)],
size : 1,//random(1,20),
type : CIR//CIR//SHAPE_TYPES[Math.floor(Math.random()*SHAPE_TYPES.length)]
});
}
}

function render() {

// console.log("rendering", circles.length)
var l = circles.length;
for (var i = 0;i < l; i++) {
var p = circles[i];
//p.vr += random(-1,1) / 2;
p.r += random(-20,20);
//p.r += p.vr;
p.vx = p.s * Math.cos(p.r / RAD);
p.vy = p.s * Math.sin(p.r / RAD);
p.vz= p.s*Math.sin(p.r / RAD);
p.x += p.vx;
p.y += p.vy;
p.z += p.vz
if (p.x > w) { p.x = 0}
else if (p.x < 0) { p.x = w }
if (p.y < 0) { p.y = h;}
else if (p.y > h) {p.y = 0; }
if (p.z < 0) { p.z = z;}
else if (p.z > z) {p.z = 0; }



//console.log(p.x+':'+p.z+':'+p.y)
for (var bb=-1; bb<=1; ++bb) { 
					  for (var cc=-2; cc<=2; ++cc) { 
						for (var dd=-1; dd<=1; ++dd) {
							
							var val = chunk.get(Math.floor(p.x)+bb,-20+Math.floor( p.y)+cc,Math.floor( p.z)+dd)
											if(val!==9){
													
							chunk.set(Math.floor(p.x)+bb,-20+Math.floor( p.y)+cc,Math.floor( p.z)+dd,0)
											}
						}
					  }
}

}
//requestAnimationFrame(render, FPS);
}

function init() {
createCanvas();
//createBufferCanvas();
createCircles(1);
for (var i=0;i<20;i++){
render();
}
}

init();

//--UTILS-----------------------
function createCanvas() {
	z=100
	 w = 100;
    h = 100;
cx = w/ 2;
    cy = h/ 2;
	cz=z/2;
  /*cv = document.getElementById("mycanvas");
  cv.width = document.body.clientWidth;
  console.log(document.body.clientHeight)
  cv.height = window.innerHeight;
  if (cv.getContext) {
    ctx = cv.getContext('2d');
    w = cv.width;
    h = cv.height;
    cx = w / 2;
    cy = h / 2;
  } else {
    alert("This browser does not support canvas");
  }*/
}

function random(min,max) {
  return Math.random() * (max - min) + min;
}

/*function clearCanvas(opacity) {
  ctx.globalAlpha = opacity;
  ctx.fillStyle = FILL_STYLE_BACKGROUND;
  ctx.fillRect(0, 0, w, h);
ctx.globalAplha = 1;
}*/

/*function drawCircle(x, y, radius, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
ctx.lineWidth = 0.2
  ctx.strokeStyle = "#000000";
  ctx.arc(x, y, radius, 0, DPI, true);
  ctx.closePath();
  ctx.fill();
ctx.stroke()
}*/
		
		
		
		
		////
	}
	
	
	
	
	addWorldFeatures(chunk, x, y, z,block) {
var radius=3;
	
        
	

				
				    var f4 = ( random.nextFloat() * 3.141592653589793 * 2.0);
            var f5 = 0.0;
            var f6 = ( random.nextFloat() * 3.141592653589793 * 2.0);
				 
				  var f1 = random.nextFloat() * 50;
                var f3 = random.nextFloat() * 50;
                var f2 = random.nextFloat() * 50;
				  var f7 = 0.0;
				
				 for (var i=0;i<2000;i++){
					  f1 = ( f1 + Math.sin(f4) * Math.cos(f6));
                 f3 = ( f3 + Math.cos(f4) * Math.cos(f6));
                 f2 = ( f2 + Math.sin(f6));
					  f4 += f5 * 0.2;
					    f5 = (f5 *= 0.9) + (random.nextFloat() - random.nextFloat());
						 f6 = (f6 + f7 * 0.5) * 0.5;
						 f7 = (f7 *= 0.9) + (random.nextFloat() - random.nextFloat());
						       if (random.nextFloat() >= 0.8) { //0.3
                    var f8 = f1 + random.nextFloat() * 4.0 - 2.0;
                    var f9 = f2 + random.nextFloat() * 4.0 - 2.0;
                    var f10 = f3 + random.nextFloat() * 4.0 - 2.0;
					
					
					  
					  
					  for (var bb=-3; bb<=3; ++bb) { 
					  for (var cc=-3; cc<=3; ++cc) { 
						for (var dd=-3; dd<=3; ++dd) {
						if (bb*bb + cc*cc+ dd*dd <= radius*radius) {
							 if((-32+Math.floor(f9)+cc)>y+42){
								 
								 var val = chunk.get(Math.floor(f8)+bb, -32+Math.floor(f9)+cc, Math.floor(f10)+dd)
								 if(val!==9){
							chunk.set(Math.floor(f8)+bb, -32+Math.floor(f9)+cc, Math.floor(f10)+dd,0)
								 }
							}
						}
						//socket.emit('block-break', [Math.floor(f8)+bb,-32+Math.floor(f9)+cc,Math.floor(f10)+dd])
								
										
						}
					  }
					  
					  
					  
					  
					  
					  
					  
								 }
							
						
					
					 
							   }
					 
				 }
				 
}

}



var random = new Random(9099090);
function Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
Random.prototype.next = function () {
  return this._seed = this._seed * 16807 % 2147483647;
};

Random.prototype.nextInt = function (max) {
    return Math.floor( this.nextFloat()*max );
};

/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
  // We know that result of next() will be 1 to 2147483646 (inclusive).
  return (this.next() - 1) / 2147483646;
};		///

function dist(x, y, z) {
	return Math.sqrt(x*x + y*y + z*z)
}