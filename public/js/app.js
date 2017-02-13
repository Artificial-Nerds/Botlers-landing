
var chatDelay = 0;
var msg_number = 0;
var request = require('request');
var chatId="";

function onRowAdded() {
  $('.chat-container').animate({
    scrollTop: $('.chat-container').prop('scrollHeight')
  });
};

$(document).ready(function(){
  request.post({url:'http://35.163.243.122:3000/api/v1/getConversationId', form: {key:'value'}}, function(err,httpResponse,body){ /* ... */
    var info = JSON.parse(body);
    chatId=info.conversationId;
    request.post({url:'http://35.163.243.122:3000/api/v1/sendMessage', form: {message:'hola',conversationId:chatId}}, function(err,httpResponse,body2){ /* ... */
      var info2 = JSON.parse(body2);
      botResponse(info2.message);
      $( "#input-text" ).focus();
        $(document).keypress(function(e) {
          if(e.which == 13) {
              var msg = $( "#input-text" ).val();
              sendUserMessage(msg);
              onRowAdded();
              $( "#input-text" ).val("");
          }
      });
    });
  });
});


function sendUserMessage(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  $(".chat-message-list").append("<li class='message-right " + msg_number + "'><div class='messageinner-" + msg_number + "' hidden><span class='message-text'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(msg_class).fadeIn();
  msg_number++;
  request.post({url:'http://35.163.243.122:3000/api/v1/sendMessage', form: {message:msg,conversationId:chatId}}, function(err,httpResponse,body){ /* ... */
    var info = JSON.parse(body);
    if(info.message!=""){
      botResponse(info.message);
    }
  });
}

function botResponse(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  var spinner = ".sp-" + msg_number;
  $(".chat-message-list").append("<li class='message-left " + msg_number + "'><div class='sp-" + msg_number + "'><span class='spinme-left'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + msg_number + "' hidden><span class='message-text'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(spinner).delay(600).hide(1);
  $(msg_class).delay(600).fadeIn();
  msg_number++;
}

function getTimeString(){
  var date = new Date;
  var minutes = date.getMinutes();
  var hour = date.getHours();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return chatTimeString = "<span class='message-time'>" + hour + ":" + minutes + "</span>";
}
