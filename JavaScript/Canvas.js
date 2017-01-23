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
/*
attention
 通过创建一个不可见的Canvas来绘图，
 然后将最终绘制结果复制到页面的可见Canvas中；

 尽量使用整数坐标而不是浮点数；

 可以创建多个重叠的Canvas绘制不同的层，
 而不是在一个Canvas中绘制非常复杂的图；

 背景图片如果不变可以直接用<img>标签并放到最底层。
 */
/*
//TODO 大神1
 var
 canvas = document.getElementById('stock-canvas'),
 width = canvas.width,
 height = canvas.height,
 ctx = canvas.getContext('2d');
 console.log(JSON.stringify(data[0])); // {"date":"20150602","open":4844.7,"close":4910.53,"high":4911.57,"low":4797.55,"vol":62374809900,"change":1.69}
 ctx.clearRect(0, 0, width, height);
 ctx.fillText('Test Canvas', 10, 10);

 var
 OFFSET = 3700,
 pHeight = 0.5,
 lWidth = 1,
 pWidth = 8,
 x = 5;

 var drawLine = function(high, low, open, close){
 //判断涨跌
 ctx.strokeStyle = close >= open ? "red" : "green";

 ctx.beginPath();
 ctx.lineWidth = lWidth;
 ctx.moveTo(x, (OFFSET - low) * pHeight);
 ctx.lineTo(x, (OFFSET - high) * pHeight);
 ctx.stroke();

 ctx.beginPath();
 ctx.lineWidth = pWidth;
 ctx.moveTo(x, (OFFSET - open) * pHeight);
 ctx.lineTo(x, (OFFSET - close) * pHeight);
 ctx.stroke();

 //位置移动至下一天
 x += 10;
 }

 for (var t of data) {
 drawLine(t.high, t.low, t.open, t.close);
 }

 */
/*
//TODO 大神2
 var
 canvas = document.getElementById('stock-canvas'),
 width = canvas.width,
 height = canvas.height,
 ctx = canvas.getContext('2d');
 console.log(JSON.stringify(data[0])); // {"date":"20150602","open":4844.7,"close":4910.53,"high":4911.57,"low":4797.55,"vol":62374809900,"change":1.69}
 ctx.clearRect(0, 0, width, height);
 //ctx.fillText('Test Canvas', 10, 10);
 var wcell=width/30,low=data[0].low,high=data[0].high,ratio,i;
 for(i=0;i<30;i++){
 low=Math.min(low,data[i].low);
 high=Math.max(high,data[i].high);
 }
 ratio=(high-low)/height;
 for(i=0;i<30;i++){
 if(data[i].close>data[i].open){
 ctx.fillStyle='#FF0000';
 ctx.fillRect(i*wcell+wcell*(1/2-1/16),(high-data[i].high)/ratio,wcell/8,(data[i].high-data[i].close)/ratio);
 ctx.fillRect(i*wcell,(high-data[i].close)/ratio,wcell,(data[i].close-data[i].open)/ratio);
 ctx.fillRect(i*wcell+wcell*(1/2-1/16),(high-data[i].open)/ratio,wcell/8,(data[i].open-data[i].low)/ratio);
 }
 else{
 ctx.fillStyle='#00BB00';
 ctx.fillRect(i*wcell+wcell*(1/2-1/16),(high-data[i].high)/ratio,wcell/8,(data[i].high-data[i].open)/ratio);
 ctx.fillRect(i*wcell,(high-data[i].open)/ratio,wcell,(data[i].open-data[i].close)/ratio);
 ctx.fillRect(i*wcell+wcell*(1/2-1/16),(high-data[i].close)/ratio,wcell/8,(data[i].close-data[i].low)/ratio);
 }
 }
 */