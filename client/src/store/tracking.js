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
        commit('setTrackingError', 'Número de tracking no existe');
      });
    },
  },
  getters: {
    isSearching(state) {
      return !!state.currentTracking;
    },
    isPacked(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.packed;
      }
      return false;
    },
    isCharged(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.charged;
      }
      return false;
    },
    isOnWay(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.way;
      }
      return false;
    },
    isSubsidiary(state) {
      if (!!state.currentTracking){
        return !!state.currentTracking.subsidiary;
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
            if (!!tracking.packed) current_datetime = new Date(tracking.packed);
            else break;
          }
          if (index === 1) {
            if (!!tracking.charged) current_datetime = new Date(tracking.charged);
            else break;
          }
          if (index === 2) {
            if (!!tracking.way) current_datetime = new Date(tracking.way);
            else break;
          }
          if (index === 3) {
            if (!!tracking.subsidiary) current_datetime = new Date(tracking.subsidiary);
            else break;
          }
          let horas = current_datetime.getHours();
          let ampm = horas >= 12 ? 'pm' : 'am';
          horas = horas % 12;
          horas = horas ? horas : 12;
          let fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
          if (index === 0) tracking.packed = formatted_date;
          if (index === 1) tracking.charged = formatted_date;
          if (index === 2) tracking.way = formatted_date;
          if (index === 3) tracking.subsidiary = formatted_date;
        }
        state.currentTracking = tracking;
      }
    },
    setTrackingError(state, error) {
      state.trackingError = error;
    },
  },
};
