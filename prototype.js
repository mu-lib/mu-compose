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
  function p(proto) {
    function f() {};
    f.prototype = proto;
    return new f();
  }

  return function (result, data) {
    if (data.key === "proto") {
      result.prototype = p(data.value);
    }
    else if (data.key === "prototype") {
      result.prototype = data.value;
    }
    else {
      result.prototype[data.key] = data.value;
    }
  }
});
