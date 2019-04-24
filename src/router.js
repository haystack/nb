import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-settings',
      component: () => import('./views/UserSettings.vue')
    },
  ]
})
