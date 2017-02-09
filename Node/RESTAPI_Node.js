/**
 * Created by ZY on 2017/2/9.
 */

/*
 编写REST API，实际上就是编写处理HTTP请求的async函数，
 不过，REST请求和普通的HTTP请求有几个特殊的地方：

 REST请求仍然是标准的HTTP请求，
 但是，除了GET请求外，
 POST、PUT等请求的body是JSON数据格式，
 请求的Content-Type为application/json；
 REST响应返回的结果是JSON数据格式，
 因此，响应的Content-Type也是application/json。
 */

//REST规范定义了资源的通用访问格式

/*
 当我们只需要获取部分数据时，可通过参数限制返回的结果集，
 例如，返回第2页评论，每页10项，按时间排序：

 GET /api/products/123/reviews?page=2&size=10&sort=time
 */

/*
 POST请求无法在浏览器中直接测试。但是我们可以通过curl命令在命令提示符窗口测试这个API。
 我们输入如下命令：

 curl -H 'Content-Type: application/json' -X POST -d '{
 "name":"XBox","price":3999}' http://localhost:3000/api/products
 */

/*
 其实，使用REST和使用MVC是类似的，
 不同的是，提供REST的Controller处理函数最后不调用render()去渲染模板，
 而是把结果直接用JSON序列化返回给客户端。
 */

/*
 回忆我们集成Nunjucks模板引擎的方法：
 通过一个middleware给ctx添加一个render()方法，Controller就可以直接使用ctx.render('view', model)来渲染模板，
 不必编写重复的代码。

 类似的，我们也可以通过一个middleware给ctx添加一个rest()方法，
 直接输出JSON数据。

 由于我们给所有REST API一个固定的URL前缀/api/，
 所以，这个middleware还需要根据path来判断当前请求是否是一个REST请求，
 如果是，我们才给ctx绑定rest()方法。
 */

/*
 在涉及到REST API的错误时，我们必须先意识到，
 客户端会遇到两种类型的REST API错误。

 一类是类似403，404，500等错误，
 这些错误实际上是HTTP请求可能发生的错误。
 REST请求只是一种请求类型和响应类型均为JSON的HTTP请求，
 因此，这些错误在REST请求中也会发生。

 针对这种类型的错误，
 客户端除了提示用户“出现了网络错误，稍后重试”以外，
 并无法获得具体的错误信息。
 */
/*
 另一类错误是业务逻辑的错误，
 例如，输入了不合法的Email地址，
 试图删除一个不存在的Product，等等。
 这种类型的错误完全可以通过JSON返回给客户端，
 这样，客户端可以根据错误信息提示用户“Email不合法”等，
 以便用户修复后重新请求API
 */

/*
 第一类的错误实际上客户端可以识别，
 并且我们也无法操控HTTP服务器的错误码。

 第二类的错误信息是一个JSON字符串，例如：

 {
 "code": "10000",
 "message": "Bad email address"
 }
 */

/*
 有的Web应用对正确的REST响应使用200，
 对错误的REST响应使用400，
 这样，客户端即是静态语言，也可以根据HTTP响应码判断是否出错，
 出错时直接把结果反序列化为APIError对象。

 两种方式各有优劣。
 我们选择第二种，200表示成功响应，400表示失败响应。

 但是，要注意，绝不能混合其他HTTP错误码。
 例如，使用401响应“登录失败”，使用403响应“权限不够”。
 这会使客户端无法有效识别HTTP错误码和业务错误，
 其原因在于HTTP协议定义的错误码十分偏向底层，
 而REST API属于“高层”协议，不应该复用底层的错误码。
 */

/*
 我们强烈建议使用字符串作为错误码。
 原因在于，使用数字作为错误码时，
 API提供者需要维护一份错误码代码说明表，
 并且，该文档必须时刻与API发布同步，

 否则，客户端开发者遇到一个文档上没有写明的错误码，
 就完全不知道发生了什么错误
 */

/*
 错误代码命名规范为大类:子类，
 例如，口令不匹配的登录错误代码为auth:bad_password，
 用户名不存在的登录错误代码为auth:user_not_found。
 这样，客户端既可以简单匹配某个类别的错误，
 也可以精确匹配某个特定的错误。
 */

/*
如何返回错误

 如果一个REST异步函数想要返回错误，
 一个直观的想法是调用ctx.rest()：

 user = processLogin(username, password);
 if (user != null) {
 ctx.rest(user);
 } else {
 ctx.response.status = 400;
 ctx.rest({
 code: 'auth:user_not_found',
 message: 'user not found'
 });
 }
 这种方式不好，因为控制流程会混乱，
 而且，错误只能在Controller函数中输出。

 更好的方式是异步函数直接用throw语句抛出错误，
 让middleware去处理错误：

 user = processLogin(username, password);
 if (user != null) {
 ctx.rest(user);
 } else {
 throw new APIError('auth:user_not_found', 'user not found');
 }
 这种方式可以在异步函数的任何地方抛出错误，包括调用的子函数内部。

 我们只需要稍稍改写一个middleware就可以处理错误：

 module.exports = {
 APIError: function (code, message) {
 this.code = code || 'internal:unknown_error';
 this.message = message || '';
 },
 restify: (pathPrefix) => {
 pathPrefix = pathPrefix || '/api/';
 return async (ctx, next) => {
 if (ctx.request.path.startsWith(pathPrefix)) {
 // 绑定rest()方法:
 ctx.rest = (data) => {
 ctx.response.type = 'application/json';
 ctx.response.body = data;
 }
 try {
 await next();
 } catch (e) {
 // 返回错误:
 ctx.response.status = 400;
 ctx.response.type = 'application/json';
 ctx.response.body = {
 code: e.code || 'internal:unknown_error',
 message: e.message || ''
 };
 }
 } else {
 await next();
 }
 };
 }
 };
 */

/*
 这个错误处理的好处在于，
 不但简化了Controller的错误处理（只需要throw，其他不管），
 并且，在遇到非APIError的错误时，
 自动转换错误码为internal:unknown_error。

 受益于async/await语法，
 我们在middleware中可以直接用try...catch捕获异常。
 如果是callback模式，就无法用try...catch捕获，代码结构将混乱得多。

 最后，顺便把APIError这个对象export出去。
 */

/*
 我们在这个工程中约定了如下规范：

 REST API的返回值全部是object对象，
 而不是简单的number、boolean、null或者数组；
 REST API必须使用前缀/api/。
 第一条规则实际上是为了方便客户端处理结果。如果返回结果不是object，
 则客户端反序列化后还需要判断类型。
 */
/*
 Service

 为了操作Product，
 我们用products.js封装所有操作，可以把它视为一个Service：
 变量products相当于在内存中模拟了数据库，这里是为了简化逻辑
 */

/*
 编写API时，需要注意：

 如果客户端传递了JSON格式的数据（例如，POST请求），
 则async函数可以通过ctx.request.body直接访问已经反序列化的JavaScript对象。这是由bodyParser()这个middleware完成的。如果ctx.request.body为undefined，说明缺少middleware，或者middleware没有正确配置。

 如果API路径带有参数，参数必须用:
 表示，例如，DELETE /api/products/:id，
 客户端传递的URL可能就是/api/products/A001，
 参数id对应的值就是A001，要获得这个参数，我们用ctx.params.id。

 类似的，如果API路径有多个参数，
 例如，/api/products/:pid/reviews/:rid，
 则这两个参数分别用ctx.params.pid和ctx.params.rid获取。

 这个功能由koa-router这个middleware提供。

 请注意：API路径的参数永远是字符串！
 */
/*
 有了API以后，我们就可以编写MVC，在页面上调用API完成操作。

 先在controllers目录下创建index.js，编写页面入口函数：

 然后，我们在views目录下创建index.html，
 编写JavaScript代码读取Products：

 当products变化时，Vue会自动更新表格的内容。

 类似的，可以添加创建和删除Product的功能，
 并且刷新变量products的内容，
 就可以实时更新Product列表。
 */