import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/button',
    name: 'button',
    component: () => import(/* webpackChunkName: "about" */ '../views/ButtonView.vue'),
  },
  {
    path: '/select',
    name: 'select',
    component: () => import(/* webpackChunkName: "about" */ '../views/SelectView.vue'),
  },
  {
    path: '/input',
    name: 'input',
    component: () => import(/* webpackChunkName: "about" */ '../views/InputView.vue'),
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import(/* webpackChunkName: "about" */ '../views/RadioView.vue'),
  },
  {
    path: '/checkbox',
    name: 'checkbox',
    component: () => import(/* webpackChunkName: "about" */ '../views/CheckboxView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
