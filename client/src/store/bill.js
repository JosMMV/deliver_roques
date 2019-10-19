/* eslint-disable */
import HTTP from '../http';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    searchingRif: null,
    searchingError: null,
    searchingBill: null,
    currentCommerce: null,
    currentBill: null,
    successMessage: null,
    bills: [],
  },
  actions: {
    preBill({ commit, state }) {
      commit('setCurrentCommerce', null);
      commit('setSearchingError', null);
      commit('setSuccessMessage', null);
      return HTTP().get(`/factura/prefactura/${state.searchingRif}`)
      .then(({ data }) => {
        if (!!data.error) commit('setSearchingError', data.error);
        else commit('setCurrentCommerce', data);
      }).catch(({ error }) => {
        commit('setSearchingError', error.response.data.error);
      });
    },
    createBill({ commit, state }) {
      commit('setSearchingError', null);
      commit('setSuccessMessage', null);
      return HTTP().post('factura', {
        commerce_tir: state.searchingRif
      })
      .then(({ data }) => {
        if (!!data.error) commit('setSearchingError', data.error);
        else{
          let d = new Date(data.bill.topDate)
          let fecha= [d.getFullYear().toString(), (d.getMonth() + 1).toString(), d.getDate().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          let formatted_date = fecha[0] + "-" + fecha[1] + "-" + fecha[2];
          let options = {
            withCredentials: false,
            headers: {
              Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NzA5ODQ5MjcsImV4cCI6MTYwMjA4ODkyNywiZGF0YSI6eyJpZCI6NSwianVzcl9yaWYiOiJKMjM1NjEyNzc4IiwianVzcl91c2VyIjo4LCJqdXNyX2VtYWlsIjoianNtaWd1ZWwxNzAyQGdtYWlsLmNvbSIsImp1c3JfY29tcGFueSI6IkRlbGl2ZXIgUm9xdWVzIiwianVzcl9hZGRyZXNzIjoiQ2FyYWNhcyIsImp1c3JfcGhvbmUiOiIyMTIxMjM0NTY3IiwicGFzc3dvcmQiOiIkMnkkMTAkdlF0TmJmaVlyOUo0dzQ0ZzFzUTRmT0V2Z3J3emxibVNFXC9WYndUODFEZmhEbFhxRVlkTEdHIiwicV9yZWNvdmVyeSI6Ilx1MDBiZmN1XHUwMGUxbmRvPyIsImFfcmVjb3ZlcnkiOiJzaWVtcHJlIiwiYWN0aXZlIjoxLCJqdXNyX2NyZWF0ZWRfYXQiOiIyMDE5LTEwLTEzIDE1OjE3OjQzIiwianVzcl91cGRhdGVkX2F0IjoiMjAxOS0xMC0xMyAxNToxOToyMCIsImp1c3JfZGVsZXRlZF9hdCI6bnVsbH19.7BRR_2AckuY9pTdSAK4dA0xik73LLbLhTKEJB4pObIg',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Request-Method': 'POST, OPTIONS'
            },
          }
          return axios.post('http://bankoneapi.16mb.com/bill', {
            emitter: data.commerce_tir,
            receiver: 'J123456788',
            bill_ref_code: data.bill.id.toString(),
            amount: data.bill.amount,
            expdate: formatted_date,
            password: "Qwerty123$",
            descripcion: ""
          }, options
          ).then(({ data }) => {
            if (data.success) {
              commit('setCurrentCommerce', null);
              commit('setSuccessMessage', 'Se ha creado la factura exitosamente')
            } else {
              commit('setSearchingError', 'Error al enviar factura al banco')
            }
          })
        }
      })
      .catch(({ data }) => {
        commit('setSearchingError', data.error);
      });
    },
    fetchBills({ commit }, { isAdminUser }) {
      commit('setBills', null);
      if (isAdminUser) {
        return HTTP().get('factura')
        .then(({ data }) => {
          commit('setBills', data);
        });
      } else {
        return HTTP().get(`factura/comercio`)
        .then(({ data }) => {
          commit('setBills', data.bills);
        });
      }
    },
    setBill({ commit }, { bill }){
      commit('setCurrentBill', bill);
    },
    patchBillStatus({ commit, state }) {
      return HTTP().patch(`factura/${state.currentBill.id}`)
      .then(() => {
        commit('setBills', null);
        commit('setCurrentBill', null)
        return HTTP().get('factura')
        .then(({ data }) => {
          commit('setBills', data);
        });
      })
      .catch(({ data }) => {
        commit('setCurrentBill', null);
        commit('setSearchingError', data.error);
      });
    },
    setNotNullBillItems({ commit }) {
      commit('setSuccessMessage', null);
      commit('setSearchingRif', null);
      commit('setSearchingError', null);
      commit('setBills', null);
      commit('setCurrentCommerce', null);
      commit('setCurrentBill', null);
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
    setCurrentBill(state, bill) {
      state.currentBill = bill;
    },
    setSearchingRif(state, searchingRif) {
      state.searchingRif = searchingRif;
    },
    setSearchingBill(state, searchingBill) {
      state.searchingBill = searchingBill;
    },
    setSearchingError(state, error) {
      state.searchingError = error;
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