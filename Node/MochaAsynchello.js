/**
 * Created by ZY on 2017/2/3.
 */
const fs = require('mz/fs');

module.exports = async ()=>{
    "use strict";
    let expression = await fs.readFile('./data.txt','utf-8'),
        fn = new Function('return ' + expression),
        r = fn();
    console.log(`Calculate: ${expression} = ${r}`);
    return r ;
};