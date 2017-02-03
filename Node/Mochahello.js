/**
 * Created by ZY on 2017/2/3.
 */
modeule.exports = function (...rest){
    "use strict";
    var sum = 0;
    for(let n of rest){
        sum += n;
    }
    return sum;
};

