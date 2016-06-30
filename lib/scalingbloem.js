'use strict';
const SafeBloem = require('./safebloem');



class ScalingBloem {


  constructor(error_rate, options) {
    options = options || {};
    this.error_rate = error_rate;
    this.ratio = options.ratio || 0.9;
    this.scaling = options.scaling || 2;
    this.initial_capacity = options.initial_capacity || 1000;

    this.filters = [
      new SafeBloem(this.initial_capacity, error_rate * (1 - this.ratio))
    ];
  }


  add(key) {
    let filters = this.filters.slice(-1)[0];

    if (filters.add(key)) {
      return;
    }

    const filter = new SafeBloem(filters.capacity * this.scaling,
        filters.error_rate * this.ratio);

    filter.add(key);
    this.filters.push(filter);
  }


  has(key) {
    const len = this.filters.length - 1;

    for (let i = len; i > -1; --i) {
      if (this.filters[i].has(key)) {
        return true;
      }
    }

    return false;
  }


  static destringify(data) {
    const filter = new ScalingBloem(data.error_rate, {
      ratio: data.ratio,
      scaling: data.scaling,
      initial_capacity: data.initial_capacity
    });

    filter.filters = [];

    for (let i = 0; i < data.filters.length; ++i) {
      filter.filters.push(SafeBloem.destringify(data.filters[i]));
    }

    return filter;
  }
}
module.exports = ScalingBloem;
