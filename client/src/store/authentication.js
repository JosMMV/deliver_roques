import router from '../router';
/* eslint-disable */

export default {
  namespaced: true,
  state: {
    loginEmail: 'testing@gmail.com',
    loginPassword: '12346578',
    loginError: null,
    token: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null); // set value of token to null
      router.push('/tracking'); // then redirect to /login
    },
    login({ commit }) {
      commit('setLoginError', null); // set value of LoginError to null
      commit('setToken', 'este es el token: :)');
      router.push('/'); // then redirect to home
    },
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token; /* El primero ! convertirá un valor que no sea ni verdadero (true) ni
      falso (false) en un valor que sea verdadero (true) o falso (false), y luego lo invertirá. */
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
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
