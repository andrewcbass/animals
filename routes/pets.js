"use strict";

var express = require('express');
var router = express.Router();

var Pet = require("../models/pet");
var Client = require("../models/client");

//***************** GET REQUESTS *****************
//ALL pets(populate interested clients && owner)
router.get('/', function(req, res, next) {
  Pet.find({})
    .populate("clients")
    .populate("owner")
    .exec(function(err, pets) {
      if(err) return res.status(400).send(err);
      res.send(pets);
    });
});

//Available pets (populate interested clients field)
router.get("/available", function(req, res, next) {
  Pet.find({owner: {$size: 0}})
    .populate("clients")
    .exec(function(err, petsAvail) {
      if(err) return res.status(400).send(err);
      res.send(petsAvail);
    });
});

//Adopted pets (populate owner field)
router.get("/adopted", function(req, res, next) {
  Pet.find({owner: {$size: 1}})
    .populate("owner")
    .exec(function(err, petsAvail) {
      if(err) return res.status(400).send(err);
      res.send(petsAvail);
    });
});

//One pet, by ID, populated
router.get("/:id", function(req, res) {
  Pet.findById(req.params.id)
    .populate("clients")
    .populate("owner")
    .exec(function(err, pet) {
      if(err || !pet) {
        return res.status(400).send(err || "Pet not found!");
      }
      res.send(pet);
    });
});

//********************** POST REQUESTS *******************

//create new pet
router.post("/", function(req, res) {
  Pet.create(req.body, function(err, savedPet) {
    res.status(err ? 400: 200).send(err || savedPet);
  });
});

//***************** PUT REQUESTS ***********************

//add clients who want a pet
router.put("/:petId/addClient/:clientId", function(req, res) {
  Pet.findById(req.params.petId, function(err, pet) {
    if(err || !pet) return res.status(400).send(err || "Pet not found!");

    Client.findById(req.params.clientId, function(err, client) {
      if(err || !client) return res.status(400).send(err || "Client not found!");

      pet.clients.push(client._id);

      pet.save(function(err, savedPet) {
        res.status(err ? 400 : 200).send(err || savedPet);
      });
    });
  });
});

//************ SPECIAL CASE  - updates client and pet!!! *******
//add owner to pet, AND add pet to the client
router.put("/:petId/addOwner/:clientId", function(req, res) {
  Pet.findById(req.params.petId, function(err, pet) {
    if(err || !pet) return res.status(400).send(err || "Pet not found!");

    Client.findById(req.params.clientId, function(err, client) {
      if(err || !client) return res.status(400).send(err || "Client not found!");

      client.pets.push(pet._id);
      pet.owner.push(client._id);

      client.save(function(err, savedClient) {
        if(err) return res.status(400).send(err);
      });

      pet.save(function(err, savedPet) {
        res.status(err ? 400 : 200).send(err || savedPet);
      });
    });
  });
});

//update the pet, generically
router.put("/:id", function(req, res) {
  Pet.findByIdAndUpdate(req.params.id,
    { $set: req.body },
    { new: true },
    function(err, savedPet) {
      res.status(err ? 400 : 200).send(err || savedPet);
    });
});

//**************** DELETE REQUESTS ******************
//delete pet by ID
router.delete("/:id", function(req, res) {
  Pet.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(400).send(err);

    res.send("Pet deleted!");
  });
});

module.exports = router;
