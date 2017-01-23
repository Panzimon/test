/**
 * Created by XYSM on 2017/1/23.
 */
/*
 jQuery对象和DOM对象之间可以互相转化：

 var div = $('#abc'); // jQuery对象
 var divDom = div.get(0); // 假设存在div，获取第1个DOM元素
 var another = $(divDom); // 重新把DOM包装为jQuery对象
 通常情况下你不需要获取DOM对象，
 直接使用jQuery对象更加方便。
 如果你拿到了一个DOM对象，
 那可以简单地调用$(aDomObject)把它变成jQuery对象，
 这样就可以方便地使用jQuery的API了
 */

/*
 通常很多节点有多个class，我们可以查找同时包含red和green的节点：

 var a = $('.red.green'); // 注意没有空格！
 // 符合条件的节点：
 // <div class="red green">...</div>
 // <div class="blue green red">...</div>
 */

/*
 eq返回的是一个jquery对象 get返回的是一个html 对象数组
 返回的是jQuery对象，就可以继续调用其他方法，返回的是html数组就不能调用jQuery的其他方法
 例如：
 $("ul li").get(1).css("color", "red"); //这个是错误的
 $("ul li").eq(1).css("color", "red"); //这个是正确的
 */