require('dotenv').config();

const withTypescript = require("@zeit/next-typescript");
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const normalizePath = require('normalize-path');
const path = require('path');
const cssesc = require('cssesc');
const loaderUtils = require('loader-utils');

const isEnvProduction = process.env === "production";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports = withTypescript(
  withImages(
    withSass({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
        localIdentName: "[local]___[hash:base64:5]",
        getLocalIdent: (loaderContext, localIdentName, localName, options) => {
          if (!options.context) {
            options.context = loaderContext.rootContext;
          }
          const request = normalizePath(
            path.relative(options.context || '', loaderContext.resourcePath)
          );

          options.content = `${options.hashPrefix + request}+${unescape(localName)}`;

          // custom source - css 파일은 cssModules가 처리되지 않도록 처리
          const fileName = path.basename(loaderContext.resourcePath);
          if (fileName.endsWith('.css')) {
            localIdentName = '[local]';
          }

          return cssesc(
            loaderUtils
              .interpolateName(loaderContext, localIdentName, options)
              .replace(/^((-?[0-9])|--)/, '_$1'),
            { isIdentifier: true }
          ).replace(/\\\[local\\\]/gi, localName);
        }
      },
      sassLoaderOptions: {
        includePaths: [__dirname +'/styles'],
        sourceMap: isEnvProduction && shouldUseSourceMap,
        data: `@import 'utils';`
      },
      withImages: withImages(),
      webpack(config, options) {
        // Further custom configuration here
        config.plugins = config.plugins || [];
        config.plugins = [
          ...config.plugins,
          new Dotenv({
            path: path.join(__dirname, './.env'),
            defaults: true
          })
        ]
        return config;
      }
    })
  )
);
