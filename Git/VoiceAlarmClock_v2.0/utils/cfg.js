var host='https://wxa.chaojisales.com';
var arr={
    //请求接口
    loginURI:host+'/index.php?g=wxapp&m=Base&a=userLogin',
    memoListURI:host+'/index.php?g=wxapp&m=memo&a=memoList',
    deletMemoURI:host+'/index.php?g=wxapp&m=memo&a=deleteMemo',
    updataURI:host+'/index.php?g=wxapp&m=memo&a=editMemo',
    addURI:host+'/index.php?g=wxapp&m=memo&a=addMemo',
    scheduleListURI:host+'/index.php?g=wxapp&m=Schedule&a=scheduleList',
    analysisURI:host+'/index.php?g=wxapp&m=api&a=semanticRecognition',
    addScheDuleURI:host+'/index.php?g=wxapp&m=Schedule&a=addScheDule',
    deleteScheduleURI:host+'/index.php?g=wxapp&m=Schedule&a=deleteSchedule',
    updateScheDuleURI:host+'/index.php?g=wxapp&m=Schedule&a=updateScheDule',
    addUserURI:host+'/index.php?g=wxapp&m=User&a=addUser',
    alarmURI:host+'/index.php?g=wxapp&m=api&a=alarm_clock_list',
    sendMsg:host+'/index.php?g=wxapp&m=base&a=sendMsg',
    speechRecURI:host+'/index.php?g=wxapp&m=api&a=speechRecognition',

    //各种图片地址
    bannerImg:'http://p1.bpimg.com/580831/d01991ebfd0f7cf5.png'
}

function gets(arg){
    return arr[arg];
}


 module.exports ={
  gets:gets
}
