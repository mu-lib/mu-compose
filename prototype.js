(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/prototype"] = factory();
  }
}(this, function() {
  return function(result, data) {
    result.prototype[data.key] = data.value;
  }
}));
