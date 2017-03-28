var cfg = require('./cfg.js')
var util = {
  addAuth: function(data) {
    var my = cfg.my
    data.username = my.username
    data.password = my.password
    data.openid = my.openid
    return data
  },
  get: function(url, opts, success, error) {
    console.log('get:-----------' + opts)
    var _success = function(res) {
      success && success(res)
    }
    var _error = function(res) {
      error && error(res)
    }
    wx.request({
      url: url,
      data: opts,
      method: 'GET',
      success: function(res) {
        _success(res)
      },
      fail: function(res) {
        // fail
        _error(res)
      },
      complete: function() {
        // complete
      }
    })
  },
  post: function(url, opts, success, error) {
    var _success = function(res) {
      success && success(res)
    }
    var _error = function(res) {
      error && error(res)
    }
    wx.request({
      url: url,
      data: opts,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT,
      // DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res) {
        // success
        _success(res)
      },
      fail: function(res) {
        // fail
        _error(res)
      },
      complete: function() {
        // complete
      }
    })
  },
  imgUtil: function (obj) {
    var sth = {}
    var imageSize = {}
    console.log(obj)
    var width = cfg.width
    var height = cfg.height
    var scale = height / width
    console.log(scale + ';' + width + ';' + height)
    wx.getImageInfo({
      src: cfg.img + obj,
      success: function (res) {
        console.log('res.width:' + res.width)
        console.log('res.height:' + res.height)
        sth.width = res.width
        sth.height = res.height
        sth.scale = sth.height / sth.width
        if (sth.scale < scale) {
          imageSize.imageWidth = width
          imageSize.imageHeight = width * sth.scale
        } else {
          imageSize.imageHeight = height
          imageSize.imageWidth = height * sth.scale
        }
      },
      fail: function (error) {
        console.log(error.errMsg)
      }
    })
    return imageSize
  }
}

module.exports = util

// # sourceMappingURL=util.js.map

