import { Engine } from 'mini5-engine';
import SceneList from './game/scenes/index';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

class ServerEngine extends Engine {}

ServerEngine.prototype.io = function(io) {
	parentPort.on('message', (event) => {
		switch(event.name) {
			case 'connection':
				this.connectPlayer(event.data)
				break;
			case 'inputState':
		       	this.currentScene?.updatePlayerInputState(event.socket, event.data);
				break;
			case 'disconnect':
				this.currentScene?.disconnectPlayer(event.socket)
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

ServerEngine.prototype.connectPlayer = function(socketId) {
	this.currentScene.connectPlayer(socketId, socket.handshake.query.name);
}

if (isMainThread) {

	// return game server instance and socket.io server instance
	async function generateServerEngine(initScene) {
		var io = require('socket.io')({
			cors: {
			    origin: "*:*",
			}
		});
		return new Promise((resolve, reject) => {
			const worker = new Worker(__filename, {
				workerData: initScene
			});
			// messages to be received from the game engine
			// aka messages the game engine wants to send to the client(s)
			worker.on('message', (event) => {
				switch(event.name) {
					case 'broadcast':
						io.emit(event.name, event.data)
						break;
					case 'message':
						io.to(event.socketId).emit(event.name, event.data)
						break;
					default:
						console.log('somethings wrong lol')
				}
			});
			worker.on('error', reject);
			worker.on('exit', (code) => {
				if (code !== 0) {
					reject(new Error(`Worker stopped with exit code ${code}`));
				}
			});

		})
		var io = require('socket.io')({
			cors: {
			    origin: "*:*",
			}
		});
		io.on('connection', (socket) => {
			worker.postMessage({
				name: 'connection',
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
				// this = playerObject
				this.gameState.connected = false;
			})
		});
		// Game.io(io);

		return { game: Game, io: io };
	}

	export default generateServerEngine;

} else {
	// everything that happens in a new thread happens here
	var Game = new ServerEngine(SceneList, initScene, ServerEngine.MODE_SERVER, {});

}