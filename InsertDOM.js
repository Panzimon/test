/**
 * Created by XYSM on 2017/1/22.
 */

//innerHTML会直接替换掉原来的所有子节点

//加新节点
//1. appendChild
//如果加入的节点是本来已经存在于当前文档树，那么就会先删除原先的节点，
// 再插入

//**.innerHTML = '<span>child</span>';


//又或者是动态创建一个新的节点
/*
var
list = document.getElementById('list'),
    haskell = document.createElement('p');
haskell.id = 'haskell';
haskell.innerText = 'Haskell';
list.appendChild(haskell);
*/

/*
 动态创建了一个<style>节点，然后把它添加到<head>节点的末尾，
 这样就动态地给文档添加了新的CSS定义：

 var d = document.createElement('style');
 d.setAttribute('type', 'text/css');
 d.innerHTML = 'p { color: red }';
 document.getElementsByTagName('head')[0].appendChild(d);
 */
