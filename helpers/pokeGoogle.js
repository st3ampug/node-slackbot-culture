'use strict';

Object.defineProperty(exports, "__esModule", { value: true });

const GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
var helpers = require('./helpers.js');
var logger = require('./mylogger.js');
var creds = require('../configs/google-conf.json');
var config = require("../configs/config.js").google;

// ===============================================================
// TODO:
// https://www.npmjs.com/package/google-spreadsheet
// find last row, add new entry right after!
//
// ===============================================================

pushMessageToSheet("Test message!", "Test Dude");

function pushMessageToSheet(message, user) {
  if(message.length > 0 && user.length > 0) {
    // spreadsheet key is the long id in the sheets URL
    var doc = new GoogleSpreadsheet(config.SHEETID);
    var sheet;

    async.waterfall([
      function setAuth(step) {
        // see notes below for authentication instructions!
        // moved require creds json out!

        doc.useServiceAccountAuth(creds, step);
      },

      function addRowToSheet(step) {
        var new_row = {
          "date": helpers.getDateTime(true),
          "user": user,
          "message": message
        }
        doc.addRow(config.SHEETNUMBER, new_row, function(err, row){
          if(err) {
            logger.Error(err);
          } else {
            logger.Log(row);
          }
        });
      }

    ], function(err, results){
      if( err ) {

        logger.Error('Error while pushing row to sheets: ' + err);


      } else {

        logger.Log("New message successfully pushed to sheets: " + results);

      }
    })
  } else {
    logger.Log("Message or user not available, not pushing info to sheets");
  }
}



module.exports = {
  pushMessageToSheet
}
