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
		for (let socketId in this.connectedPlayers) {
			this.connectedPlayers[socketId].update(delta)
		}
	}

	draw(interpolationPercentage) {
		for (let socketId in this.connectedPlayers) {
			this.connectedPlayers[socketId].draw(interpolationPercentage);
		}
	}

	addPlayer(socketId, username) {
		console.log("adding player object: " + socketId)
		this.connectedPlayers[socketId] = new playerObject(this.scene, socketId, username, this)
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