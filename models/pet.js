"use strict";

var mongoose = require("mongoose");

var Pet = mongoose.model("Pet", {
  name: String,
  breed: String,
  petUrl: String,
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client"}],
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client"}]
});

module.exports = Pet;
