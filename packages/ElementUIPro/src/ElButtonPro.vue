<template>
  <el-button ref="btn" v-bind="$attrs" :loading="loading" @click="handleClick">
    <slot>Button</slot>
  </el-button>
</template>

<script>
export default {
  name: 'ElButtonPro',
  data() {
    return {
      loading: false,
    };
  },
  emit: ['click'],
  mounted() {
    console.log('slots', this.$slots);
    console.log('scopedSlots', this.$scopedSlots);
  },
  methods: {
    handleClick(ev) {
      this.loading = true;
      const done = () => {
        this.loading = false;
      };
      this.$emit('click', done, ev);
    },
  },
};
</script>
