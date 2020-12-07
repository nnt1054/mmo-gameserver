(this["webpackJsonpmmo-client"]=this["webpackJsonpmmo-client"]||[]).push([[0],{3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Engine",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"Scene",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"GameObject",{enumerable:!0,get:function(){return a.default}});var i=c(n(91)),s=c(n(93)),a=c(n(94));function c(e){return e&&e.__esModule?e:{default:e}}},45:function(e,t,n){e.exports=n(95)},50:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},51:function(e,t,n){},57:function(e,t,n){},88:function(e,t){},91:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(92),c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;i(this,e),this.io=a,this.io?this.server=!0:this.server=!1,this.server||(window.engine=this,this.createCanvas()),this.sceneList=t,this.currentScene=new this.sceneList[n](this,s),this.nextScene=null,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this.begin=this.begin.bind(this),this.end=this.end.bind(this)}var t,n,c;return t=e,(n=[{key:"createCanvas",value:function(){this.canvas=document.getElementById("canvas"),this.context=this.canvas.getContext("2d"),this.fpsCounter=document.getElementById("fpscounter"),this.fpsValue=document.getElementById("fpsvalue"),this.canvas.width=800,this.canvas.height=400,this.mouseEvents={},this.canvas.addEventListener("click",(function(e){window.engine.mouseEvents.click={x:e.x-e.target.offsetLeft,y:e.y-e.target.offsetTop}}),!1),this.canvas.addEventListener("dblclick",(function(e){window.engine.mouseEvents.dblclick={x:e.x-e.target.offsetLeft,y:e.y-e.target.offsetTop}}),!1),this.canvas.addEventListener("mousemove",(function(e){window.engine.mouseEvents.mousemove={x:e.x-e.target.offsetLeft,y:e.y-e.target.offsetTop},window.engine.mousePos=window.engine.mouseEvents.mousemove}),!1),this.canvas.addEventListener("mousedown",(function(e){window.engine.mouseEvents.mousedown={x:e.x-e.target.offsetLeft,y:e.y-e.target.offsetTop}}),!1),this.canvas.addEventListener("contextmenu",(function(e){e.preventDefault()}),!1),document.addEventListener("mouseup",(function(e){window.engine.mouseEvents.mouseup={x:e.x-e.target.offsetLeft,y:e.y-e.target.offsetTop}}),!1),this.keyState={},this.keyPress={},this.keyUpdateCounter=0,document.addEventListener("keydown",(function(e){e.keyCode in window.engine.keyState||(window.engine.keyState[e.keyCode]=0),window.engine.keyUpdateCounter=0})),document.addEventListener("keyup",(function(e){window.engine.keyPress[e.keyCode]=window.engine.keyState[e.keyCode],delete window.engine.keyState[e.keyCode]}))}},{key:"switchScene",value:function(e,t){this.nextScene=new this.sceneList[e](this,t)}},{key:"update",value:function(e){this.currentScene&&this.currentScene.update(e),this.mouseEvents={},this.keyPress={}}},{key:"draw",value:function(e){this.currentScene&&(this.context.clearRect(0,0,canvas.width,canvas.height),this.currentScene.draw(e))}},{key:"begin",value:function(){}},{key:"end",value:function(e,t){this.nextScene&&(this.currentScene=this.nextScene,this.nextScene=null)}},{key:"start",value:function(){this.server?a.setUpdate(this.update).setBegin(this.begin).setEnd(this.end).start():a.setUpdate(this.update).setDraw(this.draw).setBegin(this.begin).setEnd(this.end).start()}},{key:"addSocket",value:function(e){this.socket=e,this.currentScene.updateSocket()}},{key:"connectPlayer",value:function(e,t){this.currentScene.connectPlayer(e,t)}}])&&s(t.prototype,n),c&&s(t,c),e}();t.default=c},93:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};i(this,e),this.engine=t,this.canvas=this.engine.canvas,this.gameObjects=[],this.layerOrder=[],this.layers={},this.intervals=[],this.gameState={},this.setup(n)}var t,n,a;return t=e,(n=[{key:"setup",value:function(e){}},{key:"switchScene",value:function(e,t){for(var n=0;n<this.intervals.length;n++)clearInterval(this.intervals[n]);this.engine.switchScene(e,t)}},{key:"update",value:function(e){for(var t=0;t<this.gameObjects.length;t++)this.gameObjects[t].update(e)}},{key:"draw",value:function(e){for(var t,n=0;n<this.layerOrder.length;n++){t=this.layers[this.layerOrder[n]];for(var i=0;i<t.length;i++)t[i].draw(e)}}},{key:"updateSocket",value:function(){}},{key:"connectPlayer",value:function(e,t){}}])&&s(t.prototype,n),a&&s(t,a),e}();t.default=a},94:function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function a(e,t,n){return t&&s(e.prototype,t),n&&s(e,n),e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;i(this,e),this.scene=t,this.parent=n||t,this.update=this.update.bind(this),this.draw=this.draw.bind(this),this._isClicked=!1}return a(e,[{key:"update",value:function(e){console.log("update should be overridden")}},{key:"draw",value:function(e){console.log("update should be overridden")}},{key:"createAABB",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;return new o(e,t,n,i,s)}},{key:"allowClickDetection",value:function(e){this._isClicked=!1,this._isClickTarget=this.scene.clickTarget===this,"mousedown"in this.scene.engine.mouseEvents&&this.pointInAABB(this.scene.engine.mouseEvents.mousedown,e)&&(this.scene.clickTarget=this,this.clickOffsetLeft=this.getMousePos().x-this.clickAABB.min.x,this.clickOffsetTop=this.getMousePos().y-this.clickAABB.min.y),"mouseup"in this.scene.engine.mouseEvents&&this.scene.clickTarget===this&&(this.pointInAABB(this.scene.engine.mouseEvents.mouseup,e)&&(this._isClicked=!0),this.scene.clickTarget=null)}},{key:"isClicked",value:function(){return this._isClicked}},{key:"isClickTarget",value:function(){return this._isClickTarget}},{key:"getMousePos",value:function(){return this.scene.engine.mousePos}},{key:"pointInAABB",value:function(e,t){return e.x>t.min.x&&e.x<t.max.x&&e.y>t.min.y&&e.y<t.max.y}}]),e}(),o=function(){function e(t,n){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null;i(this,e),this.parent=c,this.width=t,this.height=n,this.x=s,this.y=a,this.lastPos={x:s,y:a},this.anchor=null,this.anchorPos={x:0,y:0},this.anchorees=[],this.foundCollisions=[]}return a(e,[{key:"setPos",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;e&&(this.lastPos.x=this.x,this.x=e),t&&(this.lastPos.y=this.y,this.y=t),this.updateAnchorees()}},{key:"setAnchor",value:function(e){this.anchor=e,this.anchorPos=e.canvasPos,e.anchorees.push(this)}},{key:"setAnchorPos",value:function(e){this.anchorPos=e,this.updateAnchorees()}},{key:"updateAnchorees",value:function(){for(var e=0;e<this.anchorees.length;e++)this.anchorees[e].setAnchorPos(this.canvasPos)}},{key:"checkCollision",value:function(e){return!(this.max.x<=e.min.x||this.min.x>=e.max.x)&&!(this.max.y<=e.min.y||this.min.y>=e.max.y)}},{key:"checkCollisions",value:function(e){for(var t=[],n=0;n<e.length;n++)e[n]!=this&&this.checkCollision(e[n])&&t.push(e[n]);return t}},{key:"ifLeftCollision",value:function(e){return this.max.x>e.max.x}},{key:"ifLeftCollisionOnly",value:function(e){return this.max.x>e.max.x&&this.min.x>e.min.x}},{key:"ifRightCollision",value:function(e){return this.min.x<e.min.x}},{key:"ifRightCollisionOnly",value:function(e){return this.min.x<e.min.x&&this.max.x<e.max.x}},{key:"ifTopCollision",value:function(e){return this.max.y>e.max.y}},{key:"ifTopCollisionOnly",value:function(e){return this.max.y>e.max.y&&this.min.y>e.min.y}},{key:"ifBottomCollision",value:function(e){return this.min.y<e.min.y}},{key:"ifBottomCollisionOnly",value:function(e){return this.max.y<e.max.y&&this.min.y<e.min.y}},{key:"min",get:function(){return{x:this.x,y:this.y}}},{key:"max",get:function(){return{x:this.x+this.width,y:this.y+this.height}}},{key:"canvasPos",get:function(){return{x:this.x+this.anchorPos.x,y:this.y+this.anchorPos.y}}}]),e}(),r=c;t.default=r},95:function(e,t,n){"use strict";n.r(t);var i=n(0),s=n.n(i),a=n(15),c=n.n(a),o=n(1),r=n(2),h=n(5),l=n(4),u=(n(50),n(51),n(8)),d=n(10),y=Object(d.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),f=y.actions,v=f.increment,m=(f.decrement,f.incrementByAmount,function(e){return e.counter.value}),g=y.reducer,p=Object(d.b)({name:"playerState",initialState:{status:"idle",position:[0,0]},reducers:{setPlayerState:function(e,t){e.status=t.payload},setPlayerPosition:function(e,t){e.position=t.payload}}}),b=p.actions,k=b.setPlayerState,x=b.setPlayerPosition,B=function(e){return e.playerState.status},A=function(e){return e.playerState.position},w=p.reducer;function S(){var e=Object(u.c)(m),t=Object(u.b)();return s.a.createElement("div",null,s.a.createElement("h1",null," count: ",e," "),s.a.createElement("button",{"aria-label":"Increment value",onClick:function(){return t(v())}}," + "))}function j(){var e=Object(u.c)(B),t=Object(u.c)(A);return s.a.createElement("div",null,s.a.createElement("h1",null," status: ",e," "),s.a.createElement("h1",null," x: ",t[0]," y: ",t[1]," "))}var O=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null," hello! "),s.a.createElement(S,null),s.a.createElement(j,null))}}]),n}(i.Component),P=(n(57),Object(d.a)({reducer:{counter:g,playerState:w}})),C=n(44),E=n.n(C),T=n(3),L=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).parent.gameState.backgroundObject01={},i.gameState=i.parent.gameState.backgroundObject01,i.gameState={x:0,y:1},i}return Object(r.a)(n,[{key:"update",value:function(e){}},{key:"draw",value:function(e){this.scene.engine.context.fillStyle="lightgreen",this.scene.engine.context.fillRect(0,0,this.scene.engine.canvas.width,this.scene.engine.canvas.height)}}]),n}(T.GameObject),M=n(6),U=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e,i,s,a,c){var r;return Object(o.a)(this,n),(r=t.call(this,e)).scene=e,r.update=r.update.bind(Object(M.a)(r)),r.draw=r.draw.bind(Object(M.a)(r)),r.AABB=r.createAABB(i,s,a,c),r.color="blue",r}return Object(r.a)(n,[{key:"update",value:function(e){}},{key:"draw",value:function(e){this.scene.engine.context.fillStyle=this.color,this.scene.engine.context.fillRect(this.AABB.min.x,this.AABB.min.y,this.AABB.width,this.AABB.height)}}]),n}(T.GameObject),_=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var i;Object(o.a)(this,n),(i=t.call(this,e)).scene=e,i.update=i.update.bind(Object(M.a)(i)),i.draw=i.draw.bind(Object(M.a)(i)),i.x=64,i.y=0,i.xVel=10,i.yVel=0,i.gravity=.005,i.jump=-1.5,i.jumpTimer=0,i.AABB=i.createAABB(64,64,i.x,i.y),i.state="idle",i.colors={jumping:"red",walking:"yellow",idle:"blue"},i.newCount=0,i.count=0;var s=i.handleCountUpdate.bind(Object(M.a)(i));return i.countUnsubscribe=P.subscribe(s),i.inputState={xState:"idle",yState:"idle"},i.sendUpdate=!1,i}return Object(r.a)(n,[{key:"handleCountUpdate",value:function(){this.newCount=m(P.getState())}},{key:"update",value:function(e){var t,n,i=0,s=this.inputState.xState;if(65 in this.scene.engine.keyState&&68 in this.scene.engine.keyState?(this.inputState.xState="idle",i=0):65 in this.scene.engine.keyState?(this.inputState.xState="movingLeft",i=-this.xVel):68 in this.scene.engine.keyState?(this.inputState.xState="movingRight",i=this.xVel):this.inputState.xState="idle",s!=this.inputState.xState&&(this.sendUpdate=!0),32 in this.scene.engine.keyState?this.jumpTimer<=0&&(this.sendUpdate=!0,this.inputState.yState="jumping",this.yVel=this.jump,this.jumpTimer=1e3):("idle"!=this.inputState.yState&&(this.sendUpdate=!0),this.inputState.yState="idle"),this.timer+=e,this.timer>1e3&&(this.timer=0,console.log(e,this.inputState)),this.jumpTimer-=e,this.yVel?this.state="jumping":this.state=i?"walking":"idle",this.yVel+=this.gravity*e,t=this.yVel*e+this.gravity*Math.pow(e,2),this.x+=i,this.y+=t,this.AABB.setPos(this.x,this.y),(n=this.AABB.checkCollisions(this.scene.staticObjects)).length>0)for(var a=0;a<n.length;a++){var c=n[a];this.handleCollision(c,i,t)}if((n=this.AABB.checkCollisions(this.scene.portalObjects)).length>0)for(a=0;a<n.length;a++)this.scene.switchScene(n[a].parent.nextScene);this.count=this.newCount,P.dispatch(k(this.state)),P.dispatch(x([Math.round(this.x),Math.round(this.y)])),P.dispatch(v()),this.sendUpdate&&(this.scene.engine.socket.emit("inputState",this.inputState),this.sendUpdate=!1)}},{key:"handleCollision",value:function(e,t,n){t>n?(this.AABB.setPos(this.x-t,this.y),this.AABB.checkCollision(e)?this.handleYCollision(e):this.handleXCollision(e)):(this.AABB.setPos(this.x,this.y-n),this.AABB.checkCollision(e)?this.handleXCollision(e):this.handleYCollision(e)),this.AABB.setPos(this.x,this.y)}},{key:"handleYCollision",value:function(e){this.AABB.ifTopCollision(e)?this.y=e.max.y:(this.y=e.min.y-this.AABB.height,this.jumpTimer=0),this.yVel=0}},{key:"handleXCollision",value:function(e){this.AABB.ifLeftCollision(e)?this.x=e.max.x:this.x=e.min.x-this.AABB.width}},{key:"draw",value:function(e){this.scene.engine.context.fillStyle=this.colors[this.state],this.scene.engine.context.fillRect(this.AABB.min.x,this.AABB.min.y,this.AABB.width,this.AABB.height),this.scene.engine.context.fillStyle="black",this.scene.engine.context.textAlign="center",this.scene.engine.context.font="30px Comic Sans MS",this.scene.engine.context.fillText("THIS IS ME",this.AABB.min.x+this.AABB.width/2,this.AABB.min.y-10)}}]),n}(T.GameObject),I=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e,i,s){var a;return Object(o.a)(this,n),(a=t.call(this,e,s)).username=i,a.scene=e,a.update=a.update.bind(Object(M.a)(a)),a.draw=a.draw.bind(Object(M.a)(a)),a.x=64,a.y=0,a.xVel=10,a.yVel=0,a.gravity=.005,a.jump=-1.5,a.jumpTimer=0,a.AABB=a.createAABB(64,64,a.x,a.y),a.state="idle",a.colors={jumping:"red",walking:"yellow",idle:"blue"},console.log("connecting: "+i),a}return Object(r.a)(n,[{key:"update",value:function(e){this.gameState=this.parent.gameState[this.username],this.gameState.connected&&this.AABB.setPos(this.gameState.x,this.gameState.y)}},{key:"draw",value:function(e){console.log("drawing?"),this.gameState.connected&&(this.scene.engine.context.fillStyle=this.colors[this.state],this.scene.engine.context.fillRect(this.AABB.min.x,this.AABB.min.y,this.AABB.width,this.AABB.height),this.scene.engine.context.fillStyle="black",this.scene.engine.context.textAlign="center",this.scene.engine.context.font="30px Comic Sans MS",this.scene.engine.context.fillText(this.username,this.AABB.min.x+this.AABB.width/2,this.AABB.min.y-10))}}]),n}(T.GameObject),V=(T.GameObject,function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var i,s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"red";return Object(o.a)(this,n),(i=t.call(this,e)).posAABB=i.createAABB(128,128,128,128),i.radius=32,i.speed=.1,i.velocity=.1,i.direction=1,i.color=s,i.target=null,i.gameState=i.parent.gameState.bouncingBall={x:i.posAABB.x,y:i.posAABB.y},i.lastUpdate=i.gameState.y,i}return Object(r.a)(n,[{key:"update",value:function(e){if(this.gameState=this.parent.gameState.bouncingBall,this.gameState.y==this.lastUpdate){var t=this.posAABB.min.y+this.velocity*e;this.posAABB.setPos(this.posAABB.x,t);var n=this.posAABB.canvasPos;(n.y>336&&this.velocity>0||n.y<32&&this.velocity<0)&&(this.velocity=-this.velocity)}else console.log("sync!"),this.lastUpdate=this.gameState.y,this.posAABB.setPos(this.gameState.x,this.gameState.y)}},{key:"draw",value:function(e){var t=this.posAABB.canvasPos;this.circle(this.scene.engine.context,t.x,t.y)}},{key:"circle",value:function(e,t,n){e.beginPath(),e.arc(t,n,this.radius,0,2*Math.PI,!1),e.fillStyle=this.color,e.fill(),e.lineWidth=1,e.stroke()}}]),n}(T.GameObject)),G=function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(e){var i;return Object(o.a)(this,n),(i=t.call(this,e)).scene=e,i.update=i.update.bind(Object(M.a)(i)),i.draw=i.draw.bind(Object(M.a)(i)),i.gameState=i.parent.gameState.playerManager={},i.connectedPlayers={},i}return Object(r.a)(n,[{key:"update",value:function(e){for(var t in this.gameState=this.parent.gameState.playerManager,this.gameState)t in this.connectedPlayers?this.connectedPlayers[t].update(e):this.connectedPlayers[t]=new I(this.scene,t,this)}},{key:"draw",value:function(e){for(var t in this.gameState)t in this.connectedPlayers&&this.connectedPlayers[t].draw(e)}}]),n}(T.GameObject),R={testScene:function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"setup",value:function(e){var t=new L(this),n=new U(this,1600,32,-800,368),i=new U(this,400,32,400,200),s=new V(this,"blue"),a=new _(this),c=new G(this);this.layerOrder=["layer1","layer2","layer3"],this.layers={layer1:[t],layer2:[n,i,s],layer3:[a,c]},this.staticObjects=[n.AABB,i.AABB],this.portalObjects=[],this.gameObjects=[t,a,s,c]}},{key:"updateSocket",value:function(){var e=this;this.engine.socket.on("gamestate",(function(t){e.gameState=t}))}}]),n}(T.Scene),area01:function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"setup",value:function(e){var t=new L(this),n=new U(this,1600,32,-800,368),i=new U(this,400,32,400,200),s=new V(this,"blue"),a=new _(this),c=new G(this);this.layerOrder=["layer1","layer2","layer3"],this.layers={layer1:[t],layer2:[n,i,s],layer3:[a,c]},this.staticObjects=[n.AABB,i.AABB],this.portalObjects=[],this.gameObjects=[t,a,s,c]}},{key:"updateSocket",value:function(){var e=this;this.engine.socket.on("gamestate",(function(t){e.gameState=t}))}}]),n}(T.Scene),area02:function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"setup",value:function(e){var t=new L(this),n=new U(this,1600,32,-800,368),i=new U(this,200,32,400,200),s=new V(this,"blue"),a=new _(this),c=new G(this);this.layerOrder=["layer1","layer2","layer3"],this.layers={layer1:[t],layer2:[n,i,s],layer3:[a,c]},this.staticObjects=[n.AABB,i.AABB],this.portalObjects=[],this.gameObjects=[t,a,s,c]}},{key:"updateSocket",value:function(){var e=this;this.engine.socket.on("gamestate",(function(t){e.gameState=t}))}}]),n}(T.Scene),area03:function(e){Object(h.a)(n,e);var t=Object(l.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"setup",value:function(e){var t=new L(this),n=new U(this,1600,32,-800,368),i=new U(this,200,32,200,200),s=new V(this,"blue"),a=new _(this),c=new G(this);this.layerOrder=["layer1","layer2","layer3"],this.layers={layer1:[t],layer2:[n,i,s],layer3:[a,c]},this.staticObjects=[n.AABB,i.AABB],this.portalObjects=[],this.gameObjects=[t,a,s,c]}},{key:"updateSocket",value:function(){var e=this;this.engine.socket.on("gamestate",(function(t){e.gameState=t}))}}]),n}(T.Scene)},D=new T.Engine(R,"area03",{}),X=prompt("Please enter your name","Harry Potter"),Y=E()(window.location.origin,{path:window.location.pathname+"socket.io",query:"name="+X});Y.on("connect",(function(){console.log(Y.id),console.log(Y.connected)})),Y.on("heartbeat",(function(e){console.log(e)})),c.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(u.a,{store:P},s.a.createElement(O,null))),document.getElementById("root")),D.username=X,D.addSocket(Y),D.start()}},[[45,1,2]]]);
//# sourceMappingURL=main.3483a394.chunk.js.map