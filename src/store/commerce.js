/* eslint-disable */

export default {
  namespaced: true,
  state: {
    idCommerce: null,
    searching: null,
  },
  actions: {
    searchBill({ commit, state }) {
      commit('setSearching', state.idCommerce);
    },
  },
  getters: {
    isSearching(state) {
      return !!state.searching;
    },
  },
  mutations: {
    setIdCommerce(state, idCommerce) {
      state.idCommerce = idCommerce;
    },
    setSearching(state, searching) {
      state.searching = searching;
    },
  },
};
