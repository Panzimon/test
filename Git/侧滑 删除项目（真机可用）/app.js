//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // console.log('小程序初始化完成');
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          var temp1 = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              that.globalData.userInfo.userCode = temp1;
              typeof cb == "function" && cb(that.globalData);
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo: {
    }
  }
})