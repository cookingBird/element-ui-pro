<template>
  <el-color-picker
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
  >
  </el-color-picker>
</template>

<script>
import createGetterAndSetter from '../mixin/createGetterAndSetter'

export default {
  name: 'ElColorPickerPro',
  mixins: [createGetterAndSetter('')],
  mounted() {},
  methods: {},
}
</script>
