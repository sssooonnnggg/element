<template>
  <div class="el-tree-node"
    v-if="!node.nodeShouldHidden"
    :id="node.key"
    ref="node"
    @mousedown.stop="handleMouseDown"
    @click.stop="handleClick"
    @dblclick.stop="handleDoubleClick"
    @contextmenu.stop.prevent="handleRightClick($event)"
    v-show="node.visible"
    :class="{
        'is-expanded': childNodeRendered && expanded,
        'is-current': node.isCurrent,
        'is-hidden': !node.visible,
        'el-tree-node-invalid': node.invalid,
        'el-tree-node-disabled':!node.enable,
        'node-combine-line-container':shouldShowCombineLine
      }">
    <div :class='{"el-tree-node__content": true}'
      :style="{ 'padding-left': indent + 'px' }"
      v-if="!node.hiddenSelf">
      <span class="el-tree-node__expand-icon-container"
        style='margin-right:5px;display:inline-block'
        @click.stop="handleExpandIconClick"
        @dblclick.stop>
        <span class="el-tree-node__expand-icon"
          :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
        </span>
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
    <div class='node-combine-line'
      v-if='shouldShowCombineLine'
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
      oldIndeterminate: null,
      draggable: false,
      dragging: false,
      enableShadow: false
    };
  },

  mounted() {},

  beforeDestroy() {},

  beforeUpdate() {},

  updated() {},

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
      let indent = this.node.hiddenSelf
        ? this.node.indent
        : this.node.indent - 1;
      return indent * this.tree.indent;
    },
    shouldShowCombineLine() {
      if (!this.showCombineLine || this.node.hideCombineLine) {
        return false;
      }

      if (
        this.node.hiddenSelf &&
        !this.node.noIndent &&
        this.node.childNodes.length > 1
      ) {
        return true;
      }

      let node = this.node;
      if (
        node.childNodes.find(child => child.noIndent && !child.hiddenSelf) &&
        this.expanded
      ) {
        return true;
      }

      return false;
    }
  },

  methods: {
    getTree() {
      return this.tree;
    },
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
      if (store.currentNode == this.node) return;
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

    handleMouseDown(e) {
      if (!this.draggable) return;
      let node = this.$refs.node;

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

    handleKeyDown(e) {
      if (e.keyCode == 27) {
        this.releaseDragResource();
      }
    },

    handleMouseMove(e) {
      if (this.enableShadow && !this.shadowInit) {
        let target = this.dragTarget.firstChild;
        let rect = target.getBoundingClientRect();
        this.targetPaddingLeft = parseInt(target.style.paddingLeft);
        this.shadow = target.cloneNode(true);
        this.shadow.style.background = "transparent";

        this.shadow.id = this.shadow.id + "__shadow";
        document.body.appendChild(this.shadow);
        this.shadowInit = true;
        this.shadow.style.position = "fixed";
        this.shadow.style.z_index = 99999;
      }

      let dropTarget = this.updateDraggingIndicator(e.clientX, e.clientY);

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

    updateDraggingIndicator(x, y) {
      if (!this.indicator) {
        this.addIndicator();
      }
      if (this.enableShadow && this.shadow) {
        this.shadow.style.display = "none";
      }
      let dropTarget = this.getItemUnderCursor(x, y);
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
        let node = this.node.store.getNode(dropTarget.id);
        if (node) {
          if (dropTarget == this.$refs.node) {
            dropTarget = null;
          } else {
            dropTarget = this.tree.isDropValidImpl(this.node, node)
              ? dropTarget
              : null;
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

          let node = this.node.store.getNode(dropTarget.id);
          this.shouldShowIndicator = this.tree.shouldShowDragIndicatorImpl(
            node
          );
        } else {
          this.lastDropTarget = null;
          this.hideIndicator();
        }
      }
      return dropTarget;
    },

    addIndicator() {
      let indicator = document.createElement("div");
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

    hideIndicator() {
      this.indicator.style.display = "none";
    },

    showIndicator() {
      this.indicator.style.display = "block";
    },

    updateIndicator(x, y) {
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

    removeIndicator() {
      if (this.indicator) {
        document.body.removeChild(this.indicator);
        this.indicator = null;
      }
    },

    updateIndicatorPos(x, y) {
      if (!this.lastDropTarget) return;
      let y1 = this.lastDropTargetRect.top;
      let y2 = this.lastDropTargetRect.top + this.lastDropTargetRect.height;
      console.assert(y1 <= y && y <= y2);
      let middle = (y2 + y1) / 2;

      let left = this.lastDropTargetRect.left;
      let firstChildStyle = this.lastDropTarget.firstChild.style;
      let contentPadding = 0;
      if (firstChildStyle) {
        contentPadding = parseInt(
          this.lastDropTarget.firstChild.style.paddingLeft
        );
      }
      if (y < middle) {
        this.updateIndicator(left + contentPadding, y1);
        this.draggingInsertPos = "node-insert-before";
      } else if (y > middle) {
        this.updateIndicator(left + contentPadding, y2);
        this.draggingInsertPos = "node-insert-after";
      }
    },

    getItemUnderCursor(x, y) {
      let item = document.elementFromPoint(x, y);
      while (item) {
        if (item.className) {
          let itemClasses = item.className.split(" ");
          if (itemClasses.indexOf("el-tree-node") != -1) {
            return item;
          }
        }
        item = item.parentNode;
      }

      return null;
    },

    handleMouseUp(e) {
      if (!this.draggable) return;
      this.releaseDragResource();
      e.stopPropagation();
      if (this.lastDropTarget) {
        let node = this.node.store.getNode(this.lastDropTarget.id);
        if (node) {
          this.tree.$emit(this.draggingInsertPos, this.node.data, node.data);
        }
      }
      //console.log("mouse_up");
    },

    releaseDragResource() {
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
    this.draggable = tree.draggable;
    this.enableShadow = tree.enableShadow;

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
.el-tree-node-invalid {
  background-color:rgba(100, 0, 0, 1);
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
