<template>
  <el-input
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #suffix>
      <slot name="suffix" />
    </template>
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
      <slot name="append" />
    </template>
  </el-input>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter';

export default {
  name: 'ElInputPro',
  mixins: [createGetterAndSetter('')],
};
</script>
