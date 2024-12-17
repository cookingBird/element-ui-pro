<template>
  <el-input
    v-bind="$attrs"
    :value="valueGetter(model)"
    v-on="$listeners"
    @input="handleInput"
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
  </el-input>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'

export default {
  name: 'ElInputPro',
  mixins: [createGetterAndSetter('')],
}
</script>
