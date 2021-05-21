var worldManager = require('./worlds')
//var player = require('./player')
const fs = require('./fs.js')
const uuid = require('uuid').v4;

var io




function existMob(id) {
	var name = id + '.json'
	var r = fs.existsSync('./mobs/' + name)
	return r
}
function readMob(id) {
	try {
		var r = false
		var name = id + '.json'
		var data = fs.readFileSync('./mobs/' + name)
		r = JSON.parse(data)
     
		return r
	} catch(e) {
		console.error('Tried to load data of Mob ' + id + ', but it failed! Error: ', e)
	}
	
}

function removeMob(id,data) {
	
	fs.writeFile('./mobs/' + id +'.json', JSON.stringify(data), function (err) {
		if (err) console.error ('Cant save mob ' + id + '! Reason: ' + err);
	})
		
	}


function createMob(data, worldName) {
	
	var id = uuid()
     //player.changejsonmobs([id,cooldata])
	worldManager.get(worldName).entities[id] = new Entity(id, data, worldName)

	io.emit('entity-spawn-mob', { id: id, data: worldManager.get(worldName).entities[id].data })

/*if(data.type=='sign'){
							player.changejsonmobs(data)
							}*/

	return worldManager.get(worldName).entities[id]
}

function recreateMob(id, data, worldName) {
	
	/*if(existMob('dog'))
		data = readMob('dog')*/
	
	worldManager.get(worldName).entities[id] = new Entity(id, data)

	io.emit('entity-spawn-mob', { id: id, data: worldManager.get(worldName).entities[id].data })

	return worldManager.get(worldName).entities[id]
}

function createEntity(data, worldName) {
	
	var id = uuid()

	worldManager.get(worldName).entities[id] = new Entity(id, data, worldName)

	io.emit('entity-spawn', { id: id, data: worldManager.get(worldName).entities[id].data })



	return worldManager.get(worldName).entities[id]
}

function recreateEntity(id, data, worldName) {
	
	worldManager.get(worldName).entities[id] = new Entity(id, data)

	io.emit('entity-spawn', { id: id, data: worldManager.get(worldName).entities[id].data })

	return worldManager.get(worldName).entities[id]
}

class Entity {
	constructor(id, data, world, tick) {
		
		/*	if(existMob('dog'))
		data = readMob('dog')*/
		this.data = data
		/*	if(data.type=='dog'){
				if(existMob(data.type))
		data = readMob(data.type)
	
	
	   //console.log(JSON.stringify(data))
	   this.data.chest=data[1].data.chest
		}*/
		
		
		if (data.position == undefined) {
			this.data.position = [0, 100, 0]
		} if (data.rotation == undefined) {
			this.data.rotation = 0
		}
	
		this.id = id
		this.world = world
		this.chunk = worldManager.toChunk(this.data.position).id
		if (tick instanceof Function) this.tick = tick
		else this.tick = function() {}
	}




	getObject() {
		return {
			id: this.id,
			data: this.data,
			chunk: this.chunk
		}
	}

	teleport(pos, eworld) {
		this.world = eworld
		this.data.position = pos
		this.chunk = worldManager.toChunk(pos).id
		io.emit('entity-move', {id: this.id, data: { pos: this.data.position, rot: this.data.rotation } }) 
	}

	move(pos) {
		this.data.position = pos
		
		
		this.chunk = worldManager.toChunk(pos).id
		io.emit('entity-move', {id: this.id, data: { pos: this.data.position, rot: this.data.rotation } }) 
		

	}

	rotate(rot,rot2,harm,harm2,hleg,hleg2,brota) {
		this.data.rotation = rot
		io.emit('entity-move', {id: this.id, data: { pos: this.data.position, rot: this.data.rotation,hrot:rot2,arm:harm,arm2:harm2,leg:hleg,leg2:hleg2,brot:brota} }) 
	}
	
		
		
	
	
	remove() {
		try {
			var id = this.id
			io.emit('entity-despawn', id)

			if (this.data.type != 'player') {
				var world = worldManager.get(this.world)
				if (world.entities[id] != undefined) delete world.entities[id]
			}
		} catch(e) {
			console.log('Server tried to remove entity, but it didn\'t work! Error: ', e)
		}
	}

	getID() {
		return this.id
	}
	


}





module.exports = {
	removemob:removeMob,
	createmob: createMob,
	create: createEntity,
	recreate: recreateEntity,
	get(world, id) { return worldManager.get(world).entities[id] },
	getAll(world) { return worldManager.get(world).entities },
	setIO(io2) { io = io2 }
}
