<template>
  <el-input
    ref="item"
    :value="innerValue"
    @input="handleInput"
    v-on="$listeners"
    v-bind="$attrs"
  >
  </el-input>
</template>

<script>
import createGetterAndSetter from "./mixin/createGetterAndSetter";
import { passRef } from "./mixin/slot";

export default {
  name: "ElInputPro",
  mixins: [createGetterAndSetter(""), passRef("item")],
  props: {
    model: Object,
    valueKey: String,
  },
  computed: {
    innerValue() {
      const { model, valueKey, value } = this;
      return model && valueKey ? valueGetter(model) : value;
    },
  },
};
</script>

