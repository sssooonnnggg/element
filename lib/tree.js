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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(353);


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

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
	      context =
	        context || // cached call
	        (this.$vnode && this.$vnode.ssrContext) || // stateful
	        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
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
	    var functional = options.functional
	    var existing = functional
	      ? options.render
	      : options.beforeCreate
	    if (!functional) {
	      // inject component registration as beforeCreate hook
	      options.beforeCreate = existing
	        ? [].concat(existing, hook)
	        : [hook]
	    } else {
	      // register for functioal component in vue file
	      options.render = function renderWithStyleInjection (h, context) {
	        hook.call(context)
	        return existing(h, context)
	      }
	    }
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ }),

/***/ 13:
/***/ (function(module, exports) {

	module.exports = require("element-ui/lib/mixins/emitter");

/***/ }),

/***/ 62:
/***/ (function(module, exports) {

	module.exports = require("element-ui/lib/locale");

/***/ }),

/***/ 85:
/***/ (function(module, exports) {

	module.exports = require("element-ui/lib/transitions/collapse-transition");

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

	module.exports = require("element-ui/lib/utils/merge");

/***/ }),

/***/ 307:
/***/ (function(module, exports) {

	module.exports = require("element-ui/lib/checkbox");

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tree = __webpack_require__(354);

	var _tree2 = _interopRequireDefault(_tree);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_tree2.default.install = function (Vue) {
	  Vue.component(_tree2.default.name, _tree2.default);
	};

	exports.default = _tree2.default;

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(355),
	  /* template */
	  __webpack_require__(367),
	  /* styles */
	  null,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _name$mixins$componen; //
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

	var _treeStore = __webpack_require__(356);

	var _treeStore2 = _interopRequireDefault(_treeStore);

	var _locale = __webpack_require__(62);

	var _emitter = __webpack_require__(13);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (_name$mixins$componen = {
	  name: "ElTree",

	  mixins: [_emitter2.default],

	  components: {
	    ElTreeNode: __webpack_require__(359)
	  },

	  data: function data() {
	    return {
	      store: null,
	      root: null,
	      currentNode: null
	    };
	  },


	  props: {
	    data: {
	      type: Array
	    },
	    emptyText: {
	      type: String,
	      default: function _default() {
	        return (0, _locale.t)("el.tree.emptyText");
	      }
	    },
	    nodeKey: String,
	    checkStrictly: Boolean,
	    defaultExpandAll: Boolean,
	    expandOnClickNode: {
	      type: Boolean,
	      default: true
	    },
	    autoExpandParent: {
	      type: Boolean,
	      default: true
	    },
	    defaultCheckedKeys: Array,
	    defaultExpandedKeys: Array,
	    renderContent: Function,
	    showCheckbox: {
	      type: Boolean,
	      default: false
	    },
	    props: {
	      default: function _default() {
	        return {
	          children: "children",
	          label: "label",
	          icon: "icon"
	        };
	      }
	    },
	    lazy: {
	      type: Boolean,
	      default: false
	    },
	    highlightCurrent: Boolean,
	    currentNodeKey: [String, Number],
	    load: Function,
	    filterNodeMethod: Function,
	    accordion: Boolean,
	    indent: {
	      type: Number,
	      default: 16
	    },
	    showCombineLine: {
	      type: Boolean,
	      default: true
	    },
	    draggable: {
	      type: Boolean,
	      default: false
	    },
	    isActive: {
	      type: Boolean,
	      default: true
	    },
	    isDragValid: {
	      default: null
	    },
	    isDropValid: {
	      default: null
	    },
	    shouldShowDragIndicator: {
	      default: null
	    },
	    enableShadow: {
	      default: false
	    }
	  },

	  mounted: function mounted() {},


	  computed: {
	    children: {
	      set: function set(value) {
	        this.data = value;
	      },
	      get: function get() {
	        return this.data;
	      }
	    }
	  },

	  watch: {
	    defaultCheckedKeys: function defaultCheckedKeys(newVal) {
	      this.store.defaultCheckedKeys = newVal;
	      this.store.setDefaultCheckedKey(newVal);
	    },
	    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
	      this.store.defaultExpandedKeys = newVal;
	      this.store.setDefaultExpandedKeys(newVal);
	    },
	    currentNodeKey: function currentNodeKey(newVal) {
	      this.store.setCurrentNodeKey(newVal);
	      this.store.currentNodeKey = newVal;
	    },
	    data: function data(newVal) {
	      this.store.setData(newVal);
	    },
	    isActive: function isActive(newVal) {
	      if (newVal) {
	        if (this.draggable) {}
	      }
	    }
	  },

	  methods: {
	    filter: function filter(value) {
	      if (!this.filterNodeMethod) throw new Error("[Tree] filterNodeMethod is required when filter");
	      this.store.filter(value);
	    },
	    getNodeKey: function getNodeKey(node, index) {
	      var nodeKey = this.nodeKey;
	      if (nodeKey && node) {
	        return node.data[nodeKey];
	      }
	      return index;
	    },
	    getCheckedNodes: function getCheckedNodes(leafOnly) {
	      return this.store.getCheckedNodes(leafOnly);
	    },
	    getCheckedKeys: function getCheckedKeys(leafOnly) {
	      return this.store.getCheckedKeys(leafOnly);
	    },
	    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
	      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCheckedNodes");
	      this.store.setCheckedNodes(nodes, leafOnly);
	    },
	    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
	      if (!this.nodeKey) throw new Error("[Tree] nodeKey is required in setCheckedNodes");
	      this.store.setCheckedKeys(keys, leafOnly);
	    },
	    setChecked: function setChecked(data, checked, deep) {
	      this.store.setChecked(data, checked, deep);
	    },
	    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
	      this.broadcast("ElTreeNode", "tree-node-expand", node);
	      this.$emit("node-expand", nodeData, node, instance);
	    },
	    selectNode: function selectNode(data) {
	      var node = this.store.getNode(data);
	      if (node) {
	        var store = this.store;
	        if (store.currentNode != undefined) store.currentNode.isCurrent = false;
	        node.isCurrent = true;
	        store.setCurrentNode(node);
	        this.$emit("current-change", store.currentNode ? store.currentNode.data : null, store.currentNode);
	        node.expandParent();
	      }
	    },
	    collapseAllNode: function collapseAllNode(data) {
	      var node = this.store.getNode(data);
	      if (node) {
	        node.collapseAll();
	      }
	    },
	    expandAllNode: function expandAllNode(data) {
	      var node = this.store.getNode(data);
	      if (node) {
	        node.expandAll();
	      }
	    },
	    expandNode: function expandNode(data) {
	      var node = this.store.getNode(data);
	      if (node) {
	        node.expand();
	      }
	    },
	    collapseNode: function collapseNode(data) {
	      var node = this.store.getNode(data);
	      if (node) {
	        node.collapse();
	      }
	    },
	    toggleNode: function toggleNode(data) {
	      var node = this.store.getNode(data);
	      if (node.expanded) {
	        node.collapse();
	      } else {
	        node.expand();
	      }
	    },
	    hide: function hide(id) {
	      var node = this.store.getNode(id);
	      if (node) {
	        node.visible = false;
	        node.data.visible = false;
	      }
	    },
	    show: function show(id) {
	      var node = this.store.getNode(id);
	      if (node) {
	        node.visible = true;
	        node.data.visible = true;
	      }
	    },
	    updateIndent: function updateIndent(id) {
	      var node = this.store.getNode(id);
	      node.updateIndent();
	    },
	    isVisible: function isVisible(id) {
	      var el = document.getElementById(id);
	      if (el) {
	        return el && el.offsetParent != null;
	      }
	    },
	    isDragValidImpl: function isDragValidImpl(node) {
	      if (!this.draggable || !this.isDragValid) {
	        return false;
	      }

	      return this.isDragValid(node.data);
	    },
	    isDropValidImpl: function isDropValidImpl(node, target) {
	      if (!this.draggable) {
	        return false;
	      }

	      if (!this.isDropValid) {
	        return true;
	      }

	      return this.isDropValid(node.data, target.data);
	    },
	    shouldShowDragIndicatorImpl: function shouldShowDragIndicatorImpl(node) {
	      if (!this.draggable) {
	        return false;
	      }

	      if (!this.shouldShowDragIndicator) {
	        return true;
	      }

	      return this.shouldShowDragIndicator(node.data);
	    }
	  },

	  created: function created() {
	    this.isTree = true;

	    this.store = new _treeStore2.default({
	      key: this.nodeKey,
	      data: this.data,
	      lazy: this.lazy,
	      props: this.props,
	      load: this.load,
	      currentNodeKey: this.currentNodeKey,
	      checkStrictly: this.checkStrictly,
	      defaultCheckedKeys: this.defaultCheckedKeys,
	      defaultExpandedKeys: this.defaultExpandedKeys,
	      autoExpandParent: this.autoExpandParent,
	      defaultExpandAll: this.defaultExpandAll,
	      filterNodeMethod: this.filterNodeMethod
	    });

	    this.root = this.store.root;
	  }
	}, _name$mixins$componen["mounted"] = function mounted() {
	  if (this.draggable) {}
	}, _name$mixins$componen.beforeDestroy = function beforeDestroy() {}, _name$mixins$componen);

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _node = __webpack_require__(357);

	var _node2 = _interopRequireDefault(_node);

	var _util = __webpack_require__(358);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TreeStore = function () {
	  function TreeStore(options) {
	    var _this = this;

	    _classCallCheck(this, TreeStore);

	    this.currentNode = null;
	    this.currentNodeKey = null;

	    for (var option in options) {
	      if (options.hasOwnProperty(option)) {
	        this[option] = options[option];
	      }
	    }

	    this.nodesMap = {};

	    this.root = new _node2.default({
	      data: this.data,
	      store: this
	    });

	    if (this.lazy && this.load) {
	      var loadFn = this.load;
	      loadFn(this.root, function (data) {
	        _this.root.doCreateChildren(data);
	        _this._initDefaultCheckedNodes();
	      });
	    } else {
	      this._initDefaultCheckedNodes();
	    }
	  }

	  TreeStore.prototype.filter = function filter(value) {
	    var filterNodeMethod = this.filterNodeMethod;
	    var traverse = function traverse(node) {
	      var childNodes = node.root ? node.root.childNodes : node.childNodes;

	      childNodes.forEach(function (child) {
	        child.visible = filterNodeMethod.call(child, value, child.data, child);

	        traverse(child);
	      });

	      if (!node.visible && childNodes.length) {
	        var allHidden = true;

	        childNodes.forEach(function (child) {
	          if (child.visible) allHidden = false;
	        });

	        if (node.root) {
	          node.root.visible = allHidden === false;
	        } else {
	          node.visible = allHidden === false;
	        }
	      }

	      if (node.visible && !node.isLeaf) node.expand();
	    };

	    traverse(this);
	  };

	  TreeStore.prototype.setData = function setData(newVal) {
	    var instanceChanged = newVal !== this.root.data;
	    this.root.setData(newVal);
	    if (instanceChanged) {
	      this._initDefaultCheckedNodes();
	    }
	  };

	  TreeStore.prototype.getNode = function getNode(data) {
	    var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : (0, _util.getNodeKey)(this.key, data);
	    return this.nodesMap[key];
	  };

	  TreeStore.prototype.insertBefore = function insertBefore(data, refData) {
	    var refNode = this.getNode(refData);
	    refNode.parent.insertBefore({ data: data }, refNode);
	  };

	  TreeStore.prototype.insertAfter = function insertAfter(data, refData) {
	    var refNode = this.getNode(refData);
	    refNode.parent.insertAfter({ data: data }, refNode);
	  };

	  TreeStore.prototype.remove = function remove(data) {
	    var node = this.getNode(data);
	    if (node) {
	      node.parent.removeChild(node);
	    }
	  };

	  TreeStore.prototype.append = function append(data, parentData) {
	    var parentNode = parentData ? this.getNode(parentData) : this.root;

	    if (parentNode) {
	      parentNode.insertChild({ data: data });
	    }
	  };

	  TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
	    var _this2 = this;

	    var defaultCheckedKeys = this.defaultCheckedKeys || [];
	    var nodesMap = this.nodesMap;

	    defaultCheckedKeys.forEach(function (checkedKey) {
	      var node = nodesMap[checkedKey];

	      if (node) {
	        node.setChecked(true, !_this2.checkStrictly);
	      }
	    });
	  };

	  TreeStore.prototype._initDefaultCheckedNode = function _initDefaultCheckedNode(node) {
	    var defaultCheckedKeys = this.defaultCheckedKeys || [];

	    if (defaultCheckedKeys.indexOf(node.key) !== -1) {
	      node.setChecked(true, !this.checkStrictly);
	    }
	  };

	  TreeStore.prototype.setDefaultCheckedKey = function setDefaultCheckedKey(newVal) {
	    if (newVal !== this.defaultCheckedKeys) {
	      this.defaultCheckedKeys = newVal;
	      this._initDefaultCheckedNodes();
	    }
	  };

	  TreeStore.prototype.registerNode = function registerNode(node) {
	    var key = this.key;
	    if (!key || !node || !node.data) return;

	    var nodeKey = node.key;
	    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
	  };

	  TreeStore.prototype.deregisterNode = function deregisterNode(node) {
	    var key = this.key;
	    if (!key || !node || !node.data) return;

	    delete this.nodesMap[node.key];
	  };

	  TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
	    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var checkedNodes = [];
	    var traverse = function traverse(node) {
	      var childNodes = node.root ? node.root.childNodes : node.childNodes;

	      childNodes.forEach(function (child) {
	        if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
	          checkedNodes.push(child.data);
	        }

	        traverse(child);
	      });
	    };

	    traverse(this);

	    return checkedNodes;
	  };

	  TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
	    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var key = this.key;
	    var allNodes = this._getAllNodes();
	    var keys = [];
	    allNodes.forEach(function (node) {
	      if (!leafOnly || leafOnly && node.isLeaf) {
	        if (node.checked) {
	          keys.push((node.data || {})[key]);
	        }
	      }
	    });
	    return keys;
	  };

	  TreeStore.prototype._getAllNodes = function _getAllNodes() {
	    var allNodes = [];
	    var nodesMap = this.nodesMap;
	    for (var nodeKey in nodesMap) {
	      if (nodesMap.hasOwnProperty(nodeKey)) {
	        allNodes.push(nodesMap[nodeKey]);
	      }
	    }

	    return allNodes;
	  };

	  TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
	    var _this3 = this;

	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    var checkedKeys = arguments[2];

	    var allNodes = this._getAllNodes();
	    allNodes.sort(function (a, b) {
	      return b.level - a.level;
	    });

	    var keys = Object.keys(checkedKeys);
	    allNodes.forEach(function (node) {
	      var checked = keys.indexOf(node.data[key] + '') > -1;

	      if (!node.isLeaf) {
	        if (!_this3.checkStrictly) {
	          var childNodes = node.childNodes;

	          var all = true;
	          var none = true;

	          for (var i = 0, j = childNodes.length; i < j; i++) {
	            var child = childNodes[i];
	            if (child.checked !== true || child.indeterminate) {
	              all = false;
	            }
	            if (child.checked !== false || child.indeterminate) {
	              none = false;
	            }
	          }

	          if (all) {
	            node.setChecked(true, !_this3.checkStrictly);
	          } else if (!all && !none) {
	            checked = checked ? true : 'half';
	            node.setChecked(checked, !_this3.checkStrictly && checked === true);
	          } else if (none) {
	            node.setChecked(checked, !_this3.checkStrictly);
	          }
	        } else {
	          node.setChecked(checked, false);
	        }

	        if (leafOnly) {
	          node.setChecked(false, false);
	          var traverse = function traverse(node) {
	            var childNodes = node.childNodes;

	            childNodes.forEach(function (child) {
	              if (!child.isLeaf) {
	                child.setChecked(false, false);
	              }
	              traverse(child);
	            });
	          };

	          traverse(node);
	        }
	      } else {
	        node.setChecked(checked, false);
	      }
	    });
	  };

	  TreeStore.prototype.setCheckedNodes = function setCheckedNodes(array) {
	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    var key = this.key;
	    var checkedKeys = {};
	    array.forEach(function (item) {
	      checkedKeys[(item || {})[key]] = true;
	    });

	    this._setCheckedKeys(key, leafOnly, checkedKeys);
	  };

	  TreeStore.prototype.setCheckedKeys = function setCheckedKeys(keys) {
	    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    this.defaultCheckedKeys = keys;
	    var key = this.key;
	    var checkedKeys = {};
	    keys.forEach(function (key) {
	      checkedKeys[key] = true;
	    });

	    this._setCheckedKeys(key, leafOnly, checkedKeys);
	  };

	  TreeStore.prototype.setDefaultExpandedKeys = function setDefaultExpandedKeys(keys) {
	    var _this4 = this;

	    keys = keys || [];
	    this.defaultExpandedKeys = keys;

	    keys.forEach(function (key) {
	      var node = _this4.getNode(key);
	      if (node) node.expand(null, _this4.autoExpandParent);
	    });
	  };

	  TreeStore.prototype.setChecked = function setChecked(data, checked, deep) {
	    var node = this.getNode(data);

	    if (node) {
	      node.setChecked(!!checked, deep);
	    }
	  };

	  TreeStore.prototype.getCurrentNode = function getCurrentNode() {
	    return this.currentNode;
	  };

	  TreeStore.prototype.setCurrentNode = function setCurrentNode(node) {
	    this.currentNode = node;
	  };

	  TreeStore.prototype.setCurrentNodeKey = function setCurrentNodeKey(key) {
	    var node = this.getNode(key);
	    if (node) {
	      this.currentNode = node;
	    }
	  };

	  return TreeStore;
	}();

	exports.default = TreeStore;
	;

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _merge = __webpack_require__(169);

	var _merge2 = _interopRequireDefault(_merge);

	var _util = __webpack_require__(358);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var reInitChecked = function reInitChecked(node) {
	  var siblings = node.childNodes;

	  var all = true;
	  var none = true;

	  for (var i = 0, j = siblings.length; i < j; i++) {
	    var sibling = siblings[i];
	    if (sibling.checked !== true || sibling.indeterminate) {
	      all = false;
	    }
	    if (sibling.checked !== false || sibling.indeterminate) {
	      none = false;
	    }
	  }

	  if (all) {
	    node.setChecked(true);
	  } else if (!all && !none) {
	    node.setChecked("half");
	  } else if (none) {
	    node.setChecked(false);
	  }
	};

	var getPropertyFromData = function getPropertyFromData(node, prop) {
	  var props = node.store.props;
	  var data = node.data || {};
	  var config = props[prop];

	  if (typeof config === "function") {
	    return config(data, node);
	  } else if (typeof config === "string") {
	    return data[config];
	  } else if (typeof config === "undefined") {
	    return "";
	  }
	};

	var nodeIdSeed = 0;

	var Node = function () {
	  function Node(options) {
	    _classCallCheck(this, Node);

	    this.id = nodeIdSeed++;
	    this.text = null;
	    this.checked = false;
	    this.indeterminate = false;
	    this.data = null;
	    this.expanded = false;
	    this.parent = null;
	    this.visible = true;
	    this.noIndent = false;
	    this.isCurrent = false;

	    for (var name in options) {
	      if (options.hasOwnProperty(name)) {
	        this[name] = options[name];
	      }
	    }

	    // internal
	    this.level = 0;
	    this.indent = 0;
	    this.loaded = false;
	    this.childNodes = [];
	    this.loading = false;

	    if (this.parent) {
	      this.level = this.parent.level + 1;
	    }

	    var store = this.store;
	    if (!store) {
	      throw new Error("[Node]store is required!");
	    }
	    store.registerNode(this);

	    var props = store.props;
	    if (props && typeof props.isLeaf !== "undefined") {
	      var isLeaf = getPropertyFromData(this, "isLeaf");
	      if (typeof isLeaf === "boolean") {
	        this.isLeafByUser = isLeaf;
	      }
	    }

	    if (store.lazy !== true && this.data) {
	      if (this.data.noIndent) {
	        this.noIndent = true;
	      } else {
	        this.noIndent = false;
	      }

	      if (this.parent) {
	        this.indent = this.noIndent || this.hiddenSelf ? this.parent.indent : this.parent.indent + 1;
	      }

	      this.setData(this.data);

	      if (store.defaultExpandAll) {
	        this.expanded = true;
	      }

	      if (this.data.expand) {
	        this.expanded = true;
	      } else {
	        this.expanded = false;
	      }

	      if (this.data.visible != undefined) {
	        this.visible = this.data.visible;
	      }
	    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
	      this.expand();
	    }

	    if (!this.data) return;
	    var defaultExpandedKeys = store.defaultExpandedKeys;
	    var key = store.key;
	    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
	      this.expand(null, store.autoExpandParent);
	    }

	    if (key && store.currentNodeKey && this.key === store.currentNodeKey) {
	      store.currentNode = this;
	    }

	    if (store.lazy) {
	      store._initDefaultCheckedNode(this);
	    }

	    this.updateLeafState();
	  }

	  Node.prototype.setData = function setData(data) {
	    if (!Array.isArray(data)) {
	      (0, _util.markNodeData)(this, data);
	    }

	    this.data = data;
	    this.childNodes = [];

	    var children = void 0;
	    if (this.level === 0 && this.data instanceof Array) {
	      children = this.data;
	    } else {
	      children = getPropertyFromData(this, "children") || [];
	    }

	    for (var i = 0, j = children.length; i < j; i++) {
	      this.insertChild({
	        data: children[i]
	      });
	    }
	  };

	  Node.prototype.updateIndent = function updateIndent() {
	    if (this.parent) {
	      this.indent = this.noIndent || this.hiddenSelf ? this.parent.indent : this.parent.indent + 1;
	    }
	  };

	  Node.prototype.insertChild = function insertChild(child, index) {
	    if (!child) throw new Error("insertChild error: child is required.");

	    if (!(child instanceof Node)) {
	      (0, _merge2.default)(child, {
	        parent: this,
	        store: this.store
	      });
	      child = new Node(child);
	    }

	    child.level = this.level + 1;

	    if (typeof index === "undefined" || index < 0) {
	      this.childNodes.push(child);
	    } else {
	      this.childNodes.splice(index, 0, child);
	    }

	    this.updateLeafState();
	    if (this.parent) {
	      this.parent.updateLeafState();
	    }
	  };

	  Node.prototype.insertBefore = function insertBefore(child, ref) {
	    var index = void 0;
	    if (ref) {
	      index = this.childNodes.indexOf(ref);
	    }
	    this.insertChild(child, index);
	  };

	  Node.prototype.insertAfter = function insertAfter(child, ref) {
	    var index = void 0;
	    if (ref) {
	      index = this.childNodes.indexOf(ref);
	      if (index !== -1) index += 1;
	    }
	    this.insertChild(child, index);
	  };

	  Node.prototype.removeChild = function removeChild(child) {
	    var index = this.childNodes.indexOf(child);

	    if (index > -1) {
	      this.store && this.store.deregisterNode(child);
	      child.parent = null;
	      this.childNodes.splice(index, 1);
	    }

	    this.updateLeafState();
	    if (this.hiddenSelf && this.parent) {
	      this.parent.updateLeafState();
	    }
	  };

	  Node.prototype.removeChildByData = function removeChildByData(data) {
	    var targetNode = null;
	    this.childNodes.forEach(function (node) {
	      if (node.data === data) {
	        targetNode = node;
	      }
	    });

	    if (targetNode) {
	      this.removeChild(targetNode);
	    }
	  };

	  Node.prototype.expand = function expand(callback, expandParent) {
	    var _this = this;

	    var done = function done() {
	      if (expandParent) {
	        var parent = _this.parent;
	        while (parent.level > 0) {
	          parent.expanded = true;
	          parent = parent.parent;
	        }
	      }
	      _this.expanded = true;
	      if (callback) callback();
	    };

	    if (this.shouldLoadData()) {
	      this.loadData(function (data) {
	        if (data instanceof Array) {
	          done();
	        }
	      });
	    } else {
	      done();
	    }
	  };

	  Node.prototype.expandParent = function expandParent() {
	    var parent = this.parent;
	    while (parent && parent.level > 0) {
	      parent.expanded = true;
	      parent = parent.parent;
	    }
	  };

	  Node.prototype.doCreateChildren = function doCreateChildren(array) {
	    var _this2 = this;

	    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    array.forEach(function (item) {
	      _this2.insertChild((0, _merge2.default)({
	        data: item
	      }, defaultProps));
	    });
	  };

	  Node.prototype.collapse = function collapse() {
	    this.expanded = false;
	  };

	  Node.prototype.collapseAll = function collapseAll() {
	    var collapse = function collapse(node) {
	      node.expanded = false;
	      node.childNodes.forEach(function (child) {
	        collapse(child);
	      });
	    };
	    collapse(this);
	  };

	  Node.prototype.expandAll = function expandAll() {
	    var expand = function expand(node) {
	      node.childNodes.forEach(function (child) {
	        expand(child);
	      });
	      node.expanded = true;
	    };
	    expand(this);
	  };

	  Node.prototype.shouldLoadData = function shouldLoadData() {
	    return this.store.lazy === true && this.store.load && !this.loaded;
	  };

	  Node.prototype.updateLeafState = function updateLeafState() {
	    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== "undefined") {
	      this.isLeaf = this.isLeafByUser;
	      return;
	    }
	    var childNodes = this.childNodes;
	    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
	      var nodeIsHidden = function nodeIsHidden(node) {
	        if (!node.hidden) {
	          return false;
	        }

	        for (var _iterator = node.childNodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;

	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }

	          var childNode = _ref;

	          if (!nodeIsHidden(childNode)) {
	            return false;
	          }
	        }

	        return true;
	      };

	      this.nodeShouldHidden = nodeIsHidden(this);

	      var isDescendantHidden = function isDescendantHidden(data) {
	        if (data.childNodes == undefined || data.childNodes.length == 0) {
	          return true;
	        }
	        for (var _iterator2 = data.childNodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	          var _ref2;

	          if (_isArray2) {
	            if (_i2 >= _iterator2.length) break;
	            _ref2 = _iterator2[_i2++];
	          } else {
	            _i2 = _iterator2.next();
	            if (_i2.done) break;
	            _ref2 = _i2.value;
	          }

	          var child = _ref2;

	          if (!child.nodeShouldHidden && !child.hiddenSelf) {
	            return false;
	          }
	          if (child.hiddenSelf && !isDescendantHidden(child)) {
	            return false;
	          }
	        }

	        return true;
	      };

	      this.isLeaf = !childNodes || childNodes.length === 0 || isDescendantHidden(this);
	      return;
	    }
	    this.isLeaf = false;
	  };

	  Node.prototype.setChecked = function setChecked(value, deep) {
	    var _this3 = this;

	    this.indeterminate = value === "half";
	    this.checked = value === true;

	    var handleDescendants = function handleDescendants() {
	      if (deep) {
	        var childNodes = _this3.childNodes;
	        for (var i = 0, j = childNodes.length; i < j; i++) {
	          var child = childNodes[i];
	          child.setChecked(value !== false, deep);
	        }
	      }
	    };

	    if (!this.store.checkStrictly && this.shouldLoadData()) {
	      // Only work on lazy load data.
	      this.loadData(function () {
	        handleDescendants();
	      }, {
	        checked: value !== false
	      });
	    } else {
	      handleDescendants();
	    }

	    var parent = this.parent;
	    if (!parent || parent.level === 0) return;

	    if (!this.store.checkStrictly) {
	      reInitChecked(parent);
	    }
	  };

	  Node.prototype.getChildren = function getChildren() {
	    // this is data
	    var data = this.data;
	    if (!data) return null;

	    var props = this.store.props;
	    var children = "children";
	    if (props) {
	      children = props.children || "children";
	    }

	    if (data[children] === undefined) {
	      data[children] = null;
	    }

	    return data[children];
	  };

	  Node.prototype.updateChildren = function updateChildren() {
	    var _this4 = this;

	    var newData = this.getChildren() || [];
	    var oldData = this.childNodes.map(function (node) {
	      return node.data;
	    });

	    var newDataMap = {};
	    var newNodes = [];

	    newData.forEach(function (item, index) {
	      if (item[_util.NODE_KEY]) {
	        newDataMap[item[_util.NODE_KEY]] = {
	          index: index,
	          data: item
	        };
	      } else {
	        newNodes.push({
	          index: index,
	          data: item
	        });
	      }
	    });

	    oldData.forEach(function (item) {
	      if (!newDataMap[item[_util.NODE_KEY]]) _this4.removeChildByData(item);
	    });

	    newNodes.forEach(function (_ref3) {
	      var index = _ref3.index,
	          data = _ref3.data;

	      _this4.insertChild({
	        data: data
	      }, index);
	    });

	    this.updateLeafState();
	  };

	  Node.prototype.loadData = function loadData(callback) {
	    var _this5 = this;

	    var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    if (this.store.lazy === true && this.store.load && !this.loaded && !this.loading) {
	      this.loading = true;

	      var resolve = function resolve(children) {
	        _this5.loaded = true;
	        _this5.loading = false;
	        _this5.childNodes = [];

	        _this5.doCreateChildren(children, defaultProps);

	        _this5.updateLeafState();
	        if (callback) {
	          callback.call(_this5, children);
	        }
	      };

	      this.store.load(this, resolve);
	    } else {
	      if (callback) {
	        callback.call(this);
	      }
	    }
	  };

	  _createClass(Node, [{
	    key: "label",
	    get: function get() {
	      return getPropertyFromData(this, "label");
	    }
	  }, {
	    key: "icon",
	    get: function get() {
	      return getPropertyFromData(this, "icon");
	    }
	  }, {
	    key: "key",
	    get: function get() {
	      var nodeKey = this.store.key;
	      if (this.data) return this.data[nodeKey];
	      return null;
	    }
	  }, {
	    key: "hidden",
	    get: function get() {
	      var data = this.data || {};
	      return data.hidden ? true : false;
	    }
	  }, {
	    key: "hiddenSelf",
	    get: function get() {
	      var data = this.data || {};
	      return data.hiddenSelf ? true : false;
	    }
	  }, {
	    key: "hideCombineLine",
	    get: function get() {
	      var data = this.data || {};
	      return data.hideCombineLine ? true : false;
	    }
	  }, {
	    key: "combineLineColor",
	    get: function get() {
	      var data = this.data || {};
	      return data.combineLineColor ? data.combineLineColor : "transparent";
	    }
	  }, {
	    key: "enable",
	    get: function get() {
	      var data = this.data || {};
	      if (data.enable == undefined) return true;
	      return data.enable;
	    }
	  }, {
	    key: "valid",
	    get: function get() {
	      var data = this.data || {};
	      if (data.valid == undefined) return true;
	      return data.valid;
	    }
	  }]);

	  return Node;
	}();

	exports.default = Node;

/***/ }),

/***/ 358:
/***/ (function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var NODE_KEY = exports.NODE_KEY = '$treeNodeId';

	var markNodeData = exports.markNodeData = function markNodeData(node, data) {
	  if (data[NODE_KEY]) return;
	  Object.defineProperty(data, NODE_KEY, {
	    value: node.id,
	    enumerable: false,
	    configurable: false,
	    writable: false
	  });
	};

	var getNodeKey = exports.getNodeKey = function getNodeKey(key, data) {
	  if (!key) return data[NODE_KEY];
	  return data[key];
	};

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

	function injectStyle (ssrContext) {
	  __webpack_require__(360)
	}
	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(365),
	  /* template */
	  __webpack_require__(366),
	  /* styles */
	  injectStyle,
	  /* scopeId */
	  null,
	  /* moduleIdentifier (server only) */
	  null
	)

	module.exports = Component.exports


/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(361);
	if(typeof content === 'string') content = [[module.id, content, '']];
	if(content.locals) module.exports = content.locals;
	// add the styles to the DOM
	var update = __webpack_require__(363)("4da8dd48", content, true, {});

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(362)();
	// imports


	// module
	exports.push([module.id, "\n.el-tree-node-disabled {\r\n  opacity: 0.5;\n}\n.el-tree-node-invalid {\r\n  background-color:rgba(100, 0, 0, 1);\n}\n.node-combine-line-container {\r\n  position: relative;\n}\n.node-combine-line {\r\n  border: 3px solid black;\r\n  border-right-width: 0px;\r\n  top: 15px;\r\n  width: 10px;\r\n  bottom: 15px;\r\n  position: absolute;\n}\r\n", ""]);

	// exports


/***/ }),

/***/ 362:
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

	/*
	  MIT License http://www.opensource.org/licenses/mit-license.php
	  Author Tobias Koppers @sokra
	  Modified by Evan You @yyx990803
	*/

	var hasDocument = typeof document !== 'undefined'

	if (false) {
	  if (!hasDocument) {
	    throw new Error(
	    'vue-style-loader cannot be used in a non-browser environment. ' +
	    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
	  ) }
	}

	var listToStyles = __webpack_require__(364)

	/*
	type StyleObject = {
	  id: number;
	  parts: Array<StyleObjectPart>
	}

	type StyleObjectPart = {
	  css: string;
	  media: string;
	  sourceMap: ?string
	}
	*/

	var stylesInDom = {/*
	  [id: number]: {
	    id: number,
	    refs: number,
	    parts: Array<(obj?: StyleObjectPart) => void>
	  }
	*/}

	var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
	var singletonElement = null
	var singletonCounter = 0
	var isProduction = false
	var noop = function () {}
	var options = null
	var ssrIdKey = 'data-vue-ssr-id'

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

	module.exports = function (parentId, list, _isProduction, _options) {
	  isProduction = _isProduction

	  options = _options || {}

	  var styles = listToStyles(parentId, list)
	  addStylesToDom(styles)

	  return function update (newList) {
	    var mayRemove = []
	    for (var i = 0; i < styles.length; i++) {
	      var item = styles[i]
	      var domStyle = stylesInDom[item.id]
	      domStyle.refs--
	      mayRemove.push(domStyle)
	    }
	    if (newList) {
	      styles = listToStyles(parentId, newList)
	      addStylesToDom(styles)
	    } else {
	      styles = []
	    }
	    for (var i = 0; i < mayRemove.length; i++) {
	      var domStyle = mayRemove[i]
	      if (domStyle.refs === 0) {
	        for (var j = 0; j < domStyle.parts.length; j++) {
	          domStyle.parts[j]()
	        }
	        delete stylesInDom[domStyle.id]
	      }
	    }
	  }
	}

	function addStylesToDom (styles /* Array<StyleObject> */) {
	  for (var i = 0; i < styles.length; i++) {
	    var item = styles[i]
	    var domStyle = stylesInDom[item.id]
	    if (domStyle) {
	      domStyle.refs++
	      for (var j = 0; j < domStyle.parts.length; j++) {
	        domStyle.parts[j](item.parts[j])
	      }
	      for (; j < item.parts.length; j++) {
	        domStyle.parts.push(addStyle(item.parts[j]))
	      }
	      if (domStyle.parts.length > item.parts.length) {
	        domStyle.parts.length = item.parts.length
	      }
	    } else {
	      var parts = []
	      for (var j = 0; j < item.parts.length; j++) {
	        parts.push(addStyle(item.parts[j]))
	      }
	      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
	    }
	  }
	}

	function createStyleElement () {
	  var styleElement = document.createElement('style')
	  styleElement.type = 'text/css'
	  head.appendChild(styleElement)
	  return styleElement
	}

	function addStyle (obj /* StyleObjectPart */) {
	  var update, remove
	  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

	  if (styleElement) {
	    if (isProduction) {
	      // has SSR styles and in production mode.
	      // simply do nothing.
	      return noop
	    } else {
	      // has SSR styles but in dev mode.
	      // for some reason Chrome can't handle source map in server-rendered
	      // style tags - source maps in <style> only works if the style tag is
	      // created and inserted dynamically. So we remove the server rendered
	      // styles and inject new ones.
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  if (isOldIE) {
	    // use singleton mode for IE9.
	    var styleIndex = singletonCounter++
	    styleElement = singletonElement || (singletonElement = createStyleElement())
	    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
	    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
	  } else {
	    // use multi-style-tag mode in all other cases
	    styleElement = createStyleElement()
	    update = applyToTag.bind(null, styleElement)
	    remove = function () {
	      styleElement.parentNode.removeChild(styleElement)
	    }
	  }

	  update(obj)

	  return function updateStyle (newObj /* StyleObjectPart */) {
	    if (newObj) {
	      if (newObj.css === obj.css &&
	          newObj.media === obj.media &&
	          newObj.sourceMap === obj.sourceMap) {
	        return
	      }
	      update(obj = newObj)
	    } else {
	      remove()
	    }
	  }
	}

	var replaceText = (function () {
	  var textStore = []

	  return function (index, replacement) {
	    textStore[index] = replacement
	    return textStore.filter(Boolean).join('\n')
	  }
	})()

	function applyToSingletonTag (styleElement, index, remove, obj) {
	  var css = remove ? '' : obj.css

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = replaceText(index, css)
	  } else {
	    var cssNode = document.createTextNode(css)
	    var childNodes = styleElement.childNodes
	    if (childNodes[index]) styleElement.removeChild(childNodes[index])
	    if (childNodes.length) {
	      styleElement.insertBefore(cssNode, childNodes[index])
	    } else {
	      styleElement.appendChild(cssNode)
	    }
	  }
	}

	function applyToTag (styleElement, obj) {
	  var css = obj.css
	  var media = obj.media
	  var sourceMap = obj.sourceMap

	  if (media) {
	    styleElement.setAttribute('media', media)
	  }
	  if (options.ssrId) {
	    styleElement.setAttribute(ssrIdKey, obj.id)
	  }

	  if (sourceMap) {
	    // https://developer.chrome.com/devtools/docs/javascript-debugging
	    // this makes source maps inside style tags work properly in Chrome
	    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
	    // http://stackoverflow.com/a/26603875
	    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
	  }

	  if (styleElement.styleSheet) {
	    styleElement.styleSheet.cssText = css
	  } else {
	    while (styleElement.firstChild) {
	      styleElement.removeChild(styleElement.firstChild)
	    }
	    styleElement.appendChild(document.createTextNode(css))
	  }
	}


/***/ }),

/***/ 364:
/***/ (function(module, exports) {

	/**
	 * Translates the list format produced by css-loader into something
	 * easier to manipulate.
	 */
	module.exports = function listToStyles (parentId, list) {
	  var styles = []
	  var newStyles = {}
	  for (var i = 0; i < list.length; i++) {
	    var item = list[i]
	    var id = item[0]
	    var css = item[1]
	    var media = item[2]
	    var sourceMap = item[3]
	    var part = {
	      id: parentId + ':' + i,
	      css: css,
	      media: media,
	      sourceMap: sourceMap
	    }
	    if (!newStyles[id]) {
	      styles.push(newStyles[id] = { id: id, parts: [part] })
	    } else {
	      newStyles[id].parts.push(part)
	    }
	  }
	  return styles
	}


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _collapseTransition = __webpack_require__(85);

	var _collapseTransition2 = _interopRequireDefault(_collapseTransition);

	var _checkbox = __webpack_require__(307);

	var _checkbox2 = _interopRequireDefault(_checkbox);

	var _emitter = __webpack_require__(13);

	var _emitter2 = _interopRequireDefault(_emitter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  name: "ElTreeNode",

	  componentName: "ElTreeNode",

	  mixins: [_emitter2.default],

	  props: {
	    node: {
	      default: function _default() {
	        return {};
	      }
	    },
	    props: {},
	    renderContent: Function
	  },

	  components: {
	    ElCollapseTransition: _collapseTransition2.default,
	    ElCheckbox: _checkbox2.default,
	    NodeContent: {
	      props: {
	        node: {
	          required: true
	        }
	      },
	      render: function render(h) {
	        var parent = this.$parent;
	        var node = this.node;
	        var data = node.data;
	        var store = node.store;
	        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
	          _self: parent.tree.$vnode.context,
	          node: node,
	          data: data,
	          store: store
	        }) : h(
	          "span",
	          { "class": "el-tree-node__label" },
	          [this.node.label]
	        );
	      }
	    }
	  },

	  data: function data() {
	    return {
	      tree: null,
	      expanded: false,
	      childNodeRendered: false,
	      showCheckbox: false,
	      showCombineLine: false,
	      oldChecked: null,
	      oldIndeterminate: null,
	      draggable: false,
	      dragging: false,
	      enableShadow: false
	    };
	  },
	  mounted: function mounted() {},
	  beforeDestroy: function beforeDestroy() {},
	  beforeUpdate: function beforeUpdate() {},
	  updated: function updated() {},


	  watch: {
	    "node.indeterminate": function nodeIndeterminate(val) {
	      this.handleSelectChange(this.node.checked, val);
	    },
	    "node.checked": function nodeChecked(val) {
	      this.handleSelectChange(val, this.node.indeterminate);
	    },
	    "node.expanded": function nodeExpanded(val) {
	      this.expanded = val;
	      if (val) {
	        this.childNodeRendered = true;
	      }
	    }
	  },

	  computed: {
	    indent: function indent() {
	      return (this.node.indent - 1) * this.tree.indent;
	    },
	    combineLineIndent: function combineLineIndent() {
	      var indent = this.node.hiddenSelf ? this.node.indent : this.node.indent - 1;
	      return indent * this.tree.indent;
	    },
	    shouldShowCombineLine: function shouldShowCombineLine() {
	      if (!this.showCombineLine || this.node.hideCombineLine) {
	        return false;
	      }

	      if (this.node.hiddenSelf && !this.node.noIndent && this.node.childNodes.length > 1) {
	        return true;
	      }

	      var node = this.node;
	      if (node.childNodes.find(function (child) {
	        return child.noIndent && !child.hiddenSelf;
	      }) && this.expanded) {
	        return true;
	      }

	      return false;
	    }
	  },

	  methods: {
	    getTree: function getTree() {
	      return this.tree;
	    },
	    getNodeKey: function getNodeKey(node, index) {
	      var nodeKey = this.tree.nodeKey;
	      if (nodeKey && node) {
	        return node.data[nodeKey];
	      }
	      return index;
	    },
	    handleSelectChange: function handleSelectChange(checked, indeterminate) {
	      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
	        this.tree.$emit("check-change", this.node.data, checked, indeterminate);
	      }
	      this.oldChecked = checked;
	      this.indeterminate = indeterminate;
	    },
	    setCurrentNode: function setCurrentNode() {
	      var store = this.tree.store;
	      if (store.currentNode == this.node) return;
	      if (store.currentNode != undefined) store.currentNode.isCurrent = false;
	      this.tree.currentNode = this;
	      this.node.isCurrent = true;
	      store.setCurrentNode(this.node);
	      this.tree.$emit("current-change", store.currentNode ? store.currentNode.data : null, store.currentNode);
	      if (this.tree.expandOnClickNode) {
	        this.handleExpandIconClick();
	      }
	    },
	    handleMouseDown: function handleMouseDown(e) {
	      if (!this.draggable) return;
	      var node = this.$refs.node;

	      if (!this.tree.isDragValidImpl(this.node)) {
	        return;
	      }

	      this.dragTarget = node;
	      this._handleMouseMove = this.handleMouseMove.bind(this);
	      this._handleMouseUp = this.handleMouseUp.bind(this);
	      this._handleKeyDown = this.handleKeyDown.bind(this);
	      document.addEventListener("mousemove", this._handleMouseMove);
	      document.addEventListener("mouseup", this._handleMouseUp);
	      document.addEventListener("keydown", this._handleKeyDown);
	      e.stopPropagation();
	      //console.log("mouse_down");
	    },
	    handleKeyDown: function handleKeyDown(e) {
	      if (e.keyCode == 27) {
	        this.releaseDragResource();
	      }
	    },
	    handleMouseMove: function handleMouseMove(e) {
	      if (this.enableShadow && !this.shadowInit) {
	        var target = this.dragTarget.firstChild;
	        var rect = target.getBoundingClientRect();
	        this.targetPaddingLeft = parseInt(target.style.paddingLeft);
	        this.shadow = target.cloneNode(true);
	        this.shadow.style.background = "transparent";

	        this.shadow.id = this.shadow.id + "__shadow";
	        document.body.appendChild(this.shadow);
	        this.shadowInit = true;
	        this.shadow.style.position = "fixed";
	        this.shadow.style.z_index = 99999;
	      }

	      var dropTarget = this.updateDraggingIndicator(e.clientX, e.clientY);

	      if (this.enableShadow) {
	        Object.assign(this.shadow.style, {
	          top: e.clientY + "px",
	          left: e.clientX - this.targetPaddingLeft + "px"
	        });
	      }

	      if (dropTarget) {
	        this.shadow.style.display = "block";
	      } else {
	        this.shadow.style.display = "none";
	      }

	      e.stopPropagation();
	    },
	    updateDraggingIndicator: function updateDraggingIndicator(x, y) {
	      if (!this.indicator) {
	        this.addIndicator();
	      }
	      if (this.enableShadow && this.shadow) {
	        this.shadow.style.display = "none";
	      }
	      var dropTarget = this.getItemUnderCursor(x, y);
	      if (this.enableShadow && this.shadow) {
	        this.shadow.style.display = "block";
	      }
	      if (dropTarget && !this.tree.$refs.container.contains(dropTarget)) {
	        dropTarget = null;
	      }
	      if (dropTarget && this.$refs.node.contains(dropTarget)) {
	        dropTarget = null;
	      }
	      if (dropTarget) {
	        var node = this.node.store.getNode(dropTarget.id);
	        if (node) {
	          if (dropTarget == this.$refs.node) {
	            dropTarget = null;
	          } else {
	            dropTarget = this.tree.isDropValidImpl(this.node, node) ? dropTarget : null;
	          }
	        }
	      }
	      if (dropTarget == this.lastDropTarget) {
	        this.updateIndicatorPos(x, y);
	      } else {
	        this.lastDropTarget = dropTarget;
	        if (dropTarget != null) {
	          this.lastDropTargetRect = dropTarget.getBoundingClientRect();
	          this.updateIndicatorPos(x, y);

	          var _node = this.node.store.getNode(dropTarget.id);
	          this.shouldShowIndicator = this.tree.shouldShowDragIndicatorImpl(_node);
	        } else {
	          this.lastDropTarget = null;
	          this.hideIndicator();
	        }
	      }
	      return dropTarget;
	    },
	    addIndicator: function addIndicator() {
	      var indicator = document.createElement("div");
	      indicator.className = "el-tree-node-drag-indicator";
	      this.indicator = indicator;
	      document.body.appendChild(this.indicator);

	      Object.assign(indicator.style, {
	        position: "fixed",
	        display: "none",
	        width: "300px",
	        height: "2px",
	        background: "red"
	      });
	    },
	    hideIndicator: function hideIndicator() {
	      this.indicator.style.display = "none";
	    },
	    showIndicator: function showIndicator() {
	      this.indicator.style.display = "block";
	    },
	    updateIndicator: function updateIndicator(x, y) {
	      if (this.shouldShowIndicator) {
	        this.showIndicator();
	        Object.assign(this.indicator.style, {
	          left: x + 35 + "px",
	          top: y - 1 + "px"
	        });
	      } else {
	        this.hideIndicator();
	      }
	    },
	    removeIndicator: function removeIndicator() {
	      if (this.indicator) {
	        document.body.removeChild(this.indicator);
	        this.indicator = null;
	      }
	    },
	    updateIndicatorPos: function updateIndicatorPos(x, y) {
	      if (!this.lastDropTarget) return;
	      var y1 = this.lastDropTargetRect.top;
	      var y2 = this.lastDropTargetRect.top + this.lastDropTargetRect.height;
	      console.assert(y1 <= y && y <= y2);
	      var middle = (y2 + y1) / 2;

	      var left = this.lastDropTargetRect.left;
	      var firstChildStyle = this.lastDropTarget.firstChild.style;
	      var contentPadding = 0;
	      if (firstChildStyle) {
	        contentPadding = parseInt(this.lastDropTarget.firstChild.style.paddingLeft);
	      }
	      if (y < middle) {
	        this.updateIndicator(left + contentPadding, y1);
	        this.draggingInsertPos = "node-insert-before";
	      } else if (y > middle) {
	        this.updateIndicator(left + contentPadding, y2);
	        this.draggingInsertPos = "node-insert-after";
	      }
	    },
	    getItemUnderCursor: function getItemUnderCursor(x, y) {
	      var item = document.elementFromPoint(x, y);
	      while (item) {
	        if (item.className) {
	          var itemClasses = item.className.split(" ");
	          if (itemClasses.indexOf("el-tree-node") != -1) {
	            return item;
	          }
	        }
	        item = item.parentNode;
	      }

	      return null;
	    },
	    handleMouseUp: function handleMouseUp(e) {
	      if (!this.draggable) return;
	      this.releaseDragResource();
	      e.stopPropagation();
	      if (this.lastDropTarget) {
	        var node = this.node.store.getNode(this.lastDropTarget.id);
	        if (node) {
	          this.tree.$emit(this.draggingInsertPos, this.node.data, node.data);
	        }
	      }
	      //console.log("mouse_up");
	    },
	    releaseDragResource: function releaseDragResource() {
	      if (this.shadow) {
	        document.body.removeChild(this.shadow);
	        this.shadow = null;
	        this.shadowInit = false;
	      }

	      if (this.indicator) {
	        this.removeIndicator();
	      }

	      document.removeEventListener("mousemove", this._handleMouseMove);
	      document.removeEventListener("mouseup", this._handleMouseUp);
	      document.removeEventListener("keydown", this._handleKeyDown);
	    },
	    handleClick: function handleClick() {
	      this.setCurrentNode();
	      this.tree.$emit("node-click", this.node.data, this.node, this);
	    },
	    handleDoubleClick: function handleDoubleClick() {
	      this.setCurrentNode();
	      this.tree.$emit("node-double-click", this.node.data, this.node, this);
	    },
	    handleRightClick: function handleRightClick(event) {
	      this.setCurrentNode();
	      this.tree.$emit("node-right-click", event, this.node.data, this.node, this);
	    },
	    handleExpandIconClick: function handleExpandIconClick() {
	      if (this.node.isLeaf) return;
	      if (this.expanded) {
	        this.tree.$emit("node-collapse", this.node.data, this.node, this);
	        this.node.collapse();
	      } else {
	        this.node.expand();
	        this.$emit("node-expand", this.node.data, this.node, this);
	      }
	    },
	    handleUserClick: function handleUserClick() {
	      if (this.node.indeterminate) {
	        this.node.setChecked(this.node.checked, !this.tree.checkStrictly);
	      }
	    },
	    handleCheckChange: function handleCheckChange(ev) {
	      if (!this.node.indeterminate) {
	        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
	      }
	    },
	    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
	      this.broadcast("ElTreeNode", "tree-node-expand", node);
	      this.tree.$emit("node-expand", nodeData, node, instance);
	    }
	  },

	  created: function created() {
	    var _this = this;

	    var parent = this.$parent;

	    if (parent.isTree) {
	      this.tree = parent;
	    } else {
	      this.tree = parent.tree;
	    }

	    var tree = this.tree;
	    if (!tree) {
	      console.warn("Can not find node's tree.");
	    }

	    var props = tree.props || {};
	    var childrenKey = props["children"] || "children";

	    this.$watch("node.data." + childrenKey, function () {
	      _this.node.updateChildren();
	    });

	    this.showCheckbox = tree.showCheckbox;
	    this.showCombineLine = tree.showCombineLine;
	    this.draggable = tree.draggable;
	    this.enableShadow = tree.enableShadow;

	    if (this.node.expanded) {
	      this.expanded = true;
	      this.childNodeRendered = true;
	    }

	    if (this.tree.accordion) {
	      this.$on("tree-node-expand", function (node) {
	        if (_this.node !== node) {
	          _this.node.collapse();
	        }
	      });
	    }
	  }
	}; //
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
	//

/***/ }),

/***/ 366:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.node.nodeShouldHidden) ? _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.node.visible),
	      expression: "node.visible"
	    }],
	    ref: "node",
	    staticClass: "el-tree-node",
	    class: {
	      'is-expanded': _vm.childNodeRendered && _vm.expanded,
	        'is-current': _vm.node.isCurrent,
	        'is-hidden': !_vm.node.visible,
	        'el-tree-node-disabled': !_vm.node.enable,
	        'node-combine-line-container': _vm.shouldShowCombineLine
	    },
	    attrs: {
	      "id": _vm.node.key
	    },
	    on: {
	      "mousedown": function($event) {
	        $event.stopPropagation();
	        _vm.handleMouseDown($event)
	      },
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleClick($event)
	      },
	      "dblclick": function($event) {
	        $event.stopPropagation();
	        _vm.handleDoubleClick($event)
	      },
	      "contextmenu": function($event) {
	        $event.stopPropagation();
	        $event.preventDefault();
	        _vm.handleRightClick($event)
	      }
	    }
	  }, [(!_vm.node.hiddenSelf) ? _c('div', {
	    class: {
	      "el-tree-node__content": true, "el-tree-node-invalid": !_vm.node.valid
	    },
	    style: ({
	      'padding-left': _vm.indent + 'px'
	    })
	  }, [_c('span', {
	    staticClass: "el-tree-node__expand-icon-container",
	    staticStyle: {
	      "margin-right": "5px",
	      "display": "inline-block"
	    },
	    on: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleExpandIconClick($event)
	      },
	      "dblclick": function($event) {
	        $event.stopPropagation();
	      }
	    }
	  }, [_c('span', {
	    staticClass: "el-tree-node__expand-icon",
	    class: {
	      'is-leaf': _vm.node.isLeaf, expanded: !_vm.node.isLeaf && _vm.expanded
	    }
	  })]), (_vm.showCheckbox) ? _c('el-checkbox', {
	    attrs: {
	      "indeterminate": _vm.node.indeterminate
	    },
	    on: {
	      "change": _vm.handleCheckChange
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.stopPropagation();
	        _vm.handleUserClick($event)
	      }
	    },
	    model: {
	      value: (_vm.node.checked),
	      callback: function($$v) {
	        _vm.$set(_vm.node, "checked", $$v)
	      },
	      expression: "node.checked"
	    }
	  }) : _vm._e(), (_vm.node.loading) ? _c('span', {
	    staticClass: "el-tree-node__loading-icon el-icon-loading"
	  }) : _vm._e(), _c('node-content', {
	    attrs: {
	      "node": _vm.node
	    }
	  })], 1) : _vm._e(), (_vm.shouldShowCombineLine) ? _c('div', {
	    staticClass: "node-combine-line",
	    style: ({
	      'margin-left': _vm.combineLineIndent + 'px',
	      'border-color': _vm.node.combineLineColor
	    })
	  }) : _vm._e(), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.expanded || _vm.node.hiddenSelf),
	      expression: "expanded || node.hiddenSelf"
	    }],
	    staticClass: "el-tree-node__children"
	  }, _vm._l((_vm.node.childNodes), function(child) {
	    return _c('el-tree-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "render-content": _vm.renderContent,
	        "node": child
	      },
	      on: {
	        "node-expand": _vm.handleChildNodeExpand
	      }
	    })
	  }))]) : _vm._e()
	},staticRenderFns: []}

/***/ }),

/***/ 367:
/***/ (function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    ref: "container",
	    staticClass: "el-tree",
	    class: {
	      'el-tree--highlight-current': _vm.highlightCurrent
	    }
	  }, [_vm._l((_vm.root.childNodes), function(child) {
	    return _c('el-tree-node', {
	      key: _vm.getNodeKey(child),
	      attrs: {
	        "node": child,
	        "props": _vm.props,
	        "render-content": _vm.renderContent
	      },
	      on: {
	        "node-expand": _vm.handleNodeExpand
	      }
	    })
	  }), (!_vm.root.childNodes || _vm.root.childNodes.length === 0) ? _c('div', {
	    staticClass: "el-tree__empty-block"
	  }, [_c('span', {
	    staticClass: "el-tree__empty-text"
	  }, [_vm._v(_vm._s(_vm.emptyText))])]) : _vm._e()], 2)
	},staticRenderFns: []}

/***/ })

/******/ });