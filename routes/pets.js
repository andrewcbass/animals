"use strict";

var express = require('express');
var router = express.Router();

var Pet = require("../models/pet");

router.get('/', function(req, res, next) {
  Pet.find({}, function(err, pets) {
    if(err) return res.status(400).send(err);
    res.send(pets);
  });
});

module.exports = router;
