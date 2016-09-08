var tap = require("tap");
var process = require("../process");

tap.test("rules executed in context", function (t) {
    var o = {};

    process.call(o, function () {
        t.strictSame(this, o);
    });

    t.end();
});

tap.test("rules", function (t) {
    t.test("called in order", function (t) {
        var count = 0;

        t.plan(3);

        process(
            function () {
                t.strictSame(++count, 1);
            },
            function (r) {
                t.strictSame(++count, 2);
            },
            function (r) {
                t.strictSame(++count, 3);
            }
        )();

        t.end();
    });

    t.test("arguments passed with return", function(t) {
        t.plan(8);

        process(
            function(a, b, c) {
                t.strictSame(arguments.length, 3);
                t.strictSame(a, 1);
                t.strictSame(b, 2);
                t.strictSame(c, 3);
                return -1;
            },
            function(a, b, c) {
                t.strictSame(arguments.length, 3);
                t.strictSame(a, -1);
                t.strictSame(b, 2);
                t.strictSame(c, 3);
            }
        )(1,2,3);

        t.end();
    });

    t.test("passing result with defaults", function (t) {
        var o = {};

        t.plan(3);

        process(
            function (r) {
                t.strictSame(r, o);
                return r;
            },
            function (r) {
                t.strictSame(r, o);
            },
            function (r) {
                t.strictSame(r, o);
            }
        )(o);

        t.end();
    });

    t.test("can break by returning false", function (t) {
        t.plan(1);

        process(
            function() {
                t.pass();
                return false;
            },
            function() {
                t.fail("blocked rule executed");
            }
        )();

        t.end();
    });

    t.end();
});


tap.test("returns", function (t) {
    t.test("original for noop", function (t) {
        var o = {};

        t.strictSame(process()(o), o);

        t.strictSame(process(function () {})(o), o);

        t.end();
    });

    t.test("result from last rule returning !(undefined|false)", function (t) {
        t.strictSame(process(
            function() {
                t.pass();
            },
            function() {
                return 0;
            },
            function() {
                return false;
            },
            function() {
                return "result"
            }
        )(), 0);

        t.end();
    });

    t.end();
});