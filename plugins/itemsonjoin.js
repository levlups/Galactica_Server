const { items, players } = require('../src/api')



players.event.on('create', function(player) {
	
	Object.keys( items.get() ).forEach(function(item) {
		player.inventory.remove(item, items.getStack(item))
		})	
	Object.keys( items.get() ).forEach(function(item) {
		
		if(item=='iron_boots'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='pilon'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='wall'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='flowerpot'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='sign'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
			if(item=='rail'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='leash'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		if(item=='grass'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='chest'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		if(item=='snow'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		if(item=='sword'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='table'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='stairs'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='chair'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='bow'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='arrow'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='cape'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='bubblegum'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='oakfence'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='button'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='door'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='airjelly'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='horse'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, items.getStack(item) , {})
		}
		
		if(item=='rocket'){
			
		player.inventory.remove(item, items.getStack(item))
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='trap'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='bed'){
			
		player.inventory.remove(item, 2)
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='bed_red'){
			
		player.inventory.remove(item, 2)
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='bombot'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='santa_hat'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		if(item=='gentleman_hat'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		if(item=='bearhat'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		
		if(item=='dog'){
			
		player.inventory.remove(item, 4)
		player.inventory.add(item, 4 , {})
		}
		
	})	
})
