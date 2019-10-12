/* eslint-disable */
import HTTPAdmin from '../httpAdmin';
import HTTPUser from '../httpUser';

export default {
  namespaced: true,
  state: {
    currentOrder: null,
    currentDetailOrder: null,
    orders: [],
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
    searchOrder({ state, commit }) {
      commit('setError', null);
      commit('setCurrentOrder', null);
      return HTTPUser().get(`pedido/${state.searching.trim()}`)
      .then(({ data }) => {
        commit('setCurrentOrder', data);
        commit('editTimestamps');
      }).catch(error => {
        commit('setError', error.response.data.error);
      });
    },
    searchDetailOrder({ commit }, { order }) {
      commit('setCurrentDetailOrder', null);
      return HTTPUser().get(`pedido/detalle/${order.id}`)
      .then(({ data }) => {
        commit('setCurrentDetailOrder', data);
      }).catch(error => {
        commit('setError', error.response.data.error);
      });
    },
    fetchOrders({ commit }, { isAdminUser, commerceTIR }) {
      if (isAdminUser) {
        return HTTPUser().get('pedido')
        .then(({ data }) => {
          commit('setOrders', data);
        });
      } else {
        return HTTPUser().get(`pedido/comercio/${commerceTIR}`)
        .then(({ data }) => {
          commit('setOrders', data.orders);
        });
      }
    },
    addTimestamp({ state, commit }) {
      let tipo;
      switch (state.selectedItem) {
        case 0:
          tipo = 'packed';
          break;
        case 1:
          tipo = 'charged';
          break;
        case 2:
          tipo = 'way';
          break;
        case 3:
          tipo = 'subsidiary';
          break;
        default:
          tipo = null;
          break;
      }
      return HTTPAdmin().patch(`pedido/${state.searching.trim()}`, {
        tipo: tipo
      })
      .then(() => {
        HTTPUser().get(`pedido/${state.searching.trim()}`)
        .then(({ data }) => {
          commit('setCurrentOrder', data);
          commit('editTimestamps');
        })
      }).catch(error => {
        commit('setError', error.response.data.error);
      });
    },
    setNotNullOrderItems({ commit }) {
      commit('setError', null);
      commit('setSearching', null);
      commit('setCurrentOrder', null);
      commit('setSelectedItem', null);
      commit('setOrders', null);
      commit('setCurrentDetailOrder', null);
    }
  },
  getters: {
    isSearching(state) {
      return !!state.currentOrder;
    },
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setSearching(state, searching) {
      state.searching = searching;
    },
    setCurrentOrder(state, order) {
      state.currentOrder = order;
      state.timestamps[0].timestamp = null;
      state.timestamps[1].timestamp = null;
      state.timestamps[2].timestamp = null;
      state.timestamps[3].timestamp = null;
    },
    setCurrentDetailOrder(state, order) {
      state.currentDetailOrder = order;
    },
    setSelectedItem(state, i) {
      state.selectedItem = i;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    editTimestamps(state) {
      let current_datetime = null;
      for (let index = 0; index < 4; index++) {
        if (index === 0 && !!state.currentOrder.packed) current_datetime = new Date(state.currentOrder.packed);
        if (index === 1 && !!state.currentOrder.charged) current_datetime = new Date(state.currentOrder.charged);
        if (index === 2 && !!state.currentOrder.way) current_datetime = new Date(state.currentOrder.way);
        if (index === 3 && !!state.currentOrder.subsidiary) current_datetime = new Date(state.currentOrder.subsidiary);
        if (!!current_datetime) {
          let horas = current_datetime.getHours();
          let ampm = horas >= 12 ? 'pm' : 'am';
          horas = horas % 12;
          horas = horas ? horas : 12;
          let fecha = [current_datetime.getDate().toString(), (current_datetime.getMonth() + 1).toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
          fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
          let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
          formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
          if (index === 0) state.timestamps[0].timestamp = formatted_date;
          if (index === 1) state.timestamps[1].timestamp = formatted_date;
          if (index === 2) state.timestamps[2].timestamp = formatted_date;
          if (index === 3) state.timestamps[3].timestamp = formatted_date;
          current_datetime = null;
        }
      }
    },
  },
};
