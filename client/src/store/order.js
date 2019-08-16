/* eslint-disable */
import HTTPAdmin from '../httpAdmin';
import HTTPUser from '../httpUser';

export default {
  namespaced: true,
  state: {
    currentOrder: null,
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
      commit('setCurrentOrder', null);
      return HTTPUser().get(`pedido/${state.searching}`)
      .then(({ data }) => {
        commit('setError', false);
        commit('setCurrentOrder', data);
        commit('editTimestamps');
      }).catch(() => {
        commit('setError', true);
      });
    },
    addTimestamp({ state, commit }) {
      let tipo;
      switch (state.selectedItem) {
        case 0:
          tipo = 'empacado';
          break;
        case 1:
          tipo = 'cargado';
          break;
        case 2:
          tipo = 'camino';
          break;
        case 3:
          tipo = 'sucursal';
          break;
        default:
          tipo = null;
          break;
      }
      return HTTPAdmin().patch(`pedido/${state.searching}`, {
        tipo: tipo,
        fecha: new Date(),
      })
      .then(({ data }) => {
        commit('setCurrentOrder', data);
        commit('editTimestamps');
      }).catch(() => {
        console.log('error');
      });
    },
  },
  getters: {
    isSearching(state) {
      return !!state.currentOrder;
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
    setCurrentOrder(state, order) {
      state.currentOrder = order;
    },
    setSelectedItem(state, i) {
      state.selectedItem = i;
    },
    editTimestamps(state) {
      let current_datetime;
      for (let index = 0; index < 4; index++) {
        if (index === 0) {
          if (!!state.currentOrder.empacado) current_datetime = new Date(state.currentOrder.empacado);
          else break;
        }
        if (index === 1) {
          if (!!state.currentOrder.cargado) current_datetime = new Date(state.currentOrder.cargado);
          else break;
        }
        if (index === 2) {
          if (!!state.currentOrder.camino) current_datetime = new Date(state.currentOrder.camino);
          else break;
        }
        if (index === 3) {
          if (!!state.currentOrder.sucursal) current_datetime = new Date(state.currentOrder.sucursal);
          break;
        }
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
      }
    },
  },
};
