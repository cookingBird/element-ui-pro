<template>
  <el-date-picker
    :value="valueGetter(model)"
    v-bind="$attrs"
    @input="handleInput"
    v-on="$listeners"
  >
    <!-- Passive slots -->
    <template
      v-for="slotName of Object.keys($scopedSlots)"
      :slot="slotName"
      slot-scope="scope"
    >
      <slot
        :name="slotName"
        v-bind="scope"
      />
    </template>
  </el-date-picker>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter';

export default {
  name: 'ElDatePickerPro',
  mixins: [createGetterAndSetter(undefined)],
  props: {
    value: [String, Date],
  },
};
</script>
