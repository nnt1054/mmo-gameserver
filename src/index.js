// import Game from './game/main'
import { Engine } from 'mini5-engine'
import SceneList from './game/scenes/index'

var express = require('express');
var app = express();
const port = process.env.PORT || 8000;
var server = app.listen(port);

app.use(express.static('public'));
console.log('App is listening on port ' + port);

var io = require('socket.io')(server);

setInterval(heartbeat, 10000);

function heartbeat() {
	io.sockets.emit('heartbeat', ':)')
}

io.sockets.on(
	'connection',
	function(socket) {
		console.log('new socket poggies: ' + socket.id);
		// console.log(socket.handshake.query.name);
		Game.connectPlayer(socket, socket.handshake.query.name);
	}
)

// need to start the game server and pass a pointer to the socket reference
var Game = new Engine(SceneList, 'testScene', {}, io);
Game.start();