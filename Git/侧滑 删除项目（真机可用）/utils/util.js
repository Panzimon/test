var app = getApp();
var UID = app.globalData.userInfo.uid;
var SESSIONID =  app.globalData.userInfo.sessionId;
var URL = app.globalData.url;

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function newUnit() {
  return "hello world!"
}
// 设置动画参数
function setAnimationParams(a, b, c, d) {
  a = a || 400;
  b = b || "ease";
  c = c || 0;
  d = d || "50% 50%";
  return {
    duration: a,
    timingFunction: b,
    delay: c,
    transformOrigin: d
  }
}
function extend(obj1, obj2) {
  for (var k in obj1) {
    obj2[k] = obj1[k]
  }
}
function previewImage(res) {
  var srcs = res.currentTarget.dataset.src;
  var arr = [];
  for (var i = 0, l = srcs.length; i < l; i++) {
    if (typeof srcs[i] != 'string') {
      arr.push(srcs[i].url); //由于数组存储的是对象形式保存的路径，所以存储此步骤的处理方式
    }
  }
  srcs = arr.length > 0 ? arr : srcs;
  var idx = res.currentTarget.dataset.idx;
  // console.log(typeof srcs);
  srcs = (typeof srcs == 'string') ? [srcs] : srcs;
  idx = (typeof srcs == 'string') ? 0 : idx;
  wx.previewImage({
    current: srcs[idx],
    urls: srcs,
    success: function (res) { },
    fail: function () { },
    complete: function () { }
  })
}
function translocals(locals) {
  var arr = [];
  for (var i = 0, l = locals.length; i < l; i++) {
    arr.push({
      latitude : locals[i][0],
      longitude : locals[i][1]
    })
  }
  return arr;
}

// 上传图片时，受到两个限制，第一个限制：一次只能传一个文件，第二个限制，一次最多只能搭起10个服务器上传链接
// 解决方案：采用递归函数上传，最后一次上传成功后使用回调函数启动评论的请求
/**
 * arr      --- 上传文件的路径组成的数组，其中每一项都是符合微信上传文件的路径要求
 * i        --- 从数组的哪一个索引项开始上传，传参为0 ， 0 开始上传
 * len      --- 数组上传的总的长度，即是判断是会否所有项上传完成的数据之一
 * that     --- 每个页面的this
 * dataArr  --- 传入空数组即可 []
 * callBack --- 当所有文件上传完成后执行的回调函数会,给该函数传入一个默认的已经上传的图片的路径集合，为数组
 */
function upLoadImage(arr, i, len, that, dataArr, callBack) {
  if(arr.length == 0) {
    callBack(dataArr);
    return;
  }
  wx.uploadFile({
    url: URL + 'tweet/upload_image', 
    filePath: arr[i],
    name: 'image',
    header: {
      'content-type': 'multipart/form-data'
    }, 
    formData: {
      "uid": UID,
      "sessionId": SESSIONID
    },
    success: function (res) {
      console.log(res);
      dataArr.push(JSON.parse(res.data).data);
      if (i == len - 1) {
        callBack(dataArr);
      } else {
        i++;
        upLoadImage(arr, i, len, that, dataArr, callBack);
      }
    }
  })
}


module.exports = {
  formatTime: formatTime,
  newUnit: newUnit,
  setAnimationParams: setAnimationParams,
  extend: extend,
  previewImage: previewImage,
  transLocals: translocals,
  upLoadImage: upLoadImage
}
// 这个文件，常驻内存，每次启动页面只需要加载一次就可以了
