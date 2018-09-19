import objectAssign from "element-ui/src/utils/merge";
import { markNodeData, NODE_KEY } from "./util";

const reInitChecked = function(node) {
  const siblings = node.childNodes;

  let all = true;
  let none = true;

  for (let i = 0, j = siblings.length; i < j; i++) {
    const sibling = siblings[i];
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

const getPropertyFromData = function(node, prop) {
  const props = node.store.props;
  const data = node.data || {};
  const config = props[prop];

  if (typeof config === "function") {
    return config(data, node);
  } else if (typeof config === "string") {
    return data[config];
  } else if (typeof config === "undefined") {
    return "";
  }
};

let nodeIdSeed = 0;

export default class Node {
  constructor(options) {
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

    for (let name in options) {
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

    const store = this.store;
    if (!store) {
      throw new Error("[Node]store is required!");
    }
    store.registerNode(this);

    const props = store.props;
    if (props && typeof props.isLeaf !== "undefined") {
      const isLeaf = getPropertyFromData(this, "isLeaf");
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
        this.indent =
          this.noIndent || this.hiddenSelf
            ? this.parent.indent
            : this.parent.indent + 1;
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
    const defaultExpandedKeys = store.defaultExpandedKeys;
    const key = store.key;
    if (
      key &&
      defaultExpandedKeys &&
      defaultExpandedKeys.indexOf(this.key) !== -1
    ) {
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

  setData(data) {
    if (!Array.isArray(data)) {
      markNodeData(this, data);
    }

    this.data = data;
    this.childNodes = [];

    let children;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      children = getPropertyFromData(this, "children") || [];
    }

    for (let i = 0, j = children.length; i < j; i++) {
      this.insertChild({
        data: children[i]
      });
    }
  }

  get label() {
    return getPropertyFromData(this, "label");
  }

  get icon() {
    return getPropertyFromData(this, "icon");
  }

  get key() {
    const nodeKey = this.store.key;
    if (this.data) return this.data[nodeKey];
    return null;
  }

  get hidden() {
    const data = this.data || {};
    return data.hidden ? true : false;
  }

  get hiddenSelf() {
    const data = this.data || {};
    return data.hiddenSelf ? true : false;
  }

  get hideCombineLine() {
    const data = this.data || {};
    return data.hideCombineLine ? true : false;
  }

  get combineLineColor() {
    const data = this.data || {};
    return data.combineLineColor ? data.combineLineColor : "transparent";
  }

  get enable() {
    const data = this.data || {};
    if (data.enable == undefined) return true;
    return data.enable;
  }

  get valid() {
    const data = this.data || {};
    if (data.valid == undefined) return true;
    return data.valid;
  }

  updateIndent() {
    if (this.parent) {
      this.indent =
        this.noIndent || this.hiddenSelf
          ? this.parent.indent
          : this.parent.indent + 1;
    }
  }

  insertChild(child, index) {
    if (!child) throw new Error("insertChild error: child is required.");

    if (!(child instanceof Node)) {
      objectAssign(child, {
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
  }

  insertBefore(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
    }
    this.insertChild(child, index);
  }

  insertAfter(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  }

  removeChild(child) {
    const index = this.childNodes.indexOf(child);

    if (index > -1) {
      this.store && this.store.deregisterNode(child);
      child.parent = null;
      this.childNodes.splice(index, 1);
    }

    this.updateLeafState();
    if (this.hiddenSelf && this.parent) {
      this.parent.updateLeafState();
    }
  }

  removeChildByData(data) {
    let targetNode = null;
    this.childNodes.forEach(node => {
      if (node.data === data) {
        targetNode = node;
      }
    });

    if (targetNode) {
      this.removeChild(targetNode);
    }
  }

  expand(callback, expandParent) {
    const done = () => {
      if (expandParent) {
        let parent = this.parent;
        while (parent.level > 0) {
          parent.expanded = true;
          parent = parent.parent;
        }
      }
      this.expanded = true;
      if (callback) callback();
    };

    if (this.shouldLoadData()) {
      this.loadData(data => {
        if (data instanceof Array) {
          done();
        }
      });
    } else {
      done();
    }
  }

  expandParent() {
    let parent = this.parent;
    while (parent && parent.level > 0) {
      parent.expanded = true;
      parent = parent.parent;
    }
  }

  doCreateChildren(array, defaultProps = {}) {
    array.forEach(item => {
      this.insertChild(
        objectAssign(
          {
            data: item
          },
          defaultProps
        )
      );
    });
  }

  collapse() {
    this.expanded = false;
  }

  collapseAll() {
    let collapse = function(node) {
      node.expanded = false;
      node.childNodes.forEach(function(child) {
        collapse(child);
      });
    };
    collapse(this);
  }

  expandAll() {
    let expand = function(node) {
      node.childNodes.forEach(function(child) {
        expand(child);
      });
      node.expanded = true;
    };
    expand(this);
  }

  shouldLoadData() {
    return this.store.lazy === true && this.store.load && !this.loaded;
  }

  updateLeafState() {
    if (
      this.store.lazy === true &&
      this.loaded !== true &&
      typeof this.isLeafByUser !== "undefined"
    ) {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    const childNodes = this.childNodes;
    if (
      !this.store.lazy ||
      (this.store.lazy === true && this.loaded === true)
    ) {
      let nodeIsHidden = function(node) {
        if (!node.hidden) {
          return false;
        }

        for (let childNode of node.childNodes) {
          if (!nodeIsHidden(childNode)) {
            return false;
          }
        }

        return true;
      };

      this.nodeShouldHidden = nodeIsHidden(this);

      let isDescendantHidden = function(data) {
        if (data.childNodes == undefined || data.childNodes.length == 0) {
          return true;
        }
        for (let child of data.childNodes) {
          if (!child.nodeShouldHidden && !child.hiddenSelf) {
            return false;
          }
          if (child.hiddenSelf && !isDescendantHidden(child)) {
            return false;
          }
        }

        return true;
      };

      this.isLeaf =
        !childNodes || childNodes.length === 0 || isDescendantHidden(this);
      return;
    }
    this.isLeaf = false;
  }

  setChecked(value, deep) {
    this.indeterminate = value === "half";
    this.checked = value === true;

    const handleDescendants = () => {
      if (deep) {
        const childNodes = this.childNodes;
        for (let i = 0, j = childNodes.length; i < j; i++) {
          const child = childNodes[i];
          child.setChecked(value !== false, deep);
        }
      }
    };

    if (!this.store.checkStrictly && this.shouldLoadData()) {
      // Only work on lazy load data.
      this.loadData(
        () => {
          handleDescendants();
        },
        {
          checked: value !== false
        }
      );
    } else {
      handleDescendants();
    }

    const parent = this.parent;
    if (!parent || parent.level === 0) return;

    if (!this.store.checkStrictly) {
      reInitChecked(parent);
    }
  }

  getChildren() {
    // this is data
    const data = this.data;
    if (!data) return null;

    const props = this.store.props;
    let children = "children";
    if (props) {
      children = props.children || "children";
    }

    if (data[children] === undefined) {
      data[children] = null;
    }

    return data[children];
  }

  updateChildren() {
    const newData = this.getChildren() || [];
    const oldData = this.childNodes.map(node => node.data);

    const newDataMap = {};
    const newNodes = [];

    newData.forEach((item, index) => {
      if (item[NODE_KEY]) {
        newDataMap[item[NODE_KEY]] = {
          index,
          data: item
        };
      } else {
        newNodes.push({
          index,
          data: item
        });
      }
    });

    oldData.forEach(item => {
      if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
    });

    newNodes.forEach(({ index, data }) => {
      this.insertChild(
        {
          data
        },
        index
      );
    });

    this.updateLeafState();
  }

  //加了一个方法，用于排序孩子，主要是为了解决sort数组控件没有表现的bug
  sortChildren(cmp) {
    if (this.childNodes) {
      this.childNodes.sort((node1, node2) => {
        return cmp(node1.data, node2.data);
      });
    }
  }

  loadData(callback, defaultProps = {}) {
    if (
      this.store.lazy === true &&
      this.store.load &&
      !this.loaded &&
      !this.loading
    ) {
      this.loading = true;

      const resolve = children => {
        this.loaded = true;
        this.loading = false;
        this.childNodes = [];

        this.doCreateChildren(children, defaultProps);

        this.updateLeafState();
        if (callback) {
          callback.call(this, children);
        }
      };

      this.store.load(this, resolve);
    } else {
      if (callback) {
        callback.call(this);
      }
    }
  }
}
