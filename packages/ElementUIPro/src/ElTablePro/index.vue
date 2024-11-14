<template>
  <el-table v-loading="loading" v-bind="$attrs" v-on="$listeners">
    <template v-for="column of columns">
      <ColumnGroup v-if="column.children?.length" :key="column.prop" :column="column">
        <!-- Passive slots -->
        <template
          v-for="slotName of Object.keys($scopedSlots)"
          :slot="slotName"
          slot-scope="scope"
        >
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </ColumnGroup>
      <el-table-column v-else :key="column.prop" v-bind="column">
        <template slot="header" slot-scope="headerScope">
          <slot :name="column.prop + 'Header'" v-bind="headerScope">
            {{ column.label }}
          </slot>
        </template>
        <template slot="default" slot-scope="contentScope">
          <slot :name="column.prop" v-bind="contentScope">
            <template v-if="!column.slotIs">
              {{ getColumnContent(column, contentScope) }}
            </template>
            <template v-else>
              <TypeComp
                :model="contentScope.row"
                :valueKey="column.prop"
                :slotIs="column.slotIs"
                :slotProps="column.slotProps"
                :fetch="column.slotProps?.fetch"
                :effectKey="column.slotProps?.effectKey"
                :wrapperProps="column.slotProps?.wrapperProps"
              />
            </template>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import ColumnGroup from './ColumnGroup.vue';
import TypeComp from '../ElFormPro/TypeNode';
export default {
  name: 'ElTablePro',
  components: { ColumnGroup, TypeComp },
  props: {
    loading: Boolean,
    columns: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleFormatter(formatter, scope) {
      return formatter(scope.row, scope.column, scope.row[column.prop], scope.$index);
    },
    getColumnContent(column, scope) {
      console.log('getColumnContent', column.prop);
      return column.formatter ?
          this.handleFormatter(column.formatter, scope)
        : scope.row[column.prop];
    },
  },
};
</script>
