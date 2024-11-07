import {
	getCtxValueSetter,
	getCtxValueGetter
} from './tool';

export default function createGetterAndSetter(defaultValue = '') {
	return {
		props: {
			value: [Array, String, Number],
			model: Object,
			valueKey: String,
		},
		methods: {
			handleInput(val) {
				const { model, valueKey } = this
				if(model === void 0 || valueKey === void 0) {
					this.handleInput = (val) => {
						this.$emit('update:model', val);
					}
				} else {
					this.handleInput = (val) => {
						this.valueSetter(val)
					}
				}
				this.handleInput(val)
			},
			valueSetter(val) {
				const { model, valueKey } = this;
				if(model === void 0 || valueKey === void 0) {
					this.valueSetter = (val) => { this.$emit('update:value', val) };
				} else {
					this.valueSetter = getCtxValueSetter.call(this, model, valueKey);
				}
				this.valueSetter(val);
			},
			valueGetter(_model) {
				const { model, valueKey } = this;
				if(model === void 0 || valueKey === void 0) {
					this.valueGetter = (model) => this.value;
				} else {
					this.valueGetter = getCtxValueGetter.call(this, valueKey, defaultValue)
				}
				return this.valueGetter(_model);
			}
		},
	}
}
