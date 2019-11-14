const assert = require('assert');
const baseConfig = require('../../lib/webpack.base');

describe('webpack.base.js test case', () => { // eslint-disable-line

  it('entry', () => { // eslint-disable-line
    assert.equal(baseConfig.entry.index.indexOf('learn-webpack/test/smoke/template/src/index/index.js') > -1, true);
    assert.equal(baseConfig.entry.search.indexOf('learn-webpack/test/smoke/template/src/search/index.js') > -1, true);
  });
});
