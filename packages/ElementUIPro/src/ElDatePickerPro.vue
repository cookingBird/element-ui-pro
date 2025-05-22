<template>
  <el-date-picker
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
  ></el-date-picker>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'

export default {
  name: 'ElDatePickerPro',
  mixins: [createGetterAndSetter('')],
}
</script>
