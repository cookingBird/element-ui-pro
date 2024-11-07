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
			immediate: true,
			handler() {
				if(this.model && this.fetch) {
					this.modelEffectHandler(this.model)
				}
			}
		}
	},
	created() {
		this.modelEffectHandler = debounce(
			this.modelEffectHandler,
			this.wait || 700,
			{ trailing: true, leading: true }
		)
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
