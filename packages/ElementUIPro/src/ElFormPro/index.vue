<template>
  <el-form
    v-bind="innerProps"
    :model="model"
    :rules="rules"
    v-on="merge($listeners, innerProps.on)"
  >
    <template v-if="innerProps.inline || !innerProps.row">
      <template v-for="(column, index) of innerProps.columns">
        <form-item
          v-if="column.if ?? true"
          :key="index"
          v-bind="column.formItemProps"
          :prop="getFormItemProp(column)"
        >
          <template #label>
            <slot :name="getFormItemProp(column) + 'Label'" :column="column">
              {{ column.formItemProps.label }}
            </slot>
          </template>
          <slot :name="getFormItemProp(column)" :column="column">
            <type-node-vue
              :model="model"
              :valueKey="getFormItemProp(column)"
              :wrapperProps="column.wrapperProps"
              :slotIs="column.slotIs"
              :slotName="column.slotName"
              :slotProps="column.slotProps"
              :fetch="column.fetch || column.slotProps?.fetch"
              :effectKey="column.effectKey || column.slotProps?.effectKey"
            />
          </slot>
        </form-item>
      </template>
    </template>
    <el-row v-else-if="innerProps.row" v-bind="innerProps.row">
      <template v-for="(column, index) of innerProps.columns">
        <el-col v-bind="column.col" :key="index">
          <FormItem
            v-if="column.if ?? true"
            :key="index"
            v-bind="column.formItemProps"
            :prop="getFormItemProp(column)"
          >
            <template #label>
              <slot :name="getFormItemProp(column) + 'Label'" :column="column">
                {{ column.formItemProps.label }}
              </slot>
            </template>
            <slot :name="getFormItemProp(column)" :column="column">
              <type-node-vue
                :model="model"
                :valueKey="getFormItemProp(column)"
                :wrapperProps="column.wrapperProps"
                :slotIs="column.slotIs"
                :slotName="column.slotName"
                :slotProps="column.slotProps"
                :fetch="column.fetch || column.slotProps?.fetch"
                :effectKey="column.effectKey || column.slotProps?.effectKey"
              />
            </slot>
          </FormItem>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { FormItem } from 'element-ui';
import common from '../mixin/common';
import TypeNodeVue from './components/TypeNode.vue';
import ElButtonGroupProVue from '../ElButtonGroupPro.vue';
export default {
  name: 'ElFormPro',
  components: { FormItem, TypeNodeVue, ElButtonGroupProVue },
  mixins: [common],
  props: {
    model: {
      type: Object,
      required: true,
    },
    options: Object,
    columns: Array,
    rules: Object,
  },
  computed: {
    innerProps() {
      return {
        ...this.$attrs,
        ...this.$props,
        ...this.options,
      };
    },
  },
  methods: {
    getFormItemProp(col) {
      return col.prop || col.formItemProps?.prop;
    },
    getModel() {
      return this.model;
    },
  },
};
</script>
