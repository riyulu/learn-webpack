const assert = require('assert');
const baseConfig = require('../../lib/webpack.base');

describe('webpack.base.js test case', () => { // eslint-disable-line
  console.log(baseConfig); // eslint-disable-line

  it('entry', () => { // eslint-disable-line
    assert.equal(baseConfig.entry.index, 'E:/learn/webpack_learn/builder-webpack/test/smoke/template/src/index/index.js');
    assert.equal(baseConfig.entry.search, 'E:/learn/webpack_learn/builder-webpack/test/smoke/template/src/search/index.js');
  });
});
