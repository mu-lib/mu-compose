(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/tests/create"] = factory.apply(root, modules.map(function(m) {
      return {
        "qunit": root.QUnit
      }[m = m.replace(/^\.{2}/, "mu-create")] || root[m];
    }));
  }
})([
    "qunit",
    "../create",
    "../constructor",
    "../prototype",
    "../regexp"
], this, function(QUnit, create, construct, proto, regexp) {
    var toString = Object.prototype.toString;

    function transform() {
        return {
            "key": toString.call(this),
            "value": this
        };
    }

    QUnit.module("mu-create/create#rules");

    QUnit.test("noop", function (assert) {
        assert.expect(1);

        var C = create();

        assert.deepEqual(C.concat(), []);
    });

    QUnit.test("defaults", function (assert) {
        assert.expect(1);

        var F = function () {};
        var C = create(F, F);

        assert.deepEqual(C.concat(), [F, F]);
    });

    QUnit.test("flat", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create(A,B);

        assert.deepEqual(C.concat(A,B,B), [A,B,A,B,B]);
    });

    QUnit.test("deep", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create(A,B);

        assert.deepEqual(C.concat([A,B],B), [A,B,A,B,B]);
    });

    QUnit.test("extend", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create(A);

        assert.deepEqual(C.extend(B).concat(), [A, B]);
    });

    QUnit.module("mu-create/create#blueprints");

    QUnit.test("noop", function (assert) {
        assert.expect(1);

        var C = create()();

        assert.deepEqual(C.concat(), []);
    });

    QUnit.test("defaults", function (assert) {
        assert.expect(1);

        var F = function () {};
        var C = create()(F, F);
        var f = transform.call(F);

        assert.deepEqual(C.concat(), [f, f]);
    });

    QUnit.test("flat", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create()(A,B);
        var a = transform.call(A);
        var b = transform.call(B);

        assert.deepEqual(C.concat(a,b,b), [a,b,a,b,b]);
    });

    QUnit.test("deep", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create()(A,B);
        var a = transform.call(A);
        var b = transform.call(B);

        assert.deepEqual(C.concat([a,b],b), [a,b,a,b,b]);
    });

    QUnit.test("extend", function (assert) {
        assert.expect(1);

        var A = function () {};
        var B = function () {};
        var C = create()(A);
        var a = transform.call(A);
        var b = transform.call(B);

        assert.deepEqual(C.extend(b).concat(), [a, b]);
    });

    QUnit.module("mu-create/create#property");

    QUnit.test("prototype", function (assert) {
        assert.expect(1);

        var C = create(proto)({
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

        var C = create(regexp(/^on:(.+)/, function (r, data, type) {
            assert.deepEqual(type, "test");
            assert.deepEqual(data.value, handler);
        }))({
            "on:test": handler
        });
        var c = new C();
    });

    QUnit.module("mu-create/create#constructor");

    QUnit.test("executed in order", function (assert) {
        var count = 0;

        assert.expect(3);

        var C = create(construct)(
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

        var C = create(construct)(
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

        var C = create(construct)(
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

        var C = create(construct)(
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