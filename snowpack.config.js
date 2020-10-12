const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    '@snowpack/plugin-sass',
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
