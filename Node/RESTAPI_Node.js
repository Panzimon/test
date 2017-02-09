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


