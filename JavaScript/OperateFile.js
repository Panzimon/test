/**
 * Created by XYSM on 2017/1/23.
 */

/*
!!!
 注意：当一个表单包含<input type="file">时，
 表单的enctype必须指定为multipart/form-data，method必须指定为post，
 浏览器才能正确编码并以multipart/form-data格式发送表单的数据

 用JavaScript对<input type="file">的value赋值是没有任何效果的

 当用户选择了上传某个文件后，JavaScript也无法获得该文件的真实路径

 通常，上传的文件都由后台服务器处理，
 JavaScript可以在提交表单时对文件扩展名做检查，
 以便防止用户上传无效格式的文件：

 var f = document.getElementById('test-file-upload');
 var filename = f.value; // 'C:\fakepath\test.png'
 if (!filename || !(filename.endsWith('.jpg')
 || filename.endsWith('.png')
  || filename.endsWith('.gif'))) {
 alert('Can only upload image file.');
 return false;
 }

 由于JavaScript对用户上传的文件操作非常有限，
 尤其是无法读取文件内容，使得很多需要操作文件的网页不得不用Flash这样的第三方插件来实现。

 随着HTML5的普及，新增的File API允许JavaScript读取文件内容，
 获得更多的文件信息。

 HTML5的File API提供了File和FileReader两个主要对象，
 可以获得文件信息并读取文件

 var
 fileInput = document.getElementById('test-image-file'),
 info = document.getElementById('test-file-info'),
 preview = document.getElementById('test-image-preview');
 // 监听change事件:
 fileInput.addEventListener('change', function () {
 // 清除背景图片:
 preview.style.backgroundImage = '';
 // 检查文件是否选择:
 if (!fileInput.value) {
 info.innerHTML = '没有选择文件';
 return;
 }
 // 获取File引用:
 var file = fileInput.files[0];
 // 获取File信息:
 info.innerHTML = '文件: ' + file.name + '<br>' +
 '大小: ' + file.size + '<br>' +
 '修改: ' + file.lastModifiedDate;
 if (file.type !== 'image/jpeg' && file.type !== 'image/png'
 && file.type !== 'image/gif') {
 alert('不是有效的图片文件!');
 return;
 }
 // 读取文件:
 var reader = new FileReader();
 reader.onload = function(e) {
 var
 data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
 preview.style.backgroundImage = 'url(' + data + ')';
 };
 // 以DataURL的形式读取文件:
 reader.readAsDataURL(file);
 });

 以DataURL的形式读取到的文件是一个字符串，
 类似于data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...，
 常用于设置图像。如果需要服务器端处理，把字符串base64,
 后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容
 */

/*
 单线程模式执行的JavaScript，如何处理多任务？

 在JavaScript中，执行多任务实际上都是异步调用，比如上面的代码：

 reader.readAsDataURL(file);
 就会发起一个异步操作来读取文件内容。因为是异步操作，所以我们在JavaScript代码中就不知道什么时候操作结束，因此需要先设置一个回调函数：

 reader.onload = function(e) {
 // 当文件读取完成后，自动调用此函数:
 };
 当文件读取完成后，
 JavaScript引擎将自动调用我们设置的回调函数。执行回调函数时，
 文件已经读取完毕，所以我们可以在回调函数内部安全地获得文件内容。

 当文件读取完成后，JavaScript引擎将自动调用我们设置的回调函数。执行回调函数时，文件已经读取完毕，
 所以我们可以在回调函数内部安全地获得文件内容

 //大神回复
 ！！！
 层主想表达的是onload事件的参数e(vent)是否从onchange事件外部传递进来，如果是，那么在示例中并onchange函数并没有传进来任何参数，那么参数e是怎么来的。

 其实，onchange, onload等事件是通过回调的方式执行的，首先是HTML DOM Event 对象分发事件句柄(event handlers)给可能需要执行的函数，当某个事件被触发(fire)时，句柄执行对应元素的onload等事件定义函数。

 但是如果需要获得event对象所存储的状态（例如获取调用onload事件的元素）,那么可以通过event.target（例子中的e.target）来获得，这个event就是回调参数，实际上引用的是DOM Event对象，处在dom树的顶层。

 而依照程序执行状况来看，这个回调参数Event是在addListener函数中处理传入，所以onchange事件被触发时也已经一并传入了Event对象实例，change事件中的function () {}参数列表为空是表示没有用户自定义参数！

 如果上述观点有错误，欢迎大家指正！
 */