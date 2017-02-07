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

/*
 把WebSocketServer绑定到同一个端口的关键代码是
 先获取koa创建的http.Server的引用，
 再根据http.Server创建WebSocketServer：
 */

 // koa app的listen()方法返回http.Server:
 let server = app.listen(3000);

 // 创建WebSocketServer:
 let wss = new WebSocketServer({
 server: server
 });

/*
 浏览器创建WebSocket时发送的仍然是标准的HTTP请求。
 无论是WebSocket请求，还是普通HTTP请求，都会被http.Server处理。
 具体的处理方式则是由koa和WebSocketServer注入的回调函数实现的。
 */
/*
 在响应WebSocket请求时，如何识别用户身份？

 一个简单可行的方案是把用户登录后的身份写入Cookie
 */

function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}//ha???注意：出于演示目的，
// 该Cookie并没有作Hash处理，实际上它就是一个JSON字符串。

//在WebSocketServer中，就需要响应connection事件，然后识别用户：

wss.on('connection', function (ws) {
    // ws.upgradeReq是一个request对象:
    let user = parseUser(ws.upgradeReq);
    if (!user) {
        // Cookie不存在或无效，直接关闭WebSocket:
        ws.close(4001, 'Invalid user');
    }
    // 识别成功，把user绑定到该WebSocket对象:
    ws.user = user;
    // 绑定WebSocketServer对象:
    ws.wss = wss;
});
//紧接着，
// 我们要对每个创建成功的WebSocket绑定message、close、error等
// 事件处理函数。对于聊天应用来说，
// 每收到一条消息，就需要把该消息广播到所有WebSocket连接上。
/*
 先为wss对象添加一个broadcase()方法：
 */

 wss.broadcast = function (data) {
 wss.clients.forEach(function (client) {
 client.send(data);
 });
 };
 //在某个WebSocket收到消息后，就可以调用wss.broadcast()进行广播了：

ws.on('message', function (message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
});
//消息有很多类型，不一定是聊天的消息，
// 还可以有获取用户列表、用户加入、用户退出等多种消息。
// 所以我们用createMessage()创建一个JSON格式的字符串，
// 发送给浏览器，
// 浏览器端的JavaScript就可以直接使用：

// 消息ID:
var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

/*
 相比服务器端的代码，页面的JavaScript代码会更复杂。

 聊天室页面可以划分为左侧会话列表和右侧用户列表两部分：

 这里的DOM需要动态更新，因此，状态管理是页面逻辑的核心。

 为了简化状态管理，我们用Vue控制左右两个列表：

 var vmMessageList = new Vue({
 el: '#message-list',
 data: {
 messages: []
 }
 });

 var vmUserList = new Vue({
 el: '#user-list',
 data: {
 users: []
 }
 });
 会话列表和用户列表初始化为空数组。
 */
/*
 紧接着，创建WebSocket连接，响应服务器消息，
 并且更新会话列表和用户列表：

 var ws = new WebSocket('ws://localhost:3000/ws/chat');

 ws.onmessage = function(event) {
 var data = event.data;
 console.log(data);
 var msg = JSON.parse(data);
 if (msg.type === 'list') {
 vmUserList.users = msg.data;
 } else if (msg.type === 'join') {
 addToUserList(vmUserList.users, msg.user);
 addMessage(vmMessageList.messages, msg);
 } else if (msg.type === 'left') {
 removeFromUserList(vmUserList.users, msg.user);
 addMessage(vmMessageList.messages, msg);
 } else if (msg.type === 'chat') {
 addMessage(vmMessageList.messages, msg);
 }
 };
 这样，JavaScript负责更新状态，
 Vue负责根据状态刷新DOM。以用户列表为例，HTML代码如下：

 <div id="user-list">
 <div class="media" v-for="user in users">
 <div class="media-left">
 <img class="media-object" src="/static/user.png">
 </div>
 <div class="media-body">
 <h4 class="media-heading" v-text="user.name"></h4>
 </div>
 </div>
 </div>
 */
//测试的时候，
// 如果在本机测试，需要同时用几个不同的浏览器，这样Cookie互不干扰。

//p.s.配置反向代理(lue...)

//如果不在函数内部使用this的话可以换成arrow function