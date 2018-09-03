webpackJsonp([1],{

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd"};

/***/ }),

/***/ "fF25":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"twoFactorOption":"twoFactorOption__FtDr0"};

/***/ }),

/***/ "iOg+":
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

// EXTERNAL MODULE: ./routes/home/style.css
var style = __webpack_require__("ZAL5");
var style_default = /*#__PURE__*/__webpack_require__.n(style);

// EXTERNAL MODULE: ./actions/authentication.js
var authentication = __webpack_require__("GU1J");

// CONCATENATED MODULE: ./components/auth/formLogin.js



var _ref2 = Object(preact_min["h"])(
    'label',
    { 'for': 'login' },
    'Login'
);

var _ref4 = Object(preact_min["h"])(
    'label',
    { 'for': 'password' },
    'password'
);

var _ref6 = Object(preact_min["h"])(
    'button',
    null,
    'Login'
);

var formLogin_formLogin = function formLogin(_ref) {
    var login = _ref.login;

    var model = {
        username: 'dew1527087668398',
        password: 'test'
    };

    return Object(preact_min["h"])(
        'form',
        {
            name: 'formLogin',
            method: 'post',
            novalidate: true,
            onsubmit: function onsubmit(e) {
                return e.preventDefault(), login(model);
            } },
        Object(preact_min["h"])(
            'fieldset',
            null,
            Object(preact_min["h"])(
                'div',
                null,
                _ref2,
                Object(preact_min["h"])('input', {
                    type: 'text',
                    name: 'login',
                    autofocus: true,
                    autocapitalize: 'off',
                    autocorrect: 'off',
                    id: 'login',
                    required: true,
                    value: model.username,
                    placeholder: 'Username',
                    oninput: function oninput(_ref3) {
                        var value = _ref3.target.value;

                        model.username = value;
                    }
                })
            ),
            Object(preact_min["h"])(
                'div',
                null,
                _ref4,
                Object(preact_min["h"])('input', {
                    type: 'password',
                    name: 'password',
                    id: 'password',
                    value: model.password,
                    placeholder: 'Password',
                    oninput: function oninput(_ref5) {
                        var value = _ref5.target.value;

                        model.password = value;
                    }
                })
            )
        ),
        _ref6
    );
};

/* harmony default export */ var auth_formLogin = (formLogin_formLogin);
// CONCATENATED MODULE: ./components/auth/formUnlock.js



var formUnlock__ref2 = Object(preact_min["h"])(
    "label",
    { "for": "passwordUnlock" },
    "Unlock"
);

var formUnlock__ref4 = Object(preact_min["h"])(
    "button",
    null,
    "Send"
);

var formUnlock_formUnlock = function formUnlock(_ref) {
    var unlock = _ref.unlock;


    var model = {};

    return Object(preact_min["h"])(
        "form",
        {
            name: "formLogin",
            method: "post",
            novalidate: true,
            onsubmit: function onsubmit(e) {
                return e.preventDefault(), unlock(model);
            } },
        Object(preact_min["h"])(
            "fieldset",
            null,
            Object(preact_min["h"])(
                "div",
                null,
                formUnlock__ref2,
                Object(preact_min["h"])("input", {
                    type: "password",
                    autofocus: true,
                    autocapitalize: "off",
                    autocorrect: "off",
                    name: "passwordUnlock",
                    required: true,
                    id: "passwordUnlock",
                    oninput: function oninput(_ref3) {
                        var value = _ref3.target.value;

                        model.passwordUnlock = value;
                    } })
            )
        ),
        formUnlock__ref4
    );
};

/* harmony default export */ var auth_formUnlock = (formUnlock_formUnlock);
// EXTERNAL MODULE: ../node_modules/u2f-api/dist/index.js
var dist = __webpack_require__("GBfU");
var dist_default = /*#__PURE__*/__webpack_require__.n(dist);

// EXTERNAL MODULE: ./helpers/u2f.js
var u2f = __webpack_require__("Bypu");

// CONCATENATED MODULE: ./components/auth/formSignU2F.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








/**
 * Form for the login 2FA action.
 */

var formSignU2F__ref = Object(preact_min["h"])(
    'div',
    null,
    Object(preact_min["h"])(
        'p',
        null,
        'Your browser is not supported, please use another 2FA method instead'
    )
);

var formSignU2F__ref2 = Object(preact_min["h"])(
    'div',
    null,
    Object(preact_min["h"])(
        'p',
        null,
        'Success'
    )
);

var _ref3 = Object(preact_min["h"])(
    'p',
    null,
    'Activate your security key...'
);

var formSignU2F_FormSignU2F = function (_Component) {
    _inherits(FormSignU2F, _Component);

    function FormSignU2F() {
        _classCallCheck(this, FormSignU2F);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    FormSignU2F.prototype.sendSignRequest = function sendSignRequest() {
        var _props$auth$twoFactor = this.props.auth.twoFactorResponse,
            success = _props$auth$twoFactor.success,
            _props$auth$twoFactor2 = _props$auth$twoFactor.U2FResponse;
        _props$auth$twoFactor2 = _props$auth$twoFactor2 === undefined ? {} : _props$auth$twoFactor2;
        var _props$auth$twoFactor3 = _props$auth$twoFactor2.metaData;
        _props$auth$twoFactor3 = _props$auth$twoFactor3 === undefined ? {} : _props$auth$twoFactor3;
        var code = _props$auth$twoFactor3.code;


        if (!success && code) {

            if (code === u2f["a" /* ERROR_CODE */].TIMEOUT) {
                // we need an updated auth/info
                // the timeout is 1 minute on the client side, it's better
                // to redo the whole process because the challenge expire after 2 minutes.
                // funny thing, firefox uses the errorno OTHER_ERROR (1)
                return this.props.abortLoginAction();
            }
        }

        this.props.loginU2FAction();
    };

    FormSignU2F.prototype.componentDidMount = function componentDidMount() {
        this.sendSignRequest();
    };

    FormSignU2F.prototype.render = function render() {
        var _this2 = this;

        if (!Object(dist["isSupported"])()) {
            return formSignU2F__ref;
        }

        var _props$auth$twoFactor4 = this.props.auth.twoFactorResponse,
            success = _props$auth$twoFactor4.success,
            _props$auth$twoFactor5 = _props$auth$twoFactor4.U2FResponse,
            U2FResponse = _props$auth$twoFactor5 === undefined ? {} : _props$auth$twoFactor5;


        if (success && !U2FResponse.metaData) {
            return formSignU2F__ref2;
        }

        var _U2FResponse$metaData = U2FResponse.metaData;
        _U2FResponse$metaData = _U2FResponse$metaData === undefined ? {} : _U2FResponse$metaData;
        var code = _U2FResponse$metaData.code;


        return Object(preact_min["h"])(
            'div',
            { id: this.props.id, className: this.props.className },
            _ref3,
            !success && !!code && Object(preact_min["h"])(
                'p',
                null,
                Object(preact_min["h"])(
                    'span',
                    null,
                    Object(u2f["b" /* getErrorMessage */])(code),
                    '. '
                ),
                Object(preact_min["h"])(
                    'button',
                    { onClick: function onClick() {
                            return _this2.sendSignRequest();
                        }, type: 'button' },
                    'Retry'
                )
            )
        );
    };

    return FormSignU2F;
}(preact_min["Component"]);

/* harmony default export */ var formSignU2F = (Object(preact["connect"])('auth', authentication["a" /* default */])(formSignU2F_FormSignU2F));
// EXTERNAL MODULE: ./components/auth/style.css
var auth_style = __webpack_require__("fF25");
var auth_style_default = /*#__PURE__*/__webpack_require__.n(auth_style);

// CONCATENATED MODULE: ./components/auth/formLogin2FA.js







var formLogin2FA__ref2 = Object(preact_min["h"])(
    'legend',
    null,
    ' Choose one of the following 2FA methods'
);

var formLogin2FA__ref3 = Object(preact_min["h"])(
    'label',
    { htmlFor: 'password2FA' },
    '2FA code'
);

var _ref5 = Object(preact_min["h"])(
    'label',
    { htmlFor: 'u2fKey' },
    'Security key'
);

var formLogin2FA__ref6 = Object(preact_min["h"])(
    'button',
    null,
    'Login'
);

var formLogin2FA_formLogin2FA = function formLogin2FA(_ref) {
    var _h;

    var login2FA = _ref.login2FA,
        _ref$twoFactorData = _ref.twoFactorData,
        _ref$twoFactorData$is = _ref$twoFactorData.isTOTP,
        isTOTP = _ref$twoFactorData$is === undefined ? true : _ref$twoFactorData$is,
        U2FRequest = _ref$twoFactorData.U2F;

    var model = {};
    return Object(preact_min["h"])(
        'form',
        { onsubmit: function onsubmit(e) {
                return e.preventDefault(), login2FA(model);
            } },
        Object(preact_min["h"])(
            'fieldset',
            null,
            formLogin2FA__ref2,
            Object(preact_min["h"])(
                'div',
                null,
                formLogin2FA__ref3,
                Object(preact_min["h"])(
                    'div',
                    { className: auth_style_default.a.twoFactorOption },
                    Object(preact_min["h"])('input', (_h = {
                        type: 'text',
                        name: 'password2FA',
                        id: 'password2FA',
                        autocapitalize: 'off',
                        autocorrect: 'off',
                        autocomplete: 'off'
                    }, _h['type'] = 'text', _h.minlength = '6', _h.maxlength = '8', _h.required = true, _h.oninput = function oninput(_ref4) {
                        var value = _ref4.target.value;

                        model.password2FA = value;
                    }, _h))
                )
            ),
            U2FRequest && Object(preact_min["h"])(
                'div',
                null,
                _ref5,
                Object(preact_min["h"])(formSignU2F, { id: 'u2fKey', className: auth_style_default.a.twoFactorOption })
            )
        ),
        formLogin2FA__ref6
    );
};

/* harmony default export */ var auth_formLogin2FA = (formLogin2FA_formLogin2FA);
// CONCATENATED MODULE: ../node_modules/babel-loader/lib??ref--0!./routes/home/index.js











/* harmony default export */ var home = __webpack_exports__["default"] = (Object(preact["connect"])(['auth'], authentication["a" /* default */])(function (_ref) {
  var auth = _ref.auth,
      loginAction = _ref.loginAction,
      login2FAAction = _ref.login2FAAction,
      unlockAction = _ref.unlockAction;

  console.log('LOGIN', auth);
  return Object(preact_min["h"])(
    'div',
    { className: style_default.a.home },
    auth.step === 'login' && Object(preact_min["h"])(auth_formLogin, { login: loginAction }),
    auth.step === 'unlock' && Object(preact_min["h"])(auth_formUnlock, { unlock: unlockAction }),
    auth.step === '2fa' && Object(preact_min["h"])(auth_formLogin2FA, { login2FA: login2FAAction, twoFactorData: auth.twoFactorData })
  );
}));

/***/ })

});
//# sourceMappingURL=route-home.chunk.fc940.js.map