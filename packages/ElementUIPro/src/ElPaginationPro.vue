<template>
  <el-pagination
    v-bind="$attrs"
    :class="{
      'el-pagination-pro': true,
      'el-pagination-pro--transparent': backgroundTransparent,
    }"
    :hide-on-single-page="hideOnSinglePage"
    :layout="layout"
    :small="small"
    :background="background"
    v-on="$listeners"
  >
    <slot></slot>
  </el-pagination>
</template>

<script>
export default {
  name: 'ElPaginationPro',
  props: {
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'prev, pager, next, jumper, ->, total', // pre/jumper,pager,next,sizes,slot,total,->
    },
    small: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
      default: false,
    },
    backgroundTransparent: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style>
.el-pagination-pro--transparent {
  --el-pagination-background-color: transparent;
  --el-pagination-button-disabled-background-color: transparent;
}
</style>
