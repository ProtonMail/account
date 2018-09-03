webpackJsonp([0],{

/***/ "/SCx":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"scopeFormModal":"scopeFormModal__1BtqE"};

/***/ }),

/***/ "/sXU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (false) {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;


/***/ }),

/***/ "/xcA":
/***/ (function(module, exports) {

function QRBitBuffer() {
	this.buffer = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;


/***/ }),

/***/ "0G6U":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"security":"security__W7SMa","nav":"nav__xBwXf","selected":"selected__2GGzc","content":"content__2F01E"};

/***/ }),

/***/ "5D9O":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__("wVGV")();
}


/***/ }),

/***/ "5H+Q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canUseDOM = undefined;

var _exenv = __webpack_require__("RKsu");

var _exenv2 = _interopRequireDefault(_exenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EE = _exenv2.default;

var SafeHTMLElement = EE.canUseDOM ? window.HTMLElement : {};

var canUseDOM = exports.canUseDOM = EE.canUseDOM;

exports.default = SafeHTMLElement;

/***/ }),

/***/ "AM9u":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"list":"list__173W2","listHeader":"listHeader__2HKB5","listElement":"listElement__Rvkc1","listElementHeaderCompromised":"listElementHeaderCompromised__3eJEC","listElementHeader":"listElementHeader__38O9j"};

/***/ }),

/***/ "Asjh":
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

/***/ "CFce":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("5D9O");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = __webpack_require__("MICo");

var focusManager = _interopRequireWildcard(_focusManager);

var _scopeTab = __webpack_require__("I7ih");

var _scopeTab2 = _interopRequireDefault(_scopeTab);

var _ariaAppHider = __webpack_require__("OMxe");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _classList = __webpack_require__("Gqun");

var classList = _interopRequireWildcard(_classList);

var _safeHTMLElement = __webpack_require__("5H+Q");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// so that our CSS is statically analyzable
var CLASS_NAMES = {
  overlay: "ReactModal__Overlay",
  content: "ReactModal__Content"
};

var TAB_KEY = 9;
var ESC_KEY = 27;

var ariaHiddenInstances = 0;

var ModalPortal = function (_Component) {
  _inherits(ModalPortal, _Component);

  function ModalPortal(props) {
    _classCallCheck(this, ModalPortal);

    var _this = _possibleConstructorReturn(this, (ModalPortal.__proto__ || Object.getPrototypeOf(ModalPortal)).call(this, props));

    _this.setOverlayRef = function (overlay) {
      _this.overlay = overlay;
      _this.props.overlayRef && _this.props.overlayRef(overlay);
    };

    _this.setContentRef = function (content) {
      _this.content = content;
      _this.props.contentRef && _this.props.contentRef(content);
    };

    _this.afterClose = function () {
      var _this$props = _this.props,
          appElement = _this$props.appElement,
          ariaHideApp = _this$props.ariaHideApp,
          htmlOpenClassName = _this$props.htmlOpenClassName,
          bodyOpenClassName = _this$props.bodyOpenClassName;

      // Remove classes.

      classList.remove(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.remove(document.getElementsByTagName("html")[0], htmlOpenClassName);

      // Reset aria-hidden attribute if all modals have been removed
      if (ariaHideApp && ariaHiddenInstances > 0) {
        ariaHiddenInstances -= 1;

        if (ariaHiddenInstances === 0) {
          ariaAppHider.show(appElement);
        }
      }

      if (_this.props.shouldFocusAfterRender) {
        if (_this.props.shouldReturnFocusAfterClose) {
          focusManager.returnFocus();
          focusManager.teardownScopedFocus();
        } else {
          focusManager.popWithoutFocus();
        }
      }
    };

    _this.open = function () {
      _this.beforeOpen();
      if (_this.state.afterOpen && _this.state.beforeClose) {
        clearTimeout(_this.closeTimer);
        _this.setState({ beforeClose: false });
      } else {
        if (_this.props.shouldFocusAfterRender) {
          focusManager.setupScopedFocus(_this.node);
          focusManager.markForFocusLater();
        }

        _this.setState({ isOpen: true }, function () {
          _this.setState({ afterOpen: true });

          if (_this.props.isOpen && _this.props.onAfterOpen) {
            _this.props.onAfterOpen();
          }
        });
      }
    };

    _this.close = function () {
      if (_this.props.closeTimeoutMS > 0) {
        _this.closeWithTimeout();
      } else {
        _this.closeWithoutTimeout();
      }
    };

    _this.focusContent = function () {
      return _this.content && !_this.contentHasFocus() && _this.content.focus();
    };

    _this.closeWithTimeout = function () {
      var closesAt = Date.now() + _this.props.closeTimeoutMS;
      _this.setState({ beforeClose: true, closesAt: closesAt }, function () {
        _this.closeTimer = setTimeout(_this.closeWithoutTimeout, _this.state.closesAt - Date.now());
      });
    };

    _this.closeWithoutTimeout = function () {
      _this.setState({
        beforeClose: false,
        isOpen: false,
        afterOpen: false,
        closesAt: null
      }, _this.afterClose);
    };

    _this.handleKeyDown = function (event) {
      if (event.keyCode === TAB_KEY) {
        (0, _scopeTab2.default)(_this.content, event);
      }

      if (_this.props.shouldCloseOnEsc && event.keyCode === ESC_KEY) {
        event.stopPropagation();
        _this.requestClose(event);
      }
    };

    _this.handleOverlayOnClick = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (_this.shouldClose && _this.props.shouldCloseOnOverlayClick) {
        if (_this.ownerHandlesClose()) {
          _this.requestClose(event);
        } else {
          _this.focusContent();
        }
      }
      _this.shouldClose = null;
    };

    _this.handleContentOnMouseUp = function () {
      _this.shouldClose = false;
    };

    _this.handleOverlayOnMouseDown = function (event) {
      if (!_this.props.shouldCloseOnOverlayClick && event.target == _this.overlay) {
        event.preventDefault();
      }
    };

    _this.handleContentOnClick = function () {
      _this.shouldClose = false;
    };

    _this.handleContentOnMouseDown = function () {
      _this.shouldClose = false;
    };

    _this.requestClose = function (event) {
      return _this.ownerHandlesClose() && _this.props.onRequestClose(event);
    };

    _this.ownerHandlesClose = function () {
      return _this.props.onRequestClose;
    };

    _this.shouldBeClosed = function () {
      return !_this.state.isOpen && !_this.state.beforeClose;
    };

    _this.contentHasFocus = function () {
      return document.activeElement === _this.content || _this.content.contains(document.activeElement);
    };

    _this.buildClassName = function (which, additional) {
      var classNames = (typeof additional === "undefined" ? "undefined" : _typeof(additional)) === "object" ? additional : {
        base: CLASS_NAMES[which],
        afterOpen: CLASS_NAMES[which] + "--after-open",
        beforeClose: CLASS_NAMES[which] + "--before-close"
      };
      var className = classNames.base;
      if (_this.state.afterOpen) {
        className = className + " " + classNames.afterOpen;
      }
      if (_this.state.beforeClose) {
        className = className + " " + classNames.beforeClose;
      }
      return typeof additional === "string" && additional ? className + " " + additional : className;
    };

    _this.attributesFromObject = function (prefix, items) {
      return Object.keys(items).reduce(function (acc, name) {
        acc[prefix + "-" + name] = items[name];
        return acc;
      }, {});
    };

    _this.state = {
      afterOpen: false,
      beforeClose: false
    };

    _this.shouldClose = null;
    _this.moveFromContentToOverlay = null;
    return _this;
  }

  _createClass(ModalPortal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isOpen) {
        this.open();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (false) {
        if (prevProps.bodyOpenClassName !== this.props.bodyOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "bodyOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
        if (prevProps.htmlOpenClassName !== this.props.htmlOpenClassName) {
          // eslint-disable-next-line no-console
          console.warn('React-Modal: "htmlOpenClassName" prop has been modified. ' + "This may cause unexpected behavior when multiple modals are open.");
        }
      }

      if (this.props.isOpen && !prevProps.isOpen) {
        this.open();
      } else if (!this.props.isOpen && prevProps.isOpen) {
        this.close();
      }

      // Focus only needs to be set once when the modal is being opened
      if (this.props.shouldFocusAfterRender && this.state.isOpen && !prevState.isOpen) {
        this.focusContent();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.afterClose();
      clearTimeout(this.closeTimer);
    }
  }, {
    key: "beforeOpen",
    value: function beforeOpen() {
      var _props = this.props,
          appElement = _props.appElement,
          ariaHideApp = _props.ariaHideApp,
          htmlOpenClassName = _props.htmlOpenClassName,
          bodyOpenClassName = _props.bodyOpenClassName;

      // Add classes.

      classList.add(document.body, bodyOpenClassName);

      htmlOpenClassName && classList.add(document.getElementsByTagName("html")[0], htmlOpenClassName);

      if (ariaHideApp) {
        ariaHiddenInstances += 1;
        ariaAppHider.hide(appElement);
      }
    }

    // Don't steal focus from inner elements

  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          overlayClassName = _props2.overlayClassName,
          defaultStyles = _props2.defaultStyles;

      var contentStyles = className ? {} : defaultStyles.content;
      var overlayStyles = overlayClassName ? {} : defaultStyles.overlay;

      return this.shouldBeClosed() ? null : _react2.default.createElement(
        "div",
        {
          ref: this.setOverlayRef,
          className: this.buildClassName("overlay", overlayClassName),
          style: _extends({}, overlayStyles, this.props.style.overlay),
          onClick: this.handleOverlayOnClick,
          onMouseDown: this.handleOverlayOnMouseDown,
          "aria-modal": "true"
        },
        _react2.default.createElement(
          "div",
          _extends({
            ref: this.setContentRef,
            style: _extends({}, contentStyles, this.props.style.content),
            className: this.buildClassName("content", className),
            tabIndex: "-1",
            onKeyDown: this.handleKeyDown,
            onMouseDown: this.handleContentOnMouseDown,
            onMouseUp: this.handleContentOnMouseUp,
            onClick: this.handleContentOnClick,
            role: this.props.role,
            "aria-label": this.props.contentLabel
          }, this.attributesFromObject("aria", this.props.aria || {}), this.attributesFromObject("data", this.props.data || {})),
          this.props.children
        )
      );
    }
  }]);

  return ModalPortal;
}(_react.Component);

ModalPortal.defaultProps = {
  style: {
    overlay: {},
    content: {}
  },
  defaultStyles: {}
};
ModalPortal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  defaultStyles: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  ariaHideApp: _propTypes2.default.bool,
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  children: _propTypes2.default.node,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func,
  testId: _propTypes2.default.string
};
exports.default = ModalPortal;
module.exports = exports["default"];

/***/ }),

/***/ "Gqun":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dumpClassLists = dumpClassLists;
var htmlClassList = {};
var docBodyClassList = {};

function dumpClassLists() {
  if (false) {
    var classes = document.getElementsByTagName("html")[0].className;
    var buffer = "Show tracked classes:\n\n";

    buffer += "<html /> (" + classes + "):\n";
    for (var x in htmlClassList) {
      buffer += "  " + x + " " + htmlClassList[x] + "\n";
    }

    classes = document.body.className;

    // eslint-disable-next-line max-len
    buffer += "\n\ndoc.body (" + classes + "):\n";
    for (var _x in docBodyClassList) {
      buffer += "  " + _x + " " + docBodyClassList[_x] + "\n";
    }

    buffer += "\n";

    // eslint-disable-next-line no-console
    console.log(buffer);
  }
}

/**
 * Track the number of reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var incrementReference = function incrementReference(poll, className) {
  if (!poll[className]) {
    poll[className] = 0;
  }
  poll[className] += 1;
  return className;
};

/**
 * Drop the reference of a class.
 * @param {object} poll The poll to receive the reference.
 * @param {string} className The class name.
 * @return {string}
 */
var decrementReference = function decrementReference(poll, className) {
  if (poll[className]) {
    poll[className] -= 1;
  }
  return className;
};

/**
 * Track a class and add to the given class list.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be tracked.
 */
var trackClass = function trackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    incrementReference(poll, className);
    classListRef.add(className);
  });
};

/**
 * Untrack a class and remove from the given class list if the reference
 * reaches 0.
 * @param {Object} classListRef A class list of an element.
 * @param {Object} poll         The poll to be used.
 * @param {Array}  classes      The list of classes to be untracked.
 */
var untrackClass = function untrackClass(classListRef, poll, classes) {
  classes.forEach(function (className) {
    decrementReference(poll, className);
    poll[className] === 0 && classListRef.remove(className);
  });
};

/**
 * Public inferface to add classes to the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var add = exports.add = function add(element, classString) {
  return trackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/**
 * Public inferface to remove classes from the document.body.
 * @param {string} bodyClass The class string to be added.
 *                           It may contain more then one class
 *                           with ' ' as separator.
 */
var remove = exports.remove = function remove(element, classString) {
  return untrackClass(element.classList, element.nodeName.toLowerCase() == "html" ? htmlClassList : docBodyClassList, classString.split(" "));
};

/***/ }),

/***/ "I7ih":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scopeTab;

var _tabbable = __webpack_require__("g+vV");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scopeTab(node, event) {
  var tabbable = (0, _tabbable2.default)(node);

  if (!tabbable.length) {
    // Do nothing, since there are no elements that can receive focus.
    event.preventDefault();
    return;
  }

  var shiftKey = event.shiftKey;
  var head = tabbable[0];
  var tail = tabbable[tabbable.length - 1];

  // proceed with default browser behavior on tab.
  // Focus on last element on shift + tab.
  if (node === document.activeElement) {
    if (!shiftKey) return;
    target = tail;
  }

  var target;
  if (tail === document.activeElement && !shiftKey) {
    target = head;
  }

  if (head === document.activeElement && shiftKey) {
    target = tail;
  }

  if (target) {
    event.preventDefault();
    target.focus();
    return;
  }

  // Safari radio issue.
  //
  // Safari does not move the focus to the radio button,
  // so we need to force it to really walk through all elements.
  //
  // This is very error prone, since we are trying to guess
  // if it is a safari browser from the first occurence between
  // chrome or safari.
  //
  // The chrome user agent contains the first ocurrence
  // as the 'chrome/version' and later the 'safari/version'.
  var checkSafari = /(\bChrome\b|\bSafari\b)\//.exec(navigator.userAgent);
  var isSafariDesktop = checkSafari != null && checkSafari[1] != "Chrome" && /\biPod\b|\biPad\b/g.exec(navigator.userAgent) == null;

  // If we are not in safari desktop, let the browser control
  // the focus
  if (!isSafariDesktop) return;

  var x = tabbable.indexOf(document.activeElement);

  if (x > -1) {
    x += shiftKey ? -1 : 1;
  }

  event.preventDefault();

  tabbable[x].focus();
}
module.exports = exports["default"];

/***/ }),

/***/ "JKdY":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"name":"name__3G4Gb","nameLabel":"nameLabel__3vcWD","nameInputContainer":"nameInputContainer__2oX5b","nameTextInput":"nameTextInput__3x2ad","container":"container__3AIVX","status":"status__15tNF","row":"row__1zNuO","text":"text__1GRWt"};

/***/ }),

/***/ "JUot":
/***/ (function(module, exports) {


module.exports = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};


/***/ }),

/***/ "MICo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleBlur = handleBlur;
exports.handleFocus = handleFocus;
exports.markForFocusLater = markForFocusLater;
exports.returnFocus = returnFocus;
exports.popWithoutFocus = popWithoutFocus;
exports.setupScopedFocus = setupScopedFocus;
exports.teardownScopedFocus = teardownScopedFocus;

var _tabbable = __webpack_require__("g+vV");

var _tabbable2 = _interopRequireDefault(_tabbable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var focusLaterElements = [];
var modalElement = null;
var needToFocus = false;

function handleBlur() {
  needToFocus = true;
}

function handleFocus() {
  if (needToFocus) {
    needToFocus = false;
    if (!modalElement) {
      return;
    }
    // need to see how jQuery shims document.on('focusin') so we don't need the
    // setTimeout, firefox doesn't support focusin, if it did, we could focus
    // the element outside of a setTimeout. Side-effect of this implementation
    // is that the document.body gets focus, and then we focus our element right
    // after, seems fine.
    setTimeout(function () {
      if (modalElement.contains(document.activeElement)) {
        return;
      }
      var el = (0, _tabbable2.default)(modalElement)[0] || modalElement;
      el.focus();
    }, 0);
  }
}

function markForFocusLater() {
  focusLaterElements.push(document.activeElement);
}

/* eslint-disable no-console */
function returnFocus() {
  var toFocus = null;
  try {
    if (focusLaterElements.length !== 0) {
      toFocus = focusLaterElements.pop();
      toFocus.focus();
    }
    return;
  } catch (e) {
    console.warn(["You tried to return focus to", toFocus, "but it is not in the DOM anymore"].join(" "));
  }
}
/* eslint-enable no-console */

function popWithoutFocus() {
  focusLaterElements.length > 0 && focusLaterElements.pop();
}

function setupScopedFocus(element) {
  modalElement = element;

  if (window.addEventListener) {
    window.addEventListener("blur", handleBlur, false);
    document.addEventListener("focus", handleFocus, true);
  } else {
    window.attachEvent("onBlur", handleBlur);
    document.attachEvent("onFocus", handleFocus);
  }
}

function teardownScopedFocus() {
  modalElement = null;

  if (window.addEventListener) {
    window.removeEventListener("blur", handleBlur);
    document.removeEventListener("focus", handleFocus);
  } else {
    window.detachEvent("onBlur", handleBlur);
    document.detachEvent("onFocus", handleFocus);
  }
}

/***/ }),

/***/ "MtRz":
/***/ (function(module, exports) {

var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;


/***/ }),

/***/ "OMxe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNodeList = assertNodeList;
exports.setElement = setElement;
exports.validateElement = validateElement;
exports.hide = hide;
exports.show = show;
exports.documentNotReadyOrSSRTesting = documentNotReadyOrSSRTesting;
exports.resetForTesting = resetForTesting;

var _warning = __webpack_require__("/sXU");

var _warning2 = _interopRequireDefault(_warning);

var _safeHTMLElement = __webpack_require__("5H+Q");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalElement = null;

function assertNodeList(nodeList, selector) {
  if (!nodeList || !nodeList.length) {
    throw new Error("react-modal: No elements were found for selector " + selector + ".");
  }
}

function setElement(element) {
  var useElement = element;
  if (typeof useElement === "string" && _safeHTMLElement.canUseDOM) {
    var el = document.querySelectorAll(useElement);
    assertNodeList(el, useElement);
    useElement = "length" in el ? el[0] : el;
  }
  globalElement = useElement || globalElement;
  return globalElement;
}

function validateElement(appElement) {
  if (!appElement && !globalElement) {
    (0, _warning2.default)(false, ["react-modal: App element is not defined.", "Please use `Modal.setAppElement(el)` or set `appElement={el}`.", "This is needed so screen readers don't see main content", "when modal is opened. It is not recommended, but you can opt-out", "by setting `ariaHideApp={false}`."].join(" "));

    return false;
  }

  return true;
}

function hide(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).setAttribute("aria-hidden", "true");
  }
}

function show(appElement) {
  if (validateElement(appElement)) {
    (appElement || globalElement).removeAttribute("aria-hidden");
  }
}

function documentNotReadyOrSSRTesting() {
  globalElement = null;
}

function resetForTesting() {
  globalElement = null;
}

/***/ }),

/***/ "Qh6E":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var React = __webpack_require__("eW0v");

var PropTypes = __webpack_require__("5D9O"); // qr.js doesn't handle error level of zero (M) so we need to do it right,
// thus the deep require.


var QRCodeImpl = __webpack_require__("duHF");

var ErrorCorrectLevel = __webpack_require__("TY86");

function getBackingStorePixelRatio(ctx) {
  return (// $FlowFixMe
    ctx.webkitBackingStorePixelRatio || // $FlowFixMe
    ctx.mozBackingStorePixelRatio || // $FlowFixMe
    ctx.msBackingStorePixelRatio || // $FlowFixMe
    ctx.oBackingStorePixelRatio || // $FlowFixMe
    ctx.backingStorePixelRatio || 1
  );
} // Convert from UTF-16, forcing the use of byte-mode encoding in our QR Code.
// This allows us to encode Hanji, Kanji, emoji, etc. Ideally we'd do more
// detection and not resort to byte-mode if possible, but we're trading off
// a smaller library for a smaller amount of data we can potentially encode.
// Based on http://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/


function convertStr(str) {
  var out = '';

  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);

    if (charcode < 0x0080) {
      out += String.fromCharCode(charcode);
    } else if (charcode < 0x0800) {
      out += String.fromCharCode(0xc0 | charcode >> 6);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      out += String.fromCharCode(0xe0 | charcode >> 12);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else {
      // This is a surrogate pair, so we'll reconsitute the pieces and work
      // from that
      i++;
      charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
      out += String.fromCharCode(0xf0 | charcode >> 18);
      out += String.fromCharCode(0x80 | charcode >> 12 & 0x3f);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    }
  }

  return out;
}

var DEFAULT_PROPS = {
  size: 128,
  level: 'L',
  bgColor: '#FFFFFF',
  fgColor: '#000000'
};
var PROP_TYPES = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  bgColor: PropTypes.string,
  fgColor: PropTypes.string
};

var QRCodeCanvas =
/*#__PURE__*/
function (_React$Component) {
  _inherits(QRCodeCanvas, _React$Component);

  function QRCodeCanvas() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, QRCodeCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = QRCodeCanvas.__proto__ || Object.getPrototypeOf(QRCodeCanvas)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "_canvas", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: void 0
    }), _temp));
  }

  _createClass(QRCodeCanvas, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this2 = this;

      return Object.keys(QRCodeCanvas.propTypes).some(function (k) {
        return _this2.props[k] !== nextProps[k];
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var _props = this.props,
          value = _props.value,
          size = _props.size,
          level = _props.level,
          bgColor = _props.bgColor,
          fgColor = _props.fgColor; // We'll use type===-1 to force QRCode to automatically pick the best type

      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();

      if (this._canvas != null) {
        var canvas = this._canvas;
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        var cells = qrcode.modules;

        if (cells === null) {
          return;
        }

        var tileW = size / cells.length;
        var tileH = size / cells.length;
        var scale = (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
        canvas.height = canvas.width = size * scale;
        ctx.scale(scale, scale);
        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            ctx && (ctx.fillStyle = cell ? fgColor : bgColor);
            var w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
            var h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
            ctx && ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          value = _props2.value,
          size = _props2.size,
          level = _props2.level,
          bgColor = _props2.bgColor,
          fgColor = _props2.fgColor,
          style = _props2.style,
          otherProps = _objectWithoutProperties(_props2, ["value", "size", "level", "bgColor", "fgColor", "style"]);

      var canvasStyle = _extends({
        height: size,
        width: size
      }, style);

      return React.createElement("canvas", _extends({
        style: canvasStyle,
        height: size,
        width: size,
        ref: function ref(_ref2) {
          return _this3._canvas = _ref2;
        }
      }, otherProps));
    }
  }]);

  return QRCodeCanvas;
}(React.Component);

Object.defineProperty(QRCodeCanvas, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: DEFAULT_PROPS
});
Object.defineProperty(QRCodeCanvas, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: PROP_TYPES
});

var QRCodeSVG =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(QRCodeSVG, _React$Component2);

  function QRCodeSVG() {
    _classCallCheck(this, QRCodeSVG);

    return _possibleConstructorReturn(this, (QRCodeSVG.__proto__ || Object.getPrototypeOf(QRCodeSVG)).apply(this, arguments));
  }

  _createClass(QRCodeSVG, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var _this4 = this;

      return Object.keys(QRCodeCanvas.propTypes).some(function (k) {
        return _this4.props[k] !== nextProps[k];
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          value = _props3.value,
          size = _props3.size,
          level = _props3.level,
          bgColor = _props3.bgColor,
          fgColor = _props3.fgColor,
          otherProps = _objectWithoutProperties(_props3, ["value", "size", "level", "bgColor", "fgColor"]); // We'll use type===-1 to force QRCode to automatically pick the best type


      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();
      var cells = qrcode.modules;

      if (cells === null) {
        return;
      } // Drawing strategy: instead of a rect per module, we're going to create a
      // single path for the dark modules and layer that on top of a light rect,
      // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
      // way faster than DOM ops.
      // For level 1, 441 nodes -> 2
      // For level 40, 31329 -> 2


      var ops = [];
      cells.forEach(function (row, y) {
        var lastIsDark = false;
        var start = null;
        row.forEach(function (cell, x) {
          if (!cell && start !== null) {
            // M0 0h7v1H0z injects the space with the move and dropd the comma,
            // saving a char per operation
            ops.push("M".concat(start, " ").concat(y, "h").concat(x - start, "v1H").concat(start, "z"));
            start = null;
            return;
          } // end of row, clean up or skip


          if (x === row.length - 1) {
            if (!cell) {
              // We would have closed the op above already so this can only mean
              // 2+ light modules in a row.
              return;
            }

            if (start === null) {
              // Just a single dark module.
              ops.push("M".concat(x, ",").concat(y, " h1v1H").concat(x, "z"));
            } else {
              // Otherwise finish the current line.
              ops.push("M".concat(start, ",").concat(y, " h").concat(x + 1 - start, "v1H").concat(start, "z"));
            }

            return;
          }

          if (cell && start === null) {
            start = x;
          }
        });
      });
      return React.createElement("svg", _extends({
        shapeRendering: "crispEdges",
        height: size,
        width: size,
        viewBox: "0 0 ".concat(cells.length, " ").concat(cells.length)
      }, otherProps), React.createElement("path", {
        fill: bgColor,
        d: "M0,0 h".concat(cells.length, "v").concat(cells.length, "H0z")
      }), React.createElement("path", {
        fill: fgColor,
        d: ops.join('')
      }));
    }
  }]);

  return QRCodeSVG;
}(React.Component);

Object.defineProperty(QRCodeSVG, "defaultProps", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: DEFAULT_PROPS
});
Object.defineProperty(QRCodeSVG, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: PROP_TYPES
});

var QRCode = function QRCode(props) {
  var renderAs = props.renderAs,
      otherProps = _objectWithoutProperties(props, ["renderAs"]);

  var Component = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;
  return React.createElement(Component, otherProps);
};

QRCode.defaultProps = _extends({
  renderAs: 'canvas'
}, DEFAULT_PROPS);
module.exports = QRCode;

/***/ }),

/***/ "RKsu":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2015 Jed Watson.
  Based on code that is Copyright 2013-2015, Facebook, Inc.
  All rights reserved.
*/
/* global define */

(function () {
	'use strict';

	var canUseDOM = !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	var ExecutionEnvironment = {

		canUseDOM: canUseDOM,

		canUseWorkers: typeof Worker !== 'undefined',

		canUseEventListeners:
			canUseDOM && !!(window.addEventListener || window.attachEvent),

		canUseViewport: canUseDOM && !!window.screen

	};

	if (true) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return ExecutionEnvironment;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = ExecutionEnvironment;
	} else {
		window.ExecutionEnvironment = ExecutionEnvironment;
	}

}());


/***/ }),

/***/ "TY86":
/***/ (function(module, exports) {

module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};



/***/ }),

/***/ "UHtZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToClipboard = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _copyToClipboard = __webpack_require__("xbqV");

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopyToClipboard = exports.CopyToClipboard = function (_React$PureComponent) {
  _inherits(CopyToClipboard, _React$PureComponent);

  function CopyToClipboard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CopyToClipboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CopyToClipboard.__proto__ || Object.getPrototypeOf(CopyToClipboard)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          text = _this$props.text,
          onCopy = _this$props.onCopy,
          children = _this$props.children,
          options = _this$props.options;


      var elem = _react2.default.Children.only(children);

      var result = (0, _copyToClipboard2.default)(text, options);

      if (onCopy) {
        onCopy(text, result);
      }

      // Bypass onClick if it was present
      if (elem && elem.props && typeof elem.props.onClick === 'function') {
        elem.props.onClick(event);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CopyToClipboard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _text = _props.text,
          _onCopy = _props.onCopy,
          _options = _props.options,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['text', 'onCopy', 'options', 'children']);

      var elem = _react2.default.Children.only(children);

      return _react2.default.cloneElement(elem, _extends({}, props, { onClick: this.onClick }));
    }
  }]);

  return CopyToClipboard;
}(_react2.default.PureComponent);

CopyToClipboard.defaultProps = {
  onCopy: undefined,
  options: undefined
};

/***/ }),

/***/ "V25C":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "6296c68657290901fe0630aa0b8c77fe.png";

/***/ }),

/***/ "V6hp":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"twoFactor":"twoFactor__1TleE","item":"item__1S0BA","lastItem":"lastItem__WkrxD","description":"description__1A1bs","action":"action__1A2ig"};

/***/ }),

/***/ "aGCF":
/***/ (function(module, exports) {

module.exports = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};


/***/ }),

/***/ "aSAb":
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__("aGCF");

function QR8bitByte(data) {
	this.mode = mode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;



/***/ }),

/***/ "c8T2":
/***/ (function(module, exports, __webpack_require__) {

// ErrorCorrectLevel
var ECL = __webpack_require__("TY86");

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock == undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = new Array();
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case ECL.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case ECL.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case ECL.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case ECL.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
}

module.exports = QRRSBlock;


/***/ }),

/***/ "duHF":
/***/ (function(module, exports, __webpack_require__) {

var BitByte = __webpack_require__("aSAb");
var RSBlock = __webpack_require__("c8T2");
var BitBuffer = __webpack_require__("/xcA");
var util = __webpack_require__("vMgm");
var Polynomial = __webpack_require__("hKhR");

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

// for client side minification
var proto = QRCode.prototype;

proto.addData = function(data) {
	var newData = new BitByte(data);
	this.dataList.push(newData);
	this.dataCache = null;
};

proto.isDark = function(row, col) {
	if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
		throw new Error(row + "," + col);
	}
	return this.modules[row][col];
};

proto.getModuleCount = function() {
	return this.moduleCount;
};

proto.make = function() {
	// Calculate automatically typeNumber if provided is < 1
	if (this.typeNumber < 1 ){
		var typeNumber = 1;
		for (typeNumber = 1; typeNumber < 40; typeNumber++) {
			var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

			var buffer = new BitBuffer();
			var totalDataCount = 0;
			for (var i = 0; i < rsBlocks.length; i++) {
				totalDataCount += rsBlocks[i].dataCount;
			}

			for (var i = 0; i < this.dataList.length; i++) {
				var data = this.dataList[i];
				buffer.put(data.mode, 4);
				buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
				data.write(buffer);
			}
			if (buffer.getLengthInBits() <= totalDataCount * 8)
				break;
		}
		this.typeNumber = typeNumber;
	}
	this.makeImpl(false, this.getBestMaskPattern() );
};

proto.makeImpl = function(test, maskPattern) {
	
	this.moduleCount = this.typeNumber * 4 + 17;
	this.modules = new Array(this.moduleCount);
	
	for (var row = 0; row < this.moduleCount; row++) {
		
		this.modules[row] = new Array(this.moduleCount);
		
		for (var col = 0; col < this.moduleCount; col++) {
			this.modules[row][col] = null;//(col + row) % 3;
		}
	}

	this.setupPositionProbePattern(0, 0);
	this.setupPositionProbePattern(this.moduleCount - 7, 0);
	this.setupPositionProbePattern(0, this.moduleCount - 7);
	this.setupPositionAdjustPattern();
	this.setupTimingPattern();
	this.setupTypeInfo(test, maskPattern);
	
	if (this.typeNumber >= 7) {
		this.setupTypeNumber(test);
	}

	if (this.dataCache == null) {
		this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
	}

	this.mapData(this.dataCache, maskPattern);
};

proto.setupPositionProbePattern = function(row, col)  {
	
	for (var r = -1; r <= 7; r++) {
		
		if (row + r <= -1 || this.moduleCount <= row + r) continue;
		
		for (var c = -1; c <= 7; c++) {
			
			if (col + c <= -1 || this.moduleCount <= col + c) continue;
			
			if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
					|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
					|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
				this.modules[row + r][col + c] = true;
			} else {
				this.modules[row + r][col + c] = false;
			}
		}		
	}		
};

proto.getBestMaskPattern = function() {

	var minLostPoint = 0;
	var pattern = 0;

	for (var i = 0; i < 8; i++) {
		
		this.makeImpl(true, i);

		var lostPoint = util.getLostPoint(this);

		if (i == 0 || minLostPoint >  lostPoint) {
			minLostPoint = lostPoint;
			pattern = i;
		}
	}

	return pattern;
};

proto.createMovieClip = function(target_mc, instance_name, depth) {

	var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
	var cs = 1;

	this.make();

	for (var row = 0; row < this.modules.length; row++) {
		
		var y = row * cs;
		
		for (var col = 0; col < this.modules[row].length; col++) {

			var x = col * cs;
			var dark = this.modules[row][col];
		
			if (dark) {
				qr_mc.beginFill(0, 100);
				qr_mc.moveTo(x, y);
				qr_mc.lineTo(x + cs, y);
				qr_mc.lineTo(x + cs, y + cs);
				qr_mc.lineTo(x, y + cs);
				qr_mc.endFill();
			}
		}
	}
	
	return qr_mc;
};

proto.setupTimingPattern = function() {
	
	for (var r = 8; r < this.moduleCount - 8; r++) {
		if (this.modules[r][6] != null) {
			continue;
		}
		this.modules[r][6] = (r % 2 == 0);
	}

	for (var c = 8; c < this.moduleCount - 8; c++) {
		if (this.modules[6][c] != null) {
			continue;
		}
		this.modules[6][c] = (c % 2 == 0);
	}
};

proto.setupPositionAdjustPattern = function() {

	var pos = util.getPatternPosition(this.typeNumber);
	
	for (var i = 0; i < pos.length; i++) {
	
		for (var j = 0; j < pos.length; j++) {
		
			var row = pos[i];
			var col = pos[j];
			
			if (this.modules[row][col] != null) {
				continue;
			}
			
			for (var r = -2; r <= 2; r++) {
			
				for (var c = -2; c <= 2; c++) {
				
					if (r == -2 || r == 2 || c == -2 || c == 2
							|| (r == 0 && c == 0) ) {
						this.modules[row + r][col + c] = true;
					} else {
						this.modules[row + r][col + c] = false;
					}
				}
			}
		}
	}
};

proto.setupTypeNumber = function(test) {

	var bits = util.getBCHTypeNumber(this.typeNumber);

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
	}

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
	}
};

proto.setupTypeInfo = function(test, maskPattern) {

	var data = (this.errorCorrectLevel << 3) | maskPattern;
	var bits = util.getBCHTypeInfo(data);

	// vertical		
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);

		if (i < 6) {
			this.modules[i][8] = mod;
		} else if (i < 8) {
			this.modules[i + 1][8] = mod;
		} else {
			this.modules[this.moduleCount - 15 + i][8] = mod;
		}
	}

	// horizontal
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);
		
		if (i < 8) {
			this.modules[8][this.moduleCount - i - 1] = mod;
		} else if (i < 9) {
			this.modules[8][15 - i - 1 + 1] = mod;
		} else {
			this.modules[8][15 - i - 1] = mod;
		}
	}

	// fixed module
	this.modules[this.moduleCount - 8][8] = (!test);
};

proto.mapData = function(data, maskPattern) {
	
	var inc = -1;
	var row = this.moduleCount - 1;
	var bitIndex = 7;
	var byteIndex = 0;
	
	for (var col = this.moduleCount - 1; col > 0; col -= 2) {

		if (col == 6) col--;

		while (true) {

			for (var c = 0; c < 2; c++) {
				
				if (this.modules[row][col - c] == null) {
					
					var dark = false;

					if (byteIndex < data.length) {
						dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
					}

					var mask = util.getMask(maskPattern, row, col - c);

					if (mask) {
						dark = !dark;
					}
					
					this.modules[row][col - c] = dark;
					bitIndex--;

					if (bitIndex == -1) {
						byteIndex++;
						bitIndex = 7;
					}
				}
			}
							
			row += inc;

			if (row < 0 || this.moduleCount <= row) {
				row -= inc;
				inc = -inc;
				break;
			}
		}
	}
};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new BitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalDataCount += rsBlocks[i].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. ("
			+ buffer.getLengthInBits()
			+ ">"
			+  totalDataCount * 8
			+ ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 != 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = util.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalCodeCount += rsBlocks[i].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var i = 0; i < maxDcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < dcdata[r].length) {
				data[index++] = dcdata[r][i];
			}
		}
	}

	for (var i = 0; i < maxEcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < ecdata[r].length) {
				data[index++] = ecdata[r][i];
			}
		}
	}

	return data;
};

module.exports = QRCode;



/***/ }),

/***/ "eW0v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createPortal", function() { return createPortal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_batchedUpdates", function() { return unstable_batchedUpdates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__("5D9O");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact__);




var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

var COMPONENT_WRAPPER_KEY = (typeof Symbol!=='undefined' && Symbol.for) ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};


var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;


var BYPASS_HOOK = {};

/*global process*/
var DEV = false;
try {
	DEV = "production"!=='production';
}
catch (e) {}

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() { return null; }



// make react think we're react.
var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function() { return this.nodeName; },
	set: function(v) { this.nodeName = v; },
	configurable:true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function() { return this.attributes; },
	set: function(v) { this.attributes = v; },
	configurable:true
});



var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].event = function (e) {
	if (oldEventHook) { e = oldEventHook(e); }
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};


var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["options"].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
			attrs = vnode.attributes = vnode.attributes==null ? {} : extend({}, vnode.attributes);

		if (typeof tag==='function') {
			if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
				if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		}
		else {
			if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
			if (vnode.children) { attrs.children = vnode.children; }

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value!==0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) { oldVnodeHook(vnode); }
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
		a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
	if (a) { extend(vnode.attributes, a); }
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
				}
			}
		}
	}
}



// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode!==parent) { prev = null; }

	// default to first Element child
	if (!prev && parent) { prev = parent.firstElementChild; }

	// remove unaffected siblings
	for (var i=parent.childNodes.length; i--; ) {
		if (parent.childNodes[i]!==prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(vnode, parent, prev);
	if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
	if (typeof callback==='function') { callback(); }
	return out && out._component || out;
}


var ContextProvider = function () {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) { callback.call(component, renderContainer); }
	return component;
}

function Portal(props) {
	renderSubtreeIntoContainer(this, props.vnode, props.container);
}

function createPortal(vnode, container) {
	return Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(Portal, { vnode: vnode, container: container });
}


function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode===container) {
		Object(__WEBPACK_IMPORTED_MODULE_1_preact__["render"])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}



var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		return children.map(fn);
	},
	forEach: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		children.forEach(fn);
	},
	count: function(children) {
		return children && children.length || 0;
	},
	only: function(children) {
		children = Children.toArray(children);
		if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
		return children[0];
	},
	toArray: function(children) {
		if (children == null) { return []; }
		return ARR.concat(children);
	}
};


/** Track current render() component for ref assignment */
var currentComponent;


function createFactory(type) {
	return createElement.bind(null, type);
}


var DOM = {};
for (var i=ELEMENTS.length; i--; ) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i=offset || 0; i<arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		}
		else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c==='function' && !(c.prototype && c.prototype.render);
}


// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function() {
			return WrappedComponent(this.props, this.context);
		}
	});
}


function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

	return Wrapped;
}


function createElement() {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["h"].apply(void 0, args));
}


function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
		type = ref && typeof ref;
	if (currentComponent && (type==='string' || type==='number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}


function cloneElement$1(element, props) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (!isValidElement(element)) { return element; }
	var elementProps = element.attributes || element.props;
	var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["h"])(
		element.nodeName || element.type,
		extend({}, elementProps),
		element.children || elementProps && elementProps.children
	);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	}
	else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["cloneElement"].apply(void 0, cloneArgs));
}


function isValidElement(element) {
	return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
}


function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved===null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}


function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName!=='string') { return; }
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}


function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) { a.class = a.className; }
	Object.defineProperty(a, 'className', classNameDescriptor);
}


var classNameDescriptor = {
	configurable: true,
	get: function() { return this.class; },
	set: function(v) { this.class = v; }
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i=1, obj = (void 0); i<arguments.length; i++) {
		if ((obj = arguments$1[i])) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}


function shallowDiffers(a, b) {
	for (var i in a) { if (!(i in b)) { return true; } }
	for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
	return false;
}


function findDOMNode(component) {
	return component && (component.base || component.nodeType === 1 && component) || null;
}


function F(){}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps.call(cl);
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}


// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i=0; i<mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
				(keyed[key] || (keyed[key]=[])).push(mixin[key]);
			}
		}
	}
	return keyed;
}


// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
		proto[key] = multihook(
			mixins[key].concat(proto[key] || ARR),
			key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
		);
	} }
}


function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}


function callMethod(ctx, m, args) {
	if (typeof m==='string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m==='function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function() {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i=0; i<hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r!=null) {
				if (!ret) { ret = {}; }
				for (var key in r) { if (r.hasOwnProperty(key)) {
					ret[key] = r[key];
				} }
			}
			else if (typeof r!=='undefined') { ret = r; }
		}
		return ret;
	};
}


function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}


function propsHook(props, context) {
	if (!props) { return; }

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length===1 && (typeof c[0]==='string' || typeof c[0]==='function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children==='object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this==='function' ? this : this.constructor,
			propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}


function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent===this) {
		currentComponent = null;
	}
}



function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["Component"].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts!==BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["Component"](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function() {
		return this.base;
	},

	isMounted: function() {
		return !!this.base;
	}
});



function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function(props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

function unstable_batchedUpdates(callback) {
	callback();
}

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createPortal: createPortal,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	unstable_batchedUpdates: unstable_batchedUpdates,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);

//# sourceMappingURL=preact-compat.es.js.map


/***/ }),

/***/ "fwuz":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"list":"list__eX7nr","item":"item__2DepJ","code":"code__21h6Q","actions":"actions__3LynF","description":"description__OQzwO","result":"result__3Wfvv"};

/***/ }),

/***/ "g+vV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findTabbableDescendants;
/*!
 * Adapted from jQuery UI core
 *
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

var tabbableNode = /input|select|textarea|button|object/;

function hidesContents(element) {
  var zeroSize = element.offsetWidth <= 0 && element.offsetHeight <= 0;

  // If the node is empty, this is good enough
  if (zeroSize && !element.innerHTML) return true;

  // Otherwise we need to check some styles
  var style = window.getComputedStyle(element);
  return zeroSize ? style.getPropertyValue("overflow") !== "visible" : style.getPropertyValue("display") == "none";
}

function visible(element) {
  var parentElement = element;
  while (parentElement) {
    if (parentElement === document.body) break;
    if (hidesContents(parentElement)) return false;
    parentElement = parentElement.parentNode;
  }
  return true;
}

function focusable(element, isTabIndexNotNaN) {
  var nodeName = element.nodeName.toLowerCase();
  var res = tabbableNode.test(nodeName) && !element.disabled || (nodeName === "a" ? element.href || isTabIndexNotNaN : isTabIndexNotNaN);
  return res && visible(element);
}

function tabbable(element) {
  var tabIndex = element.getAttribute("tabindex");
  if (tabIndex === null) tabIndex = undefined;
  var isTabIndexNaN = isNaN(tabIndex);
  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
}

function findTabbableDescendants(element) {
  return [].slice.call(element.querySelectorAll("*"), 0).filter(tabbable);
}
module.exports = exports["default"];

/***/ }),

/***/ "hKhR":
/***/ (function(module, exports, __webpack_require__) {

var math = __webpack_require__("MtRz");

function QRPolynomial(num, shift) {

	if (num.length == undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] == 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= math.gexp(math.glog(this.get(i) ) + math.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = math.glog(this.get(0) ) - math.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++) {
			num[i] ^= math.gexp(math.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;


/***/ }),

/***/ "i8EF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/unistore/full/preact.js
var preact = __webpack_require__("jrcW");
var preact_default = /*#__PURE__*/__webpack_require__.n(preact);

// EXTERNAL MODULE: ../node_modules/u2f-api/dist/index.js
var dist = __webpack_require__("GBfU");
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./actions/settings/index.js + 3 modules
var settings = __webpack_require__("hNSm");

// EXTERNAL MODULE: ../node_modules/react-modal/lib/index.js
var lib = __webpack_require__("jAUu");
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// EXTERNAL MODULE: ./components/ui/Modal/index.css
var ui_Modal = __webpack_require__("r+zW");
var Modal_default = /*#__PURE__*/__webpack_require__.n(ui_Modal);

// CONCATENATED MODULE: ./components/ui/Modal/Content.js



/* harmony default export */ var Content = (function (props) {
    return Object(preact_min["h"])(
        'div',
        { className: [Modal_default.a.content, props.className].join(' ') },
        props.children
    );
});
// CONCATENATED MODULE: ./components/ui/Modal/Footer.js



/* harmony default export */ var Footer = (function (_ref) {
    var children = _ref.children;
    return Object(preact_min["h"])(
        'footer',
        { className: Modal_default.a.footer },
        children
    );
});
// CONCATENATED MODULE: ./components/ui/Modal/Wrapper.js



/* harmony default export */ var Wrapper = (function (_ref) {
    var children = _ref.children,
        onSubmit = _ref.onSubmit,
        onReset = _ref.onReset;
    return Object(preact_min["h"])(
        'form',
        { className: Modal_default.a.wrapper, onSubmit: onSubmit, onReset: onReset },
        children
    );
});
// CONCATENATED MODULE: ./components/ui/Modal/index.js





/**
 * Creates a new modal, using a predefined style.
 * @param {boolean} isOpen - Whether the modal is open or not.
 * @param {string} title - Title of the modal.
 * @param {Component} children
 * @param {Function} onRequestClose - called after the modal is closed.
 * @param {Function} onBeforeClose - called after the modal is closed.
 * @param {Function} onAfterOpen - called after the modal is opened.
 * @param {String} [contentLabel=null]- the content label. If not given, title is used.
 * @return {ReactModal} the modal components.
 * @function
 */
var Modal_Modal = function Modal(_ref) {
    var isOpen = _ref.isOpen,
        title = _ref.title,
        children = _ref.children,
        onRequestClose = _ref.onRequestClose,
        onAfterOpen = _ref.onAfterOpen,
        _ref$contentLabel = _ref.contentLabel,
        contentLabel = _ref$contentLabel === undefined ? null : _ref$contentLabel;

    lib_default.a.setAppElement('#app');
    return Object(preact_min["h"])(
        lib_default.a,
        {
            isOpen: isOpen,
            onAfterOpen: onAfterOpen,
            onRequestClose: onRequestClose,
            contentLabel: contentLabel || title,
            className: Modal_default.a.modal
        },
        Object(preact_min["h"])(
            'header',
            { className: Modal_default.a.header },
            Object(preact_min["h"])(
                'h3',
                null,
                title
            )
        ),
        children
    );
};

/* harmony default export */ var components_ui_Modal = (Modal_Modal);






// CONCATENATED MODULE: ./components/ui/SteppedModal/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * Modal in several steps.
 * @param props.isOpen - whether the step modal should be opened or not.
 * @param {Object[]} props.steps - the different steps to be proceeded.
 * @param {Component} props.steps[].components - the components of the current step.
 * @param {Function} props.onRequestClose - to be called when the callback is closed.
 * @param {?Function} props.onAfterOpen - to be called after the modal is opened.
 */

var SteppedModal_SteppedModal = function (_Component) {
    _inherits(SteppedModal, _Component);

    function SteppedModal() {
        var _temp, _this, _ret;

        _classCallCheck(this, SteppedModal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            step: -1,
            previousAction: 'enter',
            mustSucceed: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * called after the SteppedModal is opened.
     */
    SteppedModal.prototype.onAfterOpen = function onAfterOpen() {
        this.setState({ step: 0 });

        if (this.props.onAfterOpen) {
            this.props.onAfterOpen();
        }
    };

    /**
     * called after the SteppedModal is closed.
     * @param {Event} requestClosed - the event.
     * @param {Boolean} lastStepSuccess - whether the last step succeeded.
     */


    SteppedModal.prototype.onRequestClose = function onRequestClose() {
        var requestClosed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var lastStepSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!(this.state.mustSucceed || this.props.steps[this.state.step].mustSucceed) || lastStepSuccess) {
            this.setState({ step: -1 });

            if (this.props.beforeDismiss) {
                this.props.beforeDismiss(lastStepSuccess);
            }
            this.props.onRequestClose();
        }
    };

    SteppedModal.prototype.onSkipStep = function onSkipStep() {
        if (this.state.previousAction === 'next' || this.state.previousAction === 'enter') {
            return this.onNextStep();
        }
        return this.onPreviousStep();
    };

    /**
     * Triggers the next step. If the last step is reached, closes the modal.
     */


    SteppedModal.prototype.onNextStep = function onNextStep() {
        var state = this.state;

        if (this.state.step + 1 >= this.props.steps.length) {
            // if last step
            this.onRequestClose(null, true);
        } else {
            this.setState({
                step: state.step + 1,
                previousAction: 'next',
                mustSucceed: false,
                message: null
            });
        }
    };

    /**
     * Triggers the previous step. If the current step is the first step, the modal is closed.
     */


    SteppedModal.prototype.onPreviousStep = function onPreviousStep() {
        var state = this.state;
        if (this.state.step <= 0) {
            this.onRequestClose();
        } else {
            this.setState({
                step: state.step - 1,
                previousAction: 'previous',
                mustSucceed: false,
                message: null
            });
        }
    };

    SteppedModal.prototype.onReset = function onReset() {
        var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        if (this.props.beforeDismiss) {
            this.props.beforeDismiss(false, true);
        }
        this.setState({
            message: message,
            step: 0,
            previousAction: 'enter',
            mustSucceed: false
        });
    };

    /**
     * if triggered, it will no longer be possible to close the modal during the current step.
     */


    SteppedModal.prototype.forbidClosure = function forbidClosure() {
        this.setState({ mustSucceed: true });
    };

    /**
     * Computes the title of the current step.
     * @return {String} the current step.
     */


    SteppedModal.prototype.computeCurrentTitle = function computeCurrentTitle() {
        if (this.state.step >= this.props.steps.length || this.state.step === -1) {
            return 'Loading';
        }
        return this.props.steps[this.state.step].title;
    };

    /**
     * renders the current step.
     * @return {Component}
     */


    SteppedModal.prototype.renderCurrentStep = function renderCurrentStep() {
        var _this2 = this;

        if (this.state.step >= this.props.steps.length || this.state.step === -1) {
            return null;
        }
        return this.props.steps[this.state.step].component({
            onNextStep: function onNextStep() {
                return _this2.onNextStep();
            },
            onPreviousStep: function onPreviousStep() {
                return _this2.onPreviousStep();
            },
            onSkipStep: function onSkipStep() {
                return _this2.onSkipStep();
            },
            onReset: function onReset(message) {
                return _this2.onReset(message);
            },
            forbidClosure: function forbidClosure() {
                return _this2.forbidClosure();
            },
            message: this.state.message
        });
    };

    SteppedModal.prototype.render = function render() {
        var _this3 = this;

        if (!this.props.steps || !this.props.steps.length) return null;
        return Object(preact_min["h"])(
            components_ui_Modal,
            {
                isOpen: this.props.isOpen,
                onAfterOpen: function onAfterOpen() {
                    return _this3.onAfterOpen();
                },
                onRequestClose: function onRequestClose() {
                    var requestClosed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                    var lastStepSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                    return _this3.onRequestClose(requestClosed, lastStepSuccess);
                },
                title: this.computeCurrentTitle()
            },
            this.renderCurrentStep()
        );
    };

    return SteppedModal;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./actions/scope.js
var actions_scope = __webpack_require__("bd1h");

// EXTERNAL MODULE: ./components/ui/TextButton/index.js
var TextButton = __webpack_require__("nkmZ");

// EXTERNAL MODULE: ./helpers/u2f.js
var u2f = __webpack_require__("Bypu");

// EXTERNAL MODULE: ./components/auth/ScopeModal/index.css
var ScopeModal = __webpack_require__("/SCx");
var ScopeModal_default = /*#__PURE__*/__webpack_require__.n(ScopeModal);

// CONCATENATED MODULE: ./components/auth/ScopeModal/ScopeFormModal.js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function ScopeFormModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ScopeFormModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ScopeFormModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











/**
 * Modal Form to asks credentials information (password and 2FA).
 */

var ScopeFormModal__ref2 = Object(preact_min["h"])(
    'span',
    null,
    'Your security key was used. '
);

var ScopeFormModal__ref3 = Object(preact_min["h"])(
    'span',
    null,
    'Please activate your security key... '
);

var ScopeFormModal__ref4 = Object(preact_min["h"])(
    'span',
    null,
    ' or '
);

var _ref5 = Object(preact_min["h"])(
    'span',
    null,
    '.'
);

var _ref6 = Object(preact_min["h"])(
    'button',
    { type: 'reset', value: 'Reset' },
    'Back'
);

var ScopeFormModal_ScopeFormModal = function (_Component) {
    ScopeFormModal__inherits(ScopeFormModal, _Component);

    ScopeFormModal.prototype.componentWillMount = function componentWillMount() {
        if (this.props.scope.used) {
            this.props.skip();
        }
    };

    ScopeFormModal.prototype.componentDidMount = function componentDidMount() {
        this.props.unscopeInitAction();
        this.setState({ data: _extends({}, this.props.scope.creds) });
    };

    function ScopeFormModal(props) {
        ScopeFormModal__classCallCheck(this, ScopeFormModal);

        var _this = ScopeFormModal__possibleConstructorReturn(this, _Component.call(this, props));

        _this.state = {
            data: _extends({}, props.scope.creds)
        };
        return _this;
    }

    /**
     * Stores the data is the correct field.
     * @param {Event} e - the event to handle
     * @param {string} e.target.name - the name of the event to handle.
     * @param {string} e.target.value - the value to handle.
     */


    ScopeFormModal.prototype.onFieldUpdated = function onFieldUpdated(_ref) {
        var _extends2;

        var _ref$target = _ref.target,
            name = _ref$target.name,
            value = _ref$target.value;

        this.setState({ data: _extends({}, this.state.data, (_extends2 = {}, _extends2[name] = value, _extends2)) });
    };

    /**
     * Renders the 2FA fields, if needed.
     * @returns {Component}
     */


    ScopeFormModal.prototype.renderTwoFactor = function renderTwoFactor() {
        var _this2 = this;

        var info = this.props.scope.response;
        if (!info) {
            return Object(preact_min["h"])(
                'div',
                { className: ScopeModal_default.a.scopeFormModal },
                'Requesting authorization...'
            );
        }
        if (!info.TwoFactor) {
            // returning empty div, to keep the place
            return Object(preact_min["h"])('div', { className: ScopeModal_default.a.scopeFormModal });
        }

        var _props$scope = this.props.scope,
            _props$scope$creds = _props$scope.creds;
        _props$scope$creds = _props$scope$creds === undefined ? {} : _props$scope$creds;
        var U2F = _props$scope$creds.U2F,
            _props$scope$U2FReque = _props$scope.U2FRequest;
        _props$scope$U2FReque = _props$scope$U2FReque === undefined ? {} : _props$scope$U2FReque;
        var status = _props$scope$U2FReque.status,
            error = _props$scope$U2FReque.error;


        if (U2F) {
            return Object(preact_min["h"])(
                'div',
                { className: ScopeModal_default.a.scopeFormModal },
                ScopeFormModal__ref2,
                Object(preact_min["h"])(
                    TextButton["a" /* default */],
                    { onClick: this.props.unscopeResetTwoFactorAction },
                    'Undo'
                )
            );
        }

        if (status === 'pending') {
            return Object(preact_min["h"])(
                'div',
                { className: ScopeModal_default.a.scopeFormModal },
                Object(preact_min["h"])(
                    'p',
                    null,
                    ScopeFormModal__ref3,
                    Object(preact_min["h"])(
                        TextButton["a" /* default */],
                        { onClick: this.props.unscopeResetTwoFactorAction },
                        'Cancel'
                    )
                )
            );
        }

        if (status === 'failure') {
            var errorMessage = error.metaData && error.metaData.code ? Object(u2f["b" /* getErrorMessage */])(error.metaData.code) : error.message + '.';
            return Object(preact_min["h"])(
                'div',
                { className: ScopeModal_default.a.scopeFormModal },
                Object(preact_min["h"])(
                    'p',
                    null,
                    Object(preact_min["h"])(
                        'span',
                        null,
                        errorMessage,
                        ' You can '
                    ),
                    Object(preact_min["h"])(
                        TextButton["a" /* default */],
                        { onClick: this.props.unscopeU2FAction },
                        'Try again'
                    ),
                    ScopeFormModal__ref4,
                    Object(preact_min["h"])(
                        TextButton["a" /* default */],
                        { onClick: this.props.unscopeResetTwoFactorAction },
                        'Use a code'
                    ),
                    _ref5
                )
            );
        }

        var components = [Object(preact_min["h"])(
            'div',
            { className: [ScopeModal_default.a.scopeFormModal, 'form-row'].join(' ') },
            Object(preact_min["h"])(
                'label',
                { htmlFor: 'twoFactorCode', className: ScopeModal_default.a.label },
                '2FA code'
            ),
            Object(preact_min["h"])(
                'div',
                null,
                Object(preact_min["h"])('input', {
                    className: ScopeModal_default.a.input,
                    type: 'text',
                    name: 'twoFactorCode',
                    id: 'twoFactorCode',
                    autoCapitalize: 'off',
                    autoCorrect: 'off',
                    autoComplete: 'off',
                    minLength: '6',
                    maxLength: '8',
                    required: true,
                    value: this.state.data.twoFactorCode,
                    onInput: function onInput(e) {
                        return _this2.onFieldUpdated(e);
                    } })
            )
        )];
        if (info['2FA'].U2F) {
            components.push(Object(preact_min["h"])(
                'div',
                { className: ScopeModal_default.a.scopeFormModal },
                Object(preact_min["h"])(
                    'p',
                    null,
                    Object(preact_min["h"])(
                        TextButton["a" /* default */],
                        { onClick: function onClick() {
                                return _this2.props.unscopeU2FAction();
                            } },
                        'Or use your security key'
                    )
                )
            ));
        }
        return components;
    };

    ScopeFormModal.prototype.render = function render() {
        var _this3 = this;

        var scope = this.props.scope;
        return Object(preact_min["h"])(
            Wrapper,
            {
                onSubmit: function onSubmit(e) {
                    e.preventDefault();
                    _this3.props.unscopePasswordAction(_this3.state.data);
                    _this3.props.onSubmit();
                },
                onReset: function onReset(e) {
                    e.preventDefault();
                    _this3.props.onCancel();
                }
            },
            Object(preact_min["h"])(
                Content,
                null,
                !!this.props.message && Object(preact_min["h"])(
                    'div',
                    null,
                    this.props.message
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: [ScopeModal_default.a.scopeFormModal, 'form-row'].join(' ') },
                    Object(preact_min["h"])(
                        'label',
                        { htmlFor: 'password', className: ScopeModal_default.a.label },
                        'password'
                    ),
                    Object(preact_min["h"])(
                        'div',
                        null,
                        Object(preact_min["h"])('input', {
                            className: ScopeModal_default.a.input,
                            type: 'password',
                            name: 'password',
                            id: 'password',
                            value: this.state.data.password,
                            required: true,
                            placeholder: 'Password',
                            onInput: function onInput(e) {
                                return _this3.onFieldUpdated(e);
                            },
                            autoFocus: true
                        })
                    )
                ),
                this.renderTwoFactor()
            ),
            Object(preact_min["h"])(
                Footer,
                null,
                _ref6,
                Object(preact_min["h"])(
                    'button',
                    { type: 'submit', value: 'Submit', disabled: !scope.response },
                    'Next'
                )
            )
        );
    };

    return ScopeFormModal;
}(preact_min["Component"]);

/* harmony default export */ var ScopeModal_ScopeFormModal = (Object(preact["connect"])(['scope', 'auth'], actions_scope["a" /* default */])(ScopeFormModal_ScopeFormModal));
// EXTERNAL MODULE: ./helpers/store.js
var store = __webpack_require__("dM8i");

// CONCATENATED MODULE: ./components/auth/ScopeModal/index.js





var ScopeModal_steps = function steps(scope) {
    if (scope !== 'password') {
        return [];
    }
    return [{
        title: 'Confirm your identity',
        component: function component(_ref) {
            var onNextStep = _ref.onNextStep,
                onPreviousStep = _ref.onPreviousStep,
                onSkipStep = _ref.onSkipStep,
                message = _ref.message;
            return Object(preact_min["h"])(ScopeModal_ScopeFormModal, {
                onSubmit: onNextStep,
                onCancel: onPreviousStep,
                skip: onSkipStep,
                message: message });
        }
    }];
};

var ScopeModal_beforeDismiss = function beforeDismiss() {
    var _actions = Object(actions_scope["a" /* default */])(store["a" /* default */]),
        resetScopeStateAction = _actions.resetScopeStateAction;

    resetScopeStateAction(store["a" /* default */].getState());
};
// CONCATENATED MODULE: ./components/ui/ConfirmModal.js


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function ConfirmModal__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ConfirmModal__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function ConfirmModal__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var ConfirmModal_ConfirmModal = function (_Component) {
    ConfirmModal__inherits(ConfirmModal, _Component);

    function ConfirmModal() {
        ConfirmModal__classCallCheck(this, ConfirmModal);

        return ConfirmModal__possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    // for some reason, using stateless components produces a Build error...
    ConfirmModal.prototype.render = function render() {
        var _props = this.props,
            children = _props.children,
            title = _props.title,
            isOpen = _props.isOpen,
            onConfirm = _props.onConfirm,
            onAfterClose = _props.onAfterClose,
            _props$scope = _props.scope,
            scope = _props$scope === undefined ? noop : _props$scope,
            _props$onCancel = _props.onCancel,
            onCancel = _props$onCancel === undefined ? noop : _props$onCancel,
            _props$cancelText = _props.cancelText,
            cancelText = _props$cancelText === undefined ? 'Cancel' : _props$cancelText,
            _props$confirmText = _props.confirmText,
            confirmText = _props$confirmText === undefined ? 'Confirm' : _props$confirmText;

        var _ref2 = Object(preact_min["h"])(
            Content,
            null,
            children
        );

        var _ref3 = Object(preact_min["h"])(
            Footer,
            null,
            Object(preact_min["h"])(
                'button',
                { type: 'reset', value: 'Reset' },
                cancelText
            ),
            Object(preact_min["h"])(
                'button',
                { type: 'submit', value: 'Submit' },
                confirmText
            )
        );

        var steps = [{
            title: title,
            component: function component(_ref) {
                var onNextStep = _ref.onNextStep,
                    onPreviousStep = _ref.onPreviousStep;
                return Object(preact_min["h"])(
                    Wrapper,
                    {
                        onSubmit: function onSubmit(e) {
                            e.preventDefault();
                            onNextStep();
                        },
                        onReset: function onReset(e) {
                            e.preventDefault();
                            if (onCancel) {
                                onPreviousStep();
                            }
                            onAfterClose();
                        } },
                    _ref2,
                    _ref3
                );
            }
        }];

        if (scope) {
            steps.push.apply(steps, ScopeModal_steps(scope));
        }

        var beforeDismiss = function () {
            var _ref4 = _asyncToGenerator(function* (success) {
                if (success) {
                    yield onConfirm();
                }
                if (scope) {
                    ScopeModal_beforeDismiss();
                }
            });

            return function beforeDismiss(_x) {
                return _ref4.apply(this, arguments);
            };
        }();

        return Object(preact_min["h"])(SteppedModal_SteppedModal, {
            isOpen: isOpen,
            onRequestClose: onAfterClose,
            steps: steps,
            beforeDismiss: beforeDismiss });
    };

    return ConfirmModal;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./components/settings/security/TwoFactor/U2FKeyList/style.css
var style = __webpack_require__("AM9u");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/U2FKeyList/U2FKeyList.js


function U2FKeyList__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function U2FKeyList__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function U2FKeyList__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var U2FKeyList__ref = Object(preact_min["h"])(
    'div',
    { 'class': 'badge badge-danger' },
    'Compromised'
);

var U2FKeyList_U2FKeyList = function (_Component) {
    U2FKeyList__inherits(U2FKeyList, _Component);

    function U2FKeyList() {
        U2FKeyList__classCallCheck(this, U2FKeyList);

        return U2FKeyList__possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    /**
     * renders an U2F Key.
     * @param {Object} u2fKey - the U2F Key to render.
     * @param {Int} u2fKey.Compromised - whether the key is compromised or not.
     * @param {String} u2fKey.KeyHandle - The key handle of the current key.
     * @param {String} u2fKey.Label - The label of the current key.
     * @return {Component}
     */
    U2FKeyList.prototype.renderU2FKey = function renderU2FKey(u2fKey) {
        var _this2 = this;

        var headerClasses = [style_default.a.listElementHeader];
        if (u2fKey.Compromised) {
            headerClasses.push(style_default.a.listElementHeaderCompromised);
        }

        return Object(preact_min["h"])(
            'li',
            { key: u2fKey.KeyHandle, className: style_default.a.listElement },
            Object(preact_min["h"])(
                'div',
                { className: headerClasses.join(' ') },
                u2fKey.Label
            ),
            !!u2fKey.Compromised && U2FKeyList__ref,
            Object(preact_min["h"])(
                TextButton["a" /* default */],
                { onClick: function onClick() {
                        return _this2.setState({
                            confirmDeleteModal: u2fKey
                        });
                    } },
                'Delete'
            )
        );
    };

    U2FKeyList.prototype.render = function render() {
        var _this3 = this;

        var confirmDeleteModal = this.state.confirmDeleteModal;

        var closeModal = function closeModal() {
            _this3.setState({ confirmDeleteModal: '' });
        };
        return Object(preact_min["h"])(
            'ul',
            { className: style_default.a.list },
            Object(preact_min["h"])(
                ConfirmModal_ConfirmModal,
                {
                    title: 'Confirm Security Key Deletion',
                    scope: 'password',
                    isOpen: !!confirmDeleteModal,
                    onAfterClose: closeModal,
                    onConfirm: function onConfirm() {
                        return _this3.props.deleteU2FKeyAction(confirmDeleteModal);
                    },
                    onCancel: function onCancel() {}
                },
                Object(preact_min["h"])(
                    'div',
                    null,
                    'Are you sure you want to delete the key ',
                    Object(preact_min["h"])(
                        'span',
                        null,
                        confirmDeleteModal ? confirmDeleteModal.Label : ''
                    ),
                    '?'
                )
            ),
            this.props.U2FKeys.map(function (u2fKey) {
                return _this3.renderU2FKey(u2fKey);
            })
        );
    };

    return U2FKeyList;
}(preact_min["Component"]);

/* harmony default export */ var TwoFactor_U2FKeyList_U2FKeyList = (Object(preact["connect"])('settings', settings["a" /* default */])(U2FKeyList_U2FKeyList));
// EXTERNAL MODULE: ../node_modules/react-copy-to-clipboard/lib/index.js
var react_copy_to_clipboard_lib = __webpack_require__("y78Y");
var react_copy_to_clipboard_lib_default = /*#__PURE__*/__webpack_require__.n(react_copy_to_clipboard_lib);

// EXTERNAL MODULE: ../node_modules/file-saver/FileSaver.js
var FileSaver = __webpack_require__("qmkL");
var FileSaver_default = /*#__PURE__*/__webpack_require__.n(FileSaver);

// CONCATENATED MODULE: ./helpers/text.js


/**
 * Download the given lines as a file.
 * @param {string} name - the name of the file
 * @param {string[]} lines - the lines to put in the file
 * @param {string} [type='text/plain;charset=utf-8'] - the mime type of the file
 */
var text_downloadAsFile = function downloadAsFile(name) {
  var lines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'text/plain;charset=utf-8';

  var blob = new Blob([lines.join('\r\n')], { type: type });
  Object(FileSaver["saveAs"])(blob, name);
};
// EXTERNAL MODULE: ./components/settings/security/TwoFactor/SaveRecoveryCodeModal/index.css
var SaveRecoveryCodeModal = __webpack_require__("fwuz");
var SaveRecoveryCodeModal_default = /*#__PURE__*/__webpack_require__.n(SaveRecoveryCodeModal);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SaveRecoveryCodeModal/presentation.js


function presentation__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function presentation__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function presentation__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var presentation__ref = Object(preact_min["h"])(
    'p',
    null,
    'Please keep your recovery codes in a safe place. Otherwise, you can permanently lose access to your account if you loose your 2FA device'
);

var presentation__ref2 = Object(preact_min["h"])(
    'p',
    null,
    'Each recovery code can only be used once'
);

var presentation__ref3 = Object(preact_min["h"])(
    TextButton["a" /* default */],
    null,
    'COPY CODES '
);

var presentation__ref4 = Object(preact_min["h"])(
    'p',
    null,
    'Loading... '
);

var presentation__ref5 = Object(preact_min["h"])(
    Footer,
    null,
    Object(preact_min["h"])(
        'button',
        { type: 'reset', value: 'Reset', disabled: true },
        'Back'
    ),
    Object(preact_min["h"])(
        'button',
        { type: 'submit', value: 'Submit' },
        'Next'
    )
);

var presentation_Presentation = function (_Component) {
    presentation__inherits(Presentation, _Component);

    function Presentation() {
        presentation__classCallCheck(this, Presentation);

        return presentation__possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Presentation.prototype.componentDidMount = function componentDidMount() {
        this.props.reset2FARecoveryCodesInitAction();
    };

    Presentation.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        var error = newProps.settings.reset2FARecoveryCodes.error;


        if (this.props.settings.reset2FARecoveryCodes.error !== error && error) {
            this.props.onReset(error.message);
        }
    };

    /**
     * generates a TXT file, containing the codes, and download it on the browser.
     */


    Presentation.prototype.downloadClicked = function downloadClicked() {
        var _props$settings$reset = this.props.settings.reset2FARecoveryCodes.request;
        _props$settings$reset = _props$settings$reset === undefined ? {} : _props$settings$reset;
        var codes = _props$settings$reset.codes;


        text_downloadAsFile('proton-recovery-codes.txt', codes);
    };

    /**
     * renders the content of the modal.
     * @returns {ModalContent}
     */


    Presentation.prototype.renderContent = function renderContent() {
        var _this2 = this;

        var _props$settings$reset2 = this.props.settings.reset2FARecoveryCodes.request;
        _props$settings$reset2 = _props$settings$reset2 === undefined ? {} : _props$settings$reset2;
        var codes = _props$settings$reset2.codes;


        return Object(preact_min["h"])(
            Content,
            null,
            presentation__ref,
            presentation__ref2,
            codes && codes.length && [Object(preact_min["h"])(
                'ol',
                { className: SaveRecoveryCodeModal_default.a.list },
                codes.map(function (code) {
                    return Object(preact_min["h"])(
                        'li',
                        { className: SaveRecoveryCodeModal_default.a.item },
                        Object(preact_min["h"])(
                            'pre',
                            { className: SaveRecoveryCodeModal_default.a.code },
                            code
                        )
                    );
                })
            ), Object(preact_min["h"])(
                'div',
                { className: SaveRecoveryCodeModal_default.a.actions },
                Object(preact_min["h"])(
                    TextButton["a" /* default */],
                    { onClick: function onClick() {
                            return _this2.downloadClicked();
                        } },
                    'DOWNLOAD CODES'
                ),
                Object(preact_min["h"])(
                    react_copy_to_clipboard_lib["CopyToClipboard"],
                    { text: codes.join('\n') },
                    presentation__ref3
                )
            )] || presentation__ref4
        );
    };

    Presentation.prototype.render = function render() {
        var _this3 = this;

        return Object(preact_min["h"])(
            Wrapper,
            {
                onSubmit: function onSubmit(e) {
                    e.preventDefault();
                    _this3.props.onSubmit();
                },
                onReset: function onReset(e) {
                    e.preventDefault();
                    _this3.props.onCancel();
                }
            },
            this.renderContent(),
            presentation__ref5
        );
    };

    return Presentation;
}(preact_min["Component"]);

/* harmony default export */ var presentation = (Object(preact["connect"])('settings', settings["a" /* default */])(presentation_Presentation));
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SaveRecoveryCodeModal/formTestCode.js









var formTestCode__ref = Object(preact_min["h"])(
    'p',
    null,
    'Your recovery code will not be erased'
);

var formTestCode_renderInfo = function renderInfo(result) {
    if (typeof result === 'undefined') {
        // result is undefined until the input is lower than 6 characters.
        return formTestCode__ref;
    }

    return Object(preact_min["h"])(
        'p',
        null,
        result ? '✓ Test succeeded' : '⚠ Please test your recovery code to proceed'
    );
};

/**
 * Modal Form to test that a given code is one of the new recovery code.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @returns {ModalWrapper}
 */

var formTestCode__ref3 = Object(preact_min["h"])(
    'label',
    { htmlFor: 'verifyCode' },
    'Input your code'
);

var formTestCode__ref5 = Object(preact_min["h"])(
    'button',
    { type: 'reset', value: 'Reset' },
    'Back'
);

var formTestCode_FormTestCode = function FormTestCode(_ref2) {
    var _onSubmit = _ref2.onSubmit,
        onCancel = _ref2.onCancel,
        _ref2$settings$reset = _ref2.settings.reset2FARecoveryCodes,
        result = _ref2$settings$reset.result,
        _ref2$settings$reset$ = _ref2$settings$reset.response,
        response = _ref2$settings$reset$ === undefined ? {} : _ref2$settings$reset$,
        reset2FARecoveryCodesCheckNewCodeAction = _ref2.reset2FARecoveryCodesCheckNewCodeAction;

    var model = { code: response.code };

    return Object(preact_min["h"])(
        Wrapper,
        {
            onSubmit: function onSubmit(e) {
                e.preventDefault();
                _onSubmit();
            },
            onReset: function onReset(e) {
                e.preventDefault();
                onCancel();
            }
        },
        Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'p',
                { className: SaveRecoveryCodeModal_default.a.description },
                'Test your recovery codes by entering one of your codes below. If you did not save your recovery codes, go back and save them.'
            ),
            Object(preact_min["h"])(
                'div',
                { className: 'form-row' },
                formTestCode__ref3,
                Object(preact_min["h"])(
                    'div',
                    null,
                    Object(preact_min["h"])('input', {
                        onInput: function onInput(_ref4) {
                            var code = _ref4.target.value;

                            model.code = code;
                            if (code.length === 8) {
                                reset2FARecoveryCodesCheckNewCodeAction(model.code);
                            }
                        },
                        required: true,
                        value: model.code,
                        type: 'code',
                        id: 'verifyCode',
                        placeholder: 'Code',
                        disabled: !!result,
                        autoFocus: true
                    })
                )
            ),
            Object(preact_min["h"])(
                'div',
                { className: SaveRecoveryCodeModal_default.a.result },
                formTestCode_renderInfo(result)
            )
        ),
        Object(preact_min["h"])(
            Footer,
            null,
            formTestCode__ref5,
            Object(preact_min["h"])(
                'button',
                { type: 'submit', value: 'Submit', disabled: !result },
                'Finish'
            )
        )
    );
};

/* harmony default export */ var formTestCode = (Object(preact["connect"])('settings', settings["a" /* default */])(formTestCode_FormTestCode));
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SaveRecoveryCodeModal/index.js







var SaveRecoveryCodeModal_steps = [].concat(ScopeModal_steps('password'), [{
    title: 'Save your recovery codes',
    mustSucceed: true,
    component: function component(_ref) {
        var onNextStep = _ref.onNextStep,
            onPreviousStep = _ref.onPreviousStep,
            onReset = _ref.onReset;
        return Object(preact_min["h"])(presentation, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep,
            onReset: onReset
        });
    }
}, {
    title: 'Test your recovery codes',
    mustSucceed: true,
    component: function component(_ref2) {
        var onNextStep = _ref2.onNextStep,
            onPreviousStep = _ref2.onPreviousStep;
        return Object(preact_min["h"])(formTestCode, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep
        });
    }
}]);

var SaveRecoveryCodeModal_beforeDismiss = function beforeDismiss() {
    ScopeModal_beforeDismiss();

    var _actions = Object(settings["a" /* default */])(store["a" /* default */]),
        resetStoreAction = _actions.resetStoreAction;

    resetStoreAction(store["a" /* default */].getState(), ['reset2FARecoveryCodes']);
};
// CONCATENATED MODULE: ./components/ui/Link.js

/* harmony default export */ var Link = (function (_ref) {
    var href = _ref.href,
        children = _ref.children;
    return Object(preact_min["h"])(
        "a",
        { className: "a", href: href, target: "_blank", rel: "noopener noreferrer" },
        children
    );
});
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/AddU2FModal/presentation.js




/**
 * Shows information about the U2F Key usage.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @return {*}
 */

var AddU2FModal_presentation__ref2 = Object(preact_min["h"])(
    Content,
    null,
    Object(preact_min["h"])(
        'p',
        null,
        'This wizard will add a new security key to your Proton Account. '
    ),
    Object(preact_min["h"])(
        'p',
        null,
        'Please note that you will not be able to access your account if you loose your U2F device and your recovery codes. We recommend setting up a second 2FA method as a backup.'
    ),
    Object(preact_min["h"])(
        'p',
        null,
        Object(preact_min["h"])(
            'strong',
            null,
            'If you have never used 2FA before, we strongly recommend you reading our 2FA Guide first.'
        )
    ),
    Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
            Link,
            { href: 'https://protonmail.com/blog/' },
            'READ U2F GUIDE '
        )
    )
);

var AddU2FModal_presentation__ref3 = Object(preact_min["h"])(
    Footer,
    null,
    Object(preact_min["h"])(
        'button',
        { type: 'reset', value: 'Reset' },
        'Back'
    ),
    Object(preact_min["h"])(
        'button',
        { type: 'submit', value: 'Submit' },
        'Next'
    )
);

/* harmony default export */ var AddU2FModal_presentation = (function (_ref) {
    var _onSubmit = _ref.onSubmit,
        onCancel = _ref.onCancel,
        message = _ref.message;
    return Object(preact_min["h"])(
        Wrapper,
        {
            onSubmit: function onSubmit(e) {
                e.preventDefault();
                _onSubmit();
            },
            onReset: function onReset(e) {
                e.preventDefault();
                onCancel();
            }
        },
        message ? Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'div',
                null,
                message
            )
        ) : AddU2FModal_presentation__ref2,
        AddU2FModal_presentation__ref3
    );
});
// EXTERNAL MODULE: ./components/settings/security/TwoFactor/AddU2FModal/index.css
var AddU2FModal = __webpack_require__("JKdY");
var AddU2FModal_default = /*#__PURE__*/__webpack_require__.n(AddU2FModal);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/AddU2FModal/formName.js








/**
 * Label form for the U2F key.
 */

var formName__ref3 = Object(preact_min["h"])(
    Footer,
    null,
    Object(preact_min["h"])(
        'button',
        { type: 'reset', value: 'Reset' },
        'Back'
    ),
    Object(preact_min["h"])(
        'button',
        { type: 'submit', value: 'Submit' },
        'Next'
    )
);

var formName_FormName = function FormName(_ref) {
    var _onSubmit = _ref.onSubmit,
        onCancel = _ref.onCancel,
        addU2FKeyLabelAction = _ref.addU2FKeyLabelAction,
        addU2FKeyStore = _ref.settings.addU2FKey;

    var model = { label: addU2FKeyStore.response ? addU2FKeyStore.response.label : '' };
    return Object(preact_min["h"])(
        Wrapper,
        {
            onSubmit: function onSubmit(e) {
                e.preventDefault();
                addU2FKeyLabelAction(model.label);
                _onSubmit();
            },
            onReset: function onReset(e) {
                e.preventDefault();
                onCancel();
            } },
        Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'div',
                { className: AddU2FModal_default.a.name },
                Object(preact_min["h"])(
                    'label',
                    { className: AddU2FModal_default.a.nameLabel, htmlFor: 'name' },
                    'Name'
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: AddU2FModal_default.a.nameInputContainer },
                    Object(preact_min["h"])('input', {
                        onInput: function onInput(_ref2) {
                            var value = _ref2.target.value;

                            model.label = value;
                        },
                        value: model.label,
                        type: 'name',
                        id: 'inputName',
                        required: true,
                        placeholder: 'Name',
                        className: AddU2FModal_default.a.nameTextInput,
                        ref: function ref(input) {
                            return input && input.focus();
                        }
                    })
                )
            )
        ),
        formName__ref3
    );
};

/* harmony default export */ var formName = (Object(preact["connect"])('settings', settings["a" /* default */])(formName_FormName));
// EXTERNAL MODULE: ./components/settings/security/TwoFactor/AddU2FModal/sign-u2f.png
var sign_u2f = __webpack_require__("V25C");
var sign_u2f_default = /*#__PURE__*/__webpack_require__.n(sign_u2f);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/AddU2FModal/formRegisterKey.js


function formRegisterKey__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function formRegisterKey__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function formRegisterKey__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












/**
 * Modal Form to register a new U2F Key.
 *
 * Fetches the challenge from the server, forward it to U2F API, and sends back the answer to the API.
 */

var formRegisterKey__ref = Object(preact_min["h"])('img', { src: sign_u2f_default.a });

var formRegisterKey_FormRegisterKey = function (_Component) {
    formRegisterKey__inherits(FormRegisterKey, _Component);

    function FormRegisterKey() {
        formRegisterKey__classCallCheck(this, FormRegisterKey);

        return formRegisterKey__possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    /**
     * when next button is pressed.
     * @param {Event} e
     */
    FormRegisterKey.prototype.onSubmit = function onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    };

    FormRegisterKey.prototype.componentDidMount = function componentDidMount() {
        this.props.addU2FKeyRegisterAction();
    };

    FormRegisterKey.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        var newStatus = newProps.settings.addU2FKey.status;
        var status = this.props.settings.addU2FKey.status;


        if (newStatus !== status && newStatus === 'finished') {
            this.props.forbidClosure();
        }
    };

    /**
     * Renders the status field.
     * @return {*}
     */


    FormRegisterKey.prototype.renderStatus = function renderStatus() {
        var _this2 = this;

        var _props$settings$addU = this.props.settings.addU2FKey,
            _props$settings$addU$ = _props$settings$addU.response;
        _props$settings$addU$ = _props$settings$addU$ === undefined ? {} : _props$settings$addU$;
        var name = _props$settings$addU$.name,
            status = _props$settings$addU.status,
            request = _props$settings$addU.request,
            error = _props$settings$addU.error;


        if (status !== 'failure') {
            return Object(preact_min["h"])(
                'div',
                { className: AddU2FModal_default.a.status },
                Object(preact_min["h"])(
                    'div',
                    { className: AddU2FModal_default.a.row },
                    Object(preact_min["h"])(
                        'span',
                        { className: AddU2FModal_default.a.text },
                        'Activate your key'
                    ),
                    Object(preact_min["h"])(
                        'span',
                        { className: AddU2FModal_default.a.text },
                        status || 'fetching',
                        '...'
                    )
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: AddU2FModal_default.a.row },
                    Object(preact_min["h"])(
                        'span',
                        { className: AddU2FModal_default.a.text },
                        'Name'
                    ),
                    Object(preact_min["h"])(
                        'span',
                        { className: [AddU2FModal_default.a.text, AddU2FModal_default.a.nameLabel].join(' ') },
                        name
                    )
                )
            );
        }
        var _error$metaData = error.metaData;
        _error$metaData = _error$metaData === undefined ? {} : _error$metaData;
        var code = _error$metaData.code;

        if (code) {
            return Object(preact_min["h"])(
                'div',
                { className: AddU2FModal_default.a.status },
                Object(preact_min["h"])(
                    'span',
                    null,
                    Object(u2f["b" /* getErrorMessage */])(code, true)
                ),
                Object(preact_min["h"])(
                    TextButton["a" /* default */],
                    { onClick: function onClick() {
                            return _this2.props.addU2FKeyRegisterAction();
                        } },
                    'Retry'
                )
            );
        }

        this.props.onReset(error.message);
    };

    FormRegisterKey.prototype.render = function render() {
        var _this3 = this;

        var status = this.props.settings.addU2FKey.status;


        return Object(preact_min["h"])(
            Wrapper,
            {
                onSubmit: function onSubmit(e) {
                    return _this3.onSubmit(e);
                },
                onReset: function onReset(e) {
                    e.preventDefault();
                    _this3.props.onCancel();
                }
            },
            Object(preact_min["h"])(
                Content,
                { className: AddU2FModal_default.a.container },
                formRegisterKey__ref,
                this.renderStatus()
            ),
            Object(preact_min["h"])(
                Footer,
                null,
                Object(preact_min["h"])(
                    'button',
                    { type: 'reset', value: 'Reset', disabled: status === 'finished' },
                    'Back'
                ),
                Object(preact_min["h"])(
                    'button',
                    { type: 'submit', value: 'Submit', disabled: status !== 'finished' },
                    'Next'
                )
            )
        );
    };

    return FormRegisterKey;
}(preact_min["Component"]);

/* harmony default export */ var formRegisterKey = (Object(preact["connect"])(['scope', 'settings'], settings["a" /* default */])(formRegisterKey_FormRegisterKey));
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/AddU2FModal/index.js









var AddU2FModal_steps = [{
    title: 'Register new U2F Key',
    component: function component(_ref) {
        var onNextStep = _ref.onNextStep,
            onPreviousStep = _ref.onPreviousStep,
            message = _ref.message;
        return Object(preact_min["h"])(AddU2FModal_presentation, { onSubmit: onNextStep, onCancel: onPreviousStep, message: message });
    }
}].concat(ScopeModal_steps('password'), [{
    title: 'Name your U2F Key',
    component: function component(_ref2) {
        var onNextStep = _ref2.onNextStep,
            onPreviousStep = _ref2.onPreviousStep;
        return Object(preact_min["h"])(formName, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep
        });
    }
}, {
    title: 'Register new U2F Key',
    component: function component(_ref3) {
        var onNextStep = _ref3.onNextStep,
            onPreviousStep = _ref3.onPreviousStep,
            forbidClosure = _ref3.forbidClosure,
            onReset = _ref3.onReset;
        return Object(preact_min["h"])(formRegisterKey, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep,
            forbidClosure: forbidClosure,
            onReset: onReset
        });
    }
}], SaveRecoveryCodeModal_steps);

var AddU2FModal_beforeDismiss = function beforeDismiss() {
    ScopeModal_beforeDismiss();
    SaveRecoveryCodeModal_beforeDismiss();

    var _actions = Object(settings["a" /* default */])(store["a" /* default */]),
        resetStoreAction = _actions.resetStoreAction;

    resetStoreAction(store["a" /* default */].getState(), ['addU2FKey']);
};
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SetupTOTPModal/presentation.js





/**
 * Shows information about the U2F Key usage.
 * @param {Object} props
 * @param {Function} props.onSubmit - triggers the next step.
 * @param {Function} props.onCancel - triggers the previous step.
 * @return {*}
 */

var SetupTOTPModal_presentation__ref2 = Object(preact_min["h"])(
    Content,
    null,
    Object(preact_min["h"])(
        'p',
        null,
        'This wizard will enable Two Factor Authentication (2FA) on your ProtonMail account. 2FA will make your ProtonMail account more secure so we recommend enabling it. '
    ),
    Object(preact_min["h"])(
        'p',
        null,
        Object(preact_min["h"])(
            'strong',
            null,
            'If you have never used 2FA before, we strongly recommend you reading our 2FA Guide first.'
        )
    ),
    Object(preact_min["h"])(
        'div',
        null,
        Object(preact_min["h"])(
            Link,
            { href: 'https://protonmail.com/support/knowledge-base/two-factor-authentication/' },
            '2FA GUIDE'
        )
    )
);

var SetupTOTPModal_presentation__ref3 = Object(preact_min["h"])(
    Footer,
    null,
    Object(preact_min["h"])(
        'button',
        { type: 'reset', value: 'Reset' },
        'Cancel'
    ),
    Object(preact_min["h"])(
        'button',
        { type: 'submit', value: 'Submit' },
        'Next'
    )
);

/* harmony default export */ var SetupTOTPModal_presentation = (function (_ref) {
    var _onSubmit = _ref.onSubmit,
        onCancel = _ref.onCancel,
        message = _ref.message;
    return Object(preact_min["h"])(
        Wrapper,
        {
            onSubmit: function onSubmit(e) {
                e.preventDefault();
                _onSubmit();
            },
            onReset: function onReset(e) {
                e.preventDefault();
                onCancel();
            }
        },
        message ? Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'div',
                null,
                message
            )
        ) : SetupTOTPModal_presentation__ref2,
        SetupTOTPModal_presentation__ref3
    );
});
// EXTERNAL MODULE: ../node_modules/qrcode.react/lib/index.js
var qrcode_react_lib = __webpack_require__("Qh6E");
var qrcode_react_lib_default = /*#__PURE__*/__webpack_require__.n(qrcode_react_lib);

// EXTERNAL MODULE: ./components/settings/security/TwoFactor/SetupTOTPModal/index.css
var SetupTOTPModal = __webpack_require__("rXOo");
var SetupTOTPModal_default = /*#__PURE__*/__webpack_require__.n(SetupTOTPModal);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SetupTOTPModal/sharedSecret.js


function sharedSecret__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function sharedSecret__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function sharedSecret__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var sharedSecret__ref = Object(preact_min["h"])(
    'p',
    null,
    'Loading...'
);

var sharedSecret__ref2 = Object(preact_min["h"])(
    'p',
    null,
    'Loading...'
);

var sharedSecret__ref3 = Object(preact_min["h"])(
    Footer,
    null,
    Object(preact_min["h"])(
        'button',
        { type: 'reset', value: 'Reset' },
        'Back'
    ),
    Object(preact_min["h"])(
        'button',
        { type: 'submit', value: 'Submit' },
        'Next'
    )
);

var sharedSecret_SharedSecret = function (_Component) {
    sharedSecret__inherits(SharedSecret, _Component);

    function SharedSecret() {
        var _temp, _this, _ret;

        sharedSecret__classCallCheck(this, SharedSecret);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = sharedSecret__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { showingQRCode: true }, _temp), sharedSecret__possibleConstructorReturn(_this, _ret);
    }

    SharedSecret.prototype.componentDidMount = function componentDidMount() {
        this.props.createSharedSecretAction();
    };

    SharedSecret.prototype.renderSwitchModeButton = function renderSwitchModeButton() {
        var _this2 = this;

        return Object(preact_min["h"])(
            'p',
            null,
            Object(preact_min["h"])(
                TextButton["a" /* default */],
                {
                    onClick: function onClick() {
                        return _this2.setState({ showingQRCode: !_this2.state.showingQRCode });
                    } },
                this.state.showingQRCode ? 'Enter key manually instead' : 'Scan QR code'
            )
        );
    };

    SharedSecret.prototype.renderQRCode = function renderQRCode() {
        var _props$settings$setup = this.props.settings.setupTOTP;
        _props$settings$setup = _props$settings$setup === undefined ? {} : _props$settings$setup;
        var _props$settings$setup2 = _props$settings$setup.request;
        _props$settings$setup2 = _props$settings$setup2 === undefined ? {} : _props$settings$setup2;
        var qrURI = _props$settings$setup2.qrURI;


        return Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'p',
                null,
                this.props.message || 'Scan this QR code with your two factor authentication device to set up your account. '
            ),
            this.renderSwitchModeButton(),
            qrURI ? Object(preact_min["h"])(qrcode_react_lib_default.a, { value: qrURI, renderAs: 'svg', fgColor: '#505061', size: 256 }) : sharedSecret__ref
        );
    };

    SharedSecret.prototype.renderRawInformation = function renderRawInformation() {
        var _props$settings$setup3 = this.props.settings.setupTOTP;
        _props$settings$setup3 = _props$settings$setup3 === undefined ? {} : _props$settings$setup3;
        var _props$settings$setup4 = _props$settings$setup3.request;
        _props$settings$setup4 = _props$settings$setup4 === undefined ? {} : _props$settings$setup4;
        var interval = _props$settings$setup4.interval,
            digits = _props$settings$setup4.digits,
            secret = _props$settings$setup4.secret;


        return Object(preact_min["h"])(
            Content,
            null,
            Object(preact_min["h"])(
                'p',
                null,
                this.props.message || 'Manually enter this information into your two factor authentication device to set up your account. '
            ),
            this.renderSwitchModeButton(),
            secret ? Object(preact_min["h"])(
                'div',
                { className: SetupTOTPModal_default.a.grid },
                Object(preact_min["h"])(
                    'div',
                    { className: SetupTOTPModal_default.a.row },
                    Object(preact_min["h"])(
                        'label',
                        { className: SetupTOTPModal_default.a.label },
                        'KEY'
                    ),
                    Object(preact_min["h"])(
                        'span',
                        { className: SetupTOTPModal_default.a.value },
                        Object(preact_min["h"])(
                            'pre',
                            null,
                            secret
                        )
                    )
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: SetupTOTPModal_default.a.row },
                    Object(preact_min["h"])(
                        'label',
                        { className: SetupTOTPModal_default.a.label },
                        'INTERVAL'
                    ),
                    Object(preact_min["h"])(
                        'span',
                        { className: SetupTOTPModal_default.a.value },
                        Object(preact_min["h"])(
                            'pre',
                            null,
                            interval,
                            ' seconds'
                        )
                    )
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: SetupTOTPModal_default.a.row },
                    Object(preact_min["h"])(
                        'label',
                        { className: SetupTOTPModal_default.a.label },
                        'LENGTH'
                    ),
                    Object(preact_min["h"])(
                        'span',
                        { className: SetupTOTPModal_default.a.value },
                        Object(preact_min["h"])(
                            'pre',
                            null,
                            digits,
                            ' digits'
                        )
                    )
                )
            ) : sharedSecret__ref2
        );
    };

    SharedSecret.prototype.render = function render() {
        var _this3 = this;

        return Object(preact_min["h"])(
            Wrapper,
            {
                onSubmit: function onSubmit(e) {
                    e.preventDefault();
                    _this3.props.onSubmit();
                },
                onReset: function onReset(e) {
                    e.preventDefault();
                    _this3.props.onCancel();
                }
            },
            this.state.showingQRCode ? this.renderQRCode() : this.renderRawInformation(),
            sharedSecret__ref3
        );
    };

    return SharedSecret;
}(preact_min["Component"]);

/* harmony default export */ var sharedSecret = (Object(preact["connect"])('settings', settings["a" /* default */])(sharedSecret_SharedSecret));
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SetupTOTPModal/confirmCode.js


function confirmCode__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function confirmCode__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function confirmCode__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var confirmCode__ref = Object(preact_min["h"])(
    'label',
    { htmlFor: 'verifyCode' },
    'Input your code'
);

var confirmCode_ConfirmCode = function (_Component) {
    confirmCode__inherits(ConfirmCode, _Component);

    function ConfirmCode(props) {
        confirmCode__classCallCheck(this, ConfirmCode);

        var _this = confirmCode__possibleConstructorReturn(this, _Component.call(this, props));

        var _props$settings$setup = props.settings.setupTOTP;
        _props$settings$setup = _props$settings$setup === undefined ? {} : _props$settings$setup;
        var _props$settings$setup2 = _props$settings$setup.request;
        _props$settings$setup2 = _props$settings$setup2 === undefined ? {} : _props$settings$setup2;
        var TOTPCode = _props$settings$setup2.TOTPCode;

        _this.state = {
            code: TOTPCode
        };
        return _this;
    }

    ConfirmCode.prototype.componentWillReceiveProps = function componentWillReceiveProps(newProps) {
        var _newProps$settings$se = newProps.settings.setupTOTP;
        _newProps$settings$se = _newProps$settings$se === undefined ? {} : _newProps$settings$se;
        var status = _newProps$settings$se.status,
            error = _newProps$settings$se.error;


        if (status && status !== this.props.settings.setupTOTP.status) {
            if (status === 'success') {
                this.props.onSubmit();
            }
            if (status === 'failure') {
                this.props.onReset(error ? error.message || error : undefined);
            }
            this.setState({ loading: false });
        }
    };

    ConfirmCode.prototype.onSubmit = function onSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.forbidClosure();
        this.props.enableTOTPAction(this.state.code);
    };

    ConfirmCode.prototype.render = function render() {
        var _this2 = this;

        return Object(preact_min["h"])(
            Wrapper,
            {
                onSubmit: function onSubmit(e) {
                    _this2.onSubmit(e);
                },
                onReset: function onReset(e) {
                    e.preventDefault();
                    _this2.props.onCancel();
                }
            },
            Object(preact_min["h"])(
                Content,
                null,
                Object(preact_min["h"])(
                    'p',
                    { className: SetupTOTPModal_default.a.description },
                    'Test your new 2FA method:'
                ),
                Object(preact_min["h"])(
                    'div',
                    { className: 'form-row' },
                    confirmCode__ref,
                    Object(preact_min["h"])(
                        'div',
                        null,
                        Object(preact_min["h"])('input', {
                            onInput: function onInput(_ref2) {
                                var code = _ref2.target.value;

                                _this2.setState({ code: code });
                            },
                            required: true,
                            value: this.state.code,
                            disabled: this.state.loading,
                            type: 'code',
                            id: 'verifyCode',
                            placeholder: 'Code',
                            minLength: '6',
                            maxLength: '6',
                            autoFocus: true
                        })
                    )
                )
            ),
            Object(preact_min["h"])(
                Footer,
                null,
                Object(preact_min["h"])(
                    'button',
                    { type: 'reset', value: 'Reset', disabled: this.state.loading },
                    'Back'
                ),
                Object(preact_min["h"])(
                    'button',
                    { type: 'submit', value: 'Submit', disabled: this.state.loading },
                    'Finish'
                )
            )
        );
    };

    return ConfirmCode;
}(preact_min["Component"]);

/* harmony default export */ var confirmCode = (Object(preact["connect"])('settings', settings["a" /* default */])(confirmCode_ConfirmCode));
// CONCATENATED MODULE: ./components/settings/security/TwoFactor/SetupTOTPModal/index.js










var SetupTOTPModal_steps = [{
    title: 'Set Up Two Factor Authentication',
    component: function component(_ref) {
        var onNextStep = _ref.onNextStep,
            onPreviousStep = _ref.onPreviousStep,
            message = _ref.message;
        return Object(preact_min["h"])(SetupTOTPModal_presentation, { onSubmit: onNextStep, onCancel: onPreviousStep, message: message });
    }
}].concat(ScopeModal_steps('password'), [{
    title: 'Set Up Two Factor Authentication',
    component: function component(_ref2) {
        var onNextStep = _ref2.onNextStep,
            onPreviousStep = _ref2.onPreviousStep;
        return Object(preact_min["h"])(sharedSecret, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep
        });
    }
}, {
    title: 'Confirm your new method',
    component: function component(_ref3) {
        var onNextStep = _ref3.onNextStep,
            onPreviousStep = _ref3.onPreviousStep,
            onReset = _ref3.onReset,
            forbidClosure = _ref3.forbidClosure;
        return Object(preact_min["h"])(confirmCode, {
            onSubmit: onNextStep,
            onCancel: onPreviousStep,
            onReset: onReset,
            forbidClosure: forbidClosure
        });
    }
}], SaveRecoveryCodeModal_steps);

var SetupTOTPModal_beforeDismiss = function beforeDismiss() {
    var success = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    ScopeModal_beforeDismiss();
    SaveRecoveryCodeModal_beforeDismiss();
    if (success || !reset) {
        var _actions = Object(settings["a" /* default */])(store["a" /* default */]),
            resetStoreAction = _actions.resetStoreAction;

        resetStoreAction(store["a" /* default */].getState(), ['setupTOTP']);
    }
};
// EXTERNAL MODULE: ./components/settings/security/TwoFactor/style.css
var TwoFactor_style = __webpack_require__("V6hp");
var TwoFactor_style_default = /*#__PURE__*/__webpack_require__.n(TwoFactor_style);

// CONCATENATED MODULE: ./components/settings/security/TwoFactor/index.js


function TwoFactor__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function TwoFactor__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function TwoFactor__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
















/**
 * @param {Object} props
 * @param {Object} props.user
 * @param {Int} props.user.TwoFactor - whether 2FA is active or not.
 * @param {Int} props.user.TOTP - whether TOTP is active or not.
 * @param {Object[]} props.user.U2FKeys - the list of U2FKeys.
 * @param {Int} props.user.U2FKeys[].Compromised - whether the key is Compromised or not.
 * @param {String} props.user.U2FKeys[].KeyHandle - the KeyHandle of the U2FKey.
 * @param {String} props.user.U2FKeys[].Label - the Label of the Key.
 */

var TwoFactor__ref = Object(preact_min["h"])(
    'div',
    null,
    'Are you sure you want to disable totally Two Factor Authentication?'
);

var TwoFactor__ref2 = Object(preact_min["h"])(
    'div',
    null,
    'Are you sure you want to disable 2FA via application?'
);

var TwoFactor__ref3 = Object(preact_min["h"])(
    'h2',
    null,
    'Two-Factor Authentication'
);

var TwoFactor__ref4 = Object(preact_min["h"])(
    'i',
    {
        'data-toggle': 'tooltip',
        'data-placement': 'top',
        title: 'Regenerate recovery codes will invalidate existing recovery codes'
    },
    'i'
);

var TwoFactor_TwoFactorSettings = function (_Component) {
    TwoFactor__inherits(TwoFactorSettings, _Component);

    function TwoFactorSettings() {
        var _temp, _this, _ret;

        TwoFactor__classCallCheck(this, TwoFactorSettings);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = TwoFactor__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
            modal: '',
            SaveRecoveryCodesModalOpen: false,
            U2FModalOpen: false,
            DisableU2FModalOpen: false
        }, _temp), TwoFactor__possibleConstructorReturn(_this, _ret);
    }

    TwoFactorSettings.prototype.openModal = function openModal(modalName) {
        this.setState({ modal: modalName });
    };

    TwoFactorSettings.prototype.closeModal = function closeModal() {
        this.setState({ modal: '' });
    };

    TwoFactorSettings.prototype.renderDisableTwoFactorModal = function renderDisableTwoFactorModal() {
        var _this2 = this;

        return Object(preact_min["h"])(
            ConfirmModal_ConfirmModal,
            {
                title: 'Disable 2FA',
                scope: 'password',
                isOpen: this.state.modal === 'Disable2FA',
                onAfterClose: function onAfterClose() {
                    return _this2.closeModal();
                },
                onConfirm: function onConfirm() {
                    _this2.props.disableTwoFactorAction();
                },
                onCancel: function onCancel() {}
            },
            TwoFactor__ref
        );
    };

    TwoFactorSettings.prototype.renderDisableTOTPModal = function renderDisableTOTPModal() {
        var _this3 = this;

        return Object(preact_min["h"])(
            ConfirmModal_ConfirmModal,
            {
                title: 'Disable TOTP',
                scope: 'password',
                isOpen: this.state.modal === 'DisableTOTP',
                onAfterClose: function onAfterClose() {
                    return _this3.closeModal();
                },
                onConfirm: function onConfirm() {
                    _this3.props.disableTOTPAction();
                },
                onCancel: function onCancel() {}
            },
            TwoFactor__ref2
        );
    };

    TwoFactorSettings.prototype.renderAddU2FModal = function renderAddU2FModal() {
        var _this4 = this;

        return Object(preact_min["h"])(SteppedModal_SteppedModal, {
            isOpen: this.state.modal === 'AddU2FKey',
            onRequestClose: function onRequestClose() {
                return _this4.closeModal();
            },
            steps: AddU2FModal_steps,
            beforeDismiss: AddU2FModal_beforeDismiss
        });
    };

    TwoFactorSettings.prototype.renderSetupTOTPModal = function renderSetupTOTPModal() {
        var _this5 = this;

        return Object(preact_min["h"])(SteppedModal_SteppedModal, {
            isOpen: this.state.modal === 'SetupTOTP',
            onRequestClose: function onRequestClose() {
                return _this5.closeModal();
            },
            steps: SetupTOTPModal_steps,
            beforeDismiss: SetupTOTPModal_beforeDismiss
        });
    };

    TwoFactorSettings.prototype.renderSaveRecoveryCodesModal = function renderSaveRecoveryCodesModal() {
        var _this6 = this;

        return Object(preact_min["h"])(SteppedModal_SteppedModal, {
            isOpen: this.state.modal === 'SaveRecoveryCodes',
            onRequestClose: function onRequestClose() {
                return _this6.closeModal();
            },
            beforeDismiss: SaveRecoveryCodeModal_beforeDismiss,
            steps: SaveRecoveryCodeModal_steps
        });
    };

    TwoFactorSettings.prototype.render = function render() {
        var _this7 = this;

        var _props = this.props,
            TwoFactor = _props.TwoFactor,
            TOTP = _props.TOTP,
            _props$U2FKeys = _props.U2FKeys,
            U2FKeys = _props$U2FKeys === undefined ? [] : _props$U2FKeys;


        var u2fClasses = [TwoFactor_style_default.a.item];
        if (!!TwoFactor) {
            u2fClasses.push(TwoFactor_style_default.a.lastItem);
        }

        return Object(preact_min["h"])(
            'div',
            { className: TwoFactor_style_default.a.twoFactor },
            this.renderDisableTwoFactorModal(),
            this.renderSetupTOTPModal(),
            this.renderDisableTOTPModal(),
            this.renderAddU2FModal(),
            this.renderSaveRecoveryCodesModal(),
            TwoFactor__ref3,
            Object(preact_min["h"])(
                'div',
                { className: 'alert alert-info' },
                'Two-factor authentication is currently ',
                TwoFactor ? 'on' : 'off',
                '.',
                ' ',
                !!TwoFactor && Object(preact_min["h"])(
                    TextButton["a" /* default */],
                    { onClick: function onClick() {
                            return _this7.openModal('Disable2FA');
                        } },
                    'Turn off'
                )
            ),
            Object(preact_min["h"])(
                'div',
                { id: 'totp', className: TwoFactor_style_default.a.item },
                Object(preact_min["h"])(
                    'div',
                    { className: TwoFactor_style_default.a.description },
                    '2FA via Application'
                ),
                Object(preact_min["h"])(
                    'button',
                    { className: TwoFactor_style_default.a.action, onClick: function onClick() {
                            return _this7.openModal(TOTP ? 'DisableTOTP' : 'SetupTOTP');
                        } },
                    TOTP ? 'Disable' : 'Enable'
                ),
                !!TwoFactor && Object(preact_min["h"])(
                    'div',
                    { className: TwoFactor_style_default.a.description },
                    Object(preact_min["h"])(
                        TextButton["a" /* default */],
                        { onClick: function onClick() {
                                return _this7.openModal('SaveRecoveryCodes');
                            } },
                        'Regenerate recovery codes'
                    ),
                    TwoFactor__ref4
                )
            ),
            Object(preact_min["h"])(
                'div',
                { className: u2fClasses.join(' ') },
                Object(preact_min["h"])(
                    'div',
                    { className: TwoFactor_style_default.a.description },
                    '2FA via Security Key'
                ),
                Object(preact_min["h"])(
                    'button',
                    { className: TwoFactor_style_default.a.action, onClick: function onClick() {
                            return _this7.openModal('AddU2FKey');
                        },
                        disabled: !Object(dist["isSupported"])() },
                    U2FKeys.length ? 'Add another key' : 'Enable'
                )
            ),
            Object(preact_min["h"])(TwoFactor_U2FKeyList_U2FKeyList, { U2FKeys: U2FKeys })
        );
    };

    return TwoFactorSettings;
}(preact_min["Component"]);

/* harmony default export */ var security_TwoFactor = (Object(preact["connect"])('settings', settings["a" /* default */])(TwoFactor_TwoFactorSettings));
// EXTERNAL MODULE: ./components/settings/security/index.css
var security = __webpack_require__("tJbl");
var security_default = /*#__PURE__*/__webpack_require__.n(security);

// CONCATENATED MODULE: ./components/settings/security/index.js




/**
 * Manages the setting security view.
 * @return {Component}
 */

var security__ref2 = Object(preact_min["h"])(
    'h1',
    null,
    'Security'
);

var security__ref3 = Object(preact_min["h"])(
    'h2',
    null,
    'Session Management'
);

var security__ref4 = Object(preact_min["h"])(
    'h2',
    null,
    'Authentication Logs'
);

/* harmony default export */ var settings_security = (function (_ref) {
    var user = _ref.user;

    return Object(preact_min["h"])(
        'div',
        null,
        security__ref2,
        Object(preact_min["h"])(
            'div',
            { className: [security_default.a.top, security_default.a.panel].join(' ') },
            Object(preact_min["h"])(
                'div',
                { className: security_default.a.panel },
                Object(preact_min["h"])(security_TwoFactor, { TwoFactor: user.TwoFactor, TOTP: user.TOTP, U2FKeys: user.U2FKeys })
            ),
            Object(preact_min["h"])(
                'div',
                { className: security_default.a.panel },
                security__ref3
            )
        ),
        Object(preact_min["h"])(
            'div',
            { className: security_default.a.panel },
            security__ref4
        )
    );
});
// EXTERNAL MODULE: ./routes/settings/index.css
var routes_settings = __webpack_require__("0G6U");
var settings_default = /*#__PURE__*/__webpack_require__.n(routes_settings);

// CONCATENATED MODULE: ../node_modules/babel-loader/lib??ref--0!./routes/settings/index.js









/**
 * Renders the content of the selected setting (using the URI).
 * @param {String} setting - the route of the setting to render
 * @param {Object} user
 * @returns {Component}
 */
function settings_renderContent(setting, user) {
    if (setting === 'security') {
        return Object(preact_min["h"])(settings_security, { user: user });
    }
    return Object(preact_min["h"])(
        'h1',
        null,
        'Param\xE8tres pour ',
        Object(preact_min["h"])(
            'b',
            null,
            user.Username
        )
    );
}

/* harmony default export */ var lib__ref__0_routes_settings = __webpack_exports__["default"] = (Object(preact["connect"])(['auth', 'config'])(function (_ref) {
    var side = _ref.side,
        config = _ref.config;

    if (!config) {
        return null;
    }
    var user = config.settings.user;

    console.log('SETTINGS', user);
    if (!Object.keys(user).length) return null;
    return Object(preact_min["h"])(
        'div',
        { className: settings_default.a.security },
        Object(preact_min["h"])(
            'div',
            { className: settings_default.a.nav },
            Object(preact_min["h"])(
                'ul',
                null,
                Object(preact_min["h"])(
                    'li',
                    null,
                    Object(preact_min["h"])(
                        preact_router_es["Link"],
                        { activeClassName: settings_default.a.selected, href: '/settings' },
                        ' Home '
                    )
                ),
                Object(preact_min["h"])(
                    'li',
                    null,
                    Object(preact_min["h"])(
                        preact_router_es["Link"],
                        { activeClassName: settings_default.a.selected, href: '/settings/security' },
                        ' Security '
                    )
                )
            )
        ),
        Object(preact_min["h"])(
            'div',
            { id: 'settings', className: settings_default.a.content },
            settings_renderContent(side, user)
        )
    );
}));

/***/ }),

/***/ "jAUu":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Modal = __webpack_require__("pjnD");

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Modal2.default;
module.exports = exports["default"];

/***/ }),

/***/ "lfEA":
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "nkXc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfill", function() { return polyfill; });
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}




/***/ }),

/***/ "nkmZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__("w/aI");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);



/**
 * Button that has the appearance of a link.
 * @param {Function} onClick - handle for the click event.
 * @param {preact.Component[]} children
 * @returns {preact.Component}
 */
/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
  var onClick = _ref.onClick,
      children = _ref.children;
  return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
    "a",
    { onClick: onClick, className: __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.a, href: "#" },
    children
  );
});

/***/ }),

/***/ "pjnD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyOpenClassName = exports.portalClassName = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("eW0v");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("eW0v");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__("5D9O");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ModalPortal = __webpack_require__("CFce");

var _ModalPortal2 = _interopRequireDefault(_ModalPortal);

var _ariaAppHider = __webpack_require__("OMxe");

var ariaAppHider = _interopRequireWildcard(_ariaAppHider);

var _safeHTMLElement = __webpack_require__("5H+Q");

var _safeHTMLElement2 = _interopRequireDefault(_safeHTMLElement);

var _reactLifecyclesCompat = __webpack_require__("nkXc");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portalClassName = exports.portalClassName = "ReactModalPortal";
var bodyOpenClassName = exports.bodyOpenClassName = "ReactModal__Body--open";

var isReact16 = _reactDom2.default.createPortal !== undefined;
var createPortal = isReact16 ? _reactDom2.default.createPortal : _reactDom2.default.unstable_renderSubtreeIntoContainer;

function getParentElement(parentSelector) {
  return parentSelector();
}

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this.removePortal = function () {
      !isReact16 && _reactDom2.default.unmountComponentAtNode(_this.node);
      var parent = getParentElement(_this.props.parentSelector);
      parent.removeChild(_this.node);
    }, _this.portalRef = function (ref) {
      _this.portal = ref;
    }, _this.renderPortal = function (props) {
      var portal = createPortal(_this, _react2.default.createElement(_ModalPortal2.default, _extends({ defaultStyles: Modal.defaultStyles }, props)), _this.node);
      _this.portalRef(portal);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!_safeHTMLElement.canUseDOM) return;

      if (!isReact16) {
        this.node = document.createElement("div");
      }
      this.node.className = this.props.portalClassName;

      var parent = getParentElement(this.props.parentSelector);
      parent.appendChild(this.node);

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(prevProps) {
      var prevParent = getParentElement(prevProps.parentSelector);
      var nextParent = getParentElement(this.props.parentSelector);
      return { prevParent: prevParent, nextParent: nextParent };
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, _, snapshot) {
      if (!_safeHTMLElement.canUseDOM) return;
      var _props = this.props,
          isOpen = _props.isOpen,
          portalClassName = _props.portalClassName;


      if (prevProps.portalClassName !== portalClassName) {
        this.node.className = portalClassName;
      }

      var prevParent = snapshot.prevParent,
          nextParent = snapshot.nextParent;

      if (nextParent !== prevParent) {
        prevParent.removeChild(this.node);
        nextParent.appendChild(this.node);
      }

      // Stop unnecessary renders if modal is remaining closed
      if (!prevProps.isOpen && !isOpen) return;

      !isReact16 && this.renderPortal(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!_safeHTMLElement.canUseDOM || !this.node || !this.portal) return;

      var state = this.portal.state;
      var now = Date.now();
      var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

      if (closesAt) {
        if (!state.beforeClose) {
          this.portal.closeWithTimeout();
        }

        setTimeout(this.removePortal, closesAt - now);
      } else {
        this.removePortal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!_safeHTMLElement.canUseDOM || !isReact16) {
        return null;
      }

      if (!this.node && isReact16) {
        this.node = document.createElement("div");
      }

      return createPortal(_react2.default.createElement(_ModalPortal2.default, _extends({
        ref: this.portalRef,
        defaultStyles: Modal.defaultStyles
      }, this.props)), this.node);
    }
  }], [{
    key: "setAppElement",
    value: function setAppElement(element) {
      ariaAppHider.setElement(element);
    }

    /* eslint-disable react/no-unused-prop-types */

    /* eslint-enable react/no-unused-prop-types */

  }]);

  return Modal;
}(_react.Component);

Modal.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  style: _propTypes2.default.shape({
    content: _propTypes2.default.object,
    overlay: _propTypes2.default.object
  }),
  portalClassName: _propTypes2.default.string,
  bodyOpenClassName: _propTypes2.default.string,
  htmlOpenClassName: _propTypes2.default.string,
  className: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  overlayClassName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    base: _propTypes2.default.string.isRequired,
    afterOpen: _propTypes2.default.string.isRequired,
    beforeClose: _propTypes2.default.string.isRequired
  })]),
  appElement: _propTypes2.default.instanceOf(_safeHTMLElement2.default),
  onAfterOpen: _propTypes2.default.func,
  onRequestClose: _propTypes2.default.func,
  closeTimeoutMS: _propTypes2.default.number,
  ariaHideApp: _propTypes2.default.bool,
  shouldFocusAfterRender: _propTypes2.default.bool,
  shouldCloseOnOverlayClick: _propTypes2.default.bool,
  shouldReturnFocusAfterClose: _propTypes2.default.bool,
  parentSelector: _propTypes2.default.func,
  aria: _propTypes2.default.object,
  data: _propTypes2.default.object,
  role: _propTypes2.default.string,
  contentLabel: _propTypes2.default.string,
  shouldCloseOnEsc: _propTypes2.default.bool,
  overlayRef: _propTypes2.default.func,
  contentRef: _propTypes2.default.func
};
Modal.defaultProps = {
  isOpen: false,
  portalClassName: portalClassName,
  bodyOpenClassName: bodyOpenClassName,
  ariaHideApp: true,
  closeTimeoutMS: 0,
  shouldFocusAfterRender: true,
  shouldCloseOnEsc: true,
  shouldCloseOnOverlayClick: true,
  shouldReturnFocusAfterClose: true,
  parentSelector: function parentSelector() {
    return document.body;
  }
};
Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "1px solid #ccc",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};


(0, _reactLifecyclesCompat.polyfill)(Modal);

exports.default = Modal;

/***/ }),

/***/ "qmkL":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
	"use strict";
	// IE <10 is explicitly unsupported
	if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
		return;
	}
	var
		  doc = view.document
		  // only get URL when necessary in case Blob.js hasn't overridden it yet
		, get_URL = function() {
			return view.URL || view.webkitURL || view;
		}
		, save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a")
		, can_use_save_link = "download" in save_link
		, click = function(node) {
			var event = new MouseEvent("click");
			node.dispatchEvent(event);
		}
		, is_safari = /constructor/i.test(view.HTMLElement) || view.safari
		, is_chrome_ios =/CriOS\/[\d]+/.test(navigator.userAgent)
		, throw_outside = function(ex) {
			(view.setImmediate || view.setTimeout)(function() {
				throw ex;
			}, 0);
		}
		, force_saveable_type = "application/octet-stream"
		// the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
		, arbitrary_revoke_timeout = 1000 * 40 // in ms
		, revoke = function(file) {
			var revoker = function() {
				if (typeof file === "string") { // file is an object URL
					get_URL().revokeObjectURL(file);
				} else { // file is a File
					file.remove();
				}
			};
			setTimeout(revoker, arbitrary_revoke_timeout);
		}
		, dispatch = function(filesaver, event_types, event) {
			event_types = [].concat(event_types);
			var i = event_types.length;
			while (i--) {
				var listener = filesaver["on" + event_types[i]];
				if (typeof listener === "function") {
					try {
						listener.call(filesaver, event || filesaver);
					} catch (ex) {
						throw_outside(ex);
					}
				}
			}
		}
		, auto_bom = function(blob) {
			// prepend BOM for UTF-8 XML and text/* types (including HTML)
			// note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
			if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
				return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type});
			}
			return blob;
		}
		, FileSaver = function(blob, name, no_auto_bom) {
			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			// First try a.download, then web filesystem, then object URLs
			var
				  filesaver = this
				, type = blob.type
				, force = type === force_saveable_type
				, object_url
				, dispatch_all = function() {
					dispatch(filesaver, "writestart progress write writeend".split(" "));
				}
				// on any filesys errors revert to saving with object URLs
				, fs_error = function() {
					if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
						// Safari doesn't allow downloading of blob urls
						var reader = new FileReader();
						reader.onloadend = function() {
							var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
							var popup = view.open(url, '_blank');
							if(!popup) view.location.href = url;
							url=undefined; // release reference before dispatching
							filesaver.readyState = filesaver.DONE;
							dispatch_all();
						};
						reader.readAsDataURL(blob);
						filesaver.readyState = filesaver.INIT;
						return;
					}
					// don't create more object URLs than needed
					if (!object_url) {
						object_url = get_URL().createObjectURL(blob);
					}
					if (force) {
						view.location.href = object_url;
					} else {
						var opened = view.open(object_url, "_blank");
						if (!opened) {
							// Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
							view.location.href = object_url;
						}
					}
					filesaver.readyState = filesaver.DONE;
					dispatch_all();
					revoke(object_url);
				}
			;
			filesaver.readyState = filesaver.INIT;

			if (can_use_save_link) {
				object_url = get_URL().createObjectURL(blob);
				setTimeout(function() {
					save_link.href = object_url;
					save_link.download = name;
					click(save_link);
					dispatch_all();
					revoke(object_url);
					filesaver.readyState = filesaver.DONE;
				});
				return;
			}

			fs_error();
		}
		, FS_proto = FileSaver.prototype
		, saveAs = function(blob, name, no_auto_bom) {
			return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
		}
	;
	// IE 10+ (native saveAs)
	if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
		return function(blob, name, no_auto_bom) {
			name = name || blob.name || "download";

			if (!no_auto_bom) {
				blob = auto_bom(blob);
			}
			return navigator.msSaveOrOpenBlob(blob, name);
		};
	}

	FS_proto.abort = function(){};
	FS_proto.readyState = FS_proto.INIT = 0;
	FS_proto.WRITING = 1;
	FS_proto.DONE = 2;

	FS_proto.error =
	FS_proto.onwritestart =
	FS_proto.onprogress =
	FS_proto.onwrite =
	FS_proto.onabort =
	FS_proto.onerror =
	FS_proto.onwriteend =
		null;

	return saveAs;
}(
	   typeof self !== "undefined" && self
	|| typeof window !== "undefined" && window
	|| this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
  module.exports.saveAs = saveAs;
} else if (("function" !== "undefined" && __webpack_require__("lfEA") !== null) && (__webpack_require__("yNJ0") !== null)) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
    return saveAs;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}


/***/ }),

/***/ "r+zW":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"modal":"modal__9Vwq8","header":"header__1TRk7","content":"content__lhYIf","wrapper":"wrapper__2vY5d","footer":"footer__3iOKY"};

/***/ }),

/***/ "rXOo":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"grid":"grid__2laSF","row":"row__Y68S2","label":"label__1HL4-","value":"value__2H6IC","result":"result__19Wp9","description":"description__2WEpy","code":"code__2_y1x"};

/***/ }),

/***/ "tJbl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"top":"top__3cj1K","panel":"panel__1qSnA"};

/***/ }),

/***/ "vMgm":
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__("aGCF");
var Polynomial = __webpack_require__("hKhR");
var math = __webpack_require__("MtRz");

var QRMaskPattern = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

var QRUtil = {

    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
	    var d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
	    var d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit : function(data) {

	    var digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition : function(typeNumber) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
	    
	    switch (maskPattern) {
		    
	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

	    default :
		    throw new Error("bad maskPattern:" + maskPattern);
	    }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

	    var a = new Polynomial([1], 0);

	    for (var i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new Polynomial([1, math.gexp(i)], 0) );
	    }

	    return a;
    },

    getLengthInBits : function(mode, type) {

	    if (1 <= type && type < 10) {

		    // 1 - 9

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 10;
		    case Mode.MODE_ALPHA_NUM 	: return 9;
		    case Mode.MODE_8BIT_BYTE	: return 8;
		    case Mode.MODE_KANJI  	: return 8;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 12;
		    case Mode.MODE_ALPHA_NUM 	: return 11;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 10;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 14;
		    case Mode.MODE_ALPHA_NUM	: return 13;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint : function(qrCode) {
	    
	    var moduleCount = qrCode.getModuleCount();
	    
	    var lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (var row = 0; row < moduleCount; row++) {

		    for (var col = 0; col < moduleCount; col++) {

			    var sameCount = 0;
			    var dark = qrCode.isDark(row, col);

				for (var r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (var c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrCode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (var row = 0; row < moduleCount - 1; row++) {
		    for (var col = 0; col < moduleCount - 1; col++) {
			    var count = 0;
			    if (qrCode.isDark(row,     col    ) ) count++;
			    if (qrCode.isDark(row + 1, col    ) ) count++;
			    if (qrCode.isDark(row,     col + 1) ) count++;
			    if (qrCode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (var row = 0; row < moduleCount; row++) {
		    for (var col = 0; col < moduleCount - 6; col++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row, col + 1)
					    &&  qrCode.isDark(row, col + 2)
					    &&  qrCode.isDark(row, col + 3)
					    &&  qrCode.isDark(row, col + 4)
					    && !qrCode.isDark(row, col + 5)
					    &&  qrCode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount - 6; row++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row + 1, col)
					    &&  qrCode.isDark(row + 2, col)
					    &&  qrCode.isDark(row + 3, col)
					    &&  qrCode.isDark(row + 4, col)
					    && !qrCode.isDark(row + 5, col)
					    &&  qrCode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    var darkCount = 0;

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount; row++) {
			    if (qrCode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }
};

module.exports = QRUtil;


/***/ }),

/***/ "w/aI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"a":"a__2-NsR"};

/***/ }),

/***/ "wVGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__("Asjh");

function emptyFunction() {}

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "xbqV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deselectCurrent = __webpack_require__("JUot");

var defaultMessage = 'Copy to clipboard: #{key}, Enter';

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? '⌘' : 'Ctrl') + '+C';
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug, message, reselectPrevious, range, selection, mark, success = false;
  if (!options) { options = {}; }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement('span');
    mark.textContent = text;
    // reset user styles for span element
    mark.style.all = 'unset';
    // prevents scrolling to the end of the page
    mark.style.position = 'fixed';
    mark.style.top = 0;
    mark.style.clip = 'rect(0, 0, 0, 0)';
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = 'pre';
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);

    range.selectNode(mark);
    selection.addRange(range);

    var successful = document.execCommand('copy');
    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }
    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    debug && console.warn('trying IE specific stuff');
    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err);
      debug && console.error('falling back to prompt');
      message = format('message' in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

module.exports = copy;


/***/ }),

/***/ "y78Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__("UHtZ"),
    CopyToClipboard = _require.CopyToClipboard;

CopyToClipboard.CopyToClipboard = CopyToClipboard;
module.exports = CopyToClipboard;

/***/ })

});
//# sourceMappingURL=route-settings.chunk.9e353.js.map