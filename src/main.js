import Vue from 'vue';
import App from './App.vue';
import router from './router';

export const eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
