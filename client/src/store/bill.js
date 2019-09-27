/* eslint-disable */
import HTTP from '../httpAdmin';

export default {
  namespaced: true,
  state: {
    searchingRif: null,
    searchingRifError: null,
    currentCommerce: null,
    successMessage: null,
    bills: [],
  },
  actions: {
    preBill({ commit, state }) {
      commit('setCurrentCommerce', null);
      commit('setSearchingRifError', null);
      commit('setSuccessMessage', null);
      return HTTP().get(`/factura/prefactura/${state.searchingRif}`)
      .then(({ data }) => {
        if (!!data.error) commit('setSearchingRifError', data.error);
        else commit('setCurrentCommerce', data);
      }).catch(({ error }) => {
        commit('setSearchingRifError', error.response.data.error);
      });
    },
    createBill({ commit, state }) {
      commit('setSearchingRifError', null);
      commit('setSuccessMessage', null);
      return HTTP().post('factura', {
        commerce_tir: state.searchingRif
      })
      .then(({ data }) => {
        if (!!data.error) commit('setSearchingRifError', data.error);
        else{
          commit('setCurrentCommerce', null);
          commit('setSuccessMessage', 'Se ha creado la factura exitosamente');
        }
      })
      .catch(({ data }) => {
        commit('setSearchingRifError', data.error);
      });
    },
    fetchBills({ commit }, { isAdminUser, commerceID }) {
      commit('setBills', null);
      if (!!commerceID) {
        if (isAdminUser) {
          return HTTP().get('factura')
          .then(({ data }) => {
            commit('setBills', data);
          });
        } else {
          return HTTP().get(`factura/comercio/${commerceID}`)
          .then(({ data }) => {
            commit('setBills', data.bills);
          });
        }
      }
    }
  },
  getters: {
    issetcurrentCommerce (state) {
      return !!state.currentCommerce;
    },
    isSuccess(state) {
      return !!state.successMessage;
    }
  },
  mutations: {
    setSuccessMessage(state, message) {
      state.successMessage = message;
    },
    setSearchingRif(state, searchingRif) {
      state.searchingRif = searchingRif;
    },
    setSearchingRifError(state, error) {
      state.searchingRifError = error;
    },
    setBills(state, bills) {
      if (!bills) {
        state.bills = [];
      } else {
        let fecha;
        let current_datetime;
        let formatted_date;
        bills.forEach(bill => {
          current_datetime = new Date(bill.topDate);
          fecha = [current_datetime.getDate().toString(), (current_datetime.getMonth() + 1).toString(), current_datetime.getFullYear().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          bill.topDate = formatted_date;

          if (!!bill.payingDate) {
            current_datetime = new Date(bill.payingDate);
            fecha = [current_datetime.getDate().toString(), (current_datetime.getMonth() + 1).toString(), current_datetime.getFullYear().toString()]
            fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
            formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
            bill.payingDate = formatted_date;  
          } else {
            bill.payingDate = 'N/A';
          }
          current_datetime = new Date(bill.created_at);
          fecha = [current_datetime.getDate().toString(), (current_datetime.getMonth() + 1).toString(), current_datetime.getFullYear().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          bill.created_at = formatted_date;
        });
        state.bills = bills;
      }
    },
    setCurrentCommerce(state, commerce) {
      if (!!commerce) {
        let amount = 0;
        commerce.orders.forEach(order => {
          amount += order.shippingCost
        });
        commerce.amount = amount;
      }
      state.currentCommerce = commerce;
    },
  },
};