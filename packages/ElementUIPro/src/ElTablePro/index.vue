<template>
  <el-table
    ref="table"
    v-bind="$attrs"
    v-loading="loading"
    :data="data"
    :class="{
      'el-table-selection-all--hidden': hiddenSelectAll,
    }"
    v-on="omit($listeners, 'selection-change', 'selectionChange')"
    @select="onSelect"
    @selection-change="onSelectionChange"
  >
    <template v-for="column of innerColumns">
      <ColumnGroup
        v-if="column.children?.length"
        :key="column.prop"
        :cell-placeholder="cellPlaceholder"
        :column="column"
      >
        <!-- Passive slots -->
        <template v-for="slotName of Object.keys($scopedSlots)" :slot="slotName" slot-scope="scope">
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </ColumnGroup>
      <el-table-column v-else-if="column.prop" :key="column.prop" v-bind="column">
        <template slot="header" slot-scope="headerScope">
          <slot :name="column.prop + 'Header'" v-bind="headerScope">
            {{ column.label }}
          </slot>
        </template>
        <template slot="default" slot-scope="contentScope">
          <slot :name="column.prop" v-bind="contentScope">
            <template v-if="!column.slotIs">
              <el-tooltip
                v-if="column.tooltip"
                v-bind="toObject(column.tooltip)"
                :content="getColumnContent(column, contentScope)"
              >
                <span>
                  {{ getColumnContent(column, contentScope) }}
                </span>
              </el-tooltip>
              <span v-else>
                {{ getColumnContent(column, contentScope) }}
              </span>
            </template>
            <template v-else>
              <type-node-vue
                :model="contentScope.row"
                :value-key="column.prop"
                :slot-is="column.slotIs"
                :slot-props="column.slotProps"
                :fetch="column.slotProps?.fetch"
                :effect-key="column.slotProps?.effectKey"
                :wrapper-props="column.slotProps?.wrapperProps"
              />
            </template>
          </slot>
        </template>
      </el-table-column>
      <el-table-column v-else v-bind="column" :key="column.type"></el-table-column>
    </template>
  </el-table>
</template>

<script>
import { debounce } from 'lodash'
import TypeNodeVue from '../ElFormPro/TypeNode'
import { tableMethodsGenerator } from '../utils/methodsGenerator'
import { toObject } from '../utils/utils'
import ColumnGroup from './columnGroup.vue'
import common from '../mixin/common'

export default {
  name: 'ElTablePro',
  components: { ColumnGroup, TypeNodeVue },
  mixins: [common],
  props: {
    loading: Boolean,
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    hiddenSelectAll: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: [Boolean, Object],
      default: false,
    },
    selectionMode: {
      type: String,
      default: 'default', // default, single
    },
    cellPlaceholder: {
      type: String,
      default: '--',
    },
  },
  computed: {
    tableRef() {
      return this.$refs.table
    },
    innerColumns() {
      const { selection, columns } = this
      if (typeof selection === 'boolean') {
        return [
          selection ? { type: 'selection', width: '55', 'reserve-selection': true } : null,
          ...columns,
        ].filter(Boolean)
      }
      if (typeof selection === 'object') {
        return [selection, ...columns]
      }
      return columns
    },
  },
  created() {
    this.onSelectionChange = debounce(this.onSelectionChange, 300)
    tableMethodsGenerator(this, 'table')
  },
  methods: {
    onSelectionChange(...args) {
      this.$listeners['selection-change']?.(...args)
      this.$listeners.selectionChange?.(...args)
    },
    handleFormatter({ formatter, prop }, scope) {
      return formatter(scope.row, scope.column, scope.row[prop], scope.$index)
    },
    getColumnContent(column, scope) {
      return (
        (column.formatter ? this.handleFormatter(column, scope) : scope.row[column.prop]) ||
        this.cellPlaceholder
      )
    },
    toObject,
    onSelect(rows, row) {
      if (this.selectionMode === 'single') {
        this.$refs.table.clearSelection()
        setTimeout(() => {
          this.$refs.table.toggleRowSelection(row, true)
        })
      }
    },
  },
}
</script>
<style>
.el-table-selection-all--hidden .el-table__header .el-table-column--selection .el-checkbox {
  display: none;
}
</style>
