"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mini5Engine = require("mini5-engine");

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

var bouncingBallObject = /*#__PURE__*/function (_GameObject) {
  _inherits(bouncingBallObject, _GameObject);

  var _super = _createSuper(bouncingBallObject);

  function bouncingBallObject(scene) {
    var _this;

    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'red';

    _classCallCheck(this, bouncingBallObject);

    _this = _super.call(this, scene);
    _this.posAABB = _this.createAABB(128, 128, 128, 128);
    _this.radius = 32;
    _this.speed = 0.1;
    _this.velocity = 0.1;
    _this.direction = 1;
    _this.color = color;
    _this.target = null; // this.parent.gameState['bouncingBall'] = {};

    _this.gameState = _this.parent.gameState['bouncingBall'] = {
      x: _this.posAABB.x,
      y: _this.posAABB.y
    };
    return _this;
  }

  _createClass(bouncingBallObject, [{
    key: "update",
    value: function update(delta) {
      // update movement
      this.lastY = this.posAABB.canvasPos.y;
      var y = this.posAABB.min.y + this.velocity * delta;
      this.posAABB.setPos(this.posAABB.x, y);
      var canvasPos = this.posAABB.canvasPos;

      if (canvasPos.y > 400 - 64 && this.velocity > 0) {
        this.velocity = -this.velocity;
      } else if (canvasPos.y < 32 && this.velocity < 0) {
        this.velocity = -this.velocity;
      } // update gamestate


      this.x++;
      this.y++;
      this.gameState.x = Math.round(this.posAABB.x), this.gameState.y = Math.round(this.posAABB.y);
    }
  }, {
    key: "draw",
    value: function draw(interpolationPercentage) {
      // Interpolate with the last position to reduce stuttering.
      var canvasPos = this.posAABB.canvasPos;
      var y = this.lastY + (canvasPos.y - this.lastY) * interpolationPercentage;
      this.circle(this.scene.engine.context, canvasPos.x, y);
    }
  }, {
    key: "circle",
    value: function circle(context, x, y) {
      context.beginPath();
      context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = this.color;
      context.fill();
      context.lineWidth = 1;
      context.stroke();
    }
  }]);

  return bouncingBallObject;
}(_mini5Engine.GameObject);

var _default = bouncingBallObject;
exports["default"] = _default;