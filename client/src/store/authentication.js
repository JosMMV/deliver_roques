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
        commit('setAdminUser');
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
    },
    setAdminUser(state) {
       if (state.loginEmail[0]=='a' && state.loginEmail[1]=='d' && state.loginEmail[2]=='m' &&
          state.loginEmail[3]=='i' && state.loginEmail[4]=='n'){
            state.isAdmin = true;
      }else{
        state.isAdmin = false;
      }
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