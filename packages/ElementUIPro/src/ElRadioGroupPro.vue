<template>
  <el-radio-group
    v-loading="loading"
    v-bind="$attrs"
    :value="valueGetter(model)"
    :data-split="split"
    v-on="$listeners"
    @input="handleInput"
  >
    <template v-for="(item, index) in innerOptions">
      <el-radio-button
        v-if="item.type === 'button'"
        :key="index"
        v-bind="item"
        :label="item.value"
        :disabled="item.disabled"
        :name="item.name"
      >
        {{ item.label }}
      </el-radio-button>
      <el-radio
        v-else
        :key="index"
        v-bind="item"
        :label="item.value"
        :border="item.border"
        :disabled="item.disabled"
        :name="item.name"
        :size="item.size"
      >
        {{ item.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'
import dataFetch from './mixin/dataFetch'
import common from './mixin/common'

export default {
  name: 'ElRadioGroupPro',
  mixins: [createGetterAndSetter(undefined), dataFetch, common],
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: '',
    },
    options: Array,
    split: Boolean,
  },
  computed: {
    innerOptions() {
      const { options, ops } = this
      return options || ops || []
    },
  },
}
</script>
<style lang="scss">
.el-radio-group[data-split='true'] {
  --gap: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--gap);

  .el-radio-button__inner {
    border-left: 1px solid #dcdfe6;
    border-radius: 4px !important;
    box-shadow: none !important;
  }
}
</style>
