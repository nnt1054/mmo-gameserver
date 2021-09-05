import { Engine } from 'mini5-engine';
import SceneList from './game/scenes/index';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

class ServerEngine extends Engine {}

ServerEngine.prototype.io = function() {
	parentPort.on('message', (event) => {
		switch(event.name) {
			case 'connection':
				this.connectPlayer(event.socketId, event.username);
				break;
			case 'inputState':
		       	this.currentScene?.updatePlayerInputState(event.socketId, event.data);
				break;
			case 'disconnect':
				this.currentScene?.disconnectPlayer(event.socketId);
				break;
			default:
				console.log('unrecognized message');
		}
	})
}

ServerEngine.prototype.broadcast = function(eventName, data) {
	parentPort.postMessage({
		type: 'broadcast',
		name: eventName,
		data: data, 
	})
}

ServerEngine.prototype.message = function(socketId, eventName, data) {
	parentPort.postMessage({
		type: 'message',
		socketId: socketId,
		name: eventName,
		data: data, 
	})
}

ServerEngine.prototype.closeServer = function() {
	console.log('peepoo, trying to close server');
}

ServerEngine.prototype.connectPlayer = function(socketId, username) {
	this.currentScene.connectPlayer(socketId, username);
}

if (isMainThread) {

	// return game server instance and socket.io server instance
	async function generateServerEngine(initScene) {
		var io = require('socket.io')({
			cors: {
			    origin: "*:*",
			}
		});

		const worker = new Worker(__filename, {
			workerData: initScene
		});

		// messages to be received from the game engine
		// aka messages the game engine wants to send to the client(s)
		worker.on('message', (event) => {
			switch(event.type) {
				case 'broadcast':
					io.emit(event.name, event.data)
					break;
				case 'message':
					io.to(event.socketId).emit(event.name, event.data)
					break;
				default:
					console.log('somethings wrong lol');
					console.log(event);
			}
		});
		worker.on('error', (error) => {
			console.log(error);
			console.log('damn we got an error');
		});
		worker.on('exit', (code) => {
			if (code !== 0) {
				console.log(`Worker stopped with exit code ${code}`);
			}
		});

		io.on('connection', (socket) => {
			worker.postMessage({
				name: 'connection',
				socketId: socket.id,
				username: socket.handshake.query.name,
				data: {}
			})
			socket.on('inputState', (data) => {
				worker.postMessage({
					name: 'inputState',
					socketId: socket.id,
					data: data,
				})
			})
			socket.on('disconnect', (reason) => {
				console.log("dc: " + reason);
			})
		});
		return { game: null, io: io };
	}

	// export default generateServerEngine;
	module.exports = generateServerEngine;

} else {
	var Game = new ServerEngine(SceneList, workerData, ServerEngine.MODE_SERVER, {});
	Game.io()
	Game.start()
}
