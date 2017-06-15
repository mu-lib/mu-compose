(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-create/process"] = factory.call(root);
  }
})(this, function () {
  var array = Array.prototype;
  var slice = array.slice;
  var concat = array.concat;

  return function () {
    var self = this;
    var rules = concat.apply(array, arguments);

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
