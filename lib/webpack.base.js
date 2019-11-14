const glob = require('glob');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const projectRoot = process.cwd();

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];

  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));

  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];
      // console.log(pageName);

      entry[pageName] = entryFile;
      return htmlWebpackPlugin.push(
        new HtmlWebpackPlugin({
          template: path.join(projectRoot, `src/${pageName}/index.html`), // 模板位置
          filename: `${pageName}.html`, // 名字
          chunks: ['vendors', pageName], // 引入的 chunks
          inject: true,
          minify: {
            html5: true, // 页面是否压缩
            collapseWhitespace: true, // 是否去空格
            preserveLineBreacks: false, // 是否去换行
            minifyCSS: true, // 是否压缩内嵌 css
            minifyJS: true, // 是否压缩内嵌 js
            removeComments: false, // 是否去注释
          },
        }),
      );
    });
  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    // filename: 'bundle.js',
    // [name] 占位符
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      // {
      //   test: /.html$/,
      //   use: ['raw-loader']
      // },
      {
        test: /.js$/,
        enforce: 'pre',
        use: [
          'babel-loader',
          // {
          //   loader: 'eslint-loader',
          //   options: { fix: true },
          // },
        ],
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [
          'style-loader',
          // MiniCssExtrackPligin.loader,
          'css-loader',
        ],
      },
      {
        test: /.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer(),
                // require('cssnano'),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              // 75px 为 1rem
              remUnit: 75,
              // 计算小数点后 8 位
              remPrecision: 8,
            },
          },
        ],
      },
      // {
      //   test: /.(png|gif|svg|jpg)$/,
      //   use: [{
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name]_[hash:8].[ext]'
      //     }
      //   }]
      // }
      {
        test: /.(png|gif|svg|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: '[name]_[hash:8].[ext]',
          },
        }],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:16].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // 捕捉构建错误，用于数据上报等，重新抛出
    function errorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error'); // eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  stats: 'errors-only',
};
