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
  function proto() {};

  return function (result, data) {
    if (data.key === "proto") {
      proto.prototype = data.value;
      result.prototype = new proto();
    }
    else if (data.key === "prototype") {
      result.prototype = data.value;
    }
    else {
      result.prototype[data.key] = data.value;
    }
  }
});
