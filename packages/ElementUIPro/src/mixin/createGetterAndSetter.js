import { getCtxValueSetter, getCtxValueGetter } from './tool'

export default function createGetterAndSetter(defaultValue = '') {
  return {
    props: {
      value: [Array, String, Number, Boolean],

      model: Object,

      valueKey: String,

      debug: Boolean,
    },

    methods: {
      handleInput(val) {
        if (this.debug) {
          console.log('handleInput', val)
        }

        this.valueSetter(val)
      },

      valueSetter(val) {
        const { model, valueKey } = this

        if (model === undefined || valueKey === undefined) {
          this.valueSetter = (_val) => {
            this.$emit('update:value', _val)
          }
        } else {
          this.valueSetter = getCtxValueSetter.call(this, model, valueKey)
        }

        this.valueSetter(val)
      },

      valueGetter(_model) {
        const { model, valueKey } = this

        if (model === undefined || valueKey === undefined) {
          this.valueGetter = () => this.value
        } else {
          this.valueGetter = getCtxValueGetter.call(this, valueKey, defaultValue)
        }

        return this.valueGetter(_model)
      },
    },
  }
}
