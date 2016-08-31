(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/constructor"] = factory();
  }
}(this, function() {
  return function(result, data) {
    var key = data.key;

    if (key === "constructor") {
      (result.constructors = result.constructors || []).push(data.value);

      return false;
    }
  }
}));
