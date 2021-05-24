var blocks = {}
var blockIDs = {}


function initBlocks() {
	var _id = 1

	createBlock(_id++, 'stone', 0, ['block/stone'], {}, {drop: 'cobblestone', hardness: 4, tool: 'pickaxe', power: 1, material: 'rock'})
	createBlock(_id++, 'dirt', 0, ['block/dirt'], {}, {drop: 'dirt', hardness: 2.5, tool: 'shovel', material: 'grass'})
	createBlock(_id++, 'grass', 0, ['block/grass_top', 'block/dirt', 'block/grass_side'], {}, {drop: 'dirt', hardness: 2.5, tool: 'shovel', material: 'grass'})
	createBlock(_id++, 'grass_snow', 0, ['block/snow', 'block/dirt', 'block/grass_snow'], {}, {drop: 'dirt', hardness: 2.5, tool: 'shovel', material: 'grass'})
	createBlock(_id++, 'cobblestone', 0, ['block/cobblestone'], {}, {drop: 'cobblestone', hardness: 5, tool: 'pickaxe', power: 1, material: 'rock'})
	createBlock(_id++, 'log', 0, ['block/log_top', 'block/log'], {}, {drop: 'log', hardness: 4, tool: 'axe', material: 'wood'})
	createBlock(_id++, 'sand', 0, ['block/sand'], {}, {drop: 'sand', hardness: 2.5, tool: 'shovel', material: 'grass'})
	createBlock(_id++, 'leaves', 0, ['block/leaves'], {opaque: false}, {drop: 'leaves'})

	createBlock(_id++, 'water', 1000, ['block/water'], {material: 'water', fluid: true, fluidDensity: 20.0, viscosity: 20.5,sound:'lava' }, {} )
	

	createBlock(_id++, 'red_flower', 1, ['block/red_flower'], { solid: false, opaque: false}, {})
	createBlock(_id++, 'grass_plant', 1, ['block/grass_plant'], {solid: false, opaque: false}, {})
	createBlock(_id++, 'yellow_flower', 1, ['block/yellow_flower'], {solid: false, opaque: false}, {})
	
	
	createBlock(_id++, 'bricks', 0, ['block/bricks'], {}, {drop: 'bricks', hardness: 3, tool: 'pickaxe', power: 1, material: 'rock'})
	createBlock(_id++, 'planks', 0, ['block/planks'], {}, {drop: 'planks', hardness: 3, tool: 'axe', material: 'wood'})
	createBlock(_id++, 'glass', 0, ['block/glass'], {opaque: false}, {drop: 'glass',  hardness: 2, tool: 'pickaxe', material: 'glass'})
	createBlock(_id++, 'bookshelf', 0, ['block/planks', 'block/bookshelf'], {}, {drop: 'bookshelf', hardness: 3, tool: 'axe', material: 'wood'})

	//createBlock(_id++, 'barrier', 1000, [], {solid:false,material: 'air'}, {/*illegal: true, unbreakable: true, tool: 'admin', power: Infinity*/})
	createBlock(_id++, 'barrier', 1000, [], {material: 'air'}, {illegal: true, unbreakable: true, tool: 'admin', power: Infinity})
	createBlock(_id++, 'doorbarrier', 0, ['item/birch_door'], {material: 'barrier'}, { tool: 'admin', power: 2})

	createBlock(_id++, 'snow', 0, ['block/snow'], {}, {drop: 'snow', hardness: 2, tool: 'shovel', material: 'grass'})
	createBlock(_id++, 'coal_ore', 0, ['block/coal_ore'], {}, {drop: 'coal', hardness: 4.5, tool: 'pickaxe', power: 1, material: 'rock'})
	createBlock(_id++, 'iron_ore', 0, ['block/iron_ore'], {}, {drop: 'iron_ore', hardness: 5.5, tool: 'pickaxe', power: 2, material: 'rock'})
	
	createBlock(_id++, 'cactus', 2, ['block/cactus_top', 'block/cactus_side'], {opaque: false}, {drop: 'cactus', hardness: 3, tool: 'axe'})

	createBlock(_id++, 'deadbush', 1, ['block/deadbush'], {solid: false, opaque: false}, {drop: 'deadbush'})
	
	createBlock(_id++, 'gravel', 0, ['block/gravel'], {}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock'})
	
	

	createBlock(_id++, 'crafting', 0, ['block/crafting_table_top', 'block/oak_planks', 'block/crafting_table_side'], {}, {drop: 'crafting', hardness: 2, tool: 'axe', material: 'wood'})

	createBlock(_id++, 'stonebrick', 0, ['block/stonebrick'], {}, {drop: 'stonebrick', hardness: 3, tool: 'pickaxe', material: 'rock'})

	var colors = ['white', 'yellow', 'red', 'purple', 'pink', 'orange', 'magenta', 'lime', 'light_blue', 'green', 'gray', 'cyan', 'brown', 'blue', 'black']

	colors.forEach(function(color) {
		createBlock(_id++, color + '_wool', 0, ['block/' + color + '_wool' ] , {}, {drop: color + '_wool', hardness: 1, tool: 'shears', material: 'cloth'})
	})

	colors.forEach(function(color) {
		createBlock(_id++, color + '_stained_glass', 4, ['block/' + color + '_stained_glass' ] , {opaque: false}, {drop: color + '_stained_glass', hardness: 1, tool: 'pickaxe', material: 'glass'})
	})


	createBlock(_id++, 'birch_log', 0, ['block/birch_log_top', 'block/birch_log'], {}, {drop: 'birch_log', hardness: 4, tool: 'axe', material: 'wood'})
	createBlock(_id++, 'birch_leaves', 0, ['block/birch_leaves'], {opaque: false}, {drop: 'birch_leaves'})
	createBlock(_id++, 'birch_planks', 0, ['block/birch_planks'], {}, {drop: 'birch_planks', hardness: 3.5, tool: 'axe', material: 'wood'})

	createBlock(_id++, 'spruce_log', 0, ['block/spruce_log_top', 'block/spruce_log'], {}, {drop: 'spruce_log', hardness: 4, tool: 'axe', material: 'wood'})
	createBlock(_id++, 'spruce_leaves', 0, ['block/spruce_leaves'], {opaque: false}, {drop: 'spruce_leaves'})
	createBlock(_id++, 'spruce_planks', 0, ['block/spruce_planks'], {}, {drop: 'spruce_planks', hardness: 4, tool: 'axe', material: 'wood'})
	
	createBlock(_id++, 'iron_block', 0, ['block/iron_block'], {}, {drop: 'iron_block', hardness: 5.5, tool: 'pickaxe', power: 2, material: 'rock'})
	createBlock(_id++, 'gold_block', 0, ['block/gold_block'], {}, {drop: 'gold_block', hardness: 5.5, tool: 'pickaxe', power: 3, material: 'rock'})
	
	createBlock(_id++, 'air', 0, ['block/air'], {solid: false, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: null})

   createBlock(_id++, 'ladder', 7, ['block/ladder'], {solid: false, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null,climb:true})
   
	 createBlock(_id++, 'stairs', 5, ['block/sponge'], {solid: true, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null,slab:true})
	 
	  
	 
	  createBlock(_id++, 'table', 5, null, {solid: true, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null,slab:false})
	  
	  createBlock(_id++, 'chair', 5, null, {solid: true, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null,slab:false})

	 
	 createBlock(_id++, 'web', 1, ['block/cobweb'], { solid: false, opaque: false}, {web:true})
	 
	 
	 createBlock(_id++, 'door', 7, ['item/birch_door'], {solid: false, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null,door:true,blockopen:false})

	 
	createBlock(_id++, 'lava', 8, ['block/lava_flow'], { fluid: true, fluidDensity: 20.0, viscosity: 20.5,sound:'lava' }, {} )
	
	createBlock(_id++, 'kelp', 9, ['block/kelp'], { material:'water',opaque:false,solid:false}, {})
	
	//createBlock(_id++, 'chest', 2000, null, {solid: true, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	createBlock(_id++, 'watersource', 11, null, {solid: false, opaque: false,material:'water',fluid:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	
	
	createBlock(_id++, 'waterside', 12, null, {solid: false, opaque: false,material:'water',fluid:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	createBlock(_id++, 'waterflow', 13, null, {solid: false, opaque: false,material:'water',fluid:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	createBlock(_id++, 'waterside1', 14, null, {solid: false, opaque: false,material:'water',fluid:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	createBlock(_id++, 'waterside2', 15, null, {solid: false, opaque: false,material:'water',fluid:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})
	
	///trap
	createBlock(_id++, 'trap', 16,['block/oak_trapdoor'], {solid: false, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,info:null})
	
	
	
	createBlock(_id++, 'oakfence', 17,['block/oak_fence'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'oakfenceside', 17,['block/oak_fence'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'obsidian', 0,['block/obsidian'], {solid: true, opaque:true}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'fire', 18,['block/fire_0'], {solid: false, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'portal', 19,['block/portal'], {solid: false, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'ice', 0,['block/ice'], {solid: true, opaque:true}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'furnace', 20,['block/furnace_front','block/furnace_top','block/furnace_top','block/furnace_side','block/furnace_side','block/furnace_side'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	
	createBlock(_id++, 'bed', 10,null, {solid: false, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'bedtop', 0,['block/crafting_table_top', 'block/oak_planks', 'block/crafting_table_side'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0})
	
	createBlock(_id++, 'hell', 0,['block/netherrack'], {solid: true, opaque:true}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock'})
	
	createBlock(_id++, 'lava', 0,['block/lapis_block'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock'})
	
	createBlock(_id++, 'piston', 0,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid: true, opaque:false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock'})
	
	
	
	
	createBlock(_id++, 'button', 21,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel'})
	
	
	
	
	
	createBlock(_id++, 'plate', 22,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel'})
	
	createBlock(_id++, 'platedown', 22,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel'})
	
	
	createBlock(_id++, 'lever', 23,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel'})
	
	createBlock(_id++, 'leveron', 23,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel'})
	
	
	createBlock(_id++, 'torch', 24,['block/torch'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel',rotation:0})
	
	
	createBlock(_id++, 'rail', 25,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel',rotation:0,info:null})
	
	createBlock(_id++, 'railside', 25,['block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block','block/iron_block'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel',rotation:0,info:null})
	
		
	
	
	createBlock(_id++, 'item_frame', 26,['item/item_frame'], {solid:false, opaque:false}, {onoff:false,drop: 'gravel', hardness: 2.5, tool: 'shovel',rotation:0})
	
	createBlock(_id++, 'watertop', 27,['block/water_still'], {material: 'water', fluid: false,solid:false, opaque:false}, { hardness: 2.5, tool: 'shovel'})


createBlock(_id++, 'path', 28,['block/polished_granite'], {solid:true, opaque:false}, { hardness: 2.5, tool: 'shovel'})

createBlock(_id++, 'redstone', 0, ['block/redstone_block'], {}, {drop: 'cobblestone', hardness: 4, tool: 'pickaxe', power: 1, material: 'rock'})

createBlock(_id++, 'wire', 29,['block/redstone_dust_line0'], {solid:true, opaque:false}, { hardness: 2.5, tool: 'shovel',rotation:0,particle:'reddust'})

createBlock(_id++, 'cake', 30, ['block/cake_top', 'block/cake_side','block/cake_inner'], {opaque: false}, {drop: 'cactus', hardness: 3, tool: 'axe'})

createBlock(_id++, 'airjelly', 31, null, {opaque: false,solid:false}, {drop: 'cactus', hardness: 3, tool: 'axe'}) 

createBlock(_id++, 'flowerpot', 2000, null, {opaque: false,solid:false}, {drop: 'cactus', hardness: 3, tool: 'axe'}) 

createBlock(_id++, 'pilon', 2000, ['block/sponge'], {solid: true, opaque: false}, {drop: 'gravel', hardness: 2.5, tool: 'shovel', material: 'rock',rotation:0,onCustomMeshCreate:null})

//createBlock(_id++, 'sign', 2000, null, {opaque: false,solid:false}, {drop: 'cactus', hardness: 3, tool: 'axe'}) 

	function createBlock(id, name, type, texture, options, data) {
		blockIDs[name] = id

		blocks[id] = {
			name: name,
			type: type,
			texture: texture,
			options: options,
			data: data
		}
	}
}




module.exports = {
	init() { return initBlocks() },
	get() { return blocks },
	getIDs() { return blockIDs }

}