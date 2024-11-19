<template>
  <el-button-group v-if="rawGroup">
    <template v-for="(item, index) in buttons">
      <ElButtonPro
        v-if="item.if ?? true"
        :key="index"
        v-bind="omit(item, 'if', 'listeners', 'label')"
        v-on="item.listeners"
      >
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </ElButtonPro>
    </template>
  </el-button-group>
  <div
    v-else
    class="button-group-pro"
    :data-custom="!rawGroup"
  >
    <template v-for="(item, index) in buttons">
      <ElButtonPro
        v-if="item.if ?? true"
        :key="index"
        v-bind="omit(item, 'if', 'listeners', 'label')"
        v-on="item.listeners"
      >
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </ElButtonPro>
    </template>
  </div>
</template>

<script>
import { omit } from 'lodash';
import ElButtonPro from './ElButtonPro.vue';

export default {
  name: 'ElButtonGroupPro',
  components: { ElButtonPro },
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    rawGroup: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    omit,
  },
};
</script>
<style>
.button-group-pro[data-custom='true'] {
  --padding-inline: 15px;
  --padding-block: 9px;
  all: initial;
  display: flex;
  align-items: center;
}
.button-group-pro[data-custom='true'] .el-button--primary {
  line-height: 1em;
}
.button-group-pro[data-custom='true'] .el-button {
  padding-inline: var(--padding-inline);
  padding-block: var(--padding-block);
}
</style>
