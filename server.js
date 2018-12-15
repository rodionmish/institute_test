'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var floatOrder = require('./floatOrder.js');
var fs = require('fs');

var jsonParser = bodyParser.json();
var app = express();
app.use(express.static(__dirname));

var keyKuna     = '';
var secretKuna  = '';
var startVolume = '';
var priceUSD    = '';
var keyBit      = '';
var secretBit   = '';
var clientID    = '';
var allEurs     = 0;
var intervalll = 0;
var timee = 0;

var bigBoom = false;
var firstStart = true;
var intervalID;
var asd;
var botOnOrOff = 0;

var request     = require( 'request' );

app.post("/check", jsonParser, function(request, res) {
  if(!request.body) return res.sendStatus(400);
  if(keyKuna != '' && secretKuna != '' && startVolume != '' && priceUSD != '' && request.body[5] == 1 && keyBit != '' && secretBit != '' && clientID != '') {
    asd.showBalance()
      .then(response => {
        if(`${response[2]}` == 'e') {
          res.send('Data is incorrect!');
          return;
        } else if(botOnOrOff == 1) {
            res.send('OK');
            return;
          } else {
              res.send('');
              return;
            }
      });
  } else if(request.body[5] == 1) return;
  if(request.body[5] == 0) {
    asd = new floatOrder.floatOrder(request.body[0], request.body[1]
              , request.body[2], request.body[3], request.body[4]
                , request.body[6], request.body[7], request.body[8]);

    keyKuna     = request.body[0];
    secretKuna  = request.body[1];
    startVolume = request.body[2];
    clientID    = request.body[3];
    secretBit   = request.body[4];
    keyBit      = request.body[6];
    priceUSD    = request.body[7];



    asd.showBalance()
      .then(response => {
        if(`${response[2]}` == 'e') {

          res.send('Data is incorrect!');
          return;
        } else res.send('OK');
      });
    }
});

app.post("/start", jsonParser, function (request, res) {
  if(!request.body) return res.sendStatus(400);
  botOnOrOff = 1;



function qwe() {
    clearInterval(intervalll);
    timee = (Math.random() * (600000 - 60000) + 60000).toFixed(0);
    console.log('interval: ' + timee/60000);
    console.log('START VOLUME!!!: ' + startVolume);
    logic();
    intervalll = setInterval(qwe, timee);
}

qwe();


});

app.post("/stop", jsonParser, function (request, res) {
    if(!request.body) return res.sendStatus(400);
    stop();
    res.send('All orders has been deleted. Bot stopped.');
});

app.post("/showBalance", jsonParser, function (request, res) {
    if(!request.body) return res.sendStatus(400);
    asd.showBalance()
         .then(response => {
           res.send(`${response}`);
         });
});

app.post("/showOrders", jsonParser, function (request, res) {
    if(!request.body) return res.sendStatus(400);
    asd.showOrders()
         .then(response => {
           asd.showKunPrice();
           res.send(`${response}`);
         });
});


function logic() {
 
}




function stop() {
  botOnOrOff = 0;
  firstStart = true;
  clearInterval(intervalll);
  setTimeout(function(){
  asd.deleteOrder();
}, 3000);
}
/*
const PORT = 3030;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);*/
app.listen(7777, () => console.log('app is running on port 7777!'))

// console.log(`Running on http://${HOST}:${PORT}`);
