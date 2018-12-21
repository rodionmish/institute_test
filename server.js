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
  
var timee = 0;

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
 asd.showKunPrice()
  .then(response => {

    var now = new Date().getHours();
    console.log('TIME:' + now);

    switch (now) {
      case 22:
      case 23:
      asd.volume = Math.random()*(+startVolume);
      console.log('X');
        break;
      case 0:
      case 1:
      case 20:
      case 21:
      asd.volume = Math.random()*(+startVolume)*2;
       console.log('2X'); 
        break;
      case 2:
      case 3:
      case 18:
      case 19:
      console.log('3X');
        asd.volume = Math.random()*(+startVolume)*3;
        break;
      case 4: 
      case 5:
      case 16:
      case 17:
       console.log('5X');
        asd.volume = Math.random()*(+startVolume)*5;
        break;
      case 6:
      case 7:
      case 14:
      case 15:
      console.log('7X');
        asd.volume = Math.random()*(+startVolume)*7;
        break;
      case 8:
      case 9:
      case 12:
      case 13:
        console.log('8X');
        asd.volume = Math.random()*(+startVolume)*8;
        break;
      case 10:
      case 11:
      console.log('10X');
        asd.volume = Math.random()*(+startVolume)*10;
        break;
      default:
      asd.volume = 0;
    }

    asd.price = `${response}`;
    console.log('VOLL: ' + asd.volume);
    console.log('PRICE: ' + asd.price);
    if (asd.price == 'err') {
      console.log('error: ' + asd.price);
      return;
    }
    return;
    if (asd.price != 'nono'){
      asd.createKunSell()
        .then((_res)=> {
          if (_res != 'err'){
            asd.createKunBuy()
            .then((_res) => {
              asd.deleteOrder();
            })
          }
        })
    }

  })
}


function stop() {
  botOnOrOff = 0;
  clearInterval(intervalll);
  setTimeout(function(){
  asd.deleteOrder();
}, 3000);
}

app.listen(7777, () => console.log('app is running on port 7777!'))


