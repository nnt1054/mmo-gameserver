import { Scene } from 'mini5-engine';

// import gameObjects
import { 
	backgroundObject,
	blockObject,
	portalObject,
	bouncingBallObject,
	playerManagerObject
} from '../gameObjects/'

class testScene extends Scene {

	setup(args) {

	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, 800*2, 32, -800, 400 - 32);
	    var floating = new blockObject(this, 800/2, 32, 800/2, 400/2);
	    var ball = new bouncingBallObject(this, 'blue');
	    var portal = new portalObject(this, 'testScene', 96, 128, 640, 72);
	    // var player = new playerObject(this);
	    this.playerManager = new playerManagerObject(this);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, ball, portal],
	    	'layer3': [],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [portal.AABB];

	    // add initial game objects
	    this.gameObjects = [background, ball, this.playerManager];

	    this.broadcastUpdates = this.broadcastUpdates.bind(this);
	    this.intervals.push(setInterval(this.broadcastUpdates, 30));
	}

	broadcastUpdates() {
		this.engine.io.emit('gamestate', this.gameState);
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

export default testScene;