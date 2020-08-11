import { GameObject } from 'mini5-engine';

class playerObject extends GameObject {

	constructor(scene, socket, name, parent) {
	    super(scene, parent)
  		this.update = this.update.bind(this);
  		this.draw = this.draw.bind(this);

  		this.socket = socket;
  		this.name = name;

  		this.x = 64;
  		this.y = 0;

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
        socket.on('inputState', (data) => {
        	this.inputState = data;
        })
        socket.on('disconnect', (reason) => {
        	console.log("dc: " + reason);
        	this.gameState.connected = false;
        })
        this.inputState = {
        	xState: 'idle',
        	yState: 'idle',
        }

  		// this.newCount = 0;
  		// this.count = 0;
  		// const handleCountListener = this.handleCountUpdate.bind(this);
  		// this.countUnsubscribe = store.subscribe(handleCountListener);
	}

	// handleCountUpdate() {
	// 	this.newCount = selectCount(store.getState());
	// }

	update(delta) {
		var xDisp = 0,
		yDisp = 0;

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

		// if (this.yVel) {
		// 	this.state = 'jumping';
		// } else if (xDisp) {
		// 	this.state = 'walking';
		// } else {
		// 	this.state = 'idle';
		// }

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

		// this.count = this.newCount;
		// this.gameState = this.parent.gameState[this.name] = {x: this.x, y: this.y, connected: true};
		this.gameState.x = this.x;
		this.gameState.y = this.y;

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