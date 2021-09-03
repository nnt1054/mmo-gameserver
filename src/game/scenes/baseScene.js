import { Scene } from 'mini5-engine';

import {
	playerManagerObject
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
	    this.playerManager = new playerManagerObject(this);

	    this.broadcastGameState = this.broadcastGameState.bind(this);
	    this.intervals.push(setInterval(this.broadcastGameState, 1000));

	    this.healthPing = this.healthPing.bind(this);
	    this.intervals.push(setInterval(this.healthPing, 1000));

	    this.timer = 0
	    this.name = 'baseScene';
	}

	update(delta) {
		this.timer += delta;
		if (this.timer > 15000) {
			console.log(this.timer + ' ' + this.name) ;
			this.timer = 0;
		}
		try {
			this.playerManager.update(delta);
			super.update(delta);
		} catch (err) {
			console.log(err)
		}
	}

	broadcastGameState() {
		this.engine.broadcast('gamestate', this.gameState);
	}

	healthPing() {
		this.engine.broadcast('health', 'peepoo');
	}

	broadcastTeleport(socketId, scene_name) {
		this.engine.message(
			socketId,
			'playerTeleportStart',
			{
				scene_name: scene_name,
			}
		)
		// socket.emit('playerTeleportStart', {
		// 	scene_name: scene,
		// })
	}

	broadcastTeleportDestination(socketId, url) {
		this.engine.message(
			socketId,
			'playerTeleportDestination',
			{
				url: url,
			},
		)
	}

	updatePlayerInputState(socketId, data) {
		this.playerManager.updatePlayerInputState(socketId, data);
	}

	connectPlayer(socketId, username) {
		console.log('ideally we conenct ' + username);
		this.playerManager.addPlayer(socketId, username);
	}

	disconnectPlayer(socketId) {
		console.log('disconnecting ' + socketId);
		this.playerManager.disconnectPlayer(socketId);
	}
}

export default baseScene;