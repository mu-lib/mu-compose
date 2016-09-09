(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/tests/compose"] = factory.apply(root, modules.map(function(m) {
      return {
        "qunit": root.QUnit
      }[m = m.replace(/^\.{2}/, "mu-compose")] || root[m];
    }));
  }
})([
    "qunit",
    "../compose",
    "../constructor",
    "../prototype",
    "../regexp"
], this, function(QUnit, compose, construct, proto, regexp) {

    QUnit.module("mu-compose/compose");

    QUnit.test("prototype", function (assert) {
        assert.expect(1);

        var C = compose(proto)({
            "a": 1,
            "b": 2
        });

        assert.propEqual(C.prototype, {
            "a": 1,
            "b": 2
        });
    });

    QUnit.test("regexp", function(assert) {
        assert.expect(2);

        function handler() {
        }

        var C = compose(regexp(/^on:(.+)/, function (r, data, type) {
            assert.deepEqual(type, "test");
            assert.deepEqual(data.value, handler);
        }))({
            "on:test": handler
        });
        var c = new C();
    });

    QUnit.module("mu-compose/compose.constructors");

    QUnit.test("executed in order", function (assert) {
        var count = 0;

        assert.expect(3);

        var C = compose(construct)(
            function () {
                assert.deepEqual(++count, 1);
            },
            function () {
                assert.deepEqual(++count, 2);
            },
            function () {
                assert.deepEqual(++count, 3);
            }
        );

        var c = new C();
    });

    QUnit.test("return undefined", function(assert) {
        assert.expect(4);

        var C = compose(construct)(
            function(a) {
                assert.deepEqual(arguments.length, 1);
                assert.deepEqual(a, 1);
            },
            function(a) {
                assert.deepEqual(arguments.length, 1);
                assert.deepEqual(a, 1);
            }
        );
        var c = new C(1);
    });

    QUnit.test("return boolean|number|string|object", function (assert) {
        assert.expect(4);

        var o = {};

        var C = compose(construct)(
            function() {
                return false;
            },
            function(r) {
                assert.deepEqual(r, false);
                return 0;
            },
            function(r) {
                assert.deepEqual(r, 0);
                return "";
            },
            function(r) {
                assert.deepEqual(r, "");
                return o;
            },
            function(r) {
                assert.deepEqual(r, o);
            }
        );
        var c = new C();
    });

    QUnit.test("return array-like", function(assert) {
        assert.expect(10);

        var C = compose(construct)(
            function (a,b,c) {
                assert.deepEqual(arguments.length, 3);
                assert.deepEqual(a, 1);
                assert.deepEqual(b, 2);
                assert.deepEqual(c, 3);
                return [b,a]
            },
            function (b,a) {
                assert.deepEqual(arguments.length, 2);
                assert.deepEqual(a, 1);
                assert.deepEqual(b, 2);
                return arguments;
            },
            function (b,a) {
                assert.deepEqual(arguments.length, 2);
                assert.deepEqual(a, 1);
                assert.deepEqual(b, 2);
            }
        );
        var x = new C(1,2,3);
    });
});