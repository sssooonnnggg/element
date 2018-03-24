import Dragula from "dragula";

class DragulaWrapper {
  constructor() {
    this.drake = Dragula({
      copy: true,
      accepts: (el, target, source, sibling) => {
        if (!this.tree) {
          return false;
        }
        if (el.contains(target)) {
          return false;
        }
        let nodeId = target.children[0].id;
        let targetNode = this.tree.store.getNode(nodeId);
        let node = this.tree.store.getNode(el.id);
        if (!targetNode) {
          return false;
        }
        return this.tree.isDropValidImpl(node, targetNode);
      },
      isContainer: el => {
        return (
          this.tree &&
          this.tree.$el.contains(el) &&
          this.tree.draggable &&
          el.className == "drag-content"
        );
      },
      invalid: (el, handle) => {
        function getNodeId(el) {
          if (el.id) {
            return el.id;
          }
          return getNodeId(el.parentNode);
        }

        if (!this.tree) {
          return true;
        }

        if (!this.tree.$el.contains(el)) {
          return true;
        }

        let node = this.tree.store.getNode(getNodeId(el));

        if (!node) {
          return true;
        }

        return !this.tree.isDragValidImpl(node);
      }
    });

    this.drake.on("drop", (el, target, source, sibling) => {
      if (!target || !this.tree) {
        return;
      }

      let nodeId = target.children[0].id;
      let siblingNode = this.tree.store.getNode(nodeId);
      let node = this.tree.store.getNode(el.id);

      if (!sibling) {
        this.tree.$emit("node-insert-after", node.data, siblingNode.data);
      } else {
        this.tree.$emit("node-insert-before", node.data, siblingNode.data);
      }
    });

    // 拖放时虚节点的缩进处理一级是否显示
    this.drake.on("shadow", (el, dropTarget, _source, sibling) => {

      if (!this.tree) {
        return;
      }


      if (!sibling || !this.tree.shouldShowShadowItemImpl(this.tree.store.getNode(sibling.id))) {
        el.style.display = 'none';
      } 

      let findParent = item => {
        let parentNode = item.parentNode;
        if (!parentNode) {
          return null;
        } else {
          if (
            parentNode.className &&
            parentNode.className.match(/el-tree-node$|el-tree-node\s/g)
          ) {
            return parentNode;
          }
          return findParent(parentNode);
        }
      };

      let parentNode = findParent(dropTarget);
      let indent;
      if (!parentNode) {
        indent = 0;
      } else {
        const node = this.tree.store.getNode(parentNode.id);
        indent = node.indent;
      }

      let fixedPadding = this.tree.indent * indent;
      let actualPadding = parseInt(el.children[0].style.paddingLeft);
      let extraPadding = fixedPadding - actualPadding;
      let addPadding = item => {
        if (
          item.className.match(
            /el-tree-node__content$|el-tree-node__content\s/g
          )
        ) {
          let originPadding = parseInt(item.style.paddingLeft);
          item.style.paddingLeft = originPadding + extraPadding + "px";
        }

        if (!item.children) {
          return;
        }

        for (let i = 0; i < item.children.length; ++i) {
          addPadding(item.children[i]);
        }
      };

      addPadding(el);
    });
  }

  addEventListener(tree) {
    this.tree = tree;
  }

  removeEventListener() {
    this.tree = null;
  }
}

let dragulaInstance = new DragulaWrapper();

export default dragulaInstance;
