
/* eslint-disable */
import HTTP from '../httpAdmin';

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}


export default {
  namespaced: true,
  state: {
    searchingRif: null,
    searchingRifError: null,
    currentRif: null,
    currentDate: null,
  },
  actions: {
    searchRif({ state, commit }) {
      return HTTP().get(`comercio/${state.searchingRif}`)
      .then(({ data }) => {
        commit('setCurrentRif', data);
        commit('setCurrentDate');
        console.log(state.currentDate);
      }).catch(() => {
        commit('setSearchingRifError', 'RIF not found.');
      });
    },
    createReceipt({ commit, state }) {
      //commit('facturaError', null);
      return HTTP().post('factura', {
        monto: 343434.542,
        fechaEmision: state.currentDate,
        fechaTope: state.currentDate.addDays(15),
        estatus: 'pendiente', 
        comercio_rif: state.currentRif.rif,
      })
      .then(({ data }) => {
        console.log('SE CREO xdddddd');
      })
      .catch(() => {
        //commit('genFacturaError', 'An error has occured trying to generate receipt.');
      });
    },
  },
  getters: {
    issetCurrentRif (state) {
      return !!state.currentRif;
    },
    issetSearchingRifError(state) {
      return !!state.searchingRifError;
    },
  },
  mutations: {
    setSearchingRif(state, searchingRif) {
      state.searchingRif = searchingRif;
    },
    setCurrentRif(state, searchingRif) {
      state.currentRif = searchingRif;
    },
    setCurrentDate(state) {
      let current_datetime = new Date();
      state.currentDate = current_datetime;
    },
    setSearchingRifError(state, error) {
      state.searchingRifError = error;
    },
    /*genFacturaError(state, error2) {
      state.facturaError = error2;
    },*/
  },
};