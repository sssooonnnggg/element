<template>
  <div class="el-tree"
    :class="{ 'el-tree--highlight-current': highlightCurrent }">
    <el-tree-node v-for="child in root.childNodes"
      :node="child"
      :props="props"
      :key="getNodeKey(child)"
      :render-content="renderContent"
      @node-expand="handleNodeExpand">
    </el-tree-node>
    <div class="el-tree__empty-block"
      v-if="!root.childNodes || root.childNodes.length === 0">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import TreeStore from "./model/tree-store";
import { t } from "element-ui/src/locale";
import emitter from "element-ui/src/mixins/emitter";
import Dragula from "dragula";

export default {
  name: "ElTree",

  mixins: [emitter],

  components: {
    ElTreeNode: require("./tree-node.vue")
  },

  data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      drake: {}
    };
  },

  props: {
    data: {
      type: Array
    },
    emptyText: {
      type: String,
      default() {
        return t("el.tree.emptyText");
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
      default() {
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
    }
  },

  mounted() {},

  computed: {
    children: {
      set(value) {
        this.data = value;
      },
      get() {
        return this.data;
      }
    }
  },

  watch: {
    defaultCheckedKeys(newVal) {
      this.store.defaultCheckedKeys = newVal;
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    currentNodeKey(newVal) {
      this.store.setCurrentNodeKey(newVal);
      this.store.currentNodeKey = newVal;
    },
    data(newVal) {
      this.store.setData(newVal);
    }
  },

  methods: {
    filter(value) {
      if (!this.filterNodeMethod)
        throw new Error("[Tree] filterNodeMethod is required when filter");
      this.store.filter(value);
    },
    getNodeKey(node, index) {
      const nodeKey = this.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return index;
    },
    getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    },
    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCheckedNodes");
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCheckedNodes");
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast("ElTreeNode", "tree-node-expand", node);
      this.$emit("node-expand", nodeData, node, instance);
    },
    selectNode(data) {
      const node = this.store.getNode(data);
      if (node) {
        const store = this.store;
        if (store.currentNode != undefined) store.currentNode.isCurrent = false;
        node.isCurrent = true;
        store.setCurrentNode(node);
        this.$emit(
          "current-change",
          store.currentNode ? store.currentNode.data : null,
          store.currentNode
        );
        node.expand(undefined, true);
      }
    },
    collapseAllNode(data) {
      const node = this.store.getNode(data);
      if (node) {
        node.collapseAll();
      }
    },
    expandAllNode(data) {
      const node = this.store.getNode(data);
      if (node) {
        node.expandAll();
      }
    },
    expandNode(data) {
      const node = this.store.getNode(data);
      if (node) {
        node.expand();
      }
    },
    collapseNode(data) {
      const node = this.store.getNode(data);
      if (node) {
        node.collapse();
      }
    },
    hideNode(id, hidden) {
      const node = this.store.getNode(id);
      if (node) {
        node.hidden = hidden;
      }
    },
    isVisible(id) {
      let el = document.getElementById(id);
      if (el) {
        return el && el.offsetParent != null;
      }
    }
  },

  created() {
    this.drake = Dragula({
      copy: true,
      accepts: function(el, target, source, sibling) {
        return true;
      }
    });

    this.drake.on('drop', (el, target, source, sibling) => {

      if (!target) {
        return;
      }

      let nodeId = target.children[0].id;
      if (!sibling) {
        this.$emit('insert-after', nodeId);
      } else {
        this.$emit('insert-before', nodeId);
      }

    });

    this.drake.on('shadow', (el, dropTarget, _source) => {

      let findParent = (item) => {
        let parentNode = item.parentNode;
        if (!parentNode) {
          return null;
        } else {
          if (parentNode.className 
           && parentNode.className.match(/el-tree-node$|el-tree-node\s/g)){
            return parentNode;
          }
          return findParent(parentNode);
        }
      }

      let parentNode = findParent(dropTarget);
      let indent;
      if (!parentNode) {
        indent = 0;
      } else {
        const node = this.store.getNode(parentNode.id);
        indent = node.indent;
      }

      let fixedPadding = this.indent * indent;
      let actualPadding = parseInt(el.children[0].style.paddingLeft);
      let extraPadding = fixedPadding - actualPadding;
      let addPadding = (item) => {
        if (item.className.match(/el-tree-node__content$|el-tree-node__content\s/g)) {
          let originPadding = parseInt(item.style.paddingLeft);
          item.style.paddingLeft = (originPadding + extraPadding) + 'px';
        }

        if (!item.children) {
          return;
        }

        for (let child of item.children) {
          addPadding(child);
        }
      }

      addPadding(el);
    })

    this.isTree = true;

    this.store = new TreeStore({
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
};
</script>
