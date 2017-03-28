var util = require('../../utils/util.js')
var cfg = require('../../utils/cfg.js')
Page({
  data: {
    album: {},
    show: true,
    pid: 0,
    cid: 0,
    savatar: '',
    showGallery: true,
    showBtn: true,
    height: cfg.height,
    width: cfg.width,
    scale: cfg.height / cfg.width,
    img: cfg.img,
    imageWidth: cfg.width,
    imageHeight: cfg.height,
    time: 0,
    params: {
      client_ver: '0.4.4',
      from_client: 'cc',
      openid: '',
      page: 1,
      pagesize: 10,
      title: '',
      uid: 1140518
    }
  },
  formSubmit: function (e) {
    var val = e.detail.value
    console.log('form发生了submit事件，携带数据为：', val.input)
    var that = this
    var obj = that.data.params
    obj.title = val.input
    that.setData({ params: obj })
    setTimeout(function () {
      that.getConImages()
    }, 1000)
  },
  getConImages: function () {
    var that = this
    var obj = that.data.params
    console.log('album---params--name:' + obj.username)
    util.get(cfg.host + 'api/cc/act?mod=user3&act=photos', obj,
      function (res) {
        obj = res.data
        obj = obj.data.list
        that.setData({
          album: obj,
          time: 0
        })
      })
  },
  showMadel(e) {
    console.log('showMadel:' + e.currentTarget.id)
    var that = this
    that.setData({
      showGallery: false,
      cid: e.currentTarget.id
    })
  },
  showView(e) {
    var that = this
    var savatar = that.data.album[e.currentTarget.id].photo
    savatar = savatar.split('.jpg')
    savatar = savatar[0] + '.jpg'
    var imageSize = util.imgUtil(savatar)
    that.setData({
      show: false,
      pid: e.currentTarget.id,
      savatar: savatar,
      imageWidth: imageSize.imageWidth,
      imageHeight: imageSize.imageHeight
    })
  },
  showBtns(e) {
    var that = this
    that.setData({showBtn: false})
    setTimeout(
      function() {
        if (!that.data.showBtn) {
          that.setData({showBtn: true})
        }
      }, 3000)
  },
  closeImg(e) {
    console.log('e:' + e)
    console.log('closeImg:' + e.currentTarget.id)
    var that = this
//    var pid = that.data.pid
    var show = that.data.show
    if (show) {
      // 当处于浏览状态时，点击关闭，隐藏浏览界面
      that.setData({showGallery: true})
    } else {
      // 当处于浏览状态时，点击关闭，隐藏浏览界面
      that.setData({show: true})
    }
  },
  nextImg(e) {
    // 点击时，获取当前图片ID，或者pid
    var that = this
    var id = that.data.cid
    var length = that.data.length
    var time = that.data.time
    if (id === (length - 2)) {
      if (time !== 1) {
        time = 1
        setTimeout(function () {
          that.getMoreImg()
        }, 1000)
      } else {
        return
      }
      wx.showToast({
        title: '更多，请等待加载',
        icon: 'successs',
        duration: 2000
      })
    } else {
      that.setData({cid: id + 1, pid: id + 1})
    }
  },
  prevImg(e) {
  // 点击时，获取当前图片ID，或者pid
    var that = this
    var id = that.data.pid
    //    var length = that.data.album.length
    if (id === 0) {
      wx.showToast({
        title: '这是第一张图片',
        icon: 'successs',
        duration: 2000
      })
      return
    }
    that.setData({cid: id - 1, pid: id - 1})
  },

  changeId(e) {
    console.log('changeId:' + e.detail.current)
    var that = this
    var id = e.detail.current
    var time = that.data.time
    if (id >= that.data.album.length - 2) {
      wx.showToast({
        title: '更多，请等待加载',
        icon: 'successs',
        duration: 2000
      })
      if (time !== 1) {
        time = 1
        setTimeout(function () {
          that.getMoreImg()
        }, 1000)
      } else {
        id = id - 1
      }
    }
    var show = that.data.show
    var savatar = that.data.album[id].photo
    if (!show) {
      savatar = savatar.split('.jpg')
      savatar = savatar[0] + '.jpg'
    }
    that.setData({
      cid: id,
      pid: id,
      savatar: savatar
    })
  },
  bindCid(e) {
    console.log('closeView:' + e.currentTarget.id)
    var that = this
    that.setData({cid: e.currentTarget.id})
  },
  scrollEvent: function (e) {
    var that = this
    setTimeout(function () {
      that.getMoreImg()
    }, 1000)
  },
  getMoreImg: function () {
    var that = this
    var obj = that.data.params
    var album = that.data.album
    if (album.length === obj.pagesize) {
      obj.pagesize += 10
      that.setData({
        params: obj
      })
    }
    setTimeout(function () {
      that.getConImages()
    }, 1000)
  },
  onLoad: function () {
    var that = this
    var width = cfg.width
    var height = cfg.height
    console.log('width:' + width + 'height:' + height)
    var scale = height / width
    that.setData({
      width: width,
      height: height,
      scale: scale
    })
    setTimeout(function () {
      that.getConImages()
    }, 1000)
  }
})
// # sourceMappingURL=album.js.map
