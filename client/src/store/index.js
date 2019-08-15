/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
import tracking from './tracking';
import commerce from './commerce';
import order from './order';
import report from './report';
import receipt from './receipt';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrlAdmin: '/admin',
    baseUrlUser: '/api',
  },
  modules: {
    authentication,
    tracking,
    commerce,
    order,
    report,
    receipt,
  },
});
