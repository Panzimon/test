
var app = getApp();
var cfg_js=require('../../utils/cfg.js');
var utilJs=require('../../utils/util.js');
var textarea = '';
Page({
  data: {
     textArea:'',
     default_laber  : '',
     user_laber: [],
     laber_input:'',
     id:''
  },
  //事件处理函数
  bindViewTap: function() {wx.navigateTo({url: '../logs/logs'})},
  onLoad: function (options) {
      
    var that = this
    
     //默认文本域内容
        that.setData({
            id:options.id
        })

        textarea = options.content;

    


    console.log(options.laber);
    //获取用户定义标签的数据
      if(options.laber!=''){
          that.data.user_laber = options.laber.split(",");
      }
      

    //  console.log(options.laber.split(","))
      

     that.setData(that.data)
  },
 
  //内容
  textChange:function(e){{this.setData({textArea: e.detail.value})}},

   onReady:function(){
        this.setData({
                textArea:textarea,
        })
    },


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


   //表单提交
  save: function(e) {
      var that=this;
      var laber_input   = this.data.laber_input;
      if(laber_input != ''&&laber_input.length<=5){
        that.data.user_laber.push(laber_input);
      }
      if(that.data.user_laber.length==0){
          that.data.user_laber='';
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
                                wx.redirectTo({url: '../listMemo/index'})
                            }
                        }
                    })
                }else{
                    utilJs.getStrg("session",function(res){
                         var url=cfg_js.gets('updataURI')+"&session="+res.data;
                         var data={
                            id:that.data.id, content :textArea,
                            laber:that.data.user_laber,
                         }
                         utilJs.post(url,data,function(res){
                              if(res.data.status!=0){
                                 wx.navigateBack ({delta: 1})
                               }
                         })
                    }) 
                }
       }else{utilJs.lessFive()}
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