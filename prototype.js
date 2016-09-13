(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/prototype"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-create")];
    }));
  }
})([], this, function() {
  return function(result, data) {
    result.prototype[data.key] = data.value;
  }
});
