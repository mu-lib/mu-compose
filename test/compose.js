var tap = require("tap");
var compose = require("../compose");
var construct = require("../constructor");
var proto = require("../prototype");
var regexp = require("../regexp");

tap.test("noop", function (t) {
    var C = compose()();

    t.type(C, "function");

    t.end();
});

tap.test("constructor", function(t) {
    t.test("executed in order", function (t) {
        var count = 0;

        t.plan(3);

        var C = compose(construct)(
            function () {
                t.strictSame(++count, 1);
            },
            function () {
                t.strictSame(++count, 2);
            },
            function () {
                t.strictSame(++count, 3);
            }
        );

        var c = new C();

        t.end();
    });

    t.test("return", function(t) {
        t.test("undefined", function(t) {
            t.plan(4);

            var C = compose(construct)(
                function(a) {
                    t.strictSame(arguments.length, 1);
                    t.strictSame(a, 1);
                },
                function(a) {
                    t.strictSame(arguments.length, 1);
                    t.strictSame(a, 1);
                }
            );
            var c = new C(1);

            t.end();
        });

        t.test("boolean|number|string|object", function (t) {
            t.plan(4);

            var o = {};

            var C = compose(construct)(
                function() {
                    return false;
                },
                function(r) {
                    t.strictSame(r, false);
                    return 0;
                },
                function(r) {
                    t.strictSame(r, 0);
                    return "";
                },
                function(r) {
                    t.strictSame(r, "");
                    return o;
                },
                function(r) {
                    t.strictSame(r, o);
                }
            );
            var c = new C();
            
            t.end();
        });

        t.test("array-like", function(t) {
            t.plan(10);

            var C = compose(construct)(
                function (a,b,c) {
                    t.strictSame(arguments.length, 3);
                    t.strictSame(a, 1);
                    t.strictSame(b, 2);
                    t.strictSame(c, 3);
                    return [b,a]
                },
                function (b,a) {
                    t.strictSame(arguments.length, 2);
                    t.strictSame(a, 1);
                    t.strictSame(b, 2);
                    return arguments;
                },
                function (b,a) {
                    t.strictSame(arguments.length, 2);
                    t.strictSame(a, 1);
                    t.strictSame(b, 2);
                }
            );
            var x = new C(1,2,3);

            t.end();
        });

        t.end();
    });

    t.end();
});

tap.test("prototype", function (t) {
    var C = compose(proto)({
        "a": 1,
        "b": 2
    });

    t.match(C.prototype, {
        "a": 1,
        "b": 2
    });

    t.end();
});

tap.test("regexp", function(t) {
    t.plan(2);

    function handler() {
    }

    var C = compose(regexp(/^on:(.+)/, function (r, data, type) {
        t.match(type, "test");
        t.match(data.value, handler);
    }))({
        "on:test": handler
    });
    var c = new C();

    t.end();
});