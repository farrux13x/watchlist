import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@pages/HomePage.vue'),
    },
    {
        path: '/films/new',
        component: () => import('@pages/FilmCreatePage.vue'),
    },
    {
        path: '/films/:id',
        component: () => import('@pages/FilmEditPage.vue'),
        props: true,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
