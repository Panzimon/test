/**
 * Created by XYSM on 2017/1/22.
 */

//removeChild
/*
 // 拿到待删除节点:
 var self = document.getElementById('to-be-removed');
 // 拿到父节点:
 var parent = self.parentElement;
 // 删除:
 var removed = parent.removeChild(self);
 removed === self; // true

 p.s.
 注意到删除后的节点虽然不在文档树中了，
 但其实它还在内存中，可以随时再次被添加到别的位置
 */

/*
!!!
 要注意，children属性是一个只读属性，并且它在子节点变化时会实时更新。

 例如，对于如下HTML结构：

 <div id="parent">
 <p>First</p>
 <p>Second</p>
 </div>
 当我们用如下代码删除子节点时：

 var parent = document.getElementById('parent');
 parent.removeChild(parent.children[0]);
 parent.removeChild(parent.children[1]); // <-- 浏览器报错
 浏览器报错：parent.children[1]不是一个有效的节点。
 原因就在于，当<p>First</p>节点被删除后，
 parent.children的节点数量已经从2变为了1，索引[1]已经不存在了。

 因此，删除多个节点时，要注意children属性时刻都在变化。
 */

/*
 <!-- HTML结构 -->
 <ul id="test-list">
 <li>JavaScript</li>
 <li>Swift</li>
 <li>HTML</li>
 <li>ANSI C</li>
 <li>CSS</li>
 <li>DirectX</li>
 </ul>
 把与Web开发技术不相关的节点删掉：

 'use strict';

 // TODO My Answer
 var parent = document.getElementById('test-list');
 parent.removeChild(parent.children[5]);
 parent.removeChild(parent.children[3]);
 parent.removeChild(parent.children[1]);
 // 测试:
 ;(function () {
 var
 arr, i,
 t = document.getElementById('test-list');
 if (t && t.children && t.children.length === 3) {
 arr = [];
 for (i = 0; i < t.children.length; i ++) {
 arr.push(t.children[i].innerText);
 }
 if (arr.toString() === ['JavaScript', 'HTML', 'CSS'].toString()) {
 alert('测试通过!');
 }
 else {
 alert('测试失败: ' + arr.toString());
 }
 }
 else {
 alert('测试失败!');
 }
 })();

 //TODO other's answer
 var self = document.getElementById('test-list');
 for(var item of self.children){
 !/html|css|javascript/i.test(item.innerText) ?
 self.removeChild(item) : null

 // TODO 0.0 666
 var tl = document.getElementById('test-list'),
 tl_el = Array.from(tl.children).map(x=>x.outerHTML),
 arr = ['JavaScript', 'HTML', 'CSS'];

 var webSet = new Set(arr.map(x=>`<li>${x}</li>`));
 tl.innerHTML = tl_el.filter(x => webSet.has(x));

 }

 // TODO 我的chrome运行这个竟然报错
 var falseTec = ['Swift','ANSI C','DirectX'];

 var tecs = document.getElementById('test-list');

 for (var tec of tecs.children) {
 for (var str of falseTec) {
 if (str === tec.innerText) {
 tecs.removeChild(tec);
 alert('hehe');
 }
 }
 }
 */