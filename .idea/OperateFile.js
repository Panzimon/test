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
 */