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

/*
liao's example

 'use strict';

 // 清除log:
 var logging = document.getElementById('test-promise-log');
 while (logging.children.length > 1) {
 logging.removeChild(logging.children[logging.children.length - 1]);
 }

 // 输出log到页面:
 function log(s) {
 var p = document.createElement('p');
 p.innerHTML = s;
 logging.appendChild(p);
 }

 new Promise(function (resolve, reject) {
 log('start new Promise...');
 var timeOut = Math.random() * 2;
 log('set timeout to: ' + timeOut + ' seconds.');
 setTimeout(function () {
 if (timeOut < 1) {
 log('call resolve()...');
 resolve('200 OK');
 }
 else {
 log('call reject()...');
 reject('timeout in ' + timeOut + ' seconds.');
 }
 }, timeOut * 1000);
 }).then(function (r) {
 log('Done: ' + r);
 }).catch(function (reason) {
 log('Failed: ' + reason);
 });

p.s.有bug，不断点run的话会不断加内容
 */


/*
 要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码。有了Promise，我们只需要简单地写：

 job1.then(job2).then(job3).catch(handleError);
 其中，job1、job2和job3都是Promise对象。

 下面的例子演示了如何串行执行一系列需要异步计算获得结果的任务：

 'use strict';

 var logging = document.getElementById('test-promise2-log');
 while (logging.children.length > 1) {
 logging.removeChild(logging.children[logging.children.length - 1]);
 }

 function log(s) {
 var p = document.createElement('p');
 p.innerHTML = s;
 logging.appendChild(p);
 }

 // 0.5秒后返回input*input的计算结果:
 function multiply(input) {
 return new Promise(function (resolve, reject) {
 log('calculating ' + input + ' x ' + input + '...');
 setTimeout(resolve, 500, input * input);
 });
 }

 // 0.5秒后返回input+input的计算结果:
 function add(input) {
 return new Promise(function (resolve, reject) {
 log('calculating ' + input + ' + ' + input + '...');
 setTimeout(resolve, 500, input + input);
 });
 }

 var p = new Promise(function (resolve, reject) {
 log('start new Promise...');
 resolve(2);
 });

 p.then(multiply)
 .then(add)
 .then(multiply)
 .then(add)
 .then(function (result) {
 log('Got value: ' + result);
 });

 Run
 Log:

 start new Promise...

 calculating 2 x 2...

 calculating 4 + 4...

 calculating 8 x 8...

 calculating 64 + 64...

 Got value: 128
 */

//Promise简化ajax
function ajax(method,url,data) {
   'use strict'
    let request = new XMLHttpRequest() || new ActiveXObject('Microsoft HTTP');
   return new Promise(function (resolve,reject) {
      request.onreadystatechange = function () {
          if(request.status === 4 ){
              if(request.status === 200){
                  resolve(request.responseText);
              }else{
                  reject(request.status);
              }
          }
      };
       request.open(method,url);
       request.send(data);
   });
}
/*
 var log = document.getElementById('test-promise-ajax-result');
 var p = ajax('GET', '/api/categories');
 p.then(function (text) { // 如果AJAX成功，获得响应内容
 log.innerText = text;
 }).catch(function (status) { // 如果AJAX失败，获得响应代码
 log.innerText = 'ERROR: ' + status;
 });
 */

var p1 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 500, 'P1');
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(resolve, 600, 'P2');
});
// 同时执行p1和p2，这两个任务是可以并行执行的,
// 并在它们都完成后执行then:
Promise.all([p1, p2]).then(function (results) {
    console.log(results); // 获得一个Array: ['P1', 'P2']
});

/*
 有些时候，多个异步任务是为了容错。
 比如，同时向两个URL读取用户的个人信息，
 只需要获得先返回的结果即可。这种情况下，用Promise.race()实现
 */
Promise.race([p1, p2]).then(function (result) {
    console.log(result); // 'P1'
});//由于p1执行较快，Promise的then()将获得结果'P1'。
// p2仍在继续执行，但执行结果将被丢弃

