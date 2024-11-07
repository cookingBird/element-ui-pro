<template>
  <div class="inline">
    <template v-for="(item, index) in buttons">
      <ElButtonPro
        :key="index"
        v-if="item.if ?? true"
        v-bind="omit(item, 'if', 'listeners', 'label', '')"
        v-on="item.listeners"
      >
        <slot :name="label">
          {{ item.label }}
        </slot>
      </ElButtonPro>
    </template>
  </div>
</template>

<script>
import { omit } from "lodash";
import ElButtonPro from "./ElButtonPro.vue";
export default {
  name: "ElButtonGroupPro",
  components: { ElButtonPro },
  props: {
    buttons: Array,
    scope: Object,
  },
  data() {
    return {};
  },
  methods: {
    omit,
  },
};
</script>
