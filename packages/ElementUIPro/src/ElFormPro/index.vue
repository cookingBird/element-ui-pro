<template>
  <el-form
    ref="form"
    v-bind="omit(innerProps, 'columns', 'options')"
    :model="model"
    v-on="merge($listeners, innerProps.on)"
  >
    <template v-if="innerProps.inline || !innerProps.row">
      <template v-for="(column, index) of innerProps.columns">
        <template v-if="column.if ?? true">
          <FormItem
            :key="column.key || index"
            v-bind="column.formItemProps"
            :prop="getFormItemProp(column)"
          >
            <template #label>
              <slot :name="getFormItemProp(column) + 'Label'" :column="column" :model="model">
                {{ column.label || column.formItemProps?.label }}
              </slot>
            </template>
            <template v-if="!column.children?.length">
              <slot
                v-if="column.slotIs === 'slot'"
                :name="getFormItemProp(column)"
                :column="column"
                :model="model"
              />
              <type-node-vue
                v-else
                :model="model"
                :data-required="column.formItemProps?.required"
                :data-prop="getFormItemProp(column)"
                :value-key="getValueKey(column)"
                :wrapper-props="column.wrapperProps || column.slotProps?.wrapperProps"
                :slot-is="column.slotIs"
                :slot-props="column.slotProps"
                :fetch="column.fetch || column.slotProps?.fetch"
                :effect-key="column.effectKey || column.slotProps?.effectKey"
                :dict="column.dict"
                :value-formatter="column.valueFormatter"
              />
            </template>
            <template v-for="(ccolumn, iindex) in column.children" v-else>
              <FormItem
                v-if="ccolumn.if ?? true"
                :key="ccolumn.key || iindex"
                v-bind="ccolumn.formItemProps"
                :prop="getFormItemProp(ccolumn)"
              >
                <template #label>
                  <slot :name="getFormItemProp(ccolumn) + 'Label'" :column="ccolumn" :model="model">
                    {{ ccolumn.label || ccolumn.formItemProps?.label }}
                  </slot>
                </template>
                <slot
                  v-if="ccolumn.slotIs === 'slot'"
                  :name="getFormItemProp(ccolumn)"
                  :column="ccolumn"
                  :model="model"
                />
                <type-node-vue
                  :model="model"
                  :data-required="ccolumn.formItemProps?.required"
                  :data-prop="getFormItemProp(ccolumn)"
                  :value-key="getValueKey(ccolumn)"
                  :wrapper-props="ccolumn.wrapperProps || ccolumn.slotProps?.wrapperProps"
                  :slot-is="ccolumn.slotIs"
                  :slot-props="ccolumn.slotProps"
                  :fetch="ccolumn.fetch || ccolumn.slotProps?.fetch"
                  :effect-key="ccolumn.effectKey || ccolumn.slotProps?.effectKey"
                  :dict="ccolumn.dict"
                  :value-formatter="ccolumn.valueFormatter"
                />
                <slot :name="getFormItemProp(ccolumn) + 'suffix'"></slot>
              </FormItem>
            </template>
          </FormItem>
        </template>
      </template>
    </template>
    <el-row v-else-if="innerProps.row" v-bind="innerProps.row">
      <template v-for="(column, index) of innerProps.columns">
        <el-col v-bind="column.col" :key="column.key || index">
          <template v-if="column.if ?? true">
            <FormItem v-bind="column.formItemProps" :prop="getFormItemProp(column)">
              <template #label>
                <slot :name="getFormItemProp(column) + 'Label'" :column="column" :model="model">
                  {{ column.label || column.formItemProps?.label }}
                </slot>
              </template>
              <template v-if="!column.children?.length">
                <slot
                  v-if="column.slotIs === 'slot'"
                  :name="getFormItemProp(column)"
                  :column="column"
                  :model="model"
                />
                <type-node-vue
                  v-else
                  :model="model"
                  :data-required="column.formItemProps?.required"
                  :data-prop="getFormItemProp(column)"
                  :value-key="getValueKey(column)"
                  :wrapper-props="column.wrapperProps || column.slotProps?.wrapperProps"
                  :slot-is="column.slotIs"
                  :slot-props="column.slotProps"
                  :fetch="column.fetch || column.slotProps?.fetch"
                  :effect-key="column.effectKey || column.slotProps?.effectKey"
                  :dict="column.dict"
                  :value-formatter="column.valueFormatter"
                />
              </template>
              <el-row v-else v-bind="column.row">
                <el-col
                  v-for="(ccolumn, iindex) in column.children"
                  :key="ccolumn.key || iindex"
                  v-bind="ccolumn.col"
                >
                  <FormItem
                    v-if="ccolumn.if ?? true"
                    v-bind="ccolumn.formItemProps"
                    :prop="getFormItemProp(ccolumn)"
                  >
                    <template #label>
                      <slot
                        :name="getFormItemProp(ccolumn) + 'Label'"
                        :column="ccolumn"
                        :model="model"
                      >
                        {{ ccolumn.label || ccolumn.formItemProps?.label }}
                      </slot>
                    </template>
                    <slot
                      v-if="ccolumn.slotIs === 'slot'"
                      :name="getFormItemProp(ccolumn)"
                      :column="ccolumn"
                      :model="model"
                    />
                    <type-node-vue
                      :model="model"
                      :data-required="ccolumn.formItemProps?.required"
                      :data-prop="getFormItemProp(ccolumn)"
                      :value-key="getValueKey(ccolumn)"
                      :wrapper-props="ccolumn.wrapperProps || ccolumn.slotProps?.wrapperProps"
                      :slot-is="ccolumn.slotIs"
                      :slot-props="ccolumn.slotProps"
                      :fetch="ccolumn.fetch || ccolumn.slotProps?.fetch"
                      :effect-key="ccolumn.effectKey || ccolumn.slotProps?.effectKey"
                      :dict="ccolumn.dict"
                      :value-formatter="ccolumn.valueFormatter"
                    />
                    <slot :name="getFormItemProp(ccolumn) + 'suffix'"></slot>
                  </FormItem>
                </el-col>
              </el-row>
            </FormItem>
          </template>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import common from '../mixin/common'
import TypeNodeVue from './TypeNode.vue'
import FormItemPro from './FormItemPro.vue'
import { formMethodsGenerator } from '../utils/methodsGenerator'

export default {
  name: 'ElFormPro',
  components: { FormItem: FormItemPro, TypeNodeVue },
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
    options: { type: Object, default: null },
  },
  computed: {
    innerProps() {
      return {
        labelWidth: '120px',
        ...this.$attrs,
        ...this.$props,
        ...this.options,
      }
    },
  },
  created() {
    formMethodsGenerator(this, 'form')
  },
  methods: {
    getFormItemProp(col) {
      return col.formItemProps?.prop || col.prop
    },
    getValueKey(col) {
      return col.prop || col.formItemProps?.prop
    },
    getModel() {
      return this.model
    },
  },
}
</script>
