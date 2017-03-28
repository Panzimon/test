
var app = getApp();
var utilJs=require('../../utils/util.js');
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
    Date: '2016-09-01',
    Time: '12:01',
    id:'',
    timeIco:'http://p1.bpimg.com/580831/1f4121f59f82d33b.png',
    ico_go:'http://i1.piimg.com/580831/c3de00149e557d3f.png',
    remindIco:'http://p1.bpimg.com/580831/cbab786522e3acf6.png',
    repeatIco:'http://p1.bpimg.com/580831/e9db8fb377e9e1d9.png'
  },
  onLoad: function (options) {
    var that = this;
     //默认文本域内容，时间
    this.setData({
      textArea:options.thing,
      Date:utilJs.dataformat(new Date(options.time),'yyyy-MM-dd'),
      Time:utilJs.dataformat(new Date(options.time),'HH:mm'),
      id:options.id
    })

    //默认标签选中
    var check=options.laber.split(",");
    
    that.data.tip.forEach(function(value0, index0, array0){  
        check.forEach(function(value1, index1, array1){ 
            if(array0[index0]['name']==array1[index1]){
                array0[index0]['style']='tipCxtActive'
            }
        })
    })
    that.data.tipVal=check;
    that.setData(that.data)
    

    //默认提醒提前
    that.data.remind.forEach(function(value, index, array){  
        var arr=[0,10,20,30,60]; 
        if(arr[index]==Number(options.advance_notice)){
            that.setData({
              remindIndex:index,
              remindVal:arr[index]
            }); 
            return false; 
        }
    })
    
   //默认重复
   that.data.repeat.forEach(function(value, index, array){ 
         var arr=[0,1,2,3,4];
        if(array[index].indexOf(options.remind_repeat)!=-1){
            that.setData({
              repeatIndex:index,
              repeatVal:arr[index]
            }); 
            
            return false; 
        }
    })


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
  save: function(e) {
     var that=this;
     var id=e.currentTarget.dataset.id;
     var time=new Date(that.data.Date.replace(/-/g,'/')+" "+that.data.Time).getTime()/1000;

     setTimeout(function(){
       var textArea=that.data.textArea;
       utilJs.getStrg("session",function(res){
            var session=res.data;
            var data= {
                remind_content :that.data.textArea,
                remind_time_stamp:time,
                advance_notice:that.data.remindVal,
                remind_repeat:that.data.repeatVal,
                laber:that.data.tipVal,
                id:id
            };

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
                utilJs.updateScheDule(session,data,function(res){
                    if(res.data.status!=0){
                        wx.navigateBack( {delta:2})
                    }
                })
            }

            
        })
       
        
    },100);
 
     
  },



  
 //点击取消
  back: function(e) {
     wx.showModal({
            title: '提示',
            content: '尚未保存，您确定要取消吗？',
            success: function(res) {
                if (res.confirm) {
                    wx.navigateBack ({delta: 1})
                }
            }
        })
     
  }
})