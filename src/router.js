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
        {
            path: '/bookmarklet',
            name: 'bookmarklet',
            props: { default: true },
            component: () => import('./views/Bookmarklet.vue'),
        },
        {
            path: '/admin',
            name: 'admin-page',
            component: () => import('./views/AdminPage.vue'),
        }
    ]
})
