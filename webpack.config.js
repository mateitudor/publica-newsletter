const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Get the directory where npm run build was executed
const currentDir = process.env.INIT_CWD || process.cwd();
console.log('Current directory:', currentDir);

const allFiles = fs.readdirSync(currentDir);
console.log('All files in directory:', allFiles);

const inputFiles = allFiles.filter(file => file.endsWith('-dev.html'));
console.log('Files matching *-dev.html:', inputFiles);

if (inputFiles.length === 0) {
  console.log('No files matching *-dev.html found in current directory');
  process.exit(0);
}

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: inputFiles.reduce((entries, file) => {
    entries[file] = path.join(currentDir, file);
    return entries;
  }, {}),
  output: {
    path: currentDir,
    filename: '[name].bundle.js',
  },
  devServer: {
    static: {
      directory: currentDir,
      watch: {
        ignored: /node_modules/,
        usePolling: true,
      },
    },
    port: 3000,
    hot: true,
    open: true,
    watchFiles: ['*.html'],
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: inputFiles.map(file => 
    new HtmlWebpackPlugin({
      template: path.join(currentDir, file),
      filename: file.replace('-dev.html', '-prod.html'),
      chunks: [file],
      minify: !isDevelopment && {
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
    })
  ),
}; 