<template>
  <el-select
    ref="select"
    :value="valueGetter(model)"
    v-bind="$attrs"
    :allow-create="allowCreate"
    v-on="$listeners"
    @input="handleInput"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
    <template #empty>
      <slot name="empty"></slot>
    </template>
    <el-option
      v-for="(ops, index) in innerOptions"
      :key="index"
      :label="ops[optionKey.label]"
      :value="ops[optionKey.value]"
      :data-option-value="ops[optionKey.value]"
      :data-option-label="ops[optionKey.label]"
    >
      <span class="flex items-center justify-between">
        {{ ops[optionKey.label] }}
        <i
          v-if="deleteable"
          class="el-option__deltor hidden cursor-pointer el-icon-circle-close hover:scale-110 hover:text-[#409EFF]"
          @click.stop="ev => handleDelete(ev, ops)"
        />
        <!-- <i
          class="el-option__creator hidden cursor-pointer el-icon-circle-plus-outline hover:scale-110 hover:text-[#409EFF]"
          @click.stop="ev => handleCreate(ev, ops)"
        /> -->
      </span>
    </el-option>
  </el-select>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'
import dataFetch from './mixin/dataFetch'
import common from './mixin/common'

export default {
  name: 'ElSelectPro',
  mixins: [createGetterAndSetter(undefined), dataFetch, common],
  props: {
    options: Array,
    optionKey: {
      type: Object,
      default: () => ({ label: 'label', value: 'value' }),
    },
    deleteable: {
      type: Boolean,
      default: false,
    },
    allowCreate: {
      type: Boolean,
      default: false,
    },
    onDelete: {
      type: Function,
      default: null,
    },
    onCreate: {
      type: Function,
      default: null,
    },
  },
  computed: {
    innerOptions() {
      const { options, ops } = this
      return options || ops || []
    },
  },
  created() {
    this.onQueryEvent = this.debounce(this.onQueryEvent, 300)
  },
  mounted() {
    this.allowCreate && this.$once('hook:beforeDestroy', this.initCreateEvent())
  },
  methods: {
    handleDelete(ev, item) {
      /** @type {HTMLElement} */
      const target = ev.target
      const el = target.parentElement.parentElement
      const del = () => el.remove()
      this.onDelete?.(del, item)
    },
    initCreateEvent() {
      /** @type {HTMLElement}  */
      const input = this.$refs.select.$el.querySelector('.el-select__input')
      input.addEventListener('input', this.onQueryEvent)
      return () => input.removeEventListener('input', this.onQueryEvent)
    },
    onQueryEvent(ev) {
      const showNewOption = this.$refs.select.showNewOption
      if (!showNewOption) return
      /** @type { HTMLElement } */
      const option = this.$refs.select.$refs.scrollbar.$el.querySelector(
        '.el-select-dropdown__item:not([data-option-value])'
      )
      if (this.onCreate) {
        option.style.pointerEvents = 'none'
      }
      const wrapper = option.firstChild
      wrapper.classList.add('flex', 'items-center', 'justify-between')
      if (wrapper.childNodes.length === 1) {
        const btn = document.createElement('i')
        btn.classList.add(
          'cursor-pointer',
          'el-icon-circle-plus-outline',
          'hover:scale-110',
          'hover:text-[#409EFF]'
        )
        btn.style.pointerEvents = 'initial'
        btn.addEventListener('click', event => {
          event.stopPropagation()
          this.handleCreate(ev.target.value)
        })
        wrapper.appendChild(btn)
      }
    },
    handleCreate(value) {
      this.onCreate?.(value)
    },
  },
}
</script>
<style lang="scss">
.el-select-dropdown__item[data-option-value] .el-option__deltor {
  display: initial;
}
</style>
