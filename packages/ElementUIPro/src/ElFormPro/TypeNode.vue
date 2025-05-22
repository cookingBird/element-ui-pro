<template>
  <div v-bind="wrapperProps">
    <!-- input -->
    <el-input-pro
      v-if="slotIs === 'input'"
      :model="model"
      :value-key="valueKey"
      v-bind="slotProps"
      v-on="slotProps?.on"
    />
    <!-- date picker -->
    <el-date-picker-pro
      v-else-if="slotIs === 'datePicker'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      v-on="slotProps?.on"
    />
    <el-switch-pro
      v-else-if="slotIs === 'switch'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      v-on="slotProps?.on"
    />
    <!-- color picker -->
    <el-color-picker-pro
      v-else-if="slotIs === 'colorPicker'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      v-on="slotProps?.on"
    />
    <!-- select -->
    <el-select-pro
      v-else-if="slotIs === 'select'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :fetch="fetch"
      :effect-key="effectKey"
      v-on="slotProps?.on"
    />
    <!-- checkbox group -->
    <el-checkbox-group-pro
      v-else-if="slotIs === 'checkboxGroup'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :fetch="fetch"
      :effect-key="effectKey"
      v-on="slotProps?.on"
    />
    <!-- radio group -->
    <el-radio-group-pro
      v-else-if="slotIs === 'radioGroup'"
      v-bind="slotProps"
      :model="model"
      :value-key="valueKey"
      :fetch="fetch"
      :effect-key="effectKey"
      v-on="slotProps?.on"
    />
    <span v-else v-bind="slotProps">
      {{ getValue(model, valueKey) }}
    </span>
  </div>
</template>

<script>
import common from '../mixin/common'

export default {
  name: 'TypeNode',
  mixins: [common],
  props: {
    slotIs: {
      type: String,
      default: undefined,
    },
    slotProps: { type: Object, default: null },
    model: { type: Object, default: null },
    valueKey: { type: String, default: undefined },
    wrapperProps: { type: Object, default: null },
    effectKey: { type: [String, Array], default: null },
    fetch: { type: Function, default: null },
    valueFormatter: {
      type: Function,
      default: value => {
        return value || '--'
      },
    },
  },
  methods: {
    getValue(model, valueKey) {
      return this.valueFormatter(this.get(model, valueKey))
    },
  },
}
</script>
