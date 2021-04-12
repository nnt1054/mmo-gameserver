import { Scene } from 'mini5-engine';

import {
	playerManagerObject
} from '../gameObjects/'

class baseScene extends Scene {

	setup(args) {
	    this.playerManager = new playerManagerObject(this);

	    this.broadcastUpdates = this.broadcastUpdates.bind(this);
	    this.intervals.push(setInterval(this.broadcastUpdates, 30));
	}

	update(delta) {
		this.playerManager.update(delta);
		super.update(delta);
	}

	broadcastUpdates() {
		this.engine.emit('gamestate', this.gameState);
	}

	broadcastTeleport(socket, scene) {
		socket.emit('playerTeleportStart', {
			scene_name: scene,
		})
	}

	broadcastTeleportDestination(socket, url) {
		console.log(url);
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