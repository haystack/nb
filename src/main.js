import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';

export const eventBus = new Vue();

Vue.config.productionTip = false;

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
