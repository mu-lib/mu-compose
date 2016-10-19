(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-create/process"] = factory.call(root);
  }
})([], this, function () {
  var slice = Array.prototype.slice;
  var concat = Array.prototype.concat;

  return function () {
    var self = this;
    var rules = concat.apply([], arguments);

    return function (input) {
      var skip = false;
      var args = slice.call(arguments, 1);

      return rules.reduce(function (output, rule) {
        var created = skip ? output : rule.apply(self, [output].concat(args));

        if (created !== undefined) {
          if (created === false) {
            skip = true;
          }
          else {
            output = created;
          }
        }

        return output;
      }, input);
    }
  }
});
