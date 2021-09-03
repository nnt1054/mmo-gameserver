import { GameObject } from 'mini5-engine';
const fetch = require("node-fetch");

class playerObject extends GameObject {

	constructor(scene, socketId, name, parent) {
	    super(scene, parent)
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

  		this.socketId = socketId;
  		this.name = name;

  		this.x = 200;
  		this.y = 296;

  		this.xVel = 10;
  		this.yVel = 0;
  		this.gravity = 0.005;
  		this.jump = -1.5;
  		this.jumpTimer = 0;
  		this.AABB = this.createAABB(64, 64, this.x, this.y)

  		this.state = 'idle';
  		this.colors = {
  			'jumping': 'red',
  			'walking': 'yellow',
  			'idle': 'blue',
  		}

        this.gameState = this.parent.gameState[this.name] = {x: this.x, y: this.y, connected: true};
        this.inputState = {
        	xState: 'idle',
        	yState: 'idle',
        }

        this.transitioning = false;
	}

	updateInputState(data) {
		this.inputState = data;
	}

	update(delta) {

		if (!this.gameState.connected) {
        	return;
		}

		var xDisp = 0,
		yDisp = 0;

		// need to move this to its own `inputManager` game object
		if (this.inputState.xState == 'idle') {
			xDisp = 0;
		} else if (this.inputState.xState == 'movingLeft') {
			xDisp = -this.xVel;
		} else if (this.inputState.xState == 'movingRight') {
			xDisp = this.xVel;
		}
		if (this.inputState.yState == 'jumping') {
			if (this.jumpTimer <= 0) {
				this.yVel = this.jump;
				this.jumpTimer = 1000;
			}
		}
		this.jumpTimer -= delta;

		// Resolve Physics Collisions
		this.yVel += (this.gravity * delta);
		yDisp = (this.yVel * delta) + (this.gravity * Math.pow(delta, 2));
		this.x += xDisp;
		this.y += yDisp;
		this.AABB.setPos(this.x, this.y);
		var collisions = this.AABB.checkCollisions(this.scene.staticObjects);
		if (collisions.length > 0) {
			for (var i = 0; i < collisions.length; i++) {
				var aabb = collisions[i];
				this.handleCollision(aabb, xDisp, yDisp);
			}
		}

		// Resolve Portal Collisions
		if (!this.transitioning) {
			var collisions = this.AABB.checkCollisions(this.scene.portalObjects);
			var nextScene = null;
			if (collisions.length > 0) {
				for (var i = 0; i < collisions.length; i++) {
		            nextScene = collisions[i].parent.nextScene
				}
			}
			if (nextScene != null) {
		        console.log("player should switch to scene: " + nextScene);
		        this.transitioning = true;
		        this.startTeleportProcess(nextScene)
		        	.then((data) => this.pingGameServer(data))
		        	.then((url) => this.broadcastTeleportDestination(this.socketId, url))
			}
		}

		this.gameState.x = this.x;
		this.gameState.y = this.y;
	}

	async startTeleportProcess(nextScene) {
		// broadcast teleport update to the client to transition to idle scene
		this.scene.broadcastTeleport(this.socketId, nextScene);

		// ping server manager for the gameserver endpoint corresponding to nextScene
		let url = 'http://localhost:3000/manager/gameserver?scene=' + nextScene;
		let response = await fetch(url);
		let data = await response.json();
		console.log('started teleport process');
		return data
	}

	async pingGameServer(endpoint) {
		let url = endpoint.origin + endpoint.pathname;
		let healthurl = url.split('/').slice(0, -1).join('/') + '/state'
		let response = await fetch(healthurl)
		let data = await response.json();
		console.log('pinged game server');
		// check if game server health is fine
		if (data != null) {
			return url
		} else {
			return url
		}
	}

	async broadcastTeleportDestination(socketId, url) {
		console.log('broadcasting teleport destination (playerObject.js)')
		this.scene.broadcastTeleportDestination(socketId, url);
	}

	// Resolves and sets AABB position based on colliding aabb, x-axis displacement, and y axis-displacement
	handleCollision(aabb, xDisp, yDisp) {
		if (xDisp > yDisp) {
			this.AABB.setPos(this.x - xDisp, this.y)
			if (this.AABB.checkCollision(aabb)) {
				this.handleYCollision(aabb);
			} else {
				this.handleXCollision(aabb);
			}
		} else {
			this.AABB.setPos(this.x, this.y - yDisp)
			if (this.AABB.checkCollision(aabb)) {
				this.handleXCollision(aabb);
			} else {
				this.handleYCollision(aabb);
			}
		}
		this.AABB.setPos(this.x, this.y);
	}

	// helper function for handleCollision
	handleYCollision(aabb) {
		if (this.AABB.ifTopCollision(aabb)) {
			this.y = aabb.max.y;
		} else {
			this.y = aabb.min.y - this.AABB.height;
			this.jumpTimer = 0;
		}
		this.yVel = 0;
	}

	// helper function for handleCollision
	handleXCollision(aabb) {
		if (this.AABB.ifLeftCollision(aabb)) {
			this.x = aabb.max.x;
		} else {
			this.x = aabb.min.x - this.AABB.width;
		}
	}

	draw(interpolationPercentage) {
        this.scene.engine.context.fillStyle = this.colors[this.state];
        this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
        this.scene.engine.context.fillStyle = "black";
		this.scene.engine.context.textAlign = "center";
        this.scene.engine.context.font = "30px Comic Sans MS";
        this.scene.engine.context.fillText(this.count.toString(), this.AABB.min.x + this.AABB.width/2, this.AABB.min.y - 10);
	}
}

export default playerObject;