(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/constructor"] = factory.apply(root, modules.map(function(m) {
      return root[m.replace(/^\./, "mu-create")];
    }));
  }
})([], this, function() {
  return function(result, data) {
    var key = data.key;

    if (key === "[object Function]") {
      (result.constructors = result.constructors || []).push(data.value);
      return false;
    }
  }
});
