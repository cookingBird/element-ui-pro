<template>
  <el-radio-group
    v-loading="loading"
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
  >
    <template v-for="(item, index) in innerOptions">
      <el-radio-button
        v-if="item.type === 'button'"
        :key="index"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio-button>
      <el-radio v-else :key="index" :label="item.value">
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>


<script>
import createGetterAndSetter from "./mixin/createGetterAndSetter";
import dataFetch from "./mixin/dataFetch";

export default {
  name: "ElRadioGroupPro",
  mixins: [createGetterAndSetter(""), dataFetch],
  props: {
    value: [String, Number, Boolean],
    options: Array,
  },
  computed: {
    innerOptions() {
      const { options, ops } = this;
      return options || ops || [];
    },
  },
};
</script>
