<template>
  <div v-bind="wrapperProps">
    <!-- input -->
    <el-input-pro
      v-if="slotIs === 'input'"
      :model="model"
      :value-key="valueKey"
      v-bind="slotProps"
      v-on="slotProps?.on"
    ></el-input-pro>
    <!-- select -->
    <el-select-pro
      v-else-if="slotIs === 'select'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :effect-key="effectKey"
      :fetch="fetch"
      v-on="slotProps?.on"
    >
    </el-select-pro>
    <!-- checkbox group -->
    <el-checkbox-group-pro
      v-else-if="slotIs === 'checkboxGroup'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :effect-key="effectKey"
      :fetch="fetch"
      v-on="slotProps?.on"
    >
    </el-checkbox-group-pro>
    <!-- radio group -->
    <el-radio-group-pro
      v-else-if="slotIs === 'radioGroup'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :effect-key="effectKey"
      :fetch="fetch"
      v-on="slotProps?.on"
    >
    </el-radio-group-pro>
    <!-- date picker -->
    <el-date-picker-pro
      v-else-if="slotIs === 'datePicker'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :effect-key="effectKey"
      :fetch="fetch"
      v-on="slotProps?.on"
    >
    </el-date-picker-pro>
    <slot v-else-if="slotIs === 'slot'" :name="slotName"></slot>
    <span v-else v-bind="slotProps">
      {{ getValue(dict, dictFinder, model, valueKey) }}
    </span>
  </div>
</template>

<script>
import common from '../mixin/common'

export default {
  name: 'TypeNode',
  mixins: [common],
  props: {
    slotIs: String,
    slotName: String,
    slotProps: Object,
    model: Object,
    valueKey: String,
    wrapperProps: Object,
    effectKey: [String, Array],
    fetch: Function,
    dict: {
      type: Array,
      default: null,
    },
    dictFinder: {
      type: Function,
      default: (dict, value) => {
        return dict.find(item => item.code === value)?.name || '--'
      },
    },
  },
  methods: {
    getValue(dict, dictFinder, model, valueKey) {
      let res = this.get(model, valueKey)
      if (dict) {
        res = dictFinder(dict, res)
      }
      return res
    },
  },
}
</script>
