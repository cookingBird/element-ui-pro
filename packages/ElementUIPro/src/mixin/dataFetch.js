import { debounce } from 'lodash';
import {
	effectFingerprint
} from './tool';

export default {
	props: {
		fetch: Function,
		effectKey: [String, Array],
		wait: Number
	},
	data() {
		return {
			ops: [],
			loading: false
		};
	},
	computed: {
		isEffect() {
			return effectFingerprint(this.model, this.effectKey);
		}
	},
	watch: {
		isEffect: {
			handler() {
				if(this.model && this.fetch) {
					// remove before value
					this.valueSetter(undefined);
					this.modelEffectHandler(this.model);
				}
			}
		}
	},
	created() {
		this.modelEffectHandler = debounce(
			this.modelEffectHandler,
			this.wait || 700,
			{ trailing: true, leading: true }
		);
	},
	mounted() {
		if(this.fetch) {
			this.modelEffectHandler();
		}
	},
	methods: {
		async modelEffectHandler(val) {
			try {
				this.loading = true;
				this.ops = await this.fetch(val);
				this.loading = false;
			} catch(error) {
				console.error('model effect handle error', error)
				this.loading = false;
			}
		},
	}
}
