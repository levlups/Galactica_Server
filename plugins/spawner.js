const { chat, players } = require('../src/api')

const cfg = require('../config.json')


players.event.on('create', function(data) {
	setTimeout(function() {
		cfg.plugins.welcome.forEach(function(text) { 
			//chat.send(data.id, text)
			//console.log("Hello");
			//setInterval(function(){ console.log("Hello"); }, 3000);
		})
	}, 500)
})