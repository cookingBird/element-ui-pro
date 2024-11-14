<template>
  <el-button-group>
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
</template>

<script>
import { omit } from 'lodash';
import ElButtonPro from './ElButtonPro.vue';
export default {
  name: 'ElButtonGroupPro',
  components: { ElButtonPro },
  props: {
    buttons: Array,
  },
  data() {
    return {};
  },
  methods: {
    omit,
  },
};
</script>
