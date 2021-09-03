import { GameObject } from 'mini5-engine';
import { default as playerObject } from './playerObject'

class playerManagerObject extends GameObject {

	constructor(scene) {
	    super(scene)
      	this.scene = scene;
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

		this.gameState = this.parent.gameState['playerManager'] = {};
  		this.connectedPlayers = {};
  		this.count = 0
	}

	update(delta) {
		for (const [socketId, player] of this.connectedPlayers.entries()) {
			player.update(delta)
		}
	}

	draw(interpolationPercentage) {
		for (const [socketId, player] of this.connectedPlayers.entries()) {
			player.draw(interpolationPercentage);
		}
	}

	addPlayer(socket, username) {
		console.log("adding player object: " + socket.id)
		this.connectedPlayers[socket.id] = new playerObject(this.scene, socket, username, this)
	}

	updatePlayerInputState(socketId, data) {
		if (socketId in this.connectedPlayers) {
			this.connectedPlayers[socketId].updateInputState(data)
		} else {
			console.log('something went wrong updating player input state')
		}
	}

	disconnectPlayer(socketId) {
		console.log('disconnectPlayer: ' + username)
		if (socketId in this.connectedPlayers) {
			delete this.connectedPlayers[socketId];
			return true;
		} else {
			return false;
		}
	}

}

export default playerManagerObject;