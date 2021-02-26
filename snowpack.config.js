const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  exclude: ['**/*.d.ts'],
  plugins: [
    [
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
  routes: [
    /* Enable an SPA Fallback in development: */
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
