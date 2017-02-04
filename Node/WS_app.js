/**
 * Created by ZY on 2017/2/4.
 */
const WebSocket = require('ws'),
    WebSocketServer = WebSocket.Server,
    wss = new WebSocketServer({
        port: 3000
    });
//wss对象可以响应connection事件来处理这个WebSocket
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) {
                console.log(`[SERVER] error: ${err}`);
            }
        });
    })
});
//可以执行JavaScript代码的浏览器Console，依次输入代码
// 打开一个WebSocket:
/*
var ws = new WebSocket('ws://localhost:3000/test');
// 响应onmessage事件:
ws.onmessage = function(msg) { console.log(msg); };
// 给服务器发送一个字符串:
ws.send('Hello!');*/

//如果嫌在浏览器中输入JavaScript代码比较麻烦，
// 我们还可以直接用ws模块提供的WebSocket来充当客户端。
// 换句话说，ws模块既包含了服务器端，又包含了客户端。

let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
});
//在Node环境下，ws模块的客户端可以用于测试服务器端代码，
// 否则，每次都必须在浏览器执行JavaScript代码

//WebSocket协议本身不要求同源策略（Same-origin Policy）

//但是，浏览器会发送Origin的HTTP头给服务器，
// 服务器可以根据Origin拒绝这个WebSocket请求。
// 所以，是否要求同源要看服务器端如何检查

//还需要注意到服务器在响应connection事件时并未检查请求的路径，
// 因此，在客户端打开ws://localhost:3000/any/path可以写任意的路径。
// 实际应用中还需要根据不同的路径实现不同的功能