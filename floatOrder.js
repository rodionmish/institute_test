'use strict';

function floatOrder(keyKuna, secretKuna, volume, clientID, secretBit,  keyBit, priceUSD) {
  this.keyKuna    = keyKuna;
  this.secretKuna = secretKuna;
  this.volume     = volume;
  this.priceUSD   = priceUSD;
  this.keyBit     = keyBit;
  this.secretBit  = secretBit;
  this.clientID   = clientID;
  this.id;
  this.volumeCreate;

}


floatOrder.prototype.deleteOrder = function(firstStart) {
  var url = this.getURL(6, 'post');
  let request     = require( 'request' );
  return new Promise(function(resolve, reject){
    request.post( url, function ( errorRequest, responseRequest, body ) {

      if ( errorRequest ) {
        console.error( 'error: ', errorRequest );
        throw errorRequest;
      }
      if (body = '[]') {
        console.log('deleted all');
      }
      else {
        console.log('smth went wrong');
      }
    });
  });
}

floatOrder.prototype.showBalance = function() {

  var url = this.getURL(0, 'get');

  let request     = require( 'request' );
  return new Promise(function(resolve, reject){
    request( url, function ( errorRequest, responseRequest, body ) {
      if ( errorRequest ) {
        console.error( 'error: ', errorRequest );
        throw errorRequest;
      }

      if (body[3] != 'r') {


        var parse = JSON.parse(body);
        var balKuna = 'KUNA' + '<br>' + 'UAH: ' + parseFloat(parse.accounts[0].balance).toFixed(2)
              + '<br>BTC: ' + parse.accounts[1].balance;


      } else if(body[2] == 'e') {
        resolve(body);
      }


    });

  });
}


floatOrder.prototype.createKunBuy = function() {
  var url = this.getURL(2, 'post');
  var now = new Date();
  let request     = require( 'request' );
  return new Promise(function(resolve, reject){
    request.post( url, function ( errorRequest, responseRequest, body ) {

      if ( errorRequest ) {
        console.error( 'error: ', errorRequest );
        throw errorRequest;
      }
      try {
        var createErr = JSON.parse(body);
        var resss = 'Created KUN BUY: ' + body;
        console.log(resss);
      }
      catch (err) {
        resolve('err');
        return;
      }
      if(body[3] != 'r'){
        var parse = JSON.parse(body);
        var returnText = 'id: ' + parse.id + '\n<br>'
                       + 'price: ' + parse.price + '\n<br>'
                       + 'volume: ' + parse.volume + '\n';
        resolve(+(parse.id));
      }
      else {
        resolve('nono');
      }
      var dew = fs.appendFileSync('./files/file.json', '\n\n' + now + '\n' + resss,  'utf8');
    });
  });
}

floatOrder.prototype.createKunSell = function() {
  var url = this.getURL(3, 'post');
  var now = new Date();
  let request     = require( 'request' );
  return new Promise(function(resolve, reject){
    request.post( url, function ( errorRequest, responseRequest, body ) {

      if ( errorRequest ) {
        console.error( 'error: ', errorRequest );
        throw errorRequest;
      }
      try {
        var createErr = JSON.parse(body);
        var resss = 'Created KUN SELL: ' + body;
        console.log(resss);
      }
      catch (err) {
        resolve('err');
        return;
      }
      if(body[3] != 'r'){
        var parse = JSON.parse(body);
        var returnText = 'id: ' + parse.id + '\n<br>'
                       + 'price: ' + parse.price + '\n<br>'
                       + 'volume: ' + parse.volume + '\n';
        resolve(+(parse.id));
      }
      else {
        resolve('nono');
      }
      var dew = fs.appendFileSync('./files/file.json', '\n\n' + now + '\n' + resss,  'utf8');
    });
  });
}



floatOrder.prototype.showKunPrice = function (difference) {
  var url = 'https://kuna.io/api/v2/depth?market=kunbtc';
  console.log(url);
  let request     = require( 'request' );
  return new Promise(function(resolve, reject){
    request( url, function ( errorRequest, responseRequest, body ) {

      if ( errorRequest ) {
        console.error( 'error: ', errorRequest );
        throw errorRequest;
      }
      try {
        var parse = JSON.parse(body);
          }
      catch (err) {
        resolve('err');
        return;
      }

      if(body[3] != 'r'){



        var askPrice = parse.asks[parse.asks.length-1][0];
        var bidPrice = parse.bids[0][0];

        var diff 		 = (askPrice-0.000001 - bidPrice+0.000001);
        var priceKun = (((Math.random() * (0.6 - 0.3) + 0.3) * diff) + +bidPrice).toFixed(6);

        console.log('ask: ' + askPrice);
        console.log('bid: ' + bidPrice);
        console.log('Kun PRICE: ' + priceKun);

        diff = diff.toFixed(6);

        console.log('DIFF: ' + diff);

        if ((priceKun != 0 || priceKun != undefined) && (diff > 0.000001)) {
        resolve(priceKun);
        }
        else {
          resolve('nono');
        }
      }
      else {
        resolve('nono');
      }


    });
  });
}
exports.floatOrder = floatOrder;
