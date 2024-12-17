<template>
  <el-form
    v-bind="omit(innerProps, 'columns', 'options')"
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
            <slot
              :name="getFormItemProp(column) + 'Label'"
              :column="column"
              :model="model"
            >
              {{ column.formItemProps.label }}
            </slot>
          </template>

          <slot
            :name="getFormItemProp(column)"
            :column="column"
            :model="model"
          >
            <type-node-vue
              :model="model"
              :data-required="column.formItemProps.required"
              :data-prop="getFormItemProp(column)"
              :value-key="getFormItemProp(column)"
              :wrapper-props="column.wrapperProps || column.slotProps?.wrapperProps"
              :slot-is="column.slotIs"
              :slot-name="column.slotName"
              :slot-props="column.slotProps"
              :fetch="column.fetch || column.slotProps?.fetch"
              :effect-key="column.effectKey || column.slotProps?.effectKey"
              :dict="column.dict"
              :dict-finder="column.dictFinder"
            />
          </slot>
        </form-item>
      </template>
    </template>

    <el-row
      v-else-if="innerProps.row"
      v-bind="innerProps.row"
    >
      <template v-for="(column, index) of innerProps.columns">
        <el-col
          v-bind="column.col"
          :key="index"
        >
          <FormItem
            v-if="column.if ?? true"
            :key="index"
            v-bind="column.formItemProps"
            :prop="getFormItemProp(column)"
          >
            <template #label>
              <slot
                :name="getFormItemProp(column) + 'Label'"
                :column="column"
                :model="model"
              >
                {{ column.formItemProps.label }}
              </slot>
            </template>

            <slot
              :name="getFormItemProp(column)"
              :column="column"
              :model="model"
            >
              <type-node-vue
                :model="model"
                :data-required="column.formItemProps.required"
                :data-prop="getFormItemProp(column)"
                :value-key="getFormItemProp(column)"
                :wrapper-props="column.wrapperProps || column.slotProps?.wrapperProps"
                :slot-is="column.slotIs"
                :slot-name="column.slotName"
                :slot-props="column.slotProps"
                :fetch="column.fetch || column.slotProps?.fetch"
                :effect-key="column.effectKey || column.slotProps?.effectKey"
                :dict="column.dict"
                :dict-finder="column.dictFinder"
              />
            </slot>
          </FormItem>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { FormItem } from 'element-ui'

import common from '../mixin/common'

import TypeNodeVue from './TypeNode.vue'

export default {
  name: 'ElFormPro',

  components: { FormItem, TypeNodeVue },

  mixins: [common],

  props: {
    model: {
      type: Object,

      required: true,
    },

    columns: {
      type: Array,

      default: () => [],
    },

    options: Object,

    rules: Object,
  },

  computed: {
    innerProps() {
      return {
        ...this.$attrs,

        ...this.$props,

        ...this.options,
      }
    },
  },

  methods: {
    getFormItemProp(col) {
      return col.prop || col.formItemProps?.prop
    },

    getModel() {
      return this.model
    },
  },
}
</script>

