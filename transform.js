(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-create/transform"] = factory();
  }
})(this, function () {
  var slice = Array.prototype.slice;
  var toString = Object.prototype.toString

  function value(key) {
    return {
      "key": key,
      "value": this[key]
    };
  }

  function transpose(keys) {
    return keys.map(value, this);
  }

  return function (data) {
    var type = toString.call(data);
    var transformed;

    if (type === "[object Arguments]") {
      return {
        "key": "[object Array]",
        "value": slice.call(data)
      };
    }

    if (type === "[object Object]") {
      if (data.hasOwnProperty("key")) {
        return data;
      }

      transformed = transpose.call(data, Object.keys(data));

      if (transformed.length) {
        return transformed;
      }
    }

    return {
      "key": type,
      "value": data
    };
  }
});
