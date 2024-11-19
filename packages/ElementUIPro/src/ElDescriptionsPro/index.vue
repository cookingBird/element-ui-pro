<template>
  <div>
    <el-descriptions v-if="!form"
ref="description" v-bind="options" v-on="$listeners">
      <template v-for="item of options.columns">
        <el-descriptions-item
          v-if="
            callValue(item.if, (val) =>
              typeof val === 'function' ? val(item, model) : val,
            )
          "
          v-show="
            callValue(item.show, (val) =>
              typeof val === 'function' ? val(item, model) : val,
            )
          "
          :key="item.prop"
          :label="item.label"
        >
          <TypeNode
ref="node" :options="item"
:model="model" v-on="$listeners"
/>
        </el-descriptions-item>
      </template>
    </el-descriptions>
    <el-form v-else
ref="form" :model="model" v-bind="options" v-on="$listeners">
      <el-descriptions v-bind="options"
v-on="$listeners">
        <template v-for="item of options.columns">
          <el-descriptions-item
            v-if="
              callValue(item.if, (val) =>
                typeof val === 'function' ? val(item, model) : val,
              )
            "
            v-show="
              callValue(item.show, (val) =>
                typeof val === 'function' ? val(item, model) : val,
              )
            "
            :key="item.prop"
            :label="item.label"
          >
            <el-form-item v-bind="item">
              <TypeNode
ref="node" :options="item"
:model="model" v-on="$listeners"
/>
            </el-form-item>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </el-form>
  </div>
</template>

<script>
import { omit } from 'lodash';
import { passRefList } from '../mixin/slot';
import TypeNode from '../ElFormPro/TypeNode.vue';

export default {
  name: 'ElDescriptionsPro',
  components: { TypeNode },
  mixins: [passRefList('node')],
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
  },
  methods: {
    objectOmit: omit,
    callValue(val, handler) {
      return val ? handler(val) : val;
    },
  },
};
</script>
