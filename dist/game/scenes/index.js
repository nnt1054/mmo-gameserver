"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _testScene = _interopRequireDefault(require("./testScene"));

var _area01Scene = _interopRequireDefault(require("./area01Scene"));

var _area02Scene = _interopRequireDefault(require("./area02Scene"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  'testScene': _testScene.default,
  'area01': _area01Scene.default,
  'area02': _area02Scene.default
};
exports.default = _default;