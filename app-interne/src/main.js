import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// import $ from 'jquery'
// import 'popper.js'
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/scss/main.scss"

import PortalVue from 'portal-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  // $,
  render: h => h(App)
}).$mount('#app')

Vue.use(PortalVue)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

