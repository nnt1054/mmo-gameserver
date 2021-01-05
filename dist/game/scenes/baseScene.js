"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mini5Engine = require("mini5-engine");

var _gameObjects = require("../gameObjects/");

class baseScene extends _mini5Engine.Scene {
  setup(args) {
    this.playerManager = new _gameObjects.playerManagerObject(this);
    this.broadcastUpdates = this.broadcastUpdates.bind(this);
    this.intervals.push(setInterval(this.broadcastUpdates, 30));
  }

  update(delta) {
    this.playerManager.update(delta);
    super.update(delta);
  }

  broadcastUpdates() {
    this.engine.io.emit('gamestate', this.gameState);
  }

  broadcastTeleport(socket, scene) {
    socket.emit('playerTeleportStart', {
      scene_name: scene
    });
  }

  broadcastTeleportDestination(socket, url) {
    console.log(url);
    socket.emit('playerTeleportDestination', {
      url: url
    });
  }

  connectPlayer(socket, username) {
    console.log('ideally we conenct ' + username);
    this.playerManager.addPlayer(socket, username);
  }

}

var _default = baseScene;
exports.default = _default;