"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mini5Engine = require("mini5-engine");

var _gameObjects = require("../gameObjects/");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var testScene = /*#__PURE__*/function (_Scene) {
  _inherits(testScene, _Scene);

  var _super = _createSuper(testScene);

  function testScene() {
    _classCallCheck(this, testScene);

    return _super.apply(this, arguments);
  }

  _createClass(testScene, [{
    key: "setup",
    value: function setup(args) {
      // instantiate game objects
      var background = new _gameObjects.backgroundObject(this);
      var ground = new _gameObjects.blockObject(this, 800 * 2, 32, -800, 400 - 32);
      var floating = new _gameObjects.blockObject(this, 800 / 2, 32, 800 / 2, 400 / 2);
      var ball = new _gameObjects.bouncingBallObject(this, 'blue'); // var player = new playerObject(this);

      this.playerManager = new _gameObjects.playerManagerObject(this); // create layers

      this.layerOrder = ['layer1', 'layer2', 'layer3'];
      this.layers = {
        'layer1': [background],
        'layer2': [ground, floating, ball],
        'layer3': []
      }; // create collision tag lists

      this.staticObjects = [ground.AABB, floating.AABB];
      this.portalObjects = []; // add initial game objects

      this.gameObjects = [background, ball, this.playerManager];
      this.broadcastUpdates = this.broadcastUpdates.bind(this);
      this.intervals.push(setInterval(this.broadcastUpdates, 30));
    }
  }, {
    key: "broadcastUpdates",
    value: function broadcastUpdates() {
      // console.log(this.gameState);
      this.engine.io.emit('gamestate', this.gameState);
    }
  }, {
    key: "connectPlayer",
    value: function connectPlayer(socket, username) {
      console.log('ideally we conenct ' + username);
      this.playerManager.addPlayer(socket, username);
    }
  }]);

  return testScene;
}(_mini5Engine.Scene);

var _default = testScene;
exports["default"] = _default;