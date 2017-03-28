
var app = getApp();
var util_js=require('../../utils/util.js');
Page({
  data: {
    rc:'http://i1.piimg.com/580831/091ca02deae1664b.png',
    bw:'http://i1.piimg.com/580831/7301f39e7cd93dd8.png',
    mystatus:0,
    memo: [],
    year:'',
    month:'',
    day:'',
    edit_icon:'http://p1.bqimg.com/580831/266e115c69791417.png',
    delet_icon:'http://p1.bqimg.com/580831/fd5c5c94a27a15d3.png'
  },


  //页面加载
  onLoad: function () {
    
  
  },

//页面显示
onShow:function(){
   console.log(getCurrentPages())
    var that=this;
    var now=new Date();
    that.setData({
      year:now.getFullYear(),
      month:util_js.enenMonthonth(now.getMonth()+1,'mm'),
      day:now.getDate()
    })

    //请求列表list接口
    // ---------------------------------一次普通的请求开始------------------------------
     var that=this;
     util_js.getStrg("session",function(res){
         console.log("获取本地seesin成功")
       //获取本地seesin成功
        var session=res.data;
        util_js.memoList(session,function(res){
            //与后台匹配失败
            if(res.data.errmsg){
                  //重新登录
                  util_js.getNewSession(function(res){
                      util_js.getStrg("session",function(res){
                          //获取本地session成功
                            var session=res.data.session;
                            util_js.memoList(session,function(res){
                              console.log(res)
                                  if(res.data.status==0){
                                    that.setData({
                                      mystatus:0
                                    })
                                  }else{
                                      that.data.mystatus=1;
                                      res.data.forEach(function(value,index,array){
                                        array[index]['title']=array[index]['content'];
                                        array[index]['delet']=false;
                                        array[index]['labershow']= array[index]['laber'].split(",").slice(0, 3);
                                        array[index]['time']=
                                        util_js.dataformat(new Date(array[index]['update_time']*1000),'MM-dd HH:mm')
                                      })
                                      that.setData({
                                        memo:res.data,
                                        mystatus:1
                                      })
                                  }
                            })
                      },null)
                  })
            }else{
               if(res.data.status==0){
                  that.setData({
                    mystatus:0
                  })
                }else{
                    that.data.mystatus=1;
                    res.data.forEach(function(value,index,array){
                      array[index]['title']=array[index]['content'];
                      array[index]['delet']=false;
                      array[index]['labershow']= array[index]['laber'].split(",").slice(0, 3);
                      array[index]['time']=
                      util_js.dataformat(new Date(array[index]['update_time']*1000),'MM-dd HH:mm')
                    })
                    that.setData({
                      memo:res.data,
                      mystatus:1
                    })
                }
            }
        })
     },function(res){
         console.log("获取本地seesin失败")
       //获取本地seesin失败
          util_js.getNewSession(function(res){
              util_js.getStrg("session",function(res){
                    var session=res.data;
                    util_js.memoList(session,function(res){
                          if(res.data.status==0){
                            that.setData({
                              mystatus:0
                            })
                          }else{
                              that.data.mystatus=1;
                              res.data.forEach(function(value,index,array){
                                array[index]['title']=array[index]['content'];
                                array[index]['delet']=false;
                                array[index]['labershow']= array[index]['laber'].split(",").slice(0, 3);
                                array[index]['time']=
                                util_js.dataformat(new Date(array[index]['update_time']*1000),'MM-dd HH:mm')
                              })
                              that.setData({
                                memo:res.data,
                                mystatus:1
                              })
                          }
                    })
              },null)
          })
     })
     // ---------------------------------一次普通的请求结束------------------------------
    
},


  //点击编辑
  forEdit:function(e){
    var id=e.currentTarget.dataset.id;
    var time=e.currentTarget.dataset.alltime;
    var content=e.currentTarget.dataset.content;
    var laber=e.currentTarget.dataset.laber;
    wx.navigateTo({
      url: '../editMemo/index?id='+id+"&time="+time+"&content="+content+"&laber="+laber,
    })
  },



  //点击删除
   delet:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var index=e.currentTarget.dataset.index;
    this.data.memo[index].delet = true;
    wx.showModal({
        title: '提示',
        content: '确定要删除？',
        success: function(res) {
          if (res.confirm) {
            util_js.getStrg("session",function(res){
               util_js.deletMemo(res.data,id,function(res){
                   that.setData({memo:that.data.memo})
               })
             })
           } 
        } 
      })
  },


  //点击新增操作按钮
  addMemo(){
     // wx.navigateTo({url: '../addMemo/index'})
  },

  
  footer:function(){
    util_js.footer()
  },
  //点击日志导航
  forRc:function(){
       util_js. forRc()
  },
  //点击备忘导航
  forBw:function(){
       util_js. forBw()
  },
  onShareAppMessage: function () {
    return {
      title: '语音闹钟',
      desc: '快来吧',
      path: 'pages/listSchedule/index'
    }
  }
 



})



