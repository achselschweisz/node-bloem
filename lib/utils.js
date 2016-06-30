'use strict';
const FNV = require('fnv');



function calculateSize(capacity, error_rate) {
  /* Math.pow(Math.log(2), 2) */
  const log2sq = 0.480453;
  return Math.ceil(capacity * Math.log(error_rate) / -log2sq);
}
module.exports.calculateSize = calculateSize;


function calculateSlices(size, capacity) {
  return size / capacity * Math.log(2);
}
module.exports.calculateSlices = calculateSlices;


function calulateHashes(key, size, slices) {
  /* See:
   * Less Hashing, Same Performance: Building a Better Bloom Filter
   * 2005, Adam Kirsch, Michael Mitzenmacher
   * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.72.2442
   */
  const fnv = (seed, data) => {
    const h = new FNV();
    h.update(seed);
    h.update(data);
    return h.value() >>> 0;
  };

  const h1 = fnv(Buffer('S'), key);
  const h2 = fnv(Buffer('W'), key);
  const hashes = [];

  for (let i = 0; i < slices; i++) {
    hashes.push((h1 + i * h2) % size);
  }

  return hashes;
}
module.exports.calulateHashes = calulateHashes;
