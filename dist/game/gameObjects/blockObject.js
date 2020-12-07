"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mini5Engine = require("mini5-engine");

class blockObject extends _mini5Engine.GameObject {
  constructor(scene, width, height, x, y) {
    super(scene);
    this.scene = scene;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.AABB = this.createAABB(width, height, x, y);
    this.color = 'blue';
  }

  update(delta) {}

  draw(interpolationPercentage) {
    this.scene.engine.context.fillStyle = this.color;
    this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
  }

}

var _default = blockObject;
exports.default = _default;