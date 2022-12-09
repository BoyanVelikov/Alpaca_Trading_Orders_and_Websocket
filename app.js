const Alpaca = require('@alpacahq/alpaca-trade-api');
const WebSocket = require('ws');
const ws = new WebSocket('wss://stream.data.alpaca.markets/v1beta2/crypto');

const API_KEY = 'PKN2WI61H3VGTPQ4IT5O';
const SECRET_KEY = 'qtjXhccl4DUN6pibe77swyc1TsFY7phW0DTg5f8k';
const auth = {"action": "auth", "key": API_KEY, "secret": SECRET_KEY};
const subscribe = {"action":"subscribe","quotes":["ETH/USD"]};

const options = {
    keyId: API_KEY,
    secretKey: SECRET_KEY,
    paper: true
};

const alpaca = new Alpaca(options);

const buyParams = {
    symbol: 'ETH/USD',
    qty: 0.01,
    side: 'buy',
    type: 'market',
    time_in_force: 'gtc'
};

const sellParams = {
    symbol: 'ETH/USD',
    qty: 0.01,
    side: 'sell',
    type: 'market',
    time_in_force: 'gtc'
};

function buyOrder() {
  alpaca.createOrder(buyParams).then((order) => {
    console.log(order);
  }) ;
}

function sellOrder() {
    alpaca.createOrder(sellParams);
}

buyOrder();

ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    const message = data[0]['msg'];
    askingPrice = data[0]['ap'];
    price = askingPrice;

    if(message == 'connected') {
        console.log(message);
        console.log('do authentication');
        ws.send(JSON.stringify(auth));
    }

    if(message == 'authenticated') {
        console.log(message);
        console.log('successful authentication');
        ws.send(JSON.stringify(subscribe));
    }
};


