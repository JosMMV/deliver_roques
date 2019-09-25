/* eslint-disable */
import router from '../router';
import HTTP from '../httpUser';

export default {
  namespaced: true,
  state: {
    loginEmail: 'admin',
    loginPassword: '1234',
    loginError: null,
    token: null,
    isAdmin: false,
    commerceID: null,
    commerceName: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null); // set value of token to null
      router.push('/iniciar-sesion'); // then redirect to /iniciar-sesion
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('auth/iniciar_sesion', {
        username: state.loginEmail,
        password: state.loginPassword,
      })
      .then(({ data }) => {
        commit('setToken', data.token);
        commit('setAdminUser');
        commit('setCommerceID', data)
        router.push('/');
      })
      .catch(() => {
        commit('setLoginError', 'Usuario y/o contraseña incorrectos');
      });
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token; /* El primero ! convertirá un valor que no sea ni verdadero (true) ni
      falso (false) en un valor que sea verdadero (true) o falso (false), y luego lo invertirá. */
    },
    isAdminUser(state) {
      return state.isAdmin;
    },
    
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isAdmin = false;
      state.commerceID = null;
      state.commerceName = null;
    },
    setCommerceID(state, data) {
      state.commerceID = data.commerce_id;
      state.commerceName = data.commerce_name;
    },
    setAdminUser(state) {
      if (state.loginEmail.substring(0, 5) === 'admin') state.isAdmin = true;
    },
    setLoginError(state, error) {
      state.loginError = error;
    },
    setLoginEmail(state, email) {
      state.loginEmail = email;
    },
    setLoginPassword(state, password) {
      state.loginPassword = password;
    },
  },
};