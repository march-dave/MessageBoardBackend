'use strict';

// this is going to have the job
// of interacting with the data

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var dataFile = path.join(__dirname, '../data/dogs.json');

exports.findAll = function(cb) {
  fs.readFile(dataFile, (err, data) => {
    if(err) {
      cb(err);
      return;
    }

    try {
      var dogs = JSON.parse(data);
    } catch(err) {
      return cb(err);
    }

    cb(null, dogs);
  });
};

// create a new dog,
// and save it to the DB
exports.create = function(dog, cb) {

  if(!dog.name || !dog.kind) {
    return cb('Dog must have name and kind.');
  }

  this.findAll((err, dogs) => {
    if(err) {
      return cb(err);
    }

    var newDog = {
      name: dog.name,
      kind: dog.kind,
      id: uuid()
    };

    dogs.push(newDog);

    fs.writeFile(dataFile, JSON.stringify(dogs), err => {
      cb(err);
    });
  });
};

exports.findById = function(id, cb) {
  if(!id) return cb('id required.');

  this.findAll((err, dogs) => {
    if(err) return cb(err);

    var dog = dogs.filter(dog => dog.id === id)[0];

    cb(null, dog);
  });
};
