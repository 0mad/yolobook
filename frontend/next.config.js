const withTypescript = require("@zeit/next-typescript");
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
      localIdentName: "[local]___[hash:base64:5]",
    },
    // sassLoaderOptions: {
    //   includePaths: ['styles'],
    //   sourceMap: isEnvProduction && shouldUseSourceMap,
    //   data: `@import 'utils';`
    // },
    webpack(config, options) {
      // Further custom configuration here
      return config;
    }
  }
));
