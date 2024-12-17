<template>
  <el-tree v-bind="$attrs" :props="innerProps" v-on="$listeners">
    <!-- Passive slots -->
    <template v-for="slotName of Object.keys($scopedSlots)" :slot="slotName" slot-scope="scope">
      <slot :name="slotName" v-bind="scope"></slot>
    </template>
  </el-tree>
</template>

<script>
export default {
  name: 'ElTreePro',
  computed: {
    innerProps() {
      return {
        isLeaf: 'leaf',
        ...this.$attrs.props,
      }
    },
  },
}
</script>
