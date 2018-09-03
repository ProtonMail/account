webpackJsonp([2],{

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

/***/ "r0Pb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unistore_full_preact__ = __webpack_require__("jrcW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_unistore_full_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_unistore_full_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_ui_TextButton__ = __webpack_require__("nkmZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers_notification__ = __webpack_require__("XFC7");






/* harmony default export */ __webpack_exports__["default"] = (Object(__WEBPACK_IMPORTED_MODULE_1_unistore_full_preact__["connect"])(['auth', 'config'])(function (_ref) {
    var auth = _ref.auth,
        config = _ref.config;

    console.log('DASHBOARD', auth);
    return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
        'div',
        { id: 'dashboard', style: 'margin-top: 100px' },
        Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'h1',
            null,
            'Bonjour ',
            Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
                'b',
                null,
                auth.user.Name
            )
        ),
        Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            __WEBPACK_IMPORTED_MODULE_2__components_ui_TextButton__["a" /* default */],
            {
                onClick: function onClick() {
                    var id = Math.floor(Math.random() * 100) + 1;
                    Object(__WEBPACK_IMPORTED_MODULE_3__helpers_notification__["b" /* info */])('Test notification ' + id, { id: id });
                }
            },
            'Send a test notification'
        ),
        Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
            'pre',
            null,
            JSON.stringify(config, null, 2)
        )
    );
}));

/***/ }),

/***/ "w/aI":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"a":"a__2-NsR"};

/***/ })

});
//# sourceMappingURL=route-dashboard.chunk.f0c0f.js.map