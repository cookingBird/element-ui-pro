<template>
  <el-table-column v-bind="column">
    <template slot="header" slot-scope="headerScope">
      <slot :name="column.prop + 'Header'" v-bind="headerScope">
        {{ column.label }}
      </slot>
    </template>
    <template v-for="subCol of column.children">
      <ColumnGroup v-if="subCol.childreen?.length" :key="subCol.prop" :column="subCol">
        <!-- Passive slots -->
        <template
          v-for="slotName of Object.keys($scopedSlots)"
          :slot="slotName"
          slot-scope="scope"
        >
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </ColumnGroup>
      <el-table-column v-else :key="subCol.prop" v-bind="subCol">
        <template slot="header" slot-scope="headerScope">
          <slot :name="subCol.prop + 'Header'" v-bind="headerScope">
            {{ subCol.label }}
          </slot>
        </template>
        <template slot="default" slot-scope="contentScope">
          <slot :name="subCol.prop" v-bind="contentScope">
            <template v-if="!subCol.slotIs">
              {{ getColumnContent(subCol, contentScope) }}
            </template>
            <template v-else>
              <TypeComp
                :model="contentScope.row"
                :value-key="subCol.prop"
                :slot-is="subCol.slotIs"
                :slot-props="subCol.slotProps"
                :fetch="subCol.slotProps?.fetch"
                :effect-key="subCol.slotProps?.effectKey"
                :wrapper-props="subCol.slotProps?.wrapperProps"
              />
            </template>
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table-column>
</template>

<script>
import TypeComp from '../ElFormPro/TypeNode';
export default {
  name: 'ColumnGroup',
  components: { TypeComp },
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleFormatter(formatter, scope) {
      return formatter(scope.row, scope.column, scope.row[column.prop], scope.$index);
    },
    getColumnContent(column, scope) {
      return column.formatter ?
          this.handleFormatter(column.formatter, scope)
        : scope.row[column.prop];
    },
  },
};
</script>
