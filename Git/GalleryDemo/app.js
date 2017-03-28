// app.js
var cfg = require('./utils/cfg.js')
App({
  getWindowInfo: function () {
    console.log('getWindowInfo:----')
    wx.getSystemInfo({
      success: function (res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        console.log('getWindowInfo:' + windowWidth)
        console.log('getWindowInfo:' + windowHeight)
        cfg.width = windowWidth
        cfg.height = windowHeight
      }
    })
  },
  globalData: {
    userInfo: null,
    recruitDetail: '1234567890000000000'
  }
})

//# sourceMappingURL=app.js.map
