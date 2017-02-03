/**
 * Created by ZY on 2017/2/3.
 */
const assert = require('assert');
const sum = require('./Mochahello');

assert.strictEqual(sum(),0);
assert.strictEqual(sum(1),1);
assert.strictEqual(sum(1, 2), 3);
assert.strictEqual(sum(1, 2, 3), 6);
assert.strictEqual(sum(1, 2, 3, 4, 5), 15);
