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
    currentCommerce: null,
    currentDate: null,
  },
  actions: {
    searchNullReceipts({ state, commit }) {
      return HTTP().get(`comercio/${state.searchingRif}`)
      .then(({ data }) => {
        commit('setCurrentCommerce', data);
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
        comercio_rif: state.currentCommerce.rif,
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
    issetcurrentCommerce (state) {
      return !!state.currentCommerce;
    },
    issetSearchingRifError(state) {
      return !!state.searchingRifError;
    },
  },
  mutations: {
    setSearchingRif(state, searchingRif) {
      state.searchingRif = searchingRif;
    },
    setCurrentCommerce(state, searchingRif) {
      state.currentCommerce = searchingRif;
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