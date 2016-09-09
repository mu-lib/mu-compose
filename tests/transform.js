(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-compose/tests/transform"] = factory.apply(root, modules.map(function(m) {
      return {
        "qunit": root.QUnit
      }[m = m.replace(/^\.{2}/, "mu-compose")] || root[m];
    }));
  }
})([
    "qunit",
    "../transform"
], this, function(QUnit, transform) {

    QUnit.module("mu-compose/transform#basic");

    QUnit.test("noop", function (assert) {
        var o = {
            "key": "test",
            "value": 123,
            "extra": true
        };

        assert.expect(1);
        
        assert.deepEqual(transform(o), o);
    });

    QUnit.test("string|number|boolean|object|array|arguments", function (assert) {
        assert.expect(6);

        assert.deepEqual(transform(""), {
            "key": "[object String]",
            "value": ""
        }, "input typeof [object String]");

        assert.deepEqual(transform(0), {
            "key": "[object Number]",
            "value": 0
        }, "input typeof [object Number]");

        assert.deepEqual(transform(false), {
            "key": "[object Boolean]",
            "value": false
        }, "input typeof [object Boolean]");

        assert.deepEqual(transform({}), {
            "key": "[object Object]",
            "value": {}
        }, "input typeof [object Object]");

        assert.deepEqual(transform([1, 2, 3]), {
            "key": "[object Array]",
            "value": [1, 2, 3]
        }, "input typeof [object Array]");

        (function() {
            assert.deepEqual(transform(arguments), {
                "key": "[object Array]",
                "value": [1, 2, 3]
            }, "input typeof [object Arguments]");
        })(1, 2, 3);
    });


    QUnit.module("mu-compose/transform#complex");

    QUnit.test("transposed", function (assert) {
        assert.expect(1);

        assert.deepEqual(transform({
            "a": 1,
            "b": 2
        }), [ {
            "key": "a",
            "value": 1
        }, {
            "key": "b",
            "value": 2
        } ], "compact object");
    });
});