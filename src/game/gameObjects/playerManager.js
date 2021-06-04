import { GameObject } from 'mini5-engine';
import { default as playerObject } from './playerObject'

class playerManagerObject extends GameObject {

	constructor(scene) {
	    super(scene)
      	this.scene = scene;
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

		this.gameState = this.parent.gameState['playerManager'] = {};
  		this.connectedPlayers = [];
  		this.count = 0
	}

	update(delta) {
		for (var i = 0; i < this.connectedPlayers.length; i++) {
			this.connectedPlayers[i].update(delta);
		}
	}

	draw(interpolationPercentage) {
		for (var i = 0; i < this.connectedPlayers.length; i++) {
			this.connectedPlayers[i].draw(interpolationPercentage);
		}
	}

	addPlayer(socket, username) {
		console.log("adding player object: " + socket.id)
		this.connectedPlayers.push(new playerObject(this.scene, socket, username, this))
		console.log(this.connectedPlayers);
	}

	disconnectPlayer(username) {
		console.log('disconnectPlayer: ' + username)
		this.connectedPlayers = this.connectedPlayers.filter(player => player.name != username);
	}

}

export default playerManagerObject;