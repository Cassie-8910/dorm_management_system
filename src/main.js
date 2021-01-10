import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './plugins/element.js'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.baseURL = 'http://localhost:3030'
Vue.use(ElementUI)
// Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
