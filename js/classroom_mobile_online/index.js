/* eslint-disable require-jsdoc */

let rtc = null;

//  进入房间
function video_enter(){
  const userId = $('#userId').val();
  const roomId = $('#roomId').val();
  const config = genTestUserSig(userId);
  rtc = new RtcClient({
    userId,
    roomId,
    sdkAppId: config.sdkAppId,
    userSig: config.userSig
  });
  rtc.join();
  video_time = 2;
}

// 开始聊天
function start_voice(){
    if(video_time == 6){
        alert(video_state_4);
        return false;   //  过期的教室 禁通话
    }
    var d = '{"type":"login","client_name":"'+client_name+'","room_id":"'+chat_room_id+'","is_mobile":2}';
    ws.send(d);
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.publish();
  $(".t_head_outbox").hide();
  $(".t_head_inbox").show();
  video_time = 4;
  if(video_time_yuan == 1){
    tong_time("tong-time", 0)
  }else{
      $("#tong-dialing").html(video_state_3);
      is_tong_p = 1;
      is_tong_p_dao(15);
  }
  $("#video-img-v2").attr("src", '/static/img/classroom_mobile/video_voice_yes.png');
}

// 挂断
function pause_voice(){
    //if(video_pause_bei == 0){ // 没在通话中 仅当 对方挂断或无应答时 才可以挂断
    //    return false;
    //}
    //video_pause_bei = 0;
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.unpublish();
  $(".t_head_outbox").show()
  $(".t_head_inbox").hide()
  $("#video-img-v2").attr("src", '/static/img/classroom_mobile/video_voice_no.png');
  video_time = 5;
  if(video_time_yuan == 1){
    clearTimeout(tong_time_s);
    document.getElementById('tong-time').innerHTML =  '';
  }
}

// 离开房间
function leave(){
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.leave();
  rtc = null;
}

//自动停止
function video_stop(){
    video_time = 6;
    $(".t_head_outbox").show();
    $(".t_head_inbox").hide();
    //$("#video-img-v1").attr("src", '/static/img/classroom_mobile/video_voice_no.png');
    //$("#video-img-v2").attr("src", '/static/img/classroom_mobile/video_voice_no.png');
    clearTimeout(tong_time_s);
    document.getElementById('tong-time').innerHTML =  '';
    $(".call2").show();
    leave();
}

$('#settings').on('click', function(e) {
  e.preventDefault();
  $('#settings').toggleClass('btn-raised');
  $('#setting-collapse').collapse();
});
