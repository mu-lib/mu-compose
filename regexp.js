(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.call(root);
  } else {
    root["mu-create/regexp"] = factory.call(root);
  }
})(this, function () {
  return function (regexp, callback) {
    return function (result, data) {
      var matches = data.key.match(regexp);

      if (matches) {
        return callback.apply(this, [result, data].concat(matches.slice(1)));
      }
    }
  }
});
