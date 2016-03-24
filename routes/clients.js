"use strict";

var express = require('express');
var router = express.Router();

var Client = require("../models/client");
var Pet = require("../models/pet");

//***************** GET REQUESTS *******************

//get all clients and the pets they already own
router.get("/", function(req, res, next) {
  Client.find({})
    .populate("pets")
    .exec(function(err, clients) {
      if(err) return res.status(400).send(err);
      res.send(clients);
    });
});

//get one client by ID and populate
router.get("/:id", function(req, res) {
  Client.findById(req.params.id)
    .populate("pets")
    .exec(function(err, client) {
      if(err || !client) {
        return res.status(400).send(err || "Client not found!");
      }
      res.send(client);
    })
})

//***************** POST REQUESTS *******************

//create new client
router.post("/", function(req, res) {
  Client.create(req.body, function(err, savedClient) {
    res.status(err ? 400 : 200).send(err || savedClient);
  });
});

//***************** PUT REQUESTS *******************
//********* add pet is in the pets.js file!!!*******

//update the client, generically
router.put("/:id", function(req, res) {
  Client.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, savedClient) {
      res.status(err ? 400 : 200).send(err || savedClient);
    });
});

//**************** DELETE REQUESTS ******************
//delete client by ID
router.delete("/:id", function(req, res) {
  Client.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(400).send(err);

    res.send("Client deleted!");
  });
});

module.exports = router;
