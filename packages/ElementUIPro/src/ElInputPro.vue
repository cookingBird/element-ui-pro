<template>
  <el-input
    ref="instance"
    v-bind="$attrs"
    :value="valueGetter(model)"
    class="el-input-pro"
    v-on="$listeners"
    @input="handleInput"
  >
    <!-- Passive slots -->
    <template v-for="[sName, fn] of Object.entries($scopedSlots)">
      <template v-if="!fn.length" :slot="sName">
        <slot :name="sName" />
      </template>
      <template v-else :slot="sName" slot-scope="scope">
        <slot :name="sName" v-bind="scope" />
      </template>
    </template>
  </el-input>
</template>

<script>
import createGetterAndSetter from './mixin/createGetterAndSetter'

export default {
  name: 'ElInputPro',
  mixins: [createGetterAndSetter('')],
  mounted() {
    this.initIconEvents()
  },
  methods: {
    initIconEvents() {
      const { onPrefixClick, onSuffixClick } = this.$attrs
      const { prefixClick, suffixClick } = this.$listeners
      /** @type {HTMLElement} */
      const el = this.$refs.instance.$el
      if (onPrefixClick || prefixClick) {
        el.querySelector('.el-input__prefix')?.addEventListener('click', ev => {
          onPrefixClick?.(ev)
          prefixClick?.(ev)
        })
      }
      if (onSuffixClick || suffixClick) {
        el.querySelector('.el-input__suffix')?.addEventListener('click', ev => {
          onSuffixClick?.(ev)
          suffixClick?.(ev)
        })
      }
    },
  },
}
</script>
