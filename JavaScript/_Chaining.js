/**
 * Created by XYSM on 2017/1/25.
 */
var _ = require('underscore');

console.log(_
    .filter(_
    .map([1, 4, 9, 16, 25],
        Math.sqrt), x => x % 2 === 1)
);

console.log(
    _.chain([1, 4, 9, 16, 25])
    .map(Math.sqrt)
    .filter(x => x % 2 === 0)
    .value()
);