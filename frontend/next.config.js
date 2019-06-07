const withTypescript = require("@zeit/next-typescript");
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

const isEnvProduction = process.env === "production";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = withTypescript(
  withImages(
    withSass({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
        localIdentName: "[local]___[hash:base64:5]",
      },
      sassLoaderOptions: {
        includePaths: [__dirname +'/styles'],
        sourceMap: isEnvProduction && shouldUseSourceMap,
        data: `@import 'utils';`
      },
      withImages: withImages(),
      webpack(config, options) {
      // Further custom configuration here
        return config;
      }
    })
  )
);
