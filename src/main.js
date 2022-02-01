import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'
import App from './App.vue'
import {BootstrapVue, IconsPlugin, FormInputPlugin} from 'bootstrap-vue'



Vue.config.productionTip = false
Vue.use(FormInputPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
