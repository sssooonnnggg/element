module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(134);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	/* globals __VUE_SSR_CONTEXT__ */

	// this module is a runtime utility for cleaner component module output and will
	// be included in the final webpack user bundle

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  injectStyles,
	  scopeId,
	  moduleIdentifier /* server only */
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  var hook
	  if (moduleIdentifier) { // server build
	    hook = function (context) {
	      // 2.3 injection
	      context = context || (this.$vnode && this.$vnode.ssrContext)
	      // 2.2 with runInNewContext: true
	      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
	        context = __VUE_SSR_CONTEXT__
	      }
	      // inject component styles
	      if (injectStyles) {
	        injectStyles.call(this, context)
	      }
	      // register component module identifier for async chunk inferrence
	      if (context && context._registeredComponents) {
	        context._registeredComponents.add(moduleIdentifier)
	      }
	    }
	    // used by ssr in case component is cached and beforeCreate
	    // never gets called
	    options._ssrRegister = hook
	  } else if (injectStyles) {
	    hook = injectStyles
	  }

	  if (hook) {
	    // inject component registration as beforeCreate hook
	    var existing = options.beforeCreate
	    options.beforeCreate = existing
	      ? [].concat(existing, hook)
	      : [hook]
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/mixins/emitter");

/***/ },

/***/ 134:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _component = __webpack_require__(135);

	var _component2 = _interopRequireDefault(_component);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_component2.default.install = function (Vue) {
	  Vue.component(_component2.default.name, _component2.default);
	};

	exports.default = _component2.default;

/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(136),
	  /* template */
	  __webpack_require__(138),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 136:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _popup = __webpack_require__(137);

	var _popup2 = _interopRequireDefault(_popup);

	var _emitter = __webpack_require__(13);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	exports.default = {
	  name: "ElDialog",

	  mixins: [_popup2.default, _emitter2.default],

	  props: {
	    title: {
	      type: String,
	      default: ""
	    },

	    modal: {
	      type: Boolean,
	      default: true
	    },

	    modalAppendToBody: {
	      type: Boolean,
	      default: true
	    },

	    lockScroll: {
	      type: Boolean,
	      default: true
	    },

	    closeOnClickModal: {
	      type: Boolean,
	      default: true
	    },

	    closeOnPressEscape: {
	      type: Boolean,
	      default: true
	    },

	    showClose: {
	      type: Boolean,
	      default: true
	    },

	    size: {
	      type: String,
	      default: "small"
	    },

	    customClass: {
	      type: String,
	      default: ""
	    },

	    top: {},
	    left: {},
	    beforeClose: Function
	  },

	  data: function data() {
	    return {
	      l: 0,
	      t: 0
	    };
	  },
	  created: function created() {
	    this.t = this.top || 200;
	    this.l = this.left || -1;
	  },
	  mounted: function mounted() {
	    if (this.visible) {
	      this.rendered = true;
	      this.open();
	      this.centerDialog();
	    }
	  },


	  watch: {
	    visible: function visible(val) {
	      var _this = this;

	      this.$emit("update:visible", val);
	      if (val) {
	        this.$emit("open");
	        this.$el.addEventListener("scroll", this.updatePopper);
	        this.$nextTick(function () {
	          _this.$refs.dialog.scrollTop = 0;
	          _this.centerDialog();
	        });
	      } else {
	        this.$el.removeEventListener("scroll", this.updatePopper);
	        this.$emit("close");
	      }
	    }
	  },

	  computed: {
	    sizeClass: function sizeClass() {
	      return "el-dialog--" + this.size;
	    },
	    style: function style() {
	      return {
	        top: this.realTop,
	        left: this.realLeft
	      };
	    },
	    realTop: function realTop() {
	      return this.t + "px";
	    },
	    realLeft: function realLeft() {
	      return typeof this.l == "string" ? this.l : this.l + "px";
	    }
	  },

	  methods: {
	    centerDialog: function centerDialog() {
	      var dialog = this.$refs.dialog;
	      var parent = document.documentElement;

	      if (!this.left) {
	        this.l = (parent.offsetWidth - dialog.offsetWidth) / 2;
	      }
	    },
	    handleWrapperClick: function handleWrapperClick() {
	      // if (!this.closeOnClickModal) return;
	      // this.handleClose();

	      this.$emit("wrapper-clicked");
	    },
	    handleClose: function handleClose() {
	      if (typeof this.beforeClose === "function") {
	        this.beforeClose(this.hide);
	      } else {
	        this.hide();
	      }
	    },
	    move: function move(x, y) {
	      this.l += x;
	      this.t += y;

	      this.updateBounding();
	    },
	    updateBounding: function updateBounding() {
	      var dialog = this.$refs.dialog;
	      var parent = document.documentElement;
	      var dialogWidth = dialog.offsetWidth;
	      var dialogHeight = dialog.offsetHeight;

	      this.l = this.l < 0 ? 0 : this.l;
	      this.t = this.t < 0 ? 0 : this.t;
	      this.l = this.l + dialogWidth > parent.offsetWidth ? parent.offsetWidth - dialogWidth : this.l;
	      this.t = this.t + dialogHeight > parent.offsetHeight ? parent.offsetHeight - dialogHeight : this.t;
	    },
	    hide: function hide(cancel) {
	      if (cancel !== false) {
	        this.$emit("update:visible", false);
	        this.$emit("visible-change", false);
	      }
	    },
	    updatePopper: function updatePopper() {
	      this.broadcast("ElSelectDropdown", "updatePopper");
	      this.broadcast("ElDropdownMenu", "updatePopper");
	    },
	    handleMouseDown: function handleMouseDown(e) {
	      this.dragging = true;
	      this.dragPos = {
	        x: e.clientX,
	        y: e.clientY
	      };
	      this.oldPos = {
	        l: this.l,
	        t: this.t
	      };
	    },
	    handleMouseMove: function handleMouseMove(e) {
	      if (!this.dragging) {
	        return;
	      }

	      var delta = {
	        x: e.clientX - this.dragPos.x,
	        y: e.clientY - this.dragPos.y
	      };

	      this.l = this.oldPos.l + delta.x;
	      this.t = this.oldPos.t + delta.y;

	      this.updateBounding();
	    },
	    handleMouseUp: function handleMouseUp(e) {
	      this.dragging = false;
	    }
	  }
	};

/***/ },

/***/ 137:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/popup");

/***/ },

/***/ 138:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.visible),
	      expression: "visible"
	    }],
	    staticClass: "el-dialog__wrapper",
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.handleWrapperClick,
	      "mousemove": _vm.handleMouseMove
	    }
	  }, [_c('div', {
	    ref: "dialog",
	    staticClass: "el-dialog",
	    class: [_vm.sizeClass, _vm.customClass],
	    style: (_vm.style),
	    on: {
	      "mousedown": _vm.handleMouseDown,
	      "mouseup": _vm.handleMouseUp
	    }
	  }, [_c('div', {
	    staticClass: "el-dialog__header"
	  }, [_vm._t("title", [_c('span', {
	    staticClass: "el-dialog__title"
	  }, [_vm._v(_vm._s(_vm.title))])]), (_vm.showClose) ? _c('button', {
	    staticClass: "el-dialog__headerbtn",
	    attrs: {
	      "type": "button",
	      "aria-label": "Close"
	    },
	    on: {
	      "click": _vm.handleClose
	    }
	  }, [_c('i', {
	    staticClass: "el-dialog__close el-icon el-icon-close"
	  })]) : _vm._e()], 2), (_vm.rendered) ? _c('div', {
	    staticClass: "el-dialog__body"
	  }, [_vm._t("default")], 2) : _vm._e(), (_vm.$slots.footer) ? _c('div', {
	    staticClass: "el-dialog__footer"
	  }, [_vm._t("footer")], 2) : _vm._e()])])
	},staticRenderFns: []}

/***/ }

/******/ });