
/*!
 * Module dependencies.
 */
var request = require('request');
var ddb = require('dynamodb').ddb({ accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

exports.message = function (req, res) {
  var item = {conversation_id: req.params.chatId, msg: req.params.message, user: "client"};
  ddb.putItem('conversations', item, {}, function(err, res, cap) {});

  request.post({
    url:'http://35.163.243.122:3000/api/v1/sendMessage', json: {
      conversationId: req.params.chatId,
      message: req.params.message
    }
  }, function(err,httpResponse,body){
    var item = {conversation_id: req.params.chatId, msg: body.value.response, user: "sam"};
    ddb.putItem('conversations', item, {}, function(err, res, cap) {});
        res.send(body.value);
      });
    };

exports.chatId = function (req, res) {
  //res.send(JSON.stringify({ a: 1 }))

  request.post({
    //url:'http://localhost:1337/api/v1/getConversationId', json: {
    url:'http://35.163.243.122:3000/api/v1/getConversationId', json: {
      key: "value"
    }
  }, function(err,httpResponse,body){
    console.log(body);
    res.send(body)
  });
};
