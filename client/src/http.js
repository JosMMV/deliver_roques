import axios from 'axios';
// eslint-disable-next-line
import store from './store/index';
// eslint-disable-next-line
import authentication from './store/authentication';

export default () => axios.create({
  baseURL: store.state.baseUrl,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${authentication.state.token}`,
  },
});
