<template>
  <el-button ref="btn" v-bind="$attrs" :loading="loading" @click="handleClick">
    <template v-if="$scopedSlots.default">
      <slot></slot>
    </template>
  </el-button>
</template>

<script>
export default {
  name: 'ElButtonPro',
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    handleClick(ev) {
      this.loading = true
      const done = () => {
        this.loading = false
      }
      this.$emit('click', done, ev)
    },
  },
}
</script>
