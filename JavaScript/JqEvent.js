/**
 * Created by XYSM on 2017/1/24.
 */
/*
 var a = $('#test-link');
 a.on('click', function () {
 alert('Hello!');
 });
 */
/*
 另一种更简化的写法是直接调用click()方法：

 a.click(function () {
 alert('Hello!');
 });
 两者完全等价。我们通常用后面的写法。
 */

/*
 鼠标事件

 click: 鼠标单击时触发；
 dblclick：鼠标双击时触发；
 mouseenter：鼠标进入时触发；
 mouseleave：鼠标移出时触发；
 mousemove：鼠标在DOM内部移动时触发；
 hover：鼠标进入和退出时触发两个函数，
 相当于mouseenter加上mouseleave。

 键盘事件

 键盘事件仅作用在当前焦点的DOM上，通常是<input>和<textarea>。

 keydown：键盘按下时触发；
 keyup：键盘松开时触发；
 keypress：按一次键后触发。

 其他事件

 focus：当DOM获得焦点时触发；
 blur：当DOM失去焦点时触发；
 change：当<input>、<select>或<textarea>的内容改变时触发；
 submit：当<form>提交时触发；
 ready：当页面被载入并且DOM树完成初始化后触发。

 其中，ready仅作用于document对象。
 由于ready事件在DOM完成初始化后触发，
 且只触发一次，所以非常适合用来写其他的初始化代码。
 假设我们想给一个<form>表单绑定submit事件，
 下面的代码没有预期的效果：

 <html>
 <head>
 <script>
 // 代码有误:
 $('#testForm).on('submit', function () {
 alert('submit!');
 });
 </script>
 </head>
 <body>
 <form id="testForm">
 ...
 </form>
 </body>
 因为JavaScript在此执行的时候，<form>尚未载入浏览器，
 所以$('#testForm)返回[]，并没有绑定事件到任何DOM上。

 所以我们自己的初始化代码必须放到document对象的ready事件中，
 保证DOM已完成初始化：

 <html>
 <head>
 <script>
 $(document).on('ready', function () {
 $('#testForm).on('submit', function () {
 alert('submit!');
 });
 });
 </script>
 </head>
 <body>
 <form id="testForm">
 ...
 </form>
 </body>
 这样写就没有问题了。因为相关代码会在DOM树初始化后再执行。

 由于ready事件使用非常普遍，所以可以这样简化：

 $(document).ready(function () {
 // on('submit', function)也可以简化:
 $('#testForm).submit(function () {
 alert('submit!');
 });
 });
 甚至还可以再简化为：

 $(function () {
 // init...
 });
 */
/*
 上面的这种写法最为常见。如果你遇到$(function () {...})的形式，
 牢记这是document对象的ready事件处理函数。
 */

/*
 完全可以反复绑定事件处理函数，它们会依次执行：

 $(function () {
 console.log('init A...');
 });
 $(function () {
 console.log('init B...');
 });
 $(function () {
 console.log('init C...');
 });
 */
/*
 有些事件，如mousemove和keypress，
 我们需要获取鼠标位置和按键的值，否则监听这些事件就没什么意义了。
 所有事件都会传入Event对象作为参数，
 可以从Event对象上获取到更多的信息：

 $(function () {
 $('#testMouseMoveDiv').mousemove(function (e) {
 $('#testMouseMoveSpan')
 .text('pageX = ' + e.pageX + ', pageY = ' + e.pageY);
 });
 });
 */

/*
 一个已被绑定的事件可以解除绑定，通过off('click', function)实现：

 function hello() {
 alert('hello!');
 }

 a.click(hello); // 绑定事件

 // 10秒钟后解除绑定:
 setTimeout(function () {
 a.off('click', hello);
 }, 10000);
 需要特别注意的是，下面这种写法是无效的：

 // 绑定事件:
 a.click(function () {
 alert('hello!');
 });

 // 解除绑定:
 a.off('click', function () {
 alert('hello!');
 });
 这是因为两个匿名函数虽然长得一模一样，
 但是它们是两个不同的函数对象，
 off('click', function () {...})
 无法移除已绑定的第一个匿名函数。

 为了实现移除效果，
 可以使用off('click')一次性移除已绑定的click事件的所有处理函数。

 同理，
 无参数调用off()一次性移除已绑定的所有类型的事件处理函数。
 */

/*
 当用户在文本框中输入时，就会触发change事件。
 但是，如果用JavaScript代码去改动文本框的值，
 将不会触发change事件：

 var input = $('#test-input');
 input.val('change it!'); // 无法触发change事件
 */

/*
 有些时候，我们希望用代码触发change事件，
 可以直接调用无参数的change()方法来触发该事件：
 input.change(); // 触发change事件
 */

/*
 input.change()相当于input.trigger('change')，
 它是trigger()方法的简写。
 */

/*
!!!
 浏览器安全限制

 在浏览器中，有些JavaScript代码只有在用户触发下才能执行，
 例如，window.open()函数：

 // 无法弹出新窗口，将被浏览器屏蔽:
 $(function () {
 window.open('/');
 });
 这些“敏感代码”只能由用户操作来触发：

 var button1 = $('#testPopupButton1');
 var button2 = $('#testPopupButton2');

 function popupTestWindow() {
 window.open('/');
 }

 button1.click(function () {
 popupTestWindow();
 });

 button2.click(function () {
 // 不立刻执行popupTestWindow()，100毫秒后执行:
 setTimeout(popupTestWindow, 100);
 });
 当用户点击button1时，click事件被触发，
 由于popupTestWindow()在click事件处理函数内执行，
 这是浏览器允许的，
 而button2的click事件并未立刻执行popupTestWindow()，
 延迟执行的popupTestWindow()将被浏览器拦截。
 */

/*
* 练习

 对如下的Form表单：

 <!-- HTML结构 -->
 <form id="test-form" action="test">
 <legend>请选择想要学习的编程语言：</legend>
 <fieldset>
 <p><label class="selectAll"><input type="checkbox"> <span class="selectAll">全选</span><span class="deselectAll">全不选</span></label> <a href="#0" class="invertSelect">反选</a></p>
 <p><label><input type="checkbox" name="lang" value="javascript"> JavaScript</label></p>
 <p><label><input type="checkbox" name="lang" value="python"> Python</label></p>
 <p><label><input type="checkbox" name="lang" value="ruby"> Ruby</label></p>
 <p><label><input type="checkbox" name="lang" value="haskell"> Haskell</label></p>
 <p><label><input type="checkbox" name="lang" value="scheme"> Scheme</label></p>
 <p><button type="submit">Submit</button></p>
 </fieldset>
 </form>
 绑定合适的事件处理函数，实现以下逻辑：

 当用户勾上“全选”时，自动选中所有语言，并把“全选”变成“全不选”；

 当用户去掉“全不选”时，自动不选中所有语言；

 当用户点击“反选”时，自动把所有语言状态反转（选中的变为未选，未选的变为选中）；

 当用户把所有语言都手动勾上时，“全选”被自动勾上，并变为“全不选”；

 当用户手动去掉选中至少一种语言时，“全不选”自动被去掉选中，并变为“全选”。
 */
var
    form = $('#test-form'),
    langs = form.find('[name=lang]'),
    selectAll = form.find('label.selectAll :checkbox'),
    selectAllLabel = form.find('label.selectAll span.selectAll'),
    deselectAllLabel = form.find('label.selectAll span.deselectAll'),
    invertSelect = form.find('a.invertSelect');

// 重置初始化状态:
form.find('*').show().off();
form.find(':checkbox').prop('checked', false).off();
deselectAllLabel.hide();
// 拦截form提交事件:
form.off().submit(function (e) {
    e.preventDefault();
    alert(form.serialize());
});
selectAll.click(function () {
    if (selectAll.prop('checked')==true){
        form.find(':checkbox').prop('checked',true);
        deselectAllLabel.show();
        selectAllLabel.hide();
    }else{
        form.find(':checkbox').prop('checked',false);
        deselectAllLabel.hide();
        selectAllLabel.show();
    }

});
invertSelect.click(function () {
     langs.each(function () {
            if($(this).prop('checked')==true){
                $(this).prop('checked',false);
            }else{
                $(this).prop('checked',true);
            }
        })
     selectAll.prop('checked',false);
     langs.change();
});
langs.change(function(){
    if (langs.filter(':checked').length ===langs.length){
        //langs.size()===$('input[name=lang]:checked').size()
        selectAll.prop('checked',true);
        deselectAllLabel.show();
        selectAllLabel.hide();
    }else{
        selectAll.prop('checked',false);
        deselectAllLabel.hide();
        selectAllLabel.show();
    }
});
/*
* //todo 大神答案1：
* function updateLabel() {
 let allChecked = langs.filter(':checked')
 .length === langs.length

 selectAll.prop('checked', allChecked)
 if (allChecked) {
 selectAllLabel.hide()
 deselectAllLabel.show()
 } else {
 selectAllLabel.show()
 deselectAllLabel.hide()
 }
 }

 selectAll.change(function(e) {
 langs.prop('checked', $(this).is(':checked'))
 updateLabel()
 })

 invertSelect.click(function(e) {
 langs.click()
 })

 langs.change(() => updateLabel())

 //todo 大神答案2：
 // TODO:绑定事件
 deselectAllLabel.hide();
 selectAll.on('click',function(e){
 selectAllLabel.toggle();
 deselectAllLabel.toggle();
 langs.prop('checked',$(this).prop('checked'));
 });
 langs.on('change',function(){
 if(langs.size()===$('input[name=lang]:checked').size()){
 selectAll.prop('checked',true);
 selectAllLabel.hide();
 deselectAllLabel.show();
 }else{
 selectAll.prop('checked',false);
 selectAllLabel.show();
 deselectAllLabel.hide();
 }
 });
 invertSelect.on('click',function(){
 langs.each(function(){
 $(this).prop('checked',!$(this).prop('checked'))
 langs.change();
 });
 });

 //todo 大大大大神答案3：
 function selectAllAction(all, changeAllBox, changeAll){
 if (changeAllBox) { selectAll.prop('checked',all)}
 if (changeAll) {langs.prop('checked',all)}
 if (all) {selectAllLabel.hide(); deselectAllLabel.show();}
 else { selectAllLabel.show(); deselectAllLabel.hide();}
 };

 langs.change(function(){
 selectAllAction(langs.filter(':checked').length === langs.length, true, false);
 });

 selectAll.change(function(){
 selectAllAction(selectAll.is(':checked'), false, true);
 });

 invertSelect.click(function(){
 langs.click();
 });

 //todo 大大神答案4：
 function updateLabel() {
 let allChecked = langs.filter(':checked').length === langs.length

 selectAll.prop('checked', allChecked)
 if (allChecked) {
 selectAllLabel.hide()
 deselectAllLabel.show()
 } else {
 selectAllLabel.show()
 deselectAllLabel.hide()
 }
 }

 selectAll.change(() => {
 langs.prop('checked', selectAll.is(':checked'))
 updateLabel()
 })

 invertSelect.click(function (e) {
 langs.click()
 })

 langs.change(() => updateLabel())
* */