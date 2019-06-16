require('dotenv').config();
const isEnvProduction = process.env === "production";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const path = require('path');
const Dotenv = require('dotenv-webpack');

/**
 * css loader getLocalIdent 함수 수정
 * scss 파일만 css module 적용되도록 처리
 * https://github.com/webpack-contrib/css-loader/blob/master/src/utils.js
 */
const normalizePath = require('normalize-path');
const cssesc = require('cssesc');
const loaderUtils = require('loader-utils');
const customGetLocalIdent = (loaderContext, localIdentName, localName, options) => {
  if (!options.context) {
    options.context = loaderContext.rootContext;
  }
  const request = normalizePath(
    path.relative(options.context || '', loaderContext.resourcePath)
  );

  options.content = `${options.hashPrefix + request}+${unescape(localName)}`;

  // custom source - start
  const fileName = path.basename(loaderContext.resourcePath);
  if (fileName.endsWith('.css')) {
    localIdentName = '[local]';
  }
  // custom source - end

  return cssesc(
    loaderUtils
      .interpolateName(loaderContext, localIdentName, options)
      .replace(/^((-?[0-9])|--)/, '_$1'),
    { isIdentifier: true }
  ).replace(/\\\[local\\\]/gi, localName);
}

// next plugins
const withPlugins = require('next-compose-plugins');
const withTypescript = require("@zeit/next-typescript");
const withImages = require('next-images');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const plugins = [
  [ withTypescript ],
  [ withImages ],
  [ withCss, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
      localIdentName: "[local]___[hash:base64:5]",
      getLocalIdent: customGetLocalIdent,
    },
  }],
  [ withSass, {
    sassLoaderOptions: {
      includePaths: [__dirname +'/styles'],
      sourceMap: isEnvProduction && shouldUseSourceMap,
      data: `@import 'utils';`
    },
  }]
];

// next app config
const NextAppConfig = ({
  webpack(config, options) {
    // Further custom configuration here
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, './.env'),
      })
    ]
    return config;
  }
});

module.exports = withPlugins( plugins, NextAppConfig );
