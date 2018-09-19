<template>
  <div class="el-tree"
    ref='container'
    :class="{ 'el-tree--highlight-current': highlightCurrent }">
    <el-tree-node v-for="child in root.childNodes"
      :node="child"
      :props="props"
      :key="getNodeKey(child)"
      :render-content="renderContent"
      :render-custom-expand-icon="renderCustomExpandIcon"
      :render-combine-line="renderCombineLine"
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
      currentNode: null
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
    renderCustomExpandIcon: {
      type: Function,
      default: null
    },
    renderCombineLine: {
      type: Function,
      default: null
    },
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
      default: false
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
    isDropOutValid: {
      default: null
    },
    isAddChildValid: {
      default: null
    },
    shouldShowDragIndicator: {
      default: false
    },
    enableShadow: {
      default: false
    },
    useDisableStyle: {
      default: false
    },
    useCustomExpandIcon: {
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
    },
    isActive(newVal) {
      if (newVal) {
        if (this.draggable) {
        }
      }
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
        node.expandParent();
      }
    },
    //加了一个方法，用于排序孩子，主要是为了解决sort数组控件没有表现的bug
    sortChildren(data, cmp) {
      const node = this.store.getNode(data);
      if (node && data.children) {
        data.children.sort(cmp);
        node.sortChildren(cmp);
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
    toggleNode(data) {
      const node = this.store.getNode(data);
      if (node.expanded) {
        node.collapse();
      } else {
        node.expand();
      }
    },
    hide(id) {
      const node = this.store.getNode(id);
      if (node) {
        node.visible = false;
        node.data.visible = false;
      }
    },
    show(id) {
      const node = this.store.getNode(id);
      if (node) {
        node.visible = true;
        node.data.visible = true;
      }
    },
    updateIndent(id) {
      let node = this.store.getNode(id);
      node.updateIndent();
    },
    isVisible(id) {
      let el = document.getElementById(id);
      if (el) {
        return el && el.offsetParent != null;
      }
    },
    isDragValidImpl(node) {
      if (!this.draggable || !this.isDragValid) {
        return false;
      }

      return this.isDragValid(node.data);
    },
    isDropValidImpl(node, target) {
      if (!this.draggable) {
        return false;
      }

      if (!this.isDropValid) {
        return true;
      }

      return this.isDropValid(node.data, target.data);
    },
    isDropOutValidImpl(node, target) {
      if (!this.draggable) {
        return false;
      }

      if (!this.isDropOutValid) {
        return true;
      }

      return this.isDropOutValid(node.data, target);
    },
    shouldShowDragIndicatorImpl(node) {
      if (!this.draggable) {
        return false;
      }

      if (!this.shouldShowDragIndicator) {
        return true;
      }

      return this.shouldShowDragIndicator(node.data);
    },
    isAddChildValidImpl(node, target) {
      if (!this.draggable) {
        return false;
      }

      if (!this.isAddChildValid) {
        return false;
      }

      return this.isAddChildValid(node.data, target.data);
    }
  },

  created() {
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
  },

  mounted() {
    if (this.draggable) {
    }
  },

  beforeDestroy() {}
};
</script>
