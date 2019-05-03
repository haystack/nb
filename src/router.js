import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-settings',
      component: () => import('./views/UserSettings.vue')
    },
    // {
    //   path: '/classSettings/:classId',
    //   name: 'classSettings',
    //   props: true,
    //   component: () => import('./views/ClassSettings.vue'),
      
    // },
    {
      path: '/home',
      name: 'homepage',
      props: { default: true },
      component: () => import('./views/Homepage.vue'),
    },
    // {
    //   path: '*',
    //   name: 'invalidURL',
    //   component: () => import('./views/InvalidURL.vue')
    // }
  ]
})
