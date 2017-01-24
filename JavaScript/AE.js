/**
 * Created by XYSM on 2017/1/25.
 */
/*
 编写JavaScript代码时，
 我们要时刻牢记
 ，JavaScript引擎是一个事件驱动的执行引擎，
 代码总是以单线程执行，
 而回调函数的执行需要等到下一个满足条件的事件出现后，才会被执行。
 */
/*

 */
//如果printTime()函数内部发生了错误，
// 我们试图用try包裹setTimeout()是无效的：



function printTime() {
    throw new Error();
}

try {
    setTimeout(printTime, 1000);
    console.log('done');
} catch (e) {
    console.log('error');
}

/*
 原因就在于调用setTimeout()函数时，
 传入的printTime函数并未立刻执行！
 紧接着，JavaScript引擎会继续执行console.log('done');
 语句，而此时并没有错误发生。
 直到1秒钟后，执行printTime函数时才发生错误，
 但此时除了在printTime函数内部捕获错误外，外层代码并无法捕获。

 所以，涉及到异步代码，无法在调用时捕获，
 原因就是在捕获的当时，回调函数并未执行。

 类似的，当我们处理一个事件时，
 在绑定事件的代码处，无法捕获事件处理函数的错误。
 */
var $btn = $('#calc');

// 取消已绑定的事件:
$btn.off('click');

try {
    $btn.click(function () {
        var
            x = parseFloat($('#x').val()),
            y = parseFloat($('#y').val()),
            r;
        if (isNaN(x) || isNaN(y)) {
            throw new Error('输入有误');
        }
        r = x + y;
        alert('计算结果：' + r);
    });
} catch (e) {
    alert('输入有误！');
}


/*
 但是，用户输入错误时，处理函数并未捕获到错误。请修复错误处理代码。
 */