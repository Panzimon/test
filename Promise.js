/**
 * Created by XYSM on 2017/1/23.
 */
//终于不用全部打备注了~
function callback() {
    console.log('Done');
}
console.log('before setTimeout()');
setTimeout(callback,10);//即使是0也是最后执行
console.log('after setTimeset()');//其实还是before

/*
request.onreadystatechange = function () {
    if(request.readyState === 4){
        if(request.status === 200){
            return success(request.responseText);
        }
        else {
            return fail(request.status);
        }
    }
}
*/

function test(resolve,reject){
    'use strict'
    let timeOut = Math.random() * 2 ;
    console.log('set timeout to: '+timeOut.toFixed(3)+' seconds.');
    setTimeout(function () {
        if(timeOut < 1 ){
            console.log('call resolve()...')
            resolve('200 OK');
        }
        else{
            console.log('call reject()...');
            reject('timeout in '+timeOut +' seconds. ');
        }
    },timeOut * 1000);
}
/*
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：'+ result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：'+reason);
});
*/
new Promise(test).then(function(result){
    console.log('success in: '+result);
}).catch(function(reason){
    console.log('fail in: '+reason);
});