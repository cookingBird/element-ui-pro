<template>
  <el-popconfirm
    v-if="popconfirm"
    v-bind="{ placement: 'top', ...popconfirm }"
    @confirm="handleClick"
  >
    <el-button slot="reference" v-bind="omit($attrs, 'popconfirm')" :loading="loading">
      <template v-if="$scopedSlots.default">
        <slot></slot>
      </template>
    </el-button>
  </el-popconfirm>
  <el-button v-else v-bind="$attrs" :loading="loading" @click="handleClick">
    <template v-if="$scopedSlots.default">
      <slot></slot>
    </template>
  </el-button>
</template>

<script>
import listenerInvoker from './utils/listenerInvoker'
import common from './mixin/common'

export default {
  name: 'ElButtonPro',
  mixins: [common],
  inheritAttrs: false,
  props: {
    popconfirm: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    handleClick(ev) {
      const { click: clickInvoker } = this.$listeners
      listenerInvoker(clickInvoker, fn => {
        if (fn?.length === 0) {
          fn()
        }
        if (fn?.length === 1) {
          this.loading = true
          const done = () => {
            this.loading = false
          }
          fn(done)
        }
        if (fn?.length === 2) {
          this.loading = true
          const done = () => {
            this.loading = false
          }
          fn(done, ev)
        }
      })
    },
  },
}
</script>
