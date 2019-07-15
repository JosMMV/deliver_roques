/* eslint-disable */

export default {
  namespaced: true,
  state: {
    orderNumber: null,
    searching: null,
    selectedItem: null,
    error: false,
    timestamps: [
      {
        timestamp: null,
      },
      {
        timestamp: null,
      },
      {
        timestamp: null,
      },
      {
        timestamp: null,
      }
    ],
  },
  actions: {
    searchOrder({ state, commit }, error) {
      commit('setOrderNumber', null);
      if (error) {
        commit('setError', true);
      } else {
        commit('setError', false);
        commit('setOrderNumber', state.searching);
      }
    },
  },
  getters: {
    isSearching(state) {
      return !!state.orderNumber;
    },
    thereIsError(state) {
      return !!state.error;
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setSearching(state, searching) {
      state.searching = searching;
    },
    setOrderNumber(state, orderNumber) {
      state.orderNumber = orderNumber;
    },
    setSelectedItem(state, i) {
      state.selectedItem = i;
    },
    editTimestamp(state) {
      let current_datetime = new Date();
      let horas = current_datetime.getHours();
      let ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12;
      let fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
      fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
      let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
      formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
      state.timestamps[state.selectedItem].timestamp = formatted_date;
    },
  },
};
