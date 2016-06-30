'use strict';
const utils = require('./utils');
const BitBuffer = require('bitbuffer');



class Bloem {


  constructor(size, slices, buffer) {
    this.size = size;
    this.slices = slices;
    this.bitfield = new BitBuffer(size, buffer);
  }


  add(key) {
    const hashes = utils.calulateHashes(key, this.size, this.slices);
    const len = hashes.length;

    for (let i = 0; i < len; i++) {
      this.bitfield.set(hashes[i], true);
    }
  }


  has(key) {
    var hashes = utils.calulateHashes(key, this.size, this.slices);
    const len = hashes.length;

    for (var i = 0; i < len; i++) {
      if (!this.bitfield.get(hashes[i])) {
        return false;
      }
    }

    return true;
  }


  static destringify(data) {
    const filter = new Bloem(data.size, data.slices);
    filter.bitfield.buffer = new Buffer(data.bitfield.buffer);
    return filter;
  }
}
module.exports = Bloem;
