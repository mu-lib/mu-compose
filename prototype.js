(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/prototype"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-create")];
    }));
  }
})([], this, function () {
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
