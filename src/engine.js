import { Engine } from 'mini5-engine';
import SceneList from './game/scenes/index';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

class ServerEngine extends Engine {}

ServerEngine.prototype.io = function(io) {
	// this.locals.io = io;
	// io.on('connection', (socket) => {
	// 	console.log('connecting new player');
	// 	this.connectPlayer(socket);
	// });
	parentPort.on('message', (event) => {
		switch(event.name) {
			case 'connection':
				// do something
				this.connectPlayer(event.data)
				break;
			case 'inputState':
		       	// event = {
		       	// 	name: name
		       	// 	socket: socket.id,
		       	// 	data: data
		       	// }
				break;
			case 'disconnect':
				// do something something else
				// 	console.log("dc: " + reason);
				// 	this.gameState.connected = false;
				break;
			default:
				// fortnite default dance
		}
	})
        // socket.on('inputState', (data) => {
        // 	this.inputState = data;
        // })
        // socket.on('disconnect', (reason) => {
        // 	console.log("dc: " + reason);
        // 	this.gameState.connected = false;
        // })
}

ServerEngine.prototype.emit = function(eventName, ...args) {
	// this.locals.io.emit(eventName, ...args)
	parentPort.postMessage(eventName, ...args)
}

ServerEngine.prototype.closeServer = function() {
	// this.locals.io.close();
	console.log('peepoo, trying to close server');
}

ServerEngine.prototype.connectPlayer = function(socket) {
	this.currentScene.connectPlayer(socket, socket.handshake.query.name);
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
				// assume event has the format:
				// {
				// 	name: name,
				// 	data: data,
				// }
				io.emit(event.name, event.data)
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