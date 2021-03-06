// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`src/dist/css/quasar.${__THEME}.css`)
require(`dist/css/common.styl`)
require('vue2-animate/dist/vue2-animate.min.css')
// ==============================

import Vue from 'vue'
import Quasar, * as All from 'quasar'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import Vuelidate from 'vuelidate'
import VueStash from 'vue-stash'
import VueEvents from 'vue-events'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import store from './store/store'

Vue.prototype.$http = axios

Vue.use(VueRouter) // Install VueRouter
Vue.use(Quasar, {
  components: All,
  directives: All
}) // Install Quasar Framework
// Vue.use(axios)
Vue.use(VeeValidate)
Vue.use(Vuelidate)
Vue.use(VueEvents)
Vue.use(VueStash)
Vue.use(VueAwesomeSwiper)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/animate'
import 'quasar-extras/fontawesome'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    data: { store },
    render: h => h(require('./App'))
  })
})
