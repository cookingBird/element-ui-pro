<template>
  <el-switch
    v-bind="$attrs"
    :value="valueGetter(model)"
    class="el-input-pro"
    :class="`el-switch--${size}`"
    v-on="$listeners"
    @input="handleInput"
  ></el-switch>
</template>

<script>
import createGetterAndSetter from '@/components/element-ui-pro/src/mixin/createGetterAndSetter'

export default {
  name: 'ElSwitchPro',
  mixins: [createGetterAndSetter(undefined)],
  props: {
    size: {
      type: String,
      default: 'default', // large medium default mini
    },
  },
}
</script>
