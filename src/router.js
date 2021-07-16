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
    {
      path: '/home',
      name: 'home-page',
      props: { default: true },
      component: () => import('./views/HomePage.vue'),
    },
    {
      path: '/forgotpassword',
      name: 'profile-page',
      component: () => import('./views/ProfilePage.vue'),
      props: route => ({ reset_password_id: route.query.id })

    },
    {
      path: '/profile',
      name: 'profile-page',
      component: () => import('./views/ProfilePage.vue'),
    },
    // {
    //   path: '/grading',
    //   name: 'grading',
    //   props: { default: true },
    //   component: () => import('./views/Grader.vue'),
    // },
    {
      path: '/bookmarklet',
      name: 'bookmarklet',
      props: { default: true },
      component: () => import('./views/Bookmarklet.vue'),
    },
    {
      path: '/courses/:course_id',
      name: 'course-page',
      props: { default: true },
      component: () => import('./views/HomePage.vue'),
    },
    {
      path: '/courses/:course_id/:folder_id',
      name: 'dir-page',
      props: { default: true },
      component: () => import('./views/HomePage.vue'),
    },
    {
      path: '/*',
      name: '404-page',
      props: { default: true },
      component: () => import('./error404.vue'),
    }
  ]
})
