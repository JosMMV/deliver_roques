/* eslint-disable */
import HTTP from '../httpUser';

export default {
  namespaced: true,
  state: {
    idCommerce: null,
    orders: [],
  },
  actions: {
    fetchOrders({ commit }) {
      return HTTP().get('pedido')
      .then(({ data }) => {
        commit('setOrders', data);
      });
    }
  },
  mutations: {
    setIdCommerce(state, idCommerce) {
      state.idCommerce = idCommerce;
    },
    setOrders(state, orders) {
      state.orders = orders;
    }
  },
};
