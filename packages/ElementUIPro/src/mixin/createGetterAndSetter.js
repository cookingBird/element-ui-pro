import {
	getCtxValueSetter,
	getCtxValueGetter
} from './tool';

export default function createGetterAndSetter(defaultValue = '') {
	return {
		props: {
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
			valueSetter(...args) {
				const { model, valueKey } = this;
				if(model === void 0 || valueKey === void 0) {
					this.valueSetter = (...args) => { };
				} else {
					this.valueSetter = getCtxValueSetter.call(this, model, valueKey);
				}
				this.valueSetter(...args);
			},
			valueGetter(...args) {
				const { model, valueKey } = this;
				if(model === void 0 || valueKey === void 0) {
					this.valueGetter = (...args) => { };
				} else {
					this.valueGetter = getCtxValueGetter.call(this, valueKey, defaultValue)
				}
				return this.valueGetter(...args)
			}
		},
	}
}
