
var app = getApp();
var utilJs=require('../../utils/util.js');
var cfg_js=require('../../utils/cfg.js');
var fonts='';
Page({
  data: {
     textArea:'',
     default_laber  : '',
     user_laber: [],
     laber_input:'',
     submit:'submit'
  },

  onLoad: function (options) {
    fonts=options.font
  },
  onReady:function(){
    this.setData({
      textArea:fonts,
    })
  },
 
  //内容
  textChange:function(e){{this.setData({textArea: e.detail.value})}},



  
  
  //用户点击已输入的元素标签
  isDeleteLaber:function(event){
      var default_laber = this.data.default_laber; 
      var user_laber    = this.data.user_laber;
      var id = event.currentTarget.id;
      var delete_laber  = user_laber[id];
      user_laber.splice(id, 1);
      
      for(var i = 0;i <= default_laber.length-1;i++){
          if(default_laber[i][1] == delete_laber){
              default_laber[i][0] = this.data.no_select_color;
          }
      }

      this.setData({
         user_laber   :user_laber,
         default_laber:default_laber
     })
  },
  bindLaberInput:function(e){
      this.data.laber_input = e.detail.value;
  },

  
  //用户输入完成事件
  endLaberInput:function(){
       var default_laber = this.data.default_laber; 
       var user_laber    = this.data.user_laber;
       var laber_input   = this.data.laber_input;
       
       if(laber_input.length>5){
            utilJs.lessFive()
            return;
       }
      
       if(laber_input!=''){
          user_laber.push(laber_input);
          
          for(var i = 0;i <= default_laber.length-1;i++){
              if(default_laber[i][1] == laber_input){
                  default_laber[i][0] = this.data.is_select_color;
              }
          }
          
          this.setData({
              user_laber   :user_laber,
              default_laber:default_laber,
              laber_input  :''
          })
       }
  },
  
 

  
  //移除数组中指定的元素
  arrayRemove:function(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
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


   //表单提交
  formSubmit: function(e) {


    this.setData({ submit:''})
    wx.showToast({
        title: '正在提交',
        icon: 'loading',
        duration: 1000
    })



    var laber_input   = this.data.laber_input;
    var that=this;
    var id=e.detail.formId;
   
   
    if(laber_input != ''&&laber_input.length<=5){
        that.data.user_laber.push(laber_input);
    }

    setTimeout(function(){
    var textArea=that.data.textArea;
    if(laber_input.length<=5){
           if(textArea==""||textArea==undefined){
                wx.showModal({
                    title: '提示',
                    content: '备忘内容为空，将不予保存',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateBack({delta: 2})
                        }
                    }
                })
            }else{
                utilJs.getStrg("session",function(res){
                    var url=cfg_js.gets('addURI')+"&session="+res.data;
                    var data={
                        form_id:id,content :textArea,
                        laber:that.data.user_laber,
                    }
                    utilJs.post(url,data,function(res){
                         if(res.data.status!=0){
                            wx.navigateBack({delta: 2})
                         }
                    })
                },null)
                
            }
    }else{
        utilJs.lessFive()
        that.setData({ submit:'submit'})
    }
    
    },500)
  },
  


})