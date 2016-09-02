(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/regexp"] = factory();
  }
}(this, function() {
  return function(regexp, prop) {
    return function(result, data) {
      var key = data.key;
      var matches = key.match(regexp);

      if (matches) {
        (result[prop] = result[prop] || []).push({
          "matches": matches,
          "value": data.value
        });

        return false;
      }
    }
  }
}));
