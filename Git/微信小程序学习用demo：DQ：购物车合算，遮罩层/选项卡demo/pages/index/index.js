//index.js
//获取应用实例
var app = getApp()
Page({
 
  data: {
    motto: 'Hello World',
    userInfo: {},
    oneList:
	[
		{
			id:1,
			name:'周杰伦'
		},
		{
			id:2,
			name:'彭于晏'
		},
		{
			id:3,
			name:'蔡依林'
		},
		{
			id:4,
			name:'林俊杰'
		}
	],
  },
 
  onLoad: function () {	
    console.log("onLoad");
    this.setData({
       id: 0 
      });
	},
  add: function (e) {	
    console.log(e.target.dataset.id);
    this.setData({
        id: e.target.dataset.id
      });
	},

})
