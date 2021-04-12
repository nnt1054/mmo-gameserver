import { Engine } from 'mini5-engine';
import SceneList from './game/scenes/index';

class ServerEngine extends Engine {}

ServerEngine.prototype.io = function(io) {
	this.locals.io = io;
	io.on('connection', (socket) => {
		console.log(this);
		this.connectPlayer(socket);
	});
}

ServerEngine.prototype.emit = function(eventName, ...args) {
	this.locals.io.emit(eventName, ...args)
}

ServerEngine.prototype.closeServer = function() {
	this.locals.io.close();
}

ServerEngine.prototype.connectPlayer = function(socket) {
	this.currentScene.connectPlayer(socket, socket.handshake.query.name);
}

// return game server instance and socket.io server instance
async function generateServerEngine(initScene) {
	var Game = new ServerEngine(SceneList, initScene, ServerEngine.MODE_SERVER, {});
	var io = require('socket.io')({
		cors: {
		    origin: "*:*",
		}
	});
	Game.io(io);

	return { game: Game, io: io };
}

export default generateServerEngine;