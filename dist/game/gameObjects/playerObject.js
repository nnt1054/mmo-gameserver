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

var playerObject = /*#__PURE__*/function (_GameObject) {
  _inherits(playerObject, _GameObject);

  var _super = _createSuper(playerObject);

  function playerObject(scene, socket, name, parent) {
    var _this;

    _classCallCheck(this, playerObject);

    _this = _super.call(this, scene, parent);
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.draw = _this.draw.bind(_assertThisInitialized(_this));
    _this.socket = socket;
    _this.name = name;
    _this.x = 64;
    _this.y = 0;
    _this.xVel = 10;
    _this.yVel = 0;
    _this.gravity = 0.005;
    _this.jump = -1.5;
    _this.jumpTimer = 0;
    _this.AABB = _this.createAABB(64, 64, _this.x, _this.y);
    _this.state = 'idle';
    _this.colors = {
      'jumping': 'red',
      'walking': 'yellow',
      'idle': 'blue'
    };
    _this.gameState = _this.parent.gameState[_this.name] = {
      x: _this.x,
      y: _this.y,
      connected: true
    };
    socket.on('inputState', function (data) {
      _this.inputState = data;
    });
    socket.on('disconnect', function (reason) {
      console.log("dc: " + reason);
      _this.gameState.connected = false;
    });
    _this.inputState = {
      xState: 'idle',
      yState: 'idle'
    }; // this.newCount = 0;
    // this.count = 0;
    // const handleCountListener = this.handleCountUpdate.bind(this);
    // this.countUnsubscribe = store.subscribe(handleCountListener);

    return _this;
  } // handleCountUpdate() {
  // 	this.newCount = selectCount(store.getState());
  // }


  _createClass(playerObject, [{
    key: "update",
    value: function update(delta) {
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

      this.jumpTimer -= delta; // if (this.yVel) {
      // 	this.state = 'jumping';
      // } else if (xDisp) {
      // 	this.state = 'walking';
      // } else {
      // 	this.state = 'idle';
      // }
      // Resolve Physics Collisions

      this.yVel += this.gravity * delta;
      yDisp = this.yVel * delta + this.gravity * Math.pow(delta, 2);
      this.x += xDisp;
      this.y += yDisp;
      this.AABB.setPos(this.x, this.y);
      var collisions = this.AABB.checkCollisions(this.scene.staticObjects);

      if (collisions.length > 0) {
        for (var i = 0; i < collisions.length; i++) {
          var aabb = collisions[i];
          this.handleCollision(aabb, xDisp, yDisp);
        }
      } // this.count = this.newCount;
      // this.gameState = this.parent.gameState[this.name] = {x: this.x, y: this.y, connected: true};


      this.gameState.x = this.x;
      this.gameState.y = this.y;
    } // Resolves and sets AABB position based on colliding aabb, x-axis displacement, and y axis-displacement

  }, {
    key: "handleCollision",
    value: function handleCollision(aabb, xDisp, yDisp) {
      if (xDisp > yDisp) {
        this.AABB.setPos(this.x - xDisp, this.y);

        if (this.AABB.checkCollision(aabb)) {
          this.handleYCollision(aabb);
        } else {
          this.handleXCollision(aabb);
        }
      } else {
        this.AABB.setPos(this.x, this.y - yDisp);

        if (this.AABB.checkCollision(aabb)) {
          this.handleXCollision(aabb);
        } else {
          this.handleYCollision(aabb);
        }
      }

      this.AABB.setPos(this.x, this.y);
    } // helper function for handleCollision

  }, {
    key: "handleYCollision",
    value: function handleYCollision(aabb) {
      if (this.AABB.ifTopCollision(aabb)) {
        this.y = aabb.max.y;
      } else {
        this.y = aabb.min.y - this.AABB.height;
        this.jumpTimer = 0;
      }

      this.yVel = 0;
    } // helper function for handleCollision

  }, {
    key: "handleXCollision",
    value: function handleXCollision(aabb) {
      if (this.AABB.ifLeftCollision(aabb)) {
        this.x = aabb.max.x;
      } else {
        this.x = aabb.min.x - this.AABB.width;
      }
    }
  }, {
    key: "draw",
    value: function draw(interpolationPercentage) {
      this.scene.engine.context.fillStyle = this.colors[this.state];
      this.scene.engine.context.fillRect(this.AABB.min.x, this.AABB.min.y, this.AABB.width, this.AABB.height);
      this.scene.engine.context.fillStyle = "black";
      this.scene.engine.context.textAlign = "center";
      this.scene.engine.context.font = "30px Comic Sans MS";
      this.scene.engine.context.fillText(this.count.toString(), this.AABB.min.x + this.AABB.width / 2, this.AABB.min.y - 10);
    }
  }]);

  return playerObject;
}(_mini5Engine.GameObject);

var _default = playerObject;
exports["default"] = _default;