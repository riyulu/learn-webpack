const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

// 进入当前目录
process.chdir(path.join(__dirname, 'template'));

const mocha = new Mocha({
  timeout: '10000ms',
});
const prodConfig = require('../../lib/webpack.prod');

rimraf('./dist', () => {
  webpack(prodConfig, (err, stats) => {
    if (err) {
      console.error(err); // eslint-disable-line
      process.emit(2);
    }

    console.log(stats.toString({ // eslint-disable-line
      colors: true,
      modules: false,
      children: false,
    }));

    console.log('Webpack build success, begin run test'); // eslint-disable-line

    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});
