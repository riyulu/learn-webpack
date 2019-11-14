const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('builder-webpack test case', () => { // eslint-disable-line
  require('./unit/webpack-base-test'); // eslint-disable-line
});
