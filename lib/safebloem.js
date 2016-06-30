'use strict';
const utils = require('./utils');
const Bloem = require('./bloem');



class SafeBloem {


  constructor(capacity, error_rate, buffer) {
    const size = utils.calculateSize(capacity, error_rate);
    const slices = utils.calculateSlices(size, capacity);
    this.capacity = capacity;
    this.error_rate = error_rate;
    this.count = 0;
    this.filter = new Bloem(size, slices, buffer);
  }


  add(key) {
    if (this.count >= this.capacity) {
      return false;
    }

    this.filter.add(key);
    this.count++;
    return true;
  }


  has(key) {
    return this.filter.has(key);
  }


  static destringify(data) {
    const filter = new SafeBloem(data.capacity, data.error_rate);
    filter.count = data.count;
    filter.filter.bitfield.buffer = new Buffer(data.filter.bitfield.buffer);
    return filter;
  }
}
module.exports = SafeBloem;
