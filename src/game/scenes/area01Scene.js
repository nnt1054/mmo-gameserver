import { Scene } from 'mini5-engine';

// import gameObjects
import { 
	backgroundObject,
	blockObject,
	// playerObject,
	portalObject,
	bouncingBallObject,
	playerManagerObject
} from '../gameObjects/'

class area01Scene extends Scene {

	setup(args) {

	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, 800*2, 32, -800, 400 - 32);
	    var floating = new blockObject(this, 800/2, 32, 800/2, 400/2);
	    var ball = new bouncingBallObject(this, 'blue');
	    // var player = new playerObject(this);
	    this.playerManager = new playerManagerObject(this);

	    var portalToArea03 = new portalObject(this, 'area03', 80, 100, 700, 100);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, ball, portalToArea03],
	    	'layer3': [],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [portalToArea03.AABB];

	    // add initial game objects
	    this.gameObjects = [background, ball, this.playerManager];

	    this.broadcastUpdates = this.broadcastUpdates.bind(this);
	    this.intervals.push(setInterval(this.broadcastUpdates, 30));
	}

	broadcastUpdates() {
		this.engine.io.emit('gamestate', this.gameState);
	}

	broadcastTeleport(socket, nextScene) {
		socket.emit('teleport', {
			nextScene: nextScene,
		})
	}

	broadcastTeleportServer(socket, url) {
		socket.emit('teleportServer', {
			url: url,
		})
	}

    switchScene(scene, args) {
        console.log("HELLO SWITCHING");
        for (var i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
        this.engine.switchScene(scene, args);
    }

	connectPlayer(socket, username) {
		console.log('ideally we conenct ' + username);
		this.playerManager.addPlayer(socket, username);
	}

}

export default area01Scene;