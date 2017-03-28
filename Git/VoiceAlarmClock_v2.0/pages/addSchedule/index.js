
var app = getApp();
var utilJs=require('../../utils/util.js');
var cfg_js=require('../../utils/cfg.js');
Page({
  data: {
    textArea:'',
    remind: ['不提前','提前10分钟', '提前20分钟', '提前30分钟', '提前60分钟'],
    remindVal:0,
    remindIndex: 0,
    repeat: ['不重复','1次', '2次', '3次', '4次'],
    repeatVal:0,
    repeatIndex: 0,
    tip: [
      {name:'工作',style:"tipCxtNormal"},
      {name:'娱乐',style:"tipCxtNormal"},
      {name:'生活',style:"tipCxtNormal"},
      {name:'约会',style:"tipCxtNormal"},
      {name:'看电影',style:"tipCxtNormal"},
      {name:'开会',style:"tipCxtNormal"},
      {name:'拜访',style:"tipCxtNormal"},
      {name:'跑步',style:"tipCxtNormal"}
      ],
    tipVal:[],
    Date: '',
    Time: '',
    id:'',
    timeIco:'http://p1.bpimg.com/580831/1f4121f59f82d33b.png',
    ico_go:'http://i1.piimg.com/580831/c3de00149e557d3f.png',
    remindIco:'http://p1.bpimg.com/580831/cbab786522e3acf6.png',
    repeatIco:'http://p1.bpimg.com/580831/e9db8fb377e9e1d9.png'
  },
  onLoad: function (options) {
    var that    = this;
    var content = options.font;
    //调用语义识别
    if(content!=''&&content!=undefined){
        that.semanticRecognition(content);
    }
    //调用应用实例的方法获取全局数据
    var newTime=new Date();
    var d=utilJs.dataformat(newTime,'yyyy-MM-dd');
    var t=utilJs.dataformat(newTime,'HH:mm');
    that.setData({Date:d,Time:t})
  },
 
  //内容
  textChange:function(e){{this.setData({textArea: e.detail.value})}},
  
  //时间选择器
  DateChange: function(e) {this.setData({Date: e.detail.value})},
  TimeChange: function(e) {this.setData({Time: e.detail.value})},

  //提醒，重复，标签选择器
  remindChange:function(e) {
    var arr=[0,10,20,30,60];
    this.setData({remindVal:arr[e.detail.value],remindIndex:e.detail.value});
  },


  //提前提醒
 repeatChange: function(e) {
    var arr=[0,1,2,3,4];
    this.setData({repeatVal:arr[e.detail.value],repeatIndex:e.detail.value});

  },
  
  //标签
  tipChange: function(e) {
    var that = this;
    var style=e.currentTarget.dataset.style;
    var index=e.currentTarget.dataset.index;
    style=='tipCxtNormal'?that.data.tip[index]['style']='tipCxtActive':that.data.tip[index]['style']='tipCxtNormal';
    that.setData(that.data)

    var arr=[];
    that.data.tip.forEach(function(value, key, array){
          if(array[key]['style']=='tipCxtActive'){
                arr.push(array[key]['name'])
          }
    })
    that.setData({tipVal:arr})
  },



   //表单提交
 formSubmit: function(e) {
     var formId=e.detail.formId;
     var that=this;
     var time=new Date(that.data.Date.replace(/-/g,'/')+" "+that.data.Time).getTime()/1000;
     setTimeout(function(){
        var textArea=that.data.textArea;
        utilJs.getStrg("session",function(res){
           var data={
                remind_content :that.data.textArea,
                remind_time_stamp:time,
                advance_notice:that.data.remindVal,
                remind_repeat:that.data.repeatVal,
                laber:that.data.tipVal,
                form_id:formId
            }
            var session=res.data;
            var url=cfg_js.gets('addScheDuleURI')+"&session="+session;
            
            if(textArea==""||textArea==undefined){
                wx.showModal({
                    title: '提示',
                    content: '日程内容为空，将不予保存',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateBack({delta: 2})
                        }
                    }
                })
            }else{
                utilJs.post(url,data,function(){
                    if(res.data.status!=0){
                      wx.navigateBack({delta:2})
                    }
                })
            }
            
      },100);
     })
  },
  
  //点击取消
  back: function(e) {
      wx.showModal({
            title: '提示',
            content: '尚未保存，您确定要取消吗？',
            success: function(res) {
                if (res.confirm) {
                   wx.navigateBack({delta: 2})
                }
            }
        })
  },

  //语义识别
  semanticRecognition:function(content){
      var that = this;
       utilJs.getStrg("session",function(res){
            var data={
                session:res.data,
                content:content
            }
            utilJs.analysis(data,function(res){
                that.setData({
                    textArea : res.data.info.remind_content,
                    Date     : res.data.info.remind_date,
                    Time     : res.data.info.remind_time
                })
            })
       })
  }
})