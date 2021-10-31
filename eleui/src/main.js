import Vue from 'vue'
import App from './App.vue'
import '../lib/theme-chalk/button.css';
import ElementUI from '../lib/element-ui.common'
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
}).$mount('#app')
