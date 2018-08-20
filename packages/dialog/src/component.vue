<template>
  <div class="el-dialog__wrapper"
    tabindex="-1"
    v-show="visible"
    @click="handleWrapperClick"
    @mousemove="handleMouseMove">
    <div class="el-dialog"
      :class="[sizeClass, customClass]"
      ref="dialog"
      :style="style"
      @mouseup="handleMouseUp">
      <div class="el-dialog__header"
        @mousedown="handleMouseDown">
        <slot name="title">
          <span class="el-dialog__title">{{title}}</span>
        </slot>
        <slot name="paste"></slot>
        <button type="button"
          class="el-dialog__headerbtn"
          aria-label="Close"
          v-if="showClose"
          @click="handleClose">
          <i class="el-dialog__close el-icon el-icon-close"></i>
        </button>
      </div>
      <div class="el-dialog__body"
        v-if="rendered">
        <slot></slot>
      </div>
      <div class="el-dialog__footer"
        v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <div class='el-dialog__resizer corner bottom-right'
        @mousedown='handleResizerMouseDown($event, false, false)'>
      </div>
      <div class='el-dialog__resizer corner bottom-left'
        @mousedown='handleResizerMouseDown($event, true, false)'>
      </div>
      <div class='el-dialog__resizer corner top-left'
        @mousedown='handleResizerMouseDown($event, true, true)'>
      </div>
      <div class='el-dialog__resizer corner top-right'
        @mousedown='handleResizerMouseDown($event, false, true)'>
      </div>
      <div class='el-dialog__resizer sider top'
        @mousedown='handleResizerMouseDown($event, false, true, false, true)'>
      </div>
      <div class='el-dialog__resizer sider bottom'
        @mousedown='handleResizerMouseDown($event, false, false, false, true)'>
      </div>
      <div class='el-dialog__resizer sider left'
        @mousedown='handleResizerMouseDown($event, true, false, true, false)'>
      </div>
      <div class='el-dialog__resizer sider right'
        @mousedown='handleResizerMouseDown($event, false, false, true, false)'>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "element-ui/src/utils/popup";
import emitter from "element-ui/src/mixins/emitter";

export default {
  name: "ElDialog",

  mixins: [Popup, emitter],

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

    resizable: {
      type: Boolean,
      default: true
    },

    customClass: {
      type: String,
      default: ""
    },

    top: {},
    left: {},
    width: {},
    height: {},
    beforeClose: Function
  },

  data() {
    return {
      l: 0,
      t: 0,
      w: 400,
      h: 200,
      minW: 400,
      minH: 200,
      dragging: false,
      resizing: false
    };
  },

  created() {
    this.t = this.top || 200;
    this.l = this.left || -1;
    this.w = this.width ? this.width : this.w;
    this.h = this.height;
    this.minW = this.width ? this.width : this.minW;
    this.minH = this.height;
  },

  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      this.centerDialog();
    }
  },

  watch: {
    visible(val) {
      this.$emit("update:visible", val);
      if (val) {
        this.$emit("open");
        this.$el.addEventListener("scroll", this.updatePopper);
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0;
          this.centerDialog();
        });
      } else {
        this.$el.removeEventListener("scroll", this.updatePopper);
        this.$emit("close");
      }
    },
    height(newHeight) {
      this.minH = newHeight;
      this.h = newHeight;
    }
  },

  computed: {
    sizeClass() {
      return `el-dialog--${this.size}`;
    },
    style() {
      return {
        top: this.realTop,
        left: this.realLeft,
        width: this.realWidth,
        height: this.realHeight
      };
    },
    realTop() {
      return this.t + "px";
    },
    realLeft() {
      return typeof this.l == "string" ? this.l : this.l + "px";
    },
    realWidth() {
      return this.w + "px";
    },
    realHeight() {
      return this.h ? (this.h + "px") : 'auto';
    }
  },

  methods: {
    centerDialog() {
      let dialog = this.$refs.dialog;
      let parent = document.documentElement;

      if (!this.left) {
        this.l = (parent.offsetWidth - dialog.offsetWidth) / 2;
      }
    },
    handleWrapperClick() {
      // if (!this.closeOnClickModal) return;
      // this.handleClose();

      this.$emit("wrapper-clicked");
    },
    handleClose() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    move(x, y) {
      this.l += x;
      this.t += y;

      this.updateBounding();
    },
    updateBounding() {
      let dialog = this.$refs.dialog;
      let parent = document.documentElement;
      let dialogWidth = dialog.offsetWidth;
      let dialogHeight = dialog.offsetHeight;

      this.l = this.l < 0 ? 0 : this.l;
      this.t = this.t < 0 ? 0 : this.t;
      this.l =
        this.l + dialogWidth > parent.offsetWidth
          ? parent.offsetWidth - dialogWidth
          : this.l;
      this.t =
        this.t + dialogHeight > parent.offsetHeight
          ? parent.offsetHeight - dialogHeight
          : this.t;
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("visible-change", false);
      }
    },
    updatePopper() {
      this.broadcast("ElSelectDropdown", "updatePopper");
      this.broadcast("ElDropdownMenu", "updatePopper");
    },
    handleMouseDown(e) {
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
    handleMouseMove(e) {
      if (this.dragging) {
        let delta = {
          x: e.clientX - this.dragPos.x,
          y: e.clientY - this.dragPos.y
        };

        this.l = this.oldPos.l + delta.x;
        this.t = this.oldPos.t + delta.y;

        this.updateBounding();
      } else if (this.resizing) {
        let info = this.resizingInfo;
        let deltaX = e.clientX - info.x;
        let deltaY = e.clientY - info.y;
        let w = info.originW + deltaX * (info.moveX ? -1 : 1);
        let h = info.originH + deltaY * (info.moveY ? -1 : 1);
        if (w < this.minW || h < this.minH) {
          return;
        }

        if (info.enableX) {
          this.w = w;
        }

        if (info.enableY) {
          this.h = h;
        }

        if (info.moveX && info.enableX) {
          this.l = info.originX + deltaX;
        }
        if (info.moveY && info.enableY) {
          this.t = info.originY + deltaY;
        }
      }
    },
    handleMouseUp(e) {
      this.dragging = false;
      this.resizing = false;
    },
    handleResizerMouseDown(e, moveX, moveY, enableX = true, enableY = true) {
      if (!this.resizable) {
        return;
      }
      this.resizing = true;
      this.resizingInfo = {
        x: e.clientX,
        y: e.clientY,
        originW: this.w,
        originH: this.h,
        moveX,
        moveY,
        enableX,
        enableY,
        originX: this.l,
        originY: this.t
      };
    }
  }
};
</script>
<style>
.el-dialog {
  display: flex;
  flex-flow: column;
}
.el-dialog__body {
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  flex-shrink: 1;
}
.el-dialog__header,
.el-dialog__footer {
  flex-grow: 0;
  flex-shrink: 0;
}
.el-dialog__resizer.corner {
  position: absolute;
  /* background-color: red; */
  width: 10px;
  height: 10px;
}

.el-dialog__resizer.corner.bottom-right {
  bottom: 0px;
  right: 0px;
  cursor: nwse-resize;
}

.el-dialog__resizer.corner.top-left {
  top: 0px;
  left: 0px;
  cursor: nwse-resize;
}

.el-dialog__resizer.corner.top-right {
  top: 0px;
  right: 0px;
  cursor: nesw-resize;
}

.el-dialog__resizer.corner.bottom-left {
  bottom: 0px;
  left: 0px;
  cursor: nesw-resize;
}

.el-dialog__resizer.sider {
  position: absolute;
  /* background-color: red; */
  background-color: transparent;
}

.el-dialog__resizer.sider.top {
  top: 0px;
  left: 10px;
  right: 10px;
  height: 10px;
  cursor: ns-resize;
}

.el-dialog__resizer.sider.bottom {
  bottom: 0px;
  left: 10px;
  right: 10px;
  height: 10px;
  width: auto;
  cursor: ns-resize;
}

.el-dialog__resizer.sider.left {
  left: 0px;
  top: 10px;
  bottom: 10px;
  width: 10px;
  cursor: ew-resize;
}

.el-dialog__resizer.sider.right {
  right: 0px;
  top: 10px;
  bottom: 10px;
  width: 10px;
  cursor: ew-resize;
}
</style>