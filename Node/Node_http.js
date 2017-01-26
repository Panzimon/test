/**
 * Created by ZY on 2017/1/27.
 */

/*
 要开发HTTP服务器程序，
 从头处理TCP连接，解析HTTP是不现实的。
 这些工作实际上已经由Node.js自带的http模块完成了。应用程序并
 不直接和HTTP协议打交道，
 而是操作http模块提供的request和response对象。
 */