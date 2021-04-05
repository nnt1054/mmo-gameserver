"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseScene = _interopRequireDefault(require("./baseScene"));

var _gameObjects = require("../gameObjects/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class area01Scene extends _baseScene.default {
  setup(args) {
    super.setup(args); // instantiate game objects

    var background = new _gameObjects.backgroundObject(this);
    var ground = new _gameObjects.blockObject(this, 800 * 3, 32, -800, 400 - 32);
    var floating = new _gameObjects.blockObject(this, 800 / 2, 32, 800 / 2, 400 / 2);
    var ball = new _gameObjects.bouncingBallObject(this, 'blue'); // var portalToArea03 = new portalObject(this, 'area03', 80, 100, 700, 100);
    // create layers

    this.layerOrder = ['layer1', 'layer2', 'layer3'];
    this.layers = {
      'layer1': [background],
      'layer2': [ground, floating, ball],
      'layer3': []
    }; // create collision tag lists

    this.staticObjects = [ground.AABB, floating.AABB];
    this.portalObjects = []; // add initial game objects

    this.gameObjects = [background, ball];
  }

}

var _default = area01Scene;
exports.default = _default;