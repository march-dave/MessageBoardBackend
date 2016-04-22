'use strict';

const PORT = process.env.PORT || 3000;

// requires:   loading libraries
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');

var Dog = require('./models/dog');

// app declaration
var app = express();

// general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {

  console.log('req.query:', req.query);

  res.render('test', {
    text: 'whatever you like',
    dogs: ['fluffy', 'king']
  });

  // look for a view file in views directory
  // (view file will end in '.pug')
  // render it into html
  // respond with that html

});

var messages = [{
  time: 'now',
  body: 'hey there!'
},{
  time: 'before',
  body: 'sup.'
}];


// app.get('/board', (req, res, next) => {
//   res.render('board', {messages: messages} );
// });


app.route('/board')
  .get((req, res, next) => {
    res.render('board', {messages: messages} );
  })

// app.route('/api/dogs')
app.get('/api/dogs', (req, res, next) => {
  Dog.findAll((err, dogs) => {
    res.status(err ? 400 : 200).send(err || dogs);
  });
})

app.post('/api/dogs', (req, res, next) => {
  Dog.create(req.body, err => {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.status(200).send('success!');
      // res.redirect('/')
    }
  });
});

app.route('/api/dogs/:id')
  .get((req, res, next) => {
    // get one dog
    var id = req.params.id;

    Dog.findById(id, (err, dog) => {
      if(err || !dog) {
        return res.status(400).send(err || 'Dog not found.');
      }
      res.send(dog);
    });

  })
  .delete((req, res, next) => {
    var id = req.params.id;

    Dog.removeById(id, err => {
      if(err) return res.status(400).send('error');

      res.status(200).send('Success!');

    });

    // var len = dogs.length;
    // dogs = dogs.filter(dog => dog.id !== id);

    // if(len === dogs.length) {  // we didn't remove any dogs
    //   return res.status(400).send('Dog not found, dog.');
    // }

    // res.send();
  })



// 404 handler
app.use((req, res, next) => {
  res.status(404).send('Not found.');
});


// create server, and listen to PORT
app.listen(PORT, err => {
  console.log( err || `Server listening on port ${PORT}` );
});
