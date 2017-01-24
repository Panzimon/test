/**
 * Created by XYSM on 2017/1/24.
 */
/*
 调用append()传入HTML片段：

 ul.append('<li><span>Haskell</span></li>');
 除了接受字符串，append()还可以传入原始的DOM对象，jQuery对象和函数对象：

 // 创建DOM对象:
 var ps = document.createElement('li');
 ps.innerHTML = '<span>Pascal</span>';
 // 添加DOM对象:
 ul.append(ps);

 // 添加jQuery对象:
 ul.append($('#scheme'));

 // 添加函数对象:
 ul.append(function (index, html) {
 return '<li><span>Language - ' + index + '</span></li>';
 });
 */

/*
 传入函数时，要求返回一个字符串、
 DOM对象或者jQuery对象。
 因为jQuery的append()可能作用于一组DOM节点，
 只有传入函数才能针对每个DOM生成不同的子节点。

 append()把DOM添加到最后，
 prepend()则把DOM添加到最前
 */

/*
 如果要添加的DOM节点已经存在于HTML文档中，
 它会首先从文档移除，然后再添加，也就是说，
 用append()，你可以移动一个DOM节点
 */
/*
 如果要把新节点插入到指定位置，
 例如，JavaScript和Python之间，
 那么，可以先定位到JavaScript，然后用after()方法：

 var js = $('#test-div>ul>li:first-child');
 js.after('<li><span>Lua</span></li>');
 */

/*
 var li = $('#test-div>ul>li');
 li.remove(); // 所有<li>全被删除
 */

/*
 练习

 除了列出的3种语言外，请再添加Pascal、Lua和Ruby，然后按字母顺序排序节点：

 <!-- HTML结构 -->
 <div id="test-div">
 <ul>
 <li><span>JavaScript</span></li>
 <li><span>Python</span></li>
 <li><span>Swift</span></li>
 </ul>
 </div>
 'use strict';



 // 测试:
 ;(function () {
 var s = $('#test-div>ul>li').map(function () {
 return $(this).text();
 }).get().join(',');
 if (s === 'JavaScript,Lua,Pascal,Python,Ruby,Swift') {
 alert('测试通过!');
 } else {
 alert('测试失败: ' + s);
 }
 })();
 */

/*
//todo
 function add(L){
 return '<li><span>'+ L + '</span></li>'
 }
 $('div#test-div>ul').append(['Pascal ','Lua ','Ruby ']
 .map(add));
 var arr = $('div#test-div>ul>li').map(function(){
 return this.innerHTML;
 }).get().sort();
 $('div#test-div>ul>li').remove();
 $('div#test-div>ul').append(arr.map(add));
 */

/*
//todo
 var arr = ['Pascal','Lua','Ruby'];
 var map = new Map();
 $('div#test-div li>span').each(function(){
 arr.push($(this).text());
 map.set($(this).text(),$(this));
 });
 arr.sort();
 for( var x of arr){
 $('div#test-div>ul')
 .append(map.has(x)?map.get(x)
 .parent():'<li><span>'+x+'</span></li>');
 }
 */

/*
p.s.
 如果没有为get()函数指定参数index，
 则返回包含所有匹配到的元素的数组；
 如果指定了索引参数index，则只获取对应索引的那个元素。

 如果参数index为负数，
 则将其视作index + jQueryObject.length。

 如果参数index超出有效的取值范围，
 则返回undefined。

 返回值

 get()方法的返回值为Element/Array类型，
 返回包含所有匹配到的DOM元素数组或指定索引的DOM元素。

 如果当前jQuery对象为空(没有匹配任何的元素)，
 则返回一个空的数组(不包含任何元素)。
 */