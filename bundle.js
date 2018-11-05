/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/keymaster/keymaster.js":
/*!*********************************************!*\
  !*** ./node_modules/keymaster/keymaster.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

//     keymaster.js
//     (c) 2011-2013 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

;(function(global){
  var k,
    _handlers = {},
    _mods = { 16: false, 18: false, 17: false, 91: false },
    _scope = 'all',
    // modifier keys
    _MODIFIERS = {
      '⇧': 16, shift: 16,
      '⌥': 18, alt: 18, option: 18,
      '⌃': 17, ctrl: 17, control: 17,
      '⌘': 91, command: 91
    },
    // special keys
    _MAP = {
      backspace: 8, tab: 9, clear: 12,
      enter: 13, 'return': 13,
      esc: 27, escape: 27, space: 32,
      left: 37, up: 38,
      right: 39, down: 40,
      del: 46, 'delete': 46,
      home: 36, end: 35,
      pageup: 33, pagedown: 34,
      ',': 188, '.': 190, '/': 191,
      '`': 192, '-': 189, '=': 187,
      ';': 186, '\'': 222,
      '[': 219, ']': 221, '\\': 220
    },
    code = function(x){
      return _MAP[x] || x.toUpperCase().charCodeAt(0);
    },
    _downKeys = [];

  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

  // IE doesn't support Array#indexOf, so have a simple replacement
  function index(array, item){
    var i = array.length;
    while(i--) if(array[i]===item) return i;
    return -1;
  }

  // for comparing mods before unassignment
  function compareArray(a1, a2) {
    if (a1.length != a2.length) return false;
    for (var i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
  }

  var modifierMap = {
      16:'shiftKey',
      18:'altKey',
      17:'ctrlKey',
      91:'metaKey'
  };
  function updateModifierKey(event) {
      for(k in _mods) _mods[k] = event[modifierMap[k]];
  };

  // handle keydown event
  function dispatch(event) {
    var key, handler, k, i, modifiersMatch, scope;
    key = event.keyCode;

    if (index(_downKeys, key) == -1) {
        _downKeys.push(key);
    }

    // if a modifier key, set the key.<modifierkeyname> property to true and return
    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
    if(key in _mods) {
      _mods[key] = true;
      // 'assignKey' from inside this closure is exported to window.key
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
      return;
    }
    updateModifierKey(event);

    // see if we need to ignore the keypress (filter() can can be overridden)
    // by default ignore key presses if a select, textarea, or input is focused
    if(!assignKey.filter.call(this, event)) return;

    // abort if no potentially matching shortcuts found
    if (!(key in _handlers)) return;

    scope = getScope();

    // for each potential shortcut
    for (i = 0; i < _handlers[key].length; i++) {
      handler = _handlers[key][i];

      // see if it's in the current scope
      if(handler.scope == scope || handler.scope == 'all'){
        // check if modifiers match if any
        modifiersMatch = handler.mods.length > 0;
        for(k in _mods)
          if((!_mods[k] && index(handler.mods, +k) > -1) ||
            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
        // call the handler and stop the event if neccessary
        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
          if(handler.method(event, handler)===false){
            if(event.preventDefault) event.preventDefault();
              else event.returnValue = false;
            if(event.stopPropagation) event.stopPropagation();
            if(event.cancelBubble) event.cancelBubble = true;
          }
        }
      }
    }
  };

  // unset modifier keys on keyup
  function clearModifier(event){
    var key = event.keyCode, k,
        i = index(_downKeys, key);

    // remove key from _downKeys
    if (i >= 0) {
        _downKeys.splice(i, 1);
    }

    if(key == 93 || key == 224) key = 91;
    if(key in _mods) {
      _mods[key] = false;
      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
    }
  };

  function resetModifiers() {
    for(k in _mods) _mods[k] = false;
    for(k in _MODIFIERS) assignKey[k] = false;
  };

  // parse and assign shortcut
  function assignKey(key, scope, method){
    var keys, mods;
    keys = getKeys(key);
    if (method === undefined) {
      method = scope;
      scope = 'all';
    }

    // for each shortcut
    for (var i = 0; i < keys.length; i++) {
      // set modifier keys if any
      mods = [];
      key = keys[i].split('+');
      if (key.length > 1){
        mods = getMods(key);
        key = [key[key.length-1]];
      }
      // convert to keycode and...
      key = key[0]
      key = code(key);
      // ...store handler
      if (!(key in _handlers)) _handlers[key] = [];
      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
    }
  };

  // unbind all handlers for given key in current scope
  function unbindKey(key, scope) {
    var multipleKeys, keys,
      mods = [],
      i, j, obj;

    multipleKeys = getKeys(key);

    for (j = 0; j < multipleKeys.length; j++) {
      keys = multipleKeys[j].split('+');

      if (keys.length > 1) {
        mods = getMods(keys);
        key = keys[keys.length - 1];
      }

      key = code(key);

      if (scope === undefined) {
        scope = getScope();
      }
      if (!_handlers[key]) {
        return;
      }
      for (i = 0; i < _handlers[key].length; i++) {
        obj = _handlers[key][i];
        // only clear handlers if correct scope and mods match
        if (obj.scope === scope && compareArray(obj.mods, mods)) {
          _handlers[key][i] = {};
        }
      }
    }
  };

  // Returns true if the key with code 'keyCode' is currently down
  // Converts strings into key codes.
  function isPressed(keyCode) {
      if (typeof(keyCode)=='string') {
        keyCode = code(keyCode);
      }
      return index(_downKeys, keyCode) != -1;
  }

  function getPressedKeyCodes() {
      return _downKeys.slice(0);
  }

  function filter(event){
    var tagName = (event.target || event.srcElement).tagName;
    // ignore keypressed in any elements that support keyboard data input
    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
  }

  // initialize key.<modifier> to false
  for(k in _MODIFIERS) assignKey[k] = false;

  // set current scope (default 'all')
  function setScope(scope){ _scope = scope || 'all' };
  function getScope(){ return _scope || 'all' };

  // delete all handlers for a given scope
  function deleteScope(scope){
    var key, handlers, i;

    for (key in _handlers) {
      handlers = _handlers[key];
      for (i = 0; i < handlers.length; ) {
        if (handlers[i].scope === scope) handlers.splice(i, 1);
        else i++;
      }
    }
  };

  // abstract key logic for assign and unassign
  function getKeys(key) {
    var keys;
    key = key.replace(/\s/g, '');
    keys = key.split(',');
    if ((keys[keys.length - 1]) == '') {
      keys[keys.length - 2] += ',';
    }
    return keys;
  }

  // abstract mods logic for assign and unassign
  function getMods(key) {
    var mods = key.slice(0, key.length - 1);
    for (var mi = 0; mi < mods.length; mi++)
    mods[mi] = _MODIFIERS[mods[mi]];
    return mods;
  }

  // cross-browser events
  function addEvent(object, event, method) {
    if (object.addEventListener)
      object.addEventListener(event, method, false);
    else if(object.attachEvent)
      object.attachEvent('on'+event, function(){ method(window.event) });
  };

  // set the handlers globally on document
  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
  addEvent(document, 'keyup', clearModifier);

  // reset modifiers to false whenever the window is (re)focused.
  addEvent(window, 'focus', resetModifiers);

  // store previously defined key
  var previousKey = global.key;

  // restore previously defined key and return reference to our key object
  function noConflict() {
    var k = global.key;
    global.key = previousKey;
    return k;
  }

  // set window.key and window.key.set/get/deleteScope, and the default filter
  global.key = assignKey;
  global.key.setScope = setScope;
  global.key.getScope = getScope;
  global.key.deleteScope = deleteScope;
  global.key.filter = filter;
  global.key.isPressed = isPressed;
  global.key.getPressedKeyCodes = getPressedKeyCodes;
  global.key.noConflict = noConflict;
  global.key.unbind = unbindKey;

  if(true) module.exports = assignKey;

})(this);


/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Time */ "./src/Time.js");
/* harmony import */ var _components_renderers_Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/renderers/Renderer */ "./src/components/renderers/Renderer.js");
/* harmony import */ var _components_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Component */ "./src/components/Component.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./files */ "./src/files.js");






var Game = {
  init: function init(ctx) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.gameObjects = new Set();
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.coins = 0;
    _Time__WEBPACK_IMPORTED_MODULE_0__["default"].update();
    setTimeout(this.update, 0);
    window.requestAnimationFrame(this.draw);
    window.Game = this;
    this.over = false;
    this.muted = true;
  },
  update: function update() {
    if (this.over) return;
    _components_Component__WEBPACK_IMPORTED_MODULE_2__["default"].start();
    _Time__WEBPACK_IMPORTED_MODULE_0__["default"].update();
    Array.from(this.gameObjects).forEach(function (gameObject) {
      return gameObject.update();
    });
    _components_Component__WEBPACK_IMPORTED_MODULE_2__["default"].start();
    Array.from(this.gameObjects).forEach(function (gameObject) {
      return gameObject.lateUpdate();
    });
    setTimeout(this.update, 0);
  },
  draw: function draw() {
    var _this = this;

    _components_Component__WEBPACK_IMPORTED_MODULE_2__["default"].start();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, 512, 480);
    if (this.over) return;

    if (this.playerTransform) {
      var _this$playerTransform = this.playerTransform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](256, 240)),
          x = _this$playerTransform.x,
          y = _this$playerTransform.y;

      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > this.mapSize.x - 512) x = this.mapSize.x - 512;
      y = this.mapSize.y - 390;
      x = -Math.floor(x);
      y = -Math.floor(y);
      this.ctx.translate(x, y);
    }

    this.ctx.beginPath();
    _components_renderers_Renderer__WEBPACK_IMPORTED_MODULE_1__["default"].all.forEach(function (renderer) {
      if (renderer.visible) renderer.draw(_this.ctx);
    });
    this.ctx.fillStyle = 'white';
    this.ctx.font = "32px sans-serif";
    this.ctx.fillText('Thanks for playing!', this.mapSize.x - 350, this.mapSize.y - 211);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.beginPath();
    this.ctx.rect(0, 390, 512, 90);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.font = "16px sans-serif";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("$".concat(this.coins), 450, 450);
    window.requestAnimationFrame(this.draw);
  },
  end: function end() {
    _files__WEBPACK_IMPORTED_MODULE_4__["level1Music"].muted = true;

    if (!this.muted) {
      _files__WEBPACK_IMPORTED_MODULE_4__["gameOver"].currentTime = 0;
      _files__WEBPACK_IMPORTED_MODULE_4__["gameOver"].play();
    }

    this.over = true;
    var game = document.querySelector('.game');
    var restartButton = document.createElement('button');
    restartButton.innerText = 'Try again';
    restartButton.addEventListener('click', function (e) {
      e.preventDefault();
      location.reload();
    });
    game.appendChild(restartButton);
  },
  add: function add(gameObject) {
    this.gameObjects.add(gameObject);
  },
  destroy: function destroy(gameObject) {
    this.gameObjects.delete(gameObject);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./src/Time.js":
/*!*********************!*\
  !*** ./src/Time.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Time = {
  deltaTime: 0.017,
  lastUpdatedAt: new Date(),
  update: function update() {
    this.deltaTime = (new Date() - this.lastUpdatedAt) / 1000;
    if (this.deltaTime > 0.05) this.deltaTime = 0.05;
    this.lastUpdatedAt = new Date();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Time);

/***/ }),

/***/ "./src/Vector.js":
/*!***********************!*\
  !*** ./src/Vector.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Vector =
/*#__PURE__*/
function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector, [{
    key: "plus",
    value: function plus(otherVector) {
      return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }
  }, {
    key: "minus",
    value: function minus(otherVector) {
      return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }
  }, {
    key: "dotProduct",
    value: function dotProduct(otherVector) {
      return this.x * otherVector.x + this.y * otherVector.y;
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(otherVector) {
      return this.minus(otherVector).magnitude();
    }
  }, {
    key: "times",
    value: function times(arg) {
      if (arg instanceof Vector) {
        return new Vector(this.x * arg.x, this.y * arg.y);
      } else if (typeof arg === 'number') {
        return new Vector(this.x * arg, this.y * arg);
      }
    }
  }, {
    key: "dividedBy",
    value: function dividedBy(arg) {
      if (arg instanceof Vector) {
        return new Vector(this.x / arg.x, this.y / arg.y);
      } else if (typeof arg === 'number') {
        return new Vector(this.x / arg, this.y / arg);
      }
    }
  }, {
    key: "normalized",
    value: function normalized() {
      if (this.magnitude() === 0) return Vector.zero();
      return this.dividedBy(this.magnitude());
    }
  }, {
    key: "toPOJO",
    value: function toPOJO() {
      return {
        x: this.x,
        y: this.y
      };
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
  }], [{
    key: "fromPOJO",
    value: function fromPOJO(pojo) {
      if (pojo === undefined) return Vector.zero();
      return new Vector(pojo.x, pojo.y);
    }
  }, {
    key: "lerp",
    value: function lerp(a, b, factor) {
      if (factor < 0 || factor >= 1) return b.clone();
      return a.plus(b.minus(a).times(factor));
    }
  }, {
    key: "zero",
    get: function get() {
      return new Vector(0, 0);
    }
  }, {
    key: "one",
    get: function get() {
      return new Vector(1, 1);
    }
  }]);

  return Vector;
}();

/* harmony default export */ __webpack_exports__["default"] = (Vector);

/***/ }),

/***/ "./src/audio/bump.mp3":
/*!****************************!*\
  !*** ./src/audio/bump.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/883ec0e25b2a6804c25d3e040e333358-bump.mp3";

/***/ }),

/***/ "./src/audio/coin.mp3":
/*!****************************!*\
  !*** ./src/audio/coin.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/2f121335c507def96d3c2589059735de-coin.mp3";

/***/ }),

/***/ "./src/audio/game-over.mp3":
/*!*********************************!*\
  !*** ./src/audio/game-over.mp3 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/7689076ea56fa496eff3cdaafa1f14f7-game-over.mp3";

/***/ }),

/***/ "./src/audio/jump.mp3":
/*!****************************!*\
  !*** ./src/audio/jump.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/ce1fb3b6acde711eba4011954004e5db-jump.mp3";

/***/ }),

/***/ "./src/audio/kick.mp3":
/*!****************************!*\
  !*** ./src/audio/kick.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/cda6d435f6ca4cac896fb65575ad3ea5-kick.mp3";

/***/ }),

/***/ "./src/audio/level1-music.mp3":
/*!************************************!*\
  !*** ./src/audio/level1-music.mp3 ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/7b568da25170cd7be76065e9a1b59efe-level1-music.mp3";

/***/ }),

/***/ "./src/audio/mushroom.mp3":
/*!********************************!*\
  !*** ./src/audio/mushroom.mp3 ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/0969fa7c62d4a9f9b8ebfeefba8a5914-mushroom.mp3";

/***/ }),

/***/ "./src/audio/power-down.mp3":
/*!**********************************!*\
  !*** ./src/audio/power-down.mp3 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/d85ef9cf92574755d7b612b57886ee41-power-down.mp3";

/***/ }),

/***/ "./src/audio/power-up.mp3":
/*!********************************!*\
  !*** ./src/audio/power-up.mp3 ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/f4cecbe1c78eebad673d514aebc359b0-power-up.mp3";

/***/ }),

/***/ "./src/audio/skid.mp3":
/*!****************************!*\
  !*** ./src/audio/skid.mp3 ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/0bd48b8d00de42ab0d33a9bdceb97629-skid.mp3";

/***/ }),

/***/ "./src/audio/stomp.mp3":
/*!*****************************!*\
  !*** ./src/audio/stomp.mp3 ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/746a2e13d6c9d60aa8fa84739c004d41-stomp.mp3";

/***/ }),

/***/ "./src/components/Aim.js":
/*!*******************************!*\
  !*** ./src/components/Aim.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Aim =
/*#__PURE__*/
function (_Component) {
  _inherits(Aim, _Component);

  function Aim() {
    _classCallCheck(this, Aim);

    return _possibleConstructorReturn(this, _getPrototypeOf(Aim).apply(this, arguments));
  }

  _createClass(Aim, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "direction",
    get: function get() {
      return _Game__WEBPACK_IMPORTED_MODULE_2__["default"].playerTransform.position.minus(this.transform.position).plus(new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](0, 16)).normalized();
    }
  }]);

  return Aim;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Aim);

/***/ }),

/***/ "./src/components/Collider.js":
/*!************************************!*\
  !*** ./src/components/Collider.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util */ "./src/util.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }






var Collider =
/*#__PURE__*/
function (_Component) {
  _inherits(Collider, _Component);

  function Collider(layer, size) {
    var _this;

    var bottom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var oneDirection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Collider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Collider).call(this));
    _this.layer = layer;
    _this.size = size;
    _this.bottom = bottom;
    _this.oneDirection = oneDirection;
    if (Collider.all[layer] === undefined) Collider.all[layer] = new Set();
    Collider.all[layer].add(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Collider, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "checkAllCollisions",
    value: function checkAllCollisions(layers) {
      var oneDirection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var colliders = Collider.getColliders(layers);

      for (var i = 0; i < colliders.length; i++) {
        var collider = colliders[i];
        if (collider.gameObject === this.gameObject || collider.oneDirection && !oneDirection) continue;
        var depth = this.checkCollision(collider);
        if (depth) return depth;
      }

      return null;
    }
  }, {
    key: "checkCollision",
    value: function checkCollision(collider) {
      var rect1 = this.rect;
      var rect2 = collider.rect;

      if (rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 && rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1) {
        var depth = _Vector__WEBPACK_IMPORTED_MODULE_2__["default"].zero;
        depth.x = Object(_util__WEBPACK_IMPORTED_MODULE_3__["minBy"])([rect1.x2 - rect2.x1, rect1.x1 - rect2.x2], function (el) {
          return Math.abs(el);
        });
        depth.y = Object(_util__WEBPACK_IMPORTED_MODULE_3__["minBy"])([rect1.y2 - rect2.y1, rect1.y1 - rect2.y2], function (el) {
          return Math.abs(el);
        });

        if (collider.oneDirection) {
          if (depth.y > 0 && depth.y < this.size.y / 4) {
            return {
              collider: collider,
              depth: new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, depth.y)
            };
          }
        } else {
          return {
            collider: collider,
            depth: depth
          };
        }
      }

      return null;
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      Collider.all[this.layer].delete(this);
    }
  }, {
    key: "rect",
    get: function get() {
      var y1Offset = this.size.y;
      var y2Offset = 0;
      if (!this.bottom) y1Offset /= 2;
      if (!this.bottom) y2Offset = this.size.y / 2;
      return {
        x1: this.transform.position.x - this.size.x / 2,
        y1: this.transform.position.y - y1Offset,
        x2: this.transform.position.x + this.size.x / 2,
        y2: this.transform.position.y + y2Offset
      };
    }
  }], [{
    key: "getColliders",
    value: function getColliders(layers) {
      var colliders = [];
      layers.forEach(function (layer) {
        if (Collider.all[layer] === undefined) return;
        Collider.all[layer].forEach(function (collider) {
          if (collider.isStarted()) colliders.push(collider);
        });
      });
      return colliders;
    }
  }]);

  return Collider;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

Collider.all = {};
window.Collider = Collider;
/* harmony default export */ __webpack_exports__["default"] = (Collider);

/***/ }),

/***/ "./src/components/Component.js":
/*!*************************************!*\
  !*** ./src/components/Component.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component =
/*#__PURE__*/
function () {
  function Component() {
    _classCallCheck(this, Component);

    Component.unstarted.add(this);
  }

  _createClass(Component, [{
    key: "start",
    value: function start() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {}
  }, {
    key: "onDestroy",
    value: function onDestroy() {}
  }, {
    key: "getComponent",
    value: function getComponent(componentClass) {
      return this.gameObject.getComponent(componentClass);
    }
  }, {
    key: "requireComponent",
    value: function requireComponent(componentClass) {
      var component = this.getComponent(componentClass);

      if (!component) {
        throw "".concat(this.constructor.name, " requires ").concat(componentClass.name);
      }

      return component;
    }
  }, {
    key: "isStarted",
    value: function isStarted() {
      return !Component.unstarted.has(this);
    }
  }], [{
    key: "start",
    value: function start() {
      var _this = this;

      this.unstarted.forEach(function (component) {
        component.start();

        _this.unstarted.delete(component);
      });
    }
  }]);

  return Component;
}();

Component.unstarted = new Set();
/* harmony default export */ __webpack_exports__["default"] = (Component);

/***/ }),

/***/ "./src/components/Damageable.js":
/*!**************************************!*\
  !*** ./src/components/Damageable.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Damageable =
/*#__PURE__*/
function (_Component) {
  _inherits(Damageable, _Component);

  function Damageable() {
    var _this;

    var stompable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, Damageable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Damageable).call(this));
    _this.onDamageFunctions = new Set();
    _this.invincible = false;
    _this.stompable = stompable;
    return _this;
  }

  _createClass(Damageable, [{
    key: "tempInvincible",
    value: function tempInvincible() {
      var _this2 = this;

      this.invincible = true;
      setTimeout(function () {
        return _this2.invincible = false;
      }, 1000);
    }
  }, {
    key: "onDamage",
    value: function onDamage(func) {
      var _this3 = this;

      this.onDamageFunctions.add(func);
      return function () {
        return _this3.onDamageFunctions.delete(func);
      };
    }
  }, {
    key: "stomp",
    value: function stomp() {
      if (this.stompable) {
        if (!_Game__WEBPACK_IMPORTED_MODULE_2__["default"].muted) {
          _files__WEBPACK_IMPORTED_MODULE_1__["stompSound"].currentTime = 0;
          _files__WEBPACK_IMPORTED_MODULE_1__["stompSound"].play();
        }

        this.damage();
      }
    }
  }, {
    key: "damage",
    value: function damage() {
      if (!this.invincible) this.onDamageFunctions.forEach(function (func) {
        return func();
      });
    }
  }]);

  return Damageable;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Damageable);

/***/ }),

/***/ "./src/components/Damaging.js":
/*!************************************!*\
  !*** ./src/components/Damaging.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Collider */ "./src/components/Collider.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Damaging =
/*#__PURE__*/
function (_Component) {
  _inherits(Damaging, _Component);

  function Damaging() {
    _classCallCheck(this, Damaging);

    return _possibleConstructorReturn(this, _getPrototypeOf(Damaging).apply(this, arguments));
  }

  _createClass(Damaging, [{
    key: "start",
    value: function start() {
      this.collider = this.requireComponent(_Collider__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      var collision = this.collider.checkAllCollisions(['player']);

      if (collision) {
        var damageable = collision.collider.gameObject.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_2__["default"]);
        if (damageable) damageable.damage();
      }
    }
  }]);

  return Damaging;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Damaging);

/***/ }),

/***/ "./src/components/GoombaDeath.js":
/*!***************************************!*\
  !*** ./src/components/GoombaDeath.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _sprites_goombaSprite__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sprites/goombaSprite */ "./src/sprites/goombaSprite.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _game_objects_GameObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../game-objects/GameObject */ "./src/game-objects/GameObject.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var GoombaDeath =
/*#__PURE__*/
function (_Component) {
  _inherits(GoombaDeath, _Component);

  function GoombaDeath() {
    _classCallCheck(this, GoombaDeath);

    return _possibleConstructorReturn(this, _getPrototypeOf(GoombaDeath).apply(this, arguments));
  }

  _createClass(GoombaDeath, [{
    key: "start",
    value: function start() {
      var _this = this;

      var transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_4__["default"]);
      var damageable = this.requireComponent(_Damageable__WEBPACK_IMPORTED_MODULE_1__["default"]);
      damageable.onDamage(function () {
        var body = new _game_objects_GameObject__WEBPACK_IMPORTED_MODULE_5__["default"]();
        body.addComponent(new _Transform__WEBPACK_IMPORTED_MODULE_4__["default"](transform.position));
        body.addComponent(new _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_3__["default"](_sprites_goombaSprite__WEBPACK_IMPORTED_MODULE_2__["default"], 'dead'));
        setTimeout(function () {
          return body.destroy();
        }, 250);

        _this.gameObject.destroy();
      });
    }
  }]);

  return GoombaDeath;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GoombaDeath);

/***/ }),

/***/ "./src/components/Health.js":
/*!**********************************!*\
  !*** ./src/components/Health.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Health =
/*#__PURE__*/
function (_Component) {
  _inherits(Health, _Component);

  function Health() {
    var _this;

    var hp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    _classCallCheck(this, Health);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Health).call(this));
    _this.hp = hp;
    _this.onDeathFunctions = new Set();
    return _this;
  }

  _createClass(Health, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var damageable = this.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_1__["default"]);

      if (damageable) {
        damageable.onDamage(function () {
          _this2.onDeathFunctions.forEach(function (func) {
            return func();
          });

          _this2.gameObject.destroy();
        });
      }
    }
  }, {
    key: "onDeath",
    value: function onDeath(func) {
      var _this3 = this;

      this.onDeathFunctions.add(func);
      return function () {
        return _this3.onDeathFunctions.delete(func);
      };
    }
  }]);

  return Health;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Health);

/***/ }),

/***/ "./src/components/Kickable.js":
/*!************************************!*\
  !*** ./src/components/Kickable.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Kickable =
/*#__PURE__*/
function (_Component) {
  _inherits(Kickable, _Component);

  function Kickable() {
    var _this;

    _classCallCheck(this, Kickable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Kickable).call(this));
    _this.onKickFunctions = new Set();
    return _this;
  }

  _createClass(Kickable, [{
    key: "onKick",
    value: function onKick(func) {
      var _this2 = this;

      this.onKickFunctions.add(func);
      return function () {
        return _this2.onKickFunctions.delete(func);
      };
    }
  }, {
    key: "kick",
    value: function kick() {
      if (!_Game__WEBPACK_IMPORTED_MODULE_2__["default"].muted) {
        _files__WEBPACK_IMPORTED_MODULE_1__["kick"].currentTime = 0;

        _files__WEBPACK_IMPORTED_MODULE_1__["kick"].play();
      }

      this.onKickFunctions.forEach(function (func) {
        return func();
      });
    }
  }]);

  return Kickable;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Kickable);

/***/ }),

/***/ "./src/components/KoopaDamageHandler.js":
/*!**********************************************!*\
  !*** ./src/components/KoopaDamageHandler.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _game_objects_createStaticShell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-objects/createStaticShell */ "./src/game-objects/createStaticShell.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var KoopaDamageHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(KoopaDamageHandler, _Component);

  function KoopaDamageHandler(color) {
    var _this;

    _classCallCheck(this, KoopaDamageHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KoopaDamageHandler).call(this));
    _this.color = color;
    return _this;
  }

  _createClass(KoopaDamageHandler, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
      var damageable = this.requireComponent(_Damageable__WEBPACK_IMPORTED_MODULE_2__["default"]);
      damageable.onDamage(function () {
        Object(_game_objects_createStaticShell__WEBPACK_IMPORTED_MODULE_3__["default"])(transform.position, _this2.color);

        _this2.gameObject.destroy();
      });
    }
  }]);

  return KoopaDamageHandler;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (KoopaDamageHandler);

/***/ }),

/***/ "./src/components/LinearMovement.js":
/*!******************************************!*\
  !*** ./src/components/LinearMovement.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Time */ "./src/Time.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var LinearMovement =
/*#__PURE__*/
function (_Component) {
  _inherits(LinearMovement, _Component);

  function LinearMovement(velocity) {
    var _this;

    _classCallCheck(this, LinearMovement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinearMovement).call(this));
    _this.velocity = velocity;
    return _this;
  }

  _createClass(LinearMovement, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "update",
    value: function update() {
      this.transform.position = this.transform.position.plus(this.velocity.times(_Time__WEBPACK_IMPORTED_MODULE_2__["default"].deltaTime));
    }
  }]);

  return LinearMovement;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (LinearMovement);

/***/ }),

/***/ "./src/components/Movement.js":
/*!************************************!*\
  !*** ./src/components/Movement.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Time */ "./src/Time.js");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collider */ "./src/components/Collider.js");
/* harmony import */ var _inputs_Input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./inputs/Input */ "./src/components/inputs/Input.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _Kickable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Kickable */ "./src/components/Kickable.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../files */ "./src/files.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var Movement =
/*#__PURE__*/
function (_Component) {
  _inherits(Movement, _Component);

  function Movement(_ref) {
    var _this;

    var gravity = _ref.gravity,
        airAcceleration = _ref.airAcceleration,
        groundAcceleration = _ref.groundAcceleration,
        speed = _ref.speed,
        accelerate = _ref.accelerate,
        velocity = _ref.velocity,
        blocking = _ref.blocking,
        isShell = _ref.isShell;

    _classCallCheck(this, Movement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Movement).call(this));
    _this.onGround = false;
    _this.skidding = false;
    _this.lastJumped = null;
    _this.gravity = gravity || new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 1800);
    _this.airAcceleration = airAcceleration || 0;
    _this.groundAcceleration = groundAcceleration === undefined ? 200 : groundAcceleration;
    _this.speed = speed === undefined ? 165 : speed;
    _this.accelerate = accelerate === undefined ? false : accelerate;
    _this.velocity = velocity || _Vector__WEBPACK_IMPORTED_MODULE_1__["default"].zero;
    _this.blocking = blocking === undefined ? ['obstacle', 'block'] : blocking;
    _this.onHitWallFunctions = new Set();
    _this.lastKicked = new Date();
    _this.isShell = isShell === undefined ? false : isShell;
    _this.lastSkid = new Date();
    return _this;
  }

  _createClass(Movement, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
      this.collider = this.getComponent(_Collider__WEBPACK_IMPORTED_MODULE_4__["default"]);
      this.input = this.getComponent(_inputs_Input__WEBPACK_IMPORTED_MODULE_5__["default"]);
      this.damageable = this.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_6__["default"]);
    }
  }, {
    key: "update",
    value: function update() {
      this.skidding = false;
      this.velocity = this.velocity.plus(this.gravity.times(_Time__WEBPACK_IMPORTED_MODULE_3__["default"].deltaTime));

      if (this.input) {
        var move = this.input.move;
        var jumpDown = this.input.jumpDown;
        var jump = this.input.jump;
        this.handleAcceleration(move);
        this.handleDeceleration(move);
        this.handleJumping(jumpDown, jump);
      }

      this.moveX();
      this.moveY();

      if (this.collider && this.collider.layer === 'player') {
        this.handleDamagingCollisions();
        this.handleKicking();
      }

      if (this.collider && this.isShell) this.handleShellCollisions();
    }
  }, {
    key: "handleAcceleration",
    value: function handleAcceleration(move) {
      var acceleration = this.onGround ? this.groundAcceleration : this.airAcceleration;
      var frameAcceleration = acceleration * _Time__WEBPACK_IMPORTED_MODULE_3__["default"].deltaTime;

      if (this.accelerate && Math.sign(this.velocity.x) !== Math.sign(move) && Math.sign(this.velocity.x) !== 0 && Math.sign(move) !== 0 && this.onGround) {
        frameAcceleration *= 3;
        this.skidding = true;

        if (!_Game__WEBPACK_IMPORTED_MODULE_8__["default"].muted && new Date() - this.lastSkid >= 150) {
          this.lastSkid = new Date();
          _files__WEBPACK_IMPORTED_MODULE_9__["skid"].currentTime = 0;
          _files__WEBPACK_IMPORTED_MODULE_9__["skid"].play();
        }
      }

      if (this.accelerate) {
        this.velocity.x += move * frameAcceleration;
        if (this.velocity.x > this.speed) this.velocity.x = this.speed;
        if (this.velocity.x < -this.speed) this.velocity.x = -this.speed;
      } else {
        this.velocity.x = move * this.speed;
      }
    }
  }, {
    key: "handleDeceleration",
    value: function handleDeceleration(move) {
      if (this.onGround && move === 0) {
        var frameDeceleration = this.groundAcceleration * _Time__WEBPACK_IMPORTED_MODULE_3__["default"].deltaTime;

        if (this.accelerate) {
          if (Math.abs(this.velocity.x) < frameDeceleration) {
            this.velocity.x = 0;
          } else if (this.velocity.x > 0) {
            this.velocity.x -= frameDeceleration;
          } else if (this.velocity.x < 0) {
            this.velocity.x += frameDeceleration;
          }
        } else {
          this.velocity.x = 0;
        }
      }
    }
  }, {
    key: "handleJumping",
    value: function handleJumping(jumpDown, jump) {
      var msSinceJumped = new Date() - this.lastJumped;

      if (this.accelerate && jump && this.lastJumped && msSinceJumped <= 400) {
        this.velocity.y -= 17000 / (new Date() - this.lastJumped + 2000);
      }

      if (this.onGround && jumpDown) {
        if (!_Game__WEBPACK_IMPORTED_MODULE_8__["default"].muted) {
          _files__WEBPACK_IMPORTED_MODULE_9__["jumpSound"].currentTime = 0;
          _files__WEBPACK_IMPORTED_MODULE_9__["jumpSound"].play();
        }

        this.lastJumped = new Date();
        this.velocity.y = -0.34 * (Math.abs(this.velocity.x) + 1000);
      }
    }
  }, {
    key: "moveX",
    value: function moveX() {
      this.transform.position = this.transform.position.plus(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](this.velocity.x * _Time__WEBPACK_IMPORTED_MODULE_3__["default"].deltaTime, 0));

      if (this.collider) {
        var collision = this.collider.checkAllCollisions(this.blocking);

        if (collision) {
          this.velocity.x = 0;
          this.transform.position = this.transform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](collision.depth.x, 0));

          if (this.isShell) {
            if (collision.collider.layer === 'block') {
              var otherGameObject = collision.collider.gameObject;
              var damageable = otherGameObject.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_6__["default"]);
              if (damageable) damageable.damage();
            } else {
              if (!_Game__WEBPACK_IMPORTED_MODULE_8__["default"].muted) {
                _files__WEBPACK_IMPORTED_MODULE_9__["bump"].currentTime = 0;
                _files__WEBPACK_IMPORTED_MODULE_9__["bump"].play();
              }
            }
          }

          this.onHitWallFunctions.forEach(function (func) {
            return func();
          });
        }
      }
    }
  }, {
    key: "moveY",
    value: function moveY() {
      this.transform.position = this.transform.position.plus(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, this.velocity.y * _Time__WEBPACK_IMPORTED_MODULE_3__["default"].deltaTime));
      this.onGround = false;

      if (this.collider) {
        var oneDirection = this.velocity.y > 0;
        var collision = this.collider.checkAllCollisions(this.blocking, oneDirection);

        if (collision) {
          this.velocity.y = 0;

          if (collision.depth.y > 0) {
            this.onGround = true;
          } else {
            if (collision.collider.layer === 'block' && collision.depth.y > -collision.collider.size.y / 4) {
              var otherGameObject = collision.collider.gameObject;
              var damageable = otherGameObject.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_6__["default"]);
              if (damageable) damageable.damage();
            }

            this.lastJumped = null;
          }

          this.transform.position = this.transform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, collision.depth.y));
        }
      }
    }
  }, {
    key: "handleDamagingCollisions",
    value: function handleDamagingCollisions() {
      if (new Date() - this.lastKicked <= 100) return;
      var collision = this.collider.checkAllCollisions(['enemy']);

      if (collision) {
        var depth = collision.depth;
        var otherGameObject = collision.collider.gameObject;
        var damageable = otherGameObject.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_6__["default"]);

        if (damageable && depth.y > 0 && depth.y < this.collider.size.y / 4) {
          if (this.velocity.y > -500) this.velocity.y = -500;
          damageable.stomp();
        } else {
          if (this.damageable) this.damageable.damage();
        }
      }
    }
  }, {
    key: "onHitWall",
    value: function onHitWall(func) {
      var _this2 = this;

      this.onHitWallFunctions.add(func);
      return function () {
        return _this2.onHitWallFunctions.delete(func);
      };
    }
  }, {
    key: "handleKicking",
    value: function handleKicking() {
      var collision = this.collider.checkAllCollisions(['kickable']);

      if (collision) {
        var otherGameObject = collision.collider.gameObject;
        var kickable = otherGameObject.getComponent(_Kickable__WEBPACK_IMPORTED_MODULE_7__["default"]);

        if (kickable) {
          kickable.kick();
          this.lastKicked = new Date();
        }
      }
    }
  }, {
    key: "handleShellCollisions",
    value: function handleShellCollisions() {
      var collision = this.collider.checkAllCollisions(['enemy']);

      if (collision) {
        var otherGameObject = collision.collider.gameObject;
        otherGameObject.destroy();
      }
    }
  }]);

  return Movement;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Movement);

/***/ }),

/***/ "./src/components/MysteryBlockDamageHandler.js":
/*!*****************************************************!*\
  !*** ./src/components/MysteryBlockDamageHandler.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _animators_MysteryBlockAnimator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animators/MysteryBlockAnimator */ "./src/components/animators/MysteryBlockAnimator.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var MysteryBlockDamageHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(MysteryBlockDamageHandler, _Component);

  function MysteryBlockDamageHandler(creator) {
    var _this;

    _classCallCheck(this, MysteryBlockDamageHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MysteryBlockDamageHandler).call(this));
    _this.creator = creator;
    return _this;
  }

  _createClass(MysteryBlockDamageHandler, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_3__["default"]);
      var animator = this.getComponent(_animators_MysteryBlockAnimator__WEBPACK_IMPORTED_MODULE_2__["default"]);
      var damageable = this.requireComponent(_Damageable__WEBPACK_IMPORTED_MODULE_1__["default"]);
      damageable.onDamage(function () {
        if (animator) animator.used = true;

        _this2.gameObject.removeComponent(damageable);

        var playerX = _Game__WEBPACK_IMPORTED_MODULE_5__["default"].playerTransform.position.x;

        _this2.creator(transform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, 32)), playerX - transform.position.x > 0 ? -1 : 1);
      });
    }
  }]);

  return MysteryBlockDamageHandler;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MysteryBlockDamageHandler);

/***/ }),

/***/ "./src/components/PipeCover.js":
/*!*************************************!*\
  !*** ./src/components/PipeCover.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _Shoot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Shoot */ "./src/components/Shoot.js");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collider */ "./src/components/Collider.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var PipeCover =
/*#__PURE__*/
function (_Component) {
  _inherits(PipeCover, _Component);

  function PipeCover() {
    _classCallCheck(this, PipeCover);

    return _possibleConstructorReturn(this, _getPrototypeOf(PipeCover).apply(this, arguments));
  }

  _createClass(PipeCover, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.collider = this.requireComponent(_Collider__WEBPACK_IMPORTED_MODULE_4__["default"]);
      this.transform.position = this.transform.position.plus(new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, 64));
      this.dir = -1;
      this.moveStart = new Date();
      this.moveStartPos = this.transform.position.clone();
      this.finished = false;
      this.shoot = this.getComponent(_Shoot__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
  }, {
    key: "update",
    value: function update() {
      var percent = (new Date() - this.moveStart) / 1000;

      if (percent > 1) {
        percent = 1;

        if (!this.finished) {
          this.finished = true;
          setTimeout(this.moveBack.bind(this), 2000);
          if (this.dir === -1 && this.shoot) setTimeout(this.shoot.shoot, 1000);
        }
      }

      this.transform.position = this.moveStartPos.plus(new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, this.dir * 64).times(percent));
    }
  }, {
    key: "moveBack",
    value: function moveBack() {
      this.transform.position = this.transform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1));
      var collision = this.collider.checkAllCollisions(['player']);
      this.transform.position = this.transform.position.plus(new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, 1));

      if (collision) {
        setTimeout(this.moveBack.bind(this), 17);
        return;
      }

      this.dir = -this.dir;
      this.moveStart = new Date();
      this.moveStartPos = this.transform.position;
      this.finished = false;
    }
  }]);

  return PipeCover;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PipeCover);

/***/ }),

/***/ "./src/components/PowerManager.js":
/*!****************************************!*\
  !*** ./src/components/PowerManager.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Collider */ "./src/components/Collider.js");
/* harmony import */ var _items_Item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./items/Item */ "./src/components/items/Item.js");
/* harmony import */ var _sprites_marioSprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sprites/marioSprite */ "./src/sprites/marioSprite.js");
/* harmony import */ var _sprites_bigMarioSprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sprites/bigMarioSprite */ "./src/sprites/bigMarioSprite.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../files */ "./src/files.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var PowerManager =
/*#__PURE__*/
function (_Component) {
  _inherits(PowerManager, _Component);

  function PowerManager() {
    var _this;

    _classCallCheck(this, PowerManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PowerManager).call(this));
    _this.power = 'none';
    return _this;
  }

  _createClass(PowerManager, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.collider = this.requireComponent(_Collider__WEBPACK_IMPORTED_MODULE_2__["default"]);
      var damageable = this.requireComponent(_Damageable__WEBPACK_IMPORTED_MODULE_6__["default"]);
      damageable.onDamage(function () {
        switch (_this2.power) {
          case 'mushroom':
            _this2.power = 'none';
            _this2.sprite.sprite = _sprites_marioSprite__WEBPACK_IMPORTED_MODULE_4__["default"];
            _this2.collider.size.y = 30;
            damageable.tempInvincible();

            if (!_Game__WEBPACK_IMPORTED_MODULE_7__["default"].muted) {
              _files__WEBPACK_IMPORTED_MODULE_8__["powerDown"].currentTime = 0;
              _files__WEBPACK_IMPORTED_MODULE_8__["powerDown"].play();
            }

            break;

          default:
            _Game__WEBPACK_IMPORTED_MODULE_7__["default"].end();
        }
      });
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      var collision = this.collider.checkAllCollisions(['item']);

      if (collision) {
        collision.collider.getComponent(_items_Item__WEBPACK_IMPORTED_MODULE_3__["default"]).pickUp(this.gameObject);
      }
    }
  }, {
    key: "mushroom",
    value: function mushroom() {
      if (this.power !== 'mushroom' && !_Game__WEBPACK_IMPORTED_MODULE_7__["default"].muted) {
        _files__WEBPACK_IMPORTED_MODULE_8__["powerUp"].currentTime = 0;
        _files__WEBPACK_IMPORTED_MODULE_8__["powerUp"].play();
      }

      this.sprite.sprite = _sprites_bigMarioSprite__WEBPACK_IMPORTED_MODULE_5__["default"];
      this.collider.size.y = 46;
      this.power = 'mushroom';
    }
  }]);

  return PowerManager;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PowerManager);

/***/ }),

/***/ "./src/components/ShellDamageHandler.js":
/*!**********************************************!*\
  !*** ./src/components/ShellDamageHandler.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _game_objects_createStaticShell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-objects/createStaticShell */ "./src/game-objects/createStaticShell.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var ShellDamageHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(ShellDamageHandler, _Component);

  function ShellDamageHandler(color) {
    var _this;

    _classCallCheck(this, ShellDamageHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShellDamageHandler).call(this));
    _this.color = color;
    return _this;
  }

  _createClass(ShellDamageHandler, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_3__["default"]);
      var damageable = this.requireComponent(_Damageable__WEBPACK_IMPORTED_MODULE_1__["default"]);
      damageable.onDamage(function () {
        Object(_game_objects_createStaticShell__WEBPACK_IMPORTED_MODULE_2__["default"])(transform.position, _this2.color);

        _this2.gameObject.destroy();
      });
    }
  }]);

  return ShellDamageHandler;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShellDamageHandler);

/***/ }),

/***/ "./src/components/ShellKickHandler.js":
/*!********************************************!*\
  !*** ./src/components/ShellKickHandler.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Kickable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Kickable */ "./src/components/Kickable.js");
/* harmony import */ var _game_objects_createMovingShell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-objects/createMovingShell */ "./src/game-objects/createMovingShell.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var ShellKickHandler =
/*#__PURE__*/
function (_Component) {
  _inherits(ShellKickHandler, _Component);

  function ShellKickHandler(color) {
    var _this;

    _classCallCheck(this, ShellKickHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShellKickHandler).call(this));
    _this.color = color;
    return _this;
  }

  _createClass(ShellKickHandler, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_3__["default"]);
      var kickable = this.requireComponent(_Kickable__WEBPACK_IMPORTED_MODULE_1__["default"]);
      kickable.onKick(function () {
        var playerPos = _Game__WEBPACK_IMPORTED_MODULE_4__["default"].playerTransform.position;
        var dir = playerPos.minus(transform.position).x > 0 ? -1 : 1;
        Object(_game_objects_createMovingShell__WEBPACK_IMPORTED_MODULE_2__["default"])(transform.position, _this2.color, dir);

        _this2.gameObject.destroy();
      });
    }
  }]);

  return ShellKickHandler;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShellKickHandler);

/***/ }),

/***/ "./src/components/Shoot.js":
/*!*********************************!*\
  !*** ./src/components/Shoot.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _game_objects_createFireball__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/createFireball */ "./src/game-objects/createFireball.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./src/components/Transform.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







var Shoot =
/*#__PURE__*/
function (_Component) {
  _inherits(Shoot, _Component);

  function Shoot() {
    var _this;

    _classCallCheck(this, Shoot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Shoot).call(this));
    _this.shoot = _this.shoot.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Shoot, [{
    key: "start",
    value: function start() {
      this.trasform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var origin = this.trasform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, 40));
      var playerPos = _Game__WEBPACK_IMPORTED_MODULE_2__["default"].playerTransform.position.minus(new _Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, 16));

      if (origin.distanceTo(playerPos) < 288) {
        Object(_game_objects_createFireball__WEBPACK_IMPORTED_MODULE_1__["default"])(origin, playerPos.minus(origin).normalized().times(100));
      }
    }
  }]);

  return Shoot;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Shoot);

/***/ }),

/***/ "./src/components/Transform.js":
/*!*************************************!*\
  !*** ./src/components/Transform.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Component */ "./src/components/Component.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Transform =
/*#__PURE__*/
function (_Component) {
  _inherits(Transform, _Component);

  function Transform(position) {
    var _this;

    _classCallCheck(this, Transform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Transform).call(this));
    _this.position = position || _Vector__WEBPACK_IMPORTED_MODULE_1__["default"].zero;
    return _this;
  }

  return Transform;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Transform);

/***/ }),

/***/ "./src/components/animators/BoxCoinAnimator.js":
/*!*****************************************************!*\
  !*** ./src/components/animators/BoxCoinAnimator.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var BoxCoinAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(BoxCoinAnimator, _Component);

  function BoxCoinAnimator() {
    _classCallCheck(this, BoxCoinAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(BoxCoinAnimator).apply(this, arguments));
  }

  _createClass(BoxCoinAnimator, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
      this.startY = this.transform.position.y;
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.startTime = new Date();
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      if (this.transform.position.y > this.startY) this.gameObject.destroy();
      var index = Math.floor((new Date() - this.startTime) / 100) % 4;
      this.sprite.frame = index;
    }
  }]);

  return BoxCoinAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (BoxCoinAnimator);

/***/ }),

/***/ "./src/components/animators/FireballAnimator.js":
/*!******************************************************!*\
  !*** ./src/components/animators/FireballAnimator.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var FireballAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(FireballAnimator, _Component);

  function FireballAnimator() {
    _classCallCheck(this, FireballAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(FireballAnimator).apply(this, arguments));
  }

  _createClass(FireballAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      this.sprite.frame = Math.floor(new Date().getTime() / 100) % 4;
    }
  }]);

  return FireballAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (FireballAnimator);

/***/ }),

/***/ "./src/components/animators/GoombaAnimator.js":
/*!****************************************************!*\
  !*** ./src/components/animators/GoombaAnimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var GoombaAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(GoombaAnimator, _Component);

  function GoombaAnimator() {
    _classCallCheck(this, GoombaAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(GoombaAnimator).apply(this, arguments));
  }

  _createClass(GoombaAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
      this.walkFrames = ['walk1', 'walk2'];
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      var walkIndex = Math.floor(this.transform.position.x / 8) % 2;
      if (walkIndex < 0) walkIndex += 2;
      this.sprite.frame = this.walkFrames[walkIndex];
    }
  }]);

  return GoombaAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (GoombaAnimator);

/***/ }),

/***/ "./src/components/animators/KoopaAnimator.js":
/*!***************************************************!*\
  !*** ./src/components/animators/KoopaAnimator.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
/* harmony import */ var _inputs_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../inputs/Input */ "./src/components/inputs/Input.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var KoopaAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(KoopaAnimator, _Component);

  function KoopaAnimator() {
    _classCallCheck(this, KoopaAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(KoopaAnimator).apply(this, arguments));
  }

  _createClass(KoopaAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
      this.walkFrames = ['walk1', 'walk2'];
      this.input = this.requireComponent(_inputs_Input__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      var walkIndex = Math.floor(this.transform.position.x / 8) % 2;
      if (walkIndex < 0) walkIndex += 2;
      this.sprite.frame = this.walkFrames[walkIndex];
      this.sprite.flipped = this.input.move > 0;
    }
  }]);

  return KoopaAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (KoopaAnimator);

/***/ }),

/***/ "./src/components/animators/MarioAnimator.js":
/*!***************************************************!*\
  !*** ./src/components/animators/MarioAnimator.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
/* harmony import */ var _Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Movement */ "./src/components/Movement.js");
/* harmony import */ var _inputs_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../inputs/Input */ "./src/components/inputs/Input.js");
/* harmony import */ var _Damageable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Damageable */ "./src/components/Damageable.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var MarioAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(MarioAnimator, _Component);

  function MarioAnimator() {
    _classCallCheck(this, MarioAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(MarioAnimator).apply(this, arguments));
  }

  _createClass(MarioAnimator, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.movement = this.requireComponent(_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]);
      this.input = this.requireComponent(_inputs_Input__WEBPACK_IMPORTED_MODULE_4__["default"]);
      this.damageable = this.getComponent(_Damageable__WEBPACK_IMPORTED_MODULE_5__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      if (this.movement.onGround) {
        if (this.movement.skidding) {
          this.sprite.frame = 'skid';
        } else {
          if (this.movement.velocity.x === 0) {
            this.sprite.frame = 'walk0';
          } else {
            var walkFrames = this.walkFrames;
            var walkIndex = Math.floor(this.transform.position.x / 14) % walkFrames.length;
            if (walkIndex < 0) walkIndex += 2;
            this.sprite.frame = walkFrames[walkIndex];
          }
        }
      } else {
        if (this.movement.velocity.y < 0) {
          this.sprite.frame = 'jumpUp';
        } else {
          this.sprite.frame = 'jumpDown';
        }
      }

      var move = this.input.move;

      if (move > 0) {
        this.sprite.flipped = false;
      } else if (move < 0) {
        this.sprite.flipped = true;
      }

      this.sprite.visible = true;

      if (this.damageable) {
        if (this.damageable.invincible) {
          this.sprite.visible = !!(Math.floor(new Date().getTime() / 16) % 2);
        }
      }
    }
  }, {
    key: "walkFrames",
    get: function get() {
      if (this.sprite.sprite.frames['walk2'] !== undefined) {
        return ['walk0', 'walk1', 'walk2', 'walk3'];
      } else {
        return ['walk0', 'walk1'];
      }
    }
  }]);

  return MarioAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MarioAnimator);

/***/ }),

/***/ "./src/components/animators/MysteryBlockAnimator.js":
/*!**********************************************************!*\
  !*** ./src/components/animators/MysteryBlockAnimator.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var MysteryBlockAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(MysteryBlockAnimator, _Component);

  function MysteryBlockAnimator() {
    _classCallCheck(this, MysteryBlockAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(MysteryBlockAnimator).apply(this, arguments));
  }

  _createClass(MysteryBlockAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.sprite.frame = 0;
      this._used = false;
      this.currentOffset = null;
      this.offsetProgression = [new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -8), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -12), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -16), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -18), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -18), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -18), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -16), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -12), new _Vector__WEBPACK_IMPORTED_MODULE_2__["default"](0, -8)];
      this.on = false;
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      if (!this._used) {
        this.sprite.frame = Math.floor(new Date().getTime() / 166) % 4;
      } else {
        if (this.currentOffset !== null) {
          var offset = this.offsetProgression[this.currentOffset];
          this.sprite.offset = offset;

          if (this.on) {
            this.currentOffset += 1;
            if (this.currentOffset > 8) this.currentOffset = null;
          }

          this.on = !this.on;
        } else {
          this.sprite.offset = _Vector__WEBPACK_IMPORTED_MODULE_2__["default"].zero;
        }
      }
    }
  }, {
    key: "used",
    get: function get() {
      return this._used;
    },
    set: function set(value) {
      this._used = value;

      if (this._used) {
        this.currentOffset = 0;
        this.sprite.frame = 'used';
      }
    }
  }]);

  return MysteryBlockAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (MysteryBlockAnimator);

/***/ }),

/***/ "./src/components/animators/PiranhaPlantAnimator.js":
/*!**********************************************************!*\
  !*** ./src/components/animators/PiranhaPlantAnimator.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Aim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Aim */ "./src/components/Aim.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var PiranhaPlantAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(PiranhaPlantAnimator, _Component);

  function PiranhaPlantAnimator() {
    _classCallCheck(this, PiranhaPlantAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(PiranhaPlantAnimator).apply(this, arguments));
  }

  _createClass(PiranhaPlantAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.aim = this.requireComponent(_Aim__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      this.sprite.frame = this.aim.direction.y > 0 ? 'down' : 'up';
      this.sprite.flipped = this.aim.direction.x > 0;
    }
  }]);

  return PiranhaPlantAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PiranhaPlantAnimator);

/***/ }),

/***/ "./src/components/animators/ShellAnimator.js":
/*!***************************************************!*\
  !*** ./src/components/animators/ShellAnimator.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ShellAnimator =
/*#__PURE__*/
function (_Component) {
  _inherits(ShellAnimator, _Component);

  function ShellAnimator() {
    _classCallCheck(this, ShellAnimator);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShellAnimator).apply(this, arguments));
  }

  _createClass(ShellAnimator, [{
    key: "start",
    value: function start() {
      this.sprite = this.requireComponent(_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_1__["default"]);
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      var index = Math.floor(this.transform.position.x / 14) % 4;
      if (index < 0) index += 4;
      this.sprite.frame = index;
    }
  }]);

  return ShellAnimator;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ShellAnimator);

/***/ }),

/***/ "./src/components/inputs/DirChangeInput.js":
/*!*************************************************!*\
  !*** ./src/components/inputs/DirChangeInput.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ "./src/components/inputs/Input.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
/* harmony import */ var _Movement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Movement */ "./src/components/Movement.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util */ "./src/util.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var DirChangeInput =
/*#__PURE__*/
function (_Input) {
  _inherits(DirChangeInput, _Input);

  function DirChangeInput(dir) {
    var _this;

    var changeBeforeFall = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, DirChangeInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DirChangeInput).call(this));
    _this.dir = dir || -1;
    _this.changeBeforeFall = changeBeforeFall;
    _this.lastDirChange = new Date();
    return _this;
  }

  _createClass(DirChangeInput, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.transform = this.getComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
      var movement = this.getComponent(_Movement__WEBPACK_IMPORTED_MODULE_2__["default"]);

      if (movement) {
        movement.onHitWall(function () {
          _this2.dir = -_this2.dir;
        });
      }
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      if (!this.changeBeforeFall || !this.transform) return;
      var pointBelow = this.transform.position.plus(new _Vector__WEBPACK_IMPORTED_MODULE_4__["default"](0, 1));

      if (new Date() - this.lastDirChange >= 100 && !Object(_util__WEBPACK_IMPORTED_MODULE_3__["checkPointForCollision"])(pointBelow, ['obstacle', 'block'])) {
        this.lastDirChange = new Date();
        this.dir = -this.dir;
      }
    }
  }, {
    key: "move",
    get: function get() {
      var playerPos = Game.playerTransform.position;
      if (this.transform.position.distanceTo(playerPos) > 512) return 0;
      return this.dir;
    }
  }]);

  return DirChangeInput;
}(_Input__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (DirChangeInput);

/***/ }),

/***/ "./src/components/inputs/Input.js":
/*!****************************************!*\
  !*** ./src/components/inputs/Input.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Input =
/*#__PURE__*/
function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _getPrototypeOf(Input).apply(this, arguments));
  }

  _createClass(Input, [{
    key: "move",
    get: function get() {
      return 0;
    }
  }, {
    key: "jumpDown",
    get: function get() {
      return false;
    }
  }, {
    key: "jump",
    get: function get() {
      return false;
    }
  }]);

  return Input;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./src/components/inputs/PlayerInput.js":
/*!**********************************************!*\
  !*** ./src/components/inputs/PlayerInput.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Input */ "./src/components/inputs/Input.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! keymaster */ "./node_modules/keymaster/keymaster.js");
/* harmony import */ var keymaster__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(keymaster__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var PlayerInput =
/*#__PURE__*/
function (_Input) {
  _inherits(PlayerInput, _Input);

  function PlayerInput() {
    var _this;

    _classCallCheck(this, PlayerInput);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayerInput).call(this));
    _this._canJump = true;
    _this._shouldJump = false;
    document.addEventListener('keydown', function (e) {
      e.preventDefault();

      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (_this._canJump) {
          _this._canJump = false;
          _this._shouldJump = true;
        }
      }
    });
    document.addEventListener('keyup', function (e) {
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        _this._canJump = true;
      }
    });
    return _this;
  }

  _createClass(PlayerInput, [{
    key: "move",
    get: function get() {
      var move = 0;
      if (keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('A') || keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('left')) move -= 1;
      if (keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('D') || keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('right')) move += 1;
      return move;
    }
  }, {
    key: "jumpDown",
    get: function get() {
      if (this._shouldJump) {
        this._shouldJump = false;
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "jump",
    get: function get() {
      return keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('space') || keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('W') || keymaster__WEBPACK_IMPORTED_MODULE_1___default.a.isPressed('up');
    }
  }]);

  return PlayerInput;
}(_Input__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (PlayerInput);

/***/ }),

/***/ "./src/components/items/Item.js":
/*!**************************************!*\
  !*** ./src/components/items/Item.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
  }

  _createClass(Item, [{
    key: "pickUp",
    value: function pickUp(pickedUpBy) {}
  }]);

  return Item;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Item);

/***/ }),

/***/ "./src/components/items/Mushroom.js":
/*!******************************************!*\
  !*** ./src/components/items/Mushroom.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Item */ "./src/components/items/Item.js");
/* harmony import */ var _PowerManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PowerManager */ "./src/components/PowerManager.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Mushroom =
/*#__PURE__*/
function (_Item) {
  _inherits(Mushroom, _Item);

  function Mushroom() {
    _classCallCheck(this, Mushroom);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mushroom).apply(this, arguments));
  }

  _createClass(Mushroom, [{
    key: "pickUp",
    value: function pickUp(pickedUpBy) {
      var powerManager = pickedUpBy.getComponent(_PowerManager__WEBPACK_IMPORTED_MODULE_1__["default"]);
      if (powerManager) powerManager.mushroom();
      this.gameObject.destroy();
    }
  }]);

  return Mushroom;
}(_Item__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Mushroom);

/***/ }),

/***/ "./src/components/renderers/ImageRenderer.js":
/*!***************************************************!*\
  !*** ./src/components/renderers/ImageRenderer.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Renderer */ "./src/components/renderers/Renderer.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var ImageRenderer =
/*#__PURE__*/
function (_Renderer) {
  _inherits(ImageRenderer, _Renderer);

  function ImageRenderer(image, position, size) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, ImageRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageRenderer).call(this, options));
    _this.image = image;
    _this.position = position;
    _this.size = size;
    return _this;
  }

  _createClass(ImageRenderer, [{
    key: "draw",
    value: function draw(ctx) {
      this.drawImage(ctx, this.image, this.position, this.size);
    }
  }]);

  return ImageRenderer;
}(_Renderer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (ImageRenderer);

/***/ }),

/***/ "./src/components/renderers/Renderer.js":
/*!**********************************************!*\
  !*** ./src/components/renderers/Renderer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Component */ "./src/components/Component.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Vector */ "./src/Vector.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }





var Renderer =
/*#__PURE__*/
function (_Component) {
  _inherits(Renderer, _Component);

  function Renderer() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Renderer);

    var offset = options.offset,
        layer = options.layer;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Renderer).call(this));
    _this.visible = true;
    _this.offset = offset || _Vector__WEBPACK_IMPORTED_MODULE_2__["default"].zero;
    _this.layer = layer === undefined ? 1 : layer;
    Renderer.ensureByLayerKey(_this.layer);

    Renderer.byLayer[_this.layer].add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Renderer, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {}
  }, {
    key: "drawImage",
    value: function drawImage(ctx, image, position, size) {
      var offset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Vector__WEBPACK_IMPORTED_MODULE_2__["default"].zero;
      var bottom = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var flipped = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

      var _this$offsetPosition$ = this.offsetPosition().plus(offset),
          x = _this$offsetPosition$.x,
          y = _this$offsetPosition$.y;

      x = Math.floor(x - size.x);
      y = Math.floor(y - size.y * (bottom ? 2 : 1));
      ctx.save();

      if (flipped) {
        ctx.translate(x + size.x * 2, y);
        ctx.scale(-1, 1);
      }

      ctx.beginPath();
      ctx.drawImage(image, position.x, position.y, size.x, size.y, flipped ? 0 : x, flipped ? 0 : y, size.x * 2, size.y * 2);
      ctx.restore();
    }
  }, {
    key: "offsetPosition",
    value: function offsetPosition() {
      return this.transform.position.plus(this.offset);
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      Renderer.byLayer[this.layer].delete(this);
    }
  }], [{
    key: "ensureByLayerKey",
    value: function ensureByLayerKey(key) {
      if (Renderer.byLayer[key] === undefined) Renderer.byLayer[key] = new Set();
    }
  }, {
    key: "all",
    get: function get() {
      var arr = [];
      Object.keys(Renderer.byLayer).sort(function (a, b) {
        return a - b;
      }).forEach(function (layer) {
        Renderer.byLayer[layer].forEach(function (renderer) {
          return arr.push(renderer);
        });
      });
      return arr;
    }
  }]);

  return Renderer;
}(_Component__WEBPACK_IMPORTED_MODULE_0__["default"]);

Renderer.byLayer = {};
/* harmony default export */ __webpack_exports__["default"] = (Renderer);

/***/ }),

/***/ "./src/components/renderers/SpriteRenderer.js":
/*!****************************************************!*\
  !*** ./src/components/renderers/SpriteRenderer.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Renderer */ "./src/components/renderers/Renderer.js");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Transform */ "./src/components/Transform.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var SpriteRenderer =
/*#__PURE__*/
function (_Renderer) {
  _inherits(SpriteRenderer, _Renderer);

  function SpriteRenderer(sprite, frame) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, SpriteRenderer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpriteRenderer).call(this, options));
    _this.sprite = sprite;
    _this.frame = frame === undefined ? Object.keys(sprite.frames)[0] : frame;
    _this.flipped = options.flipped === undefined ? false : options.flipped;
    return _this;
  }

  _createClass(SpriteRenderer, [{
    key: "start",
    value: function start() {
      this.transform = this.requireComponent(_Transform__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      var frame = this.sprite.frames[this.frame];
      if (frame === undefined) return;
      this.drawImage(ctx, this.sprite.image, frame.position, frame.size, frame.offset, true, this.flipped);
    }
  }]);

  return SpriteRenderer;
}(_Renderer__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (SpriteRenderer);

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.js");
/* harmony import */ var _maps_level1_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maps/level1.json */ "./src/maps/level1.json");
var _maps_level1_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./maps/level1.json */ "./src/maps/level1.json", 1);
/* harmony import */ var _game_objects_loadTilemap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-objects/loadTilemap */ "./src/game-objects/loadTilemap.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./files */ "./src/files.js");




document.addEventListener('DOMContentLoaded', function () {
  var played = false;
  var muteEl = document.getElementById('mute');
  muteEl.addEventListener('click', function (e) {
    e.preventDefault();

    if (!played) {
      _files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].currentTime = 0;
      _files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].play();
      played = true;
      _Game__WEBPACK_IMPORTED_MODULE_0__["default"].muted = false;
    } else {
      _files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].muted = !_files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].muted;
      _Game__WEBPACK_IMPORTED_MODULE_0__["default"].muted = _files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].muted;
    }

    e.currentTarget.innerText = _files__WEBPACK_IMPORTED_MODULE_3__["level1Music"].muted ? 'Unmute' : 'Mute';
  });
  document.getElementById('play').addEventListener('click', function (e) {
    e.preventDefault();
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].init(document.getElementById('canvas').getContext('2d'));
    Object(_game_objects_loadTilemap__WEBPACK_IMPORTED_MODULE_2__["default"])(_maps_level1_json__WEBPACK_IMPORTED_MODULE_1__);
    e.currentTarget.parentElement.removeChild(e.currentTarget);
    muteEl.classList.remove('hidden');
  });
});

/***/ }),

/***/ "./src/files.js":
/*!**********************!*\
  !*** ./src/files.js ***!
  \**********************/
/*! exports provided: level1Music, bump, coin, gameOver, jumpSound, kick, mushroomSound, powerDown, powerUp, stompSound, skid, stageImage, enemiesImage, marioImage, npcsAndItemsImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "level1Music", function() { return level1Music; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bump", function() { return bump; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coin", function() { return coin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gameOver", function() { return gameOver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jumpSound", function() { return jumpSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kick", function() { return kick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mushroomSound", function() { return mushroomSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "powerDown", function() { return powerDown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "powerUp", function() { return powerUp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stompSound", function() { return stompSound; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skid", function() { return skid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stageImage", function() { return stageImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enemiesImage", function() { return enemiesImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "marioImage", function() { return marioImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "npcsAndItemsImage", function() { return npcsAndItemsImage; });
/* harmony import */ var _audio_level1_music_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio/level1-music.mp3 */ "./src/audio/level1-music.mp3");
/* harmony import */ var _audio_level1_music_mp3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_audio_level1_music_mp3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _audio_bump_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio/bump.mp3 */ "./src/audio/bump.mp3");
/* harmony import */ var _audio_bump_mp3__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_audio_bump_mp3__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _audio_coin_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio/coin.mp3 */ "./src/audio/coin.mp3");
/* harmony import */ var _audio_coin_mp3__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_audio_coin_mp3__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _audio_game_over_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./audio/game-over.mp3 */ "./src/audio/game-over.mp3");
/* harmony import */ var _audio_game_over_mp3__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_audio_game_over_mp3__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _audio_jump_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./audio/jump.mp3 */ "./src/audio/jump.mp3");
/* harmony import */ var _audio_jump_mp3__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_audio_jump_mp3__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _audio_kick_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./audio/kick.mp3 */ "./src/audio/kick.mp3");
/* harmony import */ var _audio_kick_mp3__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_audio_kick_mp3__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _audio_mushroom_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./audio/mushroom.mp3 */ "./src/audio/mushroom.mp3");
/* harmony import */ var _audio_mushroom_mp3__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_audio_mushroom_mp3__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _audio_power_down_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./audio/power-down.mp3 */ "./src/audio/power-down.mp3");
/* harmony import */ var _audio_power_down_mp3__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_audio_power_down_mp3__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _audio_power_up_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./audio/power-up.mp3 */ "./src/audio/power-up.mp3");
/* harmony import */ var _audio_power_up_mp3__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_audio_power_up_mp3__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _audio_stomp_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./audio/stomp.mp3 */ "./src/audio/stomp.mp3");
/* harmony import */ var _audio_stomp_mp3__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_audio_stomp_mp3__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _audio_skid_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./audio/skid.mp3 */ "./src/audio/skid.mp3");
/* harmony import */ var _audio_skid_mp3__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_audio_skid_mp3__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _images_stage_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/stage.png */ "./src/images/stage.png");
/* harmony import */ var _images_stage_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_stage_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _images_enemies_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/enemies.png */ "./src/images/enemies.png");
/* harmony import */ var _images_enemies_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_enemies_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _images_mario_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/mario.png */ "./src/images/mario.png");
/* harmony import */ var _images_mario_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_mario_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _images_npcs_and_items_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/npcs-and-items.png */ "./src/images/npcs-and-items.png");
/* harmony import */ var _images_npcs_and_items_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_images_npcs_and_items_png__WEBPACK_IMPORTED_MODULE_14__);















var level1Music = new Audio(_audio_level1_music_mp3__WEBPACK_IMPORTED_MODULE_0___default.a);
var bump = new Audio(_audio_bump_mp3__WEBPACK_IMPORTED_MODULE_1___default.a);
var coin = new Audio(_audio_coin_mp3__WEBPACK_IMPORTED_MODULE_2___default.a);
var gameOver = new Audio(_audio_game_over_mp3__WEBPACK_IMPORTED_MODULE_3___default.a);
var jumpSound = new Audio(_audio_jump_mp3__WEBPACK_IMPORTED_MODULE_4___default.a);
var kick = new Audio(_audio_kick_mp3__WEBPACK_IMPORTED_MODULE_5___default.a);
var mushroomSound = new Audio(_audio_mushroom_mp3__WEBPACK_IMPORTED_MODULE_6___default.a);
var powerDown = new Audio(_audio_power_down_mp3__WEBPACK_IMPORTED_MODULE_7___default.a);
var powerUp = new Audio(_audio_power_up_mp3__WEBPACK_IMPORTED_MODULE_8___default.a);
var stompSound = new Audio(_audio_stomp_mp3__WEBPACK_IMPORTED_MODULE_9___default.a);
var skid = new Audio(_audio_skid_mp3__WEBPACK_IMPORTED_MODULE_10___default.a);
var stageImage = new Image();
stageImage.src = _images_stage_png__WEBPACK_IMPORTED_MODULE_11___default.a;
var enemiesImage = new Image();
enemiesImage.src = _images_enemies_png__WEBPACK_IMPORTED_MODULE_12___default.a;
var marioImage = new Image();
marioImage.src = _images_mario_png__WEBPACK_IMPORTED_MODULE_13___default.a;
var npcsAndItemsImage = new Image();
npcsAndItemsImage.src = _images_npcs_and_items_png__WEBPACK_IMPORTED_MODULE_14___default.a;

/***/ }),

/***/ "./src/game-objects/GameObject.js":
/*!****************************************!*\
  !*** ./src/game-objects/GameObject.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var GameObject =
/*#__PURE__*/
function () {
  function GameObject() {
    _classCallCheck(this, GameObject);

    this.components = [];
    _Game__WEBPACK_IMPORTED_MODULE_0__["default"].add(this);
  }

  _createClass(GameObject, [{
    key: "addComponent",
    value: function addComponent(component) {
      this.components.push(component);
      component.gameObject = this;
    }
  }, {
    key: "getComponent",
    value: function getComponent(componentClass) {
      return this.components.find(function (component) {
        return component instanceof componentClass;
      });
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component) {
      for (var i = 0; i < this.components.length; i++) {
        if (this.components[i] === component) {
          this.components.splice(i, 1);
          return;
        }
      }
    }
  }, {
    key: "update",
    value: function update() {
      this.components.forEach(function (component) {
        return component.update();
      });
    }
  }, {
    key: "lateUpdate",
    value: function lateUpdate() {
      this.components.forEach(function (component) {
        return component.lateUpdate();
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.components.forEach(function (component) {
        return component.onDestroy();
      });
      _Game__WEBPACK_IMPORTED_MODULE_0__["default"].destroy(this);
    }
  }]);

  return GameObject;
}();

/* harmony default export */ __webpack_exports__["default"] = (GameObject);

/***/ }),

/***/ "./src/game-objects/createBoxCoin.js":
/*!*******************************************!*\
  !*** ./src/game-objects/createBoxCoin.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_boxCoinSprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sprites/boxCoinSprite */ "./src/sprites/boxCoinSprite.js");
/* harmony import */ var _components_animators_BoxCoinAnimator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/animators/BoxCoinAnimator */ "./src/components/animators/BoxCoinAnimator.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../files */ "./src/files.js");










var createBoxCoin = function createBoxCoin(position) {
  var boxCoin = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  boxCoin.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_1__["default"](position));
  boxCoin.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_2__["default"](_sprites_boxCoinSprite__WEBPACK_IMPORTED_MODULE_3__["default"]));
  boxCoin.addComponent(new _components_animators_BoxCoinAnimator__WEBPACK_IMPORTED_MODULE_4__["default"]());
  boxCoin.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_5__["default"]({
    velocity: new _Vector__WEBPACK_IMPORTED_MODULE_6__["default"](0, -600)
  }));
  _Game__WEBPACK_IMPORTED_MODULE_7__["default"].coins += 1;

  if (!_Game__WEBPACK_IMPORTED_MODULE_7__["default"].muted) {
    _files__WEBPACK_IMPORTED_MODULE_8__["coin"].currentTime = 0;
    _files__WEBPACK_IMPORTED_MODULE_8__["coin"].play();
  }
};

/* harmony default export */ __webpack_exports__["default"] = (createBoxCoin);

/***/ }),

/***/ "./src/game-objects/createFireball.js":
/*!********************************************!*\
  !*** ./src/game-objects/createFireball.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_fireballSprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sprites/fireballSprite */ "./src/sprites/fireballSprite.js");
/* harmony import */ var _components_animators_FireballAnimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/animators/FireballAnimator */ "./src/components/animators/FireballAnimator.js");
/* harmony import */ var _components_Damaging__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Damaging */ "./src/components/Damaging.js");
/* harmony import */ var _components_LinearMovement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/LinearMovement */ "./src/components/LinearMovement.js");










var createFireball = function createFireball(position, velocity) {
  var fireball = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  fireball.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  fireball.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_3__["default"]('hurtbox', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](7, 7).times(2), true));
  fireball.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__["default"](_sprites_fireballSprite__WEBPACK_IMPORTED_MODULE_5__["default"], 0, {
    flipped: velocity.x > 0
  }));
  fireball.addComponent(new _components_animators_FireballAnimator__WEBPACK_IMPORTED_MODULE_6__["default"]());
  fireball.addComponent(new _components_Damaging__WEBPACK_IMPORTED_MODULE_7__["default"]());
  fireball.addComponent(new _components_LinearMovement__WEBPACK_IMPORTED_MODULE_8__["default"](velocity));
  setTimeout(function () {
    return fireball.destroy();
  }, 10000);
};

/* harmony default export */ __webpack_exports__["default"] = (createFireball);

/***/ }),

/***/ "./src/game-objects/createGoomba.js":
/*!******************************************!*\
  !*** ./src/game-objects/createGoomba.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/inputs/DirChangeInput */ "./src/components/inputs/DirChangeInput.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_goombaSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sprites/goombaSprite */ "./src/sprites/goombaSprite.js");
/* harmony import */ var _components_animators_GoombaAnimator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/animators/GoombaAnimator */ "./src/components/animators/GoombaAnimator.js");
/* harmony import */ var _components_GoombaDeath__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/GoombaDeath */ "./src/components/GoombaDeath.js");
/* harmony import */ var _components_Damageable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Damageable */ "./src/components/Damageable.js");












var createGoomba = function createGoomba(position) {
  var goomba = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  goomba.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  goomba.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]({
    speed: 50,
    blocking: ['obstacle', 'block', 'enemy']
  }));
  goomba.addComponent(new _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__["default"]());
  goomba.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_5__["default"]('enemy', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 15).times(2), true));
  goomba.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__["default"](_sprites_goombaSprite__WEBPACK_IMPORTED_MODULE_7__["default"], 'walk1', {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  goomba.addComponent(new _components_animators_GoombaAnimator__WEBPACK_IMPORTED_MODULE_8__["default"]());
  goomba.addComponent(new _components_GoombaDeath__WEBPACK_IMPORTED_MODULE_9__["default"]());
  goomba.addComponent(new _components_Damageable__WEBPACK_IMPORTED_MODULE_10__["default"]());
};

/* harmony default export */ __webpack_exports__["default"] = (createGoomba);

/***/ }),

/***/ "./src/game-objects/createKoopa.js":
/*!*****************************************!*\
  !*** ./src/game-objects/createKoopa.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/inputs/DirChangeInput */ "./src/components/inputs/DirChangeInput.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_redKoopaSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sprites/redKoopaSprite */ "./src/sprites/redKoopaSprite.js");
/* harmony import */ var _sprites_greenKoopaSprite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sprites/greenKoopaSprite */ "./src/sprites/greenKoopaSprite.js");
/* harmony import */ var _components_animators_KoopaAnimator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/animators/KoopaAnimator */ "./src/components/animators/KoopaAnimator.js");
/* harmony import */ var _components_Health__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Health */ "./src/components/Health.js");
/* harmony import */ var _components_Damageable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _components_KoopaDamageHandler__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../components/KoopaDamageHandler */ "./src/components/KoopaDamageHandler.js");













var sprites = {
  red: _sprites_redKoopaSprite__WEBPACK_IMPORTED_MODULE_7__["default"],
  green: _sprites_greenKoopaSprite__WEBPACK_IMPORTED_MODULE_8__["default"]
};

var createKoopa = function createKoopa(position) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
  var koopa = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  koopa.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  koopa.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]({
    speed: 50,
    blocking: ['obstacle', 'block', 'enemy']
  }));
  koopa.addComponent(new _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__["default"](-1, color === 'red'));
  koopa.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_5__["default"]('enemy', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 16).times(2), true));
  koopa.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__["default"](sprites[color], 'walk1', {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  koopa.addComponent(new _components_animators_KoopaAnimator__WEBPACK_IMPORTED_MODULE_9__["default"]());
  koopa.addComponent(new _components_Health__WEBPACK_IMPORTED_MODULE_10__["default"]());
  koopa.addComponent(new _components_Damageable__WEBPACK_IMPORTED_MODULE_11__["default"]());
  koopa.addComponent(new _components_KoopaDamageHandler__WEBPACK_IMPORTED_MODULE_12__["default"](color));
};

/* harmony default export */ __webpack_exports__["default"] = (createKoopa);

/***/ }),

/***/ "./src/game-objects/createMario.js":
/*!*****************************************!*\
  !*** ./src/game-objects/createMario.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_inputs_PlayerInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/inputs/PlayerInput */ "./src/components/inputs/PlayerInput.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_marioSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sprites/marioSprite */ "./src/sprites/marioSprite.js");
/* harmony import */ var _components_animators_MarioAnimator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/animators/MarioAnimator */ "./src/components/animators/MarioAnimator.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _components_Damageable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _components_PowerManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/PowerManager */ "./src/components/PowerManager.js");













var createMario = function createMario(position) {
  var mario = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  var transform = new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position);
  _Game__WEBPACK_IMPORTED_MODULE_9__["default"].playerTransform = transform;
  mario.addComponent(transform);
  mario.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]({
    accelerate: true,
    airAcceleration: 200
  }));
  mario.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_4__["default"]('player', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](10, 15).times(2), true));
  mario.addComponent(new _components_inputs_PlayerInput__WEBPACK_IMPORTED_MODULE_5__["default"]());
  mario.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__["default"](_sprites_marioSprite__WEBPACK_IMPORTED_MODULE_7__["default"], 'walk0', {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  mario.addComponent(new _components_animators_MarioAnimator__WEBPACK_IMPORTED_MODULE_8__["default"]());
  mario.addComponent(new _components_Damageable__WEBPACK_IMPORTED_MODULE_10__["default"]());
  mario.addComponent(new _components_PowerManager__WEBPACK_IMPORTED_MODULE_11__["default"]());
};

/* harmony default export */ __webpack_exports__["default"] = (createMario);

/***/ }),

/***/ "./src/game-objects/createMovingShell.js":
/*!***********************************************!*\
  !*** ./src/game-objects/createMovingShell.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/inputs/DirChangeInput */ "./src/components/inputs/DirChangeInput.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_redKoopaShellSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sprites/redKoopaShellSprite */ "./src/sprites/redKoopaShellSprite.js");
/* harmony import */ var _sprites_greenKoopaShellSprite__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../sprites/greenKoopaShellSprite */ "./src/sprites/greenKoopaShellSprite.js");
/* harmony import */ var _components_Damageable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _components_animators_ShellAnimator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/animators/ShellAnimator */ "./src/components/animators/ShellAnimator.js");
/* harmony import */ var _components_ShellDamageHandler__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/ShellDamageHandler */ "./src/components/ShellDamageHandler.js");












var sprites = {
  red: _sprites_redKoopaShellSprite__WEBPACK_IMPORTED_MODULE_7__["default"],
  green: _sprites_greenKoopaShellSprite__WEBPACK_IMPORTED_MODULE_8__["default"]
};

var createMovingShell = function createMovingShell(position) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
  var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  var shell = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  shell.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  shell.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]({
    speed: 350,
    blocking: ['obstacle', 'block'],
    isShell: true
  }));
  shell.addComponent(new _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__["default"](dir));
  shell.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_5__["default"]('enemy', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 15).times(2), true));
  shell.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__["default"](sprites[color], 0, {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  shell.addComponent(new _components_Damageable__WEBPACK_IMPORTED_MODULE_9__["default"]());
  shell.addComponent(new _components_animators_ShellAnimator__WEBPACK_IMPORTED_MODULE_10__["default"]());
  shell.addComponent(new _components_ShellDamageHandler__WEBPACK_IMPORTED_MODULE_11__["default"]());
};

/* harmony default export */ __webpack_exports__["default"] = (createMovingShell);

/***/ }),

/***/ "./src/game-objects/createMushroom.js":
/*!********************************************!*\
  !*** ./src/game-objects/createMushroom.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Movement__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Movement */ "./src/components/Movement.js");
/* harmony import */ var _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/inputs/DirChangeInput */ "./src/components/inputs/DirChangeInput.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_mushroomSprite__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../sprites/mushroomSprite */ "./src/sprites/mushroomSprite.js");
/* harmony import */ var _components_items_Mushroom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/items/Mushroom */ "./src/components/items/Mushroom.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Game */ "./src/Game.js");












var createMushroom = function createMushroom(position, dir) {
  dir = dir === undefined ? [-1, 1][Math.floor(Math.random() * 2)] : dir;
  var mushroom = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  mushroom.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  mushroom.addComponent(new _components_Movement__WEBPACK_IMPORTED_MODULE_3__["default"]({
    speed: 75
  }));
  mushroom.addComponent(new _components_inputs_DirChangeInput__WEBPACK_IMPORTED_MODULE_4__["default"](dir));
  mushroom.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_5__["default"]('item', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 16).times(2), true));
  mushroom.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_6__["default"](_sprites_mushroomSprite__WEBPACK_IMPORTED_MODULE_7__["default"], 'main', {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  mushroom.addComponent(new _components_items_Mushroom__WEBPACK_IMPORTED_MODULE_8__["default"]());

  if (!_Game__WEBPACK_IMPORTED_MODULE_10__["default"].muted) {
    _files__WEBPACK_IMPORTED_MODULE_9__["mushroomSound"].currentTime = 0;
    _files__WEBPACK_IMPORTED_MODULE_9__["mushroomSound"].play();
  }
};

/* harmony default export */ __webpack_exports__["default"] = (createMushroom);

/***/ }),

/***/ "./src/game-objects/createMysteryBlock.js":
/*!************************************************!*\
  !*** ./src/game-objects/createMysteryBlock.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_mysteryBlockSprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sprites/mysteryBlockSprite */ "./src/sprites/mysteryBlockSprite.js");
/* harmony import */ var _components_animators_MysteryBlockAnimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/animators/MysteryBlockAnimator */ "./src/components/animators/MysteryBlockAnimator.js");
/* harmony import */ var _components_Damageable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Damageable */ "./src/components/Damageable.js");
/* harmony import */ var _components_MysteryBlockDamageHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/MysteryBlockDamageHandler */ "./src/components/MysteryBlockDamageHandler.js");










var createMysteryBlock = function createMysteryBlock(position, creator) {
  var mysteryBlock = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  mysteryBlock.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  mysteryBlock.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_3__["default"]('block', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 16).times(2), true));
  mysteryBlock.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__["default"](_sprites_mysteryBlockSprite__WEBPACK_IMPORTED_MODULE_5__["default"]));
  mysteryBlock.addComponent(new _components_animators_MysteryBlockAnimator__WEBPACK_IMPORTED_MODULE_6__["default"]());
  mysteryBlock.addComponent(new _components_Damageable__WEBPACK_IMPORTED_MODULE_7__["default"]());
  mysteryBlock.addComponent(new _components_MysteryBlockDamageHandler__WEBPACK_IMPORTED_MODULE_8__["default"](creator));
};

/* harmony default export */ __webpack_exports__["default"] = (createMysteryBlock);

/***/ }),

/***/ "./src/game-objects/createPiranhaPlant.js":
/*!************************************************!*\
  !*** ./src/game-objects/createPiranhaPlant.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_piranhaPlantSprite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sprites/piranhaPlantSprite */ "./src/sprites/piranhaPlantSprite.js");
/* harmony import */ var _components_animators_PiranhaPlantAnimator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/animators/PiranhaPlantAnimator */ "./src/components/animators/PiranhaPlantAnimator.js");
/* harmony import */ var _components_Aim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Aim */ "./src/components/Aim.js");
/* harmony import */ var _components_Shoot__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Shoot */ "./src/components/Shoot.js");
/* harmony import */ var _components_PipeCover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PipeCover */ "./src/components/PipeCover.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");











var createPiranhaPlant = function createPiranhaPlant(position) {
  var piranhaPlant = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  piranhaPlant.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_1__["default"](position));
  piranhaPlant.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_2__["default"](_sprites_piranhaPlantSprite__WEBPACK_IMPORTED_MODULE_3__["default"], 'down', {
    layer: 0
  }));
  piranhaPlant.addComponent(new _components_animators_PiranhaPlantAnimator__WEBPACK_IMPORTED_MODULE_4__["default"]());
  piranhaPlant.addComponent(new _components_Aim__WEBPACK_IMPORTED_MODULE_5__["default"]());
  piranhaPlant.addComponent(new _components_Shoot__WEBPACK_IMPORTED_MODULE_6__["default"]());
  piranhaPlant.addComponent(new _components_PipeCover__WEBPACK_IMPORTED_MODULE_7__["default"]());
  piranhaPlant.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_8__["default"]('enemy', new _Vector__WEBPACK_IMPORTED_MODULE_9__["default"](32, 64), true));
};

/* harmony default export */ __webpack_exports__["default"] = (createPiranhaPlant);

/***/ }),

/***/ "./src/game-objects/createStaticShell.js":
/*!***********************************************!*\
  !*** ./src/game-objects/createStaticShell.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/renderers/SpriteRenderer */ "./src/components/renderers/SpriteRenderer.js");
/* harmony import */ var _sprites_redKoopaShellSprite__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../sprites/redKoopaShellSprite */ "./src/sprites/redKoopaShellSprite.js");
/* harmony import */ var _sprites_greenKoopaShellSprite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../sprites/greenKoopaShellSprite */ "./src/sprites/greenKoopaShellSprite.js");
/* harmony import */ var _components_Kickable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Kickable */ "./src/components/Kickable.js");
/* harmony import */ var _components_ShellKickHandler__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/ShellKickHandler */ "./src/components/ShellKickHandler.js");









var sprites = {
  red: _sprites_redKoopaShellSprite__WEBPACK_IMPORTED_MODULE_5__["default"],
  green: _sprites_greenKoopaShellSprite__WEBPACK_IMPORTED_MODULE_6__["default"]
};

var createStaticShell = function createStaticShell(position) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'green';
  var shell = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
  shell.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_2__["default"](position));
  shell.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_3__["default"]('kickable', new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 15).times(2), true));
  shell.addComponent(new _components_renderers_SpriteRenderer__WEBPACK_IMPORTED_MODULE_4__["default"](sprites[color], 0, {
    offset: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](0, 2)
  }));
  shell.addComponent(new _components_Kickable__WEBPACK_IMPORTED_MODULE_7__["default"]());
  shell.addComponent(new _components_ShellKickHandler__WEBPACK_IMPORTED_MODULE_8__["default"](color));
};

/* harmony default export */ __webpack_exports__["default"] = (createStaticShell);

/***/ }),

/***/ "./src/game-objects/loadTilemap.js":
/*!*****************************************!*\
  !*** ./src/game-objects/loadTilemap.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GameObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GameObject */ "./src/game-objects/GameObject.js");
/* harmony import */ var _components_renderers_ImageRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/renderers/ImageRenderer */ "./src/components/renderers/ImageRenderer.js");
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Collider */ "./src/components/Collider.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _components_Transform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Transform */ "./src/components/Transform.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Game */ "./src/Game.js");
/* harmony import */ var _createMario__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./createMario */ "./src/game-objects/createMario.js");
/* harmony import */ var _createGoomba__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./createGoomba */ "./src/game-objects/createGoomba.js");
/* harmony import */ var _createMysteryBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createMysteryBlock */ "./src/game-objects/createMysteryBlock.js");
/* harmony import */ var _tilesets_stage_json__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tilesets/stage.json */ "./src/tilesets/stage.json");
var _tilesets_stage_json__WEBPACK_IMPORTED_MODULE_10___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../tilesets/stage.json */ "./src/tilesets/stage.json", 1);
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _createBoxCoin__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./createBoxCoin */ "./src/game-objects/createBoxCoin.js");
/* harmony import */ var _createMushroom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./createMushroom */ "./src/game-objects/createMushroom.js");
/* harmony import */ var _createPiranhaPlant__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./createPiranhaPlant */ "./src/game-objects/createPiranhaPlant.js");
/* harmony import */ var _createKoopa__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./createKoopa */ "./src/game-objects/createKoopa.js");
















var tilesetsByFileName = {
  'stage': _tilesets_stage_json__WEBPACK_IMPORTED_MODULE_10__
};
var imagesByFileName = {
  'stage': _files__WEBPACK_IMPORTED_MODULE_11__["stageImage"]
};

var loadTilemap = function loadTilemap(tilemap) {
  _Game__WEBPACK_IMPORTED_MODULE_6__["default"].mapSize = new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](tilemap.width * tilemap.tilewidth * 2, tilemap.height * tilemap.tileheight * 2);
  tilemap.layers.forEach(function (layer) {
    if (layer.type === 'tilelayer') {
      loadTileLayer(layer, tilemap);
    }

    if (layer.type === 'objectgroup') {
      loadObjectLayer(layer, tilemap.tilesets);
    }
  });
};

var loadTileLayer = function loadTileLayer(layer, tilemap) {
  layer.data.forEach(function (gid, idx) {
    if (gid === 0) return;
    var row = Math.floor(idx / layer.width);
    var col = idx % layer.width;
    var worldPosition = new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](col * tilemap.tilewidth * 2 + tilemap.tilewidth, row * tilemap.tileheight * 2 + tilemap.tilewidth);
    var tile = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
    tile.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_5__["default"](worldPosition));

    var _getImageData = getImageData(gid, tilemap.tilesets),
        image = _getImageData.image,
        position = _getImageData.position,
        size = _getImageData.size;

    tile.addComponent(new _components_renderers_ImageRenderer__WEBPACK_IMPORTED_MODULE_1__["default"](image, position, size));
  });
};

var loadObjectLayer = function loadObjectLayer(layer, tilesets) {
  if (layer.name === 'Collision') {
    layer.objects.forEach(function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          type = _ref.type;
      var obstacle = new _GameObject__WEBPACK_IMPORTED_MODULE_0__["default"]();
      obstacle.addComponent(new _components_Transform__WEBPACK_IMPORTED_MODULE_5__["default"](new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](x * 2 + width, y * 2 + height)));
      var oneDirection = type === 'onedirection';
      obstacle.addComponent(new _components_Collider__WEBPACK_IMPORTED_MODULE_2__["default"]('obstacle', new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](width * 2, height * 2), false, oneDirection));
    });
  } else if (layer.name === 'Spawn') {
    layer.objects.forEach(function (object) {
      return spawn(object, tilesets);
    });
  }
};

var spawn = function spawn(object, tilesets) {
  var position = new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](object.x * 2 + object.width, object.y * 2);

  switch (getObjectType(object, tilesets)) {
    case 'mario':
      Object(_createMario__WEBPACK_IMPORTED_MODULE_7__["default"])(position);
      break;

    case 'goomba':
      Object(_createGoomba__WEBPACK_IMPORTED_MODULE_8__["default"])(position);
      break;

    case 'mysteryblock':
      mysteryBlockFromTiledObject(object);
      break;

    case 'piranhaplant':
      Object(_createPiranhaPlant__WEBPACK_IMPORTED_MODULE_14__["default"])(position);
      break;

    case 'redkoopa':
      Object(_createKoopa__WEBPACK_IMPORTED_MODULE_15__["default"])(position, 'red');
      break;

    case 'greenkoopa':
      Object(_createKoopa__WEBPACK_IMPORTED_MODULE_15__["default"])(position, 'green');
      break;
  }
};

var mysteryBlockFromTiledObject = function mysteryBlockFromTiledObject(object) {
  var position = new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](object.x * 2 + object.width, object.y * 2);

  switch (object.name) {
    case 'mushroom':
      Object(_createMysteryBlock__WEBPACK_IMPORTED_MODULE_9__["default"])(position, _createMushroom__WEBPACK_IMPORTED_MODULE_13__["default"]);
      break;

    default:
      Object(_createMysteryBlock__WEBPACK_IMPORTED_MODULE_9__["default"])(position, _createBoxCoin__WEBPACK_IMPORTED_MODULE_12__["default"]);
  }
};

var getImageData = function getImageData(gid, tilesets) {
  var tilesetData = getTilesetData(gid, tilesets);
  var tileset = getTileset(tilesetData);
  var id = gid - tilesetData.firstgid;
  var image = imagesByFileName[Object(_util__WEBPACK_IMPORTED_MODULE_4__["extractFileName"])(tileset.image)];
  return {
    image: image,
    position: getTilePosition(id, tileset),
    size: new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](tileset.tilewidth, tileset.tileheight)
  };
};

var getTilePosition = function getTilePosition(id, tileset) {
  var row = Math.floor(id / tileset.columns);
  var col = id % tileset.columns;
  return new _Vector__WEBPACK_IMPORTED_MODULE_3__["default"](col * tileset.tilewidth + tileset.margin + col * tileset.spacing, row * tileset.tileheight + tileset.margin + row * tileset.spacing);
};

var getTilesetData = function getTilesetData(gid, tilesets) {
  for (var i = 0; i < tilesets.length; i++) {
    var gidInTileset = gid >= tilesets[i].firstgid && (!tilesets[i + 1] || gid < tilesets[i + 1].firstgid);
    if (gidInTileset) return tilesets[i];
  }
};

var getTileset = function getTileset(tilesetData) {
  var fileName = Object(_util__WEBPACK_IMPORTED_MODULE_4__["extractFileName"])(tilesetData.source);
  return tilesetsByFileName[fileName];
};

var getObjectType = function getObjectType(object, tilesets) {
  if (!object.type && object.gid) {
    var tilesetData = getTilesetData(object.gid, tilesets);
    var tileset = getTileset(tilesetData);
    var id = object.gid - tilesetData.firstgid;
    var tiles = tileset.tiles;

    for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].id === id) return tiles[i].type;
    }
  } else {
    return object.type;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (loadTilemap);

/***/ }),

/***/ "./src/images/enemies.png":
/*!********************************!*\
  !*** ./src/images/enemies.png ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/ed22850787411a92d719f203c0a340c4-enemies.png";

/***/ }),

/***/ "./src/images/mario.png":
/*!******************************!*\
  !*** ./src/images/mario.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/9031f142f7c34848398aa09f124becbe-mario.png";

/***/ }),

/***/ "./src/images/npcs-and-items.png":
/*!***************************************!*\
  !*** ./src/images/npcs-and-items.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/6431c34bec693bb25b3dc1419daae2d0-npcs-and-items.png";

/***/ }),

/***/ "./src/images/stage.png":
/*!******************************!*\
  !*** ./src/images/stage.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "files/f6052e3ecf7e05c1ee1b0d8bffd1f2df-stage.png";

/***/ }),

/***/ "./src/maps/level1.json":
/*!******************************!*\
  !*** ./src/maps/level1.json ***!
  \******************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

module.exports = {"height":27,"infinite":false,"layers":[{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,44,45,0,0,0,0,0,0,0,0,0,117,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,44,44,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,869,870,871,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,118,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,118,118,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,943,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,872,873,873,874,1099,0,0,0,0,0,0,0,0,43,44,44,44,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,943,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,946,947,947,948,1173,0,0,0,0,0,0,0,0,117,118,118,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,650,651,651,651,651,651,652,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,943,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,650,651,652,0,0,0,0,0,0,0,0,0,647,648,648,649,947,947,948,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1351,1352,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,724,725,725,725,725,725,726,0,0,0,0,134,134,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,943,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1351,1352,0,0,0,0,0,0,0,0,0,0,0,0,0,724,725,726,0,0,0,0,0,0,0,0,0,721,722,722,723,947,947,948,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1351,1352,1351,1500,1426,1351,1352,0,1351,1352,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,647,648,648,648,648,648,649,725,726,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,943,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1351,1500,1426,1351,1352,1351,1352,0,0,0,0,0,0,0,647,648,649,725,726,0,0,153,154,0,869,870,870,870,871,722,722,723,947,947,948,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1425,1499,1500,1499,1500,1427,1426,0,1425,1499,1352,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,721,722,722,722,722,722,723,725,726,0,0,0,0,0,0,0,0,0,0,134,0,0,0,134,0,0,0,0,0,0,0,0,0,0,0,153,154,0,1351,1352,0,0,0,134,134,134,134,0,0,0,0,0,0,647,648,649,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1425,1499,1500,1427,1426,1425,1499,1352,0,0,0,0,0,0,721,722,723,725,726,0,0,227,228,0,943,944,944,944,945,722,722,869,870,870,870,870,871,1099,0,0,0,1429,1429,1429,1429,1429,1429,0,0,0,1351,1500,1427,1427,1427,1427,1427,1426,1351,1500,1427,1426,0,0,1429,1429,0,0,0,0,0,0,0,0,0,0,0,0,869,870,870,870,870,870,871,722,723,725,726,0,0,0,0,0,0,0,0,0,134,134,0,0,0,134,134,0,0,0,0,0,0,153,154,0,0,227,228,0,1425,1499,1352,0,134,134,134,134,134,0,0,0,134,0,0,721,722,723,944,945,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1425,1427,1427,1427,1499,1500,1427,1426,0,1429,1429,1429,0,0,795,796,797,799,800,0,0,227,228,0,1017,1018,1018,1018,1019,796,796,1017,1018,1018,1018,1018,1019,1173,693,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,695,0,0,0,0,0,0,1429,1429,1429,0,0,1017,1018,1018,1018,1018,1018,1019,796,797,799,800,0,0,0,0,0,0,0,0,134,134,134,0,0,0,134,134,134,0,1429,1429,1429,0,227,228,0,0,227,228,1351,1500,1427,1426,134,134,134,134,134,134,134,0,0,134,134,0,795,796,797,1018,1019,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,767,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,768,769,0,0,0,0,693,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,695,0,0,693,694,694,694,695,0,0,0,693,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,695,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"height":27,"id":9,"name":"Tile Layer 1","opacity":1,"type":"tilelayer","visible":true,"width":176,"x":0,"y":0},{"data":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,153,154,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,43,44,45,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,227,228,0,0,0,0,0,0,0,0,0,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,117,118,119,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,227,228,0,0,43,44,45,0,0,1351,1352,0,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,134,134,0,0,117,118,119,0,0,1425,1499,1352,0,0,412,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,1425,1427,1426,0,0,412,190,190,190,190,190,190,339,340,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,1351,1500,1427,1426,0,0,412,190,190,190,190,190,190,413,414,190,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,1351,1500,1427,1427,1426,0,0,412,190,190,190,190,190,190,413,339,340,190,190,190,190,190,190,190,190,190,190,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,1173,0,0,0,0,0,0,0,0,0,1099,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,1173,0,134,134,0,0,0,0,0,1425,1427,1427,1427,1426,0,0,412,190,190,190,190,190,190,413,190,414,190,190,190,190,190,190,190,190,339,340,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1099,0,1173,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,227,228,0,0,153,154,0,1425,1427,1427,1427,1499,1352,0,412,190,190,190,190,190,190,413,190,339,340,190,190,190,190,190,190,190,413,414,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,0,0,0,0,0,0,0,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,1173,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1173,0,1173,0,227,228,0,0,227,228,0,1425,1427,1427,1427,1427,1426,0,412,190,190,190,190,190,339,340,190,190,414,190,190,190,190,190,190,339,340,414,190,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,693,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694,694],"height":27,"id":10,"name":"Tile Layer 2","opacity":1,"type":"tilelayer","visible":true,"width":176,"x":0,"y":0},{"draworder":"topdown","id":8,"name":"Collision","objects":[{"height":16,"id":2,"name":"","rotation":0,"type":"","visible":true,"width":624,"x":0,"y":416},{"height":16,"id":5,"name":"","rotation":0,"type":"onedirection","visible":true,"width":48,"x":240,"y":368},{"height":16,"id":6,"name":"","rotation":0,"type":"onedirection","visible":true,"width":48,"x":272,"y":336},{"height":16,"id":14,"name":"","rotation":0,"type":"onedirection","visible":true,"width":80,"x":400,"y":368},{"height":16,"id":15,"name":"","rotation":0,"type":"onedirection","visible":true,"width":64,"x":464,"y":336},{"height":16,"id":16,"name":"","rotation":0,"type":"onedirection","visible":true,"width":64,"x":512,"y":304},{"height":16,"id":17,"name":"","rotation":0,"type":"onedirection","visible":true,"width":96,"x":512,"y":384},{"height":48,"id":19,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":352,"y":368},{"height":32,"id":23,"name":"","rotation":0,"type":"","visible":true,"width":464,"x":624,"y":400},{"height":16,"id":71,"name":"","rotation":0,"type":"","visible":true,"width":352,"x":1152,"y":416},{"height":16,"id":72,"name":"","rotation":0,"type":"onedirection","visible":true,"width":112,"x":1264,"y":384},{"height":16,"id":73,"name":"","rotation":0,"type":"onedirection","visible":true,"width":112,"x":1296,"y":352},{"height":16,"id":74,"name":"","rotation":0,"type":"onedirection","visible":true,"width":112,"x":1328,"y":320},{"height":16,"id":75,"name":"","rotation":0,"type":"onedirection","visible":true,"width":48,"x":2144,"y":368},{"height":16,"id":76,"name":"","rotation":0,"type":"onedirection","visible":true,"width":48,"x":2176,"y":272},{"height":16,"id":77,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":1504,"y":336},{"height":32,"id":78,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":1584,"y":384},{"height":16,"id":79,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1600,"y":368},{"height":16,"id":80,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1568,"y":400},{"height":16,"id":81,"name":"","rotation":0,"type":"","visible":true,"width":80,"x":1536,"y":416},{"height":32,"id":82,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":1664,"y":384},{"height":16,"id":83,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1664,"y":368},{"height":16,"id":84,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1696,"y":400},{"height":16,"id":85,"name":"","rotation":0,"type":"","visible":true,"width":576,"x":1664,"y":416},{"height":32,"id":86,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":1792,"y":384},{"height":48,"id":87,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":1856,"y":368},{"height":48,"id":88,"name":"","rotation":0,"type":"","visible":true,"width":64,"x":1984,"y":368},{"height":16,"id":89,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":2048,"y":400},{"height":32,"id":90,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1968,"y":384},{"height":16,"id":91,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1952,"y":400},{"height":32,"id":92,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":2096,"y":384},{"height":16,"id":93,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":2112,"y":400},{"height":48,"id":94,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":2256,"y":368},{"height":208,"id":95,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":2256,"y":112},{"height":32,"id":96,"name":"","rotation":0,"type":"","visible":true,"width":32,"x":2320,"y":384},{"height":16,"id":97,"name":"","rotation":0,"type":"","visible":true,"width":560,"x":2256,"y":416}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0},{"draworder":"topdown","id":11,"name":"Spawn","objects":[{"gid":68,"height":16,"id":39,"name":"mushroom","rotation":0,"type":"","visible":true,"width":16,"x":240,"y":320},{"gid":68,"height":16,"id":40,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":224,"y":320},{"gid":68,"height":16,"id":41,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":176,"y":368},{"gid":68,"height":16,"id":42,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":192,"y":368},{"gid":74,"height":16,"id":43,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":24,"y":416},{"gid":148,"height":16,"id":44,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":224,"y":416},{"gid":68,"height":16,"id":48,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":416,"y":336},{"gid":68,"height":16,"id":49,"name":"mushroom","rotation":0,"type":"","visible":true,"width":16,"x":656,"y":400},{"gid":68,"height":16,"id":50,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":704,"y":368},{"gid":222,"height":16,"id":55,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":360,"y":368},{"gid":296,"height":16,"id":65,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":592,"y":384},{"gid":148,"height":16,"id":66,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":608,"y":416},{"gid":68,"height":16,"id":68,"name":"mushroom","rotation":0,"type":"","visible":true,"width":16,"x":1472,"y":384},{"gid":222,"height":16,"id":69,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1800,"y":384},{"gid":222,"height":16,"id":70,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1864,"y":368},{"gid":148,"height":16,"id":98,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1072,"y":400},{"gid":148,"height":16,"id":100,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":992,"y":400},{"gid":148,"height":16,"id":101,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":944,"y":400},{"gid":370,"height":16,"id":102,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1328,"y":320},{"gid":370,"height":16,"id":103,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1376,"y":320},{"gid":370,"height":16,"id":104,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1424,"y":320},{"gid":370,"height":16,"id":105,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":1488,"y":416},{"gid":296,"height":16,"id":106,"name":"","rotation":0,"type":"","visible":true,"width":16,"x":2096,"y":384}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}],"nextlayerid":12,"nextobjectid":107,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.2.0","tileheight":16,"tilesets":[{"firstgid":1,"source":"../tilesets/stage.json"}],"tilewidth":16,"type":"map","version":1.2,"width":176};

/***/ }),

/***/ "./src/sprites/bigMarioSprite.js":
/*!***************************************!*\
  !*** ./src/sprites/bigMarioSprite.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["marioImage"],
  frames: {
    walk0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](214, 243),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    },
    walk1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](255, 243),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    },
    walk2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](295, 244),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    },
    walk3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](255, 243),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    },
    jumpUp: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](335, 244),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 26)
    },
    jumpDown: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](295, 244),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    },
    skid: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](175, 283),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 28)
    }
  }
});

/***/ }),

/***/ "./src/sprites/boxCoinSprite.js":
/*!**************************************!*\
  !*** ./src/sprites/boxCoinSprite.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_0__["npcsAndItemsImage"],
  frames: {
    0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](294, 101),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](8, 14)
    },
    1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](321, 101),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](4, 14)
    },
    2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](310, 101),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](2, 14)
    },
    3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](321, 101),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](4, 14)
    }
  }
});

/***/ }),

/***/ "./src/sprites/fireballSprite.js":
/*!***************************************!*\
  !*** ./src/sprites/fireballSprite.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_0__["enemiesImage"],
  frames: {
    0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](164, 179),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](8, 9)
    },
    1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](180, 179),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](8, 9)
    },
    2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](164, 196),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](8, 9)
    },
    3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](180, 196),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](8, 9)
    }
  }
});

/***/ }),

/***/ "./src/sprites/goombaSprite.js":
/*!*************************************!*\
  !*** ./src/sprites/goombaSprite.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"],
  frames: {
    walk1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    walk2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 0),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    dead: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](32, 7),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 9)
    }
  }
});

/***/ }),

/***/ "./src/sprites/greenKoopaShellSprite.js":
/*!**********************************************!*\
  !*** ./src/sprites/greenKoopaShellSprite.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"],
  frames: {
    0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](32, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](48, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](64, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](80, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    }
  }
});

/***/ }),

/***/ "./src/sprites/greenKoopaSprite.js":
/*!*****************************************!*\
  !*** ./src/sprites/greenKoopaSprite.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"],
  frames: {
    walk1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](0, 51),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 26)
    },
    walk2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 51),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    }
  }
});

/***/ }),

/***/ "./src/sprites/marioSprite.js":
/*!************************************!*\
  !*** ./src/sprites/marioSprite.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["marioImage"],
  frames: {
    walk0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](217, 89),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](12, 15)
    },
    walk1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](256, 89),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    jumpUp: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](335, 89),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    jumpDown: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](335, 89),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    skid: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](176, 129),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](14, 16)
    }
  }
});

/***/ }),

/***/ "./src/sprites/mushroomSprite.js":
/*!***************************************!*\
  !*** ./src/sprites/mushroomSprite.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_0__["npcsAndItemsImage"],
  frames: {
    main: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](156, 121),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 16)
    }
  }
});

/***/ }),

/***/ "./src/sprites/mysteryBlockSprite.js":
/*!*******************************************!*\
  !*** ./src/sprites/mysteryBlockSprite.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["stageImage"],
  frames: {
    0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1140, 1),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1157, 1),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1174, 1),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1191, 1),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    used: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](1208, 1),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    }
  }
});

/***/ }),

/***/ "./src/sprites/piranhaPlantSprite.js":
/*!*******************************************!*\
  !*** ./src/sprites/piranhaPlantSprite.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files */ "./src/files.js");
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_0__["enemiesImage"],
  frames: {
    down: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](128, 144),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 32)
    },
    up: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](160, 144),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_1__["default"](16, 32)
    }
  }
});

/***/ }),

/***/ "./src/sprites/redKoopaShellSprite.js":
/*!********************************************!*\
  !*** ./src/sprites/redKoopaShellSprite.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"],
  frames: {
    0: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](128, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](144, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](160, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    },
    3: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](176, 48),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 16)
    }
  }
});

/***/ }),

/***/ "./src/sprites/redKoopaSprite.js":
/*!***************************************!*\
  !*** ./src/sprites/redKoopaSprite.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Vector */ "./src/Vector.js");
/* harmony import */ var _files__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../files */ "./src/files.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  image: _files__WEBPACK_IMPORTED_MODULE_1__["enemiesImage"],
  frames: {
    walk1: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](96, 51),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 26)
    },
    walk2: {
      position: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](112, 51),
      size: new _Vector__WEBPACK_IMPORTED_MODULE_0__["default"](16, 27)
    }
  }
});

/***/ }),

/***/ "./src/tilesets/stage.json":
/*!*********************************!*\
  !*** ./src/tilesets/stage.json ***!
  \*********************************/
/*! exports provided: columns, image, imageheight, imagewidth, margin, name, spacing, tilecount, tiledversion, tileheight, tiles, tilewidth, transparentcolor, type, version, default */
/***/ (function(module) {

module.exports = {"columns":74,"image":"../images/stage.png","imageheight":358,"imagewidth":1260,"margin":1,"name":"stage","spacing":1,"tilecount":1554,"tiledversion":"1.2.0","tileheight":16,"tiles":[{"id":67,"type":"mysteryblock"},{"id":73,"type":"mario"},{"id":147,"type":"goomba"},{"id":221,"type":"piranhaplant"},{"id":295,"type":"redkoopa"},{"id":369,"type":"greenkoopa"}],"tilewidth":16,"transparentcolor":"#e0a3d8","type":"tileset","version":1.2};

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: minBy, extractFileName, checkPointForCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "minBy", function() { return minBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFileName", function() { return extractFileName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPointForCollision", function() { return checkPointForCollision; });
/* harmony import */ var _components_Collider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Collider */ "./src/components/Collider.js");

var minBy = function minBy(array, func) {
  var min = null;
  array.forEach(function (el) {
    if (min === null || func(el) < func(min)) min = el;
  });
  return min;
};
var extractFileName = function extractFileName(path) {
  return path.match(/.*\/(.+)\.[^.]*$/)[1];
};
var checkPointForCollision = function checkPointForCollision(point, layers) {
  var colliders = _components_Collider__WEBPACK_IMPORTED_MODULE_0__["default"].getColliders(layers);

  for (var i = 0; i < colliders.length; i++) {
    var rect = colliders[i].rect;

    if (point.x < rect.x2 && point.x > rect.x1 && point.y < rect.y2 && point.y > rect.y1) {
      return true;
    }
  }

  return false;
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map