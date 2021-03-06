/**
 * Created by XYSM on 2017/1/22.
 */

/* 获取<p id="p-id">...</p>
var p = document.getElementById('p-id');
// 设置文本为abc:
p.innerHTML = 'ABC'; // <p id="p-id">ABC</p>
// 设置HTML:
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ';*/

//用innerHTML时要注意，是否需要写入HTML。
// 如果写入的字符串是通过网络拿到了，要注意对字符编码来避免XSS攻击

/*
 改innerText或textContent属性，
 这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签：

 // 获取<p id="p-id">...</p>
 var p = document.getElementById('p-id');
 // 设置文本:
 p.innerText = '<script>alert("Hi")</script>';
 // HTML被自动编码，无法设置一个<script>节点:
 // <p id="p-id">&lt;script&gt;alert("Hi")&lt;/script&gt;</p>
 */

//两者的区别在于读取属性时，innerText不返回隐藏元素的文本，
// 而textContent返回所有文本。另外注意IE<9不支持textContent

/*
 修改CSS也是经常需要的操作。DOM节点的style属性对应所有的CSS，可以直接获取或设置。因为CSS允许font-size这样的名称，但它并非JavaScript有效的属性名，所以需要在JavaScript中改写为驼峰式命名fontSize：

 // 获取<p id="p-id">...</p>
 var p = document.getElementById('p-id');
 // 设置CSS:
 p.style.color = '#ff0000';
 p.style.fontSize = '20px';
 p.style.paddingTop = '2em';


 // 获取<p>javascript</p>节点:
 var js = document.getElementById('test-js');

 // 修改文本为JavaScript:
 // TODO:
 js.innerText = 'JavaScript';

 js.innerHTML = '<span style="display:none;">aa</span>bbcc';

 alert(js.innerText);        //bbcc
 alert(js.textContent);        //aabbcc
 */
/*
p.s. css属性记得加引号！！！
 */
