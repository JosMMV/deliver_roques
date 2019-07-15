/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './authentication';
import tracking from './tracking';
import commerce from './commerce';
import order from './order';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
    tracking,
    commerce,
    order,
  },
});
