"use strict";

var _interopRequireDefault = require("C:/git/github/personal/configs/node_modules/@babel/runtime/helpers/interopRequireDefault.js").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ahoj = void 0;
exports.App = App;
exports.default = exports.another = exports.Component = void 0;

var _classPrivateFieldLooseBase2 = _interopRequireDefault(require("C:/git/github/personal/configs/node_modules/@babel/runtime/helpers/classPrivateFieldLooseBase.js"));

var _classPrivateFieldLooseKey2 = _interopRequireDefault(require("C:/git/github/personal/configs/node_modules/@babel/runtime/helpers/classPrivateFieldLooseKey.js"));

var _jsxFileName = "C:\\git\\github\\personal\\configs\\packages\\babel-preset\\test\\fixtures\\react-jsx-transform\\code.js";

function App() {
  return React.createElement("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 2,
      columnNumber: 10
    }
  }, "This is my app");
}

const test = '';

var _totally = (0, _classPrivateFieldLooseKey2.default)("totally");

class Ahoj {
  constructor() {
    Object.defineProperty(this, _totally, {
      writable: true,
      value: 'test'
    });
  }

  get Totally() {
    return (0, _classPrivateFieldLooseBase2.default)(this, _totally)[_totally];
  }

}

exports.Ahoj = Ahoj;

const another = a => {
  return a !== null && a !== void 0 ? a : '';
};

exports.another = another;

const Component = () => {
  return React.createElement("div", {
    __self: void 0,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 10
    }
  }, "test");
};

exports.Component = Component;
var _default = test;
exports.default = _default;
