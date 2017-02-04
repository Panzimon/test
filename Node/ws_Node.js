/**
 * Created by XYSM on 2017/2/4.
 */
/*
 要使用WebSocket，关键在于服务器端支持，
 这样，我们才有可能用支持WebSocket的浏览器使用WebSocket
 */
const app = new Koa();

app.listen(3000);
//：koa通过3000端口响应HTTP，
// 我们要新加的WebSocketServer还能使用3000端口
// 虽然WebSocketServer可以使用别的端口，但是，统一端口有个最大的好处：
// 实际应用中，HTTP和WebSocket都使用标准的80和443端口，
// 不需要暴露新的端口，也不需要修改防火墙规则

/*
 实际上，3000端口并非由koa监听，
 而是koa调用Node标准的http模块创建的http.Server监听的。
 koa只是把响应函数注册到该http.Server中了。
 类似的，WebSocketServer也可以把自己的响应函数注册到http.Server中，
 这样，同一个端口，根据协议，可以分别由koa和ws处理
 */


