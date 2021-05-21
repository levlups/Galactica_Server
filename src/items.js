var items = {}

module.exports = {
	init() { initItems() },
	get() { return items },
	getStack(id) { return getItemMaxStack(id) }
}

function initItems() {
      
	  
	  
	  //Armor
	  createItem('cape', 'cape', 'block-flat', 'block/pumpkin_side', {stack: 1,armortype:'cape'})
				createItem('iron_boots', 'iron_boots', 'block-flat', 'item/iron_boots', {stack: 1,armortype:'boots'})
	   createItem('gentleman_hat', 'gentleman_hat', 'block-flat', 'item/gentleman_hat', {stack: 1,armortype:'helmet'})
	    createItem('santa_hat', 'santa_hat', 'block-flat', 'item/santa_hat', {stack: 1,armortype:'helmet'})
		 createItem('bearhat', 'bearhat', 'block-flat', 'item/bearhat', {stack: 1,armortype:'helmet'})
		  createItem('airjelly', 'airjelly', 'block-flat', 'item/airjelly', {stack: 5})
		   createItem('bubblegum', 'bubblegum', 'block-flat3d', 'item/bubblegumitem', {stack: 5})
		   createItem('leash', 'leash', 'block-flat', 'item/leash', {stack: 5})
		   createItem('wall', 'wall', 'block-flat', 'item/leash', {stack: 5})
	//Format of createItem - id, name, type, texture, attributes
	
	
	//mobs
	createItem('horse', 'horse', 'block-flat', 'item/spawn_egg', {stack: 99})
	createItem('dog', 'dog', 'block-flat', 'item/dog', {stack: 99})
	createItem('flowerpot', 'flowerpot', 'block-flat', 'item/flowerpot', {stack: 99})
	

	// Tools

	//itemIDs.iron_pickaxe = createItem('iron_pickaxe', 'Iron pickaxe', 'pickaxe', 'item/iron_pickaxe', {stack: 1, power: 3})

	//itemIDs.iron_axe = createItem('iron_axe', 'Iron axe', 'axe', 'item/iron_axe', {stack: 1, power: 3})

	//itemIDs.iron_shovel = createItem('iron_shovel', 'Iron shovel', 'shovel', 'item/iron_shovel', {stack: 1, power: 3})

	// Resources

	//itemIDs.coal = createItem('coal', 'Coal', 'item', 'item/coal', {stack: 99})

	// Blocks

	createItem('stone', 'Stone', 'block', 'block/stone', {stack: 99})
	createItem('dirt', 'Dirt', 'block', 'block/dirt', {stack: 99})
	createItem('grass', 'Grass block', 'block', 'block/grass_side', {stack: 99})
	createItem('grass_snow', 'Snowy grass block', 'block', 'block/grass_snow', {stack: 99})
	createItem('cobblestone', 'Cobblestone', 'block', 'block/cobblestone', {stack: 99})
	createItem('log', 'log', 'block', 'block/log', {stack: 99})
	createItem('sand', 'Sand', 'block', 'block/sand', {stack: 99})
	createItem('leaves', 'Leaves', 'block', 'block/leaves', {stack: 99})

	//createItem('red_flower', 'Poppy', 'block-flat', 'block/red_flower', {stack: 99})
	//createItem('grass_plant', 'Grass', 'block-flat', 'block/grass_plant', {stack: 99})
	//createItem('yellow_flower', 'Dandelion', 'block-flat', 'block/yellow_flower', {stack: 99})
	
	createItem('red_flower', 'red_flower', 'block-flat', 'block/red_flower', {stack: 99})
	createItem('grass_plant', 'grass_plant', 'block-flat', 'block/grass_plant', {stack: 99})
	createItem('yellow_flower', 'yellow_flower', 'block-flat', 'block/yellow_flower', {stack: 99})
	//itemIDs.deadbush = createItem('deadbush', 'Dead bush', 'block-flat', 'block/deadbush', {stack: 99})


	createItem('bricks', 'Bricks', 'block', 'block/bricks', {stack: 99})
	createItem('planks', 'Planks', 'block', 'block/planks', {stack: 99})
	createItem('glass', 'Glass', 'block', 'block/glass', {stack: 99})
	createItem('bookshelf', 'Bookshelf', 'block', 'block/bookshelf', {stack: 99})
	createItem('snow', 'Snow block', 'block', 'block/snow', {stack: 99})
	createItem('coal_ore', 'Coal ore', 'block', 'block/coal_ore', {stack: 99})
	createItem('iron_ore', 'Iron ore', 'block', 'block/iron_ore', {stack: 99})

	createItem('cactus', 'Cactus', 'block', 'block/cactus_side', {stack: 99})
	//itemIDs.cactus = createItem('cactus', 'Cactus', 'block', 'block/cactus_side', {stack: 99})

	createItem('stonebrick', 'Stone brick', 'block', 'block/stonebrick', {stack: 99})


	var colors = ['white', 'yellow', 'red', 'purple', 'pink', 'orange', 'magenta', 'lime', 'light_blue', 'green', 'gray', 'cyan', 'brown', 'blue', 'black']


	colors.forEach(function(color) {
		createItem(color + '_wool', color + '_wool', 'block', 'block/'+ color + '_wool', {stack: 99})
	})
	colors.forEach(function(color) {
		createItem(color + '_stained_glass', color + '_stained_glass', 'block', 'block/'+ color + '_stained_glass', {stack: 99})
	})

	createItem('birch_leaves', 'Birch leaves', 'block', 'block/birch_leaves', {stack: 99})
	createItem('birch_log', 'Birch log', 'block', 'block/birch_log', {stack: 99})
	createItem('birch_planks', 'Birch planks', 'block', 'block/birch_planks', {stack: 99})

	createItem('spruce_leaves', 'Spruce leaves', 'block', 'block/spruce_leaves', {stack: 99})
	createItem('spruce_log', 'Spruce log', 'block', 'block/spruce_log', {stack: 99})
	createItem('spruce_planks', 'Spruce planks', 'block', 'block/spruce_planks', {stack: 99})

	createItem('iron_block', 'Iron block', 'block', 'block/iron_block', {stack: 99})
	createItem('gold_block', 'Gold block', 'block', 'block/gold_block', {stack: 99})

	createItem('crafting', 'Crafting table', 'block', 'block/crafting_table_top', {stack: 99})

    createItem('sword', 'sword', 'block-flat', 'item/stone_sword', {stack: 99})
	createItem('ladder', 'ladder', 'block-flat', 'block/ladder', {stack: 99})
	createItem('snowball', 'snowball', 'block-flat', 'item/snowball', {stack: 99})
	createItem('stairs', 'stairs', 'block', 'block/stairs', {stack: 99})
	createItem('web', 'cobweb', 'block', 'block/cobweb', {stack: 99})
	createItem('door', 'door', 'block-flat', 'item/birch_door', {stack: 99})
	createItem('lava', 'lava', 'block', 'item/lava_bucket', {stack: 99})
		createItem('kelp', 'kelp', 'block-flat', 'block/kelp', {stack: 99})
		createItem('chest', 'chest', 'block-flat', 'item/chest', {stack: 99})
			createItem('watersource', 'watersource', 'block-water', 'item/water_bucket', {stack: 99})
			createItem('trap', 'trap', 'block-flat', 'block/oak_trapdoor', {stack: 99})
				createItem('oakfence', 'oakfence', 'block-flat', 'block/oak_fence', {stack: 99})
				createItem('obsidian', 'obsidian', 'block', 'block/obsidian', {stack: 99})
				createItem('fire', 'fire', 'block-flat', 'block/fire_0', {stack: 99})
				createItem('portal', 'portal', 'block', 'block/portal', {stack: 99})
				createItem('ice', 'ice', 'block', 'block/ice', {stack: 99})
				createItem('furnace', 'furnace', 'block', 'block/furnace_front', {stack: 99})
				createItem('bed', 'bed', 'block-flat', 'item/bed', {stack: 99})
				createItem('bed_red', 'bed_red', 'block-flat', 'item/redbed', {stack: 99})
				createItem('table', 'table', 'block-flat', 'item/table', {stack: 99})
				createItem('chair', 'chair', 'block-flat', 'item/chair', {stack: 99})
				
				createItem('piston', 'ruby', 'block-flat', 'item/bed', {stack: 99})
				createItem('button', 'button', 'block-flat', 'item/baked_potato', {stack: 99})
				createItem('plate', 'plate', 'block-flat', 'item/baked_potato', {stack: 99})
				
				createItem('lever', 'lever', 'block-flat', 'item/stick', {stack: 99})
				createItem('torch', 'torch', 'block-flat', 'block/torch', {stack: 99})
				createItem('rail', 'rail', 'block-flat', 'block/rail', {stack: 99})
				createItem('railside', 'railside', 'block-flat', 'block/rail_corner', {stack: 99})
				createItem('boat', 'boat', 'block-flat', 'item/birch_boat', {stack: 10})
				createItem('car', 'car', 'block-flat', 'item/minecart', {stack: 10})
				
			
				
				createItem('fireworks', 'fireworks', 'block-flat', 'item/fireworks', {stack: 1})
				createItem('item_frame', 'item_frame', 'block-flat', 'item/item_frame', {stack: 99})
				createItem('cake', 'cake', 'block', 'item/cake', {stack: 99})
				createItem('path', 'path', 'block', 'block/polished_granite', {stack: 99})
				createItem('wire', 'wire', 'block-flat', 'block/redstone_block', {stack: 99})
				createItem('redstone', 'redstone', 'block', 'block/redstone_block', {stack: 99})
				createItem('bow', 'bow', 'block-flat', 'item/bow', {stack: 99})
				createItem('arrow', 'arrow', 'block-flat', 'item/arrow', {stack: 99})
				createItem('hover', 'hover', 'block-flat', 'item/hover', {stack: 99})
				createItem('submarine', 'submarine', 'block-flat', 'item/submarine', {stack: 99})
				createItem('rocket', 'rocket', 'block-flat', 'item/rocket', {stack: 99})
				createItem('canon', 'canon', 'block-flat', 'item/rocket', {stack: 99})
					createItem('bombot','bombot', 'block-flat', 'block/bombot', {stack: 99})
					createItem('sign','sign', 'block-flat', 'item/sign', {stack: 99})
					
				
					
    
	function createItem(id, name, type, texture, data) { // Saving items to items
		items[id] = {name: name, type: type, texture: texture, data: data}
		return id
	}

}


// Get item's texture
function getItemTexture(item) {
	if (items[item] != undefined && items[item].texture != undefined) return items[item].texture
	else return 'error'
}

//Get item's data (attributes))
function getItemData(item) {
	if (items[item] != undefined && items[item].data != undefined) return items[item].data
	else return {}
}

// Get item's' max stack size
function getItemMaxStack(item) {
	if (items[item] != undefined && items[item].data.stack > 0) return items[item].data.stack
	else Infinity
}

// Get item's name
function getItemName(item) {
	try { return items[item].name }
	catch { return false }
}

// Get item's type
function getItemType(item) {
	if (items[item] != undefined && items[item].type != undefined) return items[item].type
	else 'item'
}
