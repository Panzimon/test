/**
 * Created by XYSM on 2017/1/24.
 */

/*
 var div = $('#test-show-hide');
 div.hide(3000); // 在3秒钟内逐渐消失
 时间以毫秒为单位，但也可以是'slow'，'fast'这些字符串：

 var div = $('#test-show-hide');
 div.show('slow'); // 在0.6秒钟内逐渐显示
 toggle()方法则根据当前状态决定是show()还是hide()。
 */

/*
 你可能已经看出来了，show()和hide()是从左上角逐渐展开或收缩的，
 而slideUp()和slideDown()则是在垂直方向逐渐展开或收缩的。

 slideUp()把一个可见的DOM元素收起来，
 效果跟拉上窗帘似的，slideDown()相反，
 而slideToggle()则根据元素是否可见来决定下一步动作
 */

/*
 fadeIn()和fadeOut()的动画效果是淡入淡出，
 也就是通过不断设置DOM元素的opacity属性来实现，
 而fadeToggle()则根据元素是否可见来决定下一步动作
 */

/*
 var div = $('#test-animate');
 div.animate({
 opacity: 0.25,
 width: '256px',
 height: '256px'
 }, 3000); // 在3秒钟内CSS过渡到设定值


 animate()还可以再传入一个函数，当动画结束时，该函数将被调用：

 var div = $('#test-animate');
 div.animate({
 opacity: 0.25,
 width: '256px',
 height: '256px'
 }, 3000, function () {
 console.log('动画已结束');
 // 恢复至初始状态:
 $(this).css('opacity', '1.0')
 .css('width', '128px').css('height', '128px');
 });
 实际上这个回调函数参数对于基本动画也是适用的。
 */

/*TODO 串行动画

 jQuery的动画效果还可以串行执行，
 通过delay()方法还可以实现暂停，
 这样，我们可以实现更复杂的动画效果，
 而代码却相当简单：

 var div = $('#test-animates');
 // 动画效果：slideDown - 暂停 - 放大 - 暂停 - 缩小
 div.slideDown(2000)
 .delay(1000)
 .animate({
 width: '256px',
 height: '256px'
 }, 2000)
 .delay(1000)
 .animate({
 width: '128px',
 height: '128px'
 }, 2000);
 }
 </script>
 因为动画需要执行一段时间，
 所以jQuery必须不断返回新的Promise对象才能后续执行操作。
 简单地把动画封装在函数中是不够的。
 */

/*
 你可能会遇到，有的动画如slideUp()根本没有效果。
 这是因为jQuery动画的原理是逐渐改变CSS的值，
 如height从100px逐渐变为0。
 但是很多不是block性质的DOM元素，
 对它们设置height根本就不起作用，所以动画也就没有效果。

 此外，
 jQuery也没有实现对background-color的动画效果，
 用animate()设置background-color也没有效果。
 这种情况下可以使用CSS3的transition实现动画效果。
 */

/*todo 请在表格删除一行的时候添加一个淡出的动画效果：
 'use strict';

 function deleteFirstTR() {
 var tr = $('#test-table>tbody>tr:visible').first();

 tr.fadeOut(2000,tr.remove);

 }

 deleteFirstTR();
 */