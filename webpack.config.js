const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const currentDir = process.env.INIT_CWD || process.cwd();
const allFiles = fs.readdirSync(currentDir);
const inputFiles = allFiles.filter(file => file.endsWith('-dev.html'));

if (inputFiles.length === 0) {
	console.log('No files matching *-dev.html found in current directory');
	process.exit(0);
}

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
	mode: isDevelopment ? 'development' : 'production',
  entry: {}, // Empty entry point since we're just processing HTML files
  output: {
    path: currentDir,
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: currentDir,
      watch: true,
    },
    port: 3000,
    open: {
      target: inputFiles[0].replace('-dev.html', '-prod.html'),
    },
    hot: false,
    liveReload: true,
    devMiddleware: {
      writeToDisk: (filePath) => {
        return filePath.endsWith('.html');
      },
    },
    watchFiles: {
      paths: ['**/*.html', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
      options: {
        usePolling: true,
        ignored: /node_modules/,
      },
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
  plugins: [
    ...inputFiles.map(file =>
      new HtmlWebpackPlugin({
        template: path.join(currentDir, file),
        filename: file.replace('-dev.html', '-prod.html'),
        inject: false, // Don't inject any scripts since we don't have an entry point
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
      })
    )
  ]  
};
