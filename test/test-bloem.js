'use strict';
/* global suite: false, setup: false, test: false,
    teardown: false, suiteSetup: false, suiteTeardown: false */
const assert = require('assert');
const bloem = require('../');


suite('Bloem', function() {


  test('#empty', () => {
    const f = new bloem.Bloem(8, 2);
    assert.strictEqual(f.has(Buffer.from('foo')), false);
  });


  test('#add', () => {
    const f = new bloem.Bloem(8, 2);

    assert.strictEqual(f.has(Buffer.from('foo')), false);
    f.add(Buffer.from('foo'));
    assert.strictEqual(f.has(Buffer.from('foo')), true);
    assert.strictEqual(f.has(Buffer.from('bar')), false);
  });


  test('#destringify', () => {
    const b = new bloem.Bloem(8, 2);

    b.add(Buffer.from('foo'));
    const f = bloem.Bloem.destringify(JSON.parse(JSON.stringify(b)));
    assert.strictEqual(f.has(Buffer.from('foo')), true);
    assert.strictEqual(f.has(Buffer.from('bar')), false);
  });
});
