<template>
  <el-select
    :value="valueGetter(model)"
    v-bind="$attrs"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <el-option
      v-for="(ops, index) in innerOptions"
      :key="index"
      :label="ops[optionKey.label]"
      :value="ops[optionKey.value]"
    >
    </el-option>
  </el-select>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter';
import dataFetch from './mixin/dataFetch';

export default {
  name: 'ElSelectPro',
  mixins: [createGetterAndSetter(undefined), dataFetch],
  props: {
    options: Array,
    optionKey: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' }),
    },
  },
  data() {
    return {
      ops: [],
    };
  },
  computed: {
    innerOptions() {
      const { options, ops } = this;
      return options || ops || [];
    },
  },
};
</script>
