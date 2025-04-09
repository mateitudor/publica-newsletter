const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

// Get the current directory name (e.g., "03_19")
const currentDir = process.cwd().split('/').pop();

// Find all HTML files ending with -dev.html in the current directory
const htmlFiles = glob.sync(`./${currentDir}/*-dev.html`);

module.exports = {
  mode: 'production',
  entry: htmlFiles.reduce((entries, file) => {
    const name = path.basename(file, '.html');
    entries[name] = file;
    return entries;
  }, {}),
  output: {
    path: path.resolve(__dirname, currentDir),
    filename: '[name].js',
  },
  plugins: [
    ...htmlFiles.map(file => {
      const name = path.basename(file, '.html');
      return new HtmlWebpackPlugin({
        template: file,
        filename: name.replace('-dev', '-prod') + '.html',
        inject: false,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      });
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
    ],
  },
}; 