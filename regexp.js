(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/regexp"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-compose")];
    }));
  }
})([], this, function() {
  return function(regexp, callback) {
    return function(result, data) {
      var matches = data.key.match(regexp);

      if (matches) {
        return callback.apply(this, [result, data].concat(matches.slice(1)));
      }
    }
  }
});
