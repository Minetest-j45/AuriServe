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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../common/interface/Page.ts":
/*!*******************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/common/interface/Page.ts ***!
  \*******************************************************************/
/*! exports provided: isElement, isInclude */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInclude", function() { return isInclude; });
function isElement(e) {
  return typeof e === 'object' && 'elem' in e && !('include' in e);
}
function isInclude(e) {
  return typeof e === 'object' && 'include' in e;
}

/***/ }),

/***/ "../../common/util/Format.ts":
/*!****************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/common/util/Format.ts ***!
  \****************************************************************/
/*! exports provided: bytes, vector, date, cleanName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytes", function() { return bytes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vector", function() { return vector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "date", function() { return date; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cleanName", function() { return cleanName; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "../../node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

const tiers = ['B', 'KB', 'MB', 'GB'];
function bytes(bytes) {
  bytes = Math.round(bytes);
  let tier = 0;

  while (bytes > 800 && tier < tiers.length - 1) {
    tier++;
    bytes /= 1024;
  }

  return Math.ceil(bytes) + " " + tiers[tier];
}
function vector(v, suffix) {
  return `${v.x}×${v.y} ${suffix || ""}`;
}
function date(date) {
  let d = new Date(date);
  if (Date.now() - +d < 1000 * 60 * 60 * 24 * 3) return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).fromNow();else if (d.getFullYear() == new Date().getFullYear()) return "on " + moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("MMMM Do");else return "on " + moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format("MMMM Do, YYYY");
}
function cleanName(name, len) {
  //@ts-ignore
  let cleanName = name.substr(0, name.lastIndexOf('.')).replace(/[_-]+/g, ' ').split(' ').map(([firstChar, ...rest]) => firstChar.toUpperCase() + rest.join('').toLowerCase()).join(' ');
  if (len && cleanName.length > len) cleanName = cleanName.substr(0, len);
  return cleanName;
}

/***/ }),

/***/ "../../common/util/ObjectPath.ts":
/*!********************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/common/util/ObjectPath.ts ***!
  \********************************************************************/
/*! exports provided: traversePath, combinePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "traversePath", function() { return traversePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combinePath", function() { return combinePath; });
function descend(seg, object) {
  if (seg.startsWith('[')) {
    if (!seg.endsWith(']')) throw "Improperly formatted path segment: " + seg;
    let inner = seg.substr(1, seg.length - 2);
    if (Number.isNaN(parseInt(inner))) throw "Improperly formatted path segment: " + seg;
    let num = parseInt(inner);
    if (!Array.isArray(object)) throw "Array specifier on non-array object: " + JSON.stringify(object);
    if (object.length <= num) throw "Array value " + num + " is too large for object: " + JSON.stringify(object);
    return object[num];
  }

  if (!object[seg]) throw "Key doesn't exist on object: " + seg;
  return object[seg];
}

function traversePath(path, object) {
  let splitPath = path.replace(/\[/g, '.[').split('.').filter(seg => seg);
  splitPath.forEach(seg => object = descend(seg, object));
  return object;
}
function combinePath(...segs) {
  return segs.filter(seg => seg !== "").reduce((p, c) => p.toString() + (Number.isInteger(c) ? '[' + c.toString() + ']' : '.' + c));
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/extends.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!******************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectWithoutPropertiesLoose; });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./Main.scss":
/*!******************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./Main.scss ***!
  \******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body {\n  margin: 0;\n  position: relative;\n  box-sizing: border-box;\n  font-size: 16px;\n  font-weight: 500;\n  font-family: sans-serif; }\n\n* {\n  box-sizing: inherit;\n  font-weight: inherit;\n  font-family: inherit;\n  color: inherit; }\n\nbutton {\n  cursor: pointer; }\n\ninput, textarea, select, button {\n  font-size: 1em; }\n\ntextarea {\n  resize: vertical; }\n\nbody {\n  background-color: #f0f4f8;\n  color: #243b53;\n  font-family: \"Roboto\", sans-serif; }\n  body.dark {\n    filter: invert(0.9) hue-rotate(180deg) contrast(1.1); }\n\n*::selection {\n  background-color: rgba(159, 179, 200, 0.5); }\n\n.top_gradient {\n  content: \" \";\n  display: block;\n  width: 100%;\n  height: 6px;\n  background: linear-gradient(-90deg, #2cb1bc, #54d1db); }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: \"Alata\", \"Montserrat\", \"Roboto\", sans-serif; }\n", "",{"version":3,"sources":["webpack://partial/_Reset.scss","webpack://Main.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAAA;EACC,SAAS;EACT,kBAAkB;EAElB,sBAAsB;EACtB,eAAe;EACf,gBAAgB;EAChB,uBAAuB,EAAA;;AAGxB;EACC,mBAAmB;EACnB,oBAAoB;EACpB,oBAAoB;EACpB,cAAc,EAAA;;AAGf;EACC,eAAe,EAAA;;AAGhB;EACC,cAAc,EAAA;;AAGf;EACC,gBAAgB,EAAA;;ACvBjB;EACC,yBCJoB;EDKpB,cCGoB;EDFpB,iCAAiC,EAAA;EAHlC;IAME,oDAAoD,EAAA;;AAItD;EACC,0CAAmD,EAAA;;AAGpD;EACC,YAAY;EACZ,cAAc;EACd,WAAW;EACX,WAAW;EAEX,qDAA6D,EAAA;;AAI9D;EACC,wDAAwD,EAAA","sourcesContent":["body {\n\tmargin: 0;\n\tposition: relative; \n\n\tbox-sizing: border-box;\n\tfont-size: 16px;\n\tfont-weight: 500;\n\tfont-family: sans-serif;\n}\n\n* {\n\tbox-sizing: inherit;\n\tfont-weight: inherit;\n\tfont-family: inherit;\n\tcolor: inherit;\n}\n\nbutton {\n\tcursor: pointer;\n}\n\ninput, textarea, select, button {\n\tfont-size: 1em;\n}\n\ntextarea {\n\tresize: vertical;\n}\n","@import \"partial/Reset\";\n@import \"partial/Vars\";\n\nbody {\n\tbackground-color: $neutral-000;\n\tcolor: $neutral-800;\n\tfont-family: \"Roboto\", sans-serif;\n\n\t&.dark {\n\t\tfilter: invert(0.9) hue-rotate(180deg) contrast(1.1);\n\t}\n}\n\n*::selection {\n\tbackground-color: transparentize($neutral-300, 0.5);\n}\n\n.top_gradient {\n\tcontent: \" \";\n\tdisplay: block;\n\twidth: 100%;\n\theight: 6px;\n\n\tbackground: linear-gradient(-90deg, $accent-600, $accent-400);\n\t// background: linear-gradient(-90deg, #0288d1, #47c0cf);\n}\n\nh1, h2, h3, h4, h5, h6 {\n\tfont-family: \"Alata\", \"Montserrat\", \"Roboto\", sans-serif;\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/App.scss":
/*!****************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/App.scss ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".App {\n  min-height: calc(100vh - 6px);\n  position: relative; }\n\n.App-Wrap {\n  animation: App-FadeIn 0.5s 1; }\n\n@keyframes App-FadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n", "",{"version":3,"sources":["webpack://components/App.scss"],"names":[],"mappings":"AAEA;EACC,6BAA6B;EAC7B,kBAAkB,EAAA;;AAGnB;EACC,4BAA+B,EAAA;;AAC/B;EACC;IAAM,UAAU,EAAA;EAChB;IAAI,UAAU,EAAA,EAAA","sourcesContent":["@import \"../partial/Vars\";\n\n.App {\n\tmin-height: calc(100vh - 6px);\n\tposition: relative;\n}\n\n.App-Wrap {\n\tanimation: App-FadeIn $t-slow 1;\n\t@keyframes App-FadeIn {\n\t\tfrom {opacity: 0;}\n\t\tto {opacity: 1;}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/AppHeader.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/AppHeader.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".AppHeader .AppHeader-wrap .AppHeader-logout, .AppHeader .AppHeader-wrap .AppHeader-options {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .AppHeader .AppHeader-wrap .AppHeader-logout::after, .AppHeader .AppHeader-wrap .AppHeader-options::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .AppHeader .AppHeader-wrap .AppHeader-logout:not(:disabled):hover::after, .AppHeader .AppHeader-wrap .AppHeader-options:not(:disabled):hover::after, .AppHeader .AppHeader-wrap .AppHeader-logout:not(:disabled):focus::after, .AppHeader .AppHeader-wrap .AppHeader-options:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .AppHeader .AppHeader-wrap .AppHeader-logout:not(:disabled):active, .AppHeader .AppHeader-wrap .AppHeader-options:not(:disabled):active {\n    transition: border 0.15s; }\n  .AppHeader .AppHeader-wrap .AppHeader-logout:not(:disabled):focus, .AppHeader .AppHeader-wrap .AppHeader-options:not(:disabled):focus {\n    border-color: #829ab1; }\n  .AppHeader .AppHeader-wrap .AppHeader-logout:disabled, .AppHeader .AppHeader-wrap .AppHeader-options:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.AppHeader .AppHeader-wrap .AppHeader-logout, .AppHeader .AppHeader-wrap .AppHeader-options {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .AppHeader .AppHeader-wrap .AppHeader-logout img, .AppHeader .AppHeader-wrap .AppHeader-options img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .AppHeader .AppHeader-wrap .AppHeader-logout span, .AppHeader .AppHeader-wrap .AppHeader-options span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.AppHeader {\n  width: 100%;\n  height: auto;\n  overflow: auto;\n  background-color: #fff;\n  user-select: none; }\n  .AppHeader .AppHeader-wrap {\n    position: relative;\n    display: block;\n    max-width: 1400px;\n    margin: 0 auto;\n    width: 100%;\n    height: 64px;\n    overflow: hidden; }\n    .AppHeader .AppHeader-wrap .AppHeader-nav {\n      display: flex;\n      justify-content: center; }\n      .AppHeader .AppHeader-wrap .AppHeader-nav a {\n        display: inline-block;\n        position: relative;\n        font-family: \"Alata\", \"Roboto\", sans-serif;\n        text-decoration: none;\n        font-size: 20px;\n        padding: 4px 8px;\n        margin: 14px 32px;\n        color: #829ab1;\n        outline: 0;\n        transition: color 0.15s; }\n        .AppHeader .AppHeader-wrap .AppHeader-nav a::after {\n          content: \" \";\n          display: block;\n          position: absolute;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          height: 2px;\n          background: #243b53;\n          opacity: 0;\n          transform: scaleX(0);\n          transition: opacity 0.15s, transform 0.15s; }\n        .AppHeader .AppHeader-wrap .AppHeader-nav a:hover {\n          color: #486581; }\n          .AppHeader .AppHeader-wrap .AppHeader-nav a:hover::after {\n            opacity: 0.5;\n            transform: scaleX(0.8); }\n        .AppHeader .AppHeader-wrap .AppHeader-nav a:focus::after {\n          opacity: 0.5;\n          transform: scaleX(0.8); }\n        .AppHeader .AppHeader-wrap .AppHeader-nav a.active {\n          color: #243b53; }\n          .AppHeader .AppHeader-wrap .AppHeader-nav a.active::after {\n            opacity: 0.9;\n            transform: scaleX(0.85); }\n        .AppHeader .AppHeader-wrap .AppHeader-nav a:active {\n          color: #243b53; }\n          .AppHeader .AppHeader-wrap .AppHeader-nav a:active::after {\n            opacity: 1;\n            transform: scaleX(1); }\n    .AppHeader .AppHeader-wrap .AppHeader-logo {\n      position: absolute;\n      top: 10px;\n      left: 10px;\n      width: 44px;\n      height: 44px;\n      animation: AppHeader-logo-glide 0.5s 1; }\n\n@keyframes AppHeader-logo-glide {\n  from {\n    transform: translate(-20px, 20px);\n    opacity: 0.4; }\n  to {\n    transform: translate(0, 0);\n    opacity: 1; } }\n    .AppHeader .AppHeader-wrap .AppHeader-logout, .AppHeader .AppHeader-wrap .AppHeader-options {\n      position: absolute;\n      top: 8px;\n      right: 8px; }\n    .AppHeader .AppHeader-wrap .AppHeader-options {\n      right: 64px; }\n", "",{"version":3,"sources":["webpack://components/AppHeader.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAEA;EC0EC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDpFlD;ICyFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDtF5C;ICiHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDtF5C;IC0HG,wBCpGW,EAAA;EFtBd;IC8HG,qBC5HkB,EAAA;EFFrB;ICmIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFHrB;EC2IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDjJpB;ICoJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDvJxB;IC2JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD9JnB;EACC,WAAW;EACX,YAAY;EAEZ,cAAc;EACd,sBAAsB;EAEtB,iBAAiB,EAAA;EAPlB;IAUE,kBAAkB;IAClB,cAAc;IAEd,iBEagB;IFZhB,cAAc;IACd,WAAW;IACX,YAAY;IAEZ,gBAAgB,EAAA;IAlBlB;MAqBG,aAAa;MACb,uBAAuB,EAAA;MAtB1B;QAyBI,qBAAqB;QACrB,kBAAkB;QAElB,0CAA0C;QAC1C,qBAAqB;QACrB,eAAe;QACf,gBAAgB;QAChB,iBAAiB;QAEjB,cEhCiB;QFiCjB,UAAU;QAEV,uBEfU,EAAA;QFtBd;UAwCK,YAAY;UACZ,cAAc;UACd,kBAAkB;UAClB,OAAO;UACP,QAAQ;UACR,SAAS;UACT,WAAW;UACX,mBEzCgB;UF2ChB,UAAU;UACV,oBAAoB;UAEpB,0CE9BS,EAAA;QFtBd;UAwDK,cEpDgB,EAAA;UFJrB;YA2DM,YAAY;YACZ,sBAAsB,EAAA;QA5D5B;UAkEM,YAAY;UACZ,sBAAsB,EAAA;QAnE5B;UAwEK,cElEgB,EAAA;UFNrB;YA2EM,YAAY;YACZ,uBAAuB,EAAA;QA5E7B;UAiFK,cE3EgB,EAAA;UFNrB;YAoFM,UAAU;YACV,oBAAoB,EAAA;IArF1B;MA4FG,kBAAkB;MAClB,SAAS;MACT,UAAU;MACV,WAAW;MACX,YAAY;MAEZ,sCAAyC,EAAA;;AACzC;EACC;IAAM,iCAAiC;IAAE,YAAY,EAAA;EACrD;IAAI,0BAA0B;IAAE,UAAU,EAAA,EAAA;IArG9C;MA4GG,kBAAkB;MAClB,QAAQ;MACR,UAAU,EAAA;IA9Gb;MAmHG,WAAW,EAAA","sourcesContent":["@import \"../partial/Ext\";\n\n.AppHeader {\n\twidth: 100%;\n\theight: auto;\n\t\n\toverflow: auto;\n\tbackground-color: #fff;\n\n\tuser-select: none;\n\n\t.AppHeader-wrap {\n\t\tposition: relative;\n\t\tdisplay: block;\n\n\t\tmax-width: $wrap-wide;\n\t\tmargin: 0 auto;\n\t\twidth: 100%;\n\t\theight: 64px;\n\n\t\toverflow: hidden;\n\n\t\t.AppHeader-nav {\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: center;\n\n\t\t\ta {\n\t\t\t\tdisplay: inline-block;\n\t\t\t\tposition: relative;\n\n\t\t\t\tfont-family: \"Alata\", \"Roboto\", sans-serif;\n\t\t\t\ttext-decoration: none;\n\t\t\t\tfont-size: 20px;\n\t\t\t\tpadding: 4px 8px;\n\t\t\t\tmargin: 14px 32px;\n\n\t\t\t\tcolor: $neutral-400;\n\t\t\t\toutline: 0;\n\n\t\t\t\ttransition: color $t-fast;\n\n\t\t\t\t&::after {\n\t\t\t\t\tcontent: \" \";\n\t\t\t\t\tdisplay: block;\n\t\t\t\t\tposition: absolute;\n\t\t\t\t\tleft: 0;\n\t\t\t\t\tright: 0;\n\t\t\t\t\tbottom: 0;\n\t\t\t\t\theight: 2px;\n\t\t\t\t\tbackground: $neutral-800;\n\n\t\t\t\t\topacity: 0;\n\t\t\t\t\ttransform: scaleX(0);\n\n\t\t\t\t\ttransition: opacity $t-fast, transform $t-fast;\n\t\t\t\t}\n\n\t\t\t\t&:hover {\n\t\t\t\t\tcolor: $neutral-600;\n\t\t\t\t\t\n\t\t\t\t\t&::after {\n\t\t\t\t\t\topacity: 0.5;\n\t\t\t\t\t\ttransform: scaleX(0.8);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t&:focus {\n\t\t\t\t\t&::after {\n\t\t\t\t\t\topacity: 0.5;\n\t\t\t\t\t\ttransform: scaleX(0.8);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t&.active {\n\t\t\t\t\tcolor: $neutral-800;\n\t\t\t\t\t\n\t\t\t\t\t&::after {\n\t\t\t\t\t\topacity: 0.9;\n\t\t\t\t\t\ttransform: scaleX(0.85);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t&:active {\n\t\t\t\t\tcolor: $neutral-800;\n\t\t\t\t\t\n\t\t\t\t\t&::after {\n\t\t\t\t\t\topacity: 1;\n\t\t\t\t\t\ttransform: scaleX(1);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t.AppHeader-logo {\n\t\t\tposition: absolute;\n\t\t\ttop: 10px;\n\t\t\tleft: 10px;\n\t\t\twidth: 44px;\n\t\t\theight: 44px;\n\n\t\t\tanimation: AppHeader-logo-glide $t-slow 1;\n\t\t\t@keyframes AppHeader-logo-glide {\n\t\t\t\tfrom {transform: translate(-20px, 20px); opacity: 0.4;}\n\t\t\t\tto {transform: translate(0, 0); opacity: 1;}\n\t\t\t}\n\t\t}\n\n\t\t.AppHeader-logout {\n\t\t\t@extend %material_icon_button;\n\n\t\t\tposition: absolute;\n\t\t\ttop: 8px;\n\t\t\tright: 8px;\n\t\t}\n\n\t\t.AppHeader-options {\n\t\t\t@extend .AppHeader-logout;\n\t\t\tright: 64px;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/CardHeader.scss":
/*!***********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/CardHeader.scss ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".CardHeader {\n  display: grid;\n  grid-template-columns: 68px 1fr;\n  grid-template-rows: 46px 34px;\n  grid-template-areas: \"a b\" \"a c\"; }\n  .CardHeader .CardHeader-Icon {\n    grid-area: a;\n    user-select: none;\n    width: calc(100% - 12px);\n    height: calc(100% - 24px);\n    margin: 12px;\n    margin-left: 0;\n    padding: 10px;\n    border-radius: 50%;\n    pointer-events: none;\n    background-color: #f0f4f8; }\n  .CardHeader .CardHeader-Title {\n    grid-area: b;\n    align-self: end;\n    margin: 0;\n    font-size: 1.6em; }\n  .CardHeader .CardHeader-Description {\n    grid-area: c;\n    margin: 0;\n    font-size: 16px;\n    font-weight: 400;\n    opacity: 0.8; }\n", "",{"version":3,"sources":["webpack://components/CardHeader.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EAGC,aAAa;EACb,+BAAqD;EACrD,6BAA6B;EAC7B,gCAAgC,EAAA;EANjC;IASE,YAAY;IACZ,iBAAiB;IAEjB,wBAAkC;IAClC,yBAAuC;IACvC,YAZgB;IAahB,cAAc;IACd,aAAa;IAEb,kBAAkB;IAClB,oBAAoB;IACpB,yBCvBmB,EAAA;EDGrB;IAyBE,YAAY;IACZ,eAAe;IACf,SAAS;IAET,gBAAgB,EAAA;EA7BlB;IAiCE,YAAY;IACZ,SAAS;IAET,eAAe;IACf,gBAAgB;IAChB,YAAY,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.CardHeader {\n\t$img-size: 80px;\n\t$img-margin: 12px;\n\tdisplay: grid;\n\tgrid-template-columns: #{$img-size - $img-margin} 1fr;\n\tgrid-template-rows: 46px 34px;\n\tgrid-template-areas: \"a b\" \"a c\";\n\n\t.CardHeader-Icon {\n\t\tgrid-area: a;\n\t\tuser-select: none;\n\n\t\twidth: calc(100% - #{$img-margin});\n\t\theight: calc(100% - #{$img-margin * 2});\n\t\tmargin: $img-margin;\n\t\tmargin-left: 0;\n\t\tpadding: 10px;\n\n\t\tborder-radius: 50%;\n\t\tpointer-events: none;\n\t\tbackground-color: $neutral-000;\n\n\t}\n\n\t.CardHeader-Title {\n\t\tgrid-area: b;\n\t\talign-self: end;\n\t\tmargin: 0;\n\n\t\tfont-size: 1.6em;\n\t}\n\n\t.CardHeader-Description {\n\t\tgrid-area: c;\n\t\tmargin: 0;\n\n\t\tfont-size: 16px;\n\t\tfont-weight: 400;\n\t\topacity: 0.8;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/DimensionTransition.sass":
/*!********************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/DimensionTransition.sass ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".DimensionTransition {\n  overflow: hidden; }\n  .DimensionTransition .DimensionTransition-Inner {\n    overflow: auto; }\n", "",{"version":3,"sources":["webpack://components/DimensionTransition.sass"],"names":[],"mappings":"AAAA;EACC,gBAAgB,EAAA;EADjB;IAIE,cAAc,EAAA","sourcesContent":[".DimensionTransition {\n\toverflow: hidden;\n\n\t.DimensionTransition-Inner {\n\t\toverflow: auto; }\n }\t// transition: width 0.3s, height 0.3s\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/LoginForm.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/LoginForm.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@charset \"UTF-8\";\n.LoginForm-Card:not(.loading) {\n  height: min-content;\n  border-radius: 4px;\n  padding: 16px 24px;\n  background-color: #fff;\n  box-shadow: 0px 2px 8px 0px rgba(8, 30, 56, 0.1); }\n\n.LoginForm {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.LoginForm-Warning::before, .LoginForm-Warning::after {\n  content: \"　\"; }\n\n.LoginForm-Card .LoginForm-FormContents input {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.LoginForm-Card .LoginForm-FormContents input {\n  border-color: #d9e2ec;\n  outline: 0; }\n  .LoginForm-Card .LoginForm-FormContents input:hover {\n    border-color: #bcccdc; }\n  .LoginForm-Card .LoginForm-FormContents input:focus {\n    border-color: #829ab1; }\n  .LoginForm-Card .LoginForm-FormContents input::placeholder {\n    font-weight: 400;\n    color: #829ab1; }\n\n.LoginForm-Card .LoginForm-FormContents button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .LoginForm-Card .LoginForm-FormContents button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .LoginForm-Card .LoginForm-FormContents button:not(:disabled):hover::after, .LoginForm-Card .LoginForm-FormContents button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .LoginForm-Card .LoginForm-FormContents button:not(:disabled):active {\n    transition: border 0.15s; }\n  .LoginForm-Card .LoginForm-FormContents button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .LoginForm-Card .LoginForm-FormContents button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.LoginForm {\n  height: calc(100vh - 6px); }\n\n.LoginForm-Card {\n  transition: background-color 0.15s, border-color 0.15s, padding 0.15s; }\n  .LoginForm-Card .LoginForm-FormContents {\n    display: flex;\n    flex-direction: column;\n    max-height: 230px;\n    overflow: hidden;\n    opacity: 1;\n    transition: max-height 0.3s, opacity 0.15s; }\n    .LoginForm-Card .LoginForm-FormContents input {\n      margin-bottom: 8px; }\n    .LoginForm-Card .LoginForm-FormContents button {\n      user-select: none;\n      margin-top: 16px;\n      margin-bottom: 8px; }\n    .LoginForm-Card .LoginForm-FormContents input, .LoginForm-Card .LoginForm-FormContents button {\n      width: 230px;\n      padding: 12px; }\n  .LoginForm-Card .LoginForm-ProfilePlaceholder {\n    display: block;\n    position: relative;\n    width: 70%;\n    height: 0;\n    user-select: none;\n    padding-bottom: 70%;\n    margin: 16px auto 32px auto;\n    border-radius: 50%;\n    background: linear-gradient(45deg, #14919b, #87eaf2);\n    box-shadow: 0px 0px 0px 6px #d9e2ec, 0px 0px 0px 12px #f0f4f8;\n    transition: width 0.3s 0.075s, padding-bottom 0.3s 0.075s, box-shadow 0.3s 0.075s, transform 0.15s, opacity 0.15s; }\n    .LoginForm-Card .LoginForm-ProfilePlaceholder img {\n      position: absolute;\n      padding: 28px;\n      width: 100%;\n      height: auto;\n      transition: opacity 0.15s, transform 0.15s; }\n    .LoginForm-Card .LoginForm-ProfilePlaceholder img.success {\n      opacity: 0;\n      transform: scale(0.7);\n      bottom: 0;\n      left: 0; }\n\n.LoginForm-Card.loading {\n  background-color: transparent;\n  border-color: transparent;\n  padding: 0px 24px; }\n  .LoginForm-Card.loading .LoginForm-ProfilePlaceholder {\n    width: 80%;\n    height: 0;\n    padding-bottom: 80%;\n    margin: 16px auto 32px auto;\n    box-shadow: 0px 0px 0px 6px #bcccdc, 0px 0px 0px 12px #d9e2ec; }\n    .LoginForm-Card.loading .LoginForm-ProfilePlaceholder img.card {\n      opacity: 0;\n      transform: scale(0.7); }\n    .LoginForm-Card.loading .LoginForm-ProfilePlaceholder img.success {\n      bottom: 32px;\n      left: 32px;\n      opacity: 0.8;\n      transform: scale(1);\n      transition: opacity 0.15s 0.15s, transform 0.15s 0.15s, bottom 0.3s 0.3s ease-in, left 0.3s 0.3s ease-in; }\n  .LoginForm-Card.loading .LoginForm-FormContents {\n    max-height: 0;\n    opacity: 0; }\n\n.LoginForm-Card.loaded .LoginForm-ProfilePlaceholder {\n  transform: scale(0.8);\n  opacity: 0; }\n\n.LoginForm-Warning {\n  user-select: none;\n  color: #ef4e4e; }\n", "",{"version":3,"sources":["webpack://components/LoginForm.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAAA,gBAAgB;AAOhB;ECJC,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAElB,sBAAsB;EACtB,gDAA8D,EAAA;;ADN/D;ECiCC,aAAa;EACb,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB,EAAA;;ADwEpB;EClEuB,YAAS,EAAI;;ADvCpC;EC2CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFGrB;ECmDC,qBCzDoB;ED0DpB,UAAU,EAAA;EDpDX;ICuDE,qBC5DmB,EAAA;EFKrB;IC2DE,qBC9DmB,EAAA;EFGrB;IC+DE,gBAAgB;IAChB,cCnEmB,EAAA;;AFGrB;ECqEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;ED/ElD;ICoFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDjF5C;IC4GI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDjF5C;ICqHG,wBCpGW,EAAA;EFjBd;ICyHG,qBC5HkB,EAAA;EFGrB;IC8HE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFHrB;EAEC,yBAAyB,EAAA;;AAG1B;EAGC,qEEca,EAAA;EFjBd;IAME,aAAa;IACb,sBAAsB;IACtB,iBAAiB;IACjB,gBAAgB;IAChB,UAAU;IAEV,0CEKY,EAAA;IFjBd;MAgBG,kBAAkB,EAAA;IAhBrB;MAqBG,iBAAiB;MACjB,gBAAgB;MAChB,kBAAkB,EAAA;IAvBrB;MA2BG,YAAY;MACZ,aAAa,EAAA;EA5BhB;IAiCE,cAAc;IACd,kBAAkB;IAClB,UAAU;IACV,SAAS;IACT,iBAAiB;IACjB,mBAAmB;IACnB,2BAA2B;IAE3B,kBAAkB;IAClB,oDAA4D;IAE5D,6DEnDmB;IFqDnB,iHE7BY,EAAA;IFjBd;MAiDG,kBAAkB;MAClB,aAAa;MACb,WAAW;MACX,YAAY;MAEZ,0CErCW,EAAA;IFjBd;MA0DG,UAAU;MACV,qBAAqB;MACrB,SAAS;MACT,OAAO,EAAA;;AAKV;EACC,6BAA6B;EAC7B,yBAAyB;EACzB,iBAAiB,EAAA;EAHlB;IAME,UAAU;IACV,SAAS;IACT,mBAAmB;IACnB,2BAA2B;IAC3B,6DElFmB,EAAA;IFwErB;MAaG,UAAU;MACV,qBAAqB,EAAA;IAdxB;MAkBG,YAAY;MACZ,UAAU;MACV,YAAY;MACZ,mBAAmB;MACnB,wGAAwH,EAAA;EAtB3H;IA2BE,aAAa;IACb,UAAU,EAAA;;AAIZ;EAEE,qBAAqB;EACrB,UAAU,EAAA;;AAIZ;EAEC,iBAAiB;EACjB,cAAc,EAAA","sourcesContent":["@import \"../partial/Ext\";\n\n.LoginForm {\n\t@extend %center_wrap;\n\theight: calc(100vh - 6px);\n}\n\n.LoginForm-Card {\n\t&:not(.loading) { @extend %card; }\n\n\ttransition: background-color $t-fast, border-color $t-fast, padding $t-fast;\n\n\t.LoginForm-FormContents {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmax-height: 230px;\n\t\toverflow: hidden;\n\t\topacity: 1;\n\n\t\ttransition: max-height $t-med, opacity $t-fast;\n\n\t\tinput {\n\t\t\t@extend %material_input;\n\t\t\tmargin-bottom: 8px;\n\t\t}\n\n\t\tbutton {\n\t\t\t@extend %material_button;\n\t\t\tuser-select: none;\n\t\t\tmargin-top: 16px;\n\t\t\tmargin-bottom: 8px;\n\t\t}\n\n\t\tinput, button {\n\t\t\twidth: 230px;\n\t\t\tpadding: 12px;\n\t\t}\n\t}\n\n\t.LoginForm-ProfilePlaceholder {\n\t\tdisplay: block;\n\t\tposition: relative;\n\t\twidth: 70%;\n\t\theight: 0;\n\t\tuser-select: none;\n\t\tpadding-bottom: 70%;\n\t\tmargin: 16px auto 32px auto;\n\n\t\tborder-radius: 50%;\n\t\tbackground: linear-gradient(45deg, $accent-700, $accent-300);\n\n\t\tbox-shadow: 0px 0px 0px 6px $neutral-100, 0px 0px 0px 12px $neutral-000;\n\n\t\ttransition: width $t-med $t-ufast, padding-bottom $t-med $t-ufast, box-shadow $t-med $t-ufast, transform $t-fast, opacity $t-fast;\n\n\t\timg {\n\t\t\tposition: absolute;\n\t\t\tpadding: 28px;\n\t\t\twidth: 100%;\n\t\t\theight: auto;\n\n\t\t\ttransition: opacity $t-fast, transform $t-fast;\n\t\t}\n\n\t\timg.success {\n\t\t\topacity: 0;\n\t\t\ttransform: scale(0.7);\n\t\t\tbottom: 0;\n\t\t\tleft: 0;\n\t\t}\n\t}\n}\n\n.LoginForm-Card.loading {\n\tbackground-color: transparent;\n\tborder-color: transparent;\n\tpadding: 0px 24px;\n\n\t.LoginForm-ProfilePlaceholder {\n\t\twidth: 80%;\n\t\theight: 0;\n\t\tpadding-bottom: 80%;\n\t\tmargin: 16px auto 32px auto;\n\t\tbox-shadow: 0px 0px 0px 6px $neutral-200, 0px 0px 0px 12px $neutral-100;\n\n\t\timg.card {\n\t\t\topacity: 0;\n\t\t\ttransform: scale(0.7);\n\t\t}\n\n\t\timg.success {\n\t\t\tbottom: 32px;\n\t\t\tleft: 32px;\n\t\t\topacity: 0.8;\n\t\t\ttransform: scale(1);\n\t\t\ttransition: opacity $t-fast $t-fast, transform $t-fast $t-fast, bottom $t-med $t-med ease-in, left $t-med $t-med ease-in;\n\t\t}\n\t}\n\n\t.LoginForm-FormContents {\n\t\tmax-height: 0;\n\t\topacity: 0;\n\t}\n}\n\n.LoginForm-Card.loaded {\n\t.LoginForm-ProfilePlaceholder {\n\t\ttransform: scale(0.8);\n\t\topacity: 0;\n\t}\n}\n\n.LoginForm-Warning {\n\t@extend %para_no_collapse;\n\tuser-select: none;\n\tcolor: #ef4e4e;\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaIcon.sass":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaIcon.sass ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaIcon {\n  width: 100%;\n  height: 100%;\n  border-radius: 4px;\n  object-fit: cover;\n  user-select: none; }\n  .MediaIcon.Icon {\n    background-color: #ebf0f6;\n    padding: 16px; }\n", "",{"version":3,"sources":["webpack://components/MediaIcon.sass"],"names":[],"mappings":"AAGA;EACC,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB,EAAA;EALlB;IAQE,yBAAsD;IACtD,aAAa,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaIcon {\n\twidth: 100%;\n\theight: 100%;\n\tborder-radius: 4px;\n\tobject-fit: cover;\n\tuser-select: none;\n\n\t&.Icon {\n\t\tbackground-color: mix($neutral-100, $neutral-000, 20%);\n\t\tpadding: 16px; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaItem.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaItem.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaItem {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaItem::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaItem:not(:disabled):hover::after, .MediaItem:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaItem:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaItem:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaItem:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaItem {\n  background: transparent;\n  border-color: #d9e2ec;\n  box-sizing: content-box;\n  user-select: none;\n  padding: 8px;\n  height: 80px;\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  grid-gap: 16px; }\n  .MediaItem > * {\n    box-sizing: border-box; }\n  .MediaItem.selected {\n    border-color: #54d1db;\n    background-color: rgba(135, 234, 242, 0.3); }\n    .MediaItem.selected:focus::after, .MediaItem.selected:hover::after {\n      background-color: rgba(135, 234, 242, 0.2); }\n    .MediaItem.selected .MediaIcon.Icon {\n      background-color: rgba(56, 190, 201, 0.3); }\n  .MediaItem .MediaItem-Description {\n    height: 100%;\n    overflow: auto;\n    text-align: left;\n    padding-top: 8px; }\n    .MediaItem .MediaItem-Description p {\n      margin-top: 0em;\n      margin-bottom: 0.3em;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n    .MediaItem .MediaItem-Description p.MediaItem-Title {\n      font-size: 18px; }\n    .MediaItem .MediaItem-Description p.MediaItem-Author {\n      opacity: 0.8;\n      font-size: 14px; }\n    .MediaItem .MediaItem-Description p.MediaItem-Size {\n      opacity: 0.7;\n      font-size: 14px; }\n", "",{"version":3,"sources":["webpack://components/MediaItem.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAGC,uBAAuB;EACvB,qBENoB;EFOpB,uBAAuB;EACvB,iBAAiB;EACjB,YAAY;EAGZ,YADQ;EAGR,aAAa;EACb,+BAA6B;EAC7B,cAAc,EAAA;EAdf;IAiBE,sBAAsB,EAAA;EAjBxB;IAqBE,qBETkB;IFUlB,0CAAkD,EAAA;IAtBpD;MAyBG,0CAAkD,EAAA;IAzBrD;MA6BG,yCAAkD,EAAA;EA7BrD;IAkCE,YAAY;IACZ,cAAc;IACd,gBAAgB;IAChB,gBAAgB,EAAA;IArClB;MAwCG,eAAe;MACf,oBAAoB;MAEpB,gBAAgB;MAChB,mBAAmB;MACnB,uBAAuB,EAAA;IA7C1B;MAiDG,eAAe,EAAA;IAjDlB;MAqDG,YAAY;MACZ,eAAe,EAAA;IAtDlB;MA0DG,YAAY;MACZ,eAAe,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaItem {\n\t// @extend %material_border;\n\t@extend %material_button;\n\tbackground: transparent;\n\tborder-color: $neutral-100;\n\tbox-sizing: content-box;\n\tuser-select: none;\n\tpadding: 8px;\n\n\t$h: 80px;\n\theight: $h;\n\n\tdisplay: grid;\n\tgrid-template-columns: $h 1fr;\n\tgrid-gap: 16px;\n\n\t& > * {\n\t\tbox-sizing: border-box;\n\t}\n\n\t&.selected {\n\t\tborder-color: $accent-400;\n\t\tbackground-color: transparentize($accent-300, 0.7);\n\n\t\t&:focus::after, &:hover::after {\n\t\t\tbackground-color: transparentize($accent-300, 0.8);\n\t\t}\n\n\t\t.MediaIcon.Icon {\n\t\t\tbackground-color: transparentize($accent-500, 0.7);\n\t\t}\n\t}\n\n\t.MediaItem-Description {\n\t\theight: 100%;\n\t\toverflow: auto;\n\t\ttext-align: left;\n\t\tpadding-top: 8px;\n\n\t\tp {\n\t\t\tmargin-top: 0em;\n\t\t\tmargin-bottom: 0.3em;\n\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\n\t\tp.MediaItem-Title {\n\t\t\tfont-size: 18px;\n\t\t}\n\n\t\tp.MediaItem-Author {\n\t\t\topacity: 0.8;\n\t\t\tfont-size: 14px;\n\t\t}\n\n\t\tp.MediaItem-Size {\n\t\t\topacity: 0.7;\n\t\t\tfont-size: 14px;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaReplaceForm.sass":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaReplaceForm.sass ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back), .MediaReplaceForm .MediaReplaceForm-Preview, .MediaReplaceForm .MediaReplaceForm-IconButton {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back), .MediaReplaceForm .MediaReplaceForm-IconButton {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back)::after, .MediaReplaceForm .MediaReplaceForm-IconButton::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back):not(:disabled):hover::after, .MediaReplaceForm .MediaReplaceForm-IconButton:not(:disabled):hover::after, .MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back):not(:disabled):focus::after, .MediaReplaceForm .MediaReplaceForm-IconButton:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap:not(:disabled):active:not(.Back), .MediaReplaceForm .MediaReplaceForm-IconButton:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap:not(:disabled):focus:not(.Back), .MediaReplaceForm .MediaReplaceForm-IconButton:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap:disabled:not(.Back), .MediaReplaceForm .MediaReplaceForm-IconButton:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaReplaceForm {\n  display: flex;\n  width: 100%;\n  height: 100px;\n  margin-top: 16px;\n  flex-direction: row; }\n  .MediaReplaceForm .MediaReplaceForm-InputWrap {\n    position: relative;\n    margin-right: 12px;\n    flex: 1 1 100px;\n    overflow: hidden;\n    opacity: 1;\n    transition: flex 0.3s, opacity 0.15s; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap:not(.Back) {\n      background-color: #f0f4f8;\n      border-color: #bcccdc; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap.Back {\n      flex: 0 1 100px; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap.Hidden {\n      flex: 0 1 0;\n      margin-right: 0;\n      opacity: 0; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap .MediaReplaceForm-Input, .MediaReplaceForm .MediaReplaceForm-InputWrap .MediaReplaceForm-BackButton {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      cursor: pointer; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap .MediaReplaceForm-Input {\n      opacity: 0; }\n    .MediaReplaceForm .MediaReplaceForm-InputWrap h2 {\n      color: #627d98;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin: 0;\n      display: block;\n      white-space: pre;\n      user-select: none;\n      pointer-events: none;\n      transform: translate(-50%, -50%); }\n  .MediaReplaceForm .MediaReplaceForm-Preview {\n    border-color: #d9e2ec;\n    flex: 0 1 0;\n    display: grid;\n    grid-gap: 16px;\n    grid-template-columns: 84px 1fr;\n    opacity: 0;\n    overflow: hidden;\n    transition: flex 0.3s, opacity 0.15s; }\n    .MediaReplaceForm .MediaReplaceForm-Preview.Expand {\n      opacity: 1;\n      flex-grow: 1;\n      padding: 8px;\n      margin-right: 12px; }\n    .MediaReplaceForm .MediaReplaceForm-Preview .MediaIcon {\n      height: 82px; }\n    .MediaReplaceForm .MediaReplaceForm-Preview .MediaReplaceForm-PreviewDescription {\n      padding: 8px 0; }\n      .MediaReplaceForm .MediaReplaceForm-Preview .MediaReplaceForm-PreviewDescription p {\n        margin-top: 0em;\n        margin-bottom: 0.3em;\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis; }\n      .MediaReplaceForm .MediaReplaceForm-Preview .MediaReplaceForm-PreviewDescription p.MediaReplaceForm-PreviewTitle {\n        font-size: 18px; }\n      .MediaReplaceForm .MediaReplaceForm-Preview .MediaReplaceForm-PreviewDescription p.MediaReplaceForm-PreviewAuthor {\n        opacity: 0.8;\n        font-size: 14px; }\n      .MediaReplaceForm .MediaReplaceForm-Preview .MediaReplaceForm-PreviewDescription p.MediaReplaceForm-PreviewSize {\n        opacity: 0.7;\n        font-size: 14px; }\n  .MediaReplaceForm .MediaReplaceForm-SubmitButton {\n    width: 100px; }\n  .MediaReplaceForm .MediaReplaceForm-IconButton {\n    position: relative;\n    padding: 0;\n    border-color: #9fb3c8;\n    background: transparent;\n    overflow: hidden; }\n    .MediaReplaceForm .MediaReplaceForm-IconButton img {\n      width: 100%;\n      height: 100%;\n      padding: 24px;\n      padding-bottom: 40px; }\n    .MediaReplaceForm .MediaReplaceForm-IconButton span {\n      position: absolute;\n      left: 0;\n      bottom: 16px;\n      width: 100%;\n      font-size: 14px;\n      color: #334e68; }\n", "",{"version":3,"sources":["webpack://components/MediaReplaceForm.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EC+CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFDrB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAIC,aAAa;EACb,WAAW;EACX,aALc;EAMd,gBAAgB;EAChB,mBAAmB,EAAA;EARpB;IAWE,kBAAkB;IAClB,kBAAkB;IAClB,eAZa;IAcb,gBAAgB;IAChB,UAAU;IAEV,oCEGY,EAAA;IFrBd;MAwBG,yBE3BkB;MF4BlB,qBE1BkB,EAAA;IFCrB;MA4BG,eA3BY,EAAA;IADf;MA+BG,WAAc;MACd,eAAe;MACf,UAAU,EAAA;IAjCb;MAoCG,kBAAkB;MAClB,WAAW;MACX,YAAY;MACZ,eAAe,EAAA;IAvClB;MA0CG,UAAU,EAAA;IA1Cb;MA6CG,cE3CkB;MF4ClB,kBAAkB;MAClB,QAAQ;MACR,SAAS;MACT,SAAS;MACT,cAAc;MACd,gBAAgB;MAChB,iBAAiB;MACjB,oBAAoB;MACpB,gCAAgC,EAAA;EAtDnC;IA0DE,qBE5DmB;IF8DnB,WAAc;IAEd,aAAa;IACb,cAAc;IACd,+BAA0C;IAE1C,UAAU;IACV,gBAAgB;IAChB,oCE/CY,EAAA;IFrBd;MAuEG,UAAU;MACV,YAAY;MACZ,YAAY;MACZ,kBAAkB,EAAA;IA1ErB;MA6EG,YAAY,EAAA;IA7Ef;MAgFG,cAAc,EAAA;MAhFjB;QAmFI,eAAe;QACf,oBAAoB;QAEpB,gBAAgB;QAChB,mBAAmB;QACnB,uBAAuB,EAAA;MAxF3B;QA2FI,eAAe,EAAA;MA3FnB;QA8FI,YAAY;QACZ,eAAe,EAAA;MA/FnB;QAkGI,YAAY;QACZ,eAAe,EAAA;EAnGnB;IAsGE,YArGa,EAAA;EADf;IA4GE,kBAAkB;IAClB,UAAU;IAEV,qBE/GmB;IFgHnB,uBAAuB;IACvB,gBAAgB,EAAA;IAjHlB;MAoHG,WAAW;MACX,YAAY;MACZ,aAAa;MACb,oBAAoB,EAAA;IAvHvB;MA0HG,kBAAkB;MAClB,OAAO;MACP,YAAY;MACZ,WAAW;MAEX,eAAe;MACf,cE5HkB,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaReplaceForm {\n\t$height: 100px;\n\t$min: 0.00000001;\n\n\tdisplay: flex;\n\twidth: 100%;\n\theight: $height;\n\tmargin-top: 16px;\n\tflex-direction: row;\n\n\t.MediaReplaceForm-InputWrap {\n\t\tposition: relative;\n\t\tmargin-right: 12px;\n\t\tflex: 1 1 $height;\n\n\t\toverflow: hidden;\n\t\topacity: 1;\n\n\t\ttransition: flex $t-med, opacity $t-fast;\n\n\t\t&:not(.Back) {\n\t\t\t@extend %material_border;\n\t\t\t@extend %material_button;\n\n\t\t\tbackground-color: $neutral-000;\n\t\t\tborder-color: $neutral-200; }\n\n\t\t&.Back {\n\t\t\tflex: $min 1 $height; }\n\n\t\t&.Hidden {\n\t\t\tflex: $min 1 0;\n\t\t\tmargin-right: 0;\n\t\t\topacity: 0; }\n\n\t\t.MediaReplaceForm-Input, .MediaReplaceForm-BackButton {\n\t\t\tposition: absolute;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tcursor: pointer; }\n\n\t\t.MediaReplaceForm-Input {\n\t\t\topacity: 0; }\n\n\t\th2 {\n\t\t\tcolor: $neutral-500;\n\t\t\tposition: absolute;\n\t\t\ttop: 50%;\n\t\t\tleft: 50%;\n\t\t\tmargin: 0;\n\t\t\tdisplay: block;\n\t\t\twhite-space: pre;\n\t\t\tuser-select: none;\n\t\t\tpointer-events: none;\n\t\t\ttransform: translate(-50%, -50%); } }\n\n\t.MediaReplaceForm-Preview {\n\t\t@extend %material_border;\n\t\tborder-color: $neutral-100;\n\n\t\tflex: $min 1 0;\n\n\t\tdisplay: grid;\n\t\tgrid-gap: 16px;\n\t\tgrid-template-columns: #{$height - 16} 1fr;\n\n\t\topacity: 0;\n\t\toverflow: hidden;\n\t\ttransition: flex $t-med, opacity $t-fast;\n\n\t\t&.Expand {\n\t\t\topacity: 1;\n\t\t\tflex-grow: 1;\n\t\t\tpadding: 8px;\n\t\t\tmargin-right: 12px; }\n\n\t\t.MediaIcon {\n\t\t\theight: 82px; }\n\n\t\t.MediaReplaceForm-PreviewDescription {\n\t\t\tpadding: 8px 0;\n\n\t\t\tp {\n\t\t\t\tmargin-top: 0em;\n\t\t\t\tmargin-bottom: 0.3em;\n\n\t\t\t\toverflow: hidden;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttext-overflow: ellipsis; }\n\n\t\t\tp.MediaReplaceForm-PreviewTitle {\n\t\t\t\tfont-size: 18px; }\n\n\t\t\tp.MediaReplaceForm-PreviewAuthor {\n\t\t\t\topacity: 0.8;\n\t\t\t\tfont-size: 14px; }\n\n\t\t\tp.MediaReplaceForm-PreviewSize {\n\t\t\t\topacity: 0.7;\n\t\t\t\tfont-size: 14px; } } }\n\n\t.MediaReplaceForm-SubmitButton {\n\t\twidth: $height; }\n\n\t.MediaReplaceForm-IconButton {\n\t\t@extend %material_border;\n\t\t@extend %material_button;\n\n\t\tposition: relative;\n\t\tpadding: 0;\n\n\t\tborder-color: $neutral-300;\n\t\tbackground: transparent;\n\t\toverflow: hidden;\n\n\t\timg {\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tpadding: 24px;\n\t\t\tpadding-bottom: 40px; }\n\n\t\tspan {\n\t\t\tposition: absolute;\n\t\t\tleft: 0;\n\t\t\tbottom: 16px;\n\t\t\twidth: 100%;\n\n\t\t\tfont-size: 14px;\n\t\t\tcolor: $neutral-700; } } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaUploadForm.scss":
/*!****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaUploadForm.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaUploadForm .MediaUploadForm-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .MediaUploadForm .MediaUploadForm-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .MediaUploadForm .MediaUploadForm-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .MediaUploadForm .MediaUploadForm-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.MediaUploadForm .MediaUploadForm-InputWrap {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.MediaUploadForm .MediaUploadForm-Toolbar button, .MediaUploadForm .MediaUploadForm-InputWrap, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaUploadForm .MediaUploadForm-Toolbar button::after, .MediaUploadForm .MediaUploadForm-InputWrap::after, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaUploadForm .MediaUploadForm-Toolbar button:not(:disabled):hover::after, .MediaUploadForm .MediaUploadForm-InputWrap:not(:disabled):hover::after, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button:not(:disabled):hover::after, .MediaUploadForm .MediaUploadForm-Toolbar button:not(:disabled):focus::after, .MediaUploadForm .MediaUploadForm-InputWrap:not(:disabled):focus::after, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaUploadForm .MediaUploadForm-Toolbar button:not(:disabled):active, .MediaUploadForm .MediaUploadForm-InputWrap:not(:disabled):active, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaUploadForm .MediaUploadForm-Toolbar button:not(:disabled):focus, .MediaUploadForm .MediaUploadForm-InputWrap:not(:disabled):focus, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaUploadForm .MediaUploadForm-Toolbar button:disabled, .MediaUploadForm .MediaUploadForm-InputWrap:disabled, .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaUploadForm .MediaUploadForm-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .MediaUploadForm .MediaUploadForm-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .MediaUploadForm .MediaUploadForm-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.MediaUploadForm .MediaUploadForm-InputWrap {\n  margin: 16px 0px;\n  position: relative;\n  display: flex;\n  width: 100%;\n  height: 150px;\n  align-items: center;\n  text-align: center;\n  background-color: #f0f4f8;\n  border-color: #bcccdc;\n  transition: height 0.3s, margin-top 0.3s, opacity 0.15s; }\n  .MediaUploadForm .MediaUploadForm-InputWrap.disabled {\n    height: 0;\n    margin: 0;\n    opacity: 0; }\n  .MediaUploadForm .MediaUploadForm-InputWrap .MediaUploadForm-Input {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    cursor: pointer; }\n  .MediaUploadForm .MediaUploadForm-InputWrap h2 {\n    color: #627d98;\n    user-select: none;\n    display: block;\n    width: 100%; }\n\n.MediaUploadForm .MediaUploadForm-Files {\n  width: 600px;\n  margin: 16px 0px;\n  display: grid;\n  grid-gap: 8px; }\n  .MediaUploadForm .MediaUploadForm-Files.Grid {\n    width: 840px;\n    grid-template-columns: 1fr 1fr; }\n\n.MediaUploadForm .MediaUploadForm-ActionBar {\n  margin: 32px 0px 8px 0px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .MediaUploadForm .MediaUploadForm-ActionBar .MediaUploadForm-ActionBar-Button {\n    padding: 12px; }\n", "",{"version":3,"sources":["webpack://components/MediaUploadForm.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECSC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDX/B;ICkBE,WAAW;IACX,qBAAqB,EAAA;EDnBvB;ICuBE,iBAAiB,EAAA;EDvBnB;IC2BE,gBAAgB,EAAA;;AD3BlB;EC+CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFDrB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EC0IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDhJpB;ICmJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDtJxB;IC0JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD7JnB;EAKE,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAElB,yBEhBmB;EFiBnB,qBEfmB;EFiBnB,uDEKY,EAAA;EFrBd;IAmBG,SAAS;IACT,SAAS;IACT,UAAU,EAAA;EArBb;IAyBG,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,UAAU;IACV,eAAe,EAAA;EA7BlB;IAiCG,cE/BkB;IFgClB,iBAAiB;IACjB,cAAc;IACd,WAAW,EAAA;;AApCd;EAyCE,YAAY;EACZ,gBAAgB;EAChB,aAAa;EACb,aAAa,EAAA;EA5Cf;IA+CG,YAAY;IACZ,8BAA8B,EAAA;;AAhDjC;EAyDE,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EA5DhC;IAgEG,aACD,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaUploadForm {\n\t.MediaUploadForm-InputWrap {\n\t\t@extend %material_button;\n\t\t@extend %material_border;\n\t\t\n\t\tmargin: 16px 0px;\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\twidth: 100%;\n\t\theight: 150px;\n\t\talign-items: center;\n\t\ttext-align: center;\n\n\t\tbackground-color: $neutral-000;\n\t\tborder-color: $neutral-200;\n\t\t\n\t\ttransition: height $t-med, margin-top $t-med, opacity $t-fast;\n\n\t\t&.disabled {\n\t\t\theight: 0;\n\t\t\tmargin: 0;\n\t\t\topacity: 0;\n\t\t}\n\n\t\t.MediaUploadForm-Input {\n\t\t\tposition: absolute;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\topacity: 0;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\th2 {\n\t\t\tcolor: $neutral-500;\n\t\t\tuser-select: none;\n\t\t\tdisplay: block;\n\t\t\twidth: 100%;\n\t\t}\n\t}\n\n\t.MediaUploadForm-Files {\n\t\twidth: 600px;\n\t\tmargin: 16px 0px;\n\t\tdisplay: grid;\n\t\tgrid-gap: 8px;\n\n\t\t&.Grid {\n\t\t\twidth: 840px;\n\t\t\tgrid-template-columns: 1fr 1fr;\n\t\t}\n\t}\n\n\t.MediaUploadForm-Toolbar {\n\t\t@extend %card_toolbar;\n\t}\n\n\t.MediaUploadForm-ActionBar {\n\t\tmargin: 32px 0px 8px 0px;\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tjustify-content: space-between;\n\n\t\t.MediaUploadForm-ActionBar-Button {\n\t\t\t@extend %material_button;\n\t\t\tpadding: 12px\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaUploadItem.scss":
/*!****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaUploadItem.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaUploadItem .MediaItem-Description input {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.MediaUploadItem .MediaItem-Description input {\n  border-color: #d9e2ec;\n  outline: 0; }\n  .MediaUploadItem .MediaItem-Description input:hover {\n    border-color: #bcccdc; }\n  .MediaUploadItem .MediaItem-Description input:focus {\n    border-color: #829ab1; }\n  .MediaUploadItem .MediaItem-Description input::placeholder {\n    font-weight: 400;\n    color: #829ab1; }\n\n.MediaUploadItem {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaUploadItem::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaUploadItem:not(:disabled):hover::after, .MediaUploadItem:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaUploadItem:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaUploadItem:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaUploadItem:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaUploadItem {\n  background: transparent;\n  border-color: #d9e2ec;\n  box-sizing: content-box;\n  user-select: none;\n  padding: 8px;\n  height: 80px;\n  display: grid;\n  grid-template-columns: 80px 1fr;\n  grid-gap: 16px; }\n  .MediaUploadItem:hover:not(:focus) {\n    border-color: #9fb3c8; }\n    .MediaUploadItem:hover:not(:focus)::after {\n      background-color: transparent; }\n  .MediaUploadItem > * {\n    box-sizing: border-box; }\n  .MediaUploadItem.selected {\n    border-color: #54d1db;\n    background-color: rgba(135, 234, 242, 0.3); }\n    .MediaUploadItem.selected:focus::after, .MediaUploadItem.selected:hover::after {\n      background-color: rgba(135, 234, 242, 0.2); }\n    .MediaUploadItem.selected .MediaIcon.Icon {\n      background-color: rgba(56, 190, 201, 0.3); }\n  .MediaUploadItem .MediaItem-Description {\n    height: 100%;\n    overflow: hidden;\n    text-align: left;\n    padding-right: 8px; }\n    .MediaUploadItem .MediaItem-Description p, .MediaUploadItem .MediaItem-Description input {\n      margin-top: 0em;\n      margin-bottom: 0.3em; }\n    .MediaUploadItem .MediaItem-Description p {\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n      .MediaUploadItem .MediaItem-Description p.MediaItem-Metadata {\n        opacity: 0.7;\n        font-size: 14px;\n        padding-left: 4px; }\n    .MediaUploadItem .MediaItem-Description input {\n      background: transparent;\n      padding: 2px 4px;\n      width: 100%; }\n      .MediaUploadItem .MediaItem-Description input::placeholder {\n        color: #243b53;\n        font-weight: 500; }\n      .MediaUploadItem .MediaItem-Description input.MediaItem-Name {\n        font-size: 18px; }\n      .MediaUploadItem .MediaItem-Description input.MediaItem-FileName {\n        opacity: 0.8;\n        font-size: 14px; }\n        .MediaUploadItem .MediaItem-Description input.MediaItem-FileName:disabled {\n          position: relative;\n          top: -2px; }\n    .MediaUploadItem .MediaItem-Description input:disabled {\n      padding: 0;\n      border: none;\n      cursor: pointer; }\n    .MediaUploadItem .MediaItem-Description input:first-child:disabled {\n      padding-top: 8px; }\n    .MediaUploadItem .MediaItem-Description input:disabled + .MediaItem-Metadata {\n      padding-left: 0; }\n", "",{"version":3,"sources":["webpack://components/MediaUploadItem.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EC+CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFDrB;ECuDC,qBCzDoB;ED0DpB,UAAU,EAAA;EDxDX;IC2DE,qBC5DmB,EAAA;EFCrB;IC+DE,qBC9DmB,EAAA;EFDrB;ICmEE,gBAAgB;IAChB,cCnEmB,EAAA;;AFDrB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAEC,uBAAuB;EACvB,qBELoB;EFMpB,uBAAuB;EACvB,iBAAiB;EACjB,YAAY;EAGZ,YADQ;EAGR,aAAa;EACb,+BAA6B;EAC7B,cAAc,EAAA;EAbf;IAgBE,qBEhBmB,EAAA;IFArB;MAmBG,6BAA6B,EAAA;EAnBhC;IAwBE,sBAAsB,EAAA;EAxBxB;IA4BE,qBEhBkB;IFiBlB,0CAAkD,EAAA;IA7BpD;MAgCG,0CAAkD,EAAA;IAhCrD;MAoCG,yCAAkD,EAAA;EApCrD;IAyCE,YAAY;IACZ,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB,EAAA;IA5CpB;MA+CG,eAAe;MACf,oBAAoB,EAAA;IAhDvB;MAoDG,gBAAgB;MAChB,mBAAmB;MACnB,uBAAuB,EAAA;MAtD1B;QAyDI,YAAY;QACZ,eAAe;QACf,iBAAiB,EAAA;IA3DrB;MAiEG,uBAAuB;MACvB,gBAAgB;MAChB,WAAW,EAAA;MAnEd;QAsEI,cEjEiB;QFkEjB,gBAAgB,EAAA;MAvEpB;QA2EI,eAAe,EAAA;MA3EnB;QA+EI,YAAY;QACZ,eAAe,EAAA;QAhFnB;UAmFK,kBAAkB;UAClB,SAAS,EAAA;IApFd;MA0FG,UAAU;MACV,YAAY;MACZ,eAAe,EAAA;IA5FlB;MAgGG,gBAAgB,EAAA;IAhGnB;MAoGG,eAAe,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaUploadItem {\n\t@extend %material_button;\n\tbackground: transparent;\n\tborder-color: $neutral-100;\n\tbox-sizing: content-box;\n\tuser-select: none;\n\tpadding: 8px;\n\n\t$h: 80px;\n\theight: $h;\n\n\tdisplay: grid;\n\tgrid-template-columns: $h 1fr;\n\tgrid-gap: 16px;\n\n\t&:hover:not(:focus) {\n\t\tborder-color: $neutral-300;\n\n\t\t&::after {\n\t\t\tbackground-color: transparent;\n\t\t}\n\t}\n\n\t& > * {\n\t\tbox-sizing: border-box;\n\t}\n\n\t&.selected {\n\t\tborder-color: $accent-400;\n\t\tbackground-color: transparentize($accent-300, 0.7);\n\n\t\t&:focus::after, &:hover::after {\n\t\t\tbackground-color: transparentize($accent-300, 0.8);\n\t\t}\n\n\t\t.MediaIcon.Icon {\n\t\t\tbackground-color: transparentize($accent-500, 0.7);\n\t\t}\n\t}\n\t\n\t.MediaItem-Description {\n\t\theight: 100%;\n\t\toverflow: hidden;\n\t\ttext-align: left;\n\t\tpadding-right: 8px;\n\n\t\tp, input {\n\t\t\tmargin-top: 0em;\n\t\t\tmargin-bottom: 0.3em;\n\t\t}\n\n\t\tp {\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t\ttext-overflow: ellipsis;\n\n\t\t\t&.MediaItem-Metadata {\n\t\t\t\topacity: 0.7;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tpadding-left: 4px;\n\t\t\t}\n\t\t}\n\n\t\tinput {\n\t\t\t@extend %material_input;\n\t\t\tbackground: transparent;\n\t\t\tpadding: 2px 4px;\n\t\t\twidth: 100%;\n\n\t\t\t&::placeholder {\n\t\t\t\tcolor: $neutral-800;\n\t\t\t\tfont-weight: 500;\n\t\t\t}\n\n\t\t\t&.MediaItem-Name {\n\t\t\t\tfont-size: 18px;\n\t\t\t}\n\n\t\t\t&.MediaItem-FileName {\n\t\t\t\topacity: 0.8;\n\t\t\t\tfont-size: 14px;\n\n\t\t\t\t&:disabled {\n\t\t\t\t\tposition: relative;\n\t\t\t\t\ttop: -2px;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tinput:disabled {\n\t\t\tpadding: 0;\n\t\t\tborder: none;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\tinput:first-child:disabled {\n\t\t\tpadding-top: 8px;\n\t\t}\n\n\t\tinput:disabled + .MediaItem-Metadata {\n\t\t\tpadding-left: 0;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaView.sass":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/MediaView.sass ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaView .MediaView-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .MediaView .MediaView-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .MediaView .MediaView-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .MediaView .MediaView-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.MediaView .MediaView-Toolbar button, .MediaView .MediaView-UnknownPreview {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaView .MediaView-Toolbar button::after, .MediaView .MediaView-UnknownPreview::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaView .MediaView-Toolbar button:not(:disabled):hover::after, .MediaView .MediaView-UnknownPreview:not(:disabled):hover::after, .MediaView .MediaView-Toolbar button:not(:disabled):focus::after, .MediaView .MediaView-UnknownPreview:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaView .MediaView-Toolbar button:not(:disabled):active, .MediaView .MediaView-UnknownPreview:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaView .MediaView-Toolbar button:not(:disabled):focus, .MediaView .MediaView-UnknownPreview:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaView .MediaView-Toolbar button:disabled, .MediaView .MediaView-UnknownPreview:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaView .MediaView-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .MediaView .MediaView-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .MediaView .MediaView-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.MediaView {\n  display: block;\n  width: 100vw;\n  max-width: 800px; }\n  .MediaView .MediaView-Toolbar {\n    margin-top: 16px; }\n  .MediaView .MediaView-Top {\n    display: grid;\n    grid-template-columns: 80px 1fr;\n    grid-gap: 16px; }\n    .MediaView .MediaView-Top .MediaIcon {\n      height: 80px; }\n    .MediaView .MediaView-Top .MediaView-Info .MediaView-Name, .MediaView .MediaView-Top .MediaView-Info .MediaView-Author, .MediaView .MediaView-Top .MediaView-Info .MediaView-Size {\n      margin-top: 0;\n      margin-bottom: 0.3em;\n      font-size: inherit;\n      font-family: inherit;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n    .MediaView .MediaView-Top .MediaView-Info .MediaView-Path {\n      opacity: 0.7;\n      margin-left: 4px;\n      font-size: 14px; }\n    .MediaView .MediaView-Top .MediaView-Info .MediaView-Name {\n      font-size: 18px;\n      margin-top: 8px; }\n    .MediaView .MediaView-Top .MediaView-Info .MediaView-Author {\n      opacity: 0.8;\n      font-size: 14px; }\n    .MediaView .MediaView-Top .MediaView-Info .MediaView-Size {\n      opacity: 0.7;\n      font-size: 14px; }\n  .MediaView .MediaView-Preview {\n    display: block;\n    position: relative;\n    width: 100%;\n    height: auto;\n    padding: 16px;\n    margin-top: 16px;\n    text-align: center;\n    border-radius: 4px;\n    background-color: #f0f4f8; }\n    .MediaView .MediaView-Preview > img {\n      width: 100%;\n      height: max-content;\n      min-height: 64px;\n      max-height: 400px;\n      object-fit: contain;\n      object-position: center center; }\n  .MediaView .MediaView-UnknownPreview {\n    display: inline-block;\n    padding: 16px;\n    margin: 48px auto; }\n", "",{"version":3,"sources":["webpack://components/MediaView.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECSC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDX/B;ICkBE,WAAW;IACX,qBAAqB,EAAA;EDnBvB;ICuBE,iBAAiB,EAAA;EDvBnB;IC2BE,gBAAgB,EAAA;;AD3BlB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EC0IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDhJpB;ICmJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDtJxB;IC0JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD7JnB;EACC,cAAc;EACd,YAAY;EACZ,gBAAgB,EAAA;EAHjB;IAME,gBAAgB,EAAA;EANlB;IAYE,aAAa;IACb,+BAAsC;IACtC,cAAc,EAAA;IAdhB;MAiBG,YAPgB,EAAA;IAVnB;MAqBI,aAAa;MACb,oBAAoB;MAEpB,kBAAkB;MAClB,oBAAoB;MAEpB,gBAAgB;MAChB,mBAAmB;MACnB,uBAAuB,EAAA;IA7B3B;MAgCI,YAAY;MACZ,gBAAgB;MAChB,eAAe,EAAA;IAlCnB;MAqCI,eAAe;MACf,eAAe,EAAA;IAtCnB;MAyCI,YAAY;MACZ,eAAe,EAAA;IA1CnB;MA6CI,YAAY;MACZ,eAAe,EAAA;EA9CnB;IAiDE,cAAc;IACd,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,aAAa;IACb,gBAAgB;IAEhB,kBAAkB;IAClB,kBAAkB;IAClB,yBE7DmB,EAAA;IFGrB;MA6DG,WAAW;MACX,mBAAmB;MACnB,gBAAgB;MAChB,iBAAiB;MAEjB,mBAAmB;MACnB,8BAA8B,EAAA;EAnEjC;IAuEE,qBAAqB;IACrB,aAAa;IACb,iBAAiB,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.MediaView {\n\tdisplay: block;\n\twidth: 100vw;\n\tmax-width: 800px;\n\n\t.MediaView-Toolbar {\n\t\tmargin-top: 16px;\n\t\t@extend %card_toolbar; }\n\n\t.MediaView-Top {\n\t\t$imageWidth: 80px;\n\n\t\tdisplay: grid;\n\t\tgrid-template-columns: $imageWidth 1fr;\n\t\tgrid-gap: 16px;\n\n\t\t.MediaIcon {\n\t\t\theight: $imageWidth; }\n\n\t\t.MediaView-Info {\n\t\t\t.MediaView-Name, .MediaView-Author, .MediaView-Size {\n\t\t\t\tmargin-top: 0;\n\t\t\t\tmargin-bottom: 0.3em;\n\n\t\t\t\tfont-size: inherit;\n\t\t\t\tfont-family: inherit;\n\n\t\t\t\toverflow: hidden;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttext-overflow: ellipsis; }\n\n\t\t\t.MediaView-Path {\n\t\t\t\topacity: 0.7;\n\t\t\t\tmargin-left: 4px;\n\t\t\t\tfont-size: 14px; }\n\n\t\t\t.MediaView-Name {\n\t\t\t\tfont-size: 18px;\n\t\t\t\tmargin-top: 8px; }\n\n\t\t\t.MediaView-Author {\n\t\t\t\topacity: 0.8;\n\t\t\t\tfont-size: 14px; }\n\n\t\t\t.MediaView-Size {\n\t\t\t\topacity: 0.7;\n\t\t\t\tfont-size: 14px; } } }\n\n\t.MediaView-Preview {\n\t\tdisplay: block;\n\t\tposition: relative;\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tpadding: 16px;\n\t\tmargin-top: 16px;\n\n\t\ttext-align: center;\n\t\tborder-radius: 4px;\n\t\tbackground-color: $neutral-000;\n\n\t\t& > img {\n\t\t\twidth: 100%;\n\t\t\theight: max-content;\n\t\t\tmin-height: 64px;\n\t\t\tmax-height: 400px;\n\n\t\t\tobject-fit: contain;\n\t\t\tobject-position: center center; } }\n\n\t.MediaView-UnknownPreview {\n\t\t@extend %material_button;\n\t\tdisplay: inline-block;\n\t\tpadding: 16px;\n\t\tmargin: 48px auto; } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/Meter.scss":
/*!******************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/Meter.scss ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".Meter {\n  position: relative;\n  width: 100%;\n  height: 24px;\n  border-radius: 4px;\n  overflow: hidden;\n  background: #d9e2ec; }\n  .Meter .Meter-Progress {\n    position: absolute;\n    display: block;\n    height: 100%;\n    border-radius: 20px;\n    left: -1px;\n    background: linear-gradient(20deg, #2cb1bc, #87eaf2);\n    border-radius: 0px 4px 4px 0px; }\n", "",{"version":3,"sources":["webpack://components/Meter.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EAIC,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAElB,gBAAgB;EAChB,mBCZoB,EAAA;EDErB;IAaE,kBAAkB;IAClB,cAAc;IACd,YAAY;IACZ,mBAAmB;IACnB,UAAU;IAGV,oDAA4D;IAE5D,8BAA8B,EAAA","sourcesContent":["@import \"../partial/Ext\";\n@import \"../partial/Vars\";\n\n.Meter {\n\t// @extend %material_border;\n\t// border-color: $neutral-300;\n\n\tposition: relative;\n\twidth: 100%;\n\theight: 24px;\n\tborder-radius: 4px;\n\n\toverflow: hidden;\n\tbackground: $neutral-100;\n\n\t.Meter-Progress {\n\t\tposition: absolute;\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\tborder-radius: 20px;\n\t\tleft: -1px;\n\n\t\t// background: $accent-500;\n\t\tbackground: linear-gradient(20deg, $accent-600, $accent-300);\n\t\t// box-shadow: 0px -3px 0px 8px inset $accent-400;\n\t\tborder-radius: 0px 4px 4px 0px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/Modal.scss":
/*!******************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/Modal.scss ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".Modal .Modal-CardWrap .Modal-Card {\n  height: min-content;\n  border-radius: 4px;\n  padding: 16px 24px;\n  background-color: #fff;\n  box-shadow: 0px 2px 8px 0px rgba(8, 30, 56, 0.1); }\n\n.Modal {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.Modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(188, 204, 220, 0.7); }\n  .Modal .closes {\n    cursor: pointer; }\n  .Modal .Modal-CardWrap {\n    width: 100%;\n    height: auto;\n    display: flex;\n    overflow: auto;\n    padding: 64px;\n    justify-content: space-around; }\n    .Modal .Modal-CardWrap .Modal-Card {\n      display: block;\n      cursor: auto;\n      height: min-content; }\n", "",{"version":3,"sources":["webpack://components/Modal.scss","webpack://partial/_Ext.scss"],"names":[],"mappings":"AAGA;ECAC,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAElB,sBAAsB;EACtB,gDAA8D,EAAA;;ADL/D;ECgCC,aAAa;EACb,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB,EAAA;;ADrCpB;EAGC,eAAe;EACf,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EAEZ,0CAAmD,EAAA;EATpD;IAYE,eAAe,EAAA;EAZjB;IAgBE,WAAW;IACX,YAAY;IACZ,aAAa;IACb,cAAc;IACd,aAAa;IACb,6BAA6B,EAAA;IArB/B;MA0BG,cAAc;MACd,YAAY;MAEZ,mBAAmB,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.Modal {\n\t@extend %center_wrap;\n\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\n\tbackground-color: transparentize($neutral-200, 0.3);\n\n\t.closes {\n\t\tcursor: pointer;\n\t}\n\t\n\t.Modal-CardWrap {\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tdisplay: flex;\n\t\toverflow: auto;\n\t\tpadding: 64px;\n\t\tjustify-content: space-around;\n\n\t\t.Modal-Card {\n\t\t\t@extend %card;\n\n\t\t\tdisplay: block;\n\t\t\tcursor: auto;\n\t\t\t\n\t\t\theight: min-content;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/PluginItem.scss":
/*!***********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/PluginItem.scss ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".PluginItem {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .PluginItem::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PluginItem:not(:disabled):hover::after, .PluginItem:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PluginItem:not(:disabled):active {\n    transition: border 0.15s; }\n  .PluginItem:not(:disabled):focus {\n    border-color: #829ab1; }\n  .PluginItem:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.PluginItem {\n  background-color: #fff;\n  border-color: #d9e2ec;\n  box-sizing: content-box;\n  padding: 8px;\n  display: grid;\n  grid-gap: 8px;\n  text-align: left;\n  grid-template-rows: auto 1fr; }\n  .PluginItem > * {\n    box-sizing: border-box; }\n  .PluginItem.selected {\n    border-color: #54d1db;\n    background-color: rgba(135, 234, 242, 0.3); }\n    .PluginItem.selected:focus::after, .PluginItem.selected:hover::after {\n      background-color: rgba(135, 234, 242, 0.2); }\n    .PluginItem.selected .MediaItem-Image.icon {\n      background-color: rgba(56, 190, 201, 0.3); }\n  .PluginItem .PluginItem-Cover {\n    height: 0;\n    width: 100%;\n    position: relative;\n    padding-top: 56.25%; }\n    .PluginItem .PluginItem-Cover > img {\n      position: absolute;\n      user-select: none;\n      pointer-events: none;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      object-fit: cover;\n      border-radius: 4px; }\n  .PluginItem .PluginItem-Content p.PluginItem-Author {\n    margin: 0;\n    margin-top: 4px; }\n  .PluginItem .PluginItem-Content h2.PluginItem-Title {\n    font-size: 24px;\n    margin: 0;\n    margin-top: 4px; }\n  .PluginItem .PluginItem-Content p.PluginItem-Description {\n    margin: 0;\n    margin-top: 12px;\n    font-weight: 400;\n    opacity: 0.8;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-height: 38px;\n    display: block;\n    line-clamp: 2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical; }\n  .PluginItem .PluginItem-Tag {\n    position: absolute;\n    display: inline-block;\n    bottom: 8px;\n    left: 8px;\n    padding: 4px 12px;\n    border-radius: 20px;\n    box-shadow: 0px 2px 8px 0px rgba(36, 59, 83, 0.3);\n    background: #d9e2ec;\n    color: #486581; }\n    .PluginItem .PluginItem-Tag.Enabled {\n      background: #bef8fd;\n      color: #14919b; }\n", "",{"version":3,"sources":["webpack://components/PluginItem.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAGC,sBAAsB;EACtB,qBENoB;EFOpB,uBAAuB;EACvB,YAAY;EAEZ,aAAa;EACb,aAAa;EACb,gBAAgB;EAChB,4BAA4B,EAAA;EAX7B;IAcE,sBAAsB,EAAA;EAdxB;IAkBE,qBENkB;IFOlB,0CAAkD,EAAA;IAnBpD;MAsBG,0CAAkD,EAAA;IAtBrD;MA0BG,yCAAkD,EAAA;EA1BrD;IA+BE,SAAS;IACT,WAAW;IACX,kBAAkB;IAClB,mBAAmB,EAAA;IAlCrB;MAqCG,kBAAkB;MAClB,iBAAiB;MACjB,oBAAoB;MACpB,WAAW;MACX,YAAY;MACZ,MAAM;MACN,OAAO;MACP,iBAAiB;MACjB,kBAAkB,EAAA;EA7CrB;IAmDG,SAAS;IACT,eAAe,EAAA;EApDlB;IAwDG,eAAe;IACf,SAAS;IACT,eAAe,EAAA;EA1DlB;IA8DG,SAAS;IACT,gBAAgB;IAChB,gBAAgB;IAChB,YAAY;IAEV,gBAAgB;IAChB,uBAAuB;IAGzB,gBAAgB;IACf,cAAc;IAGb,aAAa;IACb,oBAAoB;IACpB,qBAAqB;IACrB,4BAA4B,EAAA;EA9EjC;IAmFE,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;IACX,SAAS;IACT,iBAAiB;IACjB,mBAAmB;IAEnB,iDAA6D;IAC7D,mBE7FmB;IF8FnB,cEzFmB,EAAA;IFHrB;MA+FG,mBErFiB;MFsFjB,cEjFiB,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.PluginItem {\n\t@extend %material_button;\n\n\tbackground-color: #fff;\n\tborder-color: $neutral-100;\n\tbox-sizing: content-box;\n\tpadding: 8px;\n\n\tdisplay: grid;\n\tgrid-gap: 8px;\n\ttext-align: left;\n\tgrid-template-rows: auto 1fr;\n\n\t& > * {\n\t\tbox-sizing: border-box;\n\t}\n\n\t&.selected {\n\t\tborder-color: $accent-400;\n\t\tbackground-color: transparentize($accent-300, 0.7);\n\n\t\t&:focus::after, &:hover::after {\n\t\t\tbackground-color: transparentize($accent-300, 0.8);\n\t\t}\n\n\t\t.MediaItem-Image.icon {\n\t\t\tbackground-color: transparentize($accent-500, 0.7);\n\t\t}\n\t}\n\n\t.PluginItem-Cover {\n\t\theight: 0;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tpadding-top: 56.25%;\n\n\t\t& > img {\n\t\t\tposition: absolute;\n\t\t\tuser-select: none;\n\t\t\tpointer-events: none;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tobject-fit: cover;\n\t\t\tborder-radius: 4px;\n\t\t}\n\t}\n\n\t.PluginItem-Content {\n\t\tp.PluginItem-Author {\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 4px;\n\t\t}\n\n\t\th2.PluginItem-Title {\n\t\t\tfont-size: 24px;\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 4px;\n\t\t}\n\n\t\tp.PluginItem-Description {\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 12px;\n\t\t\tfont-weight: 400;\n\t\t\topacity: 0.8;\n\n\t    overflow: hidden;\n\t    text-overflow: ellipsis;\n\n\t\t\t// Fallbacks for multiline clamping. \n\t\t\tmax-height: 38px; \n\t\t  display: block;\n\t\n\t\t\t// Webkit specific fancy line clamping.\n\t    line-clamp: 2;\n\t    display: -webkit-box;\n\t    -webkit-line-clamp: 2;\n\t    -webkit-box-orient: vertical;\n\t\t}\n\t}\n\n\t.PluginItem-Tag {\n\t\tposition: absolute;\n\t\tdisplay: inline-block;\n\t\tbottom: 8px;\n\t\tleft: 8px;\n\t\tpadding: 4px 12px;\n\t\tborder-radius: 20px;\n\t\t\t\n\t\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-800, 0.7);\n\t\tbackground: $neutral-100;\n\t\tcolor: $neutral-600;\n\n\t\t&.Enabled {\n\t\t\tbackground: $accent-200;\n\t\t\tcolor: $accent-700;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/SelectGroup.scss":
/*!************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/SelectGroup.scss ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".SelectGroup {\n  padding: 0;\n  margin: 0; }\n", "",{"version":3,"sources":["webpack://components/SelectGroup.scss"],"names":[],"mappings":"AAAA;EACC,UAAU;EACV,SAAS,EAAA","sourcesContent":[".SelectGroup {\n\tpadding: 0;\n\tmargin: 0;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/ThemeItem.scss":
/*!**********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/ThemeItem.scss ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ThemeItem {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .ThemeItem::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ThemeItem:not(:disabled):hover::after, .ThemeItem:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ThemeItem:not(:disabled):active {\n    transition: border 0.15s; }\n  .ThemeItem:not(:disabled):focus {\n    border-color: #829ab1; }\n  .ThemeItem:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.ThemeItem {\n  background-color: #fff;\n  border-color: #d9e2ec;\n  box-sizing: content-box;\n  padding: 8px;\n  display: grid;\n  grid-gap: 8px;\n  text-align: left;\n  grid-template-rows: auto 1fr; }\n  .ThemeItem > * {\n    box-sizing: border-box; }\n  .ThemeItem.selected {\n    border-color: #54d1db;\n    background-color: rgba(135, 234, 242, 0.3); }\n    .ThemeItem.selected:focus::after, .ThemeItem.selected:hover::after {\n      background-color: rgba(135, 234, 242, 0.2); }\n    .ThemeItem.selected .MediaItem-Image.icon {\n      background-color: rgba(56, 190, 201, 0.3); }\n  .ThemeItem .ThemeItem-Cover {\n    height: 0;\n    width: 100%;\n    position: relative;\n    padding-top: 56.25%; }\n    .ThemeItem .ThemeItem-Cover > img {\n      position: absolute;\n      user-select: none;\n      pointer-events: none;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n      object-fit: cover;\n      border-radius: 4px; }\n  .ThemeItem .ThemeItem-Content p.ThemeItem-Author {\n    margin: 0;\n    margin-top: 4px; }\n  .ThemeItem .ThemeItem-Content h2.ThemeItem-Title {\n    font-size: 24px;\n    margin: 0;\n    margin-top: 4px; }\n  .ThemeItem .ThemeItem-Content p.ThemeItem-Description {\n    margin: 0;\n    margin-top: 12px;\n    font-weight: 400;\n    opacity: 0.8;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    max-height: 38px;\n    display: block;\n    line-clamp: 2;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical; }\n  .ThemeItem .ThemeItem-Tag {\n    position: absolute;\n    display: inline-block;\n    bottom: 8px;\n    left: 8px;\n    padding: 4px 12px;\n    border-radius: 20px;\n    box-shadow: 0px 2px 8px 0px rgba(36, 59, 83, 0.3);\n    background: #d9e2ec;\n    color: #486581; }\n    .ThemeItem .ThemeItem-Tag.Enabled {\n      background: #bef8fd;\n      color: #14919b; }\n", "",{"version":3,"sources":["webpack://components/ThemeItem.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAGC,sBAAsB;EACtB,qBENoB;EFOpB,uBAAuB;EACvB,YAAY;EAEZ,aAAa;EACb,aAAa;EACb,gBAAgB;EAChB,4BAA4B,EAAA;EAX7B;IAcE,sBAAsB,EAAA;EAdxB;IAkBE,qBENkB;IFOlB,0CAAkD,EAAA;IAnBpD;MAsBG,0CAAkD,EAAA;IAtBrD;MA0BG,yCAAkD,EAAA;EA1BrD;IA+BE,SAAS;IACT,WAAW;IACX,kBAAkB;IAClB,mBAAmB,EAAA;IAlCrB;MAqCG,kBAAkB;MAClB,iBAAiB;MACjB,oBAAoB;MACpB,WAAW;MACX,YAAY;MACZ,MAAM;MACN,OAAO;MACP,iBAAiB;MACjB,kBAAkB,EAAA;EA7CrB;IAmDG,SAAS;IACT,eAAe,EAAA;EApDlB;IAwDG,eAAe;IACf,SAAS;IACT,eAAe,EAAA;EA1DlB;IA8DG,SAAS;IACT,gBAAgB;IAChB,gBAAgB;IAChB,YAAY;IAEV,gBAAgB;IAChB,uBAAuB;IAGzB,gBAAgB;IACf,cAAc;IAGb,aAAa;IACb,oBAAoB;IACpB,qBAAqB;IACrB,4BAA4B,EAAA;EA9EjC;IAmFE,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;IACX,SAAS;IACT,iBAAiB;IACjB,mBAAmB;IAEnB,iDAA6D;IAC7D,mBE7FmB;IF8FnB,cEzFmB,EAAA;IFHrB;MA+FG,mBErFiB;MFsFjB,cEjFiB,EAAA","sourcesContent":["@import \"../partial/Vars\";\n@import \"../partial/Ext\";\n\n.ThemeItem {\n\t@extend %material_button;\n\n\tbackground-color: #fff;\n\tborder-color: $neutral-100;\n\tbox-sizing: content-box;\n\tpadding: 8px;\n\n\tdisplay: grid;\n\tgrid-gap: 8px;\n\ttext-align: left;\n\tgrid-template-rows: auto 1fr;\n\n\t& > * {\n\t\tbox-sizing: border-box;\n\t}\n\n\t&.selected {\n\t\tborder-color: $accent-400;\n\t\tbackground-color: transparentize($accent-300, 0.7);\n\n\t\t&:focus::after, &:hover::after {\n\t\t\tbackground-color: transparentize($accent-300, 0.8);\n\t\t}\n\n\t\t.MediaItem-Image.icon {\n\t\t\tbackground-color: transparentize($accent-500, 0.7);\n\t\t}\n\t}\n\n\t.ThemeItem-Cover {\n\t\theight: 0;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tpadding-top: 56.25%;\n\n\t\t& > img {\n\t\t\tposition: absolute;\n\t\t\tuser-select: none;\n\t\t\tpointer-events: none;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tobject-fit: cover;\n\t\t\tborder-radius: 4px;\n\t\t}\n\t}\n\n\t.ThemeItem-Content {\n\t\tp.ThemeItem-Author {\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 4px;\n\t\t}\n\n\t\th2.ThemeItem-Title {\n\t\t\tfont-size: 24px;\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 4px;\n\t\t}\n\n\t\tp.ThemeItem-Description {\n\t\t\tmargin: 0;\n\t\t\tmargin-top: 12px;\n\t\t\tfont-weight: 400;\n\t\t\topacity: 0.8;\n\n\t    overflow: hidden;\n\t    text-overflow: ellipsis;\n\n\t\t\t// Fallbacks for multiline clamping. \n\t\t\tmax-height: 38px; \n\t\t  display: block;\n\t\n\t\t\t// Webkit specific fancy line clamping.\n\t    line-clamp: 2;\n\t    display: -webkit-box;\n\t    -webkit-line-clamp: 2;\n\t    -webkit-box-orient: vertical;\n\t\t}\n\t}\n\n\t.ThemeItem-Tag {\n\t\tposition: absolute;\n\t\tdisplay: inline-block;\n\t\tbottom: 8px;\n\t\tleft: 8px;\n\t\tpadding: 4px 12px;\n\t\tborder-radius: 20px;\n\t\t\t\n\t\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-800, 0.7);\n\t\tbackground: $neutral-100;\n\t\tcolor: $neutral-600;\n\n\t\t&.Enabled {\n\t\t\tbackground: $accent-200;\n\t\t\tcolor: $accent-700;\n\t\t}\n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/CreateElementForm.sass":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/CreateElementForm.sass ***!
  \*************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".CreateElementForm input[type=text] {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.CreateElementForm input[type=text] {\n  border-color: #d9e2ec;\n  outline: 0; }\n  .CreateElementForm input:hover[type=text] {\n    border-color: #bcccdc; }\n  .CreateElementForm input:focus[type=text] {\n    border-color: #829ab1; }\n  .CreateElementForm input[type=text]::placeholder {\n    font-weight: 400;\n    color: #829ab1; }\n\n.CreateElementForm .CreateElementForm-Select, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .CreateElementForm .CreateElementForm-Select::after, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .CreateElementForm .CreateElementForm-Select:not(:disabled):hover::after, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button:not(:disabled):hover::after, .CreateElementForm .CreateElementForm-Select:not(:disabled):focus::after, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .CreateElementForm .CreateElementForm-Select:not(:disabled):active, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button:not(:disabled):active {\n    transition: border 0.15s; }\n  .CreateElementForm .CreateElementForm-Select:not(:disabled):focus, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .CreateElementForm .CreateElementForm-Select:disabled, .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.CreateElementForm {\n  width: min-content;\n  min-width: 400px; }\n  .CreateElementForm .CreateElementForm-InnerWrap {\n    min-width: 400px; }\n  .CreateElementForm .CreateElementForm-Disclaimer {\n    font-weight: normal;\n    text-align: center;\n    margin: 12px 0 8px 0; }\n  .CreateElementForm code {\n    display: block;\n    overflow: hidden;\n    width: 100%;\n    height: auto;\n    margin: 16px 0 4px 0;\n    word-wrap: break-word;\n    font-family: monospace;\n    white-space: pre-wrap; }\n  .CreateElementForm .CreateElementForm-Disclaimer, .CreateElementForm code {\n    background-color: #f0f4f8;\n    border-radius: 4px;\n    padding: 12px; }\n  .CreateElementForm .CreateElementForm-Select {\n    width: 100%;\n    padding: 12px;\n    text-align: center;\n    text-align-last: center; }\n  .CreateElementForm .CreateElementForm-ActionBar {\n    margin: 16px 0px 8px 0px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between; }\n    .CreateElementForm .CreateElementForm-ActionBar .CreateElementForm-ActionBar-Button {\n      padding: 12px; }\n  .CreateElementForm .CreateElementForm-Label {\n    display: block;\n    padding: 16px 0 8px 0;\n    user-select: none;\n    font-weight: normal;\n    color: #486581; }\n  .CreateElementForm input[type=text] {\n    padding: 12px;\n    width: 100%; }\n", "",{"version":3,"sources":["webpack://components/editor/CreateElementForm.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EC+CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFDrB;ECuDC,qBCzDoB;ED0DpB,UAAU,EAAA;EDxDX;IC2DE,qBC5DmB,EAAA;EFCrB;IC+DE,qBC9DmB,EAAA;EFDrB;ICmEE,gBAAgB;IAChB,cCnEmB,EAAA;;AFDrB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EACC,kBAAkB;EAClB,gBAAgB,EAAA;EAFjB;IAUE,gBAAgB,EAAA;EAVlB;IAaE,mBAAmB;IACnB,kBAAkB;IAClB,oBAAoB,EAAA;EAftB;IAkBE,cAAc;IACd,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,oBAAoB;IAEpB,qBAAqB;IACrB,sBAAsB;IACtB,qBAAqB,EAAA;EA1BvB;IA6BE,yBEhCmB;IFiCnB,kBAAkB;IAClB,aAAa,EAAA;EA/Bf;IAmCE,WAAW;IACX,aAAa;IACb,kBAAkB;IAClB,uBAAuB,EAAA;EAtCzB;IAyCE,wBAAwB;IACxB,aAAa;IACb,mBAAmB;IACnB,8BAA8B,EAAA;IA5ChC;MAgDG,aAAa,EAAA;EAhDhB;IAmDE,cAAc;IACd,qBAAqB;IAErB,iBAAiB;IACjB,mBAAmB;IACnB,cErDmB,EAAA;EFHrB;IA4DE,aAAa;IACb,WAAW,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.CreateElementForm {\n\twidth: min-content;\n\tmin-width: 400px;\n\t// display: grid\n\t// grid-gap: 8px\n\n\t// .CreateElementForm-Toolbar\n\t// \t@extend %card_toolbar\n\n\t.CreateElementForm-InnerWrap {\n\t\tmin-width: 400px; }\n\n\t.CreateElementForm-Disclaimer {\n\t\tfont-weight: normal;\n\t\ttext-align: center;\n\t\tmargin: 12px 0 8px 0; }\n\n\tcode {\n\t\tdisplay: block;\n\t\toverflow: hidden;\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tmargin: 16px 0 4px 0;\n\n\t\tword-wrap: break-word;\n\t\tfont-family: monospace;\n\t\twhite-space: pre-wrap; }\n\n\t.CreateElementForm-Disclaimer, code {\n\t\tbackground-color: $neutral-000;\n\t\tborder-radius: 4px;\n\t\tpadding: 12px; }\n\n\t.CreateElementForm-Select {\n\t\t@extend %material_button;\n\t\twidth: 100%;\n\t\tpadding: 12px;\n\t\ttext-align: center;\n\t\ttext-align-last: center; }\n\n\t.CreateElementForm-ActionBar {\n\t\tmargin: 16px 0px 8px 0px;\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tjustify-content: space-between;\n\n\t\t.CreateElementForm-ActionBar-Button {\n\t\t\t@extend %material_button;\n\t\t\tpadding: 12px; } }\n\n\t.CreateElementForm-Label {\n\t\tdisplay: block;\n\t\tpadding: 16px 0 8px 0;\n\n\t\tuser-select: none;\n\t\tfont-weight: normal;\n\t\tcolor: $neutral-600; }\n\n\tinput[type=text] {\n\t\t@extend %material_input;\n\t\tpadding: 12px;\n\t\twidth: 100%; } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/EditElementTree.sass":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/EditElementTree.sass ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".EditElementTree .EditElementTree-TreeItem, .EditElementTree select {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .EditElementTree .EditElementTree-TreeItem::after, .EditElementTree select::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .EditElementTree .EditElementTree-TreeItem:not(:disabled):hover::after, .EditElementTree select:not(:disabled):hover::after, .EditElementTree .EditElementTree-TreeItem:not(:disabled):focus::after, .EditElementTree select:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .EditElementTree .EditElementTree-TreeItem:not(:disabled):active, .EditElementTree select:not(:disabled):active {\n    transition: border 0.15s; }\n  .EditElementTree .EditElementTree-TreeItem:not(:disabled):focus, .EditElementTree select:not(:disabled):focus {\n    border-color: #829ab1; }\n  .EditElementTree .EditElementTree-TreeItem:disabled, .EditElementTree select:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.EditElementTree ul {\n  margin-top: 4px;\n  margin-bottom: 8px; }\n\n.EditElementTree .EditElementTree-TreeItem {\n  padding: 8px;\n  margin-bottom: 4px; }\n\n.EditElementTree .EditElementTree-IncludeItem {\n  width: min-content;\n  padding: 8px;\n  margin-bottom: 4px;\n  border: 2px solid #bcccdc;\n  border-radius: 4px; }\n\n.EditElementTree select {\n  width: 100%;\n  padding: 12px 8px; }\n", "",{"version":3,"sources":["webpack://components/editor/EditElementTree.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EAEE,eAAe;EACf,kBAAkB,EAAA;;AAHpB;EAQE,YAAY;EACZ,kBAAkB,EAAA;;AATpB;EAYE,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAElB,yBEjBmB;EFkBnB,kBAAkB,EAAA;;AAjBpB;EAqBE,WAAW;EACX,iBAAiB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.EditElementTree {\n\tul {\n\t\tmargin-top: 4px;\n\t\tmargin-bottom: 8px; }\n\n\t.EditElementTree-TreeItem {\n\t\t@extend %material_button;\n\n\t\tpadding: 8px;\n\t\tmargin-bottom: 4px; }\n\n\t.EditElementTree-IncludeItem {\n\t\twidth: min-content;\n\t\tpadding: 8px;\n\t\tmargin-bottom: 4px;\n\n\t\tborder: 2px solid $neutral-200;\n\t\tborder-radius: 4px; }\n\n\tselect {\n\t\t@extend %material_button;\n\t\twidth: 100%;\n\t\tpadding: 12px 8px; } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementEditor.sass":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/ElementEditor.sass ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ElementEditor .ElementEditor-ActionBar button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .ElementEditor .ElementEditor-ActionBar button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ElementEditor .ElementEditor-ActionBar button:not(:disabled):hover::after, .ElementEditor .ElementEditor-ActionBar button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ElementEditor .ElementEditor-ActionBar button:not(:disabled):active {\n    transition: border 0.15s; }\n  .ElementEditor .ElementEditor-ActionBar button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .ElementEditor .ElementEditor-ActionBar button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.ElementEditor {\n  min-width: 400px; }\n  .ElementEditor .ElementEditor-ActionBar {\n    margin: 16px 0px 8px 0px;\n    display: flex;\n    flex-direction: row-reverse;\n    justify-content: space-between; }\n    .ElementEditor .ElementEditor-ActionBar button {\n      padding: 12px; }\n", "",{"version":3,"sources":["webpack://components/editor/ElementEditor.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EACC,gBAAgB,EAAA;EADjB;IAIE,wBAAwB;IACxB,aAAa;IACb,2BAA2B;IAC3B,8BAA8B,EAAA;IAPhC;MAWG,aAAa,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.ElementEditor {\n\tmin-width: 400px;\n\n\t.ElementEditor-ActionBar {\n\t\tmargin: 16px 0px 8px 0px;\n\t\tdisplay: flex;\n\t\tflex-direction: row-reverse;\n\t\tjustify-content: space-between;\n\n\t\tbutton {\n\t\t\t@extend %material_button;\n\t\t\tpadding: 12px; } } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropArray.sass":
/*!************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropArray.sass ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ElementPropArray {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: auto;\n  overflow: auto; }\n  .ElementPropArray .ElementPropArray-Label, .ElementPropArray .ElementPropArray-Disclaimer {\n    display: block;\n    padding: 16px 0 8px 0;\n    user-select: none;\n    font-weight: normal;\n    color: #486581; }\n  .ElementPropArray .ElementPropArray-Disclaimer {\n    padding-top: 0;\n    font-style: italic;\n    color: #243b53; }\n", "",{"version":3,"sources":["webpack://components/editor/ElementPropArray.sass","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EACC,cAAc;EACd,kBAAkB;EAElB,WAAW;EACX,YAAY;EACZ,cAAc,EAAA;EANf;IASE,cAAc;IACd,qBAAqB;IAErB,iBAAiB;IACjB,mBAAmB;IACnB,cCXmB,EAAA;EDHrB;IAiBE,cAAc;IACd,kBAAkB;IAClB,cCdmB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.ElementPropArray {\n\tdisplay: block;\n\tposition: relative;\n\n\twidth: 100%;\n\theight: auto;\n\toverflow: auto;\n\n\t.ElementPropArray-Label, .ElementPropArray-Disclaimer {\n\t\tdisplay: block;\n\t\tpadding: 16px 0 8px 0;\n\n\t\tuser-select: none;\n\t\tfont-weight: normal;\n\t\tcolor: $neutral-600; }\n\n\t.ElementPropArray-Disclaimer {\n\t\tpadding-top: 0;\n\t\tfont-style: italic;\n\t\tcolor: $neutral-800; } }\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropInput.sass":
/*!************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropInput.sass ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ElementPropInput input[type=text], .ElementPropInput input[type=number], .ElementPropInput textarea {\n  border-radius: 4px;\n  border-width: 1px;\n  border-style: solid;\n  border-color: #829ab1; }\n\n.ElementPropInput input[type=text], .ElementPropInput input[type=number], .ElementPropInput textarea {\n  border-color: #d9e2ec;\n  outline: 0; }\n  .ElementPropInput input:hover[type=text], .ElementPropInput input:hover[type=number], .ElementPropInput textarea:hover {\n    border-color: #bcccdc; }\n  .ElementPropInput input:focus[type=text], .ElementPropInput input:focus[type=number], .ElementPropInput textarea:focus {\n    border-color: #829ab1; }\n  .ElementPropInput input[type=text]::placeholder, .ElementPropInput input[type=number]::placeholder, .ElementPropInput textarea::placeholder {\n    font-weight: 400;\n    color: #829ab1; }\n\n.ElementPropInput {\n  display: block;\n  position: relative;\n  width: 100%;\n  height: auto;\n  overflow: auto; }\n  .ElementPropInput .ElementPropInput-Label {\n    display: block;\n    padding: 16px 0 8px 0;\n    user-select: none;\n    font-weight: normal;\n    color: #486581; }\n  .ElementPropInput input[type=text], .ElementPropInput input[type=number], .ElementPropInput textarea {\n    padding: 12px;\n    width: 100%;\n    resize: none; }\n  .ElementPropInput input[type=checkbox] {\n    position: absolute;\n    top: 16px;\n    right: 0;\n    width: 18px;\n    height: 18px;\n    margin: 0; }\n  .ElementPropInput .ElementPropInput-Code {\n    font-family: monospace; }\n", "",{"version":3,"sources":["webpack://components/editor/ElementPropInput.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;EC+CC,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,qBCjDoB,EAAA;;AFDrB;ECuDC,qBCzDoB;ED0DpB,UAAU,EAAA;EDxDX;IC2DE,qBC5DmB,EAAA;EFCrB;IC+DE,qBC9DmB,EAAA;EFDrB;ICmEE,gBAAgB;IAChB,cCnEmB,EAAA;;AFDrB;EACC,cAAc;EACd,kBAAkB;EAElB,WAAW;EACX,YAAY;EACZ,cAAc,EAAA;EANf;IASE,cAAc;IACd,qBAAqB;IAErB,iBAAiB;IACjB,mBAAmB;IACnB,cEXmB,EAAA;EFHrB;IAkBE,aAAa;IACb,WAAW;IACX,YAAY,EAAA;EApBd;IAuBE,kBAAkB;IAClB,SAAS;IACT,QAAQ;IACR,WAAW;IACX,YAAY;IACZ,SAAS,EAAA;EA5BX;IA+BE,sBAAsB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.ElementPropInput {\n\tdisplay: block;\n\tposition: relative;\n\n\twidth: 100%;\n\theight: auto;\n\toverflow: auto;\n\n\t.ElementPropInput-Label {\n\t\tdisplay: block;\n\t\tpadding: 16px 0 8px 0;\n\n\t\tuser-select: none;\n\t\tfont-weight: normal;\n\t\tcolor: $neutral-600; }\n\n\tinput[type=text], input[type=number], textarea {\n\t\t@extend %material_input;\n\t\tpadding: 12px;\n\t\twidth: 100%;\n\t\tresize: none; }\n\n\tinput[type=checkbox] {\n\t\tposition: absolute;\n\t\ttop: 16px;\n\t\tright: 0;\n\t\twidth: 18px;\n\t\theight: 18px;\n\t\tmargin: 0; }\n\n\t.ElementPropInput-Code {\n\t\tfont-family: monospace; } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropsEditor.sass":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropsEditor.sass ***!
  \**************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ElementPropsEditor-WrapLabel {\n  display: block;\n  padding: 16px 0 8px 0;\n  user-select: none;\n  font-weight: normal;\n  color: #486581; }\n\n.ElementPropsEditor-TableWrap {\n  border-left: 2px solid #bcccdc;\n  padding-left: 8px;\n  margin-top: 4px; }\n", "",{"version":3,"sources":["webpack://components/editor/ElementPropsEditor.sass","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAEA;EACC,cAAc;EACd,qBAAqB;EAErB,iBAAiB;EACjB,mBAAmB;EACnB,cCFoB,EAAA;;ADIrB;EACC,8BCToB;EDUpB,iBAAiB;EACjB,eAAe,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n\n.ElementPropsEditor-WrapLabel {\n\tdisplay: block;\n\tpadding: 16px 0 8px 0;\n\n\tuser-select: none;\n\tfont-weight: normal;\n\tcolor: $neutral-600; }\n\n.ElementPropsEditor-TableWrap {\n\tborder-left: 2px solid $neutral-200;\n\tpadding-left: 8px;\n\tmargin-top: 4px; }\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/PageEditor.sass":
/*!******************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/editor/PageEditor.sass ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".PageEditor .PageEditor-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .PageEditor .PageEditor-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .PageEditor .PageEditor-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .PageEditor .PageEditor-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.PageEditor .PageEditor-Toolbar button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .PageEditor .PageEditor-Toolbar button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PageEditor .PageEditor-Toolbar button:not(:disabled):hover::after, .PageEditor .PageEditor-Toolbar button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PageEditor .PageEditor-Toolbar button:not(:disabled):active {\n    transition: border 0.15s; }\n  .PageEditor .PageEditor-Toolbar button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .PageEditor .PageEditor-Toolbar button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.PageEditor .PageEditor-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .PageEditor .PageEditor-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .PageEditor .PageEditor-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.PageEditor .PageEditor-Toolbar {\n  margin-bottom: 16px; }\n  .PageEditor .PageEditor-Toolbar .PageEditor-Changes {\n    margin-left: 8px; }\n", "",{"version":3,"sources":["webpack://components/editor/PageEditor.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECSC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDX/B;ICkBE,WAAW;IACX,qBAAqB,EAAA;EDnBvB;ICuBE,iBAAiB,EAAA;EDvBnB;IC2BE,gBAAgB,EAAA;;AD3BlB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EC0IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDhJpB;ICmJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDtJxB;IC0JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD7JnB;EAGE,mBAAmB,EAAA;EAHrB;IAMG,gBAAgB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.PageEditor {\n\t.PageEditor-Toolbar {\n\t\t@extend %card_toolbar;\n\t\tmargin-bottom: 16px;\n\n\t\t.PageEditor-Changes {\n\t\t\tmargin-left: 8px; } } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/MainPage.scss":
/*!***************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/MainPage.scss ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MainPage-MediaCard {\n  height: min-content;\n  border-radius: 4px;\n  padding: 16px 24px;\n  background-color: #fff;\n  box-shadow: 0px 2px 8px 0px rgba(8, 30, 56, 0.1); }\n\n.MainPage-Header {\n  background-color: #fff;\n  padding: 80px 24px 112px 24px;\n  text-align: center; }\n  .MainPage-Header h1, .MainPage-Header h2 {\n    margin: 0.5em 0; }\n  .MainPage-Header h1 img {\n    width: 1em;\n    height: 1em;\n    vertical-align: -10%;\n    margin-right: 8px; }\n  .MainPage-Header h2 {\n    color: #627d98; }\n\n.MainPage-Content {\n  display: grid;\n  grid-template-columns: 400px 1000px;\n  justify-content: center;\n  padding-top: 48px;\n  grid-gap: 24px;\n  width: 100%;\n  height: 64px; }\n\n.MainPage-MediaCard {\n  margin-bottom: 24px; }\n", "",{"version":3,"sources":["webpack://components/pages/MainPage.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AA2CA;ECxCC,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAElB,sBAAsB;EACtB,gDAA8D,EAAA;;ADL/D;EACC,sBAAsB;EACtB,6BAA6B;EAC7B,kBAAkB,EAAA;EAHnB;IAME,eAAe,EAAA;EANjB;IAUE,UAAU;IACV,WAAW;IACX,oBAAoB;IACpB,iBAAiB,EAAA;EAbnB;IAiBE,cEfmB,EAAA;;AFmBrB;EAIC,aAAa;EACb,mCAHyC;EAIzC,uBAAuB;EACvB,iBAAiB;EACjB,cAAc;EAEd,WAAW;EACX,YAAY,EAAA;;AAGb;EAEC,mBAAmB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.MainPage-Header {\n\tbackground-color: #fff;\n\tpadding: 80px 24px 112px 24px;\n\ttext-align: center;\n\n\th1, h2 {\n\t\tmargin: 0.5em 0;\n\t}\n\t\n\th1 img {\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\tvertical-align: -10%;\n\t\tmargin-right: 8px;\n\t}\n\n\th2 {\n\t\tcolor: $neutral-500;\n\t}\n}\n\n.MainPage-Content {\n\t$aside-width: 400px;\n\t$content-width: $wrap-wide - $aside-width;\n\n\tdisplay: grid;\n\tgrid-template-columns: $aside-width $content-width;\n\tjustify-content: center;\n\tpadding-top: 48px;\n\tgrid-gap: 24px;\n\t\n\twidth: 100%;\n\theight: 64px;\n}\n\n%mainpage_card {\n\t@extend %card;\n\tmargin-bottom: 24px;\n}\n\n.MainPage-MediaCard {\n\t@extend %mainpage_card;\n\n\t// display: grid;\n\t// grid-gap: 16px;\n\t// grid-auto-rows: min-content;\n\t// grid-template-columns: 1fr 1fr 1fr;\n\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/MediaPage.scss":
/*!****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/MediaPage.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".MediaPage .MediaPage-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .MediaPage .MediaPage-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .MediaPage .MediaPage-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .MediaPage .MediaPage-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.MediaPage .MediaPage-Toolbar button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .MediaPage .MediaPage-Toolbar button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaPage .MediaPage-Toolbar button:not(:disabled):hover::after, .MediaPage .MediaPage-Toolbar button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .MediaPage .MediaPage-Toolbar button:not(:disabled):active {\n    transition: border 0.15s; }\n  .MediaPage .MediaPage-Toolbar button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .MediaPage .MediaPage-Toolbar button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.MediaPage .MediaPage-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .MediaPage .MediaPage-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .MediaPage .MediaPage-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.MediaPage .MediaPage-Media {\n  display: grid;\n  width: 100%;\n  height: auto;\n  grid-gap: 8px;\n  margin-top: 16px;\n  grid-template-columns: 1fr; }\n  .MediaPage .MediaPage-Media.Grid {\n    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); }\n\n.MediaPage .MediaPage-NoMedia {\n  text-align: center;\n  color: #627d98;\n  margin: 32px 0px 48px 0px; }\n\n.MediaPage > img {\n  width: 24px;\n  height: 24px;\n  margin-right: 8px;\n  vertical-align: -33%; }\n", "",{"version":3,"sources":["webpack://components/pages/MediaPage.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECSC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDX/B;ICkBE,WAAW;IACX,qBAAqB,EAAA;EDnBvB;ICuBE,iBAAiB,EAAA;EDvBnB;IC2BE,gBAAgB,EAAA;;AD3BlB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EC0IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDhJpB;ICmJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDtJxB;IC0JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD7JnB;EAEE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,0BAA0B,EAAA;EAP5B;IAUG,2DAA2D,EAAA;;AAV9D;EAeE,kBAAkB;EAClB,cEdmB;EFenB,yBAAyB,EAAA;;AAjB3B;EAqBE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,oBAAoB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.MediaPage {\n\t.MediaPage-Media {\n\t\tdisplay: grid;\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tgrid-gap: 8px;\n\t\tmargin-top: 16px;\n\t\tgrid-template-columns: 1fr;\n\n\t\t&.Grid {\n\t\t\tgrid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n\t\t}\n\t}\n\n\t.MediaPage-NoMedia {\n\t\ttext-align: center;\n\t\tcolor: $neutral-500;\n\t\tmargin: 32px 0px 48px 0px; \n\t}\n\n\t& > img {\n\t\twidth: 24px;\n\t\theight: 24px;\n\t\tmargin-right: 8px;\n\t\tvertical-align: -33%;\n\t}\n\n\t.MediaPage-Toolbar {\n\t\t@extend %card_toolbar;\n\t}\n}\n\n// .MainPage-MediaCard {\n// \t@extend %card;\n\n// \t// display: grid;\n// \t// grid-gap: 16px;\n// \t// grid-auto-rows: min-content;\n// \t// grid-template-columns: 1fr 1fr 1fr;\n\n// }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/Page.sass":
/*!***********************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/Page.sass ***!
  \***********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".Page .Page-Card {\n  height: min-content;\n  border-radius: 4px;\n  padding: 16px 24px;\n  background-color: #fff;\n  box-shadow: 0px 2px 8px 0px rgba(8, 30, 56, 0.1); }\n\n.Page .Page-Card {\n  display: block;\n  width: calc(100% - 32px);\n  max-width: 1400px;\n  margin: 48px auto; }\n  @media screen and (max-width: 1432px) {\n    .Page .Page-Card {\n      margin: 48px 16px; } }\n", "",{"version":3,"sources":["webpack://components/pages/Page.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECAC,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAElB,sBAAsB;EACtB,gDAA8D,EAAA;;ADL/D;EAIE,cAAc;EACd,wBAAwB;EACxB,iBEmBgB;EFlBhB,iBAAiB,EAAA;EAEjB;IATF;MAUG,iBAAiB,EAAA,EAAK","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.Page {\n\t.Page-Card {\n\t\t@extend %card;\n\n\t\tdisplay: block;\n\t\twidth: calc(100% - 32px);\n\t\tmax-width: $wrap-wide;\n\t\tmargin: 48px auto;\n\n\t\t@media screen and (max-width: $wrap-wide + 32px) {\n\t\t\tmargin: 48px 16px; } } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PagePage.sass":
/*!***************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/PagePage.sass ***!
  \***************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PagesPage.sass":
/*!****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/PagesPage.sass ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".PagesPage .PagesPage-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .PagesPage .PagesPage-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .PagesPage .PagesPage-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .PagesPage .PagesPage-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.PagesPage .PagesPage-Toolbar button, .PagesPage .PagesPage-Pages .PagesPage-PageItem {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .PagesPage .PagesPage-Toolbar button::after, .PagesPage .PagesPage-Pages .PagesPage-PageItem::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PagesPage .PagesPage-Toolbar button:not(:disabled):hover::after, .PagesPage .PagesPage-Pages .PagesPage-PageItem:not(:disabled):hover::after, .PagesPage .PagesPage-Toolbar button:not(:disabled):focus::after, .PagesPage .PagesPage-Pages .PagesPage-PageItem:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PagesPage .PagesPage-Toolbar button:not(:disabled):active, .PagesPage .PagesPage-Pages .PagesPage-PageItem:not(:disabled):active {\n    transition: border 0.15s; }\n  .PagesPage .PagesPage-Toolbar button:not(:disabled):focus, .PagesPage .PagesPage-Pages .PagesPage-PageItem:not(:disabled):focus {\n    border-color: #829ab1; }\n  .PagesPage .PagesPage-Toolbar button:disabled, .PagesPage .PagesPage-Pages .PagesPage-PageItem:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.PagesPage .PagesPage-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .PagesPage .PagesPage-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .PagesPage .PagesPage-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.PagesPage .PagesPage-Pages {\n  display: grid;\n  grid-gap: 8px;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  margin: 0;\n  margin-top: 16px;\n  padding: 0; }\n  .PagesPage .PagesPage-Pages .PagesPage-PageItem {\n    display: block;\n    width: 100%;\n    text-align: left;\n    background: transparent;\n    border-color: #d9e2ec;\n    user-select: none;\n    padding: 8px; }\n    .PagesPage .PagesPage-Pages .PagesPage-PageItem p {\n      margin-top: 0em;\n      margin-bottom: 0.3em;\n      overflow: hidden;\n      white-space: nowrap;\n      text-overflow: ellipsis; }\n    .PagesPage .PagesPage-Pages .PagesPage-PageItem p.PagesPage-PageItemTitle {\n      font-size: 18px; }\n    .PagesPage .PagesPage-Pages .PagesPage-PageItem p.PagesPage-PageItemDescription {\n      opacity: 0.8;\n      font-size: 14px; }\n    .PagesPage .PagesPage-Pages .PagesPage-PageItem p.PagesPage-PageItemPath {\n      opacity: 0.7;\n      font-size: 14px;\n      margin-bottom: 0; }\n", "",{"version":3,"sources":["webpack://components/pages/PagesPage.sass","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAGA;ECSC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDX/B;ICkBE,WAAW;IACX,qBAAqB,EAAA;EDnBvB;ICuBE,iBAAiB,EAAA;EDvBnB;IC2BE,gBAAgB,EAAA;;AD3BlB;ECyEC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDnFlD;ICwFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDrF5C;ICgHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDrF5C;ICyHG,wBCpGW,EAAA;EFrBd;IC6HG,qBC5HkB,EAAA;EFDrB;ICkIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFFrB;EC0IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDhJpB;ICmJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDtJxB;IC0JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD7JnB;EAKE,aAAa;EACb,aAAa;EACb,2DAA2D;EAE3D,SAAS;EACT,gBAAgB;EAChB,UAAU,EAAA;EAXZ;IAeG,cAAc;IACd,WAAW;IACX,gBAAgB;IAEhB,uBAAuB;IACvB,qBEtBkB;IFuBlB,iBAAiB;IACjB,YAAY,EAAA;IAtBf;MAyBI,eAAe;MACf,oBAAoB;MAEpB,gBAAgB;MAChB,mBAAmB;MACnB,uBAAuB,EAAA;IA9B3B;MAkCI,eAAe,EAAA;IAlCnB;MAsCI,YAAY;MACZ,eAAe,EAAA;IAvCnB;MA2CI,YAAY;MACZ,eAAe;MACf,gBAAgB,EAAA","sourcesContent":["@import \"../../partial/Vars\";\n@import \"../../partial/Ext\";\n\n.PagesPage {\n\t.PagesPage-Toolbar {\n\t\t@extend %card_toolbar; }\n\n\t.PagesPage-Pages {\n\t\tdisplay: grid;\n\t\tgrid-gap: 8px;\n\t\tgrid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n\n\t\tmargin: 0;\n\t\tmargin-top: 16px;\n\t\tpadding: 0;\n\n\t\t.PagesPage-PageItem {\n\t\t\t@extend %material_button;\n\t\t\tdisplay: block;\n\t\t\twidth: 100%;\n\t\t\ttext-align: left;\n\n\t\t\tbackground: transparent;\n\t\t\tborder-color: $neutral-100;\n\t\t\tuser-select: none;\n\t\t\tpadding: 8px;\n\n\t\t\tp {\n\t\t\t\tmargin-top: 0em;\n\t\t\t\tmargin-bottom: 0.3em;\n\n\t\t\t\toverflow: hidden;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttext-overflow: ellipsis; }\n\n\n\t\t\tp.PagesPage-PageItemTitle {\n\t\t\t\tfont-size: 18px; }\n\n\n\t\t\tp.PagesPage-PageItemDescription {\n\t\t\t\topacity: 0.8;\n\t\t\t\tfont-size: 14px; }\n\n\n\t\t\tp.PagesPage-PageItemPath {\n\t\t\t\topacity: 0.7;\n\t\t\t\tfont-size: 14px;\n\t\t\t\tmargin-bottom: 0; } } } }\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PluginsPage.scss":
/*!******************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/PluginsPage.scss ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".PluginsPage .PluginsPage-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .PluginsPage .PluginsPage-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .PluginsPage .PluginsPage-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .PluginsPage .PluginsPage-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.PluginsPage .PluginsPage-Toolbar button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .PluginsPage .PluginsPage-Toolbar button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PluginsPage .PluginsPage-Toolbar button:not(:disabled):hover::after, .PluginsPage .PluginsPage-Toolbar button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .PluginsPage .PluginsPage-Toolbar button:not(:disabled):active {\n    transition: border 0.15s; }\n  .PluginsPage .PluginsPage-Toolbar button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .PluginsPage .PluginsPage-Toolbar button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.PluginsPage .PluginsPage-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .PluginsPage .PluginsPage-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .PluginsPage .PluginsPage-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.PluginsPage .PluginsPage-Plugins {\n  display: grid;\n  width: 100%;\n  height: auto;\n  grid-gap: 8px;\n  margin-top: 16px;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }\n\n.PluginsPage .PluginsPage-NoPlugins {\n  text-align: center;\n  color: #627d98;\n  margin: 32px 0px 48px 0px; }\n", "",{"version":3,"sources":["webpack://components/pages/PluginsPage.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAEA;ECUC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDZ/B;ICmBE,WAAW;IACX,qBAAqB,EAAA;EDpBvB;ICwBE,iBAAiB,EAAA;EDxBnB;IC4BE,gBAAgB,EAAA;;AD5BlB;EC0EC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDpFlD;ICyFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDtF5C;ICiHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDtF5C;IC0HG,wBCpGW,EAAA;EFtBd;IC8HG,qBC5HkB,EAAA;EFFrB;ICmIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFHrB;EC2IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDjJpB;ICoJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDvJxB;IC2JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD9JnB;EAEE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,4DAA4D,EAAA;;AAP9D;EAeE,kBAAkB;EAClB,cEbmB;EFcnB,yBAAyB,EAAA","sourcesContent":["@import \"../../partial/Ext\";\n\n.PluginsPage {\n\t.PluginsPage-Plugins {\n\t\tdisplay: grid;\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tgrid-gap: 8px;\n\t\tmargin-top: 16px;\n\t\tgrid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n\t}\n\n\t.PluginsPage-Toolbar {\n\t\t@extend %card_toolbar;\n\t}\n\n\t.PluginsPage-NoPlugins {\n\t\ttext-align: center;\n\t\tcolor: $neutral-500;\n\t\tmargin: 32px 0px 48px 0px; \n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/ThemesPage.scss":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/cjs.js!C:/Users/100To/Documents/AuriServe/node_modules/sass-loader/dist/cjs.js!./components/pages/ThemesPage.scss ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, ".ThemesPage .ThemesPage-Toolbar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n  .ThemesPage .ThemesPage-Toolbar .separator {\n    width: 24px;\n    display: inline-block; }\n  .ThemesPage .ThemesPage-Toolbar div:first-of-type button {\n    margin-right: 8px; }\n  .ThemesPage .ThemesPage-Toolbar div:last-of-type:not(:first-of-type) button {\n    margin-left: 8px; }\n\n.ThemesPage .ThemesPage-Toolbar button {\n  position: relative;\n  background-color: transparent;\n  cursor: pointer;\n  border: none;\n  outline: 0;\n  user-select: none;\n  border-radius: 4px;\n  text-decoration: none;\n  border: 1px solid transparent;\n  background: rgba(159, 179, 200, 0.15); }\n  .ThemesPage .ThemesPage-Toolbar button::after {\n    content: \" \";\n    display: block;\n    position: absolute;\n    user-select: none;\n    pointer-events: none;\n    top: -1px;\n    left: -1px;\n    right: -1px;\n    bottom: -1px;\n    margin: 4px;\n    transform: scale(0.87);\n    border-radius: inherit;\n    background: rgba(130, 154, 177, 0);\n    transition: background 0.3s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02) 0.075s, margin 0.5s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ThemesPage .ThemesPage-Toolbar button:not(:disabled):hover::after, .ThemesPage .ThemesPage-Toolbar button:not(:disabled):focus::after {\n    margin: 0px;\n    transform: scale(1);\n    background: rgba(130, 154, 177, 0.15);\n    transition: background 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), transform 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02), margin 0.15s cubic-bezier(0.1, 0.43, 0.43, 1.02); }\n  .ThemesPage .ThemesPage-Toolbar button:not(:disabled):active {\n    transition: border 0.15s; }\n  .ThemesPage .ThemesPage-Toolbar button:not(:disabled):focus {\n    border-color: #829ab1; }\n  .ThemesPage .ThemesPage-Toolbar button:disabled {\n    cursor: auto;\n    opacity: 0.65;\n    color: #627d98; }\n\n.ThemesPage .ThemesPage-Toolbar button {\n  display: inline-block;\n  height: 48px;\n  padding: 8px;\n  border-radius: 24px; }\n  .ThemesPage .ThemesPage-Toolbar button img {\n    width: 30px;\n    height: 30px;\n    pointer-events: none;\n    vertical-align: middle; }\n  .ThemesPage .ThemesPage-Toolbar button span {\n    color: #334e68;\n    vertical-align: middle;\n    padding-right: 8px;\n    padding-left: 8px; }\n\n.ThemesPage .ThemesPage-Themes {\n  display: grid;\n  width: 100%;\n  height: auto;\n  grid-gap: 8px;\n  margin-top: 16px;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }\n\n.ThemesPage .ThemesPage-NoThemes {\n  text-align: center;\n  color: #627d98;\n  margin: 32px 0px 48px 0px; }\n", "",{"version":3,"sources":["webpack://components/pages/ThemesPage.scss","webpack://partial/_Ext.scss","webpack://partial/_Vars.scss"],"names":[],"mappings":"AAEA;ECUC,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;EDZ/B;ICmBE,WAAW;IACX,qBAAqB,EAAA;EDpBvB;ICwBE,iBAAiB,EAAA;EDxBnB;IC4BE,gBAAgB,EAAA;;AD5BlB;EC0EC,kBAAkB;EAClB,6BAA6B;EAC7B,eAAe;EACf,YAAY;EACZ,UAAU;EAEV,iBAAiB;EACjB,kBAAkB;EAClB,qBAAqB;EACrB,6BAA6B;EAC7B,qCAAiD,EAAA;EDpFlD;ICyFE,YAAY;IACZ,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,oBAAoB;IAGpB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;IAEZ,WAAW;IACX,sBAAsB;IAEtB,sBAAsB;IACtB,kCAA2C;IAE3C,2KArB0C,EAAA;EDtF5C;ICiHI,WAAW;IACX,mBAAmB;IACnB,qCAAiD;IAEjD,uKA/BwC,EAAA;EDtF5C;IC0HG,wBCpGW,EAAA;EFtBd;IC8HG,qBC5HkB,EAAA;EFFrB;ICmIE,YAAY;IACZ,aAAa;IACb,cClImB,EAAA;;AFHrB;EC2IC,qBAAqB;EAGrB,YAAY;EAEZ,YAAY;EACZ,mBAAmB,EAAA;EDjJpB;ICoJE,WAAW;IACX,YAAY;IACZ,oBAAoB;IACpB,sBAAsB,EAAA;EDvJxB;IC2JE,cCtJmB;IDuJnB,sBAAsB;IACtB,kBAAkB;IAClB,iBAAiB,EAAA;;AD9JnB;EAEE,aAAa;EACb,WAAW;EACX,YAAY;EACZ,aAAa;EACb,gBAAgB;EAChB,4DAA4D,EAAA;;AAP9D;EAeE,kBAAkB;EAClB,cEbmB;EFcnB,yBAAyB,EAAA","sourcesContent":["@import \"../../partial/Ext\";\n\n.ThemesPage {\n\t.ThemesPage-Themes {\n\t\tdisplay: grid;\n\t\twidth: 100%;\n\t\theight: auto;\n\t\tgrid-gap: 8px;\n\t\tmargin-top: 16px;\n\t\tgrid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n\t}\n\n\t.ThemesPage-Toolbar {\n\t\t@extend %card_toolbar;\n\t}\n\n\t.ThemesPage-NoThemes {\n\t\ttext-align: center;\n\t\tcolor: $neutral-500;\n\t\tmargin: 32px 0px 48px 0px; \n\t}\n}\n","@import \"Vars\";\n\n%card {\n\theight: min-content;\n\tborder-radius: 4px;\n\tpadding: 16px 24px;\n\n\tbackground-color: #fff;\n\tbox-shadow: 0px 2px 8px 0px transparentize($neutral-1000, 0.9);\n}\n\n%card_toolbar {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: space-between;\n\n\tbutton {\n\t\t@extend %material_icon_button;\n\t}\n\n\t.separator {\n\t\twidth: 24px;\n\t\tdisplay: inline-block;\n\t}\n\n\tdiv:first-of-type button {\n\t\tmargin-right: 8px;\n\t}\n\n\tdiv:last-of-type:not(:first-of-type) button {\n\t\tmargin-left: 8px;\n\t}\n}\n\n%center_wrap {\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n%para_no_collapse {\n\t// Use Japanese fullwidth spaces\n\t// to prevent line collapsing.\n\t&::before, &::after { content: \"　\"; }\n}\n\n%material_border {\n\tborder-radius: 4px;\n\tborder-width: 1px;\n\tborder-style: solid;\n\tborder-color: $neutral-400;\n}\n\n%material_input {\n\t@extend %material_border;\n\tborder-color: $neutral-100;\n\toutline: 0;\n\n\t&:hover {\n\t\tborder-color: $neutral-200;\n\t}\n\n\t&:focus {\n\t\tborder-color: $neutral-400;\n\t}\n\n\t&::placeholder {\n\t\tfont-weight: 400;\n\t\tcolor: $neutral-400;\n\t}\n}\n\n%material_button {\n\tposition: relative;\n\tbackground-color: transparent;\n\tcursor: pointer;\n\tborder: none;\n\toutline: 0;\n\n\tuser-select: none;\n\tborder-radius: 4px;\n\ttext-decoration: none;\n\tborder: 1px solid transparent;\n\tbackground: transparentize($neutral-300, 1 - .15);\n\n\t$curve: cubic-bezier(0.1, 0.43, 0.43, 1.02);\n\n\t&::after {\n\t\tcontent: \" \";\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\n\t\t// Compensate for 1px border.\n\t\ttop: -1px;\n\t\tleft: -1px;\n\t\tright: -1px;\n\t\tbottom: -1px;\n\n\t\tmargin: 4px;\n\t\ttransform: scale(0.87);\n\t\n\t\tborder-radius: inherit;\n\t\tbackground: transparentize($neutral-400, 1);\n\n\t\ttransition: background $t-med $curve, transform $t-slow $curve $t-ufast, margin $t-slow $curve;\n\t}\n\n\t&:not(:disabled) {\n\t\t&:hover, &:focus {\n\t\t\t&::after {\n\t\t\t\tmargin: 0px;\n\t\t\t\ttransform: scale(1);\n\t\t\t\tbackground: transparentize($neutral-400, 1 - .15);\n\n\t\t\t\ttransition: background $t-fast $curve, transform $t-fast $curve, margin $t-fast $curve;\n\t\t\t}\n\t\t}\n\n\t\t&:active {\n\t\t\ttransition: border $t-fast;\n\t\t}\n\n\t\t&:focus {\n\t\t\tborder-color: $neutral-400;\n\t\t}\n\t}\n\n\t&:disabled {\n\t\tcursor: auto;\n\t\topacity: 0.65;\n\t\tcolor: $neutral-500;\n\t}\n}\n\n%material_icon_button {\n\t@extend %material_button;\n\tdisplay: inline-block;\n\n\t// width: 48px;\n\theight: 48px;\n\n\tpadding: 8px;\n\tborder-radius: 24px;\n\n\timg {\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tpointer-events: none;\n\t\tvertical-align: middle;\n\t}\n\n\tspan {\n\t\tcolor: $neutral-700;\n\t\tvertical-align: middle;\n\t\tpadding-right: 8px;\n\t\tpadding-left: 8px;\n\t}\n}\n","$neutral-000: #f0f4f8;\n$neutral-100: #d9e2ec;\n$neutral-200: #bcccdc;\n$neutral-300: #9fb3c8;\n$neutral-400: #829ab1;\n$neutral-500: #627d98;\n$neutral-600: #486581;\n$neutral-700: #334e68;\n$neutral-800: #243b53;\n$neutral-900: #102a43;\n$neutral-1000:#081e38;\n\n$accent-100: #e0fcff;\n$accent-200: #bef8fd;\n$accent-300: #87eaf2;\n$accent-400: #54d1db;\n$accent-500: #38bec9;\n$accent-600: #2cb1bc;\n$accent-700: #14919b;\n$accent-800: #0e7c86;\n$accent-900: #0a6c74;\n$accent-1000:#044e54;\n\n$t-ufast: 0.075s;\n$t-fast: 0.15s;\n$t-med: 0.3s;\n$t-slow: 0.5s;\n\n$wrap-wide: 1400px;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!**************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/css-loader/dist/runtime/api.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names

module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "../../node_modules/history/esm/history.js":
/*!******************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/history/esm/history.js ***!
  \******************************************************************************/
/*! exports provided: createBrowserHistory, createHashHistory, createMemoryHistory, createLocation, locationsAreEqual, parsePath, createPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBrowserHistory", function() { return createBrowserHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHashHistory", function() { return createHashHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMemoryHistory", function() { return createMemoryHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLocation", function() { return createLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locationsAreEqual", function() { return locationsAreEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPath", function() { return createPath; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var resolve_pathname__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resolve-pathname */ "../../node_modules/resolve-pathname/esm/resolve-pathname.js");
/* harmony import */ var value_equal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! value-equal */ "../../node_modules/value-equal/esm/value-equal.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tiny-warning */ "../../node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-invariant */ "../../node_modules/tiny-invariant/dist/tiny-invariant.esm.js");






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}

function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}

function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}

function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}

function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}

function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}

function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = Object(resolve_pathname__WEBPACK_IMPORTED_MODULE_1__["default"])(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && Object(value_equal__WEBPACK_IMPORTED_MODULE_2__["default"])(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(prompt == null, 'A history supports only one prompt at a time') : undefined;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : undefined;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */


function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */


function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */


function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */


function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_4__["default"])(false, 'Browser history needs a DOM') : undefined : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : undefined;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : undefined;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : undefined;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_4__["default"])(false, 'Hash history needs a DOM') : undefined : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : undefined;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Hash history cannot push state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(false, 'Hash history cannot PUSH the same path; a new entry will not be added to the history stack') : undefined;
        setState();
      }
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(state === undefined, 'Hash history cannot replace state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(canGoWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : undefined;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



/***/ }),

/***/ "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!*******************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js");
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ "../../node_modules/js-cookie/src/js.cookie.js":
/*!**********************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/js-cookie/src/js.cookie.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;

(function (factory) {
  var registeredInModuleLoader;

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    registeredInModuleLoader = true;
  }

  if (true) {
    module.exports = factory();
    registeredInModuleLoader = true;
  }

  if (!registeredInModuleLoader) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();

    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }
})(function () {
  function extend() {
    var i = 0;
    var result = {};

    for (; i < arguments.length; i++) {
      var attributes = arguments[i];

      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }

    return result;
  }

  function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }

  function init(converter) {
    function api() {}

    function set(key, value, attributes) {
      if (typeof document === 'undefined') {
        return;
      }

      attributes = extend({
        path: '/'
      }, api.defaults, attributes);

      if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
      } // We're using "expires" because "max-age" is not supported by IE


      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

      try {
        var result = JSON.stringify(value);

        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {}

      value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
      var stringifiedAttributes = '';

      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }

        stringifiedAttributes += '; ' + attributeName;

        if (attributes[attributeName] === true) {
          continue;
        } // Considers RFC 6265 section 5.2:
        // ...
        // 3.  If the remaining unparsed-attributes contains a %x3B (";")
        //     character:
        // Consume the characters of the unparsed-attributes up to,
        // not including, the first %x3B (";") character.
        // ...


        stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
      }

      return document.cookie = key + '=' + value + stringifiedAttributes;
    }

    function get(key, json) {
      if (typeof document === 'undefined') {
        return;
      }

      var jar = {}; // To prevent the for loop in the first place assign an empty array
      // in case there are no cookies at all.

      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var cookie = parts.slice(1).join('=');

        if (!json && cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          var name = decode(parts[0]);
          cookie = (converter.read || converter)(cookie, name) || decode(cookie);

          if (json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          jar[name] = cookie;

          if (key === name) {
            break;
          }
        } catch (e) {}
      }

      return key ? jar[key] : jar;
    }

    api.set = set;

    api.get = function (key) {
      return get(key, false
      /* read as raw */
      );
    };

    api.getJSON = function (key) {
      return get(key, true
      /* read as json */
      );
    };

    api.remove = function (key, attributes) {
      set(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.defaults = {};
    api.withConverter = init;
    return api;
  }

  return init(function () {});
});

/***/ }),

/***/ "../../node_modules/mini-create-react-context/dist/esm/index.js":
/*!***************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/mini-create-react-context/dist/esm/index.js ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tiny-warning */ "../../node_modules/tiny-warning/dist/tiny-warning.esm.js");




var MAX_SIGNED_31_BIT_INT = 1073741823;
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

function getUniqueId() {
  var key = '__global_unique_id__';
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
}

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + getUniqueId() + '__';

  var Provider = /*#__PURE__*/function (_Component) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Provider, _Component);

    function Provider() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

          if (true) {
            Object(tiny_warning__WEBPACK_IMPORTED_MODULE_3__["default"])((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: ' + changedBits);
          }

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired, _Provider$childContex);

  var Consumer = /*#__PURE__*/function (_Component2) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(Consumer, _Component2);

    function Consumer() {
      var _this2;

      _this2 = _Component2.apply(this, arguments) || this;
      _this2.state = {
        value: _this2.getValue()
      };

      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    var _proto2 = Consumer.prototype;

    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }

      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

var index = react__WEBPACK_IMPORTED_MODULE_0__["default"].createContext || createReactContext;
/* harmony default export */ __webpack_exports__["default"] = (index);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../../node_modules/moment/locale sync recursive \\b\\B":
/*!*******************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/moment/locale sync \b\B ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../node_modules/moment/locale sync recursive \\b\\B";

/***/ }),

/***/ "../../node_modules/moment/moment.js":
/*!************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/moment/moment.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var require;//! moment.js
//! version : 2.28.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
;

(function (global, factory) {
   true ? module.exports = factory() : undefined;
})(this, function () {
  'use strict';

  var hookCallback;

  function hooks() {
    return hookCallback.apply(null, arguments);
  } // This is done to register the method called with moment()
  // without creating circular dependencies.


  function setHookCallback(callback) {
    hookCallback = callback;
  }

  function isArray(input) {
    return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
  }

  function isObject(input) {
    // IE8 will treat undefined and null as object if it wasn't for
    // input != null
    return input != null && Object.prototype.toString.call(input) === '[object Object]';
  }

  function hasOwnProp(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  function isObjectEmpty(obj) {
    if (Object.getOwnPropertyNames) {
      return Object.getOwnPropertyNames(obj).length === 0;
    } else {
      var k;

      for (k in obj) {
        if (hasOwnProp(obj, k)) {
          return false;
        }
      }

      return true;
    }
  }

  function isUndefined(input) {
    return input === void 0;
  }

  function isNumber(input) {
    return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
  }

  function isDate(input) {
    return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
  }

  function map(arr, fn) {
    var res = [],
        i;

    for (i = 0; i < arr.length; ++i) {
      res.push(fn(arr[i], i));
    }

    return res;
  }

  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }

    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }

    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }

    return a;
  }

  function createUTC(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, true).utc();
  }

  function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidEra: null,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false,
      parsedDateParts: [],
      era: null,
      meridiem: null,
      rfc2822: false,
      weekdayMismatch: false
    };
  }

  function getParsingFlags(m) {
    if (m._pf == null) {
      m._pf = defaultParsingFlags();
    }

    return m._pf;
  }

  var some;

  if (Array.prototype.some) {
    some = Array.prototype.some;
  } else {
    some = function (fun) {
      var t = Object(this),
          len = t.length >>> 0,
          i;

      for (i = 0; i < len; i++) {
        if (i in t && fun.call(this, t[i], i, t)) {
          return true;
        }
      }

      return false;
    };
  }

  function isValid(m) {
    if (m._isValid == null) {
      var flags = getParsingFlags(m),
          parsedParts = some.call(flags.parsedDateParts, function (i) {
        return i != null;
      }),
          isNowValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);

      if (m._strict) {
        isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
      }

      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
    }

    return m._isValid;
  }

  function createInvalid(flags) {
    var m = createUTC(NaN);

    if (flags != null) {
      extend(getParsingFlags(m), flags);
    } else {
      getParsingFlags(m).userInvalidated = true;
    }

    return m;
  } // Plugins that add properties should also add the key here (null value),
  // so we can properly clone ourselves.


  var momentProperties = hooks.momentProperties = [],
      updateInProgress = false;

  function copyConfig(to, from) {
    var i, prop, val;

    if (!isUndefined(from._isAMomentObject)) {
      to._isAMomentObject = from._isAMomentObject;
    }

    if (!isUndefined(from._i)) {
      to._i = from._i;
    }

    if (!isUndefined(from._f)) {
      to._f = from._f;
    }

    if (!isUndefined(from._l)) {
      to._l = from._l;
    }

    if (!isUndefined(from._strict)) {
      to._strict = from._strict;
    }

    if (!isUndefined(from._tzm)) {
      to._tzm = from._tzm;
    }

    if (!isUndefined(from._isUTC)) {
      to._isUTC = from._isUTC;
    }

    if (!isUndefined(from._offset)) {
      to._offset = from._offset;
    }

    if (!isUndefined(from._pf)) {
      to._pf = getParsingFlags(from);
    }

    if (!isUndefined(from._locale)) {
      to._locale = from._locale;
    }

    if (momentProperties.length > 0) {
      for (i = 0; i < momentProperties.length; i++) {
        prop = momentProperties[i];
        val = from[prop];

        if (!isUndefined(val)) {
          to[prop] = val;
        }
      }
    }

    return to;
  } // Moment prototype object


  function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);

    if (!this.isValid()) {
      this._d = new Date(NaN);
    } // Prevent infinite loop in case updateOffset creates new moment
    // objects.


    if (updateInProgress === false) {
      updateInProgress = true;
      hooks.updateOffset(this);
      updateInProgress = false;
    }
  }

  function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
  }

  function warn(msg) {
    if (hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(null, msg);
      }

      if (firstTime) {
        var args = [],
            arg,
            i,
            key;

        for (i = 0; i < arguments.length; i++) {
          arg = '';

          if (typeof arguments[i] === 'object') {
            arg += '\n[' + i + '] ';

            for (key in arguments[0]) {
              if (hasOwnProp(arguments[0], key)) {
                arg += key + ': ' + arguments[0][key] + ', ';
              }
            }

            arg = arg.slice(0, -2); // Remove trailing comma and space
          } else {
            arg = arguments[i];
          }

          args.push(arg);
        }

        warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + new Error().stack);
        firstTime = false;
      }

      return fn.apply(this, arguments);
    }, fn);
  }

  var deprecations = {};

  function deprecateSimple(name, msg) {
    if (hooks.deprecationHandler != null) {
      hooks.deprecationHandler(name, msg);
    }

    if (!deprecations[name]) {
      warn(msg);
      deprecations[name] = true;
    }
  }

  hooks.suppressDeprecationWarnings = false;
  hooks.deprecationHandler = null;

  function isFunction(input) {
    return typeof Function !== 'undefined' && input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
  }

  function set(config) {
    var prop, i;

    for (i in config) {
      if (hasOwnProp(config, i)) {
        prop = config[i];

        if (isFunction(prop)) {
          this[i] = prop;
        } else {
          this['_' + i] = prop;
        }
      }
    }

    this._config = config; // Lenient ordinal parsing accepts just a number in addition to
    // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
    // TODO: Remove "ordinalParse" fallback in next major release.

    this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + '|' + /\d{1,2}/.source);
  }

  function mergeConfigs(parentConfig, childConfig) {
    var res = extend({}, parentConfig),
        prop;

    for (prop in childConfig) {
      if (hasOwnProp(childConfig, prop)) {
        if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
          res[prop] = {};
          extend(res[prop], parentConfig[prop]);
          extend(res[prop], childConfig[prop]);
        } else if (childConfig[prop] != null) {
          res[prop] = childConfig[prop];
        } else {
          delete res[prop];
        }
      }
    }

    for (prop in parentConfig) {
      if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject(parentConfig[prop])) {
        // make sure changes to properties don't modify parent config
        res[prop] = extend({}, res[prop]);
      }
    }

    return res;
  }

  function Locale(config) {
    if (config != null) {
      this.set(config);
    }
  }

  var keys;

  if (Object.keys) {
    keys = Object.keys;
  } else {
    keys = function (obj) {
      var i,
          res = [];

      for (i in obj) {
        if (hasOwnProp(obj, i)) {
          res.push(i);
        }
      }

      return res;
    };
  }

  var defaultCalendar = {
    sameDay: '[Today at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  };

  function calendar(key, mom, now) {
    var output = this._calendar[key] || this._calendar['sameElse'];
    return isFunction(output) ? output.call(mom, now) : output;
  }

  function zeroFill(number, targetLength, forceSign) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? forceSign ? '+' : '' : '-') + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
  }

  var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      formatFunctions = {},
      formatTokenFunctions = {}; // token:    'M'
  // padded:   ['MM', 2]
  // ordinal:  'Mo'
  // callback: function () { this.month() + 1 }

  function addFormatToken(token, padded, ordinal, callback) {
    var func = callback;

    if (typeof callback === 'string') {
      func = function () {
        return this[callback]();
      };
    }

    if (token) {
      formatTokenFunctions[token] = func;
    }

    if (padded) {
      formatTokenFunctions[padded[0]] = function () {
        return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
      };
    }

    if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }
  }

  function removeFormattingTokens(input) {
    if (input.match(/\[[\s\S]/)) {
      return input.replace(/^\[|\]$/g, '');
    }

    return input.replace(/\\/g, '');
  }

  function makeFormatFunction(format) {
    var array = format.match(formattingTokens),
        i,
        length;

    for (i = 0, length = array.length; i < length; i++) {
      if (formatTokenFunctions[array[i]]) {
        array[i] = formatTokenFunctions[array[i]];
      } else {
        array[i] = removeFormattingTokens(array[i]);
      }
    }

    return function (mom) {
      var output = '',
          i;

      for (i = 0; i < length; i++) {
        output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
      }

      return output;
    };
  } // format date using native date object


  function formatMoment(m, format) {
    if (!m.isValid()) {
      return m.localeData().invalidDate();
    }

    format = expandFormat(format, m.localeData());
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
  }

  function expandFormat(format, locale) {
    var i = 5;

    function replaceLongDateFormatTokens(input) {
      return locale.longDateFormat(input) || input;
    }

    localFormattingTokens.lastIndex = 0;

    while (i >= 0 && localFormattingTokens.test(format)) {
      format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
      localFormattingTokens.lastIndex = 0;
      i -= 1;
    }

    return format;
  }

  var defaultLongDateFormat = {
    LTS: 'h:mm:ss A',
    LT: 'h:mm A',
    L: 'MM/DD/YYYY',
    LL: 'MMMM D, YYYY',
    LLL: 'MMMM D, YYYY h:mm A',
    LLLL: 'dddd, MMMM D, YYYY h:mm A'
  };

  function longDateFormat(key) {
    var format = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];

    if (format || !formatUpper) {
      return format;
    }

    this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function (tok) {
      if (tok === 'MMMM' || tok === 'MM' || tok === 'DD' || tok === 'dddd') {
        return tok.slice(1);
      }

      return tok;
    }).join('');
    return this._longDateFormat[key];
  }

  var defaultInvalidDate = 'Invalid date';

  function invalidDate() {
    return this._invalidDate;
  }

  var defaultOrdinal = '%d',
      defaultDayOfMonthOrdinalParse = /\d{1,2}/;

  function ordinal(number) {
    return this._ordinal.replace('%d', number);
  }

  var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    w: 'a week',
    ww: '%d weeks',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
  };

  function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return isFunction(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
  }

  function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return isFunction(format) ? format(output) : format.replace(/%s/i, output);
  }

  var aliases = {};

  function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
  }

  function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
  }

  function normalizeObjectUnits(inputObject) {
    var normalizedInput = {},
        normalizedProp,
        prop;

    for (prop in inputObject) {
      if (hasOwnProp(inputObject, prop)) {
        normalizedProp = normalizeUnits(prop);

        if (normalizedProp) {
          normalizedInput[normalizedProp] = inputObject[prop];
        }
      }
    }

    return normalizedInput;
  }

  var priorities = {};

  function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
  }

  function getPrioritizedUnits(unitsObj) {
    var units = [],
        u;

    for (u in unitsObj) {
      if (hasOwnProp(unitsObj, u)) {
        units.push({
          unit: u,
          priority: priorities[u]
        });
      }
    }

    units.sort(function (a, b) {
      return a.priority - b.priority;
    });
    return units;
  }

  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  function absFloor(number) {
    if (number < 0) {
      // -0 -> 0
      return Math.ceil(number) || 0;
    } else {
      return Math.floor(number);
    }
  }

  function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion,
        value = 0;

    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
      value = absFloor(coercedNumber);
    }

    return value;
  }

  function makeGetSet(unit, keepTime) {
    return function (value) {
      if (value != null) {
        set$1(this, unit, value);
        hooks.updateOffset(this, keepTime);
        return this;
      } else {
        return get(this, unit);
      }
    };
  }

  function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
  }

  function set$1(mom, unit, value) {
    if (mom.isValid() && !isNaN(value)) {
      if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
        value = toInt(value);

        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
      } else {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
      }
    }
  } // MOMENTS


  function stringGet(units) {
    units = normalizeUnits(units);

    if (isFunction(this[units])) {
      return this[units]();
    }

    return this;
  }

  function stringSet(units, value) {
    if (typeof units === 'object') {
      units = normalizeObjectUnits(units);
      var prioritized = getPrioritizedUnits(units),
          i;

      for (i = 0; i < prioritized.length; i++) {
        this[prioritized[i].unit](units[prioritized[i].unit]);
      }
    } else {
      units = normalizeUnits(units);

      if (isFunction(this[units])) {
        return this[units](value);
      }
    }

    return this;
  }

  var match1 = /\d/,
      //       0 - 9
  match2 = /\d\d/,
      //      00 - 99
  match3 = /\d{3}/,
      //     000 - 999
  match4 = /\d{4}/,
      //    0000 - 9999
  match6 = /[+-]?\d{6}/,
      // -999999 - 999999
  match1to2 = /\d\d?/,
      //       0 - 99
  match3to4 = /\d\d\d\d?/,
      //     999 - 9999
  match5to6 = /\d\d\d\d\d\d?/,
      //   99999 - 999999
  match1to3 = /\d{1,3}/,
      //       0 - 999
  match1to4 = /\d{1,4}/,
      //       0 - 9999
  match1to6 = /[+-]?\d{1,6}/,
      // -999999 - 999999
  matchUnsigned = /\d+/,
      //       0 - inf
  matchSigned = /[+-]?\d+/,
      //    -inf - inf
  matchOffset = /Z|[+-]\d\d:?\d\d/gi,
      // +00:00 -00:00 +0000 -0000 or Z
  matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
      // +00 -00 +00:00 -00:00 +0000 -0000 or Z
  matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
      // 123456789 123456789.123
  // any word (or two) characters or numbers including two/three word month in arabic.
  // includes scottish gaelic two word and hyphenated months
  matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      regexes;
  regexes = {};

  function addRegexToken(token, regex, strictRegex) {
    regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
      return isStrict && strictRegex ? strictRegex : regex;
    };
  }

  function getParseRegexForToken(token, config) {
    if (!hasOwnProp(regexes, token)) {
      return new RegExp(unescapeFormat(token));
    }

    return regexes[token](config._strict, config._locale);
  } // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript


  function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
      return p1 || p2 || p3 || p4;
    }));
  }

  function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }

  var tokens = {};

  function addParseToken(token, callback) {
    var i,
        func = callback;

    if (typeof token === 'string') {
      token = [token];
    }

    if (isNumber(callback)) {
      func = function (input, array) {
        array[callback] = toInt(input);
      };
    }

    for (i = 0; i < token.length; i++) {
      tokens[token[i]] = func;
    }
  }

  function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
      config._w = config._w || {};
      callback(input, config._w, config, token);
    });
  }

  function addTimeToArrayFromToken(token, input, config) {
    if (input != null && hasOwnProp(tokens, token)) {
      tokens[token](input, config._a, config, token);
    }
  }

  var YEAR = 0,
      MONTH = 1,
      DATE = 2,
      HOUR = 3,
      MINUTE = 4,
      SECOND = 5,
      MILLISECOND = 6,
      WEEK = 7,
      WEEKDAY = 8;

  function mod(n, x) {
    return (n % x + x) % x;
  }

  var indexOf;

  if (Array.prototype.indexOf) {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function (o) {
      // I know
      var i;

      for (i = 0; i < this.length; ++i) {
        if (this[i] === o) {
          return i;
        }
      }

      return -1;
    };
  }

  function daysInMonth(year, month) {
    if (isNaN(year) || isNaN(month)) {
      return NaN;
    }

    var modMonth = mod(month, 12);
    year += (month - modMonth) / 12;
    return modMonth === 1 ? isLeapYear(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
  } // FORMATTING


  addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.month() + 1;
  });
  addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
  });
  addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
  }); // ALIASES

  addUnitAlias('month', 'M'); // PRIORITY

  addUnitPriority('month', 8); // PARSING

  addRegexToken('M', match1to2);
  addRegexToken('MM', match1to2, match2);
  addRegexToken('MMM', function (isStrict, locale) {
    return locale.monthsShortRegex(isStrict);
  });
  addRegexToken('MMMM', function (isStrict, locale) {
    return locale.monthsRegex(isStrict);
  });
  addParseToken(['M', 'MM'], function (input, array) {
    array[MONTH] = toInt(input) - 1;
  });
  addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
    var month = config._locale.monthsParse(input, token, config._strict); // if we didn't find a month name, mark the date as invalid.


    if (month != null) {
      array[MONTH] = month;
    } else {
      getParsingFlags(config).invalidMonth = input;
    }
  }); // LOCALES

  var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
      defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
      MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      defaultMonthsShortRegex = matchWord,
      defaultMonthsRegex = matchWord;

  function localeMonths(m, format) {
    if (!m) {
      return isArray(this._months) ? this._months : this._months['standalone'];
    }

    return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
  }

  function localeMonthsShort(m, format) {
    if (!m) {
      return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort['standalone'];
    }

    return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
  }

  function handleStrictParse(monthName, format, strict) {
    var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();

    if (!this._monthsParse) {
      // this is not used
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];

      for (i = 0; i < 12; ++i) {
        mom = createUTC([2000, i]);
        this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
        this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'MMM') {
        ii = indexOf.call(this._shortMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._longMonthsParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._longMonthsParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortMonthsParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeMonthsParse(monthName, format, strict) {
    var i, mom, regex;

    if (this._monthsParseExact) {
      return handleStrictParse.call(this, monthName, format, strict);
    }

    if (!this._monthsParse) {
      this._monthsParse = [];
      this._longMonthsParse = [];
      this._shortMonthsParse = [];
    } // TODO: add sorting
    // Sorting makes sure if one month (or abbr) is a prefix of another
    // see sorting in computeMonthsParse


    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);

      if (strict && !this._longMonthsParse[i]) {
        this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
        this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
      }

      if (!strict && !this._monthsParse[i]) {
        regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
        this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
        return i;
      } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
        return i;
      } else if (!strict && this._monthsParse[i].test(monthName)) {
        return i;
      }
    }
  } // MOMENTS


  function setMonth(mom, value) {
    var dayOfMonth;

    if (!mom.isValid()) {
      // No op
      return mom;
    }

    if (typeof value === 'string') {
      if (/^\d+$/.test(value)) {
        value = toInt(value);
      } else {
        value = mom.localeData().monthsParse(value); // TODO: Another silent failure?

        if (!isNumber(value)) {
          return mom;
        }
      }
    }

    dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));

    mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);

    return mom;
  }

  function getSetMonth(value) {
    if (value != null) {
      setMonth(this, value);
      hooks.updateOffset(this, true);
      return this;
    } else {
      return get(this, 'Month');
    }
  }

  function getDaysInMonth() {
    return daysInMonth(this.year(), this.month());
  }

  function monthsShortRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsShortStrictRegex;
      } else {
        return this._monthsShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsShortRegex')) {
        this._monthsShortRegex = defaultMonthsShortRegex;
      }

      return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
    }
  }

  function monthsRegex(isStrict) {
    if (this._monthsParseExact) {
      if (!hasOwnProp(this, '_monthsRegex')) {
        computeMonthsParse.call(this);
      }

      if (isStrict) {
        return this._monthsStrictRegex;
      } else {
        return this._monthsRegex;
      }
    } else {
      if (!hasOwnProp(this, '_monthsRegex')) {
        this._monthsRegex = defaultMonthsRegex;
      }

      return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
    }
  }

  function computeMonthsParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom;

    for (i = 0; i < 12; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, i]);
      shortPieces.push(this.monthsShort(mom, ''));
      longPieces.push(this.months(mom, ''));
      mixedPieces.push(this.months(mom, ''));
      mixedPieces.push(this.monthsShort(mom, ''));
    } // Sorting makes sure if one month (or abbr) is a prefix of another it
    // will match the longer piece.


    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);

    for (i = 0; i < 12; i++) {
      shortPieces[i] = regexEscape(shortPieces[i]);
      longPieces[i] = regexEscape(longPieces[i]);
    }

    for (i = 0; i < 24; i++) {
      mixedPieces[i] = regexEscape(mixedPieces[i]);
    }

    this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._monthsShortRegex = this._monthsRegex;
    this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
  } // FORMATTING


  addFormatToken('Y', 0, 0, function () {
    var y = this.year();
    return y <= 9999 ? zeroFill(y, 4) : '+' + y;
  });
  addFormatToken(0, ['YY', 2], 0, function () {
    return this.year() % 100;
  });
  addFormatToken(0, ['YYYY', 4], 0, 'year');
  addFormatToken(0, ['YYYYY', 5], 0, 'year');
  addFormatToken(0, ['YYYYYY', 6, true], 0, 'year'); // ALIASES

  addUnitAlias('year', 'y'); // PRIORITIES

  addUnitPriority('year', 1); // PARSING

  addRegexToken('Y', matchSigned);
  addRegexToken('YY', match1to2, match2);
  addRegexToken('YYYY', match1to4, match4);
  addRegexToken('YYYYY', match1to6, match6);
  addRegexToken('YYYYYY', match1to6, match6);
  addParseToken(['YYYYY', 'YYYYYY'], YEAR);
  addParseToken('YYYY', function (input, array) {
    array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
  });
  addParseToken('YY', function (input, array) {
    array[YEAR] = hooks.parseTwoDigitYear(input);
  });
  addParseToken('Y', function (input, array) {
    array[YEAR] = parseInt(input, 10);
  }); // HELPERS

  function daysInYear(year) {
    return isLeapYear(year) ? 366 : 365;
  } // HOOKS


  hooks.parseTwoDigitYear = function (input) {
    return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
  }; // MOMENTS


  var getSetYear = makeGetSet('FullYear', true);

  function getIsLeapYear() {
    return isLeapYear(this.year());
  }

  function createDate(y, m, d, h, M, s, ms) {
    // can't just apply() to create a date:
    // https://stackoverflow.com/q/181348
    var date; // the date constructor remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      date = new Date(y + 400, m, d, h, M, s, ms);

      if (isFinite(date.getFullYear())) {
        date.setFullYear(y);
      }
    } else {
      date = new Date(y, m, d, h, M, s, ms);
    }

    return date;
  }

  function createUTCDate(y) {
    var date, args; // the Date.UTC function remaps years 0-99 to 1900-1999

    if (y < 100 && y >= 0) {
      args = Array.prototype.slice.call(arguments); // preserve leap years using a full 400 year cycle, then reset

      args[0] = y + 400;
      date = new Date(Date.UTC.apply(null, args));

      if (isFinite(date.getUTCFullYear())) {
        date.setUTCFullYear(y);
      }
    } else {
      date = new Date(Date.UTC.apply(null, arguments));
    }

    return date;
  } // start-of-first-week - start-of-year


  function firstWeekOffset(year, dow, doy) {
    var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
    fwd = 7 + dow - doy,
        // first-week day local weekday -- which local weekday is fwd
    fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
    return -fwdlw + fwd - 1;
  } // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday


  function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
    var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;

    if (dayOfYear <= 0) {
      resYear = year - 1;
      resDayOfYear = daysInYear(resYear) + dayOfYear;
    } else if (dayOfYear > daysInYear(year)) {
      resYear = year + 1;
      resDayOfYear = dayOfYear - daysInYear(year);
    } else {
      resYear = year;
      resDayOfYear = dayOfYear;
    }

    return {
      year: resYear,
      dayOfYear: resDayOfYear
    };
  }

  function weekOfYear(mom, dow, doy) {
    var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;

    if (week < 1) {
      resYear = mom.year() - 1;
      resWeek = week + weeksInYear(resYear, dow, doy);
    } else if (week > weeksInYear(mom.year(), dow, doy)) {
      resWeek = week - weeksInYear(mom.year(), dow, doy);
      resYear = mom.year() + 1;
    } else {
      resYear = mom.year();
      resWeek = week;
    }

    return {
      week: resWeek,
      year: resYear
    };
  }

  function weeksInYear(year, dow, doy) {
    var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
    return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
  } // FORMATTING


  addFormatToken('w', ['ww', 2], 'wo', 'week');
  addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek'); // ALIASES

  addUnitAlias('week', 'w');
  addUnitAlias('isoWeek', 'W'); // PRIORITIES

  addUnitPriority('week', 5);
  addUnitPriority('isoWeek', 5); // PARSING

  addRegexToken('w', match1to2);
  addRegexToken('ww', match1to2, match2);
  addRegexToken('W', match1to2);
  addRegexToken('WW', match1to2, match2);
  addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
    week[token.substr(0, 1)] = toInt(input);
  }); // HELPERS
  // LOCALES

  function localeWeek(mom) {
    return weekOfYear(mom, this._week.dow, this._week.doy).week;
  }

  var defaultLocaleWeek = {
    dow: 0,
    // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 6th is the first week of the year.

  };

  function localeFirstDayOfWeek() {
    return this._week.dow;
  }

  function localeFirstDayOfYear() {
    return this._week.doy;
  } // MOMENTS


  function getSetWeek(input) {
    var week = this.localeData().week(this);
    return input == null ? week : this.add((input - week) * 7, 'd');
  }

  function getSetISOWeek(input) {
    var week = weekOfYear(this, 1, 4).week;
    return input == null ? week : this.add((input - week) * 7, 'd');
  } // FORMATTING


  addFormatToken('d', 0, 'do', 'day');
  addFormatToken('dd', 0, 0, function (format) {
    return this.localeData().weekdaysMin(this, format);
  });
  addFormatToken('ddd', 0, 0, function (format) {
    return this.localeData().weekdaysShort(this, format);
  });
  addFormatToken('dddd', 0, 0, function (format) {
    return this.localeData().weekdays(this, format);
  });
  addFormatToken('e', 0, 0, 'weekday');
  addFormatToken('E', 0, 0, 'isoWeekday'); // ALIASES

  addUnitAlias('day', 'd');
  addUnitAlias('weekday', 'e');
  addUnitAlias('isoWeekday', 'E'); // PRIORITY

  addUnitPriority('day', 11);
  addUnitPriority('weekday', 11);
  addUnitPriority('isoWeekday', 11); // PARSING

  addRegexToken('d', match1to2);
  addRegexToken('e', match1to2);
  addRegexToken('E', match1to2);
  addRegexToken('dd', function (isStrict, locale) {
    return locale.weekdaysMinRegex(isStrict);
  });
  addRegexToken('ddd', function (isStrict, locale) {
    return locale.weekdaysShortRegex(isStrict);
  });
  addRegexToken('dddd', function (isStrict, locale) {
    return locale.weekdaysRegex(isStrict);
  });
  addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
    var weekday = config._locale.weekdaysParse(input, token, config._strict); // if we didn't get a weekday name, mark the date as invalid


    if (weekday != null) {
      week.d = weekday;
    } else {
      getParsingFlags(config).invalidWeekday = input;
    }
  });
  addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
    week[token] = toInt(input);
  }); // HELPERS

  function parseWeekday(input, locale) {
    if (typeof input !== 'string') {
      return input;
    }

    if (!isNaN(input)) {
      return parseInt(input, 10);
    }

    input = locale.weekdaysParse(input);

    if (typeof input === 'number') {
      return input;
    }

    return null;
  }

  function parseIsoWeekday(input, locale) {
    if (typeof input === 'string') {
      return locale.weekdaysParse(input) % 7 || 7;
    }

    return isNaN(input) ? null : input;
  } // LOCALES


  function shiftWeekdays(ws, n) {
    return ws.slice(n, 7).concat(ws.slice(0, n));
  }

  var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
      defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
      defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
      defaultWeekdaysRegex = matchWord,
      defaultWeekdaysShortRegex = matchWord,
      defaultWeekdaysMinRegex = matchWord;

  function localeWeekdays(m, format) {
    var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format) ? 'format' : 'standalone'];
    return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
  }

  function localeWeekdaysShort(m) {
    return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
  }

  function localeWeekdaysMin(m) {
    return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
  }

  function handleStrictParse$1(weekdayName, format, strict) {
    var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._minWeekdaysParse = [];

      for (i = 0; i < 7; ++i) {
        mom = createUTC([2000, 1]).day(i);
        this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
        this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
        this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
      }
    }

    if (strict) {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    } else {
      if (format === 'dddd') {
        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else if (format === 'ddd') {
        ii = indexOf.call(this._shortWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._minWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      } else {
        ii = indexOf.call(this._minWeekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._weekdaysParse, llc);

        if (ii !== -1) {
          return ii;
        }

        ii = indexOf.call(this._shortWeekdaysParse, llc);
        return ii !== -1 ? ii : null;
      }
    }
  }

  function localeWeekdaysParse(weekdayName, format, strict) {
    var i, mom, regex;

    if (this._weekdaysParseExact) {
      return handleStrictParse$1.call(this, weekdayName, format, strict);
    }

    if (!this._weekdaysParse) {
      this._weekdaysParse = [];
      this._minWeekdaysParse = [];
      this._shortWeekdaysParse = [];
      this._fullWeekdaysParse = [];
    }

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);

      if (strict && !this._fullWeekdaysParse[i]) {
        this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
        this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
        this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
      }

      if (!this._weekdaysParse[i]) {
        regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
        this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
      } // test the regex


      if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
        return i;
      } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
        return i;
      }
    }
  } // MOMENTS


  function getSetDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();

    if (input != null) {
      input = parseWeekday(input, this.localeData());
      return this.add(input - day, 'd');
    } else {
      return day;
    }
  }

  function getSetLocaleDayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return input == null ? weekday : this.add(input - weekday, 'd');
  }

  function getSetISODayOfWeek(input) {
    if (!this.isValid()) {
      return input != null ? this : NaN;
    } // behaves the same as moment#day except
    // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
    // as a setter, sunday should belong to the previous week.


    if (input != null) {
      var weekday = parseIsoWeekday(input, this.localeData());
      return this.day(this.day() % 7 ? weekday : weekday - 7);
    } else {
      return this.day() || 7;
    }
  }

  function weekdaysRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysStrictRegex;
      } else {
        return this._weekdaysRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        this._weekdaysRegex = defaultWeekdaysRegex;
      }

      return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
    }
  }

  function weekdaysShortRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysShortStrictRegex;
      } else {
        return this._weekdaysShortRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysShortRegex')) {
        this._weekdaysShortRegex = defaultWeekdaysShortRegex;
      }

      return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
    }
  }

  function weekdaysMinRegex(isStrict) {
    if (this._weekdaysParseExact) {
      if (!hasOwnProp(this, '_weekdaysRegex')) {
        computeWeekdaysParse.call(this);
      }

      if (isStrict) {
        return this._weekdaysMinStrictRegex;
      } else {
        return this._weekdaysMinRegex;
      }
    } else {
      if (!hasOwnProp(this, '_weekdaysMinRegex')) {
        this._weekdaysMinRegex = defaultWeekdaysMinRegex;
      }

      return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
    }
  }

  function computeWeekdaysParse() {
    function cmpLenRev(a, b) {
      return b.length - a.length;
    }

    var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;

    for (i = 0; i < 7; i++) {
      // make the regex if we don't have it already
      mom = createUTC([2000, 1]).day(i);
      minp = regexEscape(this.weekdaysMin(mom, ''));
      shortp = regexEscape(this.weekdaysShort(mom, ''));
      longp = regexEscape(this.weekdays(mom, ''));
      minPieces.push(minp);
      shortPieces.push(shortp);
      longPieces.push(longp);
      mixedPieces.push(minp);
      mixedPieces.push(shortp);
      mixedPieces.push(longp);
    } // Sorting makes sure if one weekday (or abbr) is a prefix of another it
    // will match the longer piece.


    minPieces.sort(cmpLenRev);
    shortPieces.sort(cmpLenRev);
    longPieces.sort(cmpLenRev);
    mixedPieces.sort(cmpLenRev);
    this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._weekdaysShortRegex = this._weekdaysRegex;
    this._weekdaysMinRegex = this._weekdaysRegex;
    this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
    this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
  } // FORMATTING


  function hFormat() {
    return this.hours() % 12 || 12;
  }

  function kFormat() {
    return this.hours() || 24;
  }

  addFormatToken('H', ['HH', 2], 0, 'hour');
  addFormatToken('h', ['hh', 2], 0, hFormat);
  addFormatToken('k', ['kk', 2], 0, kFormat);
  addFormatToken('hmm', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
  });
  addFormatToken('hmmss', 0, 0, function () {
    return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });
  addFormatToken('Hmm', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2);
  });
  addFormatToken('Hmmss', 0, 0, function () {
    return '' + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
  });

  function meridiem(token, lowercase) {
    addFormatToken(token, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
    });
  }

  meridiem('a', true);
  meridiem('A', false); // ALIASES

  addUnitAlias('hour', 'h'); // PRIORITY

  addUnitPriority('hour', 13); // PARSING

  function matchMeridiem(isStrict, locale) {
    return locale._meridiemParse;
  }

  addRegexToken('a', matchMeridiem);
  addRegexToken('A', matchMeridiem);
  addRegexToken('H', match1to2);
  addRegexToken('h', match1to2);
  addRegexToken('k', match1to2);
  addRegexToken('HH', match1to2, match2);
  addRegexToken('hh', match1to2, match2);
  addRegexToken('kk', match1to2, match2);
  addRegexToken('hmm', match3to4);
  addRegexToken('hmmss', match5to6);
  addRegexToken('Hmm', match3to4);
  addRegexToken('Hmmss', match5to6);
  addParseToken(['H', 'HH'], HOUR);
  addParseToken(['k', 'kk'], function (input, array, config) {
    var kInput = toInt(input);
    array[HOUR] = kInput === 24 ? 0 : kInput;
  });
  addParseToken(['a', 'A'], function (input, array, config) {
    config._isPm = config._locale.isPM(input);
    config._meridiem = input;
  });
  addParseToken(['h', 'hh'], function (input, array, config) {
    array[HOUR] = toInt(input);
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
        pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
    getParsingFlags(config).bigHour = true;
  });
  addParseToken('Hmm', function (input, array, config) {
    var pos = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos));
    array[MINUTE] = toInt(input.substr(pos));
  });
  addParseToken('Hmmss', function (input, array, config) {
    var pos1 = input.length - 4,
        pos2 = input.length - 2;
    array[HOUR] = toInt(input.substr(0, pos1));
    array[MINUTE] = toInt(input.substr(pos1, 2));
    array[SECOND] = toInt(input.substr(pos2));
  }); // LOCALES

  function localeIsPM(input) {
    // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
    // Using charAt should be more compatible.
    return (input + '').toLowerCase().charAt(0) === 'p';
  }

  var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
      // Setting the hour should keep the time, because the user explicitly
  // specified which hour they want. So trying to maintain the same hour (in
  // a new timezone) makes sense. Adding/subtracting hours does not follow
  // this rule.
  getSetHour = makeGetSet('Hours', true);

  function localeMeridiem(hours, minutes, isLower) {
    if (hours > 11) {
      return isLower ? 'pm' : 'PM';
    } else {
      return isLower ? 'am' : 'AM';
    }
  }

  var baseConfig = {
    calendar: defaultCalendar,
    longDateFormat: defaultLongDateFormat,
    invalidDate: defaultInvalidDate,
    ordinal: defaultOrdinal,
    dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
    relativeTime: defaultRelativeTime,
    months: defaultLocaleMonths,
    monthsShort: defaultLocaleMonthsShort,
    week: defaultLocaleWeek,
    weekdays: defaultLocaleWeekdays,
    weekdaysMin: defaultLocaleWeekdaysMin,
    weekdaysShort: defaultLocaleWeekdaysShort,
    meridiemParse: defaultLocaleMeridiemParse
  }; // internal storage for locale config files

  var locales = {},
      localeFamilies = {},
      globalLocale;

  function commonPrefix(arr1, arr2) {
    var i,
        minl = Math.min(arr1.length, arr2.length);

    for (i = 0; i < minl; i += 1) {
      if (arr1[i] !== arr2[i]) {
        return i;
      }
    }

    return minl;
  }

  function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
  } // pick the locale from the array
  // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
  // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root


  function chooseLocale(names) {
    var i = 0,
        j,
        next,
        locale,
        split;

    while (i < names.length) {
      split = normalizeLocale(names[i]).split('-');
      j = split.length;
      next = normalizeLocale(names[i + 1]);
      next = next ? next.split('-') : null;

      while (j > 0) {
        locale = loadLocale(split.slice(0, j).join('-'));

        if (locale) {
          return locale;
        }

        if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
          //the next array item is better than a shallower substring of this one
          break;
        }

        j--;
      }

      i++;
    }

    return globalLocale;
  }

  function loadLocale(name) {
    var oldLocale = null,
        aliasedRequire; // TODO: Find a better way to register and load all the locales in Node

    if (locales[name] === undefined && typeof module !== 'undefined' && module && module.exports) {
      try {
        oldLocale = globalLocale._abbr;
        aliasedRequire = require;
        __webpack_require__("../../node_modules/moment/locale sync recursive \\b\\B")("./" + name);
        getSetGlobalLocale(oldLocale);
      } catch (e) {
        // mark as not found to avoid repeating expensive file require call causing high CPU
        // when trying to find en-US, en_US, en-us for every format call
        locales[name] = null; // null means not found
      }
    }

    return locales[name];
  } // This function will load locale and then set the global locale.  If
  // no arguments are passed in, it will simply return the current global
  // locale key.


  function getSetGlobalLocale(key, values) {
    var data;

    if (key) {
      if (isUndefined(values)) {
        data = getLocale(key);
      } else {
        data = defineLocale(key, values);
      }

      if (data) {
        // moment.duration._locale = moment._locale = data;
        globalLocale = data;
      } else {
        if (typeof console !== 'undefined' && console.warn) {
          //warn user if arguments are passed but the locale could not be set
          console.warn('Locale ' + key + ' not found. Did you forget to load it?');
        }
      }
    }

    return globalLocale._abbr;
  }

  function defineLocale(name, config) {
    if (config !== null) {
      var locale,
          parentConfig = baseConfig;
      config.abbr = name;

      if (locales[name] != null) {
        deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale ' + 'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
        parentConfig = locales[name]._config;
      } else if (config.parentLocale != null) {
        if (locales[config.parentLocale] != null) {
          parentConfig = locales[config.parentLocale]._config;
        } else {
          locale = loadLocale(config.parentLocale);

          if (locale != null) {
            parentConfig = locale._config;
          } else {
            if (!localeFamilies[config.parentLocale]) {
              localeFamilies[config.parentLocale] = [];
            }

            localeFamilies[config.parentLocale].push({
              name: name,
              config: config
            });
            return null;
          }
        }
      }

      locales[name] = new Locale(mergeConfigs(parentConfig, config));

      if (localeFamilies[name]) {
        localeFamilies[name].forEach(function (x) {
          defineLocale(x.name, x.config);
        });
      } // backwards compat for now: also set the locale
      // make sure we set the locale AFTER all child locales have been
      // created, so we won't end up with the child locale set.


      getSetGlobalLocale(name);
      return locales[name];
    } else {
      // useful for testing
      delete locales[name];
      return null;
    }
  }

  function updateLocale(name, config) {
    if (config != null) {
      var locale,
          tmpLocale,
          parentConfig = baseConfig;

      if (locales[name] != null && locales[name].parentLocale != null) {
        // Update existing child locale in-place to avoid memory-leaks
        locales[name].set(mergeConfigs(locales[name]._config, config));
      } else {
        // MERGE
        tmpLocale = loadLocale(name);

        if (tmpLocale != null) {
          parentConfig = tmpLocale._config;
        }

        config = mergeConfigs(parentConfig, config);

        if (tmpLocale == null) {
          // updateLocale is called for creating a new locale
          // Set abbr so it will have a name (getters return
          // undefined otherwise).
          config.abbr = name;
        }

        locale = new Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
      } // backwards compat for now: also set the locale


      getSetGlobalLocale(name);
    } else {
      // pass null for config to unupdate, useful for tests
      if (locales[name] != null) {
        if (locales[name].parentLocale != null) {
          locales[name] = locales[name].parentLocale;

          if (name === getSetGlobalLocale()) {
            getSetGlobalLocale(name);
          }
        } else if (locales[name] != null) {
          delete locales[name];
        }
      }
    }

    return locales[name];
  } // returns locale data


  function getLocale(key) {
    var locale;

    if (key && key._locale && key._locale._abbr) {
      key = key._locale._abbr;
    }

    if (!key) {
      return globalLocale;
    }

    if (!isArray(key)) {
      //short-circuit everything else
      locale = loadLocale(key);

      if (locale) {
        return locale;
      }

      key = [key];
    }

    return chooseLocale(key);
  }

  function listLocales() {
    return keys(locales);
  }

  function checkOverflow(m) {
    var overflow,
        a = m._a;

    if (a && getParsingFlags(m).overflow === -2) {
      overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;

      if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
        overflow = DATE;
      }

      if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
        overflow = WEEK;
      }

      if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
        overflow = WEEKDAY;
      }

      getParsingFlags(m).overflow = overflow;
    }

    return m;
  } // iso 8601 regex
  // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)


  var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
      isoDates = [['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/], ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/], ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/], ['GGGG-[W]WW', /\d{4}-W\d\d/, false], ['YYYY-DDD', /\d{4}-\d{3}/], ['YYYY-MM', /\d{4}-\d\d/, false], ['YYYYYYMMDD', /[+-]\d{10}/], ['YYYYMMDD', /\d{8}/], ['GGGG[W]WWE', /\d{4}W\d{3}/], ['GGGG[W]WW', /\d{4}W\d{2}/, false], ['YYYYDDD', /\d{7}/], ['YYYYMM', /\d{6}/, false], ['YYYY', /\d{4}/, false]],
      // iso time formats and regexes
  isoTimes = [['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/], ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/], ['HH:mm:ss', /\d\d:\d\d:\d\d/], ['HH:mm', /\d\d:\d\d/], ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/], ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/], ['HHmmss', /\d\d\d\d\d\d/], ['HHmm', /\d\d\d\d/], ['HH', /\d\d/]],
      aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
      // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
  rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      obsOffsets = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60
  }; // date from iso format

  function configFromISO(config) {
    var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat;

    if (match) {
      getParsingFlags(config).iso = true;

      for (i = 0, l = isoDates.length; i < l; i++) {
        if (isoDates[i][1].exec(match[1])) {
          dateFormat = isoDates[i][0];
          allowTime = isoDates[i][2] !== false;
          break;
        }
      }

      if (dateFormat == null) {
        config._isValid = false;
        return;
      }

      if (match[3]) {
        for (i = 0, l = isoTimes.length; i < l; i++) {
          if (isoTimes[i][1].exec(match[3])) {
            // match[2] should be 'T' or space
            timeFormat = (match[2] || ' ') + isoTimes[i][0];
            break;
          }
        }

        if (timeFormat == null) {
          config._isValid = false;
          return;
        }
      }

      if (!allowTime && timeFormat != null) {
        config._isValid = false;
        return;
      }

      if (match[4]) {
        if (tzRegex.exec(match[4])) {
          tzFormat = 'Z';
        } else {
          config._isValid = false;
          return;
        }
      }

      config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
      configFromStringAndFormat(config);
    } else {
      config._isValid = false;
    }
  }

  function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = [untruncateYear(yearStr), defaultLocaleMonthsShort.indexOf(monthStr), parseInt(dayStr, 10), parseInt(hourStr, 10), parseInt(minuteStr, 10)];

    if (secondStr) {
      result.push(parseInt(secondStr, 10));
    }

    return result;
  }

  function untruncateYear(yearStr) {
    var year = parseInt(yearStr, 10);

    if (year <= 49) {
      return 2000 + year;
    } else if (year <= 999) {
      return 1900 + year;
    }

    return year;
  }

  function preprocessRFC2822(s) {
    // Remove comments and folding whitespace and replace multiple-spaces with a single space
    return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  }

  function checkWeekday(weekdayStr, parsedInput, config) {
    if (weekdayStr) {
      // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
      var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();

      if (weekdayProvided !== weekdayActual) {
        getParsingFlags(config).weekdayMismatch = true;
        config._isValid = false;
        return false;
      }
    }

    return true;
  }

  function calculateOffset(obsOffset, militaryOffset, numOffset) {
    if (obsOffset) {
      return obsOffsets[obsOffset];
    } else if (militaryOffset) {
      // the only allowed military tz is Z
      return 0;
    } else {
      var hm = parseInt(numOffset, 10),
          m = hm % 100,
          h = (hm - m) / 100;
      return h * 60 + m;
    }
  } // date and time from ref 2822 format


  function configFromRFC2822(config) {
    var match = rfc2822.exec(preprocessRFC2822(config._i)),
        parsedArray;

    if (match) {
      parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);

      if (!checkWeekday(match[1], parsedArray, config)) {
        return;
      }

      config._a = parsedArray;
      config._tzm = calculateOffset(match[8], match[9], match[10]);
      config._d = createUTCDate.apply(null, config._a);

      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

      getParsingFlags(config).rfc2822 = true;
    } else {
      config._isValid = false;
    }
  } // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict


  function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);

    if (matched !== null) {
      config._d = new Date(+matched[1]);
      return;
    }

    configFromISO(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    configFromRFC2822(config);

    if (config._isValid === false) {
      delete config._isValid;
    } else {
      return;
    }

    if (config._strict) {
      config._isValid = false;
    } else {
      // Final attempt, use Input Fallback
      hooks.createFromInputFallback(config);
    }
  }

  hooks.createFromInputFallback = deprecate('value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' + 'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' + 'discouraged and will be removed in an upcoming major release. Please refer to ' + 'http://momentjs.com/guides/#/warnings/js-date/ for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
  }); // Pick the first defined of two or three arguments.

  function defaults(a, b, c) {
    if (a != null) {
      return a;
    }

    if (b != null) {
      return b;
    }

    return c;
  }

  function currentDateArray(config) {
    // hooks is actually the exported moment object
    var nowValue = new Date(hooks.now());

    if (config._useUTC) {
      return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
    }

    return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
  } // convert an array to a date.
  // the array should mirror the parameters below
  // note: all values past the year are optional and will default to the lowest possible value.
  // [year, month, day , hour, minute, second, millisecond]


  function configFromArray(config) {
    var i,
        date,
        input = [],
        currentDate,
        expectedWeekday,
        yearToUse;

    if (config._d) {
      return;
    }

    currentDate = currentDateArray(config); //compute day of the year from weeks and weekdays

    if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
      dayOfYearFromWeekInfo(config);
    } //if the day of the year is set, figure out what it is


    if (config._dayOfYear != null) {
      yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

      if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
        getParsingFlags(config)._overflowDayOfYear = true;
      }

      date = createUTCDate(yearToUse, 0, config._dayOfYear);
      config._a[MONTH] = date.getUTCMonth();
      config._a[DATE] = date.getUTCDate();
    } // Default to current date.
    // * if no year, month, day of month are given, default to today
    // * if day of month is given, default month and year
    // * if month is given, default only year
    // * if year is given, don't default anything


    for (i = 0; i < 3 && config._a[i] == null; ++i) {
      config._a[i] = input[i] = currentDate[i];
    } // Zero out whatever was not defaulted, including time


    for (; i < 7; i++) {
      config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    } // Check for 24:00:00.000


    if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
      config._nextDay = true;
      config._a[HOUR] = 0;
    }

    config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
    expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay(); // Apply timezone offset from input. The actual utcOffset can be changed
    // with parseZone.

    if (config._tzm != null) {
      config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }

    if (config._nextDay) {
      config._a[HOUR] = 24;
    } // check for mismatching day of week


    if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
      getParsingFlags(config).weekdayMismatch = true;
    }
  }

  function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
    w = config._w;

    if (w.GG != null || w.W != null || w.E != null) {
      dow = 1;
      doy = 4; // TODO: We need to take the current isoWeekYear, but that depends on
      // how we interpret now (local, utc, fixed offset). So create
      // a now version of current config (take local/utc/offset flags, and
      // create now).

      weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
      week = defaults(w.W, 1);
      weekday = defaults(w.E, 1);

      if (weekday < 1 || weekday > 7) {
        weekdayOverflow = true;
      }
    } else {
      dow = config._locale._week.dow;
      doy = config._locale._week.doy;
      curWeek = weekOfYear(createLocal(), dow, doy);
      weekYear = defaults(w.gg, config._a[YEAR], curWeek.year); // Default to current week.

      week = defaults(w.w, curWeek.week);

      if (w.d != null) {
        // weekday -- low day numbers are considered next week
        weekday = w.d;

        if (weekday < 0 || weekday > 6) {
          weekdayOverflow = true;
        }
      } else if (w.e != null) {
        // local weekday -- counting starts from beginning of week
        weekday = w.e + dow;

        if (w.e < 0 || w.e > 6) {
          weekdayOverflow = true;
        }
      } else {
        // default to beginning of week
        weekday = dow;
      }
    }

    if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
      getParsingFlags(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
      getParsingFlags(config)._overflowWeekday = true;
    } else {
      temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
      config._a[YEAR] = temp.year;
      config._dayOfYear = temp.dayOfYear;
    }
  } // constant that refers to the ISO standard


  hooks.ISO_8601 = function () {}; // constant that refers to the RFC 2822 form


  hooks.RFC_2822 = function () {}; // date from string and format string


  function configFromStringAndFormat(config) {
    // TODO: Move this to another part of the creation flow to prevent circular deps
    if (config._f === hooks.ISO_8601) {
      configFromISO(config);
      return;
    }

    if (config._f === hooks.RFC_2822) {
      configFromRFC2822(config);
      return;
    }

    config._a = [];
    getParsingFlags(config).empty = true; // This array is used to make a Date, either with `new Date` or `Date.UTC`

    var string = '' + config._i,
        i,
        parsedInput,
        tokens,
        token,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0,
        era;
    tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];

      if (parsedInput) {
        skipped = string.substr(0, string.indexOf(parsedInput));

        if (skipped.length > 0) {
          getParsingFlags(config).unusedInput.push(skipped);
        }

        string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
        totalParsedInputLength += parsedInput.length;
      } // don't parse if it's not a known token


      if (formatTokenFunctions[token]) {
        if (parsedInput) {
          getParsingFlags(config).empty = false;
        } else {
          getParsingFlags(config).unusedTokens.push(token);
        }

        addTimeToArrayFromToken(token, parsedInput, config);
      } else if (config._strict && !parsedInput) {
        getParsingFlags(config).unusedTokens.push(token);
      }
    } // add remaining unparsed input length to the string


    getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;

    if (string.length > 0) {
      getParsingFlags(config).unusedInput.push(string);
    } // clear _12h flag if hour is <= 12


    if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
      getParsingFlags(config).bigHour = undefined;
    }

    getParsingFlags(config).parsedDateParts = config._a.slice(0);
    getParsingFlags(config).meridiem = config._meridiem; // handle meridiem

    config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem); // handle era

    era = getParsingFlags(config).era;

    if (era !== null) {
      config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
    }

    configFromArray(config);
    checkOverflow(config);
  }

  function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;

    if (meridiem == null) {
      // nothing to do
      return hour;
    }

    if (locale.meridiemHour != null) {
      return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
      // Fallback
      isPm = locale.isPM(meridiem);

      if (isPm && hour < 12) {
        hour += 12;
      }

      if (!isPm && hour === 12) {
        hour = 0;
      }

      return hour;
    } else {
      // this is not supposed to happen
      return hour;
    }
  } // date from string and array of format strings


  function configFromStringAndArray(config) {
    var tempConfig,
        bestMoment,
        scoreToBeat,
        i,
        currentScore,
        validFormatFound,
        bestFormatIsValid = false;

    if (config._f.length === 0) {
      getParsingFlags(config).invalidFormat = true;
      config._d = new Date(NaN);
      return;
    }

    for (i = 0; i < config._f.length; i++) {
      currentScore = 0;
      validFormatFound = false;
      tempConfig = copyConfig({}, config);

      if (config._useUTC != null) {
        tempConfig._useUTC = config._useUTC;
      }

      tempConfig._f = config._f[i];
      configFromStringAndFormat(tempConfig);

      if (isValid(tempConfig)) {
        validFormatFound = true;
      } // if there is any input that was not parsed add a penalty for that format


      currentScore += getParsingFlags(tempConfig).charsLeftOver; //or tokens

      currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
      getParsingFlags(tempConfig).score = currentScore;

      if (!bestFormatIsValid) {
        if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;

          if (validFormatFound) {
            bestFormatIsValid = true;
          }
        }
      } else {
        if (currentScore < scoreToBeat) {
          scoreToBeat = currentScore;
          bestMoment = tempConfig;
        }
      }
    }

    extend(config, bestMoment || tempConfig);
  }

  function configFromObject(config) {
    if (config._d) {
      return;
    }

    var i = normalizeObjectUnits(config._i),
        dayOrDate = i.day === undefined ? i.date : i.day;
    config._a = map([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function (obj) {
      return obj && parseInt(obj, 10);
    });
    configFromArray(config);
  }

  function createFromConfig(config) {
    var res = new Moment(checkOverflow(prepareConfig(config)));

    if (res._nextDay) {
      // Adding is smart enough around DST
      res.add(1, 'd');
      res._nextDay = undefined;
    }

    return res;
  }

  function prepareConfig(config) {
    var input = config._i,
        format = config._f;
    config._locale = config._locale || getLocale(config._l);

    if (input === null || format === undefined && input === '') {
      return createInvalid({
        nullInput: true
      });
    }

    if (typeof input === 'string') {
      config._i = input = config._locale.preparse(input);
    }

    if (isMoment(input)) {
      return new Moment(checkOverflow(input));
    } else if (isDate(input)) {
      config._d = input;
    } else if (isArray(format)) {
      configFromStringAndArray(config);
    } else if (format) {
      configFromStringAndFormat(config);
    } else {
      configFromInput(config);
    }

    if (!isValid(config)) {
      config._d = null;
    }

    return config;
  }

  function configFromInput(config) {
    var input = config._i;

    if (isUndefined(input)) {
      config._d = new Date(hooks.now());
    } else if (isDate(input)) {
      config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
      configFromString(config);
    } else if (isArray(input)) {
      config._a = map(input.slice(0), function (obj) {
        return parseInt(obj, 10);
      });
      configFromArray(config);
    } else if (isObject(input)) {
      configFromObject(config);
    } else if (isNumber(input)) {
      // from milliseconds
      config._d = new Date(input);
    } else {
      hooks.createFromInputFallback(config);
    }
  }

  function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};

    if (format === true || format === false) {
      strict = format;
      format = undefined;
    }

    if (locale === true || locale === false) {
      strict = locale;
      locale = undefined;
    }

    if (isObject(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
      input = undefined;
    } // object construction must be done this way.
    // https://github.com/moment/moment/issues/1423


    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
  }

  function createLocal(input, format, locale, strict) {
    return createLocalOrUTC(input, format, locale, strict, false);
  }

  var prototypeMin = deprecate('moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other < this ? this : other;
    } else {
      return createInvalid();
    }
  }),
      prototypeMax = deprecate('moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/', function () {
    var other = createLocal.apply(null, arguments);

    if (this.isValid() && other.isValid()) {
      return other > this ? this : other;
    } else {
      return createInvalid();
    }
  }); // Pick a moment m from moments so that m[fn](other) is true for all
  // other. This relies on the function fn to be transitive.
  //
  // moments should either be an array of moment objects or an array, whose
  // first element is an array of moment objects.

  function pickBy(fn, moments) {
    var res, i;

    if (moments.length === 1 && isArray(moments[0])) {
      moments = moments[0];
    }

    if (!moments.length) {
      return createLocal();
    }

    res = moments[0];

    for (i = 1; i < moments.length; ++i) {
      if (!moments[i].isValid() || moments[i][fn](res)) {
        res = moments[i];
      }
    }

    return res;
  } // TODO: Use [].sort instead?


  function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
  }

  function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
  }

  var now = function () {
    return Date.now ? Date.now() : +new Date();
  };

  var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

  function isDurationValid(m) {
    var key,
        unitHasDecimal = false,
        i;

    for (key in m) {
      if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
        return false;
      }
    }

    for (i = 0; i < ordering.length; ++i) {
      if (m[ordering[i]]) {
        if (unitHasDecimal) {
          return false; // only allow non-integers for smallest unit
        }

        if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
          unitHasDecimal = true;
        }
      }
    }

    return true;
  }

  function isValid$1() {
    return this._isValid;
  }

  function createInvalid$1() {
    return createDuration(NaN);
  }

  function Duration(duration) {
    var normalizedInput = normalizeObjectUnits(duration),
        years = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months = normalizedInput.month || 0,
        weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
        days = normalizedInput.day || 0,
        hours = normalizedInput.hour || 0,
        minutes = normalizedInput.minute || 0,
        seconds = normalizedInput.second || 0,
        milliseconds = normalizedInput.millisecond || 0;
    this._isValid = isDurationValid(normalizedInput); // representation for dateAddRemove

    this._milliseconds = +milliseconds + seconds * 1e3 + // 1000
    minutes * 6e4 + // 1000 * 60
    hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
    // Because of dateAddRemove treats 24 hours as different from a
    // day when working around DST, we need to store them separately

    this._days = +days + weeks * 7; // It is impossible to translate months into days without knowing
    // which months you are are talking about, so we have to store
    // it separately.

    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = getLocale();

    this._bubble();
  }

  function isDuration(obj) {
    return obj instanceof Duration;
  }

  function absRound(number) {
    if (number < 0) {
      return Math.round(-1 * number) * -1;
    } else {
      return Math.round(number);
    }
  } // compare two arrays, return the number of differences


  function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;

    for (i = 0; i < len; i++) {
      if (dontConvert && array1[i] !== array2[i] || !dontConvert && toInt(array1[i]) !== toInt(array2[i])) {
        diffs++;
      }
    }

    return diffs + lengthDiff;
  } // FORMATTING


  function offset(token, separator) {
    addFormatToken(token, 0, 0, function () {
      var offset = this.utcOffset(),
          sign = '+';

      if (offset < 0) {
        offset = -offset;
        sign = '-';
      }

      return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~offset % 60, 2);
    });
  }

  offset('Z', ':');
  offset('ZZ', ''); // PARSING

  addRegexToken('Z', matchShortOffset);
  addRegexToken('ZZ', matchShortOffset);
  addParseToken(['Z', 'ZZ'], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString(matchShortOffset, input);
  }); // HELPERS
  // timezone chunker
  // '+10:00' > ['10',  '00']
  // '-1530'  > ['-15', '30']

  var chunkOffset = /([\+\-]|\d\d)/gi;

  function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher),
        chunk,
        parts,
        minutes;

    if (matches === null) {
      return null;
    }

    chunk = matches[matches.length - 1] || [];
    parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
    minutes = +(parts[1] * 60) + toInt(parts[2]);
    return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
  } // Return a moment from input, that is local/utc/zone equivalent to model.


  function cloneWithOffset(input, model) {
    var res, diff;

    if (model._isUTC) {
      res = model.clone();
      diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf(); // Use low-level api, because this fn is low-level api.

      res._d.setTime(res._d.valueOf() + diff);

      hooks.updateOffset(res, false);
      return res;
    } else {
      return createLocal(input).local();
    }
  }

  function getDateOffset(m) {
    // On Firefox.24 Date#getTimezoneOffset returns a floating point.
    // https://github.com/moment/moment/pull/1871
    return -Math.round(m._d.getTimezoneOffset());
  } // HOOKS
  // This function will be called whenever a moment is mutated.
  // It is intended to keep the offset in sync with the timezone.


  hooks.updateOffset = function () {}; // MOMENTS
  // keepLocalTime = true means only change the timezone, without
  // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
  // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
  // +0200, so we adjust the time as needed, to be valid.
  //
  // Keeping the time actually adds/subtracts (one hour)
  // from the actual represented time. That is why we call updateOffset
  // a second time. In case it wants us to change the offset again
  // _changeInProgress == true case, then we have to adjust, because
  // there is no such time in the given timezone.


  function getSetOffset(input, keepLocalTime, keepMinutes) {
    var offset = this._offset || 0,
        localAdjust;

    if (!this.isValid()) {
      return input != null ? this : NaN;
    }

    if (input != null) {
      if (typeof input === 'string') {
        input = offsetFromString(matchShortOffset, input);

        if (input === null) {
          return this;
        }
      } else if (Math.abs(input) < 16 && !keepMinutes) {
        input = input * 60;
      }

      if (!this._isUTC && keepLocalTime) {
        localAdjust = getDateOffset(this);
      }

      this._offset = input;
      this._isUTC = true;

      if (localAdjust != null) {
        this.add(localAdjust, 'm');
      }

      if (offset !== input) {
        if (!keepLocalTime || this._changeInProgress) {
          addSubtract(this, createDuration(input - offset, 'm'), 1, false);
        } else if (!this._changeInProgress) {
          this._changeInProgress = true;
          hooks.updateOffset(this, true);
          this._changeInProgress = null;
        }
      }

      return this;
    } else {
      return this._isUTC ? offset : getDateOffset(this);
    }
  }

  function getSetZone(input, keepLocalTime) {
    if (input != null) {
      if (typeof input !== 'string') {
        input = -input;
      }

      this.utcOffset(input, keepLocalTime);
      return this;
    } else {
      return -this.utcOffset();
    }
  }

  function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
  }

  function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
      this.utcOffset(0, keepLocalTime);
      this._isUTC = false;

      if (keepLocalTime) {
        this.subtract(getDateOffset(this), 'm');
      }
    }

    return this;
  }

  function setOffsetToParsedOffset() {
    if (this._tzm != null) {
      this.utcOffset(this._tzm, false, true);
    } else if (typeof this._i === 'string') {
      var tZone = offsetFromString(matchOffset, this._i);

      if (tZone != null) {
        this.utcOffset(tZone);
      } else {
        this.utcOffset(0, true);
      }
    }

    return this;
  }

  function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
      return false;
    }

    input = input ? createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
  }

  function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }

  function isDaylightSavingTimeShifted() {
    if (!isUndefined(this._isDSTShifted)) {
      return this._isDSTShifted;
    }

    var c = {},
        other;
    copyConfig(c, this);
    c = prepareConfig(c);

    if (c._a) {
      other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
      this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
    } else {
      this._isDSTShifted = false;
    }

    return this._isDSTShifted;
  }

  function isLocal() {
    return this.isValid() ? !this._isUTC : false;
  }

  function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
  }

  function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
  } // ASP.NET json date format regex


  var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
  // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
  // and further modified to allow for strings containing both week and day
  isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

  function createDuration(input, key) {
    var duration = input,
        // matching against regexp is expensive, do it on demand
    match = null,
        sign,
        ret,
        diffRes;

    if (isDuration(input)) {
      duration = {
        ms: input._milliseconds,
        d: input._days,
        M: input._months
      };
    } else if (isNumber(input) || !isNaN(+input)) {
      duration = {};

      if (key) {
        duration[key] = +input;
      } else {
        duration.milliseconds = +input;
      }
    } else if (match = aspNetRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: 0,
        d: toInt(match[DATE]) * sign,
        h: toInt(match[HOUR]) * sign,
        m: toInt(match[MINUTE]) * sign,
        s: toInt(match[SECOND]) * sign,
        ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match

      };
    } else if (match = isoRegex.exec(input)) {
      sign = match[1] === '-' ? -1 : 1;
      duration = {
        y: parseIso(match[2], sign),
        M: parseIso(match[3], sign),
        w: parseIso(match[4], sign),
        d: parseIso(match[5], sign),
        h: parseIso(match[6], sign),
        m: parseIso(match[7], sign),
        s: parseIso(match[8], sign)
      };
    } else if (duration == null) {
      // checks for null or undefined
      duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
      diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
      duration = {};
      duration.ms = diffRes.milliseconds;
      duration.M = diffRes.months;
    }

    ret = new Duration(duration);

    if (isDuration(input) && hasOwnProp(input, '_locale')) {
      ret._locale = input._locale;
    }

    if (isDuration(input) && hasOwnProp(input, '_isValid')) {
      ret._isValid = input._isValid;
    }

    return ret;
  }

  createDuration.fn = Duration.prototype;
  createDuration.invalid = createInvalid$1;

  function parseIso(inp, sign) {
    // We'd normally use ~~inp for this, but unfortunately it also
    // converts floats to ints.
    // inp may be undefined, so careful calling replace on it.
    var res = inp && parseFloat(inp.replace(',', '.')); // apply sign while we're at it

    return (isNaN(res) ? 0 : res) * sign;
  }

  function positiveMomentsDifference(base, other) {
    var res = {};
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;

    if (base.clone().add(res.months, 'M').isAfter(other)) {
      --res.months;
    }

    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
  }

  function momentsDifference(base, other) {
    var res;

    if (!(base.isValid() && other.isValid())) {
      return {
        milliseconds: 0,
        months: 0
      };
    }

    other = cloneWithOffset(other, base);

    if (base.isBefore(other)) {
      res = positiveMomentsDifference(base, other);
    } else {
      res = positiveMomentsDifference(other, base);
      res.milliseconds = -res.milliseconds;
      res.months = -res.months;
    }

    return res;
  } // TODO: remove 'name' arg after deprecation is removed


  function createAdder(direction, name) {
    return function (val, period) {
      var dur, tmp; //invert the arguments, but complain about it

      if (period !== null && !isNaN(+period)) {
        deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' + 'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
        tmp = val;
        val = period;
        period = tmp;
      }

      dur = createDuration(val, period);
      addSubtract(this, dur, direction);
      return this;
    };
  }

  function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds,
        days = absRound(duration._days),
        months = absRound(duration._months);

    if (!mom.isValid()) {
      // No op
      return;
    }

    updateOffset = updateOffset == null ? true : updateOffset;

    if (months) {
      setMonth(mom, get(mom, 'Month') + months * isAdding);
    }

    if (days) {
      set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
    }

    if (milliseconds) {
      mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }

    if (updateOffset) {
      hooks.updateOffset(mom, days || months);
    }
  }

  var add = createAdder(1, 'add'),
      subtract = createAdder(-1, 'subtract');

  function isString(input) {
    return typeof input === 'string' || input instanceof String;
  } // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined


  function isMomentInput(input) {
    return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
  }

  function isMomentInputObject(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = ['years', 'year', 'y', 'months', 'month', 'M', 'days', 'day', 'd', 'dates', 'date', 'D', 'hours', 'hour', 'h', 'minutes', 'minute', 'm', 'seconds', 'second', 's', 'milliseconds', 'millisecond', 'ms'],
        i,
        property;

    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
  }

  function isNumberOrStringArray(input) {
    var arrayTest = isArray(input),
        dataTypeTest = false;

    if (arrayTest) {
      dataTypeTest = input.filter(function (item) {
        return !isNumber(item) && isString(input);
      }).length === 0;
    }

    return arrayTest && dataTypeTest;
  }

  function isCalendarSpec(input) {
    var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = ['sameDay', 'nextDay', 'lastDay', 'nextWeek', 'lastWeek', 'sameElse'],
        i,
        property;

    for (i = 0; i < properties.length; i += 1) {
      property = properties[i];
      propertyTest = propertyTest || hasOwnProp(input, property);
    }

    return objectTest && propertyTest;
  }

  function getCalendarFormat(myMoment, now) {
    var diff = myMoment.diff(now, 'days', true);
    return diff < -6 ? 'sameElse' : diff < -1 ? 'lastWeek' : diff < 0 ? 'lastDay' : diff < 1 ? 'sameDay' : diff < 2 ? 'nextDay' : diff < 7 ? 'nextWeek' : 'sameElse';
  }

  function calendar$1(time, formats) {
    // Support for single parameter, formats only overload to the calendar function
    if (arguments.length === 1) {
      if (isMomentInput(arguments[0])) {
        time = arguments[0];
        formats = undefined;
      } else if (isCalendarSpec(arguments[0])) {
        formats = arguments[0];
        time = undefined;
      }
    } // We want to compare the start of today, vs this.
    // Getting start-of-today depends on whether we're local/utc/offset or not.


    var now = time || createLocal(),
        sod = cloneWithOffset(now, this).startOf('day'),
        format = hooks.calendarFormat(this, sod) || 'sameElse',
        output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);
    return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
  }

  function clone() {
    return new Moment(this);
  }

  function isAfter(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() > localInput.valueOf();
    } else {
      return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
  }

  function isBefore(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() < localInput.valueOf();
    } else {
      return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
  }

  function isBetween(from, to, units, inclusivity) {
    var localFrom = isMoment(from) ? from : createLocal(from),
        localTo = isMoment(to) ? to : createLocal(to);

    if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
      return false;
    }

    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
  }

  function isSame(input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;

    if (!(this.isValid() && localInput.isValid())) {
      return false;
    }

    units = normalizeUnits(units) || 'millisecond';

    if (units === 'millisecond') {
      return this.valueOf() === localInput.valueOf();
    } else {
      inputMs = localInput.valueOf();
      return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
  }

  function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
  }

  function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
  }

  function diff(input, units, asFloat) {
    var that, zoneDelta, output;

    if (!this.isValid()) {
      return NaN;
    }

    that = cloneWithOffset(input, this);

    if (!that.isValid()) {
      return NaN;
    }

    zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
    units = normalizeUnits(units);

    switch (units) {
      case 'year':
        output = monthDiff(this, that) / 12;
        break;

      case 'month':
        output = monthDiff(this, that);
        break;

      case 'quarter':
        output = monthDiff(this, that) / 3;
        break;

      case 'second':
        output = (this - that) / 1e3;
        break;
      // 1000

      case 'minute':
        output = (this - that) / 6e4;
        break;
      // 1000 * 60

      case 'hour':
        output = (this - that) / 36e5;
        break;
      // 1000 * 60 * 60

      case 'day':
        output = (this - that - zoneDelta) / 864e5;
        break;
      // 1000 * 60 * 60 * 24, negate dst

      case 'week':
        output = (this - that - zoneDelta) / 6048e5;
        break;
      // 1000 * 60 * 60 * 24 * 7, negate dst

      default:
        output = this - that;
    }

    return asFloat ? output : absFloor(output);
  }

  function monthDiff(a, b) {
    if (a.date() < b.date()) {
      // end-of-month calculations work correct when the start month has more
      // days than the end month.
      return -monthDiff(b, a);
    } // difference in months


    var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
        // b is in (anchor - 1 month, anchor + 1 month)
    anchor = a.clone().add(wholeMonthDiff, 'months'),
        anchor2,
        adjust;

    if (b - anchor < 0) {
      anchor2 = a.clone().add(wholeMonthDiff - 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor - anchor2);
    } else {
      anchor2 = a.clone().add(wholeMonthDiff + 1, 'months'); // linear across the month

      adjust = (b - anchor) / (anchor2 - anchor);
    } //check for negative zero, return zero if negative zero


    return -(wholeMonthDiff + adjust) || 0;
  }

  hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

  function toString() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  function toISOString(keepOffset) {
    if (!this.isValid()) {
      return null;
    }

    var utc = keepOffset !== true,
        m = utc ? this.clone().utc() : this;

    if (m.year() < 0 || m.year() > 9999) {
      return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    if (isFunction(Date.prototype.toISOString)) {
      // native implementation is ~50x faster, use it when we can
      if (utc) {
        return this.toDate().toISOString();
      } else {
        return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
      }
    }

    return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
  }
  /**
   * Return a human readable representation of a moment that can
   * also be evaluated to get a new moment which is the same
   *
   * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
   */


  function inspect() {
    if (!this.isValid()) {
      return 'moment.invalid(/* ' + this._i + ' */)';
    }

    var func = 'moment',
        zone = '',
        prefix,
        year,
        datetime,
        suffix;

    if (!this.isLocal()) {
      func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
      zone = 'Z';
    }

    prefix = '[' + func + '("]';
    year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
    datetime = '-MM-DD[T]HH:mm:ss.SSS';
    suffix = zone + '[")]';
    return this.format(prefix + year + datetime + suffix);
  }

  function format(inputString) {
    if (!inputString) {
      inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
    }

    var output = formatMoment(this, inputString);
    return this.localeData().postformat(output);
  }

  function from(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        to: this,
        from: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function fromNow(withoutSuffix) {
    return this.from(createLocal(), withoutSuffix);
  }

  function to(time, withoutSuffix) {
    if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
      return createDuration({
        from: this,
        to: time
      }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
      return this.localeData().invalidDate();
    }
  }

  function toNow(withoutSuffix) {
    return this.to(createLocal(), withoutSuffix);
  } // If passed a locale key, it will set the locale for this
  // instance.  Otherwise, it will return the locale configuration
  // variables for this instance.


  function locale(key) {
    var newLocaleData;

    if (key === undefined) {
      return this._locale._abbr;
    } else {
      newLocaleData = getLocale(key);

      if (newLocaleData != null) {
        this._locale = newLocaleData;
      }

      return this;
    }
  }

  var lang = deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
      return this.localeData();
    } else {
      return this.locale(key);
    }
  });

  function localeData() {
    return this._locale;
  }

  var MS_PER_SECOND = 1000,
      MS_PER_MINUTE = 60 * MS_PER_SECOND,
      MS_PER_HOUR = 60 * MS_PER_MINUTE,
      MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR; // actual modulo - handles negative numbers (for dates before 1970):

  function mod$1(dividend, divisor) {
    return (dividend % divisor + divisor) % divisor;
  }

  function localStartOfDate(y, m, d) {
    // the date constructor remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return new Date(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return new Date(y, m, d).valueOf();
    }
  }

  function utcStartOfDate(y, m, d) {
    // Date.UTC remaps years 0-99 to 1900-1999
    if (y < 100 && y >= 0) {
      // preserve leap years using a full 400 year cycle, then reset
      return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
    } else {
      return Date.UTC(y, m, d);
    }
  }

  function startOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year(), 0, 1);
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
        break;

      case 'month':
        time = startOfDate(this.year(), this.month(), 1);
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date());
        break;

      case 'hour':
        time = this._d.valueOf();
        time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;

      case 'minute':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_MINUTE);
        break;

      case 'second':
        time = this._d.valueOf();
        time -= mod$1(time, MS_PER_SECOND);
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function endOf(units) {
    var time, startOfDate;
    units = normalizeUnits(units);

    if (units === undefined || units === 'millisecond' || !this.isValid()) {
      return this;
    }

    startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

    switch (units) {
      case 'year':
        time = startOfDate(this.year() + 1, 0, 1) - 1;
        break;

      case 'quarter':
        time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;

      case 'month':
        time = startOfDate(this.year(), this.month() + 1, 1) - 1;
        break;

      case 'week':
        time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;

      case 'isoWeek':
        time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;

      case 'day':
      case 'date':
        time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
        break;

      case 'hour':
        time = this._d.valueOf();
        time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;

      case 'minute':
        time = this._d.valueOf();
        time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
        break;

      case 'second':
        time = this._d.valueOf();
        time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
        break;
    }

    this._d.setTime(time);

    hooks.updateOffset(this, true);
    return this;
  }

  function valueOf() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
  }

  function unix() {
    return Math.floor(this.valueOf() / 1000);
  }

  function toDate() {
    return new Date(this.valueOf());
  }

  function toArray() {
    var m = this;
    return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
  }

  function toObject() {
    var m = this;
    return {
      years: m.year(),
      months: m.month(),
      date: m.date(),
      hours: m.hours(),
      minutes: m.minutes(),
      seconds: m.seconds(),
      milliseconds: m.milliseconds()
    };
  }

  function toJSON() {
    // new Date(NaN).toJSON() === null
    return this.isValid() ? this.toISOString() : null;
  }

  function isValid$2() {
    return isValid(this);
  }

  function parsingFlags() {
    return extend({}, getParsingFlags(this));
  }

  function invalidAt() {
    return getParsingFlags(this).overflow;
  }

  function creationData() {
    return {
      input: this._i,
      format: this._f,
      locale: this._locale,
      isUTC: this._isUTC,
      strict: this._strict
    };
  }

  addFormatToken('N', 0, 0, 'eraAbbr');
  addFormatToken('NN', 0, 0, 'eraAbbr');
  addFormatToken('NNN', 0, 0, 'eraAbbr');
  addFormatToken('NNNN', 0, 0, 'eraName');
  addFormatToken('NNNNN', 0, 0, 'eraNarrow');
  addFormatToken('y', ['y', 1], 'yo', 'eraYear');
  addFormatToken('y', ['yy', 2], 0, 'eraYear');
  addFormatToken('y', ['yyy', 3], 0, 'eraYear');
  addFormatToken('y', ['yyyy', 4], 0, 'eraYear');
  addRegexToken('N', matchEraAbbr);
  addRegexToken('NN', matchEraAbbr);
  addRegexToken('NNN', matchEraAbbr);
  addRegexToken('NNNN', matchEraName);
  addRegexToken('NNNNN', matchEraNarrow);
  addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (input, array, config, token) {
    var era = config._locale.erasParse(input, token, config._strict);

    if (era) {
      getParsingFlags(config).era = era;
    } else {
      getParsingFlags(config).invalidEra = input;
    }
  });
  addRegexToken('y', matchUnsigned);
  addRegexToken('yy', matchUnsigned);
  addRegexToken('yyy', matchUnsigned);
  addRegexToken('yyyy', matchUnsigned);
  addRegexToken('yo', matchEraYearOrdinal);
  addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
  addParseToken(['yo'], function (input, array, config, token) {
    var match;

    if (config._locale._eraYearOrdinalRegex) {
      match = input.match(config._locale._eraYearOrdinalRegex);
    }

    if (config._locale.eraYearOrdinalParse) {
      array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
    } else {
      array[YEAR] = parseInt(input, 10);
    }
  });

  function localeEras(m, format) {
    var i,
        l,
        date,
        eras = this._eras || getLocale('en')._eras;

    for (i = 0, l = eras.length; i < l; ++i) {
      switch (typeof eras[i].since) {
        case 'string':
          // truncate time
          date = hooks(eras[i].since).startOf('day');
          eras[i].since = date.valueOf();
          break;
      }

      switch (typeof eras[i].until) {
        case 'undefined':
          eras[i].until = +Infinity;
          break;

        case 'string':
          // truncate time
          date = hooks(eras[i].until).startOf('day').valueOf();
          eras[i].until = date.valueOf();
          break;
      }
    }

    return eras;
  }

  function localeErasParse(eraName, format, strict) {
    var i,
        l,
        eras = this.eras(),
        name,
        abbr,
        narrow;
    eraName = eraName.toUpperCase();

    for (i = 0, l = eras.length; i < l; ++i) {
      name = eras[i].name.toUpperCase();
      abbr = eras[i].abbr.toUpperCase();
      narrow = eras[i].narrow.toUpperCase();

      if (strict) {
        switch (format) {
          case 'N':
          case 'NN':
          case 'NNN':
            if (abbr === eraName) {
              return eras[i];
            }

            break;

          case 'NNNN':
            if (name === eraName) {
              return eras[i];
            }

            break;

          case 'NNNNN':
            if (narrow === eraName) {
              return eras[i];
            }

            break;
        }
      } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
        return eras[i];
      }
    }
  }

  function localeErasConvertYear(era, year) {
    var dir = era.since <= era.until ? +1 : -1;

    if (year === undefined) {
      return hooks(era.since).year();
    } else {
      return hooks(era.since).year() + (year - era.offset) * dir;
    }
  }

  function getEraName() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].name;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].name;
      }
    }

    return '';
  }

  function getEraNarrow() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].narrow;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].narrow;
      }
    }

    return '';
  }

  function getEraAbbr() {
    var i,
        l,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      // truncate time
      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until) {
        return eras[i].abbr;
      }

      if (eras[i].until <= val && val <= eras[i].since) {
        return eras[i].abbr;
      }
    }

    return '';
  }

  function getEraYear() {
    var i,
        l,
        dir,
        val,
        eras = this.localeData().eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      dir = eras[i].since <= eras[i].until ? +1 : -1; // truncate time

      val = this.clone().startOf('day').valueOf();

      if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
        return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
      }
    }

    return this.year();
  }

  function erasNameRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNameRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasNameRegex : this._erasRegex;
  }

  function erasAbbrRegex(isStrict) {
    if (!hasOwnProp(this, '_erasAbbrRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasAbbrRegex : this._erasRegex;
  }

  function erasNarrowRegex(isStrict) {
    if (!hasOwnProp(this, '_erasNarrowRegex')) {
      computeErasParse.call(this);
    }

    return isStrict ? this._erasNarrowRegex : this._erasRegex;
  }

  function matchEraAbbr(isStrict, locale) {
    return locale.erasAbbrRegex(isStrict);
  }

  function matchEraName(isStrict, locale) {
    return locale.erasNameRegex(isStrict);
  }

  function matchEraNarrow(isStrict, locale) {
    return locale.erasNarrowRegex(isStrict);
  }

  function matchEraYearOrdinal(isStrict, locale) {
    return locale._eraYearOrdinalRegex || matchUnsigned;
  }

  function computeErasParse() {
    var abbrPieces = [],
        namePieces = [],
        narrowPieces = [],
        mixedPieces = [],
        i,
        l,
        eras = this.eras();

    for (i = 0, l = eras.length; i < l; ++i) {
      namePieces.push(regexEscape(eras[i].name));
      abbrPieces.push(regexEscape(eras[i].abbr));
      narrowPieces.push(regexEscape(eras[i].narrow));
      mixedPieces.push(regexEscape(eras[i].name));
      mixedPieces.push(regexEscape(eras[i].abbr));
      mixedPieces.push(regexEscape(eras[i].narrow));
    }

    this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
    this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
    this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
    this._erasNarrowRegex = new RegExp('^(' + narrowPieces.join('|') + ')', 'i');
  } // FORMATTING


  addFormatToken(0, ['gg', 2], 0, function () {
    return this.weekYear() % 100;
  });
  addFormatToken(0, ['GG', 2], 0, function () {
    return this.isoWeekYear() % 100;
  });

  function addWeekYearFormatToken(token, getter) {
    addFormatToken(0, [token, token.length], 0, getter);
  }

  addWeekYearFormatToken('gggg', 'weekYear');
  addWeekYearFormatToken('ggggg', 'weekYear');
  addWeekYearFormatToken('GGGG', 'isoWeekYear');
  addWeekYearFormatToken('GGGGG', 'isoWeekYear'); // ALIASES

  addUnitAlias('weekYear', 'gg');
  addUnitAlias('isoWeekYear', 'GG'); // PRIORITY

  addUnitPriority('weekYear', 1);
  addUnitPriority('isoWeekYear', 1); // PARSING

  addRegexToken('G', matchSigned);
  addRegexToken('g', matchSigned);
  addRegexToken('GG', match1to2, match2);
  addRegexToken('gg', match1to2, match2);
  addRegexToken('GGGG', match1to4, match4);
  addRegexToken('gggg', match1to4, match4);
  addRegexToken('GGGGG', match1to6, match6);
  addRegexToken('ggggg', match1to6, match6);
  addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
    week[token.substr(0, 2)] = toInt(input);
  });
  addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
    week[token] = hooks.parseTwoDigitYear(input);
  }); // MOMENTS

  function getSetWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
  }

  function getSetISOWeekYear(input) {
    return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
  }

  function getISOWeeksInYear() {
    return weeksInYear(this.year(), 1, 4);
  }

  function getISOWeeksInISOWeekYear() {
    return weeksInYear(this.isoWeekYear(), 1, 4);
  }

  function getWeeksInYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
  }

  function getWeeksInWeekYear() {
    var weekInfo = this.localeData()._week;

    return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
  }

  function getSetWeekYearHelper(input, week, weekday, dow, doy) {
    var weeksTarget;

    if (input == null) {
      return weekOfYear(this, dow, doy).year;
    } else {
      weeksTarget = weeksInYear(input, dow, doy);

      if (week > weeksTarget) {
        week = weeksTarget;
      }

      return setWeekAll.call(this, input, week, weekday, dow, doy);
    }
  }

  function setWeekAll(weekYear, week, weekday, dow, doy) {
    var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
    this.year(date.getUTCFullYear());
    this.month(date.getUTCMonth());
    this.date(date.getUTCDate());
    return this;
  } // FORMATTING


  addFormatToken('Q', 0, 'Qo', 'quarter'); // ALIASES

  addUnitAlias('quarter', 'Q'); // PRIORITY

  addUnitPriority('quarter', 7); // PARSING

  addRegexToken('Q', match1);
  addParseToken('Q', function (input, array) {
    array[MONTH] = (toInt(input) - 1) * 3;
  }); // MOMENTS

  function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
  } // FORMATTING


  addFormatToken('D', ['DD', 2], 'Do', 'date'); // ALIASES

  addUnitAlias('date', 'D'); // PRIORITY

  addUnitPriority('date', 9); // PARSING

  addRegexToken('D', match1to2);
  addRegexToken('DD', match1to2, match2);
  addRegexToken('Do', function (isStrict, locale) {
    // TODO: Remove "ordinalParse" fallback in next major release.
    return isStrict ? locale._dayOfMonthOrdinalParse || locale._ordinalParse : locale._dayOfMonthOrdinalParseLenient;
  });
  addParseToken(['D', 'DD'], DATE);
  addParseToken('Do', function (input, array) {
    array[DATE] = toInt(input.match(match1to2)[0]);
  }); // MOMENTS

  var getSetDayOfMonth = makeGetSet('Date', true); // FORMATTING

  addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear'); // ALIASES

  addUnitAlias('dayOfYear', 'DDD'); // PRIORITY

  addUnitPriority('dayOfYear', 4); // PARSING

  addRegexToken('DDD', match1to3);
  addRegexToken('DDDD', match3);
  addParseToken(['DDD', 'DDDD'], function (input, array, config) {
    config._dayOfYear = toInt(input);
  }); // HELPERS
  // MOMENTS

  function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
  } // FORMATTING


  addFormatToken('m', ['mm', 2], 0, 'minute'); // ALIASES

  addUnitAlias('minute', 'm'); // PRIORITY

  addUnitPriority('minute', 14); // PARSING

  addRegexToken('m', match1to2);
  addRegexToken('mm', match1to2, match2);
  addParseToken(['m', 'mm'], MINUTE); // MOMENTS

  var getSetMinute = makeGetSet('Minutes', false); // FORMATTING

  addFormatToken('s', ['ss', 2], 0, 'second'); // ALIASES

  addUnitAlias('second', 's'); // PRIORITY

  addUnitPriority('second', 15); // PARSING

  addRegexToken('s', match1to2);
  addRegexToken('ss', match1to2, match2);
  addParseToken(['s', 'ss'], SECOND); // MOMENTS

  var getSetSecond = makeGetSet('Seconds', false); // FORMATTING

  addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  });
  addFormatToken(0, ['SS', 2], 0, function () {
    return ~~(this.millisecond() / 10);
  });
  addFormatToken(0, ['SSS', 3], 0, 'millisecond');
  addFormatToken(0, ['SSSS', 4], 0, function () {
    return this.millisecond() * 10;
  });
  addFormatToken(0, ['SSSSS', 5], 0, function () {
    return this.millisecond() * 100;
  });
  addFormatToken(0, ['SSSSSS', 6], 0, function () {
    return this.millisecond() * 1000;
  });
  addFormatToken(0, ['SSSSSSS', 7], 0, function () {
    return this.millisecond() * 10000;
  });
  addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
    return this.millisecond() * 100000;
  });
  addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
    return this.millisecond() * 1000000;
  }); // ALIASES

  addUnitAlias('millisecond', 'ms'); // PRIORITY

  addUnitPriority('millisecond', 16); // PARSING

  addRegexToken('S', match1to3, match1);
  addRegexToken('SS', match1to3, match2);
  addRegexToken('SSS', match1to3, match3);
  var token, getSetMillisecond;

  for (token = 'SSSS'; token.length <= 9; token += 'S') {
    addRegexToken(token, matchUnsigned);
  }

  function parseMs(input, array) {
    array[MILLISECOND] = toInt(('0.' + input) * 1000);
  }

  for (token = 'S'; token.length <= 9; token += 'S') {
    addParseToken(token, parseMs);
  }

  getSetMillisecond = makeGetSet('Milliseconds', false); // FORMATTING

  addFormatToken('z', 0, 0, 'zoneAbbr');
  addFormatToken('zz', 0, 0, 'zoneName'); // MOMENTS

  function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
  }

  function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }

  var proto = Moment.prototype;
  proto.add = add;
  proto.calendar = calendar$1;
  proto.clone = clone;
  proto.diff = diff;
  proto.endOf = endOf;
  proto.format = format;
  proto.from = from;
  proto.fromNow = fromNow;
  proto.to = to;
  proto.toNow = toNow;
  proto.get = stringGet;
  proto.invalidAt = invalidAt;
  proto.isAfter = isAfter;
  proto.isBefore = isBefore;
  proto.isBetween = isBetween;
  proto.isSame = isSame;
  proto.isSameOrAfter = isSameOrAfter;
  proto.isSameOrBefore = isSameOrBefore;
  proto.isValid = isValid$2;
  proto.lang = lang;
  proto.locale = locale;
  proto.localeData = localeData;
  proto.max = prototypeMax;
  proto.min = prototypeMin;
  proto.parsingFlags = parsingFlags;
  proto.set = stringSet;
  proto.startOf = startOf;
  proto.subtract = subtract;
  proto.toArray = toArray;
  proto.toObject = toObject;
  proto.toDate = toDate;
  proto.toISOString = toISOString;
  proto.inspect = inspect;

  if (typeof Symbol !== 'undefined' && Symbol.for != null) {
    proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
      return 'Moment<' + this.format() + '>';
    };
  }

  proto.toJSON = toJSON;
  proto.toString = toString;
  proto.unix = unix;
  proto.valueOf = valueOf;
  proto.creationData = creationData;
  proto.eraName = getEraName;
  proto.eraNarrow = getEraNarrow;
  proto.eraAbbr = getEraAbbr;
  proto.eraYear = getEraYear;
  proto.year = getSetYear;
  proto.isLeapYear = getIsLeapYear;
  proto.weekYear = getSetWeekYear;
  proto.isoWeekYear = getSetISOWeekYear;
  proto.quarter = proto.quarters = getSetQuarter;
  proto.month = getSetMonth;
  proto.daysInMonth = getDaysInMonth;
  proto.week = proto.weeks = getSetWeek;
  proto.isoWeek = proto.isoWeeks = getSetISOWeek;
  proto.weeksInYear = getWeeksInYear;
  proto.weeksInWeekYear = getWeeksInWeekYear;
  proto.isoWeeksInYear = getISOWeeksInYear;
  proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
  proto.date = getSetDayOfMonth;
  proto.day = proto.days = getSetDayOfWeek;
  proto.weekday = getSetLocaleDayOfWeek;
  proto.isoWeekday = getSetISODayOfWeek;
  proto.dayOfYear = getSetDayOfYear;
  proto.hour = proto.hours = getSetHour;
  proto.minute = proto.minutes = getSetMinute;
  proto.second = proto.seconds = getSetSecond;
  proto.millisecond = proto.milliseconds = getSetMillisecond;
  proto.utcOffset = getSetOffset;
  proto.utc = setOffsetToUTC;
  proto.local = setOffsetToLocal;
  proto.parseZone = setOffsetToParsedOffset;
  proto.hasAlignedHourOffset = hasAlignedHourOffset;
  proto.isDST = isDaylightSavingTime;
  proto.isLocal = isLocal;
  proto.isUtcOffset = isUtcOffset;
  proto.isUtc = isUtc;
  proto.isUTC = isUtc;
  proto.zoneAbbr = getZoneAbbr;
  proto.zoneName = getZoneName;
  proto.dates = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
  proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
  proto.years = deprecate('years accessor is deprecated. Use year instead', getSetYear);
  proto.zone = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
  proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

  function createUnix(input) {
    return createLocal(input * 1000);
  }

  function createInZone() {
    return createLocal.apply(null, arguments).parseZone();
  }

  function preParsePostFormat(string) {
    return string;
  }

  var proto$1 = Locale.prototype;
  proto$1.calendar = calendar;
  proto$1.longDateFormat = longDateFormat;
  proto$1.invalidDate = invalidDate;
  proto$1.ordinal = ordinal;
  proto$1.preparse = preParsePostFormat;
  proto$1.postformat = preParsePostFormat;
  proto$1.relativeTime = relativeTime;
  proto$1.pastFuture = pastFuture;
  proto$1.set = set;
  proto$1.eras = localeEras;
  proto$1.erasParse = localeErasParse;
  proto$1.erasConvertYear = localeErasConvertYear;
  proto$1.erasAbbrRegex = erasAbbrRegex;
  proto$1.erasNameRegex = erasNameRegex;
  proto$1.erasNarrowRegex = erasNarrowRegex;
  proto$1.months = localeMonths;
  proto$1.monthsShort = localeMonthsShort;
  proto$1.monthsParse = localeMonthsParse;
  proto$1.monthsRegex = monthsRegex;
  proto$1.monthsShortRegex = monthsShortRegex;
  proto$1.week = localeWeek;
  proto$1.firstDayOfYear = localeFirstDayOfYear;
  proto$1.firstDayOfWeek = localeFirstDayOfWeek;
  proto$1.weekdays = localeWeekdays;
  proto$1.weekdaysMin = localeWeekdaysMin;
  proto$1.weekdaysShort = localeWeekdaysShort;
  proto$1.weekdaysParse = localeWeekdaysParse;
  proto$1.weekdaysRegex = weekdaysRegex;
  proto$1.weekdaysShortRegex = weekdaysShortRegex;
  proto$1.weekdaysMinRegex = weekdaysMinRegex;
  proto$1.isPM = localeIsPM;
  proto$1.meridiem = localeMeridiem;

  function get$1(format, index, field, setter) {
    var locale = getLocale(),
        utc = createUTC().set(setter, index);
    return locale[field](utc, format);
  }

  function listMonthsImpl(format, index, field) {
    if (isNumber(format)) {
      index = format;
      format = undefined;
    }

    format = format || '';

    if (index != null) {
      return get$1(format, index, field, 'month');
    }

    var i,
        out = [];

    for (i = 0; i < 12; i++) {
      out[i] = get$1(format, i, field, 'month');
    }

    return out;
  } // ()
  // (5)
  // (fmt, 5)
  // (fmt)
  // (true)
  // (true, 5)
  // (true, fmt, 5)
  // (true, fmt)


  function listWeekdaysImpl(localeSorted, format, index, field) {
    if (typeof localeSorted === 'boolean') {
      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    } else {
      format = localeSorted;
      index = format;
      localeSorted = false;

      if (isNumber(format)) {
        index = format;
        format = undefined;
      }

      format = format || '';
    }

    var locale = getLocale(),
        shift = localeSorted ? locale._week.dow : 0,
        i,
        out = [];

    if (index != null) {
      return get$1(format, (index + shift) % 7, field, 'day');
    }

    for (i = 0; i < 7; i++) {
      out[i] = get$1(format, (i + shift) % 7, field, 'day');
    }

    return out;
  }

  function listMonths(format, index) {
    return listMonthsImpl(format, index, 'months');
  }

  function listMonthsShort(format, index) {
    return listMonthsImpl(format, index, 'monthsShort');
  }

  function listWeekdays(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
  }

  function listWeekdaysShort(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
  }

  function listWeekdaysMin(localeSorted, format, index) {
    return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
  }

  getSetGlobalLocale('en', {
    eras: [{
      since: '0001-01-01',
      until: +Infinity,
      offset: 1,
      name: 'Anno Domini',
      narrow: 'AD',
      abbr: 'AD'
    }, {
      since: '0000-12-31',
      until: -Infinity,
      offset: 1,
      name: 'Before Christ',
      narrow: 'BC',
      abbr: 'BC'
    }],
    dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
      var b = number % 10,
          output = toInt(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
      return number + output;
    }
  }); // Side effect imports

  hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
  hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);
  var mathAbs = Math.abs;

  function abs() {
    var data = this._data;
    this._milliseconds = mathAbs(this._milliseconds);
    this._days = mathAbs(this._days);
    this._months = mathAbs(this._months);
    data.milliseconds = mathAbs(data.milliseconds);
    data.seconds = mathAbs(data.seconds);
    data.minutes = mathAbs(data.minutes);
    data.hours = mathAbs(data.hours);
    data.months = mathAbs(data.months);
    data.years = mathAbs(data.years);
    return this;
  }

  function addSubtract$1(duration, input, value, direction) {
    var other = createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
  } // supports only 2.0-style add(1, 's') or add(duration)


  function add$1(input, value) {
    return addSubtract$1(this, input, value, 1);
  } // supports only 2.0-style subtract(1, 's') or subtract(duration)


  function subtract$1(input, value) {
    return addSubtract$1(this, input, value, -1);
  }

  function absCeil(number) {
    if (number < 0) {
      return Math.floor(number);
    } else {
      return Math.ceil(number);
    }
  }

  function bubble() {
    var milliseconds = this._milliseconds,
        days = this._days,
        months = this._months,
        data = this._data,
        seconds,
        minutes,
        hours,
        years,
        monthsFromDays; // if we have a mix of positive and negative values, bubble down first
    // check: https://github.com/moment/moment/issues/2166

    if (!(milliseconds >= 0 && days >= 0 && months >= 0 || milliseconds <= 0 && days <= 0 && months <= 0)) {
      milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
      days = 0;
      months = 0;
    } // The following code bubbles up values, see the tests for
    // examples of what that means.


    data.milliseconds = milliseconds % 1000;
    seconds = absFloor(milliseconds / 1000);
    data.seconds = seconds % 60;
    minutes = absFloor(seconds / 60);
    data.minutes = minutes % 60;
    hours = absFloor(minutes / 60);
    data.hours = hours % 24;
    days += absFloor(hours / 24); // convert days to months

    monthsFromDays = absFloor(daysToMonths(days));
    months += monthsFromDays;
    days -= absCeil(monthsToDays(monthsFromDays)); // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12;
    data.days = days;
    data.months = months;
    data.years = years;
    return this;
  }

  function daysToMonths(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    // 400 years have 12 months === 4800
    return days * 4800 / 146097;
  }

  function monthsToDays(months) {
    // the reverse of daysToMonths
    return months * 146097 / 4800;
  }

  function as(units) {
    if (!this.isValid()) {
      return NaN;
    }

    var days,
        months,
        milliseconds = this._milliseconds;
    units = normalizeUnits(units);

    if (units === 'month' || units === 'quarter' || units === 'year') {
      days = this._days + milliseconds / 864e5;
      months = this._months + daysToMonths(days);

      switch (units) {
        case 'month':
          return months;

        case 'quarter':
          return months / 3;

        case 'year':
          return months / 12;
      }
    } else {
      // handle milliseconds separately because of floating point math errors (issue #1867)
      days = this._days + Math.round(monthsToDays(this._months));

      switch (units) {
        case 'week':
          return days / 7 + milliseconds / 6048e5;

        case 'day':
          return days + milliseconds / 864e5;

        case 'hour':
          return days * 24 + milliseconds / 36e5;

        case 'minute':
          return days * 1440 + milliseconds / 6e4;

        case 'second':
          return days * 86400 + milliseconds / 1000;
        // Math.floor prevents floating point math errors here

        case 'millisecond':
          return Math.floor(days * 864e5) + milliseconds;

        default:
          throw new Error('Unknown unit ' + units);
      }
    }
  } // TODO: Use this.as('ms')?


  function valueOf$1() {
    if (!this.isValid()) {
      return NaN;
    }

    return this._milliseconds + this._days * 864e5 + this._months % 12 * 2592e6 + toInt(this._months / 12) * 31536e6;
  }

  function makeAs(alias) {
    return function () {
      return this.as(alias);
    };
  }

  var asMilliseconds = makeAs('ms'),
      asSeconds = makeAs('s'),
      asMinutes = makeAs('m'),
      asHours = makeAs('h'),
      asDays = makeAs('d'),
      asWeeks = makeAs('w'),
      asMonths = makeAs('M'),
      asQuarters = makeAs('Q'),
      asYears = makeAs('y');

  function clone$1() {
    return createDuration(this);
  }

  function get$2(units) {
    units = normalizeUnits(units);
    return this.isValid() ? this[units + 's']() : NaN;
  }

  function makeGetter(name) {
    return function () {
      return this.isValid() ? this._data[name] : NaN;
    };
  }

  var milliseconds = makeGetter('milliseconds'),
      seconds = makeGetter('seconds'),
      minutes = makeGetter('minutes'),
      hours = makeGetter('hours'),
      days = makeGetter('days'),
      months = makeGetter('months'),
      years = makeGetter('years');

  function weeks() {
    return absFloor(this.days() / 7);
  }

  var round = Math.round,
      thresholds = {
    ss: 44,
    // a few seconds to seconds
    s: 45,
    // seconds to minute
    m: 45,
    // minutes to hour
    h: 22,
    // hours to day
    d: 26,
    // days to month/week
    w: null,
    // weeks to month
    M: 11 // months to year

  }; // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize

  function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
  }

  function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
    var duration = createDuration(posNegDuration).abs(),
        seconds = round(duration.as('s')),
        minutes = round(duration.as('m')),
        hours = round(duration.as('h')),
        days = round(duration.as('d')),
        months = round(duration.as('M')),
        weeks = round(duration.as('w')),
        years = round(duration.as('y')),
        a = seconds <= thresholds.ss && ['s', seconds] || seconds < thresholds.s && ['ss', seconds] || minutes <= 1 && ['m'] || minutes < thresholds.m && ['mm', minutes] || hours <= 1 && ['h'] || hours < thresholds.h && ['hh', hours] || days <= 1 && ['d'] || days < thresholds.d && ['dd', days];

    if (thresholds.w != null) {
      a = a || weeks <= 1 && ['w'] || weeks < thresholds.w && ['ww', weeks];
    }

    a = a || months <= 1 && ['M'] || months < thresholds.M && ['MM', months] || years <= 1 && ['y'] || ['yy', years];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
  } // This function allows you to set the rounding function for relative time strings


  function getSetRelativeTimeRounding(roundingFunction) {
    if (roundingFunction === undefined) {
      return round;
    }

    if (typeof roundingFunction === 'function') {
      round = roundingFunction;
      return true;
    }

    return false;
  } // This function allows you to set a threshold for relative time strings


  function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
      return false;
    }

    if (limit === undefined) {
      return thresholds[threshold];
    }

    thresholds[threshold] = limit;

    if (threshold === 's') {
      thresholds.ss = limit - 1;
    }

    return true;
  }

  function humanize(argWithSuffix, argThresholds) {
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var withSuffix = false,
        th = thresholds,
        locale,
        output;

    if (typeof argWithSuffix === 'object') {
      argThresholds = argWithSuffix;
      argWithSuffix = false;
    }

    if (typeof argWithSuffix === 'boolean') {
      withSuffix = argWithSuffix;
    }

    if (typeof argThresholds === 'object') {
      th = Object.assign({}, thresholds, argThresholds);

      if (argThresholds.s != null && argThresholds.ss == null) {
        th.ss = argThresholds.s - 1;
      }
    }

    locale = this.localeData();
    output = relativeTime$1(this, !withSuffix, th, locale);

    if (withSuffix) {
      output = locale.pastFuture(+this, output);
    }

    return locale.postformat(output);
  }

  var abs$1 = Math.abs;

  function sign(x) {
    return (x > 0) - (x < 0) || +x;
  }

  function toISOString$1() {
    // for ISO strings we do not use the normal bubbling rules:
    //  * milliseconds bubble up until they become hours
    //  * days do not bubble at all
    //  * months bubble up until they become years
    // This is because there is no context-free conversion between hours and days
    // (think of clock changes)
    // and also not between days and months (28-31 days per month)
    if (!this.isValid()) {
      return this.localeData().invalidDate();
    }

    var seconds = abs$1(this._milliseconds) / 1000,
        days = abs$1(this._days),
        months = abs$1(this._months),
        minutes,
        hours,
        years,
        s,
        total = this.asSeconds(),
        totalSign,
        ymSign,
        daysSign,
        hmsSign;

    if (!total) {
      // this is the same as C#'s (Noda) and python (isodate)...
      // but not other JS (goog.date)
      return 'P0D';
    } // 3600 seconds -> 60 minutes -> 1 hour


    minutes = absFloor(seconds / 60);
    hours = absFloor(minutes / 60);
    seconds %= 60;
    minutes %= 60; // 12 months -> 1 year

    years = absFloor(months / 12);
    months %= 12; // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js

    s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
    totalSign = total < 0 ? '-' : '';
    ymSign = sign(this._months) !== sign(total) ? '-' : '';
    daysSign = sign(this._days) !== sign(total) ? '-' : '';
    hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';
    return totalSign + 'P' + (years ? ymSign + years + 'Y' : '') + (months ? ymSign + months + 'M' : '') + (days ? daysSign + days + 'D' : '') + (hours || minutes || seconds ? 'T' : '') + (hours ? hmsSign + hours + 'H' : '') + (minutes ? hmsSign + minutes + 'M' : '') + (seconds ? hmsSign + s + 'S' : '');
  }

  var proto$2 = Duration.prototype;
  proto$2.isValid = isValid$1;
  proto$2.abs = abs;
  proto$2.add = add$1;
  proto$2.subtract = subtract$1;
  proto$2.as = as;
  proto$2.asMilliseconds = asMilliseconds;
  proto$2.asSeconds = asSeconds;
  proto$2.asMinutes = asMinutes;
  proto$2.asHours = asHours;
  proto$2.asDays = asDays;
  proto$2.asWeeks = asWeeks;
  proto$2.asMonths = asMonths;
  proto$2.asQuarters = asQuarters;
  proto$2.asYears = asYears;
  proto$2.valueOf = valueOf$1;
  proto$2._bubble = bubble;
  proto$2.clone = clone$1;
  proto$2.get = get$2;
  proto$2.milliseconds = milliseconds;
  proto$2.seconds = seconds;
  proto$2.minutes = minutes;
  proto$2.hours = hours;
  proto$2.days = days;
  proto$2.weeks = weeks;
  proto$2.months = months;
  proto$2.years = years;
  proto$2.humanize = humanize;
  proto$2.toISOString = toISOString$1;
  proto$2.toString = toISOString$1;
  proto$2.toJSON = toISOString$1;
  proto$2.locale = locale;
  proto$2.localeData = localeData;
  proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
  proto$2.lang = lang; // FORMATTING

  addFormatToken('X', 0, 0, 'unix');
  addFormatToken('x', 0, 0, 'valueOf'); // PARSING

  addRegexToken('x', matchSigned);
  addRegexToken('X', matchTimestamp);
  addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input) * 1000);
  });
  addParseToken('x', function (input, array, config) {
    config._d = new Date(toInt(input));
  }); //! moment.js

  hooks.version = '2.28.0';
  setHookCallback(createLocal);
  hooks.fn = proto;
  hooks.min = min;
  hooks.max = max;
  hooks.now = now;
  hooks.utc = createUTC;
  hooks.unix = createUnix;
  hooks.months = listMonths;
  hooks.isDate = isDate;
  hooks.locale = getSetGlobalLocale;
  hooks.invalid = createInvalid;
  hooks.duration = createDuration;
  hooks.isMoment = isMoment;
  hooks.weekdays = listWeekdays;
  hooks.parseZone = createInZone;
  hooks.localeData = getLocale;
  hooks.isDuration = isDuration;
  hooks.monthsShort = listMonthsShort;
  hooks.weekdaysMin = listWeekdaysMin;
  hooks.defineLocale = defineLocale;
  hooks.updateLocale = updateLocale;
  hooks.locales = listLocales;
  hooks.weekdaysShort = listWeekdaysShort;
  hooks.normalizeUnits = normalizeUnits;
  hooks.relativeTimeRounding = getSetRelativeTimeRounding;
  hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
  hooks.calendarFormat = getCalendarFormat;
  hooks.prototype = proto; // currently HTML5 input type only supports 24-hour formats

  hooks.HTML5_FMT = {
    DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',
    // <input type="datetime-local" />
    DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',
    // <input type="datetime-local" step="1" />
    DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',
    // <input type="datetime-local" step="0.001" />
    DATE: 'YYYY-MM-DD',
    // <input type="date" />
    TIME: 'HH:mm',
    // <input type="time" />
    TIME_SECONDS: 'HH:mm:ss',
    // <input type="time" step="1" />
    TIME_MS: 'HH:mm:ss.SSS',
    // <input type="time" step="0.001" />
    WEEK: 'GGGG-[W]WW',
    // <input type="week" />
    MONTH: 'YYYY-MM' // <input type="month" />

  };
  return hooks;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../../node_modules/object-assign/index.js":
/*!******************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/object-assign/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ "../../node_modules/preact/compat/dist/compat.module.js":
/*!*******************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/preact/compat/dist/compat.module.js ***!
  \*******************************************************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary, createElement, createContext, createRef, Fragment, Component, default, version, Children, render, hydrate, unmountComponentAtNode, createPortal, createFactory, cloneElement, isValidElement, findDOMNode, PureComponent, memo, forwardRef, unstable_batchedUpdates, StrictMode, Suspense, SuspenseList, lazy, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return Q; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return U; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return V; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hydrate", function() { return Z; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return en; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return j; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return X; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return tn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return nn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return rn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return R; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memo", function() { return w; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forwardRef", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StrictMode", function() { return un; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Suspense", function() { return O; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuspenseList", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lazy", function() { return D; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", function() { return K; });
/* harmony import */ var preact_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact/hooks */ "../../node_modules/preact/hooks/dist/hooks.module.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useReducer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useMemo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useDebugValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useErrorBoundary"]; });

/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createElement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createContext", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRef", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["createRef"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return preact__WEBPACK_IMPORTED_MODULE_1__["Component"]; });






function S(n, t) {
  for (var e in t) n[e] = t[e];

  return n;
}

function C(n, t) {
  for (var e in n) if ("__source" !== e && !(e in t)) return !0;

  for (var r in t) if ("__source" !== r && n[r] !== t[r]) return !0;

  return !1;
}

function R(n) {
  this.props = n;
}

function w(n, t) {
  function e(n) {
    var e = this.props.ref,
        r = e == n.ref;
    return !r && e && (e.call ? e(null) : e.current = null), t ? !t(this.props, n) || !r : C(this.props, n);
  }

  function r(t) {
    return this.shouldComponentUpdate = e, Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(n, t);
  }

  return r.displayName = "Memo(" + (n.displayName || n.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}

(R.prototype = new preact__WEBPACK_IMPORTED_MODULE_1__["Component"]()).isPureReactComponent = !0, R.prototype.shouldComponentUpdate = function (n, t) {
  return C(this.props, n) || C(this.state, t);
};
var x = preact__WEBPACK_IMPORTED_MODULE_1__["options"].__b;

preact__WEBPACK_IMPORTED_MODULE_1__["options"].__b = function (n) {
  n.type && n.type.__f && n.ref && (n.props.ref = n.ref, n.ref = null), x && x(n);
};

var g = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;

function A(n) {
  function t(t, e) {
    var r = S({}, t);
    return delete r.ref, n(r, (e = t.ref || e) && ("object" != typeof e || "current" in e) ? e : null);
  }

  return t.$$typeof = g, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (n.displayName || n.name) + ")", t;
}

var N = function (n, t) {
  return n ? Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n).map(t)) : null;
},
    U = {
  map: N,
  forEach: N,
  count: function (n) {
    return n ? Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n).length : 0;
  },
  only: function (n) {
    var t = Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n);
    if (1 !== t.length) throw "Children.only";
    return t[0];
  },
  toArray: preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"]
},
    F = preact__WEBPACK_IMPORTED_MODULE_1__["options"].__e;

function k(n) {
  return n && ((n = S({}, n)).__c = null, n.__k = n.__k && n.__k.map(k)), n;
}

function L(n) {
  return n && (n.__v = null, n.__k = n.__k && n.__k.map(L)), n;
}

function O() {
  this.__u = 0, this.t = null, this.__b = null;
}

function M(n) {
  var t = n.__.__c;
  return t && t.o && t.o(n);
}

function D(n) {
  var t, e, r;

  function o(o) {
    if (t || (t = n()).then(function (n) {
      e = n.default || n;
    }, function (n) {
      r = n;
    }), r) throw r;
    if (!e) throw t;
    return Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(e, o);
  }

  return o.displayName = "Lazy", o.__f = !0, o;
}

function T() {
  this.u = null, this.i = null;
}

preact__WEBPACK_IMPORTED_MODULE_1__["options"].__e = function (n, t, e) {
  if (n.then) for (var r, o = t; o = o.__;) if ((r = o.__c) && r.__c) return null == t.__e && (t.__e = e.__e, t.__k = e.__k), r.__c(n, t.__c);
  F(n, t, e);
}, (O.prototype = new preact__WEBPACK_IMPORTED_MODULE_1__["Component"]()).__c = function (n, t) {
  var e = this;
  null == e.t && (e.t = []), e.t.push(t);

  var r = M(e.__v),
      o = !1,
      u = function () {
    o || (o = !0, t.componentWillUnmount = t.__c, r ? r(i) : i());
  };

  t.__c = t.componentWillUnmount, t.componentWillUnmount = function () {
    u(), t.__c && t.__c();
  };

  var i = function () {
    var n;
    if (! --e.__u) for (e.__v.__k[0] = L(e.state.o), e.setState({
      o: e.__b = null
    }); n = e.t.pop();) n.forceUpdate();
  };

  e.__u++ || e.setState({
    o: e.__b = e.__v.__k[0]
  }), n.then(u, u);
}, O.prototype.componentWillUnmount = function () {
  this.t = [];
}, O.prototype.render = function (n, t) {
  return this.__b && (this.__v.__k && (this.__v.__k[0] = k(this.__b)), this.__b = null), [Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, t.o ? null : n.children), t.o && n.fallback];
};

var W = function (n, t, e) {
  if (++e[1] === e[0] && n.i.delete(t), n.props.revealOrder && ("t" !== n.props.revealOrder[0] || !n.i.size)) for (e = n.u; e;) {
    for (; e.length > 3;) e.pop()();

    if (e[1] < e[0]) break;
    n.u = e = e[2];
  }
};

function I(n) {
  return this.getChildContext = function () {
    return n.context;
  }, n.children;
}

function P(n) {
  var t = this,
      e = n.l,
      r = Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(I, {
    context: t.context
  }, n.__v);
  t.componentWillUnmount = function () {
    var n = t.s.parentNode;
    n && n.removeChild(t.s), Object(preact__WEBPACK_IMPORTED_MODULE_1__["__u"])(t.v);
  }, t.l && t.l !== e && (t.componentWillUnmount(), t.h = !1), n.__v ? t.h ? (e.__k = t.__k, Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(r, e), t.__k = e.__k) : (t.s = document.createTextNode(""), t.__k = e.__k, Object(preact__WEBPACK_IMPORTED_MODULE_1__["hydrate"])("", e), e.appendChild(t.s), t.h = !0, t.l = e, Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(r, e, t.s), e.__k = t.__k, t.__k = t.s.__k) : t.h && t.componentWillUnmount(), t.v = r;
}

function j(n, t) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["createElement"])(P, {
    __v: n,
    l: t
  });
}

(T.prototype = new preact__WEBPACK_IMPORTED_MODULE_1__["Component"]()).o = function (n) {
  var t = this,
      e = M(t.__v),
      r = t.i.get(n);
  return r[0]++, function (o) {
    var u = function () {
      t.props.revealOrder ? (r.push(o), W(t, n, r)) : o();
    };

    e ? e(u) : u();
  };
}, T.prototype.render = function (n) {
  this.u = null, this.i = new Map();
  var t = Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(n.children);
  n.revealOrder && "b" === n.revealOrder[0] && t.reverse();

  for (var e = t.length; e--;) this.i.set(t[e], this.u = [1, 0, this.u]);

  return n.children;
}, T.prototype.componentDidUpdate = T.prototype.componentDidMount = function () {
  var n = this;
  this.i.forEach(function (t, e) {
    W(n, e, t);
  });
};
var z = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
preact__WEBPACK_IMPORTED_MODULE_1__["Component"].prototype.isReactComponent = {};
var H = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;

function V(n, t, e) {
  if (null == t.__k) for (; t.firstChild;) t.removeChild(t.firstChild);
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

function Z(n, t, e) {
  return Object(preact__WEBPACK_IMPORTED_MODULE_1__["hydrate"])(n, t), "function" == typeof e && e(), n ? n.__c : null;
}

var B = preact__WEBPACK_IMPORTED_MODULE_1__["options"].event;

function Y(n, t) {
  n["UNSAFE_" + t] && !n[t] && Object.defineProperty(n, t, {
    get: function () {
      return this["UNSAFE_" + t];
    },
    set: function (n) {
      this["UNSAFE_" + t] = n;
    }
  });
}

preact__WEBPACK_IMPORTED_MODULE_1__["options"].event = function (n) {
  B && (n = B(n)), n.persist = function () {};
  var t = !1,
      e = !1,
      r = n.stopPropagation;

  n.stopPropagation = function () {
    r.call(n), t = !0;
  };

  var o = n.preventDefault;
  return n.preventDefault = function () {
    o.call(n), e = !0;
  }, n.isPropagationStopped = function () {
    return t;
  }, n.isDefaultPrevented = function () {
    return e;
  }, n.nativeEvent = n;
};

var $,
    q = {
  configurable: !0,
  get: function () {
    return this.class;
  }
},
    G = preact__WEBPACK_IMPORTED_MODULE_1__["options"].vnode;

preact__WEBPACK_IMPORTED_MODULE_1__["options"].vnode = function (n) {
  n.$$typeof = H;
  var t = n.type,
      e = n.props;

  if (t) {
    var r;
    if (e.class != e.className && (q.enumerable = "className" in e, null != e.className && (e.class = e.className), Object.defineProperty(e, "className", q)), "function" != typeof t) for (r in e.defaultValue && void 0 !== e.value && (e.value || 0 === e.value || (e.value = e.defaultValue), e.defaultValue = void 0), "select" === t && e.multiple && Array.isArray(e.value) && (Object(preact__WEBPACK_IMPORTED_MODULE_1__["toChildArray"])(e.children).forEach(function (n) {
      -1 != e.value.indexOf(n.props.value) && (n.props.selected = !0);
    }), e.value = void 0), !0 === e.download && (e.download = ""), e) {
      var o = z.test(r);
      o && (n.props[r.replace(/[A-Z0-9]/, "-$&").toLowerCase()] = e[r]), (o || null === e[r]) && (e[r] = void 0);
    } else t.prototype && !t.prototype.p && (t.prototype.p = !0, Y(t.prototype, "componentWillMount"), Y(t.prototype, "componentWillReceiveProps"), Y(t.prototype, "componentWillUpdate"));
    !function (t) {
      var e = n.type,
          r = n.props;

      if (r && "string" == typeof e) {
        var o = {};

        for (var u in r) /^on(Ani|Tra|Tou)/.test(u) && (r[u.toLowerCase()] = r[u], delete r[u]), o[u.toLowerCase()] = u;

        if (o.ondoubleclick && (r.ondblclick = r[o.ondoubleclick], delete r[o.ondoubleclick]), o.onbeforeinput && (r.onbeforeinput = r[o.onbeforeinput], delete r[o.onbeforeinput]), o.onchange && ("textarea" === e || "input" === e.toLowerCase() && !/^fil|che|ra/i.test(r.type))) {
          var i = o.oninput || "oninput";
          r[i] || (r[i] = r[o.onchange], delete r[o.onchange]);
        }
      }
    }();
  }

  G && G(n);
};

var J = preact__WEBPACK_IMPORTED_MODULE_1__["options"].__r;

preact__WEBPACK_IMPORTED_MODULE_1__["options"].__r = function (n) {
  J && J(n), $ = n.__c;
};

var K = {
  ReactCurrentDispatcher: {
    current: {
      readContext: function (n) {
        return $.__n[n.__c].props.value;
      }
    }
  }
},
    Q = "16.8.0";

function X(n) {
  return preact__WEBPACK_IMPORTED_MODULE_1__["createElement"].bind(null, n);
}

function nn(n) {
  return !!n && n.$$typeof === H;
}

function tn(n) {
  return nn(n) ? preact__WEBPACK_IMPORTED_MODULE_1__["cloneElement"].apply(null, arguments) : n;
}

function en(n) {
  return !!n.__k && (Object(preact__WEBPACK_IMPORTED_MODULE_1__["render"])(null, n), !0);
}

function rn(n) {
  return n && (n.base || 1 === n.nodeType && n) || null;
}

var on = function (n, t) {
  return n(t);
},
    un = preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"];

/* harmony default export */ __webpack_exports__["default"] = ({
  useState: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useState"],
  useReducer: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useReducer"],
  useEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useEffect"],
  useLayoutEffect: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useLayoutEffect"],
  useRef: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useRef"],
  useImperativeHandle: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useImperativeHandle"],
  useMemo: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useMemo"],
  useCallback: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useCallback"],
  useContext: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useContext"],
  useDebugValue: preact_hooks__WEBPACK_IMPORTED_MODULE_0__["useDebugValue"],
  version: "16.8.0",
  Children: U,
  render: V,
  hydrate: Z,
  unmountComponentAtNode: en,
  createPortal: j,
  createElement: preact__WEBPACK_IMPORTED_MODULE_1__["createElement"],
  createContext: preact__WEBPACK_IMPORTED_MODULE_1__["createContext"],
  createFactory: X,
  cloneElement: tn,
  createRef: preact__WEBPACK_IMPORTED_MODULE_1__["createRef"],
  Fragment: preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"],
  isValidElement: nn,
  findDOMNode: rn,
  Component: preact__WEBPACK_IMPORTED_MODULE_1__["Component"],
  PureComponent: R,
  memo: w,
  forwardRef: A,
  unstable_batchedUpdates: on,
  StrictMode: preact__WEBPACK_IMPORTED_MODULE_1__["Fragment"],
  Suspense: O,
  SuspenseList: T,
  lazy: D,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: K
});


/***/ }),

/***/ "../../node_modules/preact/hooks/dist/hooks.module.js":
/*!*****************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/preact/hooks/dist/hooks.module.js ***!
  \*****************************************************************************************/
/*! exports provided: useState, useReducer, useEffect, useLayoutEffect, useRef, useImperativeHandle, useMemo, useCallback, useContext, useDebugValue, useErrorBoundary */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useState", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReducer", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useEffect", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLayoutEffect", function() { return l; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRef", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useImperativeHandle", function() { return s; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMemo", function() { return _; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCallback", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useContext", function() { return F; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDebugValue", function() { return T; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useErrorBoundary", function() { return d; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);

var t,
    u,
    r,
    o = 0,
    i = [],
    c = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r,
    f = preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed,
    e = preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c,
    a = preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount;

function v(t, r) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h && preact__WEBPACK_IMPORTED_MODULE_0__["options"].__h(u, t, o || r), o = 0;
  var i = u.__H || (u.__H = {
    __: [],
    __h: []
  });
  return t >= i.__.length && i.__.push({}), i.__[t];
}

function m(n) {
  return o = 1, p(k, n);
}

function p(n, r, o) {
  var i = v(t++, 2);
  return i.t = n, i.__c || (i.__c = u, i.__ = [o ? o(r) : k(void 0, r), function (n) {
    var t = i.t(i.__[0], n);
    i.__[0] !== t && (i.__ = [t, i.__[1]], i.__c.setState({}));
  }]), i.__;
}

function y(r, o) {
  var i = v(t++, 3);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && j(i.__H, o) && (i.__ = r, i.__H = o, u.__H.__h.push(i));
}

function l(r, o) {
  var i = v(t++, 4);
  !preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s && j(i.__H, o) && (i.__ = r, i.__H = o, u.__h.push(i));
}

function h(n) {
  return o = 5, _(function () {
    return {
      current: n
    };
  }, []);
}

function s(n, t, u) {
  o = 6, l(function () {
    "function" == typeof n ? n(t()) : n && (n.current = t());
  }, null == u ? u : u.concat(n));
}

function _(n, u) {
  var r = v(t++, 7);
  return j(r.__H, u) ? (r.__H = u, r.__h = n, r.__ = n()) : r.__;
}

function A(n, t) {
  return o = 8, _(function () {
    return n;
  }, t);
}

function F(n) {
  var r = u.context[n.__c],
      o = v(t++, 9);
  return o.__c = n, r ? (null == o.__ && (o.__ = !0, r.sub(u)), r.props.value) : n.__;
}

function T(t, u) {
  preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue && preact__WEBPACK_IMPORTED_MODULE_0__["options"].useDebugValue(u ? u(t) : t);
}

function d(n) {
  var r = v(t++, 10),
      o = m();
  return r.__ = n, u.componentDidCatch || (u.componentDidCatch = function (n) {
    r.__ && r.__(n), o[1](n);
  }), [o[0], function () {
    o[1](void 0);
  }];
}

function q() {
  i.some(function (t) {
    if (t.__P) try {
      t.__H.__h.forEach(b), t.__H.__h.forEach(g), t.__H.__h = [];
    } catch (u) {
      return t.__H.__h = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(u, t.__v), !0;
    }
  }), i = [];
}

preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r = function (n) {
  c && c(n), t = 0;
  var r = (u = n.__c).__H;
  r && (r.__h.forEach(b), r.__h.forEach(g), r.__h = []);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed = function (t) {
  f && f(t);
  var u = t.__c;
  u && u.__H && u.__H.__h.length && (1 !== i.push(u) && r === preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame || ((r = preact__WEBPACK_IMPORTED_MODULE_0__["options"].requestAnimationFrame) || function (n) {
    var t,
        u = function () {
      clearTimeout(r), x && cancelAnimationFrame(t), setTimeout(n);
    },
        r = setTimeout(u, 100);

    x && (t = requestAnimationFrame(u));
  })(q));
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c = function (t, u) {
  u.some(function (t) {
    try {
      t.__h.forEach(b), t.__h = t.__h.filter(function (n) {
        return !n.__ || g(n);
      });
    } catch (r) {
      u.some(function (n) {
        n.__h && (n.__h = []);
      }), u = [], preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(r, t.__v);
    }
  }), e && e(t, u);
}, preact__WEBPACK_IMPORTED_MODULE_0__["options"].unmount = function (t) {
  a && a(t);
  var u = t.__c;
  if (u && u.__H) try {
    u.__H.__.forEach(b);
  } catch (t) {
    preact__WEBPACK_IMPORTED_MODULE_0__["options"].__e(t, u.__v);
  }
};
var x = "function" == typeof requestAnimationFrame;

function b(n) {
  "function" == typeof n.u && n.u();
}

function g(n) {
  n.u = n.__();
}

function j(n, t) {
  return !n || t.some(function (t, u) {
    return t !== n[u];
  });
}

function k(n, t) {
  return "function" == typeof t ? t(n) : t;
}



/***/ }),

/***/ "../../node_modules/prop-types/checkPropTypes.js":
/*!************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/prop-types/checkPropTypes.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var printWarning = function () {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js");

  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes.resetWarningCache = function () {
  if (true) {
    loggedTypeFailures = {};
  }
};

module.exports = checkPropTypes;

/***/ }),

/***/ "../../node_modules/prop-types/factoryWithTypeCheckers.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactIs = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js");

var assign = __webpack_require__(/*! object-assign */ "../../node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js");

var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "../../node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);

var printWarning = function () {};

if (true) {
  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];

        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (!checker) {
          continue;
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from
      // props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = typeof propValue;

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/***/ }),

/***/ "../../node_modules/prop-types/index.js":
/*!***************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/prop-types/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js"); // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod


  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "../../node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}

/***/ }),

/***/ "../../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!**********************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
module.exports = ReactPropTypesSecret;

/***/ }),

/***/ "../../node_modules/react-is/cjs/react-is.development.js":
/*!********************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-is/cjs/react-is.development.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


if (true) {
  (function () {
    'use strict'; // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    exports.AsyncMode = AsyncMode;
    exports.ConcurrentMode = ConcurrentMode;
    exports.ContextConsumer = ContextConsumer;
    exports.ContextProvider = ContextProvider;
    exports.Element = Element;
    exports.ForwardRef = ForwardRef;
    exports.Fragment = Fragment;
    exports.Lazy = Lazy;
    exports.Memo = Memo;
    exports.Portal = Portal;
    exports.Profiler = Profiler;
    exports.StrictMode = StrictMode;
    exports.Suspense = Suspense;
    exports.isAsyncMode = isAsyncMode;
    exports.isConcurrentMode = isConcurrentMode;
    exports.isContextConsumer = isContextConsumer;
    exports.isContextProvider = isContextProvider;
    exports.isElement = isElement;
    exports.isForwardRef = isForwardRef;
    exports.isFragment = isFragment;
    exports.isLazy = isLazy;
    exports.isMemo = isMemo;
    exports.isPortal = isPortal;
    exports.isProfiler = isProfiler;
    exports.isStrictMode = isStrictMode;
    exports.isSuspense = isSuspense;
    exports.isValidElementType = isValidElementType;
    exports.typeOf = typeOf;
  })();
}

/***/ }),

/***/ "../../node_modules/react-is/index.js":
/*!*************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-is/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "../../node_modules/react-is/cjs/react-is.development.js");
}

/***/ }),

/***/ "../../node_modules/react-router-dom/esm/react-router-dom.js":
/*!************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-router-dom/esm/react-router-dom.js ***!
  \************************************************************************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter, BrowserRouter, HashRouter, Link, NavLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrowserRouter", function() { return BrowserRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HashRouter", function() { return HashRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavLink", function() { return NavLink; });
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ "../../node_modules/react-router/esm/react-router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["MemoryRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Prompt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Redirect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Route"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["StaticRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["Switch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["generatePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useHistory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRouteMatch", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["useRouteMatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return react_router__WEBPACK_IMPORTED_MODULE_0__["withRouter"]; });

/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "../../node_modules/history/esm/history.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tiny-warning */ "../../node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tiny-invariant */ "../../node_modules/tiny-invariant/dist/tiny-invariant.esm.js");










/**
 * The public API for a <Router> that uses HTML5 history.
 */

var BrowserRouter = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createBrowserHistory"])(_this.props);
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["Router"], {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(react__WEBPACK_IMPORTED_MODULE_2__["default"].Component);

if (true) {
  BrowserRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,
    forceRefresh: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    keyLength: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number
  };

  BrowserRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_5__["default"])(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { BrowserRouter as Router }`.") : undefined;
  };
}
/**
 * The public API for a <Router> that uses window.location.hash.
 */


var HashRouter = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(HashRouter, _React$Component);

  function HashRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createHashHistory"])(_this.props);
    return _this;
  }

  var _proto = HashRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["Router"], {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(react__WEBPACK_IMPORTED_MODULE_2__["default"].Component);

if (true) {
  HashRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.node,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    hashType: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(["hashbang", "noslash", "slash"])
  };

  HashRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_5__["default"])(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { HashRouter as Router }`.") : undefined;
  };
}

var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};

var normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(to, null, null, currentLocation) : to;
};

var forwardRefShim = function forwardRefShim(C) {
  return C;
};

var forwardRef = react__WEBPACK_IMPORTED_MODULE_2__["default"].forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var LinkAnchor = forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
      navigate = _ref.navigate,
      _onClick = _ref.onClick,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, ["innerRef", "navigate", "onClick"]);

  var target = rest.target;

  var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && ( // ignore everything but left clicks
      !target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigate();
        }
    }
  }); // React 15 compat


  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }
  /* eslint-disable-next-line jsx-a11y/anchor-has-content */


  return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", props);
});

if (true) {
  LinkAnchor.displayName = "LinkAnchor";
}
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
      replace = _ref2.replace,
      to = _ref2.to,
      innerRef = _ref2.innerRef,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref2, ["component", "replace", "to", "innerRef"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["__RouterContext"].Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_8__["default"])(false, "You should not use <Link> outside a <Router>") : undefined : void 0;
    var history = context.history;
    var location = normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";

    var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var method = replace ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat


    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(component, props);
  });
});

if (true) {
  var toType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func]);
  var refType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    current: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.any
  })]);
  Link.displayName = "Link";
  Link.propTypes = {
    innerRef: refType,
    onClick: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    replace: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    target: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    to: toType.isRequired
  };
}

var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};

var forwardRef$1 = react__WEBPACK_IMPORTED_MODULE_2__["default"].forwardRef;

if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}

function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }

  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      classNameProp = _ref.className,
      exact = _ref.exact,
      isActiveProp = _ref.isActive,
      locationProp = _ref.location,
      sensitive = _ref.sensitive,
      strict = _ref.strict,
      styleProp = _ref.style,
      to = _ref.to,
      innerRef = _ref.innerRef,
      rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_7__["default"])(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);

  return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router__WEBPACK_IMPORTED_MODULE_0__["__RouterContext"].Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_8__["default"])(false, "You should not use <NavLink> outside a <Router>") : undefined : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? Object(react_router__WEBPACK_IMPORTED_MODULE_0__["matchPath"])(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      sensitive: sensitive,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    var style = isActive ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, styleProp, {}, activeStyle) : styleProp;

    var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat


    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(Link, props);
  });
});

if (true) {
  NavLink.displayName = "NavLink";
  var ariaCurrentType = prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(["page", "step", "location", "date", "time", "true"]);
  NavLink.propTypes = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, Link.propTypes, {
    "aria-current": ariaCurrentType,
    activeClassName: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    activeStyle: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    className: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string,
    exact: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    isActive: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
    location: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,
    sensitive: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    strict: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool,
    style: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object
  });
}



/***/ }),

/***/ "../../node_modules/react-router/esm/react-router.js":
/*!****************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-router/esm/react-router.js ***!
  \****************************************************************************************/
/*! exports provided: MemoryRouter, Prompt, Redirect, Route, Router, StaticRouter, Switch, __HistoryContext, __RouterContext, generatePath, matchPath, useHistory, useLocation, useParams, useRouteMatch, withRouter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryRouter", function() { return MemoryRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prompt", function() { return Prompt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return Redirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticRouter", function() { return StaticRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Switch", function() { return Switch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__HistoryContext", function() { return historyContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__RouterContext", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatePath", function() { return generatePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return matchPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return useHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return useLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return useParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRouteMatch", function() { return useRouteMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withRouter", function() { return withRouter; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! history */ "../../node_modules/history/esm/history.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiny-warning */ "../../node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var mini_create_react_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mini-create-react-context */ "../../node_modules/mini-create-react-context/dist/esm/index.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tiny-invariant */ "../../node_modules/tiny-invariant/dist/tiny-invariant.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! path-to-regexp */ "../../node_modules/react-router/node_modules/path-to-regexp/index.js");
/* harmony import */ var path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(path_to_regexp__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-is */ "../../node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "../../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! hoist-non-react-statics */ "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11__);











 // TODO: Replace with React.createContext once we can assume React 16+

var createNamedContext = function createNamedContext(name) {
  var context = Object(mini_create_react_context__WEBPACK_IMPORTED_MODULE_5__["default"])();
  context.displayName = name;
  return context;
};

var historyContext = /*#__PURE__*/createNamedContext("Router-History"); // TODO: Replace with React.createContext once we can assume React 16+

var createNamedContext$1 = function createNamedContext(name) {
  var context = Object(mini_create_react_context__WEBPACK_IMPORTED_MODULE_5__["default"])();
  context.displayName = name;
  return context;
};

var context = /*#__PURE__*/createNamedContext$1("Router");
/**
 * The public API for putting history on context.
 */

var Router = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Router, _React$Component);

  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  function Router(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;

    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        if (_this._isMounted) {
          _this.setState({
            location: location
          });
        } else {
          _this._pendingLocation = location;
        }
      });
    }

    return _this;
  }

  var _proto = Router.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  };

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Provider, {
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    }, react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(historyContext.Provider, {
      children: this.props.children || null,
      value: this.props.history
    }));
  };

  return Router;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

if (true) {
  Router.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
    history: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
    staticContext: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
  };

  Router.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(prevProps.history === this.props.history, "You cannot change <Router history>") : undefined;
  };
}
/**
 * The public API for a <Router> that stores location in memory.
 */


var MemoryRouter = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = Object(history__WEBPACK_IMPORTED_MODULE_3__["createMemoryHistory"])(_this.props);
    return _this;
  }

  var _proto = MemoryRouter.prototype;

  _proto.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

if (true) {
  MemoryRouter.propTypes = {
    initialEntries: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array,
    initialIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    getUserConfirmation: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    keyLength: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node
  };

  MemoryRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!this.props.history, "<MemoryRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { MemoryRouter as Router }`.") : undefined;
  };
}

var Lifecycle = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Lifecycle, _React$Component);

  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Lifecycle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };

  _proto.render = function render() {
    return null;
  };

  return Lifecycle;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);
/**
 * The public API for prompting the user before navigating away from a screen.
 */


function Prompt(_ref) {
  var message = _ref.message,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
  return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Prompt> outside a <Router>") : undefined : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}

if (true) {
  var messageType = prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]);
  Prompt.propTypes = {
    when: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    message: messageType.isRequired
  };
}

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default.a.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }

  if (params === void 0) {
    params = {};
  }

  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}
/**
 * The public API for navigating programmatically with a component.
 */


function Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
      to = _ref.to,
      _ref$push = _ref.push,
      push = _ref$push === void 0 ? false : _ref$push;
  return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Consumer, null, function (context) {
    !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Redirect> outside a <Router>") : undefined : void 0;
    var history = context.history,
        staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(prevProps.to);

        if (!Object(history__WEBPACK_IMPORTED_MODULE_3__["locationsAreEqual"])(prevLocation, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}

if (true) {
  Redirect.propTypes = {
    push: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    from: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    to: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object]).isRequired
  };
}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp__WEBPACK_IMPORTED_MODULE_8___default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */


function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;

    var _compilePath = compilePath$1(path, {
      end: exact,
      strict: strict,
      sensitive: sensitive
    }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
        values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

function isEmptyChildren(children) {
  return react__WEBPACK_IMPORTED_MODULE_1__["default"].Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  var value = children(props);
   true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(value !== undefined, "You returned `undefined` from the `children` function of " + ("<Route" + (path ? " path=\"" + path + "\"" : "") + ">, but you ") + "should have returned a React element or `null`") : undefined;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */


var Route = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Route, _React$Component);

  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Route.prototype;

  _proto.render = function render() {
    var _this = this;

    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Consumer, null, function (context$1) {
      !context$1 ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Route> outside a <Router>") : undefined : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;

      var props = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, context$1, {
        location: location,
        match: match
      });

      var _this$props = _this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && children.length === 0) {
        children = null;
      }

      return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  true ? evalChildrenDev(children, props, _this.props.path) : undefined : children : component ? react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  true ? evalChildrenDev(children, props, _this.props.path) : undefined : null);
    });
  };

  return Route;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

if (true) {
  Route.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),
    component: function component(props, propName) {
      if (props[propName] && !Object(react_is__WEBPACK_IMPORTED_MODULE_9__["isValidElementType"])(props[propName])) {
        return new Error("Invalid prop 'component' supplied to 'Route': the prop is not a valid React component");
      }
    },
    exact: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    path: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string)]),
    render: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
    sensitive: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
    strict: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  };

  Route.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.component), "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored") : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.children && !isEmptyChildren(this.props.children) && this.props.render), "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored") : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.component && this.props.render), "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored") : undefined;
  };

  Route.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.location && !prevProps.location), '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(!this.props.location && prevProps.location), '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : undefined;
  };
}

function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
    pathname: addLeadingSlash(basename) + location.pathname
  });
}

function stripBasename(basename, location) {
  if (!basename) return location;
  var base = addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : Object(history__WEBPACK_IMPORTED_MODULE_3__["createPath"])(location);
}

function staticHandler(methodName) {
  return function () {
     true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You cannot %s with <StaticRouter>", methodName) : undefined;
  };
}

function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var StaticRouter = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(StaticRouter, _React$Component);

  function StaticRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };

    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };

    _this.handleListen = function () {
      return noop;
    };

    _this.handleBlock = function () {
      return noop;
    };

    return _this;
  }

  var _proto = StaticRouter.prototype;

  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
        _this$props$basename = _this$props.basename,
        basename = _this$props$basename === void 0 ? "" : _this$props$basename,
        _this$props$context = _this$props.context,
        context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(location));
    context.url = createURL(context.location);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__["default"])(_this$props2, ["basename", "context", "location"]);

    var history = {
      createHref: function createHref(path) {
        return addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: stripBasename(basename, Object(history__WEBPACK_IMPORTED_MODULE_3__["createLocation"])(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(Router, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, rest, {
      history: history,
      staticContext: context
    }));
  };

  return StaticRouter;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

if (true) {
  StaticRouter.propTypes = {
    basename: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    context: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object])
  };

  StaticRouter.prototype.componentDidMount = function () {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!this.props.history, "<StaticRouter> ignores the history prop. To use a custom history, " + "use `import { Router }` instead of `import { StaticRouter as Router }`.") : undefined;
  };
}
/**
 * The public API for rendering the first <Route> that matches.
 */


var Switch = /*#__PURE__*/function (_React$Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Switch, _React$Component);

  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Switch.prototype;

  _proto.render = function render() {
    var _this = this;

    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Consumer, null, function (context) {
      !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <Switch> outside a <Router>") : undefined : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      react__WEBPACK_IMPORTED_MODULE_1__["default"].Children.forEach(_this.props.children, function (child) {
        if (match == null && react__WEBPACK_IMPORTED_MODULE_1__["default"].isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? react__WEBPACK_IMPORTED_MODULE_1__["default"].cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };

  return Switch;
}(react__WEBPACK_IMPORTED_MODULE_1__["default"].Component);

if (true) {
  Switch.propTypes = {
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node,
    location: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object
  };

  Switch.prototype.componentDidUpdate = function (prevProps) {
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(this.props.location && !prevProps.location), '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.') : undefined;
     true ? Object(tiny_warning__WEBPACK_IMPORTED_MODULE_4__["default"])(!(!this.props.location && prevProps.location), '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.') : undefined;
  };
}
/**
 * A public higher-order component to access the imperative API
 */


function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";

  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_10__["default"])(props, ["wrappedComponentRef"]);

    return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(context.Consumer, null, function (context) {
      !context ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You should not use <" + displayName + " /> outside a <Router>") : undefined : void 0;
      return react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__["default"])({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  if (true) {
    C.propTypes = {
      wrappedComponentRef: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object])
    };
  }

  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_11___default()(C, Component);
}

var useContext = react__WEBPACK_IMPORTED_MODULE_1__["default"].useContext;

function useHistory() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useHistory()") : undefined : void 0;
  }

  return useContext(historyContext);
}

function useLocation() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useLocation()") : undefined : void 0;
  }

  return useContext(context).location;
}

function useParams() {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useParams()") : undefined : void 0;
  }

  var match = useContext(context).match;
  return match ? match.params : {};
}

function useRouteMatch(path) {
  if (true) {
    !(typeof useContext === "function") ?  true ? Object(tiny_invariant__WEBPACK_IMPORTED_MODULE_6__["default"])(false, "You must use React >= 16.8 in order to use useRouteMatch()") : undefined : void 0;
  }

  var location = useLocation();
  var match = useContext(context).match;
  return path ? matchPath(location.pathname, path) : match;
}

if (true) {
  if (typeof window !== "undefined") {
    var global = window;
    var key = "__react_router_build__";
    var buildNames = {
      cjs: "CommonJS",
      esm: "ES modules",
      umd: "UMD"
    };

    if (global[key] && global[key] !== "esm") {
      var initialBuildName = buildNames[global[key]];
      var secondaryBuildName = buildNames["esm"]; // TODO: Add link to article that explains in detail how to avoid
      // loading 2 different builds.

      throw new Error("You are loading the " + secondaryBuildName + " build of React Router " + ("on a page that is already running the " + initialBuildName + " ") + "build, so things won't work right.");
    }

    global[key] = "esm";
  }
}



/***/ }),

/***/ "../../node_modules/react-router/node_modules/isarray/index.js":
/*!**************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-router/node_modules/isarray/index.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/***/ }),

/***/ "../../node_modules/react-router/node_modules/path-to-regexp/index.js":
/*!*********************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/react-router/node_modules/path-to-regexp/index.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(/*! isarray */ "../../node_modules/react-router/node_modules/isarray/index.js");
/**
 * Expose `pathToRegexp`.
 */


module.exports = pathToRegexp;
module.exports.parse = parse;
module.exports.compile = compile;
module.exports.tokensToFunction = tokensToFunction;
module.exports.tokensToRegExp = tokensToRegExp;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */

var PATH_REGEXP = new RegExp([// Match escaped characters that would otherwise appear in future matches.
// This allows the user to escape special characters that won't transform.
'(\\\\.)', // Match Express-style parameters and un-named parameters with a prefix
// and optional suffixes. Matches appear as:
//
// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */

function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length; // Ignore already escaped sequences.

    if (escaped) {
      path += escaped[1];
      continue;
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7]; // Push the current path onto the tokens.

    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?'
    });
  } // Match any characters still remaining.


  if (index < str.length) {
    path += str.substr(index);
  } // If the path exists, push it onto the end.


  if (path) {
    tokens.push(path);
  }

  return tokens;
}
/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */


function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */


function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */


function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
/**
 * Expose a method for transforming tokens into the path function.
 */


function tokensToFunction(tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length); // Compile all the patterns before compilation.

  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options));
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue;
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
        }

        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue;
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }

      path += token.prefix + segment;
    }

    return path;
  };
}
/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */


function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1');
}
/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */


function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, '\\$1');
}
/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */


function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */


function flags(options) {
  return options && options.sensitive ? '' : 'i';
}
/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */


function regexpToRegexp(path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys);
}
/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function arrayToRegexp(path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
  return attachKeys(regexp, keys);
}
/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */


function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = ''; // Iterate over the tokens and create our regexp string.

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';
      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter; // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".

  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys);
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */


function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options =
    /** @type {!Object} */
    keys || options;
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path,
    /** @type {!Array} */
    keys);
  }

  if (isarray(path)) {
    return arrayToRegexp(
    /** @type {!Array} */
    path,
    /** @type {!Array} */
    keys, options);
  }

  return stringToRegexp(
  /** @type {string} */
  path,
  /** @type {!Array} */
  keys, options);
}

/***/ }),

/***/ "../../node_modules/resolve-pathname/esm/resolve-pathname.js":
/*!************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/resolve-pathname/esm/resolve-pathname.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
} // About 1.5x faster than the two-arg version of Array#splice()


function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
} // This implementation is based heavily on node's url.parse


function resolvePathname(to, from) {
  if (from === undefined) from = '';
  var toParts = to && to.split('/') || [];
  var fromParts = from && from.split('/') || [];
  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';
  var hasTrailingSlash;

  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;

  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');
  if (mustEndAbs && fromParts[0] !== '' && (!fromParts[0] || !isAbsolute(fromParts[0]))) fromParts.unshift('');
  var result = fromParts.join('/');
  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';
  return result;
}

/* harmony default export */ __webpack_exports__["default"] = (resolvePathname);

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*************************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/tiny-invariant/dist/tiny-invariant.esm.js":
/*!*************************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/tiny-invariant/dist/tiny-invariant.esm.js ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';

function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  }

  throw new Error(prefix + ": " + (message || ''));
}

/* harmony default export */ __webpack_exports__["default"] = (invariant);

/***/ }),

/***/ "../../node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!*********************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isProduction = "development" === 'production';

function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ __webpack_exports__["default"] = (warning);

/***/ }),

/***/ "../../node_modules/value-equal/esm/value-equal.js":
/*!**************************************************************************************!*\
  !*** C:/Users/100To/Documents/AuriServe/node_modules/value-equal/esm/value-equal.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true; // Otherwise, if either of them == null they are not equal.

  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
      return valueEqual(item, b[index]);
    });
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = valueOf(a);
    var bValue = valueOf(b);
    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);
    return Object.keys(Object.assign({}, a, b)).every(function (key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ __webpack_exports__["default"] = (valueEqual);

/***/ }),

/***/ "../../node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "../../node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./ClickHandler.ts":
/*!*************************!*\
  !*** ./ClickHandler.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClickHandler; });
class ClickHandler {
  constructor(callbacks) {
    this.callbacks = void 0;
    this._lastClick = 0;
    this._timeout = undefined;
    this.callbacks = callbacks;
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseUp(e) {
    const timeout = 250;
    e.preventDefault();
    if (this.callbacks.onClick) this.callbacks.onClick(e);

    if (Date.now() - this._lastClick < timeout) {
      this._lastClick = 0;
      clearTimeout(this._timeout);
      if (this.callbacks.onDoubleClick) this.callbacks.onDoubleClick(e);
    } else {
      this._lastClick = Date.now();
      if (this.callbacks.onFirstClick) this.callbacks.onFirstClick(e);
      this._timeout = setTimeout(() => {
        if (this.callbacks.onSingleClick) this.callbacks.onSingleClick(e);
      }, timeout);
    }
  }

}

/***/ }),

/***/ "./Main.scss":
/*!*******************!*\
  !*** ./Main.scss ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./Main.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./Main.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./Main.ts":
/*!*****************!*\
  !*** ./Main.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.scss */ "./Main.scss");
/* harmony import */ var _Main_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Main_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/App */ "./components/App.tsx");



preact__WEBPACK_IMPORTED_MODULE_0__["render"](preact__WEBPACK_IMPORTED_MODULE_0__["h"](_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('root'));

/***/ }),

/***/ "./components/App.scss":
/*!*****************************!*\
  !*** ./components/App.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./App.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/App.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/App.tsx":
/*!****************************!*\
  !*** ./components/App.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./App.scss */ "./components/App.scss");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _LoginForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LoginForm */ "./components/LoginForm.tsx");
/* harmony import */ var _AppHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AppHeader */ "./components/AppHeader.tsx");
/* harmony import */ var _pages_MainPage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/MainPage */ "./components/pages/MainPage.tsx");
/* harmony import */ var _pages_PagePage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/PagePage */ "./components/pages/PagePage.tsx");
/* harmony import */ var _pages_PagesPage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pages/PagesPage */ "./components/pages/PagesPage.tsx");
/* harmony import */ var _pages_MediaPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/MediaPage */ "./components/pages/MediaPage.tsx");
/* harmony import */ var _pages_ThemesPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/ThemesPage */ "./components/pages/ThemesPage.tsx");
/* harmony import */ var _pages_PluginsPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/PluginsPage */ "./components/pages/PluginsPage.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./AppContext */ "./components/AppContext.tsx");













var AppState;

(function (AppState) {
  AppState[AppState["QUERYING"] = 0] = "QUERYING";
  AppState[AppState["LOGIN"] = 1] = "LOGIN";
  AppState[AppState["ADMIN"] = 2] = "ADMIN";
})(AppState || (AppState = {}));

var PluginState;

(function (PluginState) {
  PluginState[PluginState["SAFE"] = 0] = "SAFE";
  PluginState[PluginState["UNLINKED"] = 1] = "UNLINKED";
  PluginState[PluginState["LINKED"] = 2] = "LINKED";
})(PluginState || (PluginState = {}));

class App extends preact__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    this.loadPlugins = () => {
      let pluginState = this.state.pluginState;

      if (pluginState === PluginState.UNLINKED) {
        const plugins = JSON.parse(document.querySelector('#plugins').innerText);
        window.serve = {
          registerElement: elem => {
            let contextData = Object.assign({}, this.state.contextData);
            contextData.plugins = Object.assign({}, contextData.plugins);
            contextData.plugins.elements.set(elem.identifier, elem);
            this.setState({
              contextData: contextData
            });
          }
        };
        plugins.pluginScripts.forEach(scr => {
          const tag = document.createElement('script');
          tag.src = '/plugin/' + scr;
          tag.async = true;
          document.head.appendChild(tag);
        });
        plugins.pluginStyles.forEach(styl => {
          const tag = document.createElement('link');
          tag.rel = 'stylesheet';
          tag.href = '/plugin/' + styl;
          document.head.appendChild(tag);
        });
        pluginState = PluginState.LINKED;
      }

      return pluginState;
    };

    this.getPageData = async page => {
      try {
        const r = await fetch('/admin/pages/data/', {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            page: page
          })
        });
        if (r.status !== 200) throw 'Invalid credentials.';
        return await r.json();
      } catch (e) {
        js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.remove('tkn');
        location.href = '/admin';
        return {};
      }
    };

    this.refreshSiteData = (...types) => {
      fetch('/admin/data/' + types.join('&'), {
        cache: 'no-cache'
      }).then(r => {
        if (r.status !== 200) throw 'Invalid credentials.';
        return r.json();
      }).then(res => {
        this.handleSiteData(res);
      }).catch(() => {
        js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.remove('tkn');
        location.href = '/admin';
      });
    };

    this.handleSiteData = data => {
      console.log(data);
      const pluginState = this.loadPlugins();
      let siteData = Object.assign({}, this.state.contextData.data);

      for (const key of Object.keys(data)) siteData[key] = data[key];

      if (!siteData.media) siteData.media = [];
      if (!siteData.themes) siteData.themes = [];
      if (!siteData.plugins) siteData.plugins = [];
      if (!siteData.elements) siteData.elements = [];
      if (!siteData.pages) siteData.pages = {};
      if (!siteData.elementDefs) siteData.elementDefs = {};
      this.setState({
        contextData: {
          getPageData: this.getPageData,
          refreshSiteData: this.refreshSiteData,
          handleSiteData: this.handleSiteData,
          plugins: this.state.contextData.plugins,
          data: siteData
        },
        appState: AppState.ADMIN,
        pluginState: pluginState
      });
    };

    const tkn = js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.get('tkn');
    this.state = {
      contextData: {
        getPageData: this.getPageData,
        refreshSiteData: this.refreshSiteData,
        handleSiteData: this.handleSiteData,
        plugins: {
          elements: new Map()
        },
        data: null
      },
      appState: tkn ? AppState.QUERYING : AppState.LOGIN,
      pluginState: PluginState.UNLINKED
    };
    if (tkn) this.refreshSiteData('info');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_1__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_12__["AppContext"].Provider, {
      value: this.state.contextData
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      className: "App"
    }, this.state.appState === AppState.LOGIN && preact__WEBPACK_IMPORTED_MODULE_1__["h"](_LoginForm__WEBPACK_IMPORTED_MODULE_4__["default"], null), this.state.appState === AppState.ADMIN && preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      className: "App-Wrap"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
      basename: "/admin"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"](_AppHeader__WEBPACK_IMPORTED_MODULE_5__["default"], null), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Redirect"], {
      exact: true,
      from: "/",
      to: "/home"
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/home",
      component: _pages_MainPage__WEBPACK_IMPORTED_MODULE_6__["default"]
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/pages",
      component: _pages_PagesPage__WEBPACK_IMPORTED_MODULE_8__["default"]
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/media",
      component: _pages_MediaPage__WEBPACK_IMPORTED_MODULE_9__["default"]
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/themes",
      component: _pages_ThemesPage__WEBPACK_IMPORTED_MODULE_10__["default"]
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      exact: true,
      path: "/plugins",
      component: _pages_PluginsPage__WEBPACK_IMPORTED_MODULE_11__["default"]
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/pages/",
      component: _pages_PagePage__WEBPACK_IMPORTED_MODULE_7__["default"]
    }))))));
  }

}

/***/ }),

/***/ "./components/AppContext.tsx":
/*!***********************************!*\
  !*** ./components/AppContext.tsx ***!
  \***********************************/
/*! exports provided: AppContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return AppContext; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);

const AppContext = preact__WEBPACK_IMPORTED_MODULE_0__["createContext"]({});

/***/ }),

/***/ "./components/AppHeader.scss":
/*!***********************************!*\
  !*** ./components/AppHeader.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./AppHeader.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/AppHeader.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/AppHeader.tsx":
/*!**********************************!*\
  !*** ./components/AppHeader.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppHeader; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _AppHeader_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppHeader.scss */ "./components/AppHeader.scss");
/* harmony import */ var _AppHeader_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_AppHeader_scss__WEBPACK_IMPORTED_MODULE_3__);




class AppHeader extends preact__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_1__["h"]("header", {
      class: "AppHeader"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      class: "AppHeader-wrap"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("img", {
      class: "AppHeader-logo",
      src: "/admin/asset/icon/serve.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("nav", {
      class: "AppHeader-nav"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      activeClassName: "active",
      to: "/home"
    }, "Home"), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      activeClassName: "active",
      to: "/pages"
    }, "Pages"), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      activeClassName: "active",
      to: "/media"
    }, "Media"), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      activeClassName: "active",
      to: "/themes"
    }, "Themes"), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      activeClassName: "active",
      to: "/plugins"
    }, "Plugins")), preact__WEBPACK_IMPORTED_MODULE_1__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["NavLink"], {
      className: "AppHeader-options",
      to: "/user_options"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("img", {
      src: "/admin/asset/icon/settings-dark.svg"
    })), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("button", {
      class: "AppHeader-logout",
      onClick: this.logout
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("img", {
      src: "/admin/asset/icon/logout-dark.svg"
    }))));
  }

  logout() {
    js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.remove('tkn');
    location.href = '/admin';
  }

}

/***/ }),

/***/ "./components/CardHeader.scss":
/*!************************************!*\
  !*** ./components/CardHeader.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./CardHeader.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/CardHeader.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/CardHeader.tsx":
/*!***********************************!*\
  !*** ./components/CardHeader.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CardHeader; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CardHeader_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CardHeader.scss */ "./components/CardHeader.scss");
/* harmony import */ var _CardHeader_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CardHeader_scss__WEBPACK_IMPORTED_MODULE_1__);


class CardHeader extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "CardHeader"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      className: "CardHeader-Icon",
      src: this.props.icon
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h1", {
      className: "CardHeader-Title"
    }, this.props.title), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      className: "CardHeader-Description"
    }, this.props.subtitle || ''));
  }

}

/***/ }),

/***/ "./components/DimensionTransition.sass":
/*!*********************************************!*\
  !*** ./components/DimensionTransition.sass ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./DimensionTransition.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/DimensionTransition.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/DimensionTransition.tsx":
/*!********************************************!*\
  !*** ./components/DimensionTransition.tsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DimensionTransition; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DimensionTransition_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DimensionTransition.sass */ "./components/DimensionTransition.sass");
/* harmony import */ var _DimensionTransition_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DimensionTransition_sass__WEBPACK_IMPORTED_MODULE_1__);


class DimensionTransition extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.ref = void 0;
    this.observer = void 0;
    this.state = {};
    this.ref = preact__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
    this.handleContentChanged = this.handleContentChanged.bind(this);
  }

  componentDidMount() {
    this.observer = new MutationObserver(this.handleContentChanged);
    this.observer.observe(this.ref.current, {
      attributes: true,
      childList: true,
      subtree: true
    });
    this.handleContentChanged();
  }

  componentWillUnmount() {
    var _this$observer;

    (_this$observer = this.observer) === null || _this$observer === void 0 ? void 0 : _this$observer.disconnect();
  }

  render() {
    var _this$state$dimension, _this$state$dimension2;

    let appliedOuterStyles = {};
    if (this.props.mode !== 'height') appliedOuterStyles.width = (_this$state$dimension = this.state.dimensions) === null || _this$state$dimension === void 0 ? void 0 : _this$state$dimension.x;
    if (this.props.mode !== 'width') appliedOuterStyles.height = (_this$state$dimension2 = this.state.dimensions) === null || _this$state$dimension2 === void 0 ? void 0 : _this$state$dimension2.y;
    let appliedInnerStyles = {
      width: 'min-content',
      height: 'min-content'
    };
    if (this.props.mode === 'height') appliedInnerStyles.width = 'auto';
    if (this.props.mode === 'width') appliedInnerStyles.height = 'auto';
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "DimensionTransition",
      style: Object.assign(appliedOuterStyles, this.props.style, {
        transition: `width ${(this.props.duration || 300) / 1000}s, height ${(this.props.duration || 300) / 1000}s`
      })
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "DimensionTransition-Inner",
      style: appliedInnerStyles,
      ref: this.ref
    }, this.props.children));
  }

  handleContentChanged() {
    const elem = this.ref.current;
    this.setState({
      dimensions: {
        x: elem.offsetWidth,
        y: elem.offsetHeight
      }
    });
  }

}

/***/ }),

/***/ "./components/LoginForm.scss":
/*!***********************************!*\
  !*** ./components/LoginForm.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./LoginForm.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/LoginForm.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/LoginForm.tsx":
/*!**********************************!*\
  !*** ./components/LoginForm.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginForm; });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js-cookie */ "../../node_modules/js-cookie/src/js.cookie.js");
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LoginForm_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LoginForm.scss */ "./components/LoginForm.scss");
/* harmony import */ var _LoginForm_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_LoginForm_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppContext */ "./components/AppContext.tsx");




var LoginState;

(function (LoginState) {
  LoginState[LoginState["UNAUTH"] = 0] = "UNAUTH";
  LoginState[LoginState["PENDING"] = 1] = "PENDING";
  LoginState[LoginState["AUTH"] = 2] = "AUTH";
  LoginState[LoginState["REDIRECT"] = 3] = "REDIRECT";
})(LoginState || (LoginState = {}));

class LoginForm extends preact__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      warning: '',
      state: LoginState.UNAUTH
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  render() {
    const loading = this.state.state === LoginState.AUTH || this.state.state === LoginState.REDIRECT;
    const loaded = this.state.state === LoginState.REDIRECT;
    return preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      className: "LoginForm"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("form", {
      className: 'LoginForm-Card' + (loading ? ' loading' : '') + (loaded ? ' loaded' : ''),
      onSubmit: this.handleSubmit
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      className: "LoginForm-ProfilePlaceholder"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("img", {
      className: "card",
      src: "/admin/asset/icon/account-light.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("img", {
      className: "success",
      src: "/admin/asset/icon/serve-light.svg"
    })), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("div", {
      className: "LoginForm-FormContents"
    }, preact__WEBPACK_IMPORTED_MODULE_1__["h"]("input", {
      type: "text",
      name: "user",
      placeholder: "Username",
      autoFocus: true,
      required: true,
      minLength: 3,
      maxLength: 32,
      autoComplete: 'username',
      value: this.state.username,
      onChange: this.handleUsernameChange,
      disabled: loading
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("input", {
      type: "password",
      name: "pass",
      placeholder: "Password",
      required: true,
      minLength: 8,
      autoComplete: 'current-password',
      value: this.state.password,
      onChange: this.handlePasswordChange,
      disabled: loading
    }), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("button", {
      disabled: loading
    }, "Log In"))), preact__WEBPACK_IMPORTED_MODULE_1__["h"]("p", {
      className: "LoginForm-Warning"
    }, this.state.warning));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.state === LoginState.PENDING) return false;
    this.setState({
      warning: ''
    });
    fetch('/admin/auth', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.username,
        pass: this.state.password
      })
    }).then(async r => {
      const res = await r.text();
      if (r.status !== 200) throw res;
      return res;
    }).then(res => {
      js_cookie__WEBPACK_IMPORTED_MODULE_0___default.a.set('tkn', res);
      this.setState({
        state: LoginState.AUTH
      });
      let returnImmediate = false;
      let data = null;
      fetch('/admin/data', {
        cache: 'no-cache'
      }).then(r => r.json()).then(r => {
        if (returnImmediate) this.context.handleSiteData(r);else data = r;
      });
      setTimeout(() => this.setState({
        state: LoginState.REDIRECT
      }), 450);
      setTimeout(() => {
        if (data) this.context.handleSiteData(data);else returnImmediate = true;
      }, 650);
    }).catch(err => {
      this.setState({
        state: LoginState.UNAUTH,
        warning: err
      });
    });
    e.preventDefault();
    return false;
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

}
LoginForm.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"];

/***/ }),

/***/ "./components/MediaIcon.sass":
/*!***********************************!*\
  !*** ./components/MediaIcon.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaIcon.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaIcon.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaIcon.tsx":
/*!**********************************!*\
  !*** ./components/MediaIcon.tsx ***!
  \**********************************/
/*! exports provided: mediaIsImage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mediaIsImage", function() { return mediaIsImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaIcon; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaIcon_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaIcon.sass */ "./components/MediaIcon.sass");
/* harmony import */ var _MediaIcon_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaIcon_sass__WEBPACK_IMPORTED_MODULE_1__);


const IMAGE_EXTS = ['png', 'svg', 'jpg', 'jpeg', 'svg', 'gif'];
const ICON_PREFIX = '/admin/asset/icon/ext-';
const ICONS = {
  unknown: ICON_PREFIX + 'unknown-color.svg',
  md: ICON_PREFIX + 'txt-color.svg',
  txt: ICON_PREFIX + 'txt-color.svg',
  pdf: ICON_PREFIX + 'pdf-color.svg',
  doc: ICON_PREFIX + 'document-color.svg',
  docx: ICON_PREFIX + 'document-color.svg',
  xls: ICON_PREFIX + 'sheet-color.svg',
  xlsx: ICON_PREFIX + 'sheet-color.svg',
  ppt: ICON_PREFIX + 'slideshow-color.svg',
  pptx: ICON_PREFIX + 'slideshow-color.svg',
  image: ICON_PREFIX + 'image-color.svg'
};
function mediaIsImage(path) {
  return IMAGE_EXTS.filter(p => path.endsWith('.' + p)).length > 0;
}
class MediaIcon extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render(props) {
    var _props$image, _props$image2, _ICONS$props$path$sub;

    const isImage = (_props$image = props.image) !== null && _props$image !== void 0 ? _props$image : mediaIsImage(props.path);
    const showImage = props.imageIcon === undefined || props.imageIcon;
    let iconUrl = ICONS['unknown'];
    if (isImage) iconUrl = showImage ? (_props$image2 = props.image) !== null && _props$image2 !== void 0 ? _props$image2 : props.path : ICONS['image'];else iconUrl = (_ICONS$props$path$sub = ICONS[props.path.substr(props.path.lastIndexOf('.') + 1)]) !== null && _ICONS$props$path$sub !== void 0 ? _ICONS$props$path$sub : iconUrl;
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      class: "MediaIcon" + (isImage && showImage ? '' : ' Icon'),
      src: iconUrl,
      alt: ""
    });
  }

}

/***/ }),

/***/ "./components/MediaItem.scss":
/*!***********************************!*\
  !*** ./components/MediaItem.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaItem.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaItem.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaItem.tsx":
/*!**********************************!*\
  !*** ./components/MediaItem.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaItem; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaItem_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaItem.scss */ "./components/MediaItem.scss");
/* harmony import */ var _MediaItem_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaItem_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaIcon */ "./components/MediaIcon.tsx");
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Selectable */ "./components/Selectable.tsx");
/* harmony import */ var _common_util_Format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/util/Format */ "../../common/util/Format.ts");





class MediaItem extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.callbacks = void 0;
    this.callbacks = {
      onDoubleClick: this.props.onClick
    };
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Selectable__WEBPACK_IMPORTED_MODULE_3__["default"], {
      class: "MediaItem",
      ind: this.props.ind,
      callbacks: this.callbacks,
      doubleClickSelects: true
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      path: this.props.item.publicPath
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaItem-Description"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaItem-Title"
    }, this.props.item.name), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaItem-Author"
    }, `Uploaded by ${this.props.item.uploadUser} ${_common_util_Format__WEBPACK_IMPORTED_MODULE_4__["date"](this.props.item.uploadDate)}.`), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaItem-Size"
    }, (this.props.item.dimensions ? _common_util_Format__WEBPACK_IMPORTED_MODULE_4__["vector"](this.props.item.dimensions, 'px') + ' • ' : '') + _common_util_Format__WEBPACK_IMPORTED_MODULE_4__["bytes"](this.props.item.size))));
  }

}

/***/ }),

/***/ "./components/MediaReplaceForm.sass":
/*!******************************************!*\
  !*** ./components/MediaReplaceForm.sass ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaReplaceForm.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaReplaceForm.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaReplaceForm.tsx":
/*!*****************************************!*\
  !*** ./components/MediaReplaceForm.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaUploadForm; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaReplaceForm_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaReplaceForm.sass */ "./components/MediaReplaceForm.sass");
/* harmony import */ var _MediaReplaceForm_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaReplaceForm_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaIcon */ "./components/MediaIcon.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AppContext */ "./components/AppContext.tsx");
/* harmony import */ var _common_util_Format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/util/Format */ "../../common/util/Format.ts");





var FormState;

(function (FormState) {
  FormState[FormState["SELECTING"] = 0] = "SELECTING";
  FormState[FormState["UPLOADING"] = 1] = "UPLOADING";
  FormState[FormState["COMPLETED"] = 2] = "COMPLETED";
})(FormState || (FormState = {}));

class MediaUploadForm extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.handleUpload = () => {
      this.setState({
        state: FormState.UPLOADING
      });
      let data = new FormData();
      data.append('file', this.state.file);
      data.append('replace', this.props.replace);
      fetch('/admin/media/replace', {
        method: 'POST',
        cache: 'no-cache',
        body: data
      }).then(() => {
        this.context.refreshSiteData('media');
        this.props.onSubmit();
      });
    };

    this.handleFileSelect = async e => {
      const target = e.target;
      const file = target.files && target.files.length ? target.files[0] : undefined;
      target.value = '';
      if (!file) return this.handleFileRemove();
      const ext = file.name.substr(file.name.lastIndexOf('.') + 1);

      if (ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'svg' || ext === 'gif') {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => this.setState({
          imagePreview: reader.result
        });
      }

      this.setState({
        file: file
      });
    };

    this.handleFileRemove = () => {
      this.setState({
        file: undefined,
        imagePreview: undefined
      });
    };

    this.state = {
      state: FormState.SELECTING
    };
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("form", {
      class: "MediaReplaceForm",
      onSubmit: e => e.preventDefault()
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaReplaceForm-InputWrap" + (this.state.file ? this.state.state === FormState.UPLOADING ? ' Hidden' : ' Back' : '')
    }, !this.state.file && preact__WEBPACK_IMPORTED_MODULE_0__["h"](preact__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
      type: "file",
      autoFocus: true,
      accept: this.props.accept,
      class: "MediaReplaceForm-Input",
      onChange: this.handleFileSelect
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", null, "Click or drag a replacement file here.")), this.state.file && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleFileRemove,
      class: "MediaReplaceForm-IconButton MediaReplaceForm-BackButton"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/back-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Change File"))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaReplaceForm-Preview" + (this.state.file ? ' Expand' : '')
    }, this.state.file && preact__WEBPACK_IMPORTED_MODULE_0__["h"](preact__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      path: this.state.file.name,
      image: this.state.imagePreview
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaReplaceForm-PreviewDescription"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaReplaceForm-PreviewTitle"
    }, _common_util_Format__WEBPACK_IMPORTED_MODULE_4__["cleanName"](this.state.file.name)), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaReplaceForm-PreviewAuthor"
    }, this.state.file.name), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "MediaReplaceForm-PreviewSize"
    }, _common_util_Format__WEBPACK_IMPORTED_MODULE_4__["bytes"](this.state.file.size), " \u2022 Last modified ", _common_util_Format__WEBPACK_IMPORTED_MODULE_4__["date"](this.state.file.lastModified))))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleUpload,
      class: "MediaReplaceForm-IconButton MediaReplaceForm-SubmitButton",
      disabled: !this.state.file || this.state.state === FormState.UPLOADING
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/check-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Replace")));
  }

}
MediaUploadForm.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_3__["AppContext"];

/***/ }),

/***/ "./components/MediaUploadForm.scss":
/*!*****************************************!*\
  !*** ./components/MediaUploadForm.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaUploadForm.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaUploadForm.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaUploadForm.tsx":
/*!****************************************!*\
  !*** ./components/MediaUploadForm.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaUploadForm; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaUploadForm_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaUploadForm.scss */ "./components/MediaUploadForm.scss");
/* harmony import */ var _MediaUploadForm_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaUploadForm_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _SelectGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectGroup */ "./components/SelectGroup.tsx");
/* harmony import */ var _MediaUploadItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MediaUploadItem */ "./components/MediaUploadItem.tsx");
/* harmony import */ var _DimensionTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DimensionTransition */ "./components/DimensionTransition.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AppContext */ "./components/AppContext.tsx");
/* harmony import */ var _common_util_Format__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../common/util/Format */ "../../common/util/Format.ts");







var MediaUploadState;

(function (MediaUploadState) {
  MediaUploadState[MediaUploadState["SELECTING"] = 0] = "SELECTING";
  MediaUploadState[MediaUploadState["UPLOADING"] = 1] = "UPLOADING";
  MediaUploadState[MediaUploadState["COMPLETED"] = 2] = "COMPLETED";
})(MediaUploadState || (MediaUploadState = {}));

class MediaUploadForm extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.handleKeyUp = e => {
      if (e.key === 'Delete') this.handleRemoveFiles();
    };

    this.handleViewToggle = () => {
      this.setState({
        grid: !this.state.grid
      });
    };

    this.handleRemoveFiles = () => {
      let files = [...this.state.files];

      for (let i = this.state.selected.length - 1; i >= 0; i--) {
        let ind = this.state.selected[i];
        files.splice(ind, 1);
      }

      this.setState({
        files: files
      });
    };

    this.handleNameChange = (ind, name) => {
      let files = [...this.state.files];
      let file = Object.assign(files[ind]);
      file.name = name;
      files[ind] = file;
      this.setState({
        files: files
      });
    };

    this.handleFilenameChange = (ind, name) => {
      const cleanName = name.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
      let files = [...this.state.files];
      let file = Object.assign(files[ind]);
      file.identifier = cleanName;
      files[ind] = file;
      this.setState({
        files: files
      });
    };

    this.handleClose = e => {
      e.preventDefault();
      this.props.onCancel();
    };

    this.handleUpload = () => {
      this.setState({
        state: MediaUploadState.UPLOADING,
        selected: []
      });
      this.handleSubmit();
    };

    this.handleSelectionChange = selected => {
      this.setState({
        selected: selected
      });
    };

    this.handleSubmit = () => {
      const threads = 6;
      let promises = [];

      for (let i = 0; i < threads; i++) {
        let ind = i;
        promises.push(new Promise(resolve => {
          const f = () => {
            if (ind >= this.state.files.length) return resolve();
            const file = this.state.files[ind];
            let data = new FormData();
            data.append('file', file.file);
            data.append('name', file.name);
            data.append('identifier', file.identifier);
            fetch('/admin/media/upload', {
              method: 'POST',
              cache: 'no-cache',
              // headers: {'Content-Type': 'application/json'},
              body: data
            }).then(() => {
              ind += threads;
              f();
            });
          };

          f();
        }));
      }

      Promise.all(promises).then(() => {
        fetch('/admin/data/media', {
          cache: 'no-cache'
        }).then(r => r.json()).then(res => {
          this.context.handleSiteData(res);
          this.props.onCancel();
        });
      });
    };

    this.handleFilesChange = async e => {
      const target = e.target;
      let files = [...this.state.files];
      let newFiles = Array.from(target.files || []);
      target.value = '';
      await Promise.all(newFiles.map(file => new Promise(resolve => {
        const ext = file.name.substr(file.name.lastIndexOf('.') + 1);
        const isImage = ext === 'png' || ext === 'jpeg' || ext === 'jpg' || ext === 'svg' || ext === 'gif';
        const cleanName = _common_util_Format__WEBPACK_IMPORTED_MODULE_6__["cleanName"](file.name, 32);

        const resolveFile = image => {
          let exists = false;

          for (let existingFile of files) {
            if (existingFile.name === cleanName) {
              exists = true;
              break;
            }
          }

          if (!exists) {
            files.push({
              file: file,
              ext: ext,
              name: cleanName,
              identifier: '',
              thumbnail: image
            });
          }

          resolve();
        };

        if (isImage) {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => resolveFile(reader.result);
        } else resolveFile();
      })));
      this.setState({
        files: files
      });
    };

    this.state = {
      state: MediaUploadState.SELECTING,
      files: [],
      selected: [],
      grid: false
    };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    const uploadItems = this.state.files.map((f, i) => preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaUploadItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      file: f,
      ind: i,
      key: f.file.name,
      editable: this.state.state === MediaUploadState.SELECTING,
      onNameChange: this.handleNameChange.bind(this, i),
      onFilenameChange: this.handleFilenameChange.bind(this, i)
    }));
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("form", {
      className: "MediaUploadForm",
      onSubmit: e => e.preventDefault()
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: 'MediaUploadForm-InputWrap' + (this.state.state !== MediaUploadState.SELECTING ? ' disabled' : '')
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
      type: "file",
      multiple: true,
      autoFocus: true,
      className: "MediaUploadForm-Input",
      onChange: this.handleFilesChange,
      disabled: this.state.state !== MediaUploadState.SELECTING
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", null, "Click or drag files here to upload.")), this.state.files.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MediaUploadForm-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, this.state.selected.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaUploadForm-Toolbar-Button",
      onClick: this.handleRemoveFiles
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/trash-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, this.state.selected.length === 1 ? 'Remove' : 'Remove (' + this.state.selected.length + ')'))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaUploadForm-Toolbar-Button"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/sort-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Sort by Size")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaUploadForm-Toolbar-Button",
      onClick: this.handleViewToggle
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: `/admin/asset/icon/${this.state.grid ? 'grid' : 'list'}-view-dark.svg`
    })))), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_DimensionTransition__WEBPACK_IMPORTED_MODULE_4__["default"], {
      duration: 150
    }, this.state.state === MediaUploadState.SELECTING && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_SelectGroup__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: 'MediaUploadForm-Files ' + (this.state.grid ? 'Grid' : 'Stack'),
      onSelectionChange: this.handleSelectionChange,
      multi: true
    }, uploadItems), this.state.state === MediaUploadState.UPLOADING && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: 'MediaUploadForm-Files ' + (this.state.grid ? 'Grid' : 'Stack')
    }, uploadItems)), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MediaUploadForm-ActionBar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleClose,
      className: "MediaUploadForm-ActionBar-Button",
      disabled: this.state.state === MediaUploadState.UPLOADING
    }, "Cancel")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, this.state.files.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleUpload,
      className: "MediaUploadForm-ActionBar-Button Upload",
      disabled: this.state.state === MediaUploadState.UPLOADING
    }, `Upload File${this.state.files.length > 1 ? 's' : ''}`))));
  }

}
MediaUploadForm.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_5__["AppContext"];

/***/ }),

/***/ "./components/MediaUploadItem.scss":
/*!*****************************************!*\
  !*** ./components/MediaUploadItem.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaUploadItem.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaUploadItem.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaUploadItem.tsx":
/*!****************************************!*\
  !*** ./components/MediaUploadItem.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaItem; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaUploadItem_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaUploadItem.scss */ "./components/MediaUploadItem.scss");
/* harmony import */ var _MediaUploadItem_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaUploadItem_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaIcon */ "./components/MediaIcon.tsx");
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Selectable */ "./components/Selectable.tsx");
/* harmony import */ var _common_util_Format__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../common/util/Format */ "../../common/util/Format.ts");





class MediaItem extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFilenameChange = this.handleFilenameChange.bind(this);
  }

  render() {
    const identifier = this.props.file.name.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Selectable__WEBPACK_IMPORTED_MODULE_3__["default"], {
      class: "MediaUploadItem",
      ind: this.props.ind,
      doubleClickSelects: true
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaIcon__WEBPACK_IMPORTED_MODULE_2__["default"], {
      path: this.props.file.file.name,
      image: this.props.file.thumbnail
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MediaItem-Description"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
      type: "text",
      maxLength: 32,
      disabled: !this.props.editable,
      class: "MediaItem-Name",
      value: this.props.file.name,
      onChange: this.handleNameChange,
      onInput: this.handleNameChange,
      onMouseUp: this.handleInputClick
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
      type: "text",
      maxLength: 32,
      disabled: !this.props.editable,
      class: "MediaItem-FileName",
      placeholder: identifier,
      value: this.props.editable ? this.props.file.identifier : identifier + '.' + this.props.file.ext,
      onChange: this.handleFilenameChange,
      onInput: this.handleFilenameChange,
      onMouseUp: this.handleInputClick
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      className: "MediaItem-Metadata"
    }, `${_common_util_Format__WEBPACK_IMPORTED_MODULE_4__["bytes"](this.props.file.file.size)} • ` + `Last modified ${_common_util_Format__WEBPACK_IMPORTED_MODULE_4__["date"](this.props.file.file.lastModified)}`)));
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  handleFilenameChange(e) {
    let target = e.target;
    let start = target.selectionStart;
    let end = target.selectionEnd;
    let oldVal = target.value;
    target.value = target.value.toLowerCase().replace(/[ -]/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

    if (oldVal.length > target.value.length) {
      start -= oldVal.length - target.value.length;
      end -= oldVal.length - target.value.length;
    }

    target.setSelectionRange(start, end);
    this.props.onFilenameChange(target.value);
  }

  handleInputClick(e) {
    e.stopPropagation();
  }

}

/***/ }),

/***/ "./components/MediaView.sass":
/*!***********************************!*\
  !*** ./components/MediaView.sass ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./MediaView.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/MediaView.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/MediaView.tsx":
/*!**********************************!*\
  !*** ./components/MediaView.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaView; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MediaView_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MediaView.sass */ "./components/MediaView.sass");
/* harmony import */ var _MediaView_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MediaView_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaReplaceForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaReplaceForm */ "./components/MediaReplaceForm.tsx");
/* harmony import */ var _MediaIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MediaIcon */ "./components/MediaIcon.tsx");
/* harmony import */ var _DimensionTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DimensionTransition */ "./components/DimensionTransition.tsx");
/* harmony import */ var _common_util_Format__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../common/util/Format */ "../../common/util/Format.ts");






class MediaView extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(p) {
    super(p);

    this.handleReplace = () => {
      this.setState({
        replacing: !this.state.replacing
      });
    };

    this.handleReplaceSubmit = () => {
      /**
      * - EXTREMELY DIRTY HACK ALERT -
      * To force updated images to refresh, we fetch the file without using the cache, 
      * and then find all img tags referencing it, and force them to re-render by clearing
      * and setting their src parameter in quick succession. 
      */
      fetch(this.props.item.publicPath, {
        method: 'GET',
        cache: 'no-cache'
      }).then(() => {
        Array.from(document.getElementsByTagName('img')).forEach(e => {
          if (e.src.endsWith(this.props.item.publicPath)) {
            e.src = "";
            setTimeout(() => e.src = this.props.item.publicPath, 0);
          }
        });
        setTimeout(this.handleReplace, 16);
      });
    };

    this.state = {
      replacing: false
    };
  }

  render(props) {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_DimensionTransition__WEBPACK_IMPORTED_MODULE_4__["default"], {
      duration: 200
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MediaView"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaView-Top"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaIcon__WEBPACK_IMPORTED_MODULE_3__["default"], {
      path: props.item.publicPath,
      imageIcon: false
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaView-Info"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h1", {
      class: "MediaView-Name"
    }, props.item.name, " ", preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      class: "MediaView-Path"
    }, "( ", props.item.publicPath, " )")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      class: "MediaView-Author"
    }, `Uploaded by ${props.item.uploadUser} ${_common_util_Format__WEBPACK_IMPORTED_MODULE_5__["date"](props.item.uploadDate)}.`), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h3", {
      class: "MediaView-Size"
    }, _common_util_Format__WEBPACK_IMPORTED_MODULE_5__["bytes"](props.item.size) + (props.item.dimensions ? ' • ' + _common_util_Format__WEBPACK_IMPORTED_MODULE_5__["vector"](props.item.dimensions, 'px') : '')))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaView-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: () => this.props.onDelete()
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/trash-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Delete")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleReplace
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/refresh-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, this.state.replacing ? 'Cancel' : 'Replace File')))), !this.state.replacing && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "MediaView-Preview"
    }, this.renderPreview()), this.state.replacing && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaReplaceForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
      replace: props.item.identifier,
      accept: '.' + props.item.ext,
      onSubmit: this.handleReplaceSubmit
    })));
  }

  renderPreview() {
    if (Object(_MediaIcon__WEBPACK_IMPORTED_MODULE_3__["mediaIsImage"])(this.props.item.publicPath)) return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: this.props.item.publicPath,
      alt: ""
    });
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("a", {
      class: "MediaView-UnknownPreview",
      href: this.props.item.publicPath,
      target: "_blank"
    }, "View File");
  }

}

/***/ }),

/***/ "./components/Meter.scss":
/*!*******************************!*\
  !*** ./components/Meter.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Meter.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/Meter.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/Meter.tsx":
/*!******************************!*\
  !*** ./components/Meter.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Meter; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Meter_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Meter.scss */ "./components/Meter.scss");
/* harmony import */ var _Meter_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Meter_scss__WEBPACK_IMPORTED_MODULE_1__);


class Meter extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Meter"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Meter-Progress",
      style: {
        width: this.props.usage / this.props.size * 100 + '%'
      }
    }));
  }

}

/***/ }),

/***/ "./components/Modal.scss":
/*!*******************************!*\
  !*** ./components/Modal.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./Modal.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/Modal.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/Modal.tsx":
/*!******************************!*\
  !*** ./components/Modal.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modal.scss */ "./components/Modal.scss");
/* harmony import */ var _Modal_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Modal_scss__WEBPACK_IMPORTED_MODULE_1__);


class Modal extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.avoidClose = this.avoidClose.bind(this);
  }

  componentDidMount() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].style.overflow = '';
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: 'Modal' + (this.props.className ? ' ' + this.props.className : '') + (this.props.onClose ? ' closes' : ''),
      style: this.props.style,
      onClick: this.props.onClose
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Modal-CardWrap"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Modal-Card",
      onClick: this.avoidClose
    }, this.props.children)));
  }

  avoidClose(e) {
    e.stopPropagation();
  }

}

/***/ }),

/***/ "./components/PluginItem.scss":
/*!************************************!*\
  !*** ./components/PluginItem.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./PluginItem.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/PluginItem.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/PluginItem.tsx":
/*!***********************************!*\
  !*** ./components/PluginItem.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaItem; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PluginItem_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PluginItem.scss */ "./components/PluginItem.scss");
/* harmony import */ var _PluginItem_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PluginItem_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Selectable */ "./components/Selectable.tsx");



class MediaItem extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.callbacks = void 0;
    this.callbacks = {
      onDoubleClick: this.props.onClick
    };
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Selectable__WEBPACK_IMPORTED_MODULE_2__["default"], {
      class: "PluginItem",
      ind: this.props.ind,
      callbacks: this.callbacks,
      doubleClickSelects: true
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PluginItem-Cover"
    }, this.props.item.hasCover && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: '/admin/plugins/cover/' + this.props.item.identifier + '.jpg'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      class: 'PluginItem-Tag ' + (this.props.active ? 'Enabled' : 'Disabled')
    }, this.props.active ? 'Enabled' : 'Disabled')), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PluginItem-Content"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      class: "PluginItem-Title"
    }, this.props.item.name), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "PluginItem-Author"
    }, this.props.item.author), this.props.item.description && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "PluginItem-Description"
    }, this.props.item.description)));
  }

}

/***/ }),

/***/ "./components/SelectGroup.scss":
/*!*************************************!*\
  !*** ./components/SelectGroup.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./SelectGroup.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/SelectGroup.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/SelectGroup.tsx":
/*!************************************!*\
  !*** ./components/SelectGroup.tsx ***!
  \************************************/
/*! exports provided: SelectGroupContext, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectGroupContext", function() { return SelectGroupContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectGroup; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SelectGroup_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SelectGroup.scss */ "./components/SelectGroup.scss");
/* harmony import */ var _SelectGroup_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SelectGroup_scss__WEBPACK_IMPORTED_MODULE_1__);


const SelectGroupContext = preact__WEBPACK_IMPORTED_MODULE_0__["createContext"]({
  handleSelect: () => {
    /* No action for default context. */
  },
  selected: []
});
class SelectGroup extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.ctrl = false;
    this.shift = false;

    this.keyDown = e => {
      if (e.key === 'Control') this.ctrl = true;
      if (e.key === 'Shift') this.shift = true;
    };

    this.keyUp = e => {
      if (e.key === 'Control') this.ctrl = false;
      if (e.key === 'Shift') this.shift = false;
    };

    this.resetContextArray = () => {
      let selected = [];

      for (let i = 0; i < (this.props.children ? Array.isArray(this.props.children) ? this.props.children.length : 1 : 0); i++) selected.push(false);

      this.setState({
        contextData: {
          handleSelect: this.state.contextData.handleSelect,
          selected: selected
        },
        lastSelected: undefined
      });
      if (this.props.onSelectionChange) this.props.onSelectionChange([]);
    };

    this.handleSelect = (_, ind, state) => {
      let contextData = { ...this.state.contextData
      };
      if (!this.props.multi || !this.ctrl) contextData.selected = contextData.selected.map((v, i) => i === ind ? v : false);

      if (this.props.multi && this.state.lastSelected !== undefined && this.shift) {
        let a = ind < this.state.lastSelected ? ind : this.state.lastSelected;
        let b = ind < this.state.lastSelected ? this.state.lastSelected : ind;

        for (let i = a; i <= b; i++) contextData.selected[i] = true;
      } else contextData.selected[ind] = state !== undefined ? state : !contextData.selected[ind];

      let lastSelected = this.shift && this.state.lastSelected !== undefined ? this.state.lastSelected : ind;
      if (this.props.onSelectionChange) this.props.onSelectionChange(contextData.selected.map((s, i) => s ? i : -1).filter(i => i !== -1));
      this.setState({
        contextData: contextData,
        lastSelected: lastSelected
      });
    };

    this.state = {
      contextData: {
        handleSelect: this.handleSelect,
        selected: []
      }
    };
  }

  componentDidMount() {
    this.resetContextArray();
    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
    window.removeEventListener('keyup', this.keyUp);
  }

  componentDidUpdate(oldProps) {
    let equal = true;
    const oldKeys = (oldProps.children ? Array.isArray(oldProps.children) ? oldProps.children : [oldProps.children] : []).map(child => child.key);
    const newKeys = (this.props.children ? Array.isArray(this.props.children) ? this.props.children : [this.props.children] : []).map(child => child.key);
    if (oldKeys.length !== newKeys.length) equal = false;
    if (equal) for (let i = 0; i < oldKeys.length; i++) if (oldKeys[i] !== newKeys[i]) equal = false;
    if (equal) return;
    this.resetContextArray();
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](SelectGroupContext.Provider, {
      value: this.state.contextData
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("ul", {
      class: 'SelectGroup ' + (this.props.className ? this.props.className : ''),
      style: this.props.style
    }, this.props.children));
  }

}

/***/ }),

/***/ "./components/Selectable.tsx":
/*!***********************************!*\
  !*** ./components/Selectable.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Selectable; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ClickHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ClickHandler */ "./ClickHandler.ts");
/* harmony import */ var _SelectGroup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SelectGroup */ "./components/SelectGroup.tsx");



class Selectable extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.clickHandler = new _ClickHandler__WEBPACK_IMPORTED_MODULE_1__["default"]({});
  }

  componentDidMount() {
    this.updateCallbacks();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.callbacks === this.props.callbacks) return;
    this.updateCallbacks();
  }

  render() {
    let selected = this.context.selected[this.props.ind];
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_SelectGroup__WEBPACK_IMPORTED_MODULE_2__["SelectGroupContext"].Consumer, null, _ => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      class: 'Selectable ' + (this.props.class ? this.props.class : '') + (selected ? ' selected' : ''),
      style: this.props.style,
      onMouseUp: this.clickHandler.handleMouseUp
    }, this.props.children));
  }

  updateCallbacks() {
    let callbacks = Object.assign({}, this.props.callbacks);
    if (!callbacks.onClick) callbacks.onClick = e => this.context.handleSelect(e, this.props.ind);else {
      let clickCallback = callbacks.onClick;

      callbacks.onClick = e => {
        this.context.handleSelect(e, this.props.ind);
        clickCallback(e);
      };
    }

    if (callbacks.onDoubleClick && this.props.doubleClickSelects) {
      let doubleClickCallback = callbacks.onDoubleClick;

      callbacks.onDoubleClick = e => {
        this.context.handleSelect(e, this.props.ind, true);
        doubleClickCallback(e);
      };
    }

    this.clickHandler = new _ClickHandler__WEBPACK_IMPORTED_MODULE_1__["default"](callbacks);
  }

}
Selectable.contextType = _SelectGroup__WEBPACK_IMPORTED_MODULE_2__["SelectGroupContext"];

/***/ }),

/***/ "./components/ThemeItem.scss":
/*!***********************************!*\
  !*** ./components/ThemeItem.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/sass-loader/dist/cjs.js!./ThemeItem.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/ThemeItem.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/ThemeItem.tsx":
/*!**********************************!*\
  !*** ./components/ThemeItem.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaItem; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeItem_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThemeItem.scss */ "./components/ThemeItem.scss");
/* harmony import */ var _ThemeItem_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ThemeItem_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Selectable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Selectable */ "./components/Selectable.tsx");



class MediaItem extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.callbacks = void 0;
    this.callbacks = {
      onDoubleClick: this.props.onClick
    };
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Selectable__WEBPACK_IMPORTED_MODULE_2__["default"], {
      class: "ThemeItem",
      ind: this.props.ind,
      callbacks: this.callbacks,
      doubleClickSelects: true
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "ThemeItem-Cover"
    }, this.props.item.hasCover && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: '/admin/themes/cover/' + this.props.item.identifier + '.jpg'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      class: 'ThemeItem-Tag ' + (this.props.active ? 'Enabled' : 'Disabled')
    }, this.props.active ? 'Enabled' : 'Disabled')), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "ThemeItem-Content"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      class: "ThemeItem-Title"
    }, this.props.item.name), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "ThemeItem-Author"
    }, this.props.item.author), this.props.item.description && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "ThemeItem-Description"
    }, this.props.item.description)));
  }

}

/***/ }),

/***/ "./components/editor/CreateElementForm.sass":
/*!**************************************************!*\
  !*** ./components/editor/CreateElementForm.sass ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./CreateElementForm.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/CreateElementForm.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/CreateElementForm.tsx":
/*!*************************************************!*\
  !*** ./components/editor/CreateElementForm.tsx ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CreateElementForm; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _CreateElementForm_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateElementForm.sass */ "./components/editor/CreateElementForm.sass");
/* harmony import */ var _CreateElementForm_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CreateElementForm_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _ElementPropsEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElementPropsEditor */ "./components/editor/ElementPropsEditor.tsx");
/* harmony import */ var _DimensionTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DimensionTransition */ "./components/DimensionTransition.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");






class CreateElementForm extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      identifier: ''
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleUpdateValue = this.handleUpdateValue.bind(this);
    this.handleElementChange = this.handleElementChange.bind(this);
    this.handleIdentifierChange = this.handleIdentifierChange.bind(this);
  }

  render() {
    let editor = undefined;

    if (this.state.stage === 1) {
      let customElement = this.context.plugins.elements.get(this.state.element);

      if (customElement === null || customElement === void 0 ? void 0 : customElement.element) {
        editor = preact__WEBPACK_IMPORTED_MODULE_0__["h"](customElement.editElement, {
          props: this.state.elementProps,
          updateProp: this.handleUpdateValue
        });
      } else {
        editor = preact__WEBPACK_IMPORTED_MODULE_0__["h"](_ElementPropsEditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
          values: this.state.elementProps,
          props: this.state.elementPropsDef,
          setProps: () => {
            /* Need to set this up or drop this component */
          }
        });
      }
    }

    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_5__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("form", {
      className: "CreateElementForm",
      onSubmit: e => e.preventDefault()
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_2__["default"], {
      icon: "/admin/asset/icon/element-dark.svg",
      title: "Create New Element",
      subtitle: `Create a new element on ${ctx.data.sitename}.`
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_DimensionTransition__WEBPACK_IMPORTED_MODULE_4__["default"], {
      duration: 200
    }, this.state.stage === 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "CreateElementForm-InnerWrap"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      className: "CreateElementForm-Disclaimer"
    }, `This form is only for experienced developers, such as the administrator of ${ctx.data.sitename}.
								If you ignore this warning you could break your website!`), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("label", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      className: "CreateElementForm-Label"
    }, "Identifier"), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
      type: "text",
      className: "CreateElementForm-IdentifierInput",
      value: this.state.identifier,
      onChange: this.handleIdentifierChange
    })), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("label", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      className: "CreateElementForm-Label"
    }, "Element Type"), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("select", {
      className: "CreateElementForm-Select",
      value: this.state.element,
      onChange: this.handleElementChange
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("option", {
      value: "",
      key: ""
    }, "- Select Type -"), Object.entries(ctx.data.elementDefs).map(([k, e]) => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("option", {
      value: k,
      key: k
    }, e.name || k))))), this.state.stage === 1 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "CreateElementForm-InnerWrap"
    }, editor)), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "CreateElementForm-ActionBar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      type: "button",
      onClick: this.handleBack,
      className: "CreateElementForm-ActionBar-Button"
    }, this.state.stage === 0 ? 'Cancel' : 'Back')), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleForward,
      className: "CreateElementForm-ActionBar-Button"
    }, this.state.stage === 1 ? 'Create Element' : 'Next')))));
  }

  parseProps(_, __) {// Object.entries(props).forEach(([identifier, v]) => {
    // 	if ((v as Element.ArrayProp).entries) {
    // 		dest[identifier] = [];
    // 	}
    // 	else if ((v as Element.TableProp).fields) {
    // 		dest[identifier] = {};
    // 		this.parseProps((v as Element.TableProp).fields, dest[identifier]);
    // 	}
    // 	else {
    // 		const prop = v as Element.FieldProp;
    // 		const types = prop.type.replace(/ /g, '').split('|') as Element.PropType[];
    // 		const baseTypes = types.map(t => t.split(':')[0] as Element.PropType);
    // 		let val: any = undefined;
    // 		if (prop.default) val = prop.default;
    // 		else switch(baseTypes[0]) {
    // 		case 'text': val = ''; break;
    // 		case 'long_text': val = ''; break;
    // 		case 'number': val = 0; break;
    // 		case 'date': val = Date.now(); break;
    // 		case 'time': val = 1000 * 60 * 12; break;
    // 		case 'datetime': val = Date.now(); break;
    // 		case 'boolean': val = false; break;
    // 		case 'media': val = ''; break;
    // 		case 'url': val = ''; break;
    // 		case 'color': val = '#000'; break;
    // 		default: console.log(baseTypes[0], 'does not have hardcoded default!');
    // 		}
    // 		dest[identifier] = val;
    // 	}
    // });
  }

  handleUpdateValue(identifier, value) {
    let splitPath = identifier.split('.');
    let src = Object.assign({}, this.state.elementProps);
    let down = src;

    for (let i = 0; i < splitPath.length; i++) {
      if (i < splitPath.length - 1) {
        src[splitPath[i]] = Object.assign({}, src[splitPath[i]]);
        down = down[splitPath[i]];
      } else {
        down[splitPath[i]] = value;
      }
    }

    this.setState({
      elementProps: src
    });
  }

  handleIdentifierChange(e) {
    this.setState({
      identifier: e.target.value
    });
  }

  handleElementChange(e) {
    const identifier = e.target.value;

    if (!identifier) {
      this.setState({
        element: undefined,
        elementProps: undefined
      });
    } else {
      const elem = this.context.data.elementDefs[identifier];
      let props = {};
      this.parseProps(elem.props, props);
      this.setState({
        element: identifier,
        elementProps: props,
        elementPropsDef: elem.props
      });
    }
  }

  handleBack() {
    let stage = this.state.stage;
    if (stage === 0) this.props.onCancel();else this.setState({
      stage: stage - 1
    });
  }

  handleForward() {
    let stage = this.state.stage;
    if (stage === 0 && !this.state.element) return;

    if (stage === 1) {
      this.handleSubmitForm();
      return;
    }

    this.setState({
      stage: stage + 1
    });
  }

  handleSubmitForm() {
    let ctx = this.context;
    fetch('/admin/elements/create', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier: this.state.identifier,
        element: this.state.element,
        props: this.state.elementProps
      })
    }).then(r => r.json()).then(res => {
      console.log(res);
      ctx.handleSiteData(res);
    });
  }

}
CreateElementForm.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_5__["AppContext"];

/***/ }),

/***/ "./components/editor/EditElementTree.sass":
/*!************************************************!*\
  !*** ./components/editor/EditElementTree.sass ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./EditElementTree.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/EditElementTree.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/EditElementTree.tsx":
/*!***********************************************!*\
  !*** ./components/editor/EditElementTree.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditElementTree; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _EditElementTree_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditElementTree.sass */ "./components/editor/EditElementTree.sass");
/* harmony import */ var _EditElementTree_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_EditElementTree_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modal */ "./components/Modal.tsx");
/* harmony import */ var _ElementEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElementEditor */ "./components/editor/ElementEditor.tsx");
/* harmony import */ var _DimensionTransition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../DimensionTransition */ "./components/DimensionTransition.tsx");
/* harmony import */ var _common_interface_Page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../common/interface/Page */ "../../common/interface/Page.ts");
/* harmony import */ var _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../common/util/ObjectPath */ "../../common/util/ObjectPath.ts");







class EditElementTree extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(p) {
    super(p); // Deep copy using JSON is safe, because page data is already JSON.

    this.handleEdit = path => {
      this.setState({
        editing: path
      });
    };

    this.handleEditCancel = () => {
      this.setState({
        editing: undefined
      });
    };

    this.handleEditSave = props => {
      const element = _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__["traversePath"](this.state.editing, this.state.tree);
      const changed = JSON.stringify(element.props) !== JSON.stringify(props);

      if (changed) {
        element.props = props;
        this.props.onChange(JSON.parse(JSON.stringify(this.state.tree)));
      }

      this.setState({
        editing: undefined
      });
    };

    this.state = {
      tree: JSON.parse(JSON.stringify(this.props.tree))
    };
  }

  render() {
    let element = undefined;

    if (typeof this.state.editing === 'string') {
      element = _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__["traversePath"](this.state.editing, this.state.tree);
      if (_common_interface_Page__WEBPACK_IMPORTED_MODULE_5__["isInclude"](element)) element = element.elem;
    }

    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "EditElementTree"
    }, this.renderNode(this.state.tree, ''), typeof this.state.editing === 'string' && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Modal__WEBPACK_IMPORTED_MODULE_2__["default"], null, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_DimensionTransition__WEBPACK_IMPORTED_MODULE_4__["default"], {
      duration: 200
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_ElementEditor__WEBPACK_IMPORTED_MODULE_3__["default"], {
      element: element,
      onSave: this.handleEditSave,
      onCancel: this.handleEditCancel
    }))));
  }

  renderNode(elem, path) {
    if (_common_interface_Page__WEBPACK_IMPORTED_MODULE_5__["isInclude"](elem)) return this.renderIncludeNode(elem, path);else return this.renderElementNode(elem, path);
  }

  renderElementNode(elem, path) {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      key: path
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      class: "EditElementTree-TreeItem",
      onClick: this.handleEdit.bind(this, path),
      disabled: !elem.props
    }, elem.elem), elem.children && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("ul", null, elem.children.map((c, key) => this.renderNode(c, _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__["combinePath"](path, 'children', key)))));
  }

  renderIncludeNode(include, path) {
    const exposed = this.recursivelyFindExposed(include, '');
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "EditElementTree-IncludeItem",
      key: path
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("ul", null, exposed.map(c => this.renderElementNode(c.elem, _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__["combinePath"]('elem', c.path)))));
  }

  recursivelyFindExposed(elem, path) {
    let exposed = [];
    if (_common_interface_Page__WEBPACK_IMPORTED_MODULE_5__["isElement"](elem) && elem.exposeAs) exposed.push({
      elem: elem,
      path: path
    });
    ((_common_interface_Page__WEBPACK_IMPORTED_MODULE_5__["isInclude"](elem) ? elem.elem.children : elem.children) || []).forEach((c, key) => {
      const childPath = _common_util_ObjectPath__WEBPACK_IMPORTED_MODULE_6__["combinePath"](path, 'children', key);
      exposed.push(...this.recursivelyFindExposed(c, childPath));
    });
    return exposed;
  }

}

/***/ }),

/***/ "./components/editor/ElementEditor.sass":
/*!**********************************************!*\
  !*** ./components/editor/ElementEditor.sass ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./ElementEditor.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementEditor.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/ElementEditor.tsx":
/*!*********************************************!*\
  !*** ./components/editor/ElementEditor.tsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ElementEditor; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ElementEditor_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementEditor.sass */ "./components/editor/ElementEditor.sass");
/* harmony import */ var _ElementEditor_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ElementEditor_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");
/* harmony import */ var _ElementPropInput__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ElementPropInput */ "./components/editor/ElementPropInput.tsx");
/* harmony import */ var _ElementPropArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ElementPropArray */ "./components/editor/ElementPropArray.tsx");





class ElementEditor extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(p) {
    super(p);

    this.handleSetProps = object => {
      const props = Object.assign({}, this.state.props, object);
      this.setState({
        props: props
      });
    };

    this.handleCancel = () => {
      this.props.onCancel();
    };

    this.handleSave = () => {
      this.props.onSave(this.state.props);
    };

    this.state = {
      // Deep copy using JSON is safe, because page data is already JSON.
      props: JSON.parse(JSON.stringify(p.element.props))
    };
  }

  render() {
    var _this$context$plugins;

    const EditElement = (_this$context$plugins = this.context.plugins.elements.get(this.props.element.elem)) === null || _this$context$plugins === void 0 ? void 0 : _this$context$plugins.editElement;
    const defs = !EditElement && this.context.data.elementDefs[this.props.element.elem];
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "ElementEditor " + (EditElement ? "Custom" : "Automatic")
    }, EditElement && preact__WEBPACK_IMPORTED_MODULE_0__["h"](EditElement, {
      props: this.state.props,
      setProps: this.handleSetProps
    }), !EditElement && this.renderPropsTable(defs.props, this.state.props, ""), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "ElementEditor-ActionBar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleSave
    }, "Confirm"), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleCancel
    }, "Cancel")));
  }

  renderPropsTable(props, values, fullIdentifier) {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "ElementEditor-PropsTable"
    }, Object.entries(props).map(([k, v]) => this.renderProp(k, v, values, fullIdentifier + (fullIdentifier !== '' ? '.' : '') + k)));
  }

  renderProp(identifier, p, values, fullIdentifier) {
    // Table
    if ('fields' in p) {
      const friendlyName = p.name || identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
      return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("label", {
        key: fullIdentifier + '-LABEL',
        className: "ElementEditor-TableWrap"
      }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, friendlyName), this.renderPropsTable(p.fields, values[identifier], fullIdentifier));
    } // Array
    else if ('entries' in p) {
        return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_ElementPropArray__WEBPACK_IMPORTED_MODULE_4__["default"], {
          prop: p,
          key: fullIdentifier,
          identifier: identifier,
          value: values[identifier],
          onChange: this.handleSetProps
        });
      } // Field
      else {
          return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_ElementPropInput__WEBPACK_IMPORTED_MODULE_3__["default"], {
            prop: p,
            key: fullIdentifier,
            identifier: identifier,
            value: values[identifier],
            setProps: this.handleSetProps
          });
        }
  }

}
ElementEditor.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_2__["AppContext"];

/***/ }),

/***/ "./components/editor/ElementPropArray.sass":
/*!*************************************************!*\
  !*** ./components/editor/ElementPropArray.sass ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./ElementPropArray.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropArray.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/ElementPropArray.tsx":
/*!************************************************!*\
  !*** ./components/editor/ElementPropArray.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ElementPropArray; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ElementPropArray_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementPropArray.sass */ "./components/editor/ElementPropArray.sass");
/* harmony import */ var _ElementPropArray_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ElementPropArray_sass__WEBPACK_IMPORTED_MODULE_1__);


class ElementPropArray extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const friendlyName = this.props.prop.name || this.props.identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("label", {
      key: this.props.identifier,
      className: "ElementPropArray"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      className: "ElementPropArray-Label"
    }, friendlyName), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      className: "ElementPropArray-Disclaimer"
    }, "Array props can't be edited by the builtin element editor. Use a custom editElement until this is implemented."));
  }

}

/***/ }),

/***/ "./components/editor/ElementPropInput.sass":
/*!*************************************************!*\
  !*** ./components/editor/ElementPropInput.sass ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./ElementPropInput.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropInput.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/ElementPropInput.tsx":
/*!************************************************!*\
  !*** ./components/editor/ElementPropInput.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ElementPropInput; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ElementPropInput_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementPropInput.sass */ "./components/editor/ElementPropInput.sass");
/* harmony import */ var _ElementPropInput_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ElementPropInput_sass__WEBPACK_IMPORTED_MODULE_1__);


class ElementPropInput extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.ref = void 0;
    this.ref = preact__WEBPACK_IMPORTED_MODULE_0__["createRef"]();
    this.state = {
      types: Array.isArray(this.props.prop.type) ? this.props.prop.type : [this.props.prop.type]
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    this.updateRef();
  }

  componentDidMount() {
    this.updateRef();
  }

  render() {
    const friendlyName = this.props.prop.name || this.props.identifier.split(' ').map(s => s.charAt(0).toUpperCase() + s.substr(1)).join(' ');
    let widget = undefined;
    const type = this.state.types[0];
    const baseType = Array.isArray(type) ? 'enum' : this.state.types[0].split(':')[0];

    switch (baseType) {
      default:
      case 'text':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "text",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'long_text':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("textarea", {
          ref: this.ref,
          rows: 1,
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'html':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("textarea", {
          class: "ElementPropInput-Code",
          ref: this.ref,
          rows: 1,
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'number':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "number",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'date':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "date",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'time':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "time",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'datetime':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "datetime",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'boolean':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "checkbox",
          name: this.props.identifier,
          checked: this.props.value,
          onChange: this.handleChange
        });
        break;

      case 'color':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("input", {
          type: "color",
          name: this.props.identifier,
          value: this.props.value,
          onChange: this.handleChange,
          onInput: this.handleChange
        });
        break;

      case 'enum':
        widget = preact__WEBPACK_IMPORTED_MODULE_0__["h"]("select", {
          name: this.props.identifier,
          onChange: this.handleChange
        }, type.map(t => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("option", {
          selected: this.props.value === t,
          value: t
        }, t)));
    }

    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("label", {
      key: this.props.identifier,
      className: "ElementPropInput"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      class: "ElementPropInput-Label"
    }, friendlyName), widget);
  }

  handleChange(evt) {
    let value = evt.target.value; // Apply transformations to value based on type.

    const key = evt.target.name;
    const type = this.state.types[0];
    const baseType = Array.isArray(type) ? 'enum' : this.state.types[0].split(':')[0];

    switch (baseType) {
      default:
        break;

      case 'number':
        value = value === '' ? 0 : Number.parseInt(value, 10);
        if (Number.isNaN(value)) value = this.props.value;
        break;

      case 'boolean':
        value = !this.props.value;
        break;
    }

    this.props.setProps({
      [key]: value
    });
  }

  updateRef() {
    var _this$ref;

    if ((_this$ref = this.ref) === null || _this$ref === void 0 ? void 0 : _this$ref.current) {
      this.ref.current.style.height = '';
      this.ref.current.style.height = Math.min(this.ref.current.scrollHeight + 2, 420) + 'px';
    }
  }

}

/***/ }),

/***/ "./components/editor/ElementPropsEditor.sass":
/*!***************************************************!*\
  !*** ./components/editor/ElementPropsEditor.sass ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./ElementPropsEditor.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/ElementPropsEditor.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/ElementPropsEditor.tsx":
/*!**************************************************!*\
  !*** ./components/editor/ElementPropsEditor.tsx ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ElementPropsEditor; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ElementPropsEditor_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ElementPropsEditor.sass */ "./components/editor/ElementPropsEditor.sass");
/* harmony import */ var _ElementPropsEditor_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ElementPropsEditor_sass__WEBPACK_IMPORTED_MODULE_1__);


class ElementPropsEditor extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return this.renderPropsTable(this.props.props, this.props.values, '');
  }

}

/***/ }),

/***/ "./components/editor/PageEditor.sass":
/*!*******************************************!*\
  !*** ./components/editor/PageEditor.sass ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./PageEditor.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/editor/PageEditor.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/editor/PageEditor.tsx":
/*!******************************************!*\
  !*** ./components/editor/PageEditor.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageEditor; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PageEditor_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageEditor.sass */ "./components/editor/PageEditor.sass");
/* harmony import */ var _PageEditor_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_PageEditor_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_EditElementTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../editor/EditElementTree */ "./components/editor/EditElementTree.tsx");
/* harmony import */ var _common_interface_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../common/interface/Page */ "../../common/interface/Page.ts");




class PageEditor extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(p) {
    super(p); // Deep copy using JSON is safe, because page data is already JSON.

    this.handleChange = (part, tree) => {
      let newPage = JSON.parse(JSON.stringify(this.state.page));
      newPage.elements[part] = tree;
      this.setState({
        changes: this.state.changes + 1,
        page: newPage
      });
    };

    this.handleSave = () => {
      this.setState({
        changes: 0
      });
      let page = JSON.parse(JSON.stringify(this.state.page));
      page.elements.header && this.recursivelyCleanExpansion(page.elements.header);
      page.elements.footer && this.recursivelyCleanExpansion(page.elements.footer);
      this.recursivelyCleanExpansion(page.elements.main);
      this.props.onSave(page);
    };

    this.state = {
      page: JSON.parse(JSON.stringify(this.props.page)),
      changes: 0
    };
  }

  render(_, state) {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PageEditor"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PageEditor-Toolbar"
    }, !!this.state.changes && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleSave
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/add-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Save")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", {
      class: "PageEditor-Changes"
    }, this.state.changes, " Change", this.state.changes != 1 && 's')), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null)), typeof state.page.elements.header === 'object' && this.renderEditor(state.page.elements.header, 'header'), typeof state.page.elements.main === 'object' && this.renderEditor(state.page.elements.main, 'main'), typeof state.page.elements.footer === 'object' && this.renderEditor(state.page.elements.footer, 'footer'));
  }

  renderEditor(tree, part) {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PageEditor-Tree"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", null, part.charAt(0).toUpperCase() + part.substr(1)), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_editor_EditElementTree__WEBPACK_IMPORTED_MODULE_2__["default"], {
      tree: tree,
      onChange: this.handleChange.bind(this, part)
    }));
  }

  recursivelyCleanExpansion(tree) {
    var _ref, _ref$children;

    if (_common_interface_Page__WEBPACK_IMPORTED_MODULE_3__["isInclude"](tree)) {
      if (!tree.override) tree.override = {};
      this.recursivelyCleanOverrides(tree.elem, tree.override);
      delete tree.elem;
    }

    (_ref = _common_interface_Page__WEBPACK_IMPORTED_MODULE_3__["isInclude"](tree) ? tree.elem : tree) === null || _ref === void 0 ? void 0 : (_ref$children = _ref.children) === null || _ref$children === void 0 ? void 0 : _ref$children.forEach(e => this.recursivelyCleanExpansion(e));
  }

  recursivelyCleanOverrides(tree, overrides) {
    var _tree$children;

    if (tree.exposeAs && tree.props) overrides[tree.exposeAs] = tree.props;
    (_tree$children = tree.children) === null || _tree$children === void 0 ? void 0 : _tree$children.forEach(e => _common_interface_Page__WEBPACK_IMPORTED_MODULE_3__["isElement"](e) && this.recursivelyCleanOverrides(e, overrides));
  }

}

/***/ }),

/***/ "./components/pages/MainPage.scss":
/*!****************************************!*\
  !*** ./components/pages/MainPage.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./MainPage.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/MainPage.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/MainPage.tsx":
/*!***************************************!*\
  !*** ./components/pages/MainPage.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainPage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MainPage_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainPage.scss */ "./components/pages/MainPage.scss");
/* harmony import */ var _MainPage_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_MainPage_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Meter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Meter */ "./components/Meter.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");





class MainPage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentWillMount() {
    this.context.refreshSiteData('info');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MainPage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MainPage-Header"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h1", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/globe-dark.svg",
      alt: ""
    }), this.context.data.domain), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", null, this.context.data.sitename)), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MainPage-Content"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("aside", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MainPage-MediaCard"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_4__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Meter__WEBPACK_IMPORTED_MODULE_3__["default"], {
      usage: ctx.data.mediaUsed,
      size: ctx.data.mediaMax
    })))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("main", null)));
  }

}
MainPage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_4__["AppContext"];

/***/ }),

/***/ "./components/pages/MediaPage.scss":
/*!*****************************************!*\
  !*** ./components/pages/MediaPage.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./MediaPage.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/MediaPage.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/MediaPage.tsx":
/*!****************************************!*\
  !*** ./components/pages/MediaPage.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MediaPage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MediaPage_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MediaPage.scss */ "./components/pages/MediaPage.scss");
/* harmony import */ var _MediaPage_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_MediaPage_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modal */ "./components/Modal.tsx");
/* harmony import */ var _MediaItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../MediaItem */ "./components/MediaItem.tsx");
/* harmony import */ var _MediaView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../MediaView */ "./components/MediaView.tsx");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _SelectGroup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../SelectGroup */ "./components/SelectGroup.tsx");
/* harmony import */ var _MediaUploadForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../MediaUploadForm */ "./components/MediaUploadForm.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");










class MediaPage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    this.handleKeyUp = e => {
      if (e.key === 'Delete') this.handleDeleteSelection();
    };

    this.handleViewToggle = () => {
      this.setState({
        grid: !this.state.grid
      });
    };

    this.handleOpenMedia = key => {
      this.setState({
        viewed: key
      });
    };

    this.handleCloseMedia = () => {
      this.setState({
        viewed: undefined
      });
    };

    this.handleUploadCancel = () => {
      this.setState({
        uploading: false
      });
    };

    this.handleUploadMedia = () => {
      this.handleSelectionChange([]);
      this.setState({
        uploading: true
      });
    };

    this.handleDeleteSelection = () => {
      if (this.state.selected.length === 0) return;
      this.handleDelete(...this.state.selected.map(ind => this.context.data.media[ind].identifier));
    };

    this.handleDelete = (...identifiers) => {
      if (this.state.selected.length === 0) return;
      fetch('/admin/media/delete', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(identifiers)
      }).then(r => r.json()).then(res => {
        this.setState({
          viewed: undefined
        });
        this.context.handleSiteData(res);
      });
    };

    this.handleSelectionChange = selected => {
      this.setState({
        selected: selected
      });
    };

    this.state = {
      selected: [],
      viewed: undefined,
      grid: true,
      uploading: false
    };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
    this.context.refreshSiteData('media');
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_9__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Page MediaPage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("section", {
      className: "Page-Card"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_6__["default"], {
      icon: "/admin/asset/icon/document-dark.svg",
      title: "Manage Media",
      subtitle: 'Create or remove user-uploaded media.'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "MediaPage-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleUploadMedia
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/add-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Upload Media")), this.state.selected.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleDeleteSelection
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/trash-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, this.state.selected.length === 1 ? 'Delete' : 'Delete (' + this.state.selected.length + ')'))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleViewToggle
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: `/admin/asset/icon/${this.state.grid ? 'grid' : 'list'}-view-dark.svg`
    })))), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_SelectGroup__WEBPACK_IMPORTED_MODULE_7__["default"], {
      multi: true,
      onSelectionChange: this.handleSelectionChange,
      className: 'MediaPage-Media ' + (this.state.grid ? 'Grid' : 'Stack')
    }, ctx.data.media.map((a, i) => preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaItem__WEBPACK_IMPORTED_MODULE_4__["default"], {
      ind: i,
      item: a,
      key: a.identifier,
      onClick: this.handleOpenMedia.bind(this, a.identifier)
    }))), ctx.data.media.length === 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      className: "MediaPage-NoMedia"
    }, "No media found.")), this.state.viewed !== undefined && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
      onClose: this.handleCloseMedia
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaView__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onDelete: this.handleDelete.bind(this, this.state.viewed),
      item: ctx.data.media.filter(m => m.identifier == this.state.viewed)[0]
    })), this.state.uploading && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], null, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_6__["default"], {
      icon: "/admin/asset/icon/document-dark.svg",
      title: "Upload Media",
      subtitle: `Upload new media assets to ${ctx.data.sitename}.`
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_MediaUploadForm__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onCancel: this.handleUploadCancel
    }))));
  }

}
MediaPage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_9__["AppContext"];

/***/ }),

/***/ "./components/pages/Page.sass":
/*!************************************!*\
  !*** ./components/pages/Page.sass ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./Page.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/Page.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/PagePage.sass":
/*!****************************************!*\
  !*** ./components/pages/PagePage.sass ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./PagePage.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PagePage.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/PagePage.tsx":
/*!***************************************!*\
  !*** ./components/pages/PagePage.tsx ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PagePage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PagePage_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PagePage.sass */ "./components/pages/PagePage.sass");
/* harmony import */ var _PagePage_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_PagePage_sass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");
/* harmony import */ var _editor_PageEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../editor/PageEditor */ "./components/editor/PageEditor.tsx");






class PagePage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(p) {
    super(p);

    this.handleSave = page => {
      const pagePath = window.location.pathname.replace(/^\/admin\/pages\//g, '');
      fetch('/admin/pages/update', {
        cache: 'no-cache',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          path: pagePath,
          body: page
        })
      });
    };
  }

  componentDidMount() {
    let page = window.location.pathname.replace(/^\/admin\/pages\//g, '');
    this.context.getPageData(page).then(page => this.setState({
      page: page
    }));
    this.context.refreshSiteData('elements');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "Page PagePage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("section", {
      class: "Page-Card"
    }, this.state.page && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_3__["default"], {
      icon: "/admin/asset/icon/element-dark.svg",
      title: this.state.page.title,
      subtitle: this.state.page.description || preact__WEBPACK_IMPORTED_MODULE_0__["h"]("em", null, "No description.")
    }), this.state.page && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_editor_PageEditor__WEBPACK_IMPORTED_MODULE_5__["default"], {
      page: this.state.page,
      onSave: this.handleSave
    }))));
  }

}
PagePage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_4__["AppContext"];

/***/ }),

/***/ "./components/pages/PagesPage.sass":
/*!*****************************************!*\
  !*** ./components/pages/PagesPage.sass ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./PagesPage.sass */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PagesPage.sass");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/PagesPage.tsx":
/*!****************************************!*\
  !*** ./components/pages/PagesPage.tsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PagesPage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PagesPage_sass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PagesPage.sass */ "./components/pages/PagesPage.sass");
/* harmony import */ var _PagesPage_sass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_PagesPage_sass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Modal */ "./components/Modal.tsx");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _editor_CreateElementForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../editor/CreateElementForm */ "./components/editor/CreateElementForm.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");








class PagesPage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      create: false
    };
    this.toggleCreateElement = this.toggleCreateElement.bind(this);
  }

  componentWillMount() {
    this.context.refreshSiteData('elements&pages');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_7__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "Page PagesPage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("section", {
      class: "Page-Card"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_5__["default"], {
      icon: "/admin/asset/icon/element-dark.svg",
      title: "Manage Pages",
      subtitle: 'Manage site pages and elements.'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      class: "PagesPage-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      class: "PagesPage-Toolbar-Button",
      onClick: this.toggleCreateElement
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/add-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Create new Element"))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("ul", {
      class: "PagesPage-Pages"
    }, Object.keys(ctx.data.pages).sort((a, b) => a > b ? 1 : -1).map(p => preact__WEBPACK_IMPORTED_MODULE_0__["h"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
      className: "PagesPage-PageItem",
      to: '/pages/' + p
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "PagesPage-PageItemTitle"
    }, ctx.data.pages[p].title), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "PagesPage-PageItemDescription"
    }, ctx.data.pages[p].description || preact__WEBPACK_IMPORTED_MODULE_0__["h"]("em", null, "No description")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("p", {
      class: "PagesPage-PageItemPath"
    }, p))))), this.state.create && preact__WEBPACK_IMPORTED_MODULE_0__["h"](_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], null, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_editor_CreateElementForm__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onCancel: this.toggleCreateElement
    }))));
  }

  toggleCreateElement() {
    this.setState({
      create: !this.state.create
    });
  }

}
PagesPage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_7__["AppContext"];

/***/ }),

/***/ "./components/pages/PluginsPage.scss":
/*!*******************************************!*\
  !*** ./components/pages/PluginsPage.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./PluginsPage.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/PluginsPage.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/PluginsPage.tsx":
/*!******************************************!*\
  !*** ./components/pages/PluginsPage.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PluginsPage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PluginsPage_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PluginsPage.scss */ "./components/pages/PluginsPage.scss");
/* harmony import */ var _PluginsPage_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_PluginsPage_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _PluginItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../PluginItem */ "./components/PluginItem.tsx");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _SelectGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SelectGroup */ "./components/SelectGroup.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");







class PluginsPage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.selected = [];
    this.state = {
      selected: []
    };
    this.handleTogglePlugins = this.handleTogglePlugins.bind(this);
    this.handleRefreshPlugins = this.handleRefreshPlugins.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentWillMount() {
    this.context.refreshSiteData('plugins');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Page PluginsPage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("section", {
      className: "Page-Card"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
      icon: "/admin/asset/icon/element-dark.svg",
      title: "Manage Plugins",
      subtitle: 'Install, enable, or disable plugins.'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "PluginsPage-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleTogglePlugins
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/add-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Install Plugin")), this.state.selected.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleTogglePlugins
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/refresh-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, 'Toggle Plugin' + (this.state.selected.length !== 1 ? ' (' + this.state.selected.length + ')' : '')))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleTogglePlugins
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/sort-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Sort by Size")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleRefreshPlugins
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/refresh-dark.svg",
      alt: ""
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Refresh")))), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_SelectGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "PluginsPage-Plugins",
      onSelectionChange: this.handleSelectionChange,
      multi: true
    }, ctx.data.plugins.map((t, i) => preact__WEBPACK_IMPORTED_MODULE_0__["h"](_PluginItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: t,
      ind: i,
      onClick: this.handleTogglePlugins,
      active: ctx.data.enabledPlugins.indexOf(t.identifier) !== -1,
      key: t.identifier
    }))), ctx.data.plugins.length === 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      className: "PluginsPage-NoPlugins"
    }, "No plugins found."))));
  }

  handleSelectionChange(selected) {
    this.selected = selected;
    this.setState({
      selected: selected
    });
  }

  handleTogglePlugins() {
    fetch('/admin/plugins/toggle', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.selected.map(ind => this.context.data.plugins[ind].identifier))
    }).then(r => r.json()).then(res => {
      this.context.handleSiteData(res);
    });
  }

  handleRefreshPlugins() {
    fetch('/admin/plugins/refresh', {
      cache: 'no-cache',
      method: 'POST'
    }).then(r => r.json()).then(res => {
      this.context.handleSiteData(res);
    });
  }

}
PluginsPage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"];

/***/ }),

/***/ "./components/pages/ThemesPage.scss":
/*!******************************************!*\
  !*** ./components/pages/ThemesPage.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../../node_modules/css-loader/dist/cjs.js!../../../../node_modules/sass-loader/dist/cjs.js!./ThemesPage.scss */ "../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./components/pages/ThemesPage.scss");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./components/pages/ThemesPage.tsx":
/*!*****************************************!*\
  !*** ./components/pages/ThemesPage.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ThemesPage; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "preact");
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(preact__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.sass */ "./components/pages/Page.sass");
/* harmony import */ var _Page_sass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Page_sass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ThemesPage_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ThemesPage.scss */ "./components/pages/ThemesPage.scss");
/* harmony import */ var _ThemesPage_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ThemesPage_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ThemeItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ThemeItem */ "./components/ThemeItem.tsx");
/* harmony import */ var _CardHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CardHeader */ "./components/CardHeader.tsx");
/* harmony import */ var _SelectGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SelectGroup */ "./components/SelectGroup.tsx");
/* harmony import */ var _AppContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../AppContext */ "./components/AppContext.tsx");







class ThemesPage extends preact__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.selected = [];

    this.handleSelectionChange = selected => {
      this.selected = selected;
      this.setState({
        selected: selected
      });
    };

    this.handleToggleThemes = () => {
      fetch('/admin/themes/toggle', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.selected.map(ind => this.context.data.themes[ind].identifier))
      }).then(r => r.json()).then(this.context.handleSiteData);
    };

    this.handleRefreshThemes = () => {
      fetch('/admin/themes/refresh', {
        cache: 'no-cache',
        method: 'POST'
      }).then(r => r.json()).then(this.context.handleSiteData);
    };

    this.state = {
      selected: []
    };
  }

  componentWillMount() {
    this.context.refreshSiteData('themes');
  }

  render() {
    return preact__WEBPACK_IMPORTED_MODULE_0__["h"](_AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"].Consumer, null, ctx => preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "Page ThemesPage"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("section", {
      className: "Page-Card"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"](_CardHeader__WEBPACK_IMPORTED_MODULE_4__["default"], {
      icon: "/admin/asset/icon/theme-dark.svg",
      title: "Manage Themes",
      subtitle: 'Install, enable, or disable site themes.'
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", {
      className: "ThemesPage-Toolbar"
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleToggleThemes
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/add-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Install Theme")), this.state.selected.length > 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleToggleThemes
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/refresh-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, 'Toggle Theme' + (this.state.selected.length !== 1 ? ' (' + this.state.selected.length + ')' : '')))), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("div", null, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      className: "MediaPage-Toolbar-Button",
      onClick: this.handleToggleThemes
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/sort-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Sort by Size")), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("button", {
      onClick: this.handleRefreshThemes
    }, preact__WEBPACK_IMPORTED_MODULE_0__["h"]("img", {
      src: "/admin/asset/icon/refresh-dark.svg"
    }), preact__WEBPACK_IMPORTED_MODULE_0__["h"]("span", null, "Refresh")))), preact__WEBPACK_IMPORTED_MODULE_0__["h"](_SelectGroup__WEBPACK_IMPORTED_MODULE_5__["default"], {
      className: "ThemesPage-Themes",
      onSelectionChange: this.handleSelectionChange,
      multi: true
    }, ctx.data.themes.map((t, i) => preact__WEBPACK_IMPORTED_MODULE_0__["h"](_ThemeItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
      item: t,
      ind: i,
      onClick: this.handleToggleThemes,
      active: ctx.data.enabledThemes.indexOf(t.identifier) !== -1,
      key: t.identifier
    }))), ctx.data.themes.length === 0 && preact__WEBPACK_IMPORTED_MODULE_0__["h"]("h2", {
      className: "ThemesPage-NoThemes"
    }, "No themes found."))));
  }

}
ThemesPage.contextType = _AppContext__WEBPACK_IMPORTED_MODULE_6__["AppContext"];

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./Main.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./Main.ts */"./Main.ts");


/***/ }),

/***/ "preact":
/*!*************************!*\
  !*** external "preact" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = preact;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map