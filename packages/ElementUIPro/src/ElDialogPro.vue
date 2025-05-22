<template>
  <el-dialog
    v-bind="omit($attrs, 'visible')"
    :visible="innerVisible"
    :title="title"
    :append-to-body="appendToBody"
    :class="{
      'dialog--reset-padding': resetPadding,
    }"
    v-on="$listeners"
    @update:visible="handleVisible"
  >
    <!-- Passive slots -->
    <template v-for="slotName of Object.keys($scopedSlots)" :slot="slotName" slot-scope="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
  </el-dialog>
</template>

<script>
import common from './mixin/common'

export default {
  name: 'ElDialogPro',
  mixins: [common],
  props: {
    visible: [Boolean, Object],
    resetPadding: {
      type: Boolean,
      default: false,
    },
    appendToBody: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    innerVisible() {
      return Boolean(this.visible)
    },
  },
  methods: {
    handleVisible(val) {
      if (typeof this.visible === 'object') {
        this.handleVisible = _val => {
          if (!_val) {
            this.$emit('update:visible', null)
          } else {
            this.$emit('update:visible', _val)
          }
        }
      } else {
        this.handleVisible = _val => {
          this.$emit('update:visible', _val)
        }
      }
      this.handleVisible(val)
    },
  },
}
</script>
<style>
.dialog--reset-padding .el-dialog__body {
  padding: 0px;
}
</style>
