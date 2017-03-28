var util = require('../../utils/util.js');
var nameUtil = require("../../data/pinyin/getFirstLetter.js");
var friendList = [];
var initData = {};

var nameData = ["王霞", "丁卯", '布鲁克斯', "艾伦", "考特", "奥巴马", "古斯丁", "TCL", "Nathan", "OBJ", "杰弗森", "詹姆斯", "罗纳尔多", "陈伟", "西域男孩", "旷古奇迹", "飞天", "小耗子", "光棍", "阿拉克服", "荷兰", "iPhone", "订购", "PM", "SW", "OBJs", "特兰李", "田中不正", "钟落", "璀璨", "奥古斯汀库茨", "定海神针", "光大WE谷", "大老鼠"];


initData.data = {
  newFrinedAmount: 1,
  inputVal: '',
  tempFriendList: [],
  touchX: 0,
  touchY: 0,
  tempName: '',
  AnimatingName: '',
  deleteAnimation: '' // 控制是否给相应的单元增加删除动画
};
initData.onShow = function (team1) {
  this.animation = wx.createAnimation({
    duration: 300,
    timingFunction: 'ease',
  })
}
initData.onLoad = function () {
  var that = this;
  var funName = nameUtil.getInitials.translateCode;
  var letter = nameUtil.letters;
  var tempLetterArray = [];
  var tempLetterObj = {};
  for (var i = 0, l = nameData.length; i < l; i++) {
    var py = funName(nameData[i]);
    if (tempLetterObj[py]) {
      tempLetterObj[py].push(nameData[i]);
    } else {
      tempLetterObj[py] = [nameData[i]];
    }
  }
  for (var i = 0, l = letter.length; i < l; i++) {
    tempLetterArray[i] = {
      xing: letter[i],
      items: tempLetterObj[letter[i]]
    }
  }
  that.data.tempFriendList = tempLetterArray;
  // 用作保存原始的好友列表，避免搜索后导致好友列表无法复原
  that.setData({
    friendList: tempLetterArray
  })
}

// 搜索与关键字相关的用户并显示
initData.matchInput = function (res) {
  var that = this;
  var str = res.detail.value;
  var list = that.data.tempFriendList; // 注意使用这个，因为that.data.friendList这个数据一直是动态的。
  var reg = new RegExp(str.toLowerCase());
  var arrList = [];
  if (str) {
    for (var i = 0, l = list.length; i < l; i++) {
      var items = list[i].items;
      if (!items) continue;
      var arrItem = {
        items: [],
        xing: ''
      };
      for (var j = 0, len = items.length; j < len; j++) {
        if (reg.test(items[j].toLowerCase())) {
          arrItem.items.push(items[j])
        }
      }
      if (arrItem.items.length) {
        arrItem.xing = list[i].xing;
        arrList.push(arrItem)
      }
    }
  } else {
    arrList = that.data.tempFriendList;
  }
  that.setData({
    friendList: arrList
  })
}

// 触摸开始事件
initData.moveStart = function (e) {
  this.data.touchX = e.changedTouches[0].clientX;
  this.data.touchY = e.changedTouches[0].clientY;
}

// 触摸结束事件 
// 动画的执行逻辑
initData.moveEnd = function (e) {
  var X = e.changedTouches[0].clientX;
  var Y = e.changedTouches[0].clientY;
  var name = e.currentTarget.dataset.name;
  var data = null, tempAniamtion = null;
  // console.log('左滑动');
  if (this.data.touchX - X > 3 && Math.abs(this.data.touchY - Y) < 20) {
    if (this.data.AnimatingName) {
      tempAniamtion = this.animation.left('0rpx').step();
      this.data.AnimatingName = '';
      this.setData({
        AnimatingName: '',
        deleteAnimation: tempAniamtion.export()
      })
    } else {
      tempAniamtion = this.animation.left('-160rpx').step();
      this.setData({
        AnimatingName: name,
        deleteAnimation: tempAniamtion.export(),
        tempName: name
      })
    }
  } else if (this.data.touchX - X < -3 && Math.abs(this.data.touchY - Y) < 20) {
    // console.log('右滑动');
    tempAniamtion = this.animation.left('0rpx').step();
    this.setData({
      deleteAnimation: tempAniamtion.export(),
      AnimatingName: ''
    });
  }
}

// 删除好友
initData.removeFriend = function (e) {
  var idxall = e.currentTarget.dataset.idxall;
  var idx = e.currentTarget.dataset.idx;
  var datas = this.data.friendList;
  var arrList = [];
  // 如果没有这之间的代码，会有bug
  var tempAniamtion = this.animation.left('0rpx').step({duration: 1}); 
  this.data.AnimatingName = '';
  this.setData({
    AnimatingName: '',
    deleteAnimation: tempAniamtion.export()
  })
  // 如果没有这之间的代码，会有bug
  datas[idxall].items.splice(idx, 1);
  arrList = initData.dealFriends(datas);
  this.setData({
    friendList: arrList,
    tempFriendList: arrList,
    tempName: ''
  })
}

// 对好友列表进行清理
initData.dealFriends = function (datas) {
  var arr = [], i = 0, len = datas.length;
  for (; i < len; i++) {
    if (datas[i].items && datas[i].items.length) {
      arr.push(datas[i]);
    }
  }
  return arr;
}

Page(initData)
