'use strict';

module.exports = function(params, res) {

  // /math/sum/2/3/4
  // ['', 'mat', 'sum', '2', '3', '4'];

  var operation = params.shift(); // math, pow, etc.

  switch(operation) {

    case 'sum':
      var sum = require('./sum')(params);
      res.write(`${sum}`);
      break;
  }

  res.end('\n');

  // var params = req.url.split('/');
  // params.shift();
  // var task = params.shift();

  console.log('mathUrl', req.url);
  var num = randNum();
  res.write(`{num}\n`)
  res.end('Math!!!\n');
}

function randNum() {
  return Math.floor(Math.random() * 100));
}
