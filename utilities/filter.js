var forEach = require('./each')

module.exports = function filter (each, fn, _isArray) {
  var isArray = typeof _isArray !== 'undefined' ? _isArray : Array.isArray(each)
  var result

  if (typeof each !== 'function') each = forEach.bind(this, each)

  if (isArray) {
    result = []
    each(function (val, key) {
      if (fn.apply(this, arguments)) result.push(val)
    })
  } else {
    result = {}
    each(function (val, key) {
      if (fn.apply(this, arguments)) result[key] = val
    })
  }

  return result
}
