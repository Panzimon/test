/**
 * Created by XYSM on 2017/1/22.
 */
//最常用的方法是document.getElementById()
// 和document.getElementsByTagName()，
// 以及CSS选择器document.getElementsByClassName()。

/*
 document.getElementById()可以直接定位唯一的一个DOM节点。
 document.getElementsByTagName()和
 document.getElementsByClassName()总是返回一组DOM节点。
 要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围
 */
/*
 / 返回ID为'test'的节点：
 var test = document.getElementById('test');

 // 先定位ID为'test-table'的节点，再返回其内部所有tr节点：
 var trs = document.getElementById('test-table').getElementsByTagName('tr');

 // 先定位ID为'test-div'的节点，再返回其内部所有class包含red的节点：
 var reds = document.getElementById('test-div').getElementsByClassName('red');

 // 获取节点test下的所有直属子节点:
 var cs = test.children;

 // 获取节点test下第一个、最后一个子节点：
 var first = test.firstElementChild;
 var last = test.lastElementChild;
 */

/*
 querySelector()和querySelectorAll()，
 需要了解selector语法，然后使用条件来获取节点，更加方便：

 // 通过querySelector获取ID为q1的节点：
 var q1 = document.querySelector('#q1');

 // 通过querySelectorAll获取q1节点内的符合条件的所有节点：
 var ps = q1.querySelectorAll('div.highlighted > p');
 注意：低版本的IE<8不支持querySelector和querySelectorAll。
 IE8仅有限支持。
 */

/*
Attention:
 严格地讲，我们这里的DOM节点是指Element，
 但是DOM节点实际上是Node，在HTML中，
 Node包括Element、Comment、CDATA_SECTION等很多种，
 以及根节点Document类型，但是，绝大多数时候我们只关心Element，
 也就是实际控制页面结构的Node，其他类型的Node忽略即可。
 根节点Document已经自动绑定为全局变量document
 */

/*
 <div id="test-div">
 <div class="c-red">
 <p id="test-p">JavaScript</p>
 <p>Java</p>
 </div>
 <div class="c-red c-green">
 <p>Python</p>
 <p>Ruby</p>
 <p>Swift</p>
 </div>
 <div class="c-green">
 <p>Scheme</p>
 <p>Haskell</p>
 </div>
 </div>
 请选择出指定条件的节点：

 'use strict';

 // 选择<p>JavaScript</p>:
 var js = document.getElementById('test-p');

 // 选择<p>Python</p>,<p>Ruby</p>,<p>Swift</p>:
 var arr = document.getElementsByClassName('c-red c-green')[0].children;

 // 选择<p>Haskell</p>:
 var haskell = document.getElementsByClassName('c-green')[1].lastElementChild;

注意加上.children
 */