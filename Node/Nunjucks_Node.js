/**
 * Created by ZY on 2017/1/29.
 */
/*
 模板引擎就是基于模板配合数据构造出字符串输出的一个组件。
 比如下面的函数就是一个模板引擎：
 */
 function examResult (data) {
 console.log(`${data.name}同学一年级期末考试语文${data.chinese}分，
 数学${data.math}分，位于年级第${data.ranking}名。`) ;
 }
examResult({
    name: '小明',
    chinese: 78,
    math: 87,
    ranking: 999
});
 /*
  既然JavaScript的模板字符串可以实现模板功能，
  那为什么我们还需要另外的模板引擎？

  因为JavaScript的模板字符串必须写在JavaScript代码中，
  要想写出新浪首页这样复杂的页面，是非常困难的。

  输出HTML有几个特别重要的问题需要考虑：
  */

/*
 转义

 对特殊字符要转义，避免受到XSS攻击。
 比如，如果变量name的值不是小明，而是小明<script>...</script>，
 模板引擎输出的HTML到了浏览器，
 就会自动执行恶意JavaScript代码。
  */

/*
 格式化

 对不同类型的变量要格式化，比如，
 货币需要变成12,345.00这样的格式，
 日期需要变成2016-01-01这样的格式
 */

/*
 简单逻辑

 模板还需要能执行一些简单逻辑，
 比如，要按条件输出内容，
 需要if实现如下输出：

 {{ name }}同学，
 {% if score >= 90 %}
 成绩优秀，应该奖励
 {% elif score >=60 %}
 成绩良好，继续努力
 {% else %}
 不及格，建议回家打屁股
 {% endif %}
 */

/*
 Nunjucks是Mozilla开发的一个纯JavaScript编写的模板引擎，
 既可以用在Node环境下，又可以运行在浏览器端。
 但是，主要还是运行在Node环境下，
 因为浏览器端有更好的模板解决方案，例如MVVM框架
 */

/*
 如果你使用过Python的模板引擎jinja2，
 那么使用Nunjucks就非常简单，两者的语法几乎是一模一样的，
 因为Nunjucks就是用JavaScript重新实现了jinjia2
 */

/*
 虽然模板引擎内部可能非常复杂，但是使用一个模板引擎是非常简单的，因为本质上我们只需要构造这样一个函数：

 function render(view, model) {
 // TODO:...
 }
 其中，view是模板的名称（又称为视图），
 因为可能存在多个模板，需要选择其中一个。
 model就是数据，在JavaScript中，
 它就是一个简单的Object。render函数返回一个字符串，就是模板的输出
 */

/*
 可以使用Nunjucks提供的功能强大的tag，
 编写条件判断、循环等功能，例如：

 <!-- 循环输出名字 -->
 <body>
 <h3>Fruits List</h3>
 {% for f in fruits %}
 <p>{{ f }}</p>
 {% endfor %}
 </body>
 Nunjucks模板引擎最强大的功能在于模板的继承。
 仔细观察各种网站可以发现，
 网站的结构实际上是类似的，
 头部、尾部都是固定格式，
 只有中间页面部分内容不同。
 如果每个模板都重复头尾，一旦要修改头部或尾部，
 那就需要改动所有模板。

 更好的方式是使用继承
 */

/*
 base.html定义了三个可编辑的块，
 分别命名为header、body和footer。
 子模板可以有选择地对块进行重新定义：

 {% extends 'base.html' %}

 {% block header %}<h1>{{ header }}</h1>{% endblock %}

 {% block body %}<p>{{ body }}</p>{% endblock %}
 */

/*
 Nunjucks的性能。

 对于模板渲染本身来说，速度是非常非常快的，
 因为就是拼字符串嘛，纯CPU操作。

 性能问题主要出现在从文件读取模板内容这一步。
 这是一个IO操作，在Node.js环境中，我们知道，
 单线程的JavaScript最不能忍受的就是同步IO，
 但Nunjucks默认就使用同步IO读取模板文件。

 好消息是Nunjucks会缓存已读取的文件内容，
 也就是说，模板文件最多读取一次，
 就会放在内存中，后面的请求是不会再次读取文件的，
 只要我们指定了noCache: false这个参数
 */

/*
 在开发环境下，可以关闭cache，
 这样每次重新加载模板，便于实时修改模板。
 在生产环境下，一定要打开cache，这样就不会有性能问题。

 Nunjucks也提供了异步读取的方式，
 但是这样写起来很麻烦，有简单的写法我们就不会考虑复杂的写法。
 保持代码简单是可维护性的关键
 */