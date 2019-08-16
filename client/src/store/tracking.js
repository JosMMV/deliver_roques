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
      commit('setTrackingError', null);
      commit('setTracking', null);
      return HTTP().get(`pedido/${state.searching}`)
      .then(({ data }) => {
        commit('setTracking', data);
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
      if (!tracking) 
        state.currentTracking = tracking;
      else {
        let current_datetime;
        for (let index = 0; index < 4; index++) {
          if (index === 0) {
            if (!!tracking.empacado) current_datetime = new Date(tracking.empacado);
            else break;
          }
          if (index === 1) {
            if (!!tracking.cargado) current_datetime = new Date(tracking.cargado);
            else break;
          }
          if (index === 2) {
            if (!!tracking.camino) current_datetime = new Date(tracking.camino);
            else break;
          }
          if (index === 3) {
            if (!!tracking.sucursal) current_datetime = new Date(tracking.sucursal);
            break;
          }
          let horas = current_datetime.getHours();
          let ampm = horas >= 12 ? 'pm' : 'am';
          horas = horas % 12;
          horas = horas ? horas : 12;
          let fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
          if (index === 0) tracking.empacado = formatted_date;
          if (index === 1) tracking.cargado = formatted_date;
          if (index === 2) tracking.camino = formatted_date;
          if (index === 3) tracking.sucursal = formatted_date;
        }
        state.currentTracking = tracking;
      }
    },
    setTrackingError(state, error) {
      state.trackingError = error;
    },
  },
};
