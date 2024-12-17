<template>
  <el-checkbox-group
    v-bind="$attrs"
    v-model="innerValue"
    class="el-checkbox-group-pro"
    :data-split="split"
    v-on="omit($listeners, 'update:value')"
  >
    <template v-for="(item, index) in innerOptions">
      <el-checkbox v-if="typeof item === 'string'" :key="index" :label="item" />
      <el-checkbox-button v-else-if="item.type === 'button'" :key="index" v-bind="_pickProps(item)">
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </el-checkbox-button>
      <el-checkbox v-else :key="index" v-bind="_pickProps(item)">
        <slot :name="item.label">
          {{ item.label }}
        </slot>
      </el-checkbox>
    </template>
  </el-checkbox-group>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import createGetterAndSetter from './mixin/createGetterAndSetter'
import common from './mixin/common'
import debug from './mixin/debugger'
import dataFetch from './mixin/dataFetch'

export default {
  name: 'ElCheckboxGroupPro',
  mixins: [createGetterAndSetter([]), dataFetch, common, debug],
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    selectKey: {
      type: Boolean,
      default: false,
    },
    selectObj: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    split: Boolean,
  },
  computed: {
    innerValue: {
      get() {
        const val = this.valueGetter(this.model, this.valueKey)
        if (this.debugger) {
          console.log('get', val)
        }
        return this._mapInnerValue(val)
      },
      set(val) {
        if (this.debugger) {
          console.log('set', val)
        }
        this._setInnerValue(val)
      },
    },
    innerOptions() {
      const { options, ops } = this
      return options || ops || []
    },
  },
  methods: {
    _pickProps(item) {
      return this.pick(item, 'label', 'disabled', 'border', 'size')
    },
    _mapInnerValue(value) {
      const { selectKey, selectObj, innerOptions, labelKey, rowKey } = this
      if (selectKey) {
        this._mapInnerValue = _value =>
          _value
            .map(key => innerOptions.find(item => item[rowKey] === key))
            .filter(Boolean)
            .map(i => i[labelKey])
      } else if (selectObj) {
        this._mapInnerValue = _value =>
          _value
            // .map((key) => innerOptions.find((item) => item[rowKey] === key))
            .filter(Boolean)
            // map 2 label
            .map(i => i[labelKey])
      } else {
        this._mapInnerValue = _value => _value
      }
      return this._mapInnerValue(value)
    },
    _setInnerValue(value) {
      const { selectKey, selectObj, innerOptions, labelKey, rowKey } = this
      if (selectKey) {
        this._setInnerValue = _value => {
          this.handleInput(
            _value
              // find
              .map(label => innerOptions.find(op => op[labelKey] === label))
              .filter(Boolean)
              // map 2 key
              .map(i => i[rowKey])
          )
        }
      } else if (selectObj) {
        this._setInnerValue = _value => {
          this.handleInput(
            _value
              // find
              .map(label => innerOptions.find(op => op[labelKey] === label))
              .filter(Boolean)
          )
        }
      } else {
        this._setInnerValue = _value => {
          this.handleInput(_value)
        }
      }
      this._setInnerValue(value)
    },
  },
}
</script>
<style lang="scss">
.el-checkbox-group-pro.el-checkbox-group[data-split='true'] {
  --gutter: 2rem;
  .el-checkbox-button + .el-checkbox-button {
    margin-inline-start: var(--gutter);
  }
  .el-checkbox-button.is-focus .el-checkbox-button__inner {
    border-left: 1px solid #409eff;
  }
  .el-checkbox-button__inner {
    border-left: 1px solid #dcdfe6;
    border-radius: 4px;
    box-shadow: none !important;
  }
}
</style>
