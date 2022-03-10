class EventEmitter {
  _events = {}
  on(eventName, callback) {
    if (!this._events) this._events = {} // 保证继承的类上也有_events
    const callbacks = this._events[eventName] || []
    callbacks.push(callback)
    this._events[eventName] = callbacks
  }
  emit(eventName, ...args) {
    const callbacks = this._events[eventName]
    if (callbacks) {
      callbacks.forEach((cb) => cb(...args))
    }
  }
  off(eventName, callback) {
    if (!this._events) this._events = {}
    if (this._events[eventName]) {
      this._events[eventName] = this._events[eventName].filter(
        (fn) => fn !== callback && fn.l !== callback
      )
    }
  }
  once(eventName, callback) {
    const one = (...args) => {
      callback(...args)
      this.off(eventName, one)
    }
    one.l = callback // 使one和传入的回调关联，外部才可以调off关掉once对应的callback
    this.on(eventName, one)
  }
}

module.exports = EventEmitter
