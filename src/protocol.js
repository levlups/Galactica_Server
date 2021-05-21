const EventEmiter = require('events')
const event = new EventEmiter()

module.exports = {
	init(io) { initProtocol(io) },
	send(id, type, data) { sendPacket(id, type, data) },
	sendAll(type, data) { io.emit(type, data) },
	getSocket(id) { return connections[id] },
	io: io,
	event: event
}


var npccount=0;
const illegalCharacters = new RegExp('[^a-zA-Z0-9]')
const players = require('./player')

const items = require('./items').get()
const blockIDs = require('./blocks').getIDs()

const blocks = require('./blocks').get()
const console = require('./console')

var protocol = 1

function send(id, msg) {
	if (id == '#console') console.log(msg)
	else if (id == '#all') {
		console.chat(msg)
		io.emit('chat', msg)
	}
	else ( players.get('id') ).send(msg)
}

var cfg = require('../config.json')
const entity = require('./entity')

const fs = require('./fs.js')

var connections = {}
var playerCount = 0
var mobCount = 0
var io

var init = false


setTimeout(function(){  
fs.readdir('./mobs', (err, files) => {
  files.forEach(file => {
	  
	 // readMob(file)
  
  });
});

}, 30000);

function readMob(id) {
	try {
		var r = false
		var name = id //+ '.json'
		var data = fs.readFileSync('./mobs/' + name)
		r = JSON.parse(data)
		
		
				 entity.createmob({
								name: r[1].data.type,
								nametag: true,
								type: r[1].data.type,
								health: 20,
								maxhealth: 20,
								model: 'player',
								texture: 'entity/horse',
								position: r[1].data.position,
								rotation: 0,
								hitbox: [0.55, 1.9, 0.55],
								chest:r[1].data.chest
								

							}, 'default')
    // console.log(JSON.stringify(r))
		return r
	} catch(e) {
		console.error('Tried to load data of Mob ' + id + ', but it failed! Error: ', e)
	}
	
}



function initProtocol(io0) {
	if (init == true) return
	init = true
	io = io0
	io.on('connection', async function(socket) {
		if (playerCount >= cfg.maxplayers) {
			socket.emit('kick', 'Server is full')
			socket.disconnect(true)
		}

		socket.emit('login-request', {
			name: cfg.name,
			protocol: protocol,
			maxplayers: cfg.maxplayers,
			blocks: blocks,
			blockIDs: blockIDs,
			items: items
		})

		var loginTimeout = true

		socket.on('login', function(data) { 
			loginTimeout = false

			var check = verifyLogin(data)
			if (data.username == '' || data.username == null || data.username == undefined ) data.username = 'Player' + Math.round(Math.random()*100000)

			var id = data.username.toLowerCase()

			if (check != 0) {
				socket.emit('kick', check)
				socket.disconnect(true)
			} if (connections[id] != undefined) {
				socket.emit('kick', 'Player with that nickname is already online!')
				socket.disconnect(true)
			} /*if (data.username !==undefined) {
				for (var i=0;i<cfg.ban.length;i++){
					
					if(cfg.ban[i]==data.username ){
				socket.emit('kick', 'Your banned '+data.username )
				socket.disconnect(true)
					}
				}
			} */else {
				players.event.emit('connection', id)
				var player = players.create(id, data, socket)

				socket.emit('login-success', {
					pos: player.entity.data.position,
					tex: player.entity.data.texture,
					inv: player.inventory,
					clientSideBlockPrediction: true,
					blocks: blocks,
					blockIDs: blockIDs,
					items: items,
					armor: player.entity.data.armor
				})
				connections[id] = socket
				var c=player.action_getboption()
				var d=cfg.world.seed
				
				io.emit('block-optionsstart', [c,d])
				
				// countdown///
				/*var num=0
				var yo=setInterval(function(){ 
				num++
				if(num<10){
				socket.emit('gamehud', num)
				}else{
					socket.emit('gamehud', 'game started')
					  
					  
					  if(num>12){
						  socket.emit('gamehud', '')
					  clearInterval(yo);
						  
					  }
				}
				
				}, 1000);*/
                
				socket.emit('entity-ignore', player.entity.id)
                
				 player.launchmobs()
				/*Object.entries( entity.getAll(player.world) ).forEach(function(data) {
					
					 //console.log(JSON.stringify(data[1].data))
					//console.log(JSON.stringify(data))
					
					if(data[1].data.type=='player'){
					socket.emit('entity-spawn', {
						id: data[0],
						data: data[1].data
					})
					}
					
					if(data[1].data.type=='rocket'){
					socket.emit('entity-spawn-mob', {
						id: data[0],
						data: data[1].data
					})
					}
					
					if(data[1].data.type=='dog'){
						
						
					socket.emit('entity-spawn-mob', {
						id: data[0],
						data: data[1].data
					})
					}
					
					if(data[1].data.type=='chest'){
						
						
					socket.emit('entity-spawn-mob', {
						id: data[0],
						data: data[1].data
					})
					}
					
					
				
				})*/

				send('#all', player.nickname + " joined the game!")
				playerCount = playerCount + 1
				
				 
				if(playerCount==1){
					console.log('numplayers is : '+playerCount)
					io.emit('flagbearer',{flag:true})
				}

				socket.on('disconnect', function() {
					players.event.emit('disconnect', id)
					send('#all', player.nickname + " left the game!")
					player.remove()
					delete connections[id]
					playerCount = playerCount - 1 
					//entity.removemob(data)
					
					
					/*Object.entries( entity.getAll(player.world) ).forEach(function(data) {
					console.log(data[1].data.type)
					
					if(data[1].data.type=='dog'){
					entity.removemob(data[0],data)
					}
					
					if(data[1].data.type=='chest'){
					//entity.removemob(data[0],data)
					}
					
						
				    })*/
				})
				socket.on('chat-send', function(data) {
					player.action_chatsend(data)
				})

				socket.on('block-break', function(data) {
					player.action_blockbreak(data)
				})
				
				
				
				
				socket.on('changearmor', function(data) {
					player.changearmor(data)
				})
				
				socket.on('changemobchest', function(data1) {
					
					//player.removechest(data1)
					player.changechest(data1)
				/*	Object.entries( entity.getAll(player.world) ).forEach(function(data) {
						
						if(data1.id==data[0]){
							 data[1].data.chest=data1.chest
						}
						
						
					
				
				})*/
				})
				
				
				
				
				socket.on('block-break-triek', function(data) {
					player.action_blockbreaktrick(data)
				})
				
				
				
				socket.on('despawn', function(data) {
					io.emit('entity-despawn', data)
					player.removemob(data)
					//entity.removemob(data)
					//mobCount-=1
				})

				socket.on('block-place', function(data) {
					player.action_blockplace(data)
				})
				
				socket.on('block-trick', function(data) {
					player.action_blocktrick(data)
				})
				
				
				
				socket.on('block-stepped', function(data) {
					player.action_steppedoncube(data)
				})
				
				socket.on('craft', function(data) {
					player.action_craft(data)
				})

				socket.on('move', function(data) {
					player.action_move(data)
				})
				
				socket.on('newmobpos',function(data){
					
					
					player.changemobpos(data)
					/*Object.entries( entity.getAll(player.world) ).forEach(function(data) {
						
						if(data1.id==data[0]){
							 data[1].data.position=data1.pos
						}
					
				
				})*/
					
				})
				
				socket.on('newmobskin',function(data){
					
					
					player.changemobskin(data)
					
					io.emit('echo-newmobskin',{texture:data.texture,id:data.id})
					/*Object.entries( entity.getAll(player.world) ).forEach(function(data) {
						
						if(data1.id==data[0]){
							 data[1].data.position=data1.pos
						}
					
				
				})*/
					
				})
				
				
				
				

				socket.on('inventory-click', function(data) {
					player.action_invclick(data)
				})
				
				socket.on('threw-item', function(data) {
					player.action_invclick(data)
					player.action_removeitem(data)
					//{name:item,position:pos,angle:matrixangle});
					io.emit('echo-threw-item',{name:data.name,position:data.position,angle:data.angle,force:data.force})
				})
				
				socket.on('hitentity', function(data) {
					io.emit('ishit', {id: data.id,strength:data.strength}) 
				})
				
				socket.on('move-mob', function(data) {
					
				
		        io.emit('entity-move-mob', {id: data.hid, data: { pos: data.hpos, rot: data.hrot, walker: data.walking, header: data.header } }) 
				
				})
				
				
				
				socket.on('wantent', function(data) {
					
					
						var cooldata={
								name: data.type,
								nametag: true,
								type: data.type,
								health: 20,
								maxhealth: 20,
								model: 'player',
								texture: data.texture,
								position: data.position,
								rotation: data.rotation,
								hitbox: [0.55, 1.9, 0.55],
								chest:{},
								age:data.age

							}
									 entity.createmob(cooldata, 'default')
							//if(data.type=='sign'){
							player.changejsonmobs(cooldata)
							//}
			    })
				
				
					setInterval(function(){ 
					
					
					
				/*	if(playerCount<2){
						return;
					}
					
					if(mobCount>4){
						return;
					}*/
					/*if(mobCount>3){
						return;
					}else{

                     		 entity.createmob({
								name: 'lorie',
								nametag: true,
								type: 'zombie',
								health: 20,
								maxhealth: 20,
								model: 'player',
								texture: 'entity/horse',
								position: [0,0,0],
								rotation: 0,
								hitbox: [0.55, 1.9, 0.55]

							}, 'default')
								mobCount+=1
					}*/
							
							
						

					}, 10000);
					
					
					
					
					
				
			

		}
		})

		setTimeout(function() {
			if (loginTimeout == true) { 
				socket.emit('kick', 'Timeout')
				socket.disconnect(true)
			}
		}, 1000)

	})


}

function sendPacket(id, type, data) {
	if (id == -1) io.emit(type, data)
	else if (connections[id] != undefined) connections[id].emit(type, data)
}

function verifyLogin(data) {
	if (data == undefined) return 'No data!'
	else if (data.username == undefined || illegalCharacters.test(data.username)) return 'Illegal username - ' + data.username
	else if (data.protocol == undefined || data.protocol != protocol) return 'Unsupported protocol'

	return 0
}


