
/*!
 * Module dependencies.
 */
var request = require('request');

exports.bot = function (req, res) {
  console.log(req.body);
  res.send(JSON.stringify({ a: 1 }))
  request.post({
    url:'http://35.163.243.122:3000', form: {
      conversationId: req.body.conversationId,
      message: req.body.message
    }
  }, function(err,httpResponse,body){ res.send(JSON.stringify({ a: 1 })) });
};
