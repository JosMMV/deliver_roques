module.exports = {
  devServer: {
    proxy: {
      '/dist': {
        target: 'http://localhost:3333',
      },
      '/api': {
        target: 'http://bankoneapi.16mb.com',
      },
    },
  },
};
