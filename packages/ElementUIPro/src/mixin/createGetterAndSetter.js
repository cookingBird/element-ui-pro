import { getCtxValueSetter, getCtxValueGetter } from './tool'

export default function createGetterAndSetter(defaultValue = '') {
  return {
    props: {
      value: { type: [Array, String, Number, Boolean], default: () => defaultValue },
      model: Object,
      valueKey: String,
      debug: Boolean,
      afterChange: {
        type: Function,
        default: v => v,
      },
      beforeValue: {
        type: Function,
        default: v => v,
      },
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
          this.valueSetter = v => {
            this.$emit('update:value', this.afterChange(v))
          }
        } else {
          this.valueSetter = v => getCtxValueSetter.call(this, model, valueKey)(this.afterChange(v))
        }
        this.valueSetter(val)
      },
      valueGetter(_model) {
        const { model, valueKey } = this
        if (model === undefined || valueKey === undefined) {
          this.valueGetter = () => this.beforeValue(this.value)
        } else {
          this.valueGetter = ctx =>
            this.beforeValue(getCtxValueGetter.call(this, valueKey, defaultValue)(ctx))
        }
        return this.valueGetter(_model)
      },
    },
  }
}
