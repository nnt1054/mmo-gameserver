"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mini5Engine = require("mini5-engine");

var _index = _interopRequireDefault(require("./scenes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _mini5Engine.Engine(_index.default, 'testScene', {}, mode = 'server');
var _default = game; // game.start();

exports.default = _default;