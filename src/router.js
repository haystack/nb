import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'welcome-page',
            component: () => import('./views/WelcomePage.vue')
        },
        {
            path: '/login',
            name: 'login-page',
            component: () => import('./views/LoginPage.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard-page',
            props: { default: true },
            component: () => import('./views/DashboardPage.vue'),
        },
        {
            path: '/reset',
            name: 'reset-password-page',
            component: () => import('./views/ResetPasswordPage.vue'),
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
        },
        {
            path: '*',
            name: 'not-found-page',
            component: () => import('./views/NotFoundPage.vue'),
        }
    ]
})
