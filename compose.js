(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root["mu-compose/compose"] = factory();
  }
})(this, function() {
  var w = this;
  var concat = Array.prototype.concat;
  var toString = Object.prototype.toString

  function flip(key) {
    return {
      "key": key,
      "value": this[key]
    };
  }

  function transform(data, index) {
    var type = toString.call(data);

    switch (type) {
      case "[object Object]":
        if (!data.hasOwnProperty("key")) {
          data = Object.keys(data).map(flip, data);
        }
        break;

      default:
        data = {
          "key": type,
          "value": data
        }
    }

    return data;
  }

  function clean(data) {
    return !!data;
  }

  function compose(composers) {
    var config = this;

    return function(instance, data, index, array) {
      var skip = false;

      return composers.reduce(function(result, composer) {
        var composed = skip ? result : composer.call(config, result, data, index, array);

        if (composed !== undefined && composed !== null) {
          if (composed === false) {
            skip = true;
          } else {
            result = composed;
          }
        }

        return result;
      }, instance);
    }
  }

  function Composition() {
    var self = this;

    (this.constructor.constructors || []).reduce(function(args, c) {
      var result = c.apply(self, args);

      switch (toString.call(result)) {
        case "[object String]":
        case "[object Object]":
        case "[object Number]":
        case "[object Boolean]":
          result = [result];
          break;

        case "[object Array]":
        case "[object Arguments]":
          break;

        default:
          result = args;
      }

      return result;
    }, arguments);
  }

  return function() {
    var config = this === w ? {} : this;
    var composers = concat.apply([], arguments);

    return function() {
      var _config = this === w ? config : this;
      var result = arguments;

      // Flatten
      result = concat.apply([], result);
      // Transform
      result = result.map(_config.transform || transform, _config);
      // Flatten
      result = concat.apply([], result);
      // Clean
      result = result.filter(_config.clean || clean, _config);
      // Compose
      return result.reduce(compose.call(_config, composers), _config.composition || Composition);
    }
  }
});
