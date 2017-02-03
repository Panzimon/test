/**
 * Created by ZY on 2017/2/3.
 */
module.exports = function (...rest){
    var sum = 0;
    for(let n of rest){
        sum += n;
    }
    return sum;
};

