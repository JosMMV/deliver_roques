/* eslint-disable */

export default {
  namespaced: true,
  state: {
    valuesSDByMonth: [12, 446, 675, 510, 590, 610, 760],
    labelsSDByMonth: ['4231', '4462', '6753', '5104', '5905', '6106', '7607'],
    valuesSDByYear: [423, 446, 675, 510, 590, 610, 760],
    labelsSDByYear: ['4231', '4462', '6753', '5104', '5905', '6106', '7607'],
    valuesVByMonth: [423, 446, 675, 510, 590, 610, 760],
    labelsVByMonth: ['4231', '4462', '6753', '5104', '5905', '6106', '7607'],
    valuesVByYear: [423, 446, 675, 510, 590, 610, 760],
    labelsVByYear: ['4231', '4462', '6753', '5104', '5905', '6106', '7607'],
    itemSelected: null,
  },
  actions: {
    searchTracking({ state, commit }) {
      commit('setTrackingNumber', state.searching);
    },
  },
  getters: {
    showDatePicker(state) {

    },
  },
  mutations: {
    setItemSelected(state, item) {
      state.itemSelected = item;
    },
    setTrackingNumber(state, trackingNumber) {
      state.trackingNumber = trackingNumber;
    },
  },
};
