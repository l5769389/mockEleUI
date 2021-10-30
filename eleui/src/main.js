import Vue from 'vue'
import App from './App.vue'
import ELButton from '../packages/button/index.js';
Vue.config.productionTip = false
Vue.use(ELButton);
new Vue({
  render: h => h(App),
}).$mount('#app')
