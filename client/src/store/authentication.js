/* eslint-disable */
import router from '../router';
import HTTP from '../http';

export default {
  namespaced: true,
  state: {
    loginEmail: '',
    loginPassword: '',
    loginError: null,
    token: null,
    isAdmin: false,
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
        commit('setToken', data.token.token);
        commit('setAdminUser', data.username);
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
      state.commerceName = null;
      state.loginEmail = null;
      state.loginPassword = null;
    },
    setCommerceID(state, data) {
      state.commerceName = data.commerce_name;
    },
    setAdminUser(state, username) {
      if (username.substring(0, 5) === 'admin') state.isAdmin = true;
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