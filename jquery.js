(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("jquery"));
  } else {
    factory(root.jQuery);
  }
}(this, function($) {
  var re = /,+/;
  var space = " ";

  return $.construct = function($element, ns) {
    var me = this;

    function namespace(type) {
      return type + "." + ns;
    }

    me.$element = $element;
    me.ns = ns;

    $.each(me.constructor.dom || false, function(index, op) {
      var matches = op.matches;

      switch (matches[1]) {
        case "on":
          $element.on($.map(matches[2].split(re), namespace).join(space), me, op.value);
          break;

        case "attr":
          $element.attr(matches[2], op.value);
          break;

        case "prop":
          $element.prop(matches[2], op.value);
          break;
      }
    });
  }
}));
