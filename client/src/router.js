import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import LogIn from './views/LogIn.vue';
import Tracking from './views/Tracking.vue';
import GestionDePedido from './views/GestionDePedido.vue';
import Reports from './views/Reports.vue';
import RequestOrder from './views/RequestOrder.vue';

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
      path: '/iniciar-sesion',
      name: 'iniciar-sesion',
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
    {
      path: '/reportes',
      name: 'reportes',
      component: Reports,
    },
    {
      path: '/orden',
      name: 'orden',
      component: RequestOrder,
    },
  ],
});
