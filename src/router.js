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
    {
      path: '/home',
      name: 'homepage',
      props: { default: true },
      component: () => import('./views/Homepage.vue'),
    },
    {
      path: '/grading',
      name: 'grading',
      props: { default: true },
      component: () => import('./views/Grader.vue'),
    },
    {
      path: '/bookmarklet',
      name: 'bookmarklet',
      props: { default: true },
      component: () => import('./views/Bookmarklet.vue'),
    }
  ]
})
