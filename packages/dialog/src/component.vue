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

    customClass: {
      type: String,
      default: ""
    },

    top: {},
    left: {},
    beforeClose: Function
  },

  data() {
    return {
      l: 0,
      t: 0
    };
  },

  created() {
    this.t = this.top || 200;
    this.l = this.left || -1;
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
    }
  },

  computed: {
    sizeClass() {
      return `el-dialog--${this.size}`;
    },
    style() {
      return {
        top: this.realTop,
        left: this.realLeft
      };
    },
    realTop() {
      return this.t + "px";
    },
    realLeft() {
      return typeof this.l == "string" ? this.l : this.l + "px";
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
      if (!this.dragging) {
        return;
      }

      let delta = {
        x: e.clientX - this.dragPos.x,
        y: e.clientY - this.dragPos.y
      };

      this.l = this.oldPos.l + delta.x;
      this.t = this.oldPos.t + delta.y;

      this.updateBounding();
    },
    handleMouseUp(e) {
      this.dragging = false;
    }
  }
};
</script>
