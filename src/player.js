const EventEmiter = require('events')
const vec = require('gl-vec3')
const event = new EventEmiter()
const entity = require('./entity')
const worldManager = require('./worlds')
const items = require('./items')
const blockIDs = require('./blocks').getIDs()
const blocks = require('./blocks').get()
const compressChunk = require("voxel-crunch")
const commands = require('./commands')
const hook = require('./hooks')
const fs = require('./fs.js')
const console = require('./console')

const uuid = require('uuid').v4;

var specialoption=[]
var jsonmobs=null


var cfg = require('../config.json')
const { PlayerInventory } = require('./inventory')



var players = {}
var chunksToSend = []

var io

commands.setPlayer(players)

var npclist={}


function send(id, msg) {
	
	if (id == '#console') console.log(msg)
	else if (id == '#all') {
		console.chat(msg)
		io.emit('chat', msg)
	}
	//else ( players.get(id) ).send(msg)
	//else players[id].send(msg)
}


function createPlayer(id, data, socket) {

	players[id] = new Player(id, data.username, socket,data.texture)

	event.emit('create', players[id])

	return players[id]
}


function readPlayer(id) {
	try {
		var r = false
		var name = id + '.json'
		var data = fs.readFileSync('./players/' + name)
		r = JSON.parse(data)
     
		return r
	} catch(e) {
		console.error('Tried to load data of player ' + id + ', but it failed! Error: ', e)
	}
	
}

function existPlayer(id) {
	var name = id + '.json'
	var r = fs.existsSync('./players/' + name)
	return r
}

function savePlayer(id, data) {
	fs.writeFile('./players/' + id +'.json', JSON.stringify(data), function (err) {
		if (err) console.error ('Cant save player ' + id + '! Reason: ' + err);
	})
	
	
}

function saveoptions(){
	fs.writeFile('./worlds/'+'default' + '/options.json', JSON.stringify(specialoption), function (err) {
			if (err) console.error ('Cant save world ' + this.name + '! Reason: ' + err);
		})
	
}

function savejsonmobs(data){
	fs.writeFile('./mobs/jsonmobs.json', JSON.stringify(data), function (err) {
			if (err) console.error ('Cant save jsonmobs! Reason: ' + err);
		})
	
}
readjsonmobs()
function readjsonmobs(){
	
	try {
		var r = false
		var name = 'mobs' + '/jsonmobs.json'
		var data = fs.readFileSync('./' + name)
		r = JSON.parse(data)
       jsonmobs=r
	   
	
	
		//return r
	} catch(e) {
		console.error('Tried to load data of mobs options , but it failed! Error: ', e)
		console.log(e)
	}
	
}


function populatemobs(){
	
	try {
		var r = false
		var name = 'mobs' + '/jsonmobs.json'
		var data = fs.readFileSync('./' + name)
		r = JSON.parse(data)
       jsonmobs=r
	   
	 Object.entries(jsonmobs).map(item => {
		 //entity.createMob(item,'default')
		 console.log(JSON.stringify(item[1].type))
		 io.emit('entity-spawn-mob', { id: item[0], data: item[1] })
	 })
	//worldManager.get('default').entities[item[0]] = new Entity(item[0], item[1], 'default')
		//return r
	} catch(e) {
		console.error('Tried to send data of mobs options , but it failed! Error: ', e)
		
	}
	
}





readptions()
function readptions(){
	if(!existOption()){
		return;
	}
	try {
		var r = false
		var name = 'default' + '/options.json'
		var data = fs.readFileSync('./worlds/' + name)
		r = JSON.parse(data)
       specialoption=r
	   //console.log(JSON.stringify(r))
		//return r
	} catch(e) {
		console.error('Tried to load data of block options , but it failed! Error: ', e)
	}
	
}



function existOption() {
	var name = 'default' + '/options.json'
	var r = fs.existsSync('./worlds/' + name)
	return r
}

class Player {
	constructor(id, name, socket,tex) {
		this.id = id
		this.nickname = name
		
		
		if ( existPlayer(this.id) ) var data = readPlayer(this.id)
		
		if (data == undefined) {
		
			this.entity = entity.create({
				name: name,
				nametag: true,
				type: 'player',
				health: 20,
				maxhealth: 20,
				model: 'player',
				texture: tex,
				position: cfg.world.spawn,
				rotation: 0,
				hitbox: [0.55, 1.9, 0.55],
				armor:['none','none','none','none']
			
				

			}, 'default')//'hell')
	
			this.world = 'default'
			
			
	           //this.world = 'hell'
	
	         
			this.inventory = new PlayerInventory(12)//was 10
			
		} else {
			
			
			this.entity = entity.recreate(data.entity.id, {
				name: data.entity.data.name,
				nametag: data.entity.data.nametag,
				type: 'player',
				health: data.entity.data.health,
				maxhealth: data.entity.data.maxhealth,
				model: 'player',
				texture: data.entity.data.texture,
				position: data.entity.data.position,
				rotation: data.entity.data.rotation,
				hitbox: [0.55, 1.9, 0.55],
				armor: data.entity.data.armor
				
				
			}, data.world)

			this.world = data.world

			this.inventory = new PlayerInventory(12, data.inventory)
			
		}
		
		this.socket = socket
		this.chunks = {}
		savePlayer(this.id, this.getObject())
		
	}

	getObject() {
		return {
			id: this.id,
			nickname: this.nickname,
			entity: this.entity.getObject(),
			inventory: this.inventory.getObject(),
			world: this.world
		}
	}

	remove() {
		savePlayer(this.id, this.getObject())
		this.entity.remove()

		setTimeout(() => { delete players[this.id] }, 10 )
		
	}

	teleport(pos, eworld) {
		this.entity.teleport(pos, eworld)
		this.socket.emit('teleport', pos)
	}

	move(pos) {
		event.emit('player-move', {id: this.id, pos: pos})
		this.entity.move(pos)
	}

	send(msg) {
		this.socket.emit('chat', msg)
	}

	rotate(rot,headrot,arm,arm2,leg,leg2,bodyrot) {
		//event.emit('player-rotate', {id: this.id, rot: rot})
		this.entity.rotate(rot,headrot,arm,arm2,leg,leg2,bodyrot)
	}
	
	
	get getID() {
		return this.id
	}
	
	hitentity(data){
		
	}
	
	changearmor(data){
		var r=this.getObject()
		
		if(data.helmet!==undefined){
		r.entity.data.armor[0]=data.helmet
		}
		if(data.cape!==undefined){
		r.entity.data.armor[1]=data.cape
		}
		if(data.boots!==undefined){
		r.entity.data.armor[2]=data.boots
		}
		if(data.hand!==undefined){
		r.entity.data.armor[3]=data.hand
		}
		///console.log(JSON.stringify(r))
		//savePlayer(this.id, this.getObject())
		
		 io.emit('changingallarmor',{id: r.entity.id,helmet:r.entity.data.armor[0],cape:r.entity.data.armor[1],boots:r.entity.data.armor[2],hand:r.entity.data.armor[3]});
	}
	
   
	 
	 
	launchmobs(){
	populatemobs()
	
	}
	changejsonmobs(data){
	//readjsonmobs()
	var id = uuid()
	jsonmobs[id]=data
	
	savejsonmobs(jsonmobs)
	}
	
	changechest(data){
		//readjsonmobs()
		
		console.log(JSON.stringify(data))
		console.log(JSON.stringify(jsonmobs[data[0]]))
		if(jsonmobs[data.id] !==undefined){
			jsonmobs[data.id].chest=data.chest
		}
		savejsonmobs(jsonmobs)
	}
	
	changemobpos(data){
		//readjsonmobs()
		
		//console.log(JSON.stringify(data))
		//console.log(JSON.stringify(jsonmobs[data[0]]))
		if(jsonmobs[data.id] !==undefined){
			jsonmobs[data.id].position=data.pos
		}
		savejsonmobs(jsonmobs)
	}
	
	changemobskin(data){
		//readjsonmobs()
		
		//console.log(JSON.stringify(data))
		//console.log(JSON.stringify(jsonmobs[data[0]]))
		if(jsonmobs[data.id] !==undefined){
			jsonmobs[data.id].texture=data.texture
		}
		savejsonmobs(jsonmobs)
	}
	
	removemob(data){
		//readjsonmobs()
		
		
		if(jsonmobs[data] !==undefined){
			delete jsonmobs[data]
		}
		savejsonmobs(jsonmobs)
	}
	
	
	action_craft(data){
		var inv = this.inventory;
		
		if(data.amount>0){
		inv.main[data.pos]={id:data.ids,count:data.amount,data:{}}
		
		
		
			this.socket.emit('inventory-update', {
									main: inv.main,
									tempslot: inv.tempslot
								})	
		}else{
                     inv.main[data.pos].count+=data.amount
		             if(inv.main[data.pos].count<1){
						 inv.main[data.pos]={}
					 }
		
		
			this.socket.emit('inventory-update', {
									main: inv.main,
									tempslot: inv.tempslot
								})	
		}			
								
								
	}
	
	action_steppedoncube(data) {
		
             
			var inv = this.inventory;


for (var i=0;i<inv.maxslot+9;i++) {
	
	if(inv.main[i]==undefined){
		continue;
	}
					
					if(inv.main[i].id==data.ids & inv.main[i].count<items.get()[data.ids].data.stack){
						
						
					
					
					
							//if(items.get()[item.id])
									inv.main[i].count+=1;
									this.socket.emit('inventory-update', {
									main: inv.main,
									tempslot: inv.tempslot
								})				
					
				
				break;
					}
				
				if(inv.main[i].id==undefined){
						
						
				inv.main[i]={id:data.ids,count:1,data:{}}
					this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
					
					
				break;
						
						
					}
  //console.log(`${item}: ${inv.main[item].id}`);
}

				
				/*for(var i=0;i<inv.main.length;i++){
					console.log(inv.main[i].id)
					if(inv.main[i].id==data.ids){
					console.log('wathiiiiii')
					inv.main[inv.selected].count+=1;
					this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
					
					
				}
					
					
				}*/
				
				
				/*console.log(JSON.stringify(inv.main))
				console.log(JSON.stringify(inv.main[data.ids]))
				
				if(inv.main[data.ids]!=={}){
				inv.main[data.ids].count+=1;
				console.log('boo')
				this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
				
				}
				
				if(inv.main[data.ids]=={}){
					console.log('waths up')
					
					//var item = inv.main[inv.selected]
					//inv[1]={id:blockIDs[data.ids].name,count:1,data:{}}
					//inv[1]={id:'grass',count:1,data:{}}
					inv.main[1]={id:blockIDs[data.ids],count:1,data:{}}
					console.log(JSON.stringify(inv.main))
					this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
				}*/
			

		
	}
	
	action_blockbreaktrick(data) {
		var action = {id: this.id, data: data}
		var r = hook.execute('player-blockbreaktrick', action)
		if (r == 1) return
		
		
		
		
          if(specialoption.length>0){
			 
			  for (var i=0;i<specialoption.length;i++){
				  if(JSON.stringify(action.data)==JSON.stringify(specialoption[i].pos)){
				  
				  specialoption.splice(i,1)
				  io.emit('block-options', specialoption);
				  saveoptions()
			  }
		  }
		  }
		  
		  
		  
		  
		  
		  
		if (action.data != null || action.data.lenght == 3) {
			if ( Math.abs(action.data[0]) >= 120000 || Math.abs(action.data) >= 120000) {
				return
			}

			var block = worldManager.get(this.world).getBlock(action.data)
			var pos = this.entity.data.position

			if (vec.dist(pos, action.data) < 14 && block != undefined && block != 0 && blocks[block].data.unbreakable != true) {
				//var c=Math.random()*8-4
				worldManager.get(this.world).setBlock(data, 0)
				io.emit('block-update', {
					id: 0,
					pos: action.data,
					rando: 'null'
				})
				
				/*inv.main[inv.selected].count+=1;
				
				io.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})*/
			}

		}
	}

	


	action_blockbreak(data) {
		var action = {id: this.id, data: data}
		var r = hook.execute('player-blockbreak', action)
		if (r == 1) return
		
		
		
		
          if(specialoption.length>0){
			 
			  for (var i=0;i<specialoption.length;i++){
				  if(JSON.stringify(action.data)==JSON.stringify(specialoption[i].pos)){
				  
				  specialoption.splice(i,1)
				  io.emit('block-options', specialoption);
				  saveoptions()
			  }
		  }
		  }
		  
		  
		  
		  
		  
		  
		if (action.data != null || action.data.lenght == 3) {
			if ( Math.abs(action.data[0]) >= 120000 || Math.abs(action.data) >= 120000) {
				return
			}

			var block = worldManager.get(this.world).getBlock(action.data)
			var pos = this.entity.data.position

			if (vec.dist(pos, action.data) < 14 && block != undefined && block != 0 && blocks[block].data.unbreakable != true) {
				var c=Math.random()*8-4
				worldManager.get(this.world).setBlock(data, 0)
				io.emit('block-update', {
					id: 0,
					pos: action.data,
					rando: c
				})
				
				/*inv.main[inv.selected].count+=1;
				
				io.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})*/
			}

		}
	}
	
	action_blocktrick(data){
		var action = {id: this.id, data: data}
		var r = hook.execute('player-blocktrick', action)
		if (r == 1) return
		
		
		
          if(specialoption.length>0){
			 
			  for (var i=0;i<specialoption.length;i++){
				  if(JSON.stringify(action.data.position)==JSON.stringify(specialoption[i].pos)){
				  
				  specialoption.splice(i,1)
				  
				 
			  }
		  }
		  }
		specialoption.push({pos:action.data.position,angle:action.data.angle,id:action.data.id,data:action.data.data})
		io.emit('block-options', specialoption);
		worldManager.get(this.world).setBlock(data, 0)
				io.emit('block-update', {
					id: 0,
					pos: action.data.position
				})
		io.emit('block-update', {
				
					id: action.data.id,
					pos: action.data.position
				 })
				 
				 if(action.data.name=='door'){
						
						if(action.data.info=='positionOpen'){
									worldManager.get(this.world).setBlock([action.data.position[0],action.data.position[1]+1,action.data.position[2]], 0)
									io.emit('block-update', {
									//id: blockIDs[item.id]+action.data.angle,
									id: 0,
									pos: [action.data.position[0],action.data.position[1]+1,action.data.position[2]]
								})
						}
						
					/*	if(action.data.info=='positionClose'){
									worldManager.get(this.world).setBlock([action.data.position[0],action.data.position[1]+1,action.data.position[2]], blockIDs['doorbarrier'])
									io.emit('block-update', {
									//id: blockIDs[item.id]+action.data.angle,
									id: blockIDs['doorbarrier'],
									pos: [action.data.position[0],action.data.position[1]+1,action.data.position[2]]
								})
						}*/
					}
				 
				 
				 worldManager.get(this.world).setBlock(action.data.position, action.data.id)
		 saveoptions()
	}
	
	

	action_blockplace(data) {
		var action = {id: this.id, data: data}
		var r = hook.execute('player-blockplace', action)
		if (r == 1) return


		var inv = this.inventory
		var item = inv.main[inv.selected]
		var pos = this.entity.data.position
		
		
		if (vec.dist(pos, action.data.position) < 14 && item != undefined && item.id != undefined) {
			
			if (items.get()[item.id].type == 'block' || items.get()[item.id].type == 'block-flat') {
				
				/*if(inv.main[inv.selected].count>0){
				inv.main[inv.selected].count-=1;
				
				if(inv.main[inv.selected].count==0){
					inv.main[inv.selected]={};
					this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
				}
				
				}*/
				
				
					
				/*if(action.data.angle=='boat'){
					
				 return;
				}*/
				
				/*if(action.data.id!=='none'){
					
					io.emit('block-update', {
					//id: blockIDs[item.id]+action.data.angle,
					id: action.data.id,
					pos: action.data.position
				 })
				 worldManager.get(this.world).setBlock(action.data.position, action.data.id)
				 return;
				}*/
				if(action.data.id!=='none' ){
					console.log(action.data.id)
					specialoption.push({pos:action.data.position,angle:action.data.angle,id:blockIDs[action.data.id],data:action.data.data})
					
					
					io.emit('block-options', specialoption);
					
					
				
					
				io.emit('block-update', {
					
					id: blockIDs[action.data.id],
					pos: action.data.position
				})
				
				worldManager.get(this.world).setBlock(action.data.position, blockIDs[action.data.id])
				 saveoptions()
				 return;
				
				}
			
				if(action.data.angle !=='none' && action.data.angle !== undefined){
					
					specialoption.push({pos:action.data.position,angle:action.data.angle,id:blockIDs[item.id],data:action.data.data})
					
					
					io.emit('block-options', specialoption);
					
					
				
					
				io.emit('block-update', {
					
					id: blockIDs[item.id],
					pos: action.data.position
				})
				
				worldManager.get(this.world).setBlock(action.data.position, blockIDs[item.id])
				 saveoptions()
				
				}
				
				
				else{
				
					io.emit('block-update', {
					id: blockIDs[item.id],
					pos: action.data.position
				})
					worldManager.get(this.world).setBlock(action.data.position, blockIDs[item.id])
				}
				
				if(inv.main[inv.selected].count==1){
				inv.main[inv.selected]={};
				
				
				this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
				}
				
				if(inv.main[inv.selected].count>0){
				inv.main[inv.selected].count-=1;
				
				
				this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
				}
				
				
				
				
				
				
				
				
			}
		}
	}


    action_removeitem(data) {
	
	if (data.inventory == undefined) data.inventory = this.inventory
		var action = {id: this.id, data: data}
		var inv=data.inventory
		for (var i=0;i<inv.maxslot+9;i++) {
					
					if(inv.main[i]==undefined){
						continue;
					}
					
					//if(inv.main[i].id==data.name & inv.main[i].count<items.get()[data.name].data.stack){
						
						if(inv.main[i].id==data.name ){
						
						
					
					
					
							//if(items.get()[item.id])
								
								if(inv.main[i].count==0){
					inv.main[i]={};
					this.socket.emit('inventory-update', {
					main: inv.main,
					tempslot: inv.tempslot
				})
								}else{
								
									inv.main[i].count-=1;
									this.socket.emit('inventory-update', {
									main: inv.main,
									tempslot: inv.tempslot
								})			

								}								
					
				
				break;
					}
		}
		
	
		
	}
	action_invclick(data) {
		if (data.inventory == undefined) data.inventory = this.inventory
		var action = {id: this.id, data: data}
		var r = hook.execute('player-inventoryclick', action)
		if (r == 1) return

		if (-2 < action.data.slot < 70) {
			if (action.data.type == 'left') this.inventory.action_left(action.data.inventory, action.data.slot)
			else if (action.data.type == 'right')  this.inventory.action_right(action.data.inventory, action.data.slot)
			else if (action.data.type == 'switch')  this.inventory.action_switch(action.data.slot, action.data.slot2)
			else if ( -1 < action.data.slot < 9 && action.data.type == 'select')  this.inventory.select(action.data.slot)
		}
	}


	action_chatsend(data) {
	
		var action = {id: this.id, data: data}
		var r = hook.execute('player-chatsend', action)
		if (r == 1) return

		if (action.data.charAt(0) == '/') {
			commands.execute(this.id, action.data)
		}
		else if (action.data != '' ) send('#all', this.nickname + " » " + action.data)//send(-2, this.nickname + " » " + action.data)
	}


	

	action_move(data) {
		var action = {id: this.id, data: data}
		var r = hook.execute('player-move', action)
		if (r == 1) return

		var pos = this.entity.data.position
		if ( Math.abs(action.data.pos[0]) > 120000 || Math.abs(action.data.pos[2]) > 120000) {
			
			this.socket.emit('teleport', pos)
			//return
		}
		 this.move(action.data.pos)
		//if (vec.dist(pos, action.data.pos) < 20) this.move(action.data.pos)

		this.rotate(action.data.rot,action.data.hrot,action.data.arm,action.data.arm2,action.data.leg,action.data.leg2,action.data.brot)
		//this.rotatehead(action.data.hrot,action.data.fire)
		
		
	}
	
	action_getboption(){
		readptions()
		
		return specialoption;
	}
}


setInterval(async function() {
	var list = Object.keys(players)

	var viewDistance = 3

	list.forEach(async function(id) {
		var chunk = players[id].entity.chunk
		var loadedchunks = {...players[id].chunks}
		for (var w = 0; w <= viewDistance; w++) {
			for (var x = 0 - w; x <= 0 + w; x++) {
				for (var z = 0 - w; z <= 0 + w; z++) {
					var tempid = [chunk[0] + x, chunk[1] + z]
					if (loadedchunks[tempid] == undefined) {
						players[id].chunks[tempid] = true
						chunksToSend.push([id, tempid])
					}
					if (worldManager.get(players[id].world).chunks[tempid] != undefined) worldManager.get(players[id].world).chunks[tempid].keepAlive()
					loadedchunks[tempid] = false
				}
			}
		}

		var toRemove = Object.entries(loadedchunks)
		toRemove.forEach(function(item) {
			if (item[1] == true) delete players[id].chunks[item[0]]
		})
	})
}, 1000)


setInterval(async function() {
	if (chunksToSend[0] != undefined) {
		sendChunkToPlayer(chunksToSend[0][0], chunksToSend[0][1])
		chunksToSend.shift()
	}
}, 100)

setInterval(async function() {
	var list = Object.values(players)
	list.forEach(function(player) {
		if (player.inventory.updated != true) {
			player.inventory.updated = true
			
			player.socket.emit('inventory-update', {...player.inventory})
		}
	})
}, 50)


function sendChunkToPlayer(id, cid) {
	event.emit('sendChunk', id, cid)
	if (players[id] != undefined) {
		worldManager.get(players[id].world).getChunk(cid, true).then(function(chunk) {
			if (chunk != undefined && players[id] != undefined) {
				chunk.keepAlive()
				players[id].socket.emit('chunkdata', {
					id: cid,
					chunk: compressChunk.encode(chunk.data.data)
				})
			}
		})
	}
}

hook.create('player-blockbreak', 5)
hook.create('player-blockbreaktrick', 5)
hook.create('player-blockplace', 5)
hook.create('player-blocktrick', 5)
hook.create('player-move', 5)
hook.create('player-inventoryclick', 5)
hook.create('player-hitentity', 5)
hook.create('player-chatsend', 5)


module.exports = {
	create: createPlayer,
	get(id) { return players[id] },
	getAll() { return players },
	setIO(io2) { io = io2 },
	event: event

}