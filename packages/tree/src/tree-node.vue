<template>
  <div class="el-tree-node"
    v-if="!node.nodeShouldHidden"
    :id="node.key"
    @click.stop="handleClick"
    @dblclick.stop="handleDoubleClick"
    @contextmenu.stop.prevent="handleRightClick($event)"
    v-show="node.visible"
    :class="{
        'is-expanded': childNodeRendered && expanded,
        'is-current': node.isCurrent,
        'is-hidden': !node.visible,
        'el-tree-node-disabled':!node.enable,
        'node-combine-line-container':shouldShowCombineLine
      }">
    <div :class='{"el-tree-node__content": true}'
      :style="{ 'padding-left': indent + 'px' }"
      v-if="!node.hiddenSelf">
      <span class="el-tree-node__expand-icon"
        @click.stop="handleExpandIconClick"
        @dblclick.stop
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <el-checkbox v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        @change="handleCheckChange"
        @click.native.stop="handleUserClick">
      </el-checkbox>
      <span v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>
    <div class='node-combine-line' v-if='shouldShowCombineLine' 
      :style="{ 'margin-left': combineLineIndent + 'px', 'border-color':node.combineLineColor }"></div>
    <div class="el-tree-node__children"
      v-show="expanded || node.hiddenSelf">
      <el-tree-node :render-content="renderContent"
        v-for="child in node.childNodes"
        :key="getNodeKey(child)"
        :node="child"
        @node-expand="handleChildNodeExpand">
      </el-tree-node>
    </div>
  </div>
</template>

<script type="text/jsx">
import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";
import ElCheckbox from "element-ui/packages/checkbox";
import emitter from "element-ui/src/mixins/emitter";

export default {
  name: "ElTreeNode",

  componentName: "ElTreeNode",

  mixins: [emitter],

  props: {
    node: {
      default() {
        return {};
      }
    },
    props: {},
    renderContent: Function
  },

  components: {
    ElCollapseTransition,
    ElCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        const node = this.node;
        const data = node.data;
        const store = node.store;
        return parent.renderContent ? (
          parent.renderContent.call(parent._renderProxy, h, {
            _self: parent.tree.$vnode.context,
            node,
            data,
            store
          })
        ) : (
          <span class="el-tree-node__label">{this.node.label}</span>
        );
      }
    }
  },

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      showCheckbox: false,
      showCombineLine: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },

  watch: {
    "node.indeterminate"(val) {
      this.handleSelectChange(this.node.checked, val);
    },

    "node.checked"(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },

    "node.expanded"(val) {
      this.expanded = val;
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },

  computed: {
    indent() {
      return (this.node.indent - 1) * this.tree.indent;
    },
    combineLineIndent() {
      let indent = this.node.hiddenSelf ? this.node.indent : this.node.indent - 1;
      return indent * this.tree.indent;
    },
    shouldShowCombineLine() {

      if (!this.showCombineLine || this.node.hideCombineLine) {
        return false;
      }

      if (this.node.hiddenSelf && !this.node.noIndent && this.node.childNodes.length > 1) {
        return true;
      }

      let node = this.node;
      if (node.childNodes.find(child => child.noIndent && !child.hiddenSelf) && this.expanded) {
        return true;
      }

      return false;
    }
  },

  methods: {
    getNodeKey(node, index) {
      const nodeKey = this.tree.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return index;
    },

    handleSelectChange(checked, indeterminate) {
      if (
        this.oldChecked !== checked &&
        this.oldIndeterminate !== indeterminate
      ) {
        this.tree.$emit("check-change", this.node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },

    setCurrentNode() {
      const store = this.tree.store;
      if (store.currentNode != undefined) store.currentNode.isCurrent = false;
      this.tree.currentNode = this;
      this.node.isCurrent = true;
      store.setCurrentNode(this.node);
      this.tree.$emit(
        "current-change",
        store.currentNode ? store.currentNode.data : null,
        store.currentNode
      );
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
    },

    handleClick() {
      this.setCurrentNode();
      this.tree.$emit("node-click", this.node.data, this.node, this);
    },

    handleDoubleClick() {
      this.setCurrentNode();
      this.tree.$emit("node-double-click", this.node.data, this.node, this);
    },

    handleRightClick(event) {
      this.setCurrentNode();
      this.tree.$emit(
        "node-right-click",
        event,
        this.node.data,
        this.node,
        this
      );
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit("node-collapse", this.node.data, this.node, this);
        this.node.collapse();
      } else {
        this.node.expand();
        this.$emit("node-expand", this.node.data, this.node, this);
      }
    },

    handleUserClick() {
      if (this.node.indeterminate) {
        this.node.setChecked(this.node.checked, !this.tree.checkStrictly);
      }
    },

    handleCheckChange(ev) {
      if (!this.node.indeterminate) {
        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      }
    },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast("ElTreeNode", "tree-node-expand", node);
      this.tree.$emit("node-expand", nodeData, node, instance);
    }
  },

  created() {
    const parent = this.$parent;

    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    const tree = this.tree;
    if (!tree) {
      console.warn("Can not find node's tree.");
    }

    const props = tree.props || {};
    const childrenKey = props["children"] || "children";

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren();
    });

    this.showCheckbox = tree.showCheckbox;
    this.showCombineLine = tree.showCombineLine;

    if (this.node.expanded) {
      this.expanded = true;
      this.childNodeRendered = true;
    }

    if (this.tree.accordion) {
      this.$on("tree-node-expand", node => {
        if (this.node !== node) {
          this.node.collapse();
        }
      });
    }
  }
};
</script>
<<style>
.el-tree-node-disabled {
  opacity: 0.5;
}
.node-combine-line-container {
  position: relative;
}
.node-combine-line {
  border: 3px solid black;
  border-right-width: 0px;
  top: 15px;
  width: 10px;
  bottom: 15px;
  position: absolute;
}
</style>
