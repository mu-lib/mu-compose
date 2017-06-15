(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-create/prototype"] = factory.call(root);
  }
})(this, function () {
  var toString = Object.prototype.toString;

  return function (result, data) {
    var value = data.value;

    if (data.key === "prototype") {
      result.prototype = toString.call(value) === "[object Function]"
        ? value.call(this, result)
        : value;
    }
    else {
      result.prototype[data.key] = value;
    }
  }
});
