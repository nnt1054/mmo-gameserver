import { Engine } from 'mini5-engine'
import SceneList from './game/scenes/index'
var express = require('express');

if (process.env.NODE_ENV == "local" || process.env.NODE_ENV == null) {
 // if (process.env.NODE_ENV == "local" ) {

	var index = parseInt(process.argv[2]);
	var port = 8000 + index;

	var app = express();
	var cors = require('cors');
	app.use(cors());

	var http = require('http').Server(app);

	// docker build stuff
	var io = require('socket.io')(http, {
		origins: '*:*',
		resource: index + '/socket.io',
	});

} else if (process.env.NODE_ENV == "development") {

	var index = process.env.MY_POD_NAME.slice(-1)[0];

	var port = process.env.PORT || 80;

	var app = express();
	var cors = require('cors');
	app.use(cors());

	var http = require('http').Server(app);

	// docker build stuff
	var io = require('socket.io')(http, {
		origins: '*:*',
		resource: '/test/' + index + '/socket.io',
	});

} else if (process.env.NODE_ENV == "production") {
} else {
	throw new Error("Something went badly wrong!");
}


// const port = process.env.PORT || 8080;
// var server = app.listen(port);

// app.use(express.static('client-build'));
app.get('/', function(req, res) {
	res.json({
		hey: 'lmao',
	})
})
app.get('/printenv', function(req, res) {
  res.json(process.env);
})
app.get('/health', function(req, res) {
  res.json({
  	status: 'ok :)',
  });
})
console.log('App is listening on port ' + port);

const states = {
	IDLE: "IDLE",
	ACTIVE: "ACTIVE",
}
var state = states.IDLE
var active_scene = "idle";

app.get('/state', function(req, res) {
  res.json({
  	state: state,
  	scene: active_scene,
  });
})

// change back to post later pls
// app.post('/assign', function (req, res) {
app.get('/assign', function (req, res) {
	var scene = req.query.scene
	if (scene == null) {
		res.send('no scene defined')
	} else if (state == states.IDLE) {
		if (scene in SceneList) {
			Game.currentScene.switchScene(scene, {});
			state = states.ACTIVE;
			active_scene = scene;
			res.send('assignment received: ' + scene)
		} else {
			res.send('assignment does not exist: ' + scene)
		}
	} else if (state == states.ACTIVE) {
		res.send('server is already running: ' + active_scene)
	} else {
		res.send('something went wrong ; )')
	}
})

// var io = require('socket.io')(server, { origins: '*:*'});
// io.origins('*:*');
// io.set('origins', '*:*');

function heartbeat() {
	io.sockets.emit('heartbeat', ':)')
}
setInterval(heartbeat, 1000);

io.sockets.on(
	'connection',
	function(socket) {

		if (state == states.IDLE) {
			// check server status
			socket.disconnect();
			return;
		}
		console.log('new socket poggies: ' + socket.id);
		Game.connectPlayer(socket, socket.handshake.query.name);
	}
);

// need to start the game server and pass a pointer to the socket reference
var Game = new Engine(SceneList, 'testScene', {}, io, 'server');
Game.io = io;
Game.connectPlayer = (socket, username) => {
	Game.currentScene.connectPlayer(socket, username);
}
Game.start();

http.listen(port, function(){
  console.log('listening on *:' + port);
});
