'use strict';
/* global suite: false, setup: false, test: false,
    teardown: false, suiteSetup: false, suiteTeardown: false */
const assert = require('assert');
const bloem = require('../');


suite('ScalingBloem', function() {


  test('#empty', () => {
    const f = new bloem.ScalingBloem(0.01);

    assert.strictEqual(f.has(Buffer.from('foo')), false);
  });


  test('#add-and-grow', () => {
    let b;
    const f = new bloem.ScalingBloem(0.0005, {initial_capacity: 20});

    for (let i = 0; i < 100; i++) {
      b = Buffer.from(i.toString());
      assert.strictEqual(f.has(b), false);
      f.add(b);
      assert.strictEqual(f.has(b), true);
    }

    for (let i = 0; i < 100; i++) {
      assert.strictEqual(f.has(b), true);
    }

    for (let i = 100; i < 200; i++) {
      b = Buffer.from(i.toString());
      assert.strictEqual(f.has(b), false);
    }

    assert.strictEqual(f.filters.length, 3);
  });


  test('#destringify', () => {
    const b = new bloem.ScalingBloem(0.02, {initial_capacity: 2});

    b.add('one');
    b.add('two');
    b.add('three');

    const f = bloem.ScalingBloem.destringify(JSON.parse(JSON.stringify(b)));

    assert.strictEqual(f.has('one'), true);
    assert.strictEqual(f.has('two'), true);
    assert.strictEqual(f.has('three'), true);
    assert.strictEqual(f.has('four'), false);

    f.add('four');
    f.add('five');
    f.add('six');
    f.add('seven');

    assert.strictEqual(f.has('seven'), true);
    assert.strictEqual(f.filters.length, 3);
  });
});
