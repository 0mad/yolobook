const path = require('path');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [require.resolve('@zeit/next-typescript/babel'), require.resolve('next/babel')],
        },
      }
    ],
  });
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      { loader: "style-loader" }, 
      { 
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        }
      }, 
      {
        loader: "sass-loader",
        options: {
          includePaths: [
            path.resolve(__dirname, '../styles'),
          ],
          data: `@import 'utils';`
        }
      }],
  });
  config.resolve.extensions.push('.ts', '.tsx', 'scss');
  return config;
};