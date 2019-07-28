/* eslint-disable */
import HTTPAdmin from '../httpAdmin';
import HTTPUser from '../httpUser';

export default {
  namespaced: true,
  state: {
    orderNumber: null,
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
      return HTTPUser().get(`pedido/${state.searching}`)
      .then(({ data }) => {
        commit('setError', false);
        commit('setCurrentOrder', data);
        commit('setOrderNumber');
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
        console.log('listo');
      }).catch(() => {
        console.log('error');
      });
    },
  },
  getters: {
    isSearching(state) {
      return !!state.orderNumber;
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
    setOrderNumber(state) {
      state.orderNumber = state.currentOrder.id;
    },
    setSelectedItem(state, i) {
      state.selectedItem = i;
    },
    editTimestamp(state) {
      let current_datetime = new Date();
      let horas = current_datetime.getHours();
      let ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12;
      let fecha = [current_datetime.getDate().toString(), current_datetime.getMonth().toString(), current_datetime.getFullYear().toString(), horas.toString(), current_datetime.getMinutes().toString()]
      fecha = fecha.map(num => num.length === 1 ? '0' + num : num);
      let formatted_date = fecha[0] + "/" + fecha[1] + "/" + fecha[2];
      formatted_date += ' a las ' + fecha[3] + ":" + fecha[4] + ampm;
      state.timestamps[state.selectedItem].timestamp = formatted_date;
    },
  },
};
