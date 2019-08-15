/* eslint-disable */
import HTTP from '../httpUser';

export default {
  namespaced: true,
  state: {
    currentTracking: null,
    searching: null,
    trackingError: null,
    timestamps: null,
  },
  actions: {
    searchTracking({ state, commit }) {
      return HTTP().get(`pedido/${state.searching}`)
      .then(({ data }) => {
        commit('setSearching', data);
      }).catch(() => {
        commit('setTrackingError', 'An error has ocurred trying search tracking.');
      });
    },
  },
  getters: {
    isSearching(state) {
      return !!state.currentTracking;
    },
    isPacked(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.empacado;
      }
      return false;
    },
    isLoaded(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.cargado;
      }
      return false;
    },
    isOnWay(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.camino;
      }
      return false;
    },
    isBrachOffice(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.sucursal;
      }
      return false;
    },
  },
  mutations: {
    setSearching(state, searching) {
      state.searching = searching;
    },
    setTracking(state, tracking) {
      let current_datetime = new Date();
      console.log(tracking.empacado);
      console.log(current_datetime);
      console.log(current_datetime.getHours());
      let horas = tracking.empacado.getHours();
      console.log(horas);
      let ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12;
      let fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
      fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
      let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
      formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
      state.timestamps[state.selectedItem].timestamp = formatted_date;
      state.currentTracking = tracking;
      console.log('Fin');
    },
    setTrackingError(state, error) {
      state.trackingError = error;
    },
  },
};
