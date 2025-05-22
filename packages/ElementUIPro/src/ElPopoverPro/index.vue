<template>
  <el-popover v-bind="$attrs" :placement="placement" v-on="$listeners">
    <!-- Passive slots -->
    <template v-for="slotName of Object.keys($scopedSlots)" :slot="slotName" slot-scope="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
  </el-popover>
</template>

<script>
export default {
  name: 'ElPopoverPro',
  props: {
    placement: {
      type: String,
      default: 'top', // top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    },
    trigger: {
      type: String,
      default: 'hover', // click/focus/hover/manual
    },
  },
}
</script>

<!-- <style lang="scss" scoped></style> -->
