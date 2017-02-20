'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');
const response = require('../app/controllers/response');
var path = require('path');
/**
 * Expose
 */

module.exports = function (app, passport) {

  app.set('views', __dirname + '/../views');
  app.engine('ejs', require('ejs').renderFile);

  app.get('/', home.index);
  app.get('/chatId', response.chatId);
  app.get('/botResponse/:chatId/:message', response.message);

  /**
   * Error handling
   */


};
