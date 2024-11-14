<template>
  <el-input
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #suffix>
      <slot name="suffix"></slot>
    </template>
    <template #prepend>
      <slot name="prepend"></slot>
    </template>
    <template #append>
      <slot name="append"></slot>
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
