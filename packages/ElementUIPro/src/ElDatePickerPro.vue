<template>
  <el-date-picker
    ref="item"
    :value="valueGetter(model)"
    v-bind="$attrs"
    @input="handleInput"
    v-on="$listeners"
  >
    <!-- Passive slots -->
    <template v-for="[sName, fn] of Object.entries($scopedSlots)">
      <template
        v-if="!fn.length"
        :slot="sName"
      >
        <slot :name="sName" />
      </template>
      <template
        v-else
        :slot="sName"
        slot-scope="scope"
      >
        <slot
          :name="sName"
          v-bind="scope"
        />
      </template>
    </template>
  </el-date-picker>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'

export default {
  name: 'ElDatePickerPro',
  mixins: [createGetterAndSetter([])],
}
</script>

