import router from '../router';
/* eslint-disable */
import HTTP from '../httpUser';

export default {
  namespaced: true,
  state: {
    loginEmail: 'admin',
    loginPassword: '1234',
    loginError: null,
    token: null,
  },
  actions: {
    logout({ commit }) {
      commit('setToken', null); // set value of token to null
      router.push('/tracking'); // then redirect to /login
    },
    login({ commit, state }) {
      commit('setLoginError', null);
      return HTTP().post('auth/iniciar_sesion', {
        username: state.loginEmail,
        password: state.loginPassword,
      })
      .then(({ data }) => {
        commit('setToken', data.token);
        router.push('/');
      })
      .catch(() => {
        commit('setLoginError', 'An error has occured trying to login.');
      });
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
