import { Scene } from 'mini5-engine';

import {
	playerManagerObject
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
	    this.playerManager = new playerManagerObject(this);

	    this.broadcastUpdates = this.broadcastUpdates.bind(this);
	    this.intervals.push(setInterval(this.broadcastUpdates, 1000));

	    this.healthPing = this.healthPing.bind(this);
	    this.intervals.push(setInterval(this.healthPing, 1000));
	}

	update(delta) {
		try {
			this.playerManager.update(delta);
			super.update(delta);
		} catch (err) {
			console.log(err)
		}
	}

	broadcastUpdates() {
		this.engine.emit('gamestate', this.gameState);
	}

	healthPing() {
		this.engine.emit('health', 'peepoo');
	}

	broadcastTeleport(socket, scene) {
		socket.emit('playerTeleportStart', {
			scene_name: scene,
		})
	}

	broadcastTeleportDestination(socket, url) {
		socket.emit('playerTeleportDestination', {
			url: url,
		})
	}

	connectPlayer(socket, username) {
		console.log('ideally we conenct ' + username);
		this.playerManager.addPlayer(socket, username);
	}
}
 
export default baseScene;