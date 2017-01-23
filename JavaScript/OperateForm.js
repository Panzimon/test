/**
 * Created by XYSM on 2017/1/22.
 */

/*
 HTML表单的输入控件主要有以下几种：

 文本框，对应的<input type="text">，用于输入文本；

 口令框，对应的<input type="password">，用于输入口令；

 单选框，对应的<input type="radio">，用于选择一项；

 复选框，对应的<input type="checkbox">，用于选择多项；

 下拉框，对应的<select>，用于选择一项；

 隐藏文本，对应的<input type="hidden">，
 用户不可见，但表单提交时会把隐藏文本发送到服务器。
 */
/*
 input.value; // '用户输入的值'
 这种方式可以应用于text、password、hidden以及select。
 但是，对于单选框和复选框，value属性返回的永远是HTML预设的值，
 而我们需要获得的实际是用户是否“勾上了”选项，所以应该用checked判断：

 // <label><input type="radio" name="weekday"
 id="monday" value="1"> Monday</label>
 // <label><input type="radio" name="weekday"
 id="tuesday" value="2"> Tuesday</label>
 var mon = document.getElementById('monday');
 var tue = document.getElementById('tuesday');
 mon.value; // '1'
 tue.value; // '2'
 mon.checked; // true或者false
 tue.checked; // true或者false
 */
/*
 设置值和获取值类似，对于text、password、hidden以及select，
 直接设置value就可以
 对于单选框和复选框，设置checked为true或false即可。
 */
/*
 HTML5新增了大量标准控件，常用的包括date、datetime、
 datetime-local、color等，它们都使用<input>标签：

 <input type="date" value="2015-07-01">

 <input type="datetime-local" value="2015-07-01T02:03:04">

 <input type="color" value="#ff0000">


 不支持HTML5的浏览器无法识别新的控件，
 会把它们当做type="text"来显示。
 支持HTML5的浏览器将获得格式化的字符串。
 例如，type="date"类型的input
 的value将保证是一个有效的YYYY-MM-DD格式的日期，或者空字符串
 */
/*
//两种方式处理表单提交
1
 <form>元素的submit()方法提交一个表单，例如，响应一个<button>的click事件，在JavaScript代码中提交表单：

 <!-- HTML -->
 <form id="test-form">
 <input type="text" name="test">
 <button type="button" onclick="doSubmitForm()">Submit</button>
 </form>

 <script>
 function doSubmitForm() {
 var form = document.getElementById('test-form');
 // 可以在此修改form的input...
 // 提交form:
 form.submit();
 }
 </script>
 这种方式的缺点是扰乱了浏览器对form的正常提交。
 浏览器默认点击<button type="submit">时提交表单，
 或者用户在最后一个输入框按回车键

 2
 <form>本身的onsubmit事件，在提交form时作修改：

 <!-- HTML -->
 <form id="test-form" onsubmit="return checkForm()">
 <input type="text" name="test">
 <button type="submit">Submit</button>
 </form>

 <script>
 function checkForm() {
 var form = document.getElementById('test-form');
 // 可以在此修改form的input...
 // 继续下一步:
 return true;
 }
 </script>
 注意要return true来告诉浏览器继续提交，
 如果return false，浏览器将不会继续提交form，
 这种情况通常对应用户输入有误，提示用户错误信息后终止提交form。

 在检查和修改<input>时，要充分利用<input type="hidden">来传递数据。

 很多登录表单希望用户输入用户名和口令，
 但是，安全考虑，提交表单时不传输明文口令，而是口令的MD5

 function checkForm() {
 var pwd = document.getElementById('password');
 // 把用户输入的明文变为MD5:
 pwd.value = toMD5(pwd.value);
 // 继续下一步:
 return true;
 }

 这个做法看上去没啥问题，但用户输入了口令提交时，
 口令框的显示会突然从几个*变成32个*（因为MD5有32个字符）

 不改变用户的输入，可以利用<input type="hidden">实现
 <form id="login-form" method="post" onsubmit="return checkForm()">
 <input type="text" id="username" name="username">
 <input type="password" id="input-password">
 <input type="hidden" id="md5-password" name="password">
 <button type="submit">Submit</button>
 </form>

 <script>
 function checkForm() {
 var input_pwd = document.getElementById('input-password');
 var md5_pwd = document.getElementById('md5-password');
 // 把用户输入的明文变为MD5:
 md5_pwd.value = toMD5(input_pwd.value);
 // 继续下一步:
 return true;
 }
 </script>

 p.s.s.
 注意到id为md5-password的<input>标记了name="password"，
 而用户输入的id为input-password的<input>没有name属性。
 没有name属性的<input>的数据不会被提交。

 'use strict';
 var checkRegisterForm = function () {

 // TODO 1:
 var nameReg = /^[0-9a-zA-Z]{3,10}$/;

 var inputName = document.getElementById('username');

 if (!nameReg.test(inputName.value)) {
 return false;
 }

 var fisrtPwd = document.getElementById('password');

 if (fisrtPwd.value.length < 6 || fisrtPwd.value.length > 20) {
 return false;
 //p.s.之前课设忘记了判断长度不一定用正则。。。
 }

 var secondPwd = document.getElementById('password-2');

 if (fisrtPwd.value === secondPwd.value) {
 return true;
 }

 return false;
 }
 // 测试:
 ;(function () {
 window.testFormHandler = checkRegisterForm;
 var form = document.getElementById('test-register');
 if (form.dispatchEvent) {
 var event = new Event('submit', {
 bubbles: true,
 cancelable: true
 });
 form.dispatchEvent(event);
 } else {
 form.fireEvent('onsubmit');
 }
 })();

 // TODO 2:
 var username = document.getElementById('username');
 var re1= /^\w{3,10}$/;
 //{3,10}，逗号之间不能有空格
 var password = document.getElementById('password');
 var re2 = /^.{6,20}$/;
 var password2 = document.getElementById('password-2');
 if (!re1.test(username.value)||!re2.test(password.value)||password.value!==password2.value){
 alert ('错');
 return false;
 }
 else {alert ('对')}
 }
 */