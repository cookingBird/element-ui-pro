import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/lib/index.css';
import ElementUIPro from '@eassy/element-ui-pro';
import '@eassy/element-ui-pro/lib/umd/index.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small' });
Vue.use(ElementUIPro);
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
