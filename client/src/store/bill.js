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
    bills: [],
  },
  actions: {
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
    fetchBills({ commit }, { isAdminUser, commerceID }) {
      commit('setBills', null);
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
          fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          bill.topDate = formatted_date;

          if (!!bill.payingDate) {
            current_datetime = new Date(bill.payingDate);
            fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString()]
            fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
            formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
            bill.payingDate = formatted_date;  
          } else {
            bill.payingDate = 'N/A';
          }
          current_datetime = new Date(bill.created_at);
          fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          bill.created_at = formatted_date;
        });
        state.bills = bills;
      }
    }
  },
};