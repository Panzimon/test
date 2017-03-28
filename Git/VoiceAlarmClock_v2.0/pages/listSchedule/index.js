
var app = getApp();
var util_js=require('../../utils/util.js');
var arrSeven=[];
Page({
  data: {
    islogin:0,//是否登录（0代表未登录、1代表已登录）
    sevenDay:[],
    year_month:'',
    year:'',
    day:'',
    month:'',
    log:[],
    edit_icon:'http://p1.bqimg.com/580831/266e115c69791417.png',
    delet_icon:'http://p1.bqimg.com/580831/a829caff5a113255.png',
    rc:'http://i1.piimg.com/580831/c5118f811ed44e28.png',
    bw:'http://i1.piimg.com/580831/21427560d907daa1.png',
    nullImg:'http://p1.bpimg.com/580831/a6bf366f129a2cbb.png'
  },
  //事件处理函数
  onLoad: function () {
     

  },
  onShow:function(){
        var that = this
        //初始化进来默认选中
        arrSeven=util_js.getDay();
        for(var i=0; i<util_js.getDay().length; i++){arrSeven[i].class="normal"}
        arrSeven[0].class="active";
        that.setData({
            sevenDay:arrSeven, 
            year_month:arrSeven[0].year+"年"+arrSeven[0].month+"月",
            year:arrSeven[0].year,
            month:util_js.enenMonthonth(arrSeven[0].month,'sc'),
            //month:arrSeven[0].month,
            day:arrSeven[0].day
          });
        // ---------------------------------验证登录开始------------------------------
        var that=this;
        var date=that.data.sevenDay[0].year+"/"+that.data.sevenDay[0].month+"/"+that.data.sevenDay[0].day;
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
                              that.setData({islogin:1})
                                var session=res.data;
                                that.render(session,date)
                          },null)
                      })
                }else{
                  that.setData({islogin:1})
                  that.render(session,date)
                }
            })
        },function(res){
            console.log("获取本地seesin失败")
          //获取本地seesin失败
              util_js.getNewSession(function(res){
                  util_js.getStrg("session",function(res){
                        var session=res.data;
                      that.setData({islogin:1})
                      that.render(session,date)
                  },null)
              })
        })
        // ---------------------------------结束---------------------------
  },
  //初始化渲染页面要执行的
  render:function(session,date){
       var that=this;
       util_js.scheduleList(session,date,function(res){
            var  logarr=[];
           for(var i=0; i<res.data.length; i++){
              logarr.push({
                  time:util_js.dataformat(new Date(res.data[i].remind_time_stamp*1000),'HH:mm')   ,
                  thing:res.data[i].remind_content,
                  id:res.data[i].id,
                  allTime:util_js.dataformat(new Date(res.data[i].remind_time_stamp*1000),'yyyy/MM/dd HH:mm:ss'),
                  remind_repeat:res.data[i].remind_repeat,
                  advance_notice:res.data[i].advance_notice,
                  laber:res.data[i].laber,
                  delet:false
              });
            }
            that.setData({log:logarr})
       })
  } ,


  //点击日期事件
  doActive:function(e){
       var that=this;
      //点击样式改变
       var index=e.currentTarget.dataset.index;
       this.data.sevenDay[index].class="active";
       for(var i=0; i<this.data.sevenDay.length; i++){
          if(i!=index){this.data.sevenDay[i].class="normal";}
       }
       this.setData(this.data)
       this.setData({
         year_month:arrSeven[index].year+"年"+arrSeven[index].month+"月",
         year:arrSeven[index].year,
         month:util_js.enenMonthonth(arrSeven[index].month),
         day:arrSeven[index].day
       });

       //点击请求数据
        var date=that.data.sevenDay[index].year+"/"+that.data.sevenDay[index].month+"/"+that.data.sevenDay[index].day;
        util_js.getStrg("session",function(res){
          console.log(res.data,date)
            that.render(res.data,date)
        })
      
       
       
  },


  //点击编辑
  forEdit:function(e){
   
    var id=e.currentTarget.dataset.id;
    var time=e.currentTarget.dataset.time;
    var thing=e.currentTarget.dataset.thing;
    var remind_repeat=e.currentTarget.dataset.remind_repeat;
    var advance_notice=e.currentTarget.dataset.advance_notice;
    var laber=e.currentTarget.dataset.laber
    var url='../editSchedule/index?id='+id+"&time="+time+"&thing="+thing+"&remind_repeat="+remind_repeat+"&advance_notice="+advance_notice+"&laber="+laber;
    wx.navigateTo({url: url})
  },




  //点击删除
  delet:function(e){
    var that=this;
    var id=e.currentTarget.dataset.id;
    var time=e.currentTarget.dataset.time;
    var index=e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function(res) {
        if (res.confirm) {
            util_js.getStrg("session",function(res){
                 var data= {id:id,session:res.data }
                 util_js.deleteSchedule(data,function(res){
                      that.data.log[index]['delet']=true;
                      that.setData(that.data)
                 })
            })
        }
      }
    }) 
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



