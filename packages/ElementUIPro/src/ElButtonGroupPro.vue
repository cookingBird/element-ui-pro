<template>
  <el-button-group v-if="raw">
    <template v-for="(item, index) in buttons">
      <ElButtonPro
        v-if="item.if ?? true"
        :key="index"
        v-bind="omit(item, 'if', 'label')"
        v-on="item.on"
      >
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </ElButtonPro>
    </template>
  </el-button-group>
  <div v-else class="button-group-pro" :data-custom="!raw">
    <template v-for="(item, index) in buttons">
      <ElButtonPro
        v-if="item.if ?? true"
        :key="index"
        v-bind="omit(item, 'if', 'listeners', 'label')"
        v-on="item.on"
      >
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </ElButtonPro>
    </template>
  </div>
</template>

<script>
import { omit } from 'lodash'
import ElButtonPro from './ElButtonPro.vue'

export default {
  name: 'ElButtonGroupPro',
  components: { ElButtonPro },
  props: {
    buttons: {
      type: Array,
      default: () => [],
    },
    raw: Boolean,
  },
  data() {
    return {}
  },
  methods: {
    omit,
  },
}
</script>
<style lang="scss">
:where(.button-group-pro[data-custom='true']) {
  --padding-inline: 15px;
  --padding-block: 9px;
  all: initial;
  display: flex;
  align-items: center;
  .el-button--primary {
    line-height: 1em;
  }
  .el-button {
    padding-inline: var(--padding-inline);
    padding-block: var(--padding-block);
  }
  .el-button + .el-button {
    margin: initial;
  }
}
</style>
