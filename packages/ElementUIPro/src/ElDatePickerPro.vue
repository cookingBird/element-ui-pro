<template>
  <el-date-picker
    ref="item"
    :value="valueGetter(model)"
    v-bind="$attrs"
    @input="handleInput"
    v-on="$listeners"
  ></el-date-picker>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter';
import { passRef } from './mixin/slot';

export default {
  name: 'ElDatePickerPro',
  mixins: [createGetterAndSetter([]), passRef('item')],
  data() {
    return {};
  },
};
</script>
