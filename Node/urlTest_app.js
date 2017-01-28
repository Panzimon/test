/**
 * Created by ZY on 2017/1/29.
 */

var files = fs.readdirSync(__dirname + '/controllers');

var js_Files = files.filter((f)=>{
    "use strict";
    return f.endsWith('.js');
});

