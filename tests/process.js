(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["mu-create/tests/process"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\.{2}/, "mu-create")];
    }, {
        "qunit": root.QUnit
      }));
  }
})([
  "qunit",
  "../process"
], this, function (QUnit, process) {

  QUnit.module("mu-create/process#rules");

  QUnit.test("executed in context", function (assert) {
    var o = {};

    assert.expect(1);

    process.call(o, function () {
      assert.deepEqual(this, o);
    })();
  });

  QUnit.test("called in order", function (assert) {
    var count = 0;

    assert.expect(3);

    process(
      function () {
        assert.deepEqual(++count, 1);
      },
      function (r) {
        assert.deepEqual(++count, 2);
      },
      function (r) {
        assert.deepEqual(++count, 3);
      }
    )();
  });

  QUnit.test("arguments passed with return", function (assert) {
    assert.expect(8);

    process(
      function (a, b, c) {
        assert.deepEqual(arguments.length, 3);
        assert.deepEqual(a, 1);
        assert.deepEqual(b, 2);
        assert.deepEqual(c, 3);
        return -1;
      },
      function (a, b, c) {
        assert.deepEqual(arguments.length, 3);
        assert.deepEqual(a, -1);
        assert.deepEqual(b, 2);
        assert.deepEqual(c, 3);
      }
    )(1, 2, 3);
  });

  QUnit.test("passing result with defaults", function (assert) {
    var o = {};

    assert.expect(3);

    process(
      function (r) {
        assert.deepEqual(r, o);
        return r;
      },
      function (r) {
        assert.deepEqual(r, o);
      },
      function (r) {
        assert.deepEqual(r, o);
      }
    )(o);
  });

  QUnit.test("can break by returning false", function (assert) {
    assert.expect(1);

    process(
      function () {
        assert.ok(true);
        return false;
      },
      function () {
        throw new Error("blocked rule executed");
      }
    )();
  });

  QUnit.module("mu-create/process#return");

  QUnit.test("original for noop", function (assert) {
    var o = {};

    assert.expect(2);
    assert.deepEqual(process()(o), o);
    assert.deepEqual(process(function () { })(o), o);
  });

  QUnit.test("result from last rule returning !(undefined|false)", function (assert) {
    assert.expect(2);
    assert.deepEqual(process(
      function () {
        assert.ok(true);
      },
      function () {
        return 0;
      },
      function () {
        return false;
      },
      function () {
        return "result"
      }
    )(), 0);
  });
});