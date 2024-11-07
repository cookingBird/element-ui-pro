<template>
  <el-button ref="btn" v-bind="$attrs" :loading="loading" @click="_handleClick">
  </el-button>
</template>

<script>
import { passRef } from "./mixin/slot";
export default {
  name: "ElButonPro",
  mixins: [passRef("btn")],
  data() {
    return {
      loading: false,
    };
  },
  emit: ["click"],
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