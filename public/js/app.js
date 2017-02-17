
var chatDelay = 0;
var msg_number = 0;
var chatId="";

function onRowAdded() {
  $('.chat-container').animate({
    scrollTop: $('.chat-container').prop('scrollHeight')
  });
};

$(document).ready(function(){
  var data0 = {key: "value"};
  var jsonVal=JSON.stringify(data0 );
  $.ajax({
    url: "chatId",
    type: "GET",
    success: function(data,textStatus,jqXHR ){
      //console.log(data.conversationId);
      chatId=data.conversationId;
      $.ajax({
        url: "botResponse/"+chatId+"/"+"hola",
        type: "GET",
        success: function(data,textStatus,jqXHR ){
          $( "#input-text" ).focus();
          botResponse(data.response);
            $(document).keypress(function(e) {
              if(e.which == 13) {
                  var msg = $( "#input-text" ).val();
                  sendUserMessage(msg);
                  $( "#input-text" ).val("");
              }
          });
        }
      });
    }
  });

});


function sendUserMessage(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  $(".chat-message-list").append("<li class='message-right " + msg_number + "'><div class='messageinner-" + msg_number + "' hidden><span class='message-text'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(msg_class).fadeIn();
  msg_number++;
  onRowAdded();
  $.ajax({
    url: "botResponse/"+chatId+"/"+msg,
    type: "GET",
    success: function(data,textStatus,jqXHR ){
      if(data.response!="" && data.response!="null"){
        botResponse(data.response);
      }
    }
  });
}

function botResponse(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  var spinner = ".sp-" + msg_number;
  $(".chat-message-list").append("<li class='message-left " + msg_number + "'><div class='sp-" + msg_number + "'><span class='spinme-left'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div><div class='messageinner-" + msg_number + "' hidden><span class='message-text'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(spinner).delay(600).hide();
  $(msg_class).delay(600).fadeIn();
  setTimeout(function(){onRowAdded();}, 600);
  msg_number++;
  onRowAdded();
}

function getTimeString(){
  var date = new Date;
  var minutes = date.getMinutes();
  var hour = date.getHours();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return chatTimeString = "<span class='message-time'>" + hour + ":" + minutes + "</span>";
}
