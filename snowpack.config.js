const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    [
      // TODO: Migrate to @snowpack/plugin-sass when published
      // https://github.com/pikapkg/snowpack/tree/master/plugins/plugin-sass
      '@snowpack/plugin-run-script',
      {
        cmd: 'sass src:src --no-source-map',
        watch: '$1 --watch',
      },
    ],
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-babel',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: (config) => {
          config.plugins.push(
            new CompressionPlugin({
              filename: '[path][base].gz',
              algorithm: 'gzip',
              test: /\.(js|css|html|svg)$/,
              threshold: 0,
              minRatio: Infinity,
              deleteOriginalAssets: false,
            }),
          );
          return config;
        },
      },
    ],
  ],
};
