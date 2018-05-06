#!/usr/bin/env node
const compositeKey = require('./polyfill.js');
const assert = require('assert');
const a = {};
const b = [];
const c = () => {};
assert.strictEqual(compositeKey(a), compositeKey(a));
assert.strictEqual(compositeKey(b), compositeKey(b));
assert.strictEqual(compositeKey(a, b), compositeKey(a, b));
assert.strictEqual(compositeKey(b, a), compositeKey(b, a));
assert.notStrictEqual(compositeKey(a, b), compositeKey(b, a));
assert.throws(() => compositeKey(null));
assert.throws(() => compositeKey(1));
assert.throws(() => compositeKey(true));
assert.throws(() => compositeKey(""));
assert.throws(() => compositeKey(Symbol()));
assert.throws(() => compositeKey(undefined));
for (const _ of [null, 1, true, "", Symbol()]) {
  assert.throws(() => compositeKey(null, _));
  assert.throws(() => compositeKey(Symbol(), _));
  assert.throws(() => compositeKey(_, 1));
  assert.throws(() => compositeKey(_, undefined));
  assert.throws(() => compositeKey(_, true, _));
  assert.throws(() => compositeKey(_, "", _));
}
assert.strictEqual(compositeKey(a, 0), compositeKey(a, 0));
assert.notStrictEqual(compositeKey(a, 0), compositeKey(a, 1));
assert.notStrictEqual(compositeKey(a, 0), compositeKey(0, a));
assert.notStrictEqual(compositeKey(a, 0), compositeKey(1, a));
