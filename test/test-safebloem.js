'use strict';
/* global suite: false, setup: false, test: false,
    teardown: false, suiteSetup: false, suiteTeardown: false */
const assert = require('assert');
const bloem = require('../');


suite('SafeBloem', function() {


  test('#empty', () => {
    const f = new bloem.SafeBloem(10, 0.01);

    assert.strictEqual(f.has(Buffer.from('foo')), false);
  });


  test('#add-and-stop', () => {
    const f = new bloem.SafeBloem(10, 0.02);

    for (let i = 0; i < 10; i++) {
      const b = Buffer.from(i.toString());
      assert.strictEqual(f.has(b), false);
      assert.strictEqual(f.add(b), true);
      assert.strictEqual(f.has(b), true);
    }

    for (let i = 10; i < 15; i++) {
      const b = Buffer.from(i.toString());
      assert.strictEqual(f.has(b), false);
      assert.strictEqual(f.add(b), false);
      assert.strictEqual(f.has(b), false);
    }
  });


  test('#destringify', () => {
    const b = new bloem.SafeBloem(3, 0.002);

    assert.strictEqual(b.add('one'), true);
    assert.strictEqual(b.add('two'), true);

    const f = bloem.SafeBloem.destringify(JSON.parse(JSON.stringify(b)));

    assert.strictEqual(f.has('one'), true);
    assert.strictEqual(f.has('two'), true);

    assert.strictEqual(f.has('three'), false);
    assert.strictEqual(f.add('three'), true);
    assert.strictEqual(f.has('three'), true);

    assert.strictEqual(f.has('four'), false);
    assert.strictEqual(f.add('four'), false);
  });
});
