(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/dom"] = factory();
  }
}(this, function() {
  return function(result, data) {
    var key = data.key;
    var matches = key.match(/^(on|attr|prop)\/(.+)/);
    var dom = result.dom || (result.dom = []);

    if (matches) {
      dom.push({
        "matches": matches,
        "value": data.value
      });

      return false;
    }
  }
}));
