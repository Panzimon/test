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
