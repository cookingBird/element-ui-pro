<template>
  <el-button ref="btn" v-bind="$attrs" :loading="loading" @click="_handleClick">
    <slot>Button</slot>
  </el-button>
</template>

<script>
import { passRef } from "./mixin/slot";
export default {
  name: "ElButtonPro",
  data() {
    return {
      loading: false,
    };
  },
  emit: ["click"],
  mounted() {
    console.log("slots", this.$slots);
    console.log("scopedSlots", this.$scopedSlots);
  },
  methods: {
    _handleClick(ev) {
      this.loading = true;
      this.$emit("click", () => (this.loading = false), ev);
    },
  },
};
</script>

<style lang="scss">
</style>