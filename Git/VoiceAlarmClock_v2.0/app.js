var util_js=require('utils/util.js');
App({
  onLaunch: function () {
    
       var that=this;









     // ---------------------------------验证登录开始------------------------------
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
                              //获取本地session成功666
                              that.setTimePush(res.data)
                             
                          },null)
                      })
                }else{
                  //获取本地session成功666
                   that.setTimePush(session)
                }
            })
        },function(res){
            console.log("获取本地seesin失败")
          //获取本地seesin失败
              util_js.getNewSession(function(res){
                  util_js.getStrg("session",function(res){
                      //获取本地session成功666
                      that.setTimePush(res.data)
                  },null)
              })
        })
        // ---------------------------------结束---------------------------
        
      
  },
  setTimePush:function(session){
      setInterval(function(){
          util_js.pushWx(session);
          console.log(session)
      },60000)
  }
})

