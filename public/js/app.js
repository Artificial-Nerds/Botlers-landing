
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
  var jsonVal=JSON.stringify(data0);
  $(document).keypress(function(e) {
      if(e.which == 13) {
          var msg = $( "#input-text" ).val();
          sendUserMessage(msg);
          $( "#input-text" ).val("");
      }
  });
  $("#modal").iziModal().hide();
  $(document).on('click', '.trigger', function (event) {
      event.preventDefault();
      $('#modal').show().iziModal('open');
      console.log("Hola");
  });

  $(document).on('click', '#submit-info', function (event) {
      event.preventDefault();
      var database = firebase.database();
      firebase.database().ref('client').push({
        name: $("#name-info").val(),
        phone : $("#phone-info").val()
      });
      $(".notify-form").hide();
      $(".common-BodyTitle").text("Gracias " + $("#name-info").val());
  });

  $.ajax({
    url: "chatId",
    type: "GET",
    success: function(data,textStatus,jqXHR ){
      chatId=data.conversationId;
      console.log("ENTRO ****");

      getResponse("Hola");
    }
  });
});



function getResponse(msg){
  var spinner = ".sp-" + msg_number;
  console.log(spinner);
  $(".chat-message-list").append("<div class='sp-" + msg_number + "'><span class='spinme-left'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div></span></div>");
  $.ajax({
    url: "botResponse/"+chatId+"/"+msg,
    type: "GET",
    success: function(data,textStatus,jqXHR ){
      //$( "#input-text" ).focus();
      botResponse(data.response);
      $(spinner).remove();
    }
  });
}

function sendUserMessage(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  $(".chat-message-list").append("<li class='message-right " + msg_number + "'><div class='messageinner-" + msg_number + "' hidden><span class='message-text'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(msg_class).fadeIn();
  msg_number++;
  onRowAdded();
  getResponse(msg);
}

function botResponse(msg){
  var chatTimeString = getTimeString();
  var msg_class = ".messageinner-" + msg_number;
  var emoji_class = "";
  if(msg == "🤔"){
    emoji_class = "emoji";
  }
  var msg_class = ".messageinner-" + msg_number;
  $(".chat-message-list").append("<li class='message-left " + msg_number + "'><div class='messageinner-" + msg_number + "' hidden><span class='message-text "  + emoji_class +  "'>" + msg + "</span>" + chatTimeString + "</div></li>");
  $(msg_class).delay(600).fadeIn(function(){
    msg_number++;
    onRowAdded();
  });
}

function getTimeString(){
  var date = new Date;
  var minutes = date.getMinutes();
  var hour = date.getHours();
  minutes = minutes < 10 ? '0'+minutes : minutes;
  return chatTimeString = "<span class='message-time'>" + hour + ":" + minutes + "</span>";
}
