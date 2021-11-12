module.exports = function (bs) {
  console.log('fuck off', bs)
  return {
    baseDir: 'dist/apps4web',
    port: 4300,
    server: {
      middleware: {
        // overrides the second middleware default with new settings
        1: require('compression')(),
      },
    },
  };
};
