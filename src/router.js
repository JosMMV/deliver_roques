import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import LogIn from './views/LogIn.vue';
import Tracking from './views/Tracking.vue';
import GestionDePedido from './views/GestionDePedido.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
    },
    {
      path: '/tracking',
      name: 'tracking',
      component: Tracking,
    },
    {
      path: '/gestion-pedido',
      name: 'gestion-pedido',
      component: GestionDePedido,
    },
  ],
});
