/**
 * Created by XYSM on 2017/1/23.
 */
//由于浏览器对HTML5标准支持不一致，所以，通常在<canvas>内部添加一些说明性HTML代码，如果浏览器支持Canvas，它将忽略<canvas>内部的HTML，如果浏览器不支持Canvas，它将显示<canvas>内部的HTML：
/*
<canvas id="test-stock" width="300" height="200">
    <p>Current Price: 25.51</p>
</canvas>
*/
/*
 getContext('2d')方法让我们拿到一个CanvasRenderingContext2D对象，所有的绘图操作都需要通过这个对象完成。

 var ctx = canvas.getContext('2d');
 如果需要绘制3D怎么办？HTML5还有一个WebGL规范，允许在Canvas中绘制3D图形：

 gl = canvas.getContext("webgl");
 */

/*
 Canvas的坐标以左上角为原点，水平向右为X轴，
 垂直向下为Y轴，以像素为单位，所以每个点都是非负整数。


 */
/*
圆形
 'use strict';

 var
 canvas = document.getElementById('test-shape-canvas'),
 ctx = canvas.getContext('2d');

 ctx.clearRect(0, 0, 200, 200); // 擦除(0,0)位置大小为200x200的矩形，擦除的意思是把该区域变为透明
 ctx.fillStyle = '#dddddd'; // 设置颜色
 ctx.fillRect(10, 10, 130, 130); // 把(10,10)位置大小为130x130的矩形涂色
 // 利用Path绘制复杂路径:
 var path=new Path2D();
 path.arc(75, 75, 50, 0, Math.PI*2, true);
 path.moveTo(110,75);
 path.arc(75, 75, 35, 0, Math.PI, false);
 path.moveTo(65, 65);
 path.arc(60, 65, 5, 0, Math.PI*2, true);
 path.moveTo(95, 65);
 path.arc(90, 65, 5, 0, Math.PI*2, true);
 ctx.strokeStyle = '#0000ff';
 ctx.stroke(path);

 */
/*
 输出文本，可以设置文本的字体、样式、阴影等，与CSS完全一致：

 'use strict';

 var
 canvas = document.getElementById('test-text-canvas'),
 ctx = canvas.getContext('2d');

 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.shadowOffsetX = 1;
 ctx.shadowOffsetY = 1;
 ctx.shadowBlur = 3;
 ctx.shadowColor = '#666666';
 ctx.font = '26px Arial';
 ctx.fillStyle = '#333333';
 ctx.fillText('带阴影的文字', 50,50);
 */