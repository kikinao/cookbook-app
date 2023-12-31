import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vantConfig from './untils/vant-config';
import { VueMasonryPlugin } from 'vue-masonry';


Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(vantConfig)
Vue.use(VueMasonryPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
