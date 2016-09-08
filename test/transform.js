var tap = require("tap");
var transform = require("../transform");

tap.test("string|number|boolean", function (t) {
    t.match(transform(""), {
        "key": "[object String]",
        "value": ""
    });

    t.match(transform(0), {
        "key": "[object Number]",
        "value": 0
    });

    t.match(transform(false), {
        "key": "[object Boolean]",
        "value": false
    });

    t.end();
});

tap.test("objects", function (t) {
    t.test("object|array|arguments", function (t) {
        t.match(transform({}), {
            "key": "[object Object]",
            "value": {}
        });

        t.match(transform([1, 2, 3]), {
            "key": "[object Array]",
            "value": [1, 2, 3]
        });

        (function() {
            t.match(transform(arguments), {
                "key": "[object Array]",
                "value": [1, 2, 3]
            });
        })(1, 2, 3);

        t.end();
    });

    t.test("transposed", function (t) {
        t.match(transform({
            "a": 1,
            "b": 2
        }), [ {
            "key": "a",
            "value": 1
        }, {
            "key": "b",
            "value": 2
        } ]);

        t.end();
    });

    t.test("noop", function (t) {
        var o = {
            "key": "test",
            "value": 123,
            "extra": true
        };

        t.strictSame(transform(o), o);

        t.end();
    });

    t.end();
});