/* eslint-disable */

export default {
  namespaced: true,
  state: {
    trackingNumber: null,
    searching: null,
  },
  actions: {
    searchTracking({ state, commit }) {
      commit('setTrackingNumber', state.searching);
    },
  },
  getters: {
    isSearching(state) {
      return !!state.trackingNumber;
    }
  },
  mutations: {
    setSearching(state, searching) {
      state.searching = searching;
    },
    setTrackingNumber(state, trackingNumber) {
      state.trackingNumber = trackingNumber;
    },
  },
};
