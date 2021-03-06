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
        'el-tree-node-disabled':!node.enable && useDisableStyle
      }">
    <div :class='{"el-tree-node__content": true, "el-tree-node-invalid": !node.valid}'
      :style="{ 'padding-left': indent + 'px' }"
      v-if="!node.hiddenSelf">
      <span class="el-tree-node__expand-icon-container"
        style='margin-right:5px;display:inline-block'
        @click.stop="handleExpandIconClick"
        @dblclick.stop>
        <span class="el-tree-node__expand-icon"
          :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }"
          v-if='!useCustomExpandIcon'>
        </span>
        <custom-expand-icon v-else
          :node="node"
          :expanded="expanded"></custom-expand-icon>
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
    <div class="el-tree-node__children"
      v-show="expanded || node.hiddenSelf">
      <combine-line v-if="showCombineLine"
        class="combine-line"
        :node="node"
        :expanded="expanded"
        :indent="indent"></combine-line>
      <el-tree-node :render-content="renderContent"
        :render-custom-expand-icon="renderCustomExpandIcon"
        :render-combine-line="renderCombineLine"
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
    renderContent: Function,
    renderCustomExpandIcon: Function,
    renderCombineLine: Function
  },

  components: {
    ElCollapseTransition,
    ElCheckbox,
    CombineLine: {
      props: {
        node: {
          required: true
        },
        expanded: {},
        indent: {}
      },
      render(h) {
        const parent = this.$parent;
        const node = this.node;
        const data = node.data;
        const store = node.store;
        return parent.renderCombineLine.call(parent._renderProxy, h, {
          _self: parent.tree.$vnode.context,
          node,
          data,
          store,
          expanded: this.expanded,
          indent: this.indent
        });
      }
    },
    CustomExpandIcon: {
      props: {
        node: {
          required: true
        },
        expanded: {}
      },
      render(h) {
        const parent = this.$parent;
        const node = this.node;
        const data = node.data;
        const store = node.store;
        return parent.renderCustomExpandIcon.call(parent._renderProxy, h, {
          _self: parent.tree.$vnode.context,
          node,
          data,
          store,
          expanded: this.expanded
        });
      }
    },
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
      oldChecked: null,
      oldIndeterminate: null,
      draggable: false,
      dragging: false,
      enableShadow: false,
      useDisableStyle: false,
      showCombineLine: false
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

    setCurrentNode(event_type) {
      const store = this.tree.store;
      this.selectStatus();
      if (event_type == "click") return;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
    },

    //判断菜单的选中取消状态
    selectStatus() {
      const store = this.tree.store;
      if (!this.node) return;
      if (window.event.ctrlKey && this.tree.multiSelect) {
        //多选
        let currentNodes = this.tree.store.currentNode || [];
        let pos = currentNodes.indexOf(this.node);
        if (pos >= 0) {
          //取消菜单
          this.node.isCurrent = false;
          this.deleteTreeCurrentNode(this);
          this.deleteTreeStoreCurrentNode(this.node);
          this.unSelectChildNode(this.node); //有子菜单----取消所有子菜单选中状态
        } else {
          //选中菜单
          this.node.isCurrent = true;
          this.addTreeCurrentNode(this);
          this.addTreeStoreCurrentNode(this.node);
          this.unSelectParentNode(this.node); //菜单选中----取消所有父菜单选中状态
          this.unSelectChildNode(this.node); //有子菜单----取消所有子菜单选中状态
        }
      } else {
        //单选
        if (store.currentNode) {
          for (let i = 0; i < store.currentNode.length; i++) {
            store.currentNode[i].isCurrent = false;
          }
          store.currentNode = [];
          this.tree.currentNode = [];
        }
        this.node.isCurrent = true;
        this.addTreeCurrentNode(this);
        this.addTreeStoreCurrentNode(this.node);
      }
      this.tree.$emit("current-change", store.currentNode);
    },

    //添加Tree Store CurrentNode
    addTreeStoreCurrentNode(node) {
      const store = this.tree.store;
      store.currentNode = store.currentNode || [];
      if (store.currentNode.indexOf(node) < 0) {
        store.currentNode.push(node);
      }
    },

    //删除Tree Store CurrentNode
    deleteTreeStoreCurrentNode(node) {
      const store = this.tree.store;
      store.currentNode = store.currentNode || [];
      let pos = store.currentNode.indexOf(node);
      if (pos >= 0) {
        store.currentNode.splice(pos, 1);
      }
    },

    //添加Tree CurrentNode
    addTreeCurrentNode(obj) {
      this.tree.currentNode = this.tree.currentNode || [];
      if (this.tree.currentNode.indexOf(obj) < 0) {
        this.tree.currentNode.push(obj);
      }
    },

    //删除Tree CurrentNode
    deleteTreeCurrentNode(obj) {
      this.tree.currentNode = this.tree.currentNode || [];
      let pos = this.tree.currentNode.indexOf(obj);
      if (pos >= 0) {
        this.tree.currentNode.splice(pos, 1);
      }
    },

    //选中父节点取消他的子节点
    unSelectChildNode(node) {
      const store = this.tree.store;
      if (node.childNodes && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          let child = node.childNodes[i];
          let pos = store.currentNode.indexOf(child);
          child.isCurrent = false;
          this.deleteTreeCurrentNode(this.tree.currentNode[pos]);
          this.deleteTreeStoreCurrentNode(child);
          this.unSelectChildNode(child);
        }
      }
    },

    //选中子节点取消他的父节点
    unSelectParentNode(node) {
      const store = this.tree.store;
      if (node.parent) {
        let isCurrent = node.parent.isCurrent;
        if (isCurrent) {
          let parent = node.parent;
          let pos = store.currentNode.indexOf(parent);
          parent.isCurrent = false;
          this.deleteTreeCurrentNode(this.tree.currentNode[pos]);
          this.deleteTreeStoreCurrentNode(parent);
        } else {
          this.unSelectParentNode(node.parent);
        }
      }
    },

    handleMouseDown(e) {
      if (!this.draggable) return;
      if (e.which != 1) return;
      let node = this.$refs.node;

      if (!this.tree.isDragValidImpl(this.node)) {
        return;
      }
      this.dragTarget = node;
      this._handleMouseMove = this.handleMouseMove.bind(this);
      this._handleMouseUp = this.handleMouseUp.bind(this);
      this._handleKeyDown = this.handleKeyDown.bind(this);
      document.addEventListener("mousemove", this._handleMouseMove, true);
      document.addEventListener("mouseup", this._handleMouseUp, true);
      document.addEventListener("keydown", this._handleKeyDown, true);
      e.stopPropagation();
      this.originDragPos = {
        x: e.clientX,
        y: e.clientY
      };
      //console.log("mouse_down");
    },

    handleKeyDown(e) {
      if (e.keyCode == 27) {
        this.releaseDragResource();
      }
    },

    handleMouseMove(e) {
      if (
        Math.abs(this.originDragPos.x - e.clientX) < 10 &&
        Math.abs(this.originDragPos.y - e.clientY) < 10
      ) {
        return;
      }

      if (this.enableShadow && !this.shadowInit) {
        let target = this.dragTarget.firstChild;
        let currentNode = this.node.store.currentNode;
        let rect = target.getBoundingClientRect();
        if(currentNode && currentNode.length > 1 && currentNode.indexOf(this.node) >= 0){
          let blankDiv = document.createElement('div');
          blankDiv.innerText = currentNode.length;
          this.shadow = blankDiv;
          this.shadow.className = "__shadow_num";
          this.targetPaddingLeft = -20;
        }else{
          this.shadow = target.cloneNode(true);
          this.shadow.id = this.shadow.id + "__shadow";
          this.shadow.style.background = "transparent";
          this.targetPaddingLeft = parseInt(target.style.paddingLeft);
        }
        document.body.appendChild(this.shadow);
        this.shadowInit = true;
        this.shadow.style.position = "fixed";
        this.shadow.style.z_index = 99999;
        this.shadow.style.pointerEvents = "none";
      }

      let dropTarget = this.getDropTarget(e.clientX, e.clientY);
      this.updateDropTargetStatus(dropTarget);
      this.updateIndicator(e.clientX, e.clientY, dropTarget);

      if (this.expandTimer) {
        clearTimeout(this.expandTimer);
      }
      if (dropTarget && !this.dropOut) {
        this.expandTimer = setTimeout(() => {
          let node = this.node.store.getNode(dropTarget.id);
          if (node) {
            node.expand();
          }
        }, 1000);
      }

      if (this.enableShadow) {
        Object.assign(this.shadow.style, {
          top: e.clientY + "px",
          left: e.clientX - this.targetPaddingLeft + "px"
        });
      }

      e.stopPropagation();
    },

    clearDropTargetStatus(dropStatus) {
      if(dropStatus) { 
        dropStatus.removeAttribute('data-status');
      }
    },

    updateDropTargetStatus(dropStatus) {
      if (this.dropOut) {
        this.clearDropTargetStatus(dropStatus);
        return;
      }

      if (dropStatus != this.lastDropStatus) {
        this.clearDropTargetStatus(this.lastDropStatus);
        this.lastDropStatus = dropStatus;
      }

      if(dropStatus) {
        let dragNodes = this.tree.store.currentNode;
        let node = this.node.store.getNode(dropStatus.id);
        if (!this._isDropValid(dragNodes, node)) {
          dropStatus.setAttribute('data-status', '0');
        } else {
          dropStatus.setAttribute('data-status', '1');
        }
      }
    },

    _isDropValid(dragNodes, targetNode) {
      let nodes = dragNodes || [];
      dragNodes = nodes.indexOf(this.node) >= 0 ? nodes : [ this.node ];
      for (let i = 0; i < dragNodes.length; ++i) {
        if (!this.tree.isDropValidImpl(dragNodes[i], targetNode)) {
          return false;
        }
      }
      return true;
    },

    _isAddChildValid(dragNodes, targetNode) {
      let nodes = dragNodes || [];
      dragNodes = nodes.indexOf(this.node) >= 0 ? nodes :  [ this.node ];
      for (let i = 0; i < dragNodes.length; ++i) {
        if (!this.tree.isAddChildValidImpl(dragNodes[i], targetNode)) {
          return false;
        }
      }
      return true;
    },

    _isDropOutValid(dragNodes, targetNode) {
      let nodes = dragNodes || [];
      dragNodes = nodes.indexOf(this.node) >= 0 ? nodes : [ this.node ];
      for (let i = 0; i < dragNodes.length; ++i) {
        if (!this.tree.isDropOutValidImpl(dragNodes[i], targetNode)) {
          return false;
        }
      }
      return true;
    },

    updateIndicator(x, y, dropTarget) {
      if (!this.indicator) {
        this.addIndicator();
      }

      if (this.dropOut) {
        this.hideIndicator();
        return;
      }

      if (dropTarget == this.lastDropTarget) {
        this.updateIndicatorPos(x, y);
      } else {
        this.lastDropTarget = dropTarget;
        if (dropTarget != null) {
          let dragNodes = this.tree.store.currentNode;
          let node = this.node.store.getNode(dropTarget.id);
          // this.dropAsSiblingValid = this.tree.isDropValidImpl(this.node, node);
          // this.dropAsChildValid = this.tree.isAddChildValidImpl(
          //   this.node,
          //   node
          // );
          this.dropAsSiblingValid = this._isDropValid(dragNodes, node);
          this.dropAsChildValid = this._isAddChildValid(dragNodes, node);

          if (!this.dropAsSiblingValid && !this.dropAsChildValid) {
            this.hideIndicator();
            this.lastDropTarget = null;
            return;
          }

          this.lastDropTargetRect = dropTarget.getBoundingClientRect();
          this.dropNode = node;
          this.updateIndicatorPos(x, y);
        } else {
          this.hideIndicator();
        }
      }
    },

    getDropTarget(x, y) {
      this.dropOut = false;

      if (this.enableShadow && this.shadow) {
        this.shadow.style.display = "none";
      }
   
      let dropTarget = document.elementFromPoint(x, y);
      if (dropTarget && !this.tree.$refs.container.contains(dropTarget)) {
        let dragNodes = this.tree.store.currentNode;
        // this.tree.isDropOutValidImpl(this.node, dropTarget)
        if (
          dropTarget.className != "el-tree-node-drag-indicator" &&
          this._isDropOutValid(dragNodes, dropTarget)
        ) {
          this.dropOut = true;
        } else {
          dropTarget = null;
        }
      }

      if (!this.dropOut) {
        dropTarget = this.getItemUnderCursor(x, y);
      }

      if (this.enableShadow && this.shadow) {
        this.shadow.style.display = "block";
      }

      if (!this.dropOut && dropTarget && this.$refs.node.contains(dropTarget)) {
        dropTarget = null;
      }

      if (!this.dropOut && dropTarget) {
        let node = this.node.store.getNode(dropTarget.id);
        if (node) {
          if (dropTarget == this.$refs.node) {
            dropTarget = null;
          }
        } else {
          dropTarget = null;
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
      if (!this.indicator) {
        this.addIndicator();
      }
      if (!this.tree.shouldShowDragIndicator) {
        return;
      }
      this.indicator.style.display = "block";
    },

    updateIndicatorPosImpl(x, y) {
      this.showIndicator();
      Object.assign(this.indicator.style, {
        left: x + 35 + "px",
        top: y - 1 + "px"
      });
    },

    removeIndicator() {
      if (this.indicator) {
        document.body.removeChild(this.indicator);
        this.indicator = null;
      }
    },

    updateIndicatorPos(x, y) {
      if (!this.lastDropTarget) return;
      if (!this.dropNode) return;
      let y1 = this.lastDropTargetRect.top;
      let y2 = this.lastDropTargetRect.top + this.lastDropTargetRect.height;
      let x1 = this.lastDropTargetRect.left;
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

      let indent = this.tree.indent;
      if (x - x1 > indent && this.dropAsChildValid) {
        contentPadding += indent;
        this.dropAsChild = true;
        let firstChild = this.lastDropTarget.firstChild;
        let rect = firstChild.getBoundingClientRect();
        y2 = rect.top + rect.height;
        this.dropAsChild = true;
      } else if (this.dropAsSiblingValid) {
        this.dropAsChild = false;
      } else {
        return;
      }

      if (y < middle && !this.dropAsChild) {
        this.updateIndicatorPosImpl(left + contentPadding, y1);
        this.draggingInsertPos = "node-insert-before";
      } else {
        this.updateIndicatorPosImpl(left + contentPadding, y2);
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
      this.clearDropTargetStatus(this.lastDropStatus);
      const store = this.tree.store;
      let clearCache = () => {
        this.lastDropStatus = null;
        this.lastDropTarget = null;
        this.dropOut = false;
      };
      if (!this.draggable) return;
      if (e.which == 3) {
        this.releaseDragResource();
        clearCache();
        return;
      }

      if (this.expandTimer) {
        clearTimeout(this.expandTimer);
      }

      this.releaseDragResource();
      e.stopPropagation();

      const getSelectNodes = () => {
        let treeStoreCurrentNode = this.tree.store.currentNode || [];
        let _arr = [];
        //拖动对象是否为当前选中项中的一个
        if (treeStoreCurrentNode.indexOf(this.node) >= 0) {
          for (let i = 0; i < treeStoreCurrentNode.length; i++) {
            _arr.push(treeStoreCurrentNode[i].data);
          }
        } else {
          _arr.push(this.node.data);
        }
        return _arr;
      };

      if (this.dropOut) {
        let _arr = getSelectNodes();
        this.tree.$emit("node-drop-out", _arr);
        clearCache();
        return;
      }

      if (this.lastDropTarget) {
        let node = this.node.store.getNode(this.lastDropTarget.id);
        if (node) {
          let _arr = getSelectNodes();
          this.clearAllNodeData();
          this.tree.$emit(
            this.draggingInsertPos,
            _arr,
            node.data,
            this.dropAsChild
          );
        }
        /* this.tree.$emit(
          this.draggingInsertPos,
          this.node.data,
          node.data,
          this.dropAsChild
			  ); */
        clearCache();
      }
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

      document.removeEventListener("mousemove", this._handleMouseMove, true);
      document.removeEventListener("mouseup", this._handleMouseUp, true);
      document.removeEventListener("keydown", this._handleKeyDown, true);
    },

    //完成后清空所有存储数据
    clearAllNodeData() {
      let store = this.tree.store;
      if (store.currentNode) {
        for (let i = 0; i < store.currentNode.length; i++) {
          store.currentNode[i].isCurrent = false;
        }
      }
      this.tree.store.currentNode = [];
      this.tree.currentNode = [];
    },

    handleClick() {
      this.setCurrentNode("click");
      this.tree.$emit(
        "node-click",
        this.node.data,
        this.node,
        this,
        this.tree.store.currentNode
      );
    },

    handleDoubleClick() {
      this.setCurrentNode("double-click");
      this.tree.$emit(
        "node-double-click",
        this.node.data,
        this.node,
        this,
        this.tree.store.currentNode
      );
    },

    handleRightClick(event) {
      event.preventDefault();
      let currentNode = this.tree.store.currentNode || [];
      let pos = currentNode.indexOf(this.node);
      if (pos < 0) {
        this.setCurrentNode();
      }
      this.tree.$emit(
        "node-right-click",
        event,
        this.node.data,
        this.node,
        this,
        this.tree.store.currentNode
      );
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit(
          "node-collapse",
          this.node.data,
          this.node,
          this,
          this.tree.store.currentNode
        );
        this.node.collapse();
      } else {
        this.node.expand();
        this.$emit(
          "node-expand",
          this.node.data,
          this.node,
          this,
          this.tree.store.currentNode
        );
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
    this.useDisableStyle = tree.useDisableStyle;
    this.useCustomExpandIcon = tree.useCustomExpandIcon;

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
<style>
.el-tree-node-disabled {
  opacity: 0.5;
}
.el-tree-node-invalid {
  background-color: rgba(100, 0, 0, 1);
}

.combine-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
