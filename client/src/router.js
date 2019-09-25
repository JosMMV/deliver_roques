import Vue from 'vue';
import Router from 'vue-router';
import Bills from './views/Bills.vue';
import LogIn from './views/LogIn.vue';
import Tracking from './views/Tracking.vue';
import ManageOrder from './views/ManageOrder.vue';
import Reports from './views/Reports.vue';
import RequestOrder from './views/RequestOrder.vue';
import CreateBill from './views/CreateBill.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'bill',
      component: Bills,
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
      component: ManageOrder,
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
    {
      path: '/crear-factura',
      name: 'crear-factura',
      component: CreateBill,
    },
  ],
});
