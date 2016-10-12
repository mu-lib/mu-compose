(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/create"] = factory.apply(root, modules.map(function (m) {
      return root[m.replace(/^\./, "mu-create")];
    }));
  }
})(["./transform", "./process"], this, function (transform, process) {
  var root = this;
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;

  function clean(data) {
    return !!data;
  }

  return function configure() {
    var rules = slice.call(arguments);

    function create() {
      var config = this === root ? {} : this;
      var result = slice.call(arguments);
      var blueprints;

      // Flatten & Clean
      result = concat.apply(array, result).filter(clean, config);
      // Transform
      result = result.map(config.transform || transform, config);
      // Flatten & Clean
      result = blueprints = concat.apply(array, result).filter(clean, config);
      // Process
      result = result.reduce(process.apply(config, rules), function Composition() {
        var self = this;

        (this.constructor.constructors || []).reduce(function (args, c) {
          var r = c.apply(self, args);

          switch (toString.call(r)) {
            case "[object String]":
            case "[object Object]":
            case "[object Number]":
            case "[object Boolean]":
              r = [r];
              break;

            default:
              r = r && r.length ? r : args;
          }

          return r;
        }, arguments);
      });

      result.concat = function () {
        return concat.apply(blueprints, arguments);
      };

      result.extend = function () {
        return create.apply(this, result.concat.apply(this, arguments));
      };

      return result;
    }

    create.concat = function () {
      return concat.apply(rules, arguments);
    };

    create.extend = function () {
      return configure.apply(this, create.concat.apply(this, arguments));
    };

    return create;
  }
});
