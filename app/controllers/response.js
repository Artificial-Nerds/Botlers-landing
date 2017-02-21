
/*!
 * Module dependencies.
 */
var request = require('request');
var ddb = require('dynamodb').ddb({ accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

exports.message = function (req, res) {
  var params = {
    TableName: 'conversations_botlers.io'
  };
  console.log(process.env.AWS_ACCESS_KEY_ID);
  var item = {conversation_id: "Hdwqiduhweh", msg: "Hola como estas blah blah"};

  ddb.listTables({}, function(err, res) {
    console.log(res);
  });
  console.log("------------------- ** ---------------");
  console.log(req.params);
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
    //url:'http://localhost:1337/api/v1/getConversationId', json: {
    url:'http://35.163.243.122:3000/api/v1/getConversationId', json: {
      key: "value"
    }
  }, function(err,httpResponse,body){
    console.log(body);
    res.send(body)
  });
};
