var cfg_js=require('cfg.js');



//用户登录
function getNewSession(saveSesionOk){
    wx.login({
      success: function(res) {
          wx.request({
            url: cfg_js.gets('loginURI'),
            data: {code: res.code},
            success: function(res){
                var new_session=res.data.session;
                wx.setStorage({
                  key:"session",
                  data:new_session,
                  success:function(res){
                      saveSesionOk(res)
                      wx.getUserInfo({
                            success: function (res) {
                                var url=cfg_js.gets('addUserURI')+"&session="+new_session;
                                var data={
                                    city:res.userInfo.city,
                                    country:res.userInfo.country,
                                    gender:res.userInfo.gender,
                                    head_img:res.userInfo.avatarUrl,
                                    nick_name:res.userInfo.nickName,
                                    province:res.userInfo.province
                                };
                                got(url,data,function(res){})
                            }
                      })
                  }
                })
            }
          })
      }
    });
}


//获取所有备忘列表
function memoList(session,success){
    var url= cfg_js.gets('memoListURI')+"&session="+session;
    post(url,{},function(res){
        success(res)
    })
}



//set本地存储
function setStrg(key,value,success){
  wx.setStorage({
    key:key,
    data:value,
    success: function(res){
      success(res)
    }
  })
}

//get本地存储
function getStrg(key,success,fail){
  wx.getStorage({
    key: key,
    success: function(res){
      success(res)
    },
    fail: function(res) {
      fail(res)
    }
  })
}


//删除某条备忘
function deletMemo(session,id,success){
    var url=cfg_js.gets('deletMemoURI')+"&session="+session;
    var  data= {id:id};
    got(url,data,function(res){
         success(res)
    })
}






//日期格式化yyyy-MM-dd HH:mm:ss
function dataformat(date,fmt) { 
    var o = { 
        "M+" : date.getMonth()+1, //月份 
        "d+" : date.getDate(), //日 
        "h+" : date.getHours()%24 == 0 ? 24 : date.getHours()%24, //小时 
        "H+" : date.getHours(), //小时 
        "m+" : date.getMinutes(), //分 
        "s+" : date.getSeconds(), //秒 
        "q+" : Math.floor((date.getMonth()+3)/3), //季度 
        "S" : date.getMilliseconds() //毫秒 
    }; 
    var week = { "0" : "\u65e5", "1" : "\u4e00", "2" : "\u4e8c", "3" : "\u4e09", "4" : "\u56db", "5" : "\u4e94", "6" : "\u516d" }; 
    if(/(y+)/.test(fmt)){ fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); } 
    if(/(E+)/.test(fmt)){ fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]); } 
    for(var k in o){ 
        if(new RegExp("("+ k +")").test(fmt)){ fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); } 
    } 
    return fmt;  
}


//日期加减XXX-XX-XX
function dateCalculation(dd,dadd){
    //dd为日期，dadd为所加天数
    var a = new Date(dd);
    a = a.valueOf();
    a = a + dadd * 24 * 60 * 60 * 1000;
    a = new Date(a);
    var m = a.getMonth() + 1;
    if(m.toString().length == 1){m='0'+m;}
    var d = a.getDate();
    if(d.toString().length == 1){d='0'+d;}
    return a.getFullYear() + "/" + m + "/" + d;
}


//获取一周时间
function getDay(){
  var date=new Date();
  date=dataformat(date,'yyyy/MM/dd');
  var a = new Array("日", "一", "二", "三", "四", "五", "六");  
  //var week = new Date().getDay();   a[week]   var str = "今天是星期"+ a[week];  
  var days=[
      date,
      dateCalculation(date,1),
      dateCalculation(date,2),
      dateCalculation(date,3),
      dateCalculation(date,4),
      dateCalculation(date,5),
      dateCalculation(date,6)
  ]
  var SevenDay=[]
  for(var i=0; i<days.length; i++){
      SevenDay.push({
        year:days[i].substring(0,4),
        month:days[i].substring(5,7),
        day:days[i].substring(8,10),
        week:a[new Date(days[i]).getDay()]
      })
  }
  return SevenDay;
}







//将月份转换为英文
function enenMonthonth(m,page){
    if(m<10&&page=='sc'){
        m=m.slice(1)
    }
    var englishMonth={
        1:"January" ,2:"February",
        3:"March",4:"April",5:"May" ,
        6:"June" ,7:"July",
        8:"August", 9:"September ",
        10:"October" , 11:"November",
        12:"December"
    };
 return englishMonth[m]
}

//封装post请求
function post(url,data,success){
   wx.request({
        url: url,
        data:data,
        method: 'POST',
        header: {'content-type': 'application/x-www-form-urlencoded'},
        success: function(res) {
          success(res)
        }
    })
}

//封装get请求
function got(url,data,success){
   wx.request({
        url: url,
        data:data,
        header: {'content-type': 'application/json'},
        success: function(res) {
          success(res)
        }
    })
}

//一些showToast
function lessFive(){
  wx.showToast({
      title: '标签字数不得多于5个',
      icon: 'loading',
      duration: 2000
  })
}




//获取所有日志列表
function scheduleList(session,date,success){
    var url=cfg_js.gets('scheduleListURI')+"&session="+session;
    var data={remind_date:date}
    got(url,data,success)
}


//点击footer的添加操作
function footer(){
     wx.showActionSheet({
        itemList: ['新增日程', '新增备忘'],
        success: function(res) {
            if (!res.cancel) {
                if(res.tapIndex==0){
                    wx.navigateTo({url: '../startVoice/index?redirect=schedule'})
                }else{
                    wx.navigateTo({url: '../startVoice/index?redirect=memo'})
                }
            }
        }
    })   
}

//点击备忘导航
function forBw(){
     wx.redirectTo({url: '../listMemo/index'})
}

//点击备忘导航
function forRc(){
    wx.redirectTo({url: '../listSchedule/index'})
}

//微信录音api
function startVoive(success){
    wx.startRecord({
      success: function(res) {
          success(res)
      }
    })
}

//微信上传文件API(将语音识别成文字方法)
function upload(session,filePath,success,fail){
    wx.uploadFile({
        
      url: cfg_js.gets('speechRecURI')+"&session="+session,
      filePath: filePath,
      name: 'file',
      success: function(res){
          success(res)
      },
      fail:function(){
          fail()
      }
    })
}

//语音解析失败弹窗
function unknowVoice(){}{
    wx.showToast({
        title: '解析失败',
        icon: 'loading',
        duration: 2000
    })
}

//将文字转义解析
function analysis(data,success){
     var url=cfg_js.gets('analysisURI');
     got(url,data,success)
}

//删除日志
function deleteSchedule(data,success){
    var url=cfg_js.gets('deleteScheduleURI');
    got(url,data,success)
}

//更新日志
function updateScheDule(session,data,success){
    var url=cfg_js.gets('updateScheDuleURI')+"&session="+session;
    post(url,data,success)
}


//定时推送消息至微信模板
function pushWx(session){
    var now=new Date();
    var nowTime=dataformat(now,"yyyy-MM-dd hh:mm");

    var url=cfg_js.gets('alarmURI');
    var data={
        session:session
    };

    got(url,data,function(res){
        for(var i=0; i<res.data.length; i++){
            var formId=res.data[i].form_id
            var date=res.data[i].remind_date
            var time=res.data[i].remind_time
            var befortime=res.data[i].advance_notice
            var content=res.data[i].remind_content
            
            if(befortime==undefined||befortime==""){
                befortime=0
            }
            var clockTimestamp=Date.parse(date.replace(/-/g,'/')+" "+time);//闹钟时间
            var beforTimestamp=Number(befortime)*60000;//提前分钟
            var resulTime=dataformat(new Date(clockTimestamp-beforTimestamp),'yyyy-MM-dd hh:mm');//最终闹钟

            // console.log("闹钟："+new Date(clockTimestamp),
            //"提前时间："+beforTimestamp,"最终时间："+new Date(resulTime))
            if(nowTime==resulTime){
                console.log( resulTime+"的闹钟响啦！");
                muban( formId,date,time,content,session);
            }else{ console.log("有闹钟，但还不到时候")}
         }
    })
    
}





 //模板
function muban(formId,data,time,content,session){
    // console.log("模板发送成功")
    // console.log("给模板信息：","formId:",formId,"日期：",data,"时间:",time,"内容:",content)
     
    var url=cfg_js.gets('sendMsg');
    var data={
        "session":session,
        "touser": "",  
        "template_id": "8p4RgJmZdYei7dkpAXmhEaWYZFbSd0C3CSklCdFGFiE", 
        "page": "",          
        "form_id":formId,         
        "data": {
            "keyword1": {"value":time, "color": "#173177"} ,
            "keyword2": {"value": content, "color": "#173177"} 
        }
    }
    got(url,data,function(res){
        console.log("模板发送成功"+res)
    })
}



module.exports = {
  dataformat: dataformat,
  getNewSession: getNewSession,
  setStrg:setStrg,
  getStrg:getStrg,
  memoList:memoList,
  enenMonthonth:enenMonthonth,
  deletMemo:deletMemo,
  post:post,
  got:got,
  lessFive:lessFive,
  getDay:getDay,
  scheduleList:scheduleList,
  footer:footer,
  forBw:forBw,
  forRc:forRc,
  startVoive:startVoive,
  upload:upload,
  unknowVoice:unknowVoice,
  analysis:analysis,
  deleteSchedule:deleteSchedule,
  updateScheDule:updateScheDule,
  pushWx:pushWx,
  muban:muban


}
