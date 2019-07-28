module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3333',
      },
      '/admin': {
        target: 'http://localhost:3333',
      },
    },
  },
};
