"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mini5Engine = require("mini5-engine");

var _playerObject = _interopRequireDefault(require("./playerObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class playerManagerObject extends _mini5Engine.GameObject {
  constructor(scene) {
    super(scene);
    this.scene = scene;
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.gameState = this.parent.gameState['playerManager'] = {};
    this.connectedPlayers = [];
    this.count = 0;
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
    console.log("adding player object" + socket.id);
    this.connectedPlayers.push(new _playerObject.default(this.scene, socket, username, this));
  }

}

var _default = playerManagerObject;
exports.default = _default;