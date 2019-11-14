const glob = require('glob-all');

describe('Checking generated css and js files', () => { // eslint-disable-line
  it('should genarate css and js files', (done) => { // eslint-disable-line
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ]);

    if (files && files.length > 0) {
      done();
    } else {
      throw new Error('no css or js files');
    }
  });
});
