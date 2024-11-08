<template>
  <el-checkbox
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @change="handleInput"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script>
import createGetterAndSetter from "./mixin/createGetterAndSetter";

export default {
  name: "ElCheckboxPro",
  mixins: [createGetterAndSetter("")],
  props: {
    value: Boolean,
  },
};
</script>

