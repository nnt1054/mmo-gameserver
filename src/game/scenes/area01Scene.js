import baseScene from './baseScene';

import { 
	backgroundObject,
	blockObject,
	portalObject,
	bouncingBallObject,
} from '../gameObjects/'

class area01Scene extends baseScene {

	setup(args) {
		super.setup(args);

	    // instantiate game objects
	    var background = new backgroundObject(this);
	    var ground = new blockObject(this, 800*3, 32, -800, 400 - 32);
	    var floating = new blockObject(this, 800/2, 32, 800/2, 400/2);
	    var ball = new bouncingBallObject(this, 'blue');
	    // var portalToArea03 = new portalObject(this, 'area03', 80, 100, 700, 100);

	    // create layers
	    this.layerOrder = ['layer1', 'layer2', 'layer3'];
	    this.layers = {
	    	'layer1': [background],
	    	'layer2': [ground, floating, ball],
	    	'layer3': [],
	    }

	    // create collision tag lists
	    this.staticObjects = [ground.AABB, floating.AABB];
	    this.portalObjects = [];

	    // add initial game objects
	    this.gameObjects = [background, ball];
	}

}

export default area01Scene;