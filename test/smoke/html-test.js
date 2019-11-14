const glob = require('glob-all');

describe('Checking generated html files', () => { // eslint-disable-line
  it('should genarate html files', (done) => { // eslint-disable-line
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html',
    ]);

    if (files && files.length > 0) {
      done();
    } else {
      throw new Error('no html files');
    }
  });
});
