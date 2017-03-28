var utilJs=require('../../utils/util.js');
Page({
  data:{
    status:'statusOk',
    url_param:'',
    msg:'',
    src:"http://i1.piimg.com/580831/7305fe693f7a5eb4.png"
  },
  onLoad:function(options){
       this.data.url_param = options.redirect;
       console.log(this.data.url_param )
  },
  start:function(){
    var that = this;
    wx.showToast({ title: '正在录音',icon: 'loading',duration: 10000})
    that.setData({src:"http://p1.bqimg.com/580831/4a27ff47eb154dcc.png"})
    that.lauchRecApi()
  },
  end(){
        var that=this;
        that.setData({src:"http://i1.piimg.com/580831/7305fe693f7a5eb4.png"})
        wx.hideToast();

        setTimeout(function(){
            wx.stopRecord();
        },500)
    },

   lauchRecApi:function(){
        var that=this;
        utilJs.startVoive(function(res){
            var FilePath= res.tempFilePath;
            utilJs.getStrg("session",function(res){
                var session=res.data;
                utilJs.upload(session,FilePath,function(res){
                    console.log(res)
                    if(res.data=="null"){
                            console.log("走的启动接口失败")
                            that.setData({status:'statusErr'})
                            setTimeout(function(){
                                that.setData({status:'statusOk'})
                            },1000)
                    }else{
                        var font=JSON.parse(res.data);
                        font=font.substring(0,font.length-1);
                        //文件上传成功，语音解析成功，且不为空，进行一下判断
                        that.urlRedirect(that.data.url_param,font); 
                        
                    }
                },function(){
                    console.log("走的启动接口失败")
                    that.setData({status:'statusErr'})
                    setTimeout(function(){
                        that.setData({status:'statusOk'})
                    },1000)
                    
                })
            });
        })
    },


  //url重定向地址
  urlRedirect:function(url_param,font){
      //如果是从日程进来的的，那么需要语义解析,如果是从备忘进来的的，那么不需要语义解析
      var redirect_url = url_param == 'memo' ? '../addMemo/index?font='+font : '../addSchedule/index?font='+font;
      wx.navigateTo({
          url : redirect_url,
      })
  },


  close(){
      var that=this;
      var url_param=that.data.url_param;
      var redirect_url = url_param == 'memo' ? '../addMemo/index' : '../addSchedule/index';
      wx.navigateTo({
          url : redirect_url,
      })
  }
})