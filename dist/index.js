"use strict";

var _mini5Engine = require("mini5-engine");

var _index = _interopRequireDefault(require("./game/scenes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import Game from './game/main'
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;
var server = app.listen(port);
app.use(express["static"]('public'));
console.log('App is listening on port ' + port);

var io = require('socket.io')(server);

setInterval(heartbeat, 10000);

function heartbeat() {
  io.sockets.emit('heartbeat', ':)');
}

io.sockets.on('connection', function (socket) {
  console.log('new socket poggies: ' + socket.id); // console.log(socket.handshake.query.name);

  Game.connectPlayer(socket, socket.handshake.query.name);
}); // need to start the game server and pass a pointer to the socket reference

var Game = new _mini5Engine.Engine(_index["default"], 'testScene', {}, io);
Game.start();