
/*!
 * Module dependencies.
 */
var request = require('request');

exports.message = function (req, res) {
  console.log(req.params);
  //res.send(JSON.stringify({ a: 1 }))

  request.post({
    url:'http://35.163.243.122:3000/api/v1/sendMessage', json: {
      conversationId: req.params.chatId,
      message: req.params.message
    }
  }, function(err,httpResponse,body){
    console.log(body);
    res.send(body.value)
  });
};

exports.chatId = function (req, res) {
  //res.send(JSON.stringify({ a: 1 }))

  request.post({
    url:'http://35.163.243.122:3000/api/v1/getConversationId', json: {
      key: "value"
    }
  }, function(err,httpResponse,body){
    console.log(body);
    res.send(body)
  });
};
