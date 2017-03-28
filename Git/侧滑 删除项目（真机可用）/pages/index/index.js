//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello world!',
    userInfo: {}
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this
    // console.log(wx)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
    setTimeout(function () {
        wx.switchTab({
          url: '../watchInfo/watchInfo'
        })
    },100)
  }
})
