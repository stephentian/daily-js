// FIFO queue

// FIFO is a cache algorithm。
// when the cache is full
// we remove the cached item that is at the front of the FIFO queue
// since it was added first and add the new item at the tail

class FIFOCacke {
  constructor(limit) {
    this.limit = limit || 10
    this.map = {}
    this.keys = []
  }
  set(key, value) {
    let map = this.map
    let keys = this.keys
    if (!Object.prototype.hasOwnProperty.call(map, key)) {
      if (keys.length === this.limit) {
        // remove item at the tail
        delete map[keys.shift()]
      }
      keys.push(key)
    }
    map[key] = value
  }
  get(key) {
    return this.map[key]
  }
}
