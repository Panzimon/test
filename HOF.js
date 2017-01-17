/**
 * Created by ZY on 2017/1/18.
 */
function add(x, y, f) {
    return f(x) + f(y);
}

var m = add(-5, 6, Math.abs);

console.log(m);