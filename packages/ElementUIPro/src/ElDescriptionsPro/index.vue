<template>
  <div class="el-description-pro">
    <el-descriptions
      v-if="!form"
      ref="description"
      v-bind="options.desOps"
      v-on="options.desOps?.on"
    >
      <template v-for="item of options.columns">
        <el-descriptions-item
          v-if="item.if ?? true"
          :key="getFormItemProp(item)"
          v-bind="item.desItemProps"
        >
          <template #label>
            <slot :name="getFormItemProp(item) + 'Label'">
              {{ item.label || item.desItemProps?.label }}
            </slot>
          </template>
          <template #default>
            <slot :name="getFormItemProp(item)">
              {{ getValue(item.dict, valueFormatter, model, item.prop) }}
            </slot>
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
    <el-form
      v-else
      ref="form"
      class="el-descriptions-form-wrapper"
      :model="model"
      v-bind="options.formOps"
      v-on="options.formOps?.on"
    >
      <el-descriptions v-bind="options.desOps" v-on="options.desOps?.on">
        <template v-for="item of options.columns">
          <el-descriptions-item
            v-if="item.if ?? true"
            :key="getFormItemProp(item)"
            v-bind="item.desItemProps"
          >
            <el-form-item v-bind="item.formItemProps">
              <template #label>
                <slot :name="getFormItemProp(item) + 'Label'">
                  {{ item.label }}
                </slot>
              </template>
              <template #default>
                <slot v-if="item.slotIs === 'slot'" :name="getFormItemProp(item)" />
                <type-node-vue
                  v-else
                  :model="model"
                  :data-prop="getFormItemProp(item)"
                  :value-key="getFormItemProp(item)"
                  :wrapper-props="item.wrapperProps || item.slotProps?.wrapperProps"
                  :slot-is="item.slotIs"
                  :slot-props="item.slotProps"
                  :fetch="item.fetch || item.slotProps?.fetch"
                  :effect-key="item.effectKey || item.slotProps?.effectKey"
                  :dict="item.dict"
                  :value-formatter="item.valueFormatter"
                  v-on="item.on"
                />
              </template>
            </el-form-item>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import TypeNodeVue from '../ElFormPro/TypeNode.vue'
import common from '../mixin/common'

export default {
  name: 'ElDescriptionsPro',
  components: { TypeNodeVue },
  mixins: [common],
  props: {
    options: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    form: {
      type: Boolean,
      default: false,
    },
    valueFormatter: {
      type: Function,
      default: (dict, value) => {
        return dict.find(item => item.code === value)?.name || '--'
      },
    },
  },
  methods: {
    getFormItemProp(col) {
      return col.prop || col.formItemProps?.prop
    },
    getValue(dict, valueFormatter, model, valueKey) {
      let res = this.get(model, valueKey)
      if (dict) {
        res = valueFormatter(dict, res)
      }
      return res
    },
  },
}
</script>
