(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./transform", "./process"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./transform"), require("./process"));
  } else {
    root["mu-create/create"] = factory(root["mu-create/transform"], root["mu-create/process"]);
  }
})(this, function (transform, process) {
  var root = this;
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;
  var count = 0;
  var prefix = "blueprint-" + count++;

  function clean(data) {
    return !!data;
  }

  function identify(result, data) {
    data[prefix] = count++;
    return result;
  }

  function anonymize(result, data) {
    delete data[prefix];
    return result;
  }

  function unique(data) {
    var me = this;
    var id = data[prefix];

    return me.hasOwnProperty(id)
      ? false
      : me[id] = data;
  }

  return function configure() {
    var rules = slice.call(arguments);

    function create() {
      var config = this === root ? {} : this;
      var result = slice.call(arguments);
      var blueprints;

      // Flatten & Clean
      result = concat.apply(array, result).filter(clean, config);
      // Identify
      result = result.reduce(identify, result);
      // Unique
      result = result.filter(unique, {});
      // Anonymize
      result = result.reduce(anonymize, result);
      // Transform
      result = result.map(config.transform || transform, config);
      // Flatten & Clean
      result = blueprints = concat.apply(array, result).filter(clean, config);
      // Process
      result = result.reduce(process.apply(config, rules), function Constructor() {
        var self = this;

        (this.constructor.constructors || array).reduce(function (args, c) {
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
        var r = concat.apply(blueprints, arguments);
        r = r.reduce(identify, r);
        r = r.filter(unique, {});
        r = r.reduce(anonymize, r);
        return r;
      };

      result.extend = function () {
        return create.apply(this, result.concat.apply(this, arguments));
      };

      return result;
    }

    create.concat = function () {
      var r = concat.apply(rules, arguments);
      r = r.reduce(identify, r);
      r = r.filter(unique, {});
      r = r.reduce(anonymize, r);
      return r;
    };

    create.extend = function () {
      return configure.apply(this, create.concat.apply(this, arguments));
    };

    return create;
  }
});
