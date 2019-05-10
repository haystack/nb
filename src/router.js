import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top-page',
      component: () => import('./views/TopPage.vue')
    },
    // {
    //   path: '/classSettings/:classId',
    //   name: 'classSettings',
    //   props: true,
    //   component: () => import('./views/ClassSettings.vue'),

    // },
    {
      path: '/home',
      name: 'home-page',
      props: { default: true },
      component: () => import('./views/HomePage.vue'),
    },
    {
      path: '/grading',
      name: 'grading',
      props: { default: true },
      component: () => import('./views/Grader.vue'),
    },
    // {
    //   path: '*',
    //   name: 'invalidURL',
    //   component: () => import('./views/InvalidURL.vue')
    // }
  ]
})
